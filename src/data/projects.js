export const projects = [
    {
      titre: "Cloud2Gether",
      description: "Shared listening between users for the SoundCloud platform",
      longDescription: "Cloud2Gether allows multiple users to listen to and synchronize SoundCloud tracks in real time. Implemented authentication with OAuth 2.1, sockets for synchronization, and a responsive UI.",
      tech: ["React", "Node.js"],
      image: "/assets/images/cloud2gether_main.png",
      // 3 media items (objects with src, caption, description)
      media: [
        {
          src: "/assets/images/cloud2gether_media1.png",
          caption: "Main page",
          description: "Main view showing the different interface elements."
        },
        {
          src: "/assets/images/cloud2gether_media2.png",
          caption: "Search within user's playlists",
          description: "Allows quick and simple searching of tracks already present in the user's own playlists."
        },
        {
          src: "/assets/images/cloud2gether_media3.png",
          caption: "Search with search bar",
          description: "Provides advanced search using the SoundCloud API."
        }
      ],
      githubUrl: "https://github.com/Vapoor/cloud2gether",
      liveUrl: "",
      professional: false
    },
    {
      titre: "Exuvie",
      description: "Sound and visual experience in VR",
      longDescription: "Exuvie is an immersive virtual reality experience exploring the relationship between sound and space. Uses Unreal Engine to create an interactive environment where users can manipulate their own Exuvie. This project is part of a future exhibition for an artist.",
      tech: ["C++", "Unreal Engine", "Blueprints"],
      image: "/assets/images/exuvie_main.png",
      modelUrl: "/assets/exuvie.neutral.7kpoints.obj",
      textures: {
        baseColor: '/assets/textures/exuvie.basecolor.png',
        normal: '/assets/textures/exuvie.normal.png',
        roughness: '/assets/textures/exuvie.roughness.png'
      },
      media: [
        {
          src: "https://youtu.be/OCYTpZjAT6M",
          caption: "This project is still in progress and far from finished and polished. Nevertheless, it taught me a lot about Unreal Engine 5.6.1 features, including mesh optimization and performance tuning."
        }
      ],
      githubUrl: "",
      liveUrl: "",
      professional: true
    },
    {
      titre: "Voltige 2",
      description: "Improving software quality within a research project",
      longDescription: "Work on the robustness and maintainability of the code: refactorings, unit tests, CI, and performance optimization for the engine component.",
      tech: ["C++", "C", "Python"],
      image: "/assets/images/voltige2_media1.png",
      media: [
        {
          src: "/assets/images/voltige2_media1.png",
          caption: "Visual representation of mathematical research",
          description: "Visualizer for mathematical objects in N dimensions, with options to display various computations like distance maps."
        },
        {
          src: "/assets/images/voltige2_media2.png",
          caption: "Unit tests integration",
          description: "Integration of unit tests to ensure the stability of critical features, enabling detection of an incorrect calculation following a code change."
        }
      ],
      githubUrl: "",
      liveUrl: "",
      professional: true
    }
  ]