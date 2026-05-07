import { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableProjectItem from '../components/admin/SortableProjectItem';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { portfolioData, setPortfolioData, savePortfolioData, isSaving } = usePortfolio();

  // Assign stable IDs for drag-and-drop to prevent focus loss while typing
  useEffect(() => {
    if (portfolioData?.projects) {
      let needsUpdate = false;
      const updatedProjects = portfolioData.projects.map(p => {
        if (!p._dndId) {
          needsUpdate = true;
          return { ...p, _dndId: Math.random().toString(36).substr(2, 9) };
        }
        return p;
      });
      if (needsUpdate) {
        setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
      }
    }
  }, [portfolioData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple local password
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleChange = (section, key, value) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const addSkillCategory = () => {
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, { title: "New Category", iconName: "Circle", items: [] }]
    }));
  };

  const removeSkillCategory = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "New Project", description: "", image: "", github: "", demo: "", tech: [] }]
    }));
  };

  const removeProject = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const updateProject = (index, field, value) => {
    setPortfolioData(prev => {
      const newProjects = [...prev.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return { ...prev, projects: newProjects };
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      setPortfolioData((prev) => {
        const oldIndex = prev.projects.findIndex((p, i) => (p._dndId || `proj-${i}`) === active.id);
        const newIndex = prev.projects.findIndex((p, i) => (p._dndId || `proj-${i}`) === over.id);
        
        return {
          ...prev,
          projects: arrayMove(prev.projects, oldIndex, newIndex),
        };
      });
    }
  };

  const handleSave = async () => {
    const success = await savePortfolioData(portfolioData);
    if (success) {
      alert("Portfolio updated successfully!");
    } else {
      alert("Failed to update portfolio. Make sure you are running the development server.");
    }
  };

  const inputClasses = "w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all duration-300 hover:bg-black/60";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505] z-0" />
        <motion.form 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onSubmit={handleLogin} 
          className="relative z-10 p-10 border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl flex flex-col gap-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md"
        >
          <div className="text-center space-y-2 mb-4">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Admin Portal</h2>
            <p className="text-sm text-gray-400">Enter your credentials to continue</p>
          </div>
          <div className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={inputClasses}
              autoFocus
            />
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 p-3 rounded-lg font-bold shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              Login
            </button>
          </div>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8 overflow-y-auto relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md sticky top-4 z-50 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <span className="text-xl">✨</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Portfolio Admin</h1>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2"
          >
            {isSaving ? (
              <><span className="animate-spin">↻</span> Saving...</>
            ) : "Save Changes"}
          </motion.button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* HERO SECTION */}
          <motion.section variants={itemVariants} className="p-8 border border-white/10 bg-white/5 backdrop-blur-lg rounded-3xl space-y-6 shadow-xl hover:border-white/20 transition-colors">
            <h2 className="text-2xl font-bold border-b border-white/10 pb-4 flex items-center gap-3">
              <span className="text-blue-400">01.</span> Hero Section
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Greeting</label>
                <input 
                  value={portfolioData.hero.greeting} 
                  onChange={(e) => handleChange('hero', 'greeting', e.target.value)}
                  className={inputClasses}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Headline</label>
                <input 
                  value={portfolioData.hero.headline} 
                  onChange={(e) => handleChange('hero', 'headline', e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Bio</label>
              <textarea 
                value={portfolioData.hero.bio} 
                onChange={(e) => handleChange('hero', 'bio', e.target.value)}
                className={`${inputClasses} min-h-[120px] resize-y`}
              />
            </div>
          </motion.section>

          {/* ABOUT SECTION */}
          <motion.section variants={itemVariants} className="p-8 border border-white/10 bg-white/5 backdrop-blur-lg rounded-3xl space-y-6 shadow-xl hover:border-white/20 transition-colors">
            <h2 className="text-2xl font-bold border-b border-white/10 pb-4 flex items-center gap-3">
              <span className="text-blue-400">02.</span> About Me
            </h2>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Tags (comma separated)</label>
              <input 
                value={portfolioData.about.tags.join(', ')} 
                onChange={(e) => handleChange('about', 'tags', e.target.value.split(',').map(s => s.trim()))}
                className={inputClasses}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Paragraphs (separated by blank lines)</label>
              <textarea 
                value={portfolioData.about.paragraphs.join('\n\n')} 
                onChange={(e) => handleChange('about', 'paragraphs', e.target.value.split('\n\n'))}
                className={`${inputClasses} min-h-[200px] resize-y`}
              />
            </div>

            {/* ACHIEVEMENTS — structured inputs */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-blue-300 flex items-center gap-2">🏆 Achievements Timeline</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const newAchievements = [...(portfolioData.about.achievements || [])];
                    newAchievements.unshift({ date: new Date().getFullYear().toString(), month: (new Date().getMonth() + 1).toString(), label: "New", title: "", description: "" });
                    handleChange('about', 'achievements', newAchievements);
                  }}
                  className="bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                >
                  + Add Achievement
                </motion.button>
              </div>

              {(portfolioData.about.achievements || []).map((ach, achIdx) => {
                const isObj = typeof ach === 'object';
                const achData = isObj ? ach : { date: '', month: '', label: '', title: ach, description: '' };

                const updateAchievement = (field, value) => {
                  const newAchievements = [...portfolioData.about.achievements];
                  if (isObj) {
                    newAchievements[achIdx] = { ...newAchievements[achIdx], [field]: value };
                  } else {
                    newAchievements[achIdx] = { date: '', month: '', label: '', title: value, description: '' };
                  }
                  handleChange('about', 'achievements', newAchievements);
                };

                const removeAchievement = () => {
                  const newAchievements = portfolioData.about.achievements.filter((_, i) => i !== achIdx);
                  handleChange('about', 'achievements', newAchievements);
                };

                return (
                  <motion.div
                    key={achIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 border border-white/10 bg-black/30 rounded-2xl space-y-4 group hover:border-white/20 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Achievement #{achIdx + 1}</span>
                      <button
                        onClick={removeAchievement}
                        className="opacity-0 group-hover:opacity-100 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Year</label>
                        <input
                          type="number"
                          value={achData.date}
                          onChange={(e) => updateAchievement('date', e.target.value)}
                          placeholder="e.g. 2025"
                          className={inputClasses}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Month</label>
                        <select
                          value={achData.month || ''}
                          onChange={(e) => updateAchievement('month', e.target.value)}
                          className={inputClasses}
                        >
                          <option value="">None</option>
                          <option value="1">Jan</option>
                          <option value="2">Feb</option>
                          <option value="3">Mar</option>
                          <option value="4">Apr</option>
                          <option value="5">May</option>
                          <option value="6">Jun</option>
                          <option value="7">Jul</option>
                          <option value="8">Aug</option>
                          <option value="9">Sep</option>
                          <option value="10">Oct</option>
                          <option value="11">Nov</option>
                          <option value="12">Dec</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Label / Tag</label>
                        <input
                          value={achData.label}
                          onChange={(e) => updateAchievement('label', e.target.value)}
                          placeholder="e.g. Finalist, Winner, Top 30"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-400 ml-1">Title</label>
                      <input
                        value={achData.title}
                        onChange={(e) => updateAchievement('title', e.target.value)}
                        placeholder="e.g. ACM Summer Coding Challenge — SVNIT"
                        className={inputClasses}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-400 ml-1">Description (optional)</label>
                      <textarea
                        value={achData.description}
                        onChange={(e) => updateAchievement('description', e.target.value)}
                        placeholder="Short description of the achievement..."
                        className={`${inputClasses} min-h-[70px] resize-y`}
                        rows={2}
                      />
                    </div>
                  </motion.div>
                );
              })}

              {(!portfolioData.about.achievements || portfolioData.about.achievements.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-6">No achievements yet. Click "+ Add Achievement" to create one.</p>
              )}
            </div>
          </motion.section>

          {/* SKILLS SECTION */}
          <motion.section variants={itemVariants} className="p-8 border border-white/10 bg-white/5 backdrop-blur-lg rounded-3xl space-y-6 shadow-xl hover:border-white/20 transition-colors">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-blue-400">03.</span> Skills Matrix
              </h2>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addSkillCategory} 
                className="bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                + Add Category
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.skills.map((skillCat, catIdx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={catIdx} 
                  className="p-6 border border-white/10 bg-black/40 rounded-2xl space-y-5 hover:border-white/20 transition-colors group"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-blue-300">Category {catIdx + 1}</h3>
                    <button 
                      onClick={() => removeSkillCategory(catIdx)} 
                      className="opacity-0 group-hover:opacity-100 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Title</label>
                    <input 
                      value={skillCat.title}
                      onChange={(e) => {
                        const newSkills = [...portfolioData.skills];
                        newSkills[catIdx].title = e.target.value;
                        setPortfolioData(prev => ({ ...prev, skills: newSkills }));
                      }}
                      className={inputClasses}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Icon Name (Lucide)</label>
                    <input 
                      value={skillCat.iconName}
                      onChange={(e) => {
                        const newSkills = [...portfolioData.skills];
                        newSkills[catIdx].iconName = e.target.value;
                        setPortfolioData(prev => ({ ...prev, skills: newSkills }));
                      }}
                      className={inputClasses}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-400 ml-1">Skills (comma separated)</label>
                    <input 
                      value={skillCat.items.join(', ')}
                      onChange={(e) => {
                        const newSkills = [...portfolioData.skills];
                        newSkills[catIdx].items = e.target.value.split(',').map(s => s.trim());
                        setPortfolioData(prev => ({ ...prev, skills: newSkills }));
                      }}
                      className={inputClasses}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* PROJECTS SECTION */}
          <motion.section variants={itemVariants} className="p-8 border border-white/10 bg-white/5 backdrop-blur-lg rounded-3xl space-y-6 shadow-xl hover:border-white/20 transition-colors">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-blue-400">04.</span> Projects (Drag to Reorder)
              </h2>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addProject} 
                className="bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
              >
                + New Project
              </motion.button>
            </div>
            
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={portfolioData.projects.map((p, i) => p._dndId || `proj-${i}`)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {portfolioData.projects.map((project, projIdx) => (
                    <SortableProjectItem 
                      key={project._dndId || `proj-${projIdx}`}
                      project={project}
                      projIdx={projIdx}
                      updateProject={updateProject}
                      removeProject={removeProject}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}
