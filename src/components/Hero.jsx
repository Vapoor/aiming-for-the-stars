import React from 'react'
const Hero = () => {
    const scrollToProjects = () => {
      document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' })
    }
  
    return (
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-fade-in">
            GAGNANT Kylian
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 text-justify animate-slide-up">
            A developer passionate about creating innovative and high-performing user experiences.
          </p>
          <button
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            Check my projects
          </button>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
            <div className="w-1 h-3 bg-white/60 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    )
  }
  
  export default Hero