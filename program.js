// Programme hebdomadaire MyGym — Machines guidées, focus Abdos & Fessiers
const PROGRAM = [
  {
    id: "lundi",
    day: "Lundi",
    type: "fessiers",
    title: "Fessiers — Force",
    rest: false,
    exercises: [
      { name: "Presse à cuisses (pieds hauts, larges)", machine: "Presse à cuisses", machineId: "legPress", sets: 4, reps: "12-15", repos: "90 s", note: "Talons hauts sur le plateau pour cibler les fessiers." },
      { name: "Hip Thrust guidé", machine: "Machine Hip Thrust", machineId: "hipThrust", sets: 4, reps: "10-12", repos: "90 s", note: "Contraction 1-2 s en haut du mouvement." },
      { name: "Abduction de hanches", machine: "Machine abducteurs", machineId: "abductor", sets: 3, reps: "15-20", repos: "60 s" },
      { name: "Extension de hanches à la poulie basse", machine: "Poulie basse + sangle cheville", machineId: "cablePulley", sets: 3, reps: "12/jambe", repos: "60 s" },
      { name: "Leg curl allongé", machine: "Machine ischios (leg curl)", machineId: "legCurl", sets: 3, reps: "12-15", repos: "60 s", note: "Accessoire — soutient le grand fessier." }
    ]
  },
  {
    id: "mardi",
    day: "Mardi",
    type: "abdos",
    title: "Abdos — Gainage & Volume",
    rest: false,
    exercises: [
      { name: "Crunch guidé", machine: "Machine abdominale (crunch)", machineId: "abCrunch", sets: 4, reps: "15-20", repos: "60 s" },
      { name: "Rotation du buste", machine: "Machine rotation du tronc (obliques)", machineId: "torsoRotation", sets: 3, reps: "15/côté", repos: "60 s" },
      { name: "Relevé de jambes suspendu", machine: "Chaise romaine / station lombaires-abdos", machineId: "romanChair", sets: 3, reps: "12-15", repos: "60 s", note: "Jambes légèrement fléchies si besoin." },
      { name: "Crunch à la poulie haute", machine: "Poulie haute + corde", machineId: "cablePulley", sets: 3, reps: "15", repos: "60 s" }
    ]
  },
  {
    id: "mercredi",
    day: "Mercredi",
    type: "repos",
    title: "Repos / Récupération active",
    rest: true,
    exercises: [
      { name: "Marche, étirements ou vélo léger", machine: "—", sets: 1, reps: "20-30 min", repos: "—", note: "Favorise la récupération musculaire." }
    ]
  },
  {
    id: "jeudi",
    day: "Jeudi",
    type: "fessiers",
    title: "Fessiers — Isolation",
    rest: false,
    exercises: [
      { name: "Presse à cuisses (mono-jambe)", machine: "Presse à cuisses", machineId: "legPress", sets: 3, reps: "12/jambe", repos: "90 s" },
      { name: "Kickback fessier à la poulie", machine: "Poulie basse + sangle cheville", machineId: "cablePulley", sets: 4, reps: "12-15/jambe", repos: "60 s" },
      { name: "Adduction de hanches", machine: "Machine adducteurs", machineId: "adductor", sets: 3, reps: "15-20", repos: "60 s" },
      { name: "Fentes guidées (Smith machine)", machine: "Smith machine", machineId: "smithMachine", sets: 3, reps: "10/jambe", repos: "90 s" },
      { name: "Extension lombaire", machine: "Banc à lombaires", machineId: "backExtension", sets: 3, reps: "12-15", repos: "60 s", note: "Renforce la chaîne postérieure autour du bassin." }
    ]
  },
  {
    id: "vendredi",
    day: "Vendredi",
    type: "abdos",
    title: "Abdos — Intensité",
    rest: false,
    exercises: [
      { name: "Crunch guidé (charge progressive)", machine: "Machine abdominale (crunch)", machineId: "abCrunch", sets: 4, reps: "12-15", repos: "60 s" },
      { name: "Rotation du buste", machine: "Machine rotation du tronc (obliques)", machineId: "torsoRotation", sets: 3, reps: "15/côté", repos: "60 s" },
      { name: "Relevé de genoux suspendu", machine: "Chaise romaine / station lombaires-abdos", machineId: "romanChair", sets: 3, reps: "15", repos: "60 s" },
      { name: "Crunch oblique à la poulie", machine: "Poulie haute + corde", machineId: "cablePulley", sets: 3, reps: "12/côté", repos: "60 s" }
    ]
  },
  {
    id: "samedi",
    day: "Samedi",
    type: "mixte",
    title: "Abdos & Fessiers — Combiné léger",
    rest: false,
    exercises: [
      { name: "Hip Thrust guidé (charge légère)", machine: "Machine Hip Thrust", machineId: "hipThrust", sets: 3, reps: "15", repos: "60 s" },
      { name: "Abduction de hanches", machine: "Machine abducteurs", machineId: "abductor", sets: 3, reps: "20", repos: "45 s" },
      { name: "Adduction de hanches", machine: "Machine adducteurs", machineId: "adductor", sets: 3, reps: "20", repos: "45 s" },
      { name: "Crunch guidé", machine: "Machine abdominale (crunch)", machineId: "abCrunch", sets: 3, reps: "20", repos: "45 s" }
    ]
  },
  {
    id: "dimanche",
    day: "Dimanche",
    type: "repos",
    title: "Repos complet",
    rest: true,
    exercises: [
      { name: "Repos complet", machine: "—", sets: 1, reps: "—", repos: "—", note: "Laisse les muscles récupérer avant la semaine suivante." }
    ]
  }
];
