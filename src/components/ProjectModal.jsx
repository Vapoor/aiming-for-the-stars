import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import GitHubIcon from '../assets/icons/github.svg?react'

const ModalContent = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  if (!project) return null
  const raw = Array.isArray(project.media) ? project.media.slice(0, 3) : []
  const media = raw.map(m => (typeof m === 'string' ? { src: m } : m))
  const fallback = project.image ? [{ src: project.image }] : []
  const mediaList = media.length ? media : fallback

  const isVideo = (src) => typeof src === 'string' && /\.(mp4|webm|ogg)(\?.*)?$/.test(src)

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative max-w-4xl mx-auto mt-12 bg-zinc-900 text-white rounded-2xl overflow-hidden shadow-lg max-h-[calc(100vh-4rem)] flex flex-col">
        <header className="flex items-start justify-between p-5 border-b border-zinc-800 flex-shrink-0">
          <h3 className="text-xl font-semibold">{project.titre}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-zinc-300 hover:text-white"
          >
            ✕
          </button>
        </header>
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {project.longDescription ? (
            <div className="text-zinc-100 text-lg font-semibold leading-relaxed">
              {project.longDescription}
            </div>
          ) : (
            <div className="text-zinc-100 text-lg font-semibold leading-relaxed">
              {project.description}
            </div>
          )}
          {mediaList.map((m, i) => (
            <div key={i} className="space-y-3">
              {(m.caption || m.description) && (
                <div className="text-sm text-zinc-400">
                  {m.caption && <div className="font-medium text-zinc-200">{m.caption}</div>}
                  {m.description && <div className="mt-1">{m.description}</div>}
                </div>
              )}

              <div className="rounded-lg overflow-hidden border border-zinc-800 bg-black flex justify-center items-center">
                {isVideo(m.src) ? (
                  <video
                    src={m.src}
                    controls
                    className="w-full h-auto max-h-[60vh]"
                  />
                ) : (
                  <img
                    src={m.src}
                    alt={m.caption || project.titre}
                    className="w-full h-auto object-contain"
                  />
                )}
              </div>

              {i < mediaList.length - 1 && <hr className="border-t border-zinc-800 my-4" />}
            </div>
          ))}

          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t, i) => (
                <span key={i} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <footer className="flex items-center justify-end gap-3 p-4 border-t border-zinc-800 flex-shrink-0">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700"
            >
              <GitHubIcon width={18} height={18} style={{ filter: 'invert(1)' }} />
              <span>View on GitHub</span>
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-500"
            >
              Live Demo
            </a>
          ) : null}
          <button onClick={onClose} className="px-3 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600">Close</button>
        </footer>
      </div>
    </div>
  )
}

const ProjectModal = ({ open, project, onClose }) => {
  if (!open) return null
  return ReactDOM.createPortal(
    <ModalContent project={project} onClose={onClose} />,
    document.body
  )
}

export default ProjectModal
