import React from 'react'

const skillSections = [
  {
    title: "Languages",
    skills: [
      { name: "C", badge: "https://img.shields.io/badge/C-27338e?logo=c&logoColor=white" },
      { name: "C++", badge: "https://img.shields.io/badge/C++-00599C?logo=cplusplus&logoColor=white" },
      { name: "JavaScript", badge: "https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" },
      { name: "TypeScript", badge: "https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" },
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", badge: "https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" },
      { name: "Next.js", badge: "https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white" },
      { name: "Laravel", badge: "https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white" },
    ]
  },
  {
    title: "Graphics & Engines",
    skills: [
      { name: "OpenGL", badge: "https://img.shields.io/badge/OpenGL-5586A4?logo=opengl&logoColor=white" },
      { name: "Unreal Engine", badge: "https://img.shields.io/badge/Unreal%20Engine-0e1111?logo=unreal-engine&logoColor=white" },
      { name: "Unity", badge: "https://img.shields.io/badge/Unity-000000?logo=unity&logoColor=white" }
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", badge: "https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" },
      { name: "SQLite", badge: "https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white" },
    ]
  },
  {
    title: "Testing / Automation",
    skills: [
      { name: "Robot Framework", badge: "https://img.shields.io/badge/Robot%20Framework-000000?logo=robotframework&logoColor=white" },
    ]
  },
  {
    title: "Tooling / DevOps",
    skills: [
      { name: "Node.js", badge: "https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" },
      { name: "Docker", badge: "https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" },
      { name: "Git", badge: "https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white" },
      { name: "Subversion", badge: "https://img.shields.io/badge/Subversion-809CC9?logo=subversion&logoColor=white" },
      { name: "Linux", badge: "https://img.shields.io/badge/Linux-FCC624?logo=linux&logoColor=black" },
      { name: "VS Code", badge: "https://img.shields.io/badge/VS%20Code-007ACC?logo=visualstudiocode&logoColor=white" },
      { name: "VS Community", badge: "https://img.shields.io/badge/VS%20Community-5C2D91?logo=visual-studio&logoColor=white" },
      { name: "CI/CD (GitHub Actions)", badge: "https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white" }
    ]
  }
]

const About = () => (
  <section id="apropos" className="py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        À propos
      </h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-lg text-gray-300 leading-relaxed">
            Je suis un développeur full-stack de 20 ans, intéressé depuis mon plus jeune âge dans l'informatique, actuellement en 3ème année BUT Informatique à la Faculté d'Arles.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Je crée des applications, orienté sur la simplicité et l'efficacité. Je possède des bases solides dans différents langages (programmation comme oral).
            J'ai hâte de pouvoir mettre mes compétences en pratique dans le monde professionnel.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            En dehors de la programmation, je joue de manière compétitive à plusieurs jeux vidéos, la plupart d'entre eux en équipe. Cela m'a forgé un esprit compétitif au quotidien.
          </p>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4 text-white"> Tech & Skills</h3>
          {skillSections.map((section, idx) => (
            <div key={idx} className="mb-2">
              <div className="font-semibold text-purple-300 mb-2">{section.title}</div>
              <div className="flex flex-wrap gap-2">
                {section.skills.map((skill, i) => (
                  <img
                    key={i}
                    src={skill.badge}
                    alt={skill.name}
                    className="h-7"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default About