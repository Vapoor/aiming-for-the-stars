import { Mail } from 'lucide-react'
import { siGithub } from 'simple-icons'

const GitHubIcon = ({ className, size }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d={siGithub.path} />
  </svg>
)

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "kylian.gagnant@orange.fr",
      href: "mailto:kylian.gagnant@orange.fr",
      color: "text-purple-400",
      isLucide: true
    },
    {
      icon: GitHubIcon,
      title: "GitHub",
      description: "Check my repositories",
      href: "https://github.com/Vapoor",
      color: "text-gray-400",
      isLucide: false
    }
  ]

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Contact
        </h2>
        <p className="text-xl text-gray-300 mb-12">
          Have a project idea? Don't hesitate to contact me!
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon
            return (
              <a
                key={index}
                href={method.href}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <IconComponent 
                  className={`${method.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} 
                  size={32} 
                />
                <h3 className="font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-400">{method.description}</p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Contact