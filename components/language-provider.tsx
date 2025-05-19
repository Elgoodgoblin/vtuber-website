"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Translations
const translations = {
  en: {
    // Navbar
    streams: "Streams",
    clips: "Clips",
    collaborators: "Collaborators",
    bio: "Biography",
    credits: "Credits",
    donate: "Donate",

    // Hero
    welcome: "Welcome to",
    tagline: "Your cozy corner to enjoy streams, laughs, and unique moments with your favorite goblin VTuber.",
    watch_stream: "Watch Stream",
    latest_clips: "Latest Clips",

    // Social
    follow_me: "Follow Me",

    // Videos
    videos_and_clips: "Videos & Clips",
    featured_clips: "Featured Clips",
    recent_streams: "Recent Streams",
    upcoming_streams: "Upcoming Streams",
    views: "views",

    // Schedule
    stream_schedule: "Stream Schedule",
    weekly_schedule: "Weekly Schedule",
    monday: "Monday",
    wednesday: "Wednesday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    schedule_note: "* Schedules may vary. Follow my social media to stay updated on changes or special streams.",
    special: "Special",
    collab: "Collab",
    regular: "Regular",

    // Collaborators
    frequent_collaborators: "Frequent Collaborators",
    view_channel: "View Channel",

    // Biography
    biography: "Biography",
    history: "History",
    personality: "Personality",
    fun_facts: "Fun Facts",
    bio_history_1:
      "Born in the depths of the Emerald Forest, this peculiar goblin discovered his passion for hospitality after finding an ancient book about human bars.",
    bio_history_2:
      "He decided to abandon the goblin traditions of looting to open the first bar run by a goblin, fusing the warmth of a wooden tavern with the unique touch of goblin culture.",
    bio_history_3:
      "Now, he shares his adventures, stories, and talents through streams, creating a welcoming space for all visitors to the digital realm.",
    bio_personality_1:
      "Charismatic and with a peculiar humor, our goblin host combines the typical cunning of his species with unexpected kindness and attention to detail.",
    bio_personality_2: "Passionate about stories, games, and creating memorable experiences for his community.",
    bio_personality_3:
      "Despite his appearance that might intimidate some, his contagious laugh and genuine interest in his guests make him the perfect host for any adventure.",
    bio_facts_1: "Collects beer mugs from all the realms he visits.",
    bio_facts_2: "His favorite drink is chocolate milk, despite goblins traditionally preferring stronger drinks.",
    bio_facts_3: "Has a natural gift for music, especially with improvised percussion instruments.",
    bio_facts_4: "Despite his new peaceful life, he maintains a collection of hats that he considers his 'treasure'.",
    bio_facts_5: "Speaks five languages, including ancient elvish, which he learned to read elvish dessert recipes.",

    // Credits
    credits_and_thanks: "Credits & Thanks",
    creative_team: "Creative Team",
    artists: "Artists",
    technical_team: "Technical Team",
    contributions: "Contributions:",
    special_thanks: "Special Thanks",
    thanks_message:
      "A special thanks to the entire community that has supported this project since its beginnings. To the moderators, subscribers, and viewers who make each stream a unique experience.",

    // Footer
    rights_reserved: "All rights reserved.",
    made_with: "Made with",
    for_community: "for the community",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    contact: "Contact",
    faq: "FAQ",
  },
  es: {
    // Navbar
    streams: "Streams",
    clips: "Clips",
    collaborators: "Colaboradores",
    bio: "Biografía",
    credits: "Créditos",
    donate: "Donar",

    // Hero
    welcome: "Bienvenidos al",
    tagline: "Tu rincón acogedor para disfrutar de streams, risas y momentos únicos con tu VTuber goblin favorito.",
    watch_stream: "Ver Stream",
    latest_clips: "Últimos Clips",

    // Social
    follow_me: "Sígueme en Redes",

    // Videos
    videos_and_clips: "Videos y Clips",
    featured_clips: "Clips Destacados",
    recent_streams: "Streams Recientes",
    upcoming_streams: "Próximos Streams",
    views: "vistas",

    // Schedule
    stream_schedule: "Horario de Streams",
    weekly_schedule: "Programación Semanal",
    monday: "Lunes",
    wednesday: "Miércoles",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
    schedule_note:
      "* Los horarios pueden variar. Sigue mis redes sociales para estar al tanto de cambios o streams especiales.",
    special: "Especial",
    collab: "Colaboración",
    regular: "Regular",

    // Collaborators
    frequent_collaborators: "Colaboradores Frecuentes",
    view_channel: "Ver Canal",

    // Biography
    biography: "Biografía",
    history: "Historia",
    personality: "Personalidad",
    fun_facts: "Curiosidades",
    bio_history_1:
      "Nacido en las profundidades del Bosque Esmeralda, este peculiar goblin descubrió su pasión por la hospitalidad tras encontrar un antiguo libro sobre bares humanos.",
    bio_history_2:
      "Decidió abandonar las tradiciones goblin de saqueo para abrir el primer bar atendido por un goblin, fusionando la calidez de una taberna de madera con el toque único de la cultura goblin.",
    bio_history_3:
      "Ahora, comparte sus aventuras, historias y talentos a través de streams, creando un espacio acogedor para todos los visitantes del reino digital.",
    bio_personality_1:
      "Carismático y con un humor peculiar, nuestro anfitrión goblin combina la astucia típica de su especie con una inesperada amabilidad y atención al detalle.",
    bio_personality_2:
      "Apasionado por las historias, los juegos y la creación de experiencias memorables para su comunidad.",
    bio_personality_3:
      "A pesar de su apariencia que podría intimidar a algunos, su risa contagiosa y genuino interés por sus invitados lo convierten en el anfitrión perfecto para cualquier aventura.",
    bio_facts_1: "Colecciona jarras de cerveza de todos los reinos que visita.",
    bio_facts_2:
      "Su bebida favorita es la leche con chocolate, a pesar de que los goblins tradicionalmente prefieren bebidas más fuertes.",
    bio_facts_3: "Tiene un don natural para la música, especialmente con instrumentos de percusión improvisados.",
    bio_facts_4: "A pesar de su nueva vida pacífica, mantiene una colección de sombreros que considera su 'tesoro'.",
    bio_facts_5:
      "Habla cinco idiomas, incluyendo el antiguo élfico, que aprendió para leer recetas de postres élficos.",

    // Credits
    credits_and_thanks: "Créditos y Agradecimientos",
    creative_team: "Equipo Creativo",
    artists: "Artistas",
    technical_team: "Equipo Técnico",
    contributions: "Contribuciones:",
    special_thanks: "Agradecimientos Especiales",
    thanks_message:
      "Un agradecimiento especial a toda la comunidad que ha apoyado este proyecto desde sus inicios. A los moderadores, suscriptores y espectadores que hacen que cada stream sea una experiencia única.",

    // Footer
    rights_reserved: "Todos los derechos reservados.",
    made_with: "Hecho con",
    for_community: "para la comunidad",
    privacy_policy: "Política de Privacidad",
    terms_of_service: "Términos de Servicio",
    contact: "Contacto",
    faq: "FAQ",
  },
}
