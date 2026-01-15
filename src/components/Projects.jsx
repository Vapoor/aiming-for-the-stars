import React, { useState } from 'react'
import { projects } from '../data/projects'
import GitHubIcon from '../assets/icons/github.svg?react'
import ProjectModal from './ProjectModal'

const Projects = () => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const openModal = (project) => {
    setSelected(project)
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
    setSelected(null)
  }

  return (
    <section id="projets" className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Expériences et Projets
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((projet, index) => {
            // prefer projet.image as the preview thumbnail, then fall back to first media item
            const thumb = projet.image
              ? projet.image
              : (projet.media && projet.media[0]
                  ? (typeof projet.media[0] === 'string' ? projet.media[0] : projet.media[0].src)
                  : undefined)
            const thumbAlt = projet.image
              ? projet.titre
              : (projet.media && projet.media[0] && typeof projet.media[0] !== 'string' && projet.media[0].caption
                  ? projet.media[0].caption
                  : projet.titre)

            return (
              <div
                key={index}
                onClick={() => openModal(projet)}
                className="cursor-pointer bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden hover:scale-105 transform transition-all duration-300 hover:bg-white/10 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={thumb}
                    alt={thumbAlt}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{projet.titre}</h3>
                  <p className="text-gray-300 text-sm mb-4">{projet.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projet.professional ? (
                      <span className="px-2 py-1 rounded-full text-xs bg-red-600/20 text-red-300">
                        Expérience pro
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs bg-cyan-600/20 text-cyan-300">
                        Projet Perso
                      </span>
                    )}

                    {/* tech tags: always purple */}
                    {projet.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {projet.githubUrl && (
                    <a 
                      href={projet.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                    >
                      <GitHubIcon width={24} height={24} style={{ filter: 'invert(1)'}} />
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ProjectModal open={open} project={selected} onClose={closeModal} />
    </section>
  )
}

export default Projects