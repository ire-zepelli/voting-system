export const POSITION_ORDER = [
  "President",
  "Vice-President Internal",
  "Vice-President External",
  "Secretary",
  "Public Information Officer",
  "Treasurer",
  "Chief of Creatives",
  "Auditor",
  "Chief of Representative",
  "Chief of Students Development",
  "Academic Representative",
  "CARES Representative",
];

export const POSITION_TITLES = {
  President: "PRESIDENT",
  "Vice-President Internal": "VP-INTERNAL",
  "Vice-President External": "VP-EXTERNAL",
  Secretary: "SECRETARY",
  "Public Information Officer": "PUBLIC INFORMATION \nOFFICER",
  Treasurer: "TREASURER",
  "Chief of Creatives": "CHIEF OF\nCREATIVES",
  Auditor: "AUDITOR",
  "Chief of Representative": "CHIEF OF\nREPRESENTATIVE",
  "Chief of Students Development": "CHIEF OF\nSTUDENTS DEVELOPMENT",
  "Academic Representative": "ACADEMIC\nREPRESENTATIVE",
  "CARES Representative": "CARES\nREPRESENTATIVE",
};

export const PARTYLISTS = [
  {
    id: "beats",
    label: "B.E.A.T.S.",
    image: "/BEATS/GROUP PHOTO/beatsgrouptransparent.png",
    bgColor: "#34102A",
    accentColor: "#c0547a",
    imageScale: 1.55,
    imageOffsetY: "-32%",
    imageHoverOffsetY: "-15.5%",
  },
  {
    id: "peak",
    label: "P.E.A.K.",
    image: "/PEAK/GROUP PHOTO/peakgrouptransparent.png",
    bgColor: "#34102A",
    accentColor: "#5493c0",
    imageOffsetY: "-7%",
    imageHoverOffsetY: "-3%",
  },
];

export const PARTY_MEMBER_SECTIONS = {
  beats: [
    {
      title: "EXECUTIVES",
      members: [
        {
          name: "May Lapeña",
          position: "Secretary",
          photo: "/BEATS/TRANSPARENT_INDIV/LAPENA_SECRETARY.png",
        },
        {
          name: "Dan Pierre Pogoy",
          position: "Vice-President Internal",
          photo: "/BEATS/TRANSPARENT_INDIV/POGOY_VP_INTERNAL.png",
        },
        {
          name: "Crista Monica Oscar",
          position: "President",
          photo: "/BEATS/TRANSPARENT_INDIV/OSCAR_PRES.png",
        },
        {
          name: "Ryan Pacumio",
          position: "Vice-President External",
          photo: "/BEATS/TRANSPARENT_INDIV/PACUMIO_VP_EXTERNAL.png",
        },
        {
          name: "Keith Ramises Latonio",
          position: "Treasurer",
          photo: "/BEATS/TRANSPARENT_INDIV/LATONIO_TREASURER.png",
        },
      ],
    },
    {
      title: "CHIEFS",
      members: [
        {
          name: "Fiona Monilar",
          position: "Public Information Officer",
          photo: "/BEATS/TRANSPARENT_INDIV/MONILAR_PIO.png",
        },
        {
          name: "Jhoviegen Cuysona",
          position: "Chief of Representative",
          photo: "/BEATS/TRANSPARENT_INDIV/CUYSONA_CHIEF_OF_REP.png",
        },
        {
          name: "Harry Conde",
          position: "Chief of Creatives",
          photo: "/BEATS/TRANSPARENT_INDIV/CONDE_CHIEF_OF_CREATIVES.png",
        },
        {
          name: "Emmanuel Franz Apawan",
          position: "Auditor",
          photo: "/BEATS/TRANSPARENT_INDIV/APAWAN_AUDITOR.png",
        },
        {
          name: "Aimee Gayle Cogal",
          position: "Chief of Students Development",
          photo: "/BEATS/TRANSPARENT_INDIV/COGAL_CHIEF_OF_STUDENTDEV.png",
        },
      ],
    },
    {
      title: "REPRESENTATIVES",
      members: [
        {
          name: "Rose Anne Resureccion",
          position: "Academic Representative",
          photo: "/BEATS/TRANSPARENT_INDIV/RESURRECCION_ACADEMIC_REP.png",
        },
        {
          name: "Mary Grace Patalinghug",
          position: "CARES Representative",
          photo: "/BEATS/TRANSPARENT_INDIV/PATALINGHUG_CARE_REP.png",
        },
      ],
    },
  ],
  peak: [
    {
      title: "EXECUTIVES",
      members: [
        {
          name: "Diane Mendoza",
          position: "Secretary",
          photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/SECRETARY - MENDOZA_.png",
        },
        {
          name: "Altheia Dano",
          position: "Vice-President Internal",
          photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP INTERNAL- DANO.png",
        },
        {
          name: "Darren Villanueva",
          position: "President",
          photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/PRES- VILLANUEVA_.png",
        },
        {
          name: "Kane Huxley Book",
          position: "Vice-President External",
          photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP EXTERNAL - BOOK.png",
        },
        {
          name: "Hanny Jane Enriquez",
          position: "Treasurer",
          photo:
            "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/TREASURER - ENRIQUEZ_.png",
        },
      ],
    },
    {
      title: "CHIEFS",
      members: [
        {
          name: "Jea Mary Trixy Magalland",
          position: "Public Information Officer",
          photo:
            "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/P.I OFFICER- MAGALLANO.png",
        },
        {
          name: "Abijah Shen Regado",
          position: "Chief of Representative",
          photo:
            "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/REPRESENTATIVE - REGADO.png",
        },
        {
          name: "Tristhan Mark Vincent Villamor",
          position: "Chief of Creatives",
          photo:
            "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CREATIVES - VILLAMOR_.png",
        },
        {
          name: "Myka Angela Dumael",
          position: "Auditor",
          photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/AUDIT- DUMAEL.png",
        },
        {
          name: "Jeoff Andrew Demecillo",
          position: "Chief of Students Development",
          photo:
            "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/DEVELOPMENT - DEMECILLO.png",
        },
      ],
    },
    {
      title: "REPRESENTATIVES",
      members: [
        {
          name: "Nathaniel Ornopia",
          position: "CARES Representative",
          photo: "/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CARES REP- ORNOPIA.png",
        },
      ],
    },
  ],
};

export function getPositionDisplayTitle(position) {
  return POSITION_TITLES[position] || position.toUpperCase();
}

function splitCandidateName(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length <= 1) {
    return {
      fname: name,
      lname: "",
    };
  }

  return {
    fname: parts.slice(0, -1).join(" "),
    lname: parts[parts.length - 1],
  };
}

export function groupCandidatesByPosition(candidates) {
  return POSITION_ORDER.map((position) => {
    const matchingCandidates = candidates.filter(
      (candidate) => candidate.position === position,
    );

    if (!matchingCandidates.length) {
      return null;
    }

    return {
      id: position,
      position,
      title: getPositionDisplayTitle(position),
      candidates: matchingCandidates.map((candidate) => {
        const { fname, lname } = splitCandidateName(candidate.name);

        return {
          id: candidate.id,
          name: candidate.name,
          fname,
          lname,
          partylist: candidate.partylist,
          image: candidate.imagePath,
        };
      }),
    };
  }).filter(Boolean);
}

export function formatPercentage(value) {
  const percentage = Number(value || 0);
  return `${Number.isInteger(percentage) ? percentage.toFixed(0) : percentage.toFixed(1)}%`;
}
