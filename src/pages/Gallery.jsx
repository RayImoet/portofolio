import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaTimes, FaArrowRight } from 'react-icons/fa';

// ==========================================
// PROJECT GALLERY
// Ganti image dengan screenshot project kamu
// ==========================================
const projects = [
 
];

const categories = [];

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-24"
    >
      {/* Header */}
      <div className="text-center mb-10 md:mb-14">
        <p className="text-cyan-400 font-semibold tracking-[0.3em] text-xs md:text-sm mb-3">
          MY WORK
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          </span>{' '}
          <span className="dark:text-white text-slate-800">GALLERY</span>
        </h1>
        <p className="max-w-2xl mx-auto dark:text-slate-400 text-slate-600 text-sm md:text-base leading-relaxed">
          Kumpulan dokumentasi kegiatan saya saat bekerja.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold border transition-all duration-300 ${
              filter === category
                ? 'bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-600 dark:border-white/10 border-slate-200 hover:border-cyan-400/50 hover:text-cyan-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-2xl dark:bg-slate-900/70 bg-white border dark:border-white/10 border-slate-200 shadow-xl hover:shadow-cyan-500/10 transition-shadow"
            >
              {/* Image */}
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="relative block w-full h-52 overflow-hidden text-left"
                aria-label={`Lihat ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80" />
                <span className="absolute left-4 bottom-4 px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-300/30 text-cyan-200 text-[11px] font-semibold backdrop-blur-md">
                  {project.category}
                </span>
              </button>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h2 className="text-xl font-bold dark:text-white text-slate-900 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed dark:text-slate-400 text-slate-600 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] dark:bg-cyan-400/10 bg-cyan-50 dark:text-cyan-300 text-cyan-700 border dark:border-cyan-400/20 border-cyan-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold transition-colors"
                  >
                    Detail <FaArrowRight className="text-xs" />
                  </button>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => project.github === '#' && e.preventDefault()}
                    className="px-4 py-2.5 rounded-lg dark:bg-white/5 bg-slate-100 dark:text-white text-slate-700 dark:border-white/10 border-slate-200 border hover:border-cyan-400/50 transition-colors"
                    aria-label={`GitHub ${project.title}`}
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl dark:bg-slate-900 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                aria-label="Tutup"
              >
                <FaTimes />
              </button>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-56 md:h-96 object-cover"
              />

              <div className="p-6 md:p-8">
                <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                  {selectedProject.category}
                </p>
                <h2 className="text-2xl md:text-4xl font-black dark:text-white text-slate-900 mt-2">
                  {selectedProject.title}
                </h2>
                <p className="mt-4 dark:text-slate-400 text-slate-600 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {selectedProject.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-7">
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => selectedProject.demo === '#' && e.preventDefault()}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition-colors"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => selectedProject.github === '#' && e.preventDefault()}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl dark:bg-white/10 bg-slate-100 dark:text-white text-slate-700 font-semibold transition-colors"
                  >
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default Gallery;
