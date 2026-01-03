import { Track } from "../types/Track";

const trackData = {
  tracks: [
    {
      id: 1,
      title: "Attaque 77 - Arrancacorazones",
      src: "/tracks/Attaque 77 - Arrancacorazones.mp3"
    },
    {
      id: 2,
      title: "Attaque 77 - Chance",
      src: "/tracks/Attaque 77 - Chance.mp3"
    },
    {
      id: 3,
      title: "Cachorro López Bandalos Chinos - Costumbres Argentinas",
      src: "/tracks/Cachorro López Bandalos Chinos - Costumbres Argentinas.mp3"
    },
    {
      id: 4,
      title: "Callejeros - 9 de Julio",
      src: "/tracks/Callejeros - 9 de Julio.mp3"
    },
    {
      id: 5,
      title: "Callejeros - Creo",
      src: "/tracks/Callejeros - Creo.mp3"
    },
    {
      id: 6,
      title: "Callejeros - Imposible",
      src: "/tracks/Callejeros - Imposible.mp3"
    },
    {
      id: 7,
      title: "Callejeros - Prohibido (En Vivo Obras)",
      src: "/tracks/Callejeros - Prohibido (En Vivo Obras).mp3"
    },
    {
      id: 8,
      title: "Ciro y Los Persas - Insisto",
      src: "/tracks/Ciro y Los Persas - Insisto.mp3"
    },
    {
      id: 9,
      title: "Estelares - Aire",
      src: "/tracks/Estelares - Aire.mp3"
    },
    {
      id: 10,
      title: "Estelares - Sólo por hoy",
      src: "/tracks/Estelares - Sólo por hoy.mp3"
    },
    {
      id: 11,
      title: "Estelares & Emiliano - Bicho de ciudad",
      src: "/tracks/Estelares & Emiliano - Bicho de ciudad.mp3"
    },
    {
      id: 12,
      title: "Gustavo Cerati - Adios",
      src: "/tracks/Gustavo Cerati - Adios.mp3"
    },
    {
      id: 13,
      title: "Gustavo Cerati - Crimen",
      src: "/tracks/Gustavo Cerati - Crimen.mp3"
    },
    {
      id: 14,
      title: "Gustavo Cerati - Deja vu Official Audio",
      src: "/tracks/Gustavo Cerati - Deja vu Official Audio.mp3"
    },
    {
      id: 15,
      title: "Gustavo Cerati - Puente (Official Video)",
      src: "/tracks/Gustavo Cerati - Puente (Official Video).mp3"
    },
    {
      id: 16,
      title: "Las Pastillas del Abuelo - El favor",
      src: "/tracks/Las Pastillas del Abuelo - El favor.mp3"
    },
    {
      id: 17,
      title: "Las Pastillas del Abuelo - Interpretación",
      src: "/tracks/Las Pastillas del Abuelo - Interpretación.mp3"
    },
    {
      id: 18,
      title: "Las Pastillas Del Abuelo - Ojos De Dragón!",
      src: "/tracks/Las Pastillas Del Abuelo - Ojos De Dragón!.mp3"
    },
    {
      id: 19,
      title: "Las Pastillas Del Abuelo - Rompecabezas De Amor",
      src: "/tracks/Las Pastillas Del Abuelo - Rompecabezas De Amor.mp3"
    },
    {
      id: 20,
      title: "Las pelotas - Personalmente",
      src: "/tracks/Las pelotas - Personalmente.mp3"
    },
    {
      id: 21,
      title: "Las Pelotas - Que podes dar",
      src: "/tracks/Las Pelotas - Que podes dar.mp3"
    },
    {
      id: 22,
      title: "Las Pelotas - Será",
      src: "/tracks/Las Pelotas - Será.mp3"
    },
    {
      id: 23,
      title: "SEMINARE - CHARLY GARCÍA Épica versión bajo la lluvia - Quilmes Rock 2004",
      src: "/tracks/SEMINARE - CHARLY GARCÍA Épica versión bajo la lluvia - Quilmes Rock 2004.mp3"
    }
  ]
};

export const getLocalTracks = (): Track[] => {
  return trackData.tracks.map((t) => ({
    id: t.id,
    title: t.title,
    url: encodeURI(t.src) // codifica espacios y caracteres especiales
  }));
};
