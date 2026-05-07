import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export default function SortableProjectItem({ project, projIdx, updateProject, removeProject }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project._dndId || `proj-${projIdx}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  const handleChange = (field, value) => {
    updateProject(projIdx, field, value);
  };

  return (
    <div ref={setNodeRef} style={style} className={`p-4 border ${isDragging ? 'border-blue-500' : 'border-white/10'} bg-black/30 rounded-xl space-y-4 relative`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab hover:text-blue-400 active:cursor-grabbing text-gray-400">
            <GripVertical size={20} />
          </div>
          <h3 className="font-medium text-blue-300">Project: {project.title || `Project ${projIdx + 1}`}</h3>
        </div>
        <button onClick={() => removeProject(projIdx)} className="bg-red-600/80 hover:bg-red-600 px-2 py-1 rounded text-xs transition-colors z-10 relative">Delete</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">ID (Used for URL)</label>
          <input 
            value={project.id || ''}
            onChange={(e) => handleChange('id', e.target.value)}
            className="w-full p-2 rounded bg-black/50 border border-white/20 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Title</label>
          <input 
            value={project.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full p-2 rounded bg-black/50 border border-white/20 focus:border-blue-500 outline-none"
          />
        </div>
        
        {/* SPOTLIGHT AND TAG */}
        <div className="flex flex-col gap-2 justify-end">
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input 
              type="checkbox"
              checked={project.spotlight || false}
              onChange={(e) => handleChange('spotlight', e.target.checked)}
              className="w-4 h-4 rounded accent-blue-500"
            />
            Spotlight Project (Premium UI)
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Tag (e.g., 'Featured')</label>
          <input 
            value={project.tag || ''}
            onChange={(e) => handleChange('tag', e.target.value)}
            className="w-full p-2 rounded bg-black/50 border border-white/20 focus:border-blue-500 outline-none"
          />
        </div>

        {/* URLS */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Main Image URL</label>
          <input 
            value={project.image || ''}
            onChange={(e) => handleChange('image', e.target.value)}
            className="w-full p-2 rounded bg-black/50 border border-white/20 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Gallery Image URLs (comma separated)</label>
          <input 
            value={(project.gallery || []).join(', ')}
            onChange={(e) => handleChange('gallery', e.target.value.split(',').map(s => s.trim()))}
            className="w-full p-2 rounded bg-black/50 border border-white/20 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">GitHub URL</label>
          <input 
            value={project.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            className="w-full p-2 rounded bg-black/50 border border-white/20 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Demo URL</label>
          <input 
            value={project.demo || ''}
            onChange={(e) => handleChange('demo', e.target.value)}
            className="w-full p-2 rounded bg-black/50 border border-white/20 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Tech Stack (comma separated)</label>
        <input 
          value={(project.tech || []).join(', ')}
          onChange={(e) => handleChange('tech', e.target.value.split(',').map(s => s.trim()))}
          className="w-full p-2 rounded bg-black/50 border border-white/20 focus:border-blue-500 outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Short Description (Card)</label>
        <textarea 
          value={project.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full p-2 rounded bg-black/50 border border-white/20 focus:border-blue-500 outline-none min-h-[60px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Long Description (Detail Page)</label>
        <textarea 
          value={project.longDescription || ''}
          onChange={(e) => handleChange('longDescription', e.target.value)}
          className="w-full p-2 rounded bg-black/50 border border-white/20 focus:border-blue-500 outline-none min-h-[120px]"
        />
      </div>
    </div>
  );
}
