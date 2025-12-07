import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { sectionReveal, itemReveal, staggerChildren } from "../animations/reveal";
import SectionParticles from "../components/SectionParticles";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function Contact() {
  const formRef = useRef();

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_wuaexb9",     // service_xxx from EmailJS
      "template_6v8hwv3",    // template_xxx from EmailJS
      formRef.current,
      "53K4RKN6pslJLDVIG"      // from EmailJS
    )
    .then(() => {
      alert("Message sent successfully! 🚀");
      formRef.current.reset();
    })
    .catch((err) => {
      console.error(err);
      alert("Something went wrong. Try again.");
    });
};

  return (
    <motion.section
      id="contact"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 text-[hsl(var(--foreground))] overflow-hidden"
    >
      {/* PARTICLES */}
      <SectionParticles count={10} />

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-[var(--bg-glow-2)] rounded-full blur-[120px] top-10 left-10"></div>
        <div className="absolute w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[var(--bg-glow-3)] rounded-full blur-[160px] bottom-10 right-10"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">

        {/* LEFT TEXT SIDE */}
        <motion.div variants={staggerChildren} className="space-y-4 sm:space-y-6">
          <motion.h2 
            variants={itemReveal}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            Let's Build<br />
            Something <span className="text-[hsl(var(--accent))]">Great</span>
          </motion.h2>

          <motion.p
            variants={itemReveal}
            className="text-base sm:text-lg text-[hsl(var(--muted-foreground))] max-w-md leading-relaxed"
          >
            Whether you want to collaborate, discuss an idea, or just say hi —
            my inbox is always open. I'll get back to you as soon as I can.
          </motion.p>

          {/* SOCIAL ICONS */}
          <motion.div variants={itemReveal} className="flex gap-4 sm:gap-5 pt-4">
            {[
              { icon: <Github />, link: "https://github.com/siddharth251206" },
              { icon: <Linkedin />, link: "https://www.linkedin.com/in/siddharth-sheth-007873319" },
              { icon: <Instagram />, link: "https://instagram.com/sidhu_251206" },
            ].map((social, i) => (
              <a 
                key={i}
                href={social.link}
                target="_blank"
                className="p-2.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 
                hover:bg-[hsl(var(--accent))] hover:text-black transition-all"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT FORM SIDE */}
        <motion.form 
  ref={formRef}
  onSubmit={sendEmail}
  variants={staggerChildren}
  className="
    relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl
    backdrop-blur-2xl
    bg-white/10 dark:bg-white/5
    border border-white/20 dark:border-white/10
    shadow-xl shadow-black/30
    space-y-6 sm:space-y-8
  "
>

          {/* NAME FIELD */}
          <motion.div variants={itemReveal} className="relative">
            <input
              type="text"
              name="name"
              required
              className="w-full bg-transparent border-b border-[rgb(var(--input-border))]
              focus:border-[hsl(var(--accent))] outline-none py-2 sm:py-3 peer text-sm sm:text-base"
            />
            <label
              className="
                absolute left-0 top-2 sm:top-3 text-sm sm:text-base text-[hsl(var(--muted-foreground))]
                transition-all peer-focus:-top-4 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[hsl(var(--accent))]
                peer-valid:-top-4 peer-valid:text-xs sm:peer-valid:text-sm
              "
            >
              Your Name
            </label>
          </motion.div>

          {/* EMAIL FIELD */}
          <motion.div variants={itemReveal} className="relative">
            <input
              type="email"
              name="email"
              required
              className="w-full bg-transparent border-b border-[rgb(var(--input-border))] 
              focus:border-[hsl(var(--accent))] outline-none py-2 sm:py-3 peer text-sm sm:text-base"
            />
            <label
              className="
                absolute left-0 top-2 sm:top-3 text-sm sm:text-base text-[hsl(var(--muted-foreground))]
                transition-all peer-focus:-top-4 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[hsl(var(--accent))]
                peer-valid:-top-4 peer-valid:text-xs sm:peer-valid:text-sm
              "
            >
              Email
            </label>
          </motion.div>

          {/* MESSAGE FIELD */}
          <motion.div variants={itemReveal} className="relative">
            <textarea
              required
              rows="4"
              name="message"
              className="w-full bg-transparent border-b border-[rgb(var(--input-border))] 
              focus:border-[hsl(var(--accent))] outline-none py-2 sm:py-3 peer resize-none text-sm sm:text-base"
            />
            <label
              className="
                absolute left-0 top-2 sm:top-3 text-sm sm:text-base text-[hsl(var(--muted-foreground))]
                transition-all peer-focus:-top-4 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-[hsl(var(--accent))]
                peer-valid:-top-4 peer-valid:text-xs sm:peer-valid:text-sm
              "
            >
              Message
            </label>

          </motion.div>

          {/* SUBMIT BUTTON */}
          <motion.button
            variants={itemReveal}
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl btn text-[hsl(var(--foreground))] font-semibold
            hover:opacity-90 transition-all"
          >
            Send Message
          </motion.button>

        </motion.form>
      </div>
    </motion.section>
  );
}