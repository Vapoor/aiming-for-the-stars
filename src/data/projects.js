export const projects = [
    {
      titre: "Cloud2Gether",
      description: "Ecoute partagée entre utilisateurs pour la plateforme Soundcloud",
      longDescription: "Cloud2Gether permet à plusieurs utilisateurs d'écouter et synchroniser des pistes SoundCloud en temps réel. Implémentation d'authentification, sockets pour la synchronisation et UI responsive.",
      tech: ["React", "Node.js"],
      image: "/src/assets/images/cloud2gether_main.png",
      // 3 media items (objects with src, caption, description)
      media: [
        {
          src: "/src/assets/images/cloud2gether_media1.png",
          caption: "Page principale",
          description: "Vue principale montrant les différents éléments de l'interface."
        },
        {
          src: "/src/assets/images/cloud2gether_media2.png",
          caption: "Recherche dans les playlists de l'utilisateur",
          description: "Permet une recherche simple et rapide des musiques déjà présentes dans les playlists propres à l'utilisateur."
        },
        {
          src: "/src/assets/images/cloud2gether_media3.png",
          caption: "Recherche avec barre de recherche",
          description: "Permet une recherche avancée grâce à l'API de Soundcloud."
        }
      ],
      githubUrl: "https://github.com/Vapoor/cloud2gether",
      liveUrl: "",
      professional: false
    },
    {
      titre: "Exuvie",
      description: "Expérience sonore et visuelle en VR",
      longDescription: "Exuvie est une expérience immersive en réalité virtuelle explorant la relation entre le son et l'espace. Utilisation d'Unreal Engine pour créer un environnement interactif où les utilisateurs peuvent manipuler leur propre Exuvie. En relation dans le cadre d'une exposition pour une artiste.",
      tech: ["C++", "Unreal Engine"],
      image: "/",
      media: [
        {
          src: "/src/assets/images/exuvie_media1.png",
          caption: "Représentation de l'Exuvie",
          description: "Aperçu de l'Exuvie seule."
        }
      ],
      githubUrl: "",
      liveUrl: "",
      professional: true
    },
    {
      titre: "Voltige 2",
      description: "Amélioration de la qualité logicielle dans le cadre d'un projet de recherche",
      longDescription: "Travail sur la robustesse et la maintenabilité du code : refactorings, tests unitaires, CI et optimisation des performances pour le composant moteur.",
      tech: ["C++", "C", "Python"],
      image: "/",
      media: [
        {
          src: "/src/assets/images/voltige2_media1.png",
          caption: "Représentation visuelle des recherches mathématiques",
          description: "Visualiseur d'objets mathématiques en N dimensions, avec possibilités d'afficher différents calculs comme des distances maps."
        },
        {
          src: "/src/assets/images/voltige2_media2.png",
          caption: "Intégration de tests unitaires",
          description: "Intégration de tests unitaires pour assurer la stabilité des fonctionnalités critiques, permettant la detection dans ce cas d'un calcul erroné suite à une modification du code."
        }
      ],
      githubUrl: "",
      liveUrl: "",
      professional: true
    }
  ]