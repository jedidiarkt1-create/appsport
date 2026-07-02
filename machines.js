// Catalogue des machines guidées : illustration + tuto d'utilisation
const MACHINES = {
  legPress: {
    name: "Presse à cuisses",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="90" x2="55" y2="90"/>
      <rect x="10" y="55" width="42" height="12" rx="2" transform="rotate(-18 10 55)"/>
      <circle cx="46" cy="42" r="7"/>
      <line x1="41" y1="48" x2="30" y2="70"/>
      <line x1="30" y1="70" x2="45" y2="90"/>
      <line x1="30" y1="70" x2="55" y2="62"/>
      <line x1="55" y1="62" x2="80" y2="30"/>
      <line x1="30" y1="90" x2="80" y2="55"/>
      <rect x="78" y="18" width="10" height="42" transform="rotate(-30 78 18)"/>
      <line x1="88" y1="14" x2="105" y2="6"/>
      <line x1="93" y1="24" x2="110" y2="16"/>
    </svg>`,
    steps: [
      "Règle le siège pour que tes genoux forment un angle de 90° quand les pieds sont posés sur le plateau.",
      "Place tes pieds à largeur d'épaules, bien à plat (plus hauts et plus larges = plus de fessiers).",
      "Débloque les taquets de sécurité, pousse le plateau en tendant les jambes sans verrouiller les genoux.",
      "Redescends lentement et contrôlé jusqu'à 90°, sans décoller le bas du dos du siège."
    ],
    mistake: "Ne verrouille jamais complètement les genoux en haut du mouvement : ça soulage le muscle et stresse l'articulation."
  },

  hipThrust: {
    name: "Machine Hip Thrust",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <line x1="10" y1="70" x2="60" y2="70"/>
      <circle cx="18" cy="55" r="7"/>
      <line x1="24" y1="60" x2="45" y2="65"/>
      <line x1="45" y1="65" x2="70" y2="55"/>
      <line x1="45" y1="65" x2="50" y2="90"/>
      <line x1="70" y1="55" x2="65" y2="90"/>
      <line x1="70" y1="55" x2="80" y2="90"/>
      <rect x="66" y="45" width="10" height="16" rx="2"/>
      <line x1="76" y1="52" x2="100" y2="52"/>
      <circle cx="104" cy="52" r="8"/>
    </svg>`,
    steps: [
      "Assieds-toi et cale le coussin juste au niveau du pli des hanches, jamais sur le ventre.",
      "Pieds à plat au sol, largeur du bassin, genoux pliés à 90°.",
      "Pousse le bassin vers le haut en contractant les fessiers jusqu'à l'alignement épaules-hanches-genoux.",
      "Marque une pause d'1-2 secondes en haut en serrant les fessiers, puis redescends contrôlé."
    ],
    mistake: "Évite de creuser le bas du dos en haut du mouvement : la poussée doit venir des fessiers, pas des lombaires."
  },

  abductor: {
    name: "Machine abducteurs",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="60" cy="20" r="8"/>
      <line x1="60" y1="28" x2="60" y2="55"/>
      <line x1="60" y1="34" x2="45" y2="45"/>
      <line x1="60" y1="34" x2="75" y2="45"/>
      <line x1="60" y1="55" x2="40" y2="80"/>
      <line x1="60" y1="55" x2="80" y2="80"/>
      <line x1="30" y1="82" x2="45" y2="70"/>
      <line x1="90" y1="82" x2="75" y2="70"/>
      <path d="M25 55 A20 20 0 0 0 20 75" />
      <path d="M95 55 A20 20 0 0 1 100 75" />
      <line x1="18" y1="72" x2="20" y2="75"/>
      <line x1="18" y1="78" x2="20" y2="75"/>
      <line x1="102" y1="72" x2="100" y2="75"/>
      <line x1="102" y1="78" x2="100" y2="75"/>
    </svg>`,
    steps: [
      "Assieds-toi, dos bien calé contre le dossier.",
      "Place l'extérieur des cuisses contre les coussinets, jambes serrées au départ.",
      "Écarte les jambes vers l'extérieur en contractant les fessiers moyens, sans à-coup.",
      "Reviens lentement à la position de départ sans laisser la charge retomber d'un coup."
    ],
    mistake: "Ne te penche pas en avant pour \"aider\" le mouvement : garde le dos droit contre le dossier."
  },

  adductor: {
    name: "Machine adducteurs",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="60" cy="20" r="8"/>
      <line x1="60" y1="28" x2="60" y2="55"/>
      <line x1="60" y1="34" x2="45" y2="45"/>
      <line x1="60" y1="34" x2="75" y2="45"/>
      <line x1="60" y1="55" x2="35" y2="82"/>
      <line x1="60" y1="55" x2="85" y2="82"/>
      <line x1="20" y1="70" x2="35" y2="70"/>
      <line x1="100" y1="70" x2="85" y2="70"/>
      <path d="M35 70 A20 15 0 0 1 55 62" />
      <path d="M85 70 A20 15 0 0 0 65 62" />
      <line x1="53" y1="58" x2="55" y2="62"/>
      <line x1="58" y1="58" x2="55" y2="62"/>
      <line x1="67" y1="58" x2="65" y2="62"/>
      <line x1="62" y1="58" x2="65" y2="62"/>
    </svg>`,
    steps: [
      "Assieds-toi, dos bien calé, jambes ouvertes contre les coussinets.",
      "Resserre les jambes vers l'intérieur de façon lente et contrôlée.",
      "Reviens en laissant les jambes s'écarter à nouveau sans forcer sur l'aine."
    ],
    mistake: "Commence avec une charge légère : les adducteurs sont sensibles si le mouvement est trop brusque."
  },

  cablePulley: {
    name: "Poulie (basse / haute)",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <line x1="100" y1="5" x2="100" y2="95"/>
      <circle cx="100" cy="15" r="6"/>
      <line x1="94" y1="15" x2="55" y2="55"/>
      <circle cx="50" cy="30" r="8"/>
      <line x1="50" y1="38" x2="50" y2="65"/>
      <line x1="50" y1="45" x2="55" y2="55"/>
      <line x1="50" y1="65" x2="35" y2="90"/>
      <line x1="50" y1="65" x2="60" y2="90"/>
      <rect x="96" y="60" width="8" height="30"/>
    </svg>`,
    steps: [
      "Règle la poulie à la hauteur voulue (basse pour les jambes, haute pour les abdos) et choisis le bon accessoire (sangle ou corde).",
      "Installe-toi en position stable, léger fléchissement du genou d'appui.",
      "Réalise le mouvement demandé en contrôlant l'aller ET le retour.",
      "Ne laisse jamais la charge \"claquer\" en bas de la pile de poids."
    ],
    mistake: "Garde le dos neutre, évite de te balancer avec le buste pour tricher le mouvement."
  },

  legCurl: {
    name: "Leg curl (ischios)",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <rect x="15" y="55" width="55" height="10" rx="2"/>
      <circle cx="20" cy="45" r="7"/>
      <line x1="25" y1="52" x2="45" y2="58"/>
      <line x1="45" y1="58" x2="65" y2="58"/>
      <line x1="65" y1="58" x2="70" y2="40"/>
      <path d="M65 58 Q80 55 82 42" stroke-dasharray="0" />
      <rect x="78" y="35" width="8" height="14" rx="2"/>
      <line x1="86" y1="42" x2="105" y2="42"/>
      <circle cx="109" cy="42" r="7"/>
    </svg>`,
    steps: [
      "Allonge-toi sur le ventre, le coussin juste au-dessus des chevilles.",
      "Bassin bien plaqué contre le banc, genoux légèrement au bord.",
      "Fléchis les jambes en ramenant les talons vers les fessiers, sans décoller le bassin.",
      "Redescends lentement sans à-coup."
    ],
    mistake: "Évite de cambrer le dos pour \"tricher\" : le mouvement doit venir uniquement des ischios."
  },

  abCrunch: {
    name: "Machine abdominale (crunch)",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <line x1="10" y1="85" x2="35" y2="85"/>
      <rect x="15" y="55" width="14" height="30" rx="2"/>
      <circle cx="55" cy="25" r="8"/>
      <line x1="52" y1="32" x2="35" y2="62"/>
      <line x1="35" y1="62" x2="35" y2="85"/>
      <line x1="52" y1="32" x2="65" y2="45"/>
      <rect x="60" y="38" width="12" height="14" rx="2" transform="rotate(20 60 38)"/>
      <line x1="35" y1="62" x2="70" y2="65"/>
      <line x1="70" y1="65" x2="95" y2="45"/>
      <rect x="92" y="20" width="8" height="28"/>
    </svg>`,
    steps: [
      "Assieds-toi, place le torse contre le coussin supérieur et les mains sur les poignées.",
      "Règle la charge et le point de pivot au niveau du nombril.",
      "Fléchis le buste vers l'avant en contractant les abdos, souffle en te penchant.",
      "Reviens lentement sans relâcher complètement la tension."
    ],
    mistake: "Le mouvement doit venir des abdos, pas des bras qui tirent sur les poignées."
  },

  torsoRotation: {
    name: "Rotation du tronc (obliques)",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <line x1="30" y1="85" x2="90" y2="85"/>
      <rect x="45" y="55" width="30" height="12" rx="3"/>
      <circle cx="60" cy="25" r="8"/>
      <line x1="60" y1="33" x2="60" y2="55"/>
      <line x1="60" y1="60" x2="35" y2="85"/>
      <line x1="60" y1="60" x2="85" y2="85"/>
      <path d="M40 15 A25 25 0 0 1 80 15" stroke-dasharray="4 3"/>
      <line x1="78" y1="9" x2="80" y2="15" />
      <line x1="84" y1="17" x2="80" y2="15" />
    </svg>`,
    steps: [
      "Assieds-toi, dos calé, pieds bien stabilisés au sol.",
      "Place les bras/épaules contre les appuis latéraux.",
      "Effectue une rotation contrôlée d'un côté à l'autre, amplitude modérée.",
      "Reviens lentement sans forcer l'amplitude en fin de course."
    ],
    mistake: "N'utilise pas une charge lourde ici : privilégie le contrôle, cette machine sollicite la colonne en rotation."
  },

  romanChair: {
    name: "Chaise romaine",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <line x1="30" y1="10" x2="30" y2="95"/>
      <line x1="90" y1="10" x2="90" y2="95"/>
      <line x1="30" y1="10" x2="90" y2="10"/>
      <rect x="24" y="18" width="12" height="10" rx="2"/>
      <rect x="84" y="18" width="12" height="10" rx="2"/>
      <circle cx="60" cy="22" r="8"/>
      <line x1="60" y1="30" x2="60" y2="55"/>
      <line x1="60" y1="55" x2="48" y2="70"/>
      <line x1="60" y1="55" x2="72" y2="70"/>
      <path d="M48 70 Q55 50 60 55" stroke-dasharray="4 3"/>
      <line x1="46" y1="60" x2="48" y2="70"/>
    </svg>`,
    steps: [
      "Installe les avant-bras sur les appuis, dos bien plaqué contre le dossier.",
      "Laisse les jambes pendre, légèrement fléchies au départ.",
      "Relève les genoux vers la poitrine en contractant les abdos.",
      "Redescends lentement sans te balancer."
    ],
    mistake: "Évite l'élan avec les hanches : le mouvement doit être lent et contrôlé, pas un balancement."
  },

  smithMachine: {
    name: "Smith machine",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <line x1="15" y1="5" x2="15" y2="95"/>
      <line x1="105" y1="5" x2="105" y2="95"/>
      <line x1="10" y1="35" x2="110" y2="35"/>
      <circle cx="18" cy="35" r="8"/>
      <circle cx="102" cy="35" r="8"/>
      <circle cx="60" cy="20" r="8"/>
      <line x1="60" y1="28" x2="60" y2="55"/>
      <line x1="60" y1="35" x2="45" y2="45"/>
      <line x1="60" y1="35" x2="75" y2="45"/>
      <line x1="60" y1="55" x2="45" y2="90"/>
      <line x1="60" y1="55" x2="80" y2="75"/>
      <line x1="80" y1="75" x2="75" y2="90"/>
    </svg>`,
    steps: [
      "Règle les taquets de sécurité à la hauteur adaptée à ton exercice.",
      "Positionne la barre sur le haut du dos (trapèzes), débloque-la en tournant légèrement les poignets.",
      "Réalise le mouvement en gardant le buste droit et le genou aligné avec le pied.",
      "Reverrouille toujours la barre sur les taquets à la fin de la série."
    ],
    mistake: "Ne descends jamais plus bas que ce que tu peux contrôler : le guidage vertical limite la trajectoire, adapte ta position pour rester à l'aise."
  },

  backExtension: {
    name: "Banc à lombaires",
    svg: `<svg viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <line x1="10" y1="80" x2="55" y2="55"/>
      <rect x="45" y="48" width="16" height="12" rx="2" transform="rotate(-25 45 48)"/>
      <line x1="20" y1="88" x2="30" y2="72"/>
      <rect x="15" y="82" width="18" height="9" rx="2" transform="rotate(-25 15 82)"/>
      <circle cx="65" cy="35" r="8"/>
      <line x1="60" y1="42" x2="50" y2="55"/>
      <path d="M60 42 Q40 30 30 45" stroke-dasharray="4 3"/>
      <line x1="28" y1="38" x2="30" y2="45"/>
      <line x1="34" y1="42" x2="30" y2="45"/>
    </svg>`,
    steps: [
      "Cale les hanches sur le coussin, chevilles bloquées sous les rouleaux.",
      "Buste penché vers l'avant, dos arrondi naturellement au départ.",
      "Remonte le buste jusqu'à l'alignement du corps, sans cambrer excessivement en haut.",
      "Redescends lentement en contrôlant la descente."
    ],
    mistake: "Ne cherche pas l'amplitude maximale en hyperextension : arrête-toi à l'alignement du corps pour protéger le bas du dos."
  }
};
