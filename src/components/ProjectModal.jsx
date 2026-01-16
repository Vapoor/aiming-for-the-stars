import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ThreeViewer = ({ model, textures }) => {
  const mountRef = useRef(null)
  const { baseColor, normal, roughness } = textures || {}

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || !model) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b0b0b)

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.set(0, 1, 3)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 0.5, 0)

    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xffffff, 0.8)
    dir.position.set(5, 10, 7)
    scene.add(dir)

    const loader = new OBJLoader()
    const texLoader = new THREE.TextureLoader()

    const baseUrl = baseColor
    const normalUrl = normal
    const roughnessUrl = roughness

    Promise.all([
      baseUrl ? texLoader.loadAsync(baseUrl) : Promise.resolve(null),
      normalUrl ? texLoader.loadAsync(normalUrl) : Promise.resolve(null),
      roughnessUrl ? texLoader.loadAsync(roughnessUrl) : Promise.resolve(null)
    ]).then(([baseMap, normalMap, roughnessMap]) => {
      // tune textures
      const maxAniso = renderer.capabilities.getMaxAnisotropy()
      if (baseMap) {
        baseMap.generateMipmaps = true
        baseMap.minFilter = THREE.LinearMipmapLinearFilter
        baseMap.magFilter = THREE.LinearFilter
        baseMap.anisotropy = Math.min(4, maxAniso)
        baseMap.flipY = false
      }
      if (normalMap) {
        normalMap.generateMipmaps = true
        normalMap.minFilter = THREE.LinearMipmapLinearFilter
        normalMap.magFilter = THREE.LinearFilter
        normalMap.anisotropy = Math.min(4, maxAniso)
        normalMap.flipY = false
        normalMap.needsUpdate = true
      }
      if (roughnessMap) {
        roughnessMap.generateMipmaps = true
        roughnessMap.minFilter = THREE.LinearMipmapLinearFilter
        roughnessMap.magFilter = THREE.LinearFilter
        roughnessMap.anisotropy = Math.min(4, maxAniso)
        roughnessMap.flipY = false
        roughnessMap.needsUpdate = true
      }

      loader.load(
        model,
        (obj) => {
          obj.traverse((child) => {
            if (child.isMesh) {
              const mat = new THREE.MeshStandardMaterial({
                map: baseMap || null,
                normalMap: normalMap || null,
                roughnessMap: roughnessMap || null,
                metalness: 0
              })
              if (normalMap) mat.normalScale = new THREE.Vector2(1, 1)
              child.material = mat
              child.castShadow = true
              child.receiveShadow = true
            }
          })
          // center and scale
          const box = new THREE.Box3().setFromObject(obj)
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          if (maxDim > 0) {
            const scale = 1.6 / maxDim
            obj.scale.setScalar(scale)
            box.setFromObject(obj)
          }
          box.getCenter(obj.position).multiplyScalar(-1)
          scene.add(obj)
        },
        undefined,
        (err) => console.error('OBJ load error', err)
      )
    }).catch(err => {
      console.error('Texture load error', err)
    })

    const handleResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    let rafId
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      renderer.dispose()
      // dispose geometries and materials
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose && m.dispose())
          } else {
            obj.material?.dispose && obj.material.dispose()
          }
        }
      })
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [model, baseColor, normal, roughness])

  return <div ref={mountRef} style={{ width: '100%', height: 420 }} />
}

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

  const resolveAsset = (p) => {
    if (!p) return p
    if (/^https?:\/\//i.test(p)) return p
    const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')
    const path = String(p).replace(/^\/+/, '')
    return `${base}/${path}`
  }

  if (!project) return null
  const raw = Array.isArray(project.media) ? project.media.slice(0, 2) : []
  const media = raw.map((m) => {
    const obj = typeof m === 'string' ? { src: m } : m
    return { ...obj, src: resolveAsset(obj.src) }
  })
  const mediaList = []
  if (project.image) mediaList.push({ src: resolveAsset(project.image) })
  media.forEach((m) => {
    if (!mediaList.some((e) => e.src === m.src)) mediaList.push(m)
  })

  const isVideo = (src) => typeof src === 'string' && /\.(mp4|webm|ogg)(\?.*)?$/.test(src)
  const isYouTube = (src) =>
    typeof src === 'string' &&
    /(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/i.test(src)

  const toYouTubeEmbed = (src) => {
    try {
      if (!/^https?:\/\//i.test(src)) return src
      const url = new URL(src)
      // youtu.be/<id>
      if (url.hostname.includes('youtu.be')) {
        const id = url.pathname.slice(1)
        if (id) return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`
      }
      // youtube.com/watch?v=<id> or /embed/<id>
      if (url.hostname.includes('youtube.com')) {
        if (url.pathname.startsWith('/embed/')) {
          return `https://www.youtube-nocookie.com${url.pathname}${url.search ? url.search : '?rel=0&modestbranding=1'}`
        }
        const id = url.searchParams.get('v')
        if (id) return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`
      }
    } catch {
      // If URL parsing fails, just return the original src
    }
    return src
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative max-w-4xl mx-auto mt-12 bg-zinc-900 text-white rounded-2xl overflow-hidden shadow-lg max-h-[calc(100vh-4rem)] flex flex-col">
        <header className="flex items-start justify-between p-5 border-b border-zinc-800 flex-shrink-0">
          <h3 className="text-2xl font-semibold">{project.titre}</h3>
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
            <div className="text-zinc-100 text-xl font-semibold leading-relaxed">
              {project.longDescription}
            </div>
          ) : (
            <div className="text-zinc-100 text-xl font-semibold leading-relaxed">
              {project.description}
            </div>
          )}

          {/* small note for 3D projects */}
          {project.modelUrl ? (
            <div className="text-sm text-zinc-400 italic mb-3">
              Cette boite  affiche une prévisualisation en 3D. Cela peut prendre quelques secondes pour charger - Veuillez patientez quelques secondes.
            </div>
          ) : null}

          {/* three.js viewer when modelUrl is present */}
          {project.modelUrl ? (
            <ThreeViewer
              model={resolveAsset(project.modelUrl)}
              textures={{
                baseColor: resolveAsset(project.textures?.baseColor),
                normal: resolveAsset(project.textures?.normal),
                roughness: resolveAsset(project.textures?.roughness),
              }}
            />
          ) : null}

          {mediaList.map((m, i) => (
            <div key={i} className="space-y-3">
              {(m.caption || m.description) && (
                <div className="text-base text-zinc-400">
                  {m.caption && <div className="font-medium text-zinc-200">{m.caption}</div>}
                  {m.description && <div className="mt-1">{m.description}</div>}
                </div>
              )}

              <div className="rounded-lg overflow-hidden border border-zinc-800 bg-black">
                {isYouTube(m.src) ? (
                  <div className="relative w-full pt-[56.25%]">
                    <iframe
                      title={m.caption || project.titre}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full"
                      src={toYouTubeEmbed(m.src)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : isVideo(m.src) ? (
                  <video
                    src={m.src}
                    controls
                    preload="metadata"
                    playsInline
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
                <span key={i} className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full text-sm">
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
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-sm"
            >
              <img
                src={resolveAsset('/assets/icons/github.svg')}
                alt="GitHub"
                width={18}
                height={18}
                style={{ filter: 'invert(1)' }}
              />
               <span>View on GitHub</span>
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-sm"
            >
              Live Demo
            </a>
          ) : null}
          <button onClick={onClose} className="px-3 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-sm">Close</button>
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
