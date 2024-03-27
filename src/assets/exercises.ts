export type Step = {
  name: string;
  img?: string;
  seconds?: number;
  repetitions?: number;
};

export type Exercise = {
  description?: string;
  steps: Array<Step>;
};

export const exercises: Record<string, Exercise> = {
  "Back stretches": {
    steps: [
      { name: "Psoas stretch, LEFT", seconds: 25, img: "1.png" },
      { name: "Rest", seconds: 10 },
      { name: "Psoas stretch, RIGHT", seconds: 25, img: "1.png" },
      { name: "Rest", seconds: 10 },
      { name: "Glute bridges", seconds: 50, img: "2.png" },
      { name: "Rest", seconds: 10 },
      { name: "Chest openers", seconds: 25, img: "3.png" },
      { name: "Rest", seconds: 10 },
      { name: "Modified McKenzie", seconds: 25, img: "4.png" },
      { name: "Rest", seconds: 10 },
      { name: "Reverse Wall Plank", seconds: 60, img: "5.png" },
      { name: "Rest", seconds: 10 },
      { name: "Cervico-Thoracic Traction", seconds: 120, img: "6.png" },
    ],
  },
  "Calisthenics full body 1": {
    description: "2-4 series",
    steps: [
      { name: "Calentamiento", seconds: 4 * 60 },
      { name: "Rest", seconds: 1 * 60 },
      { name: "Plancha", seconds: 35 },
      { name: "Rest", seconds: 40 },
      { name: "Sentadillas", repetitions: 9 },
      { name: "Rest", seconds: 40 },
      { name: "Zancadas", repetitions: 9 },
      { name: "Rest", seconds: 40 },
      { name: "Flexiones de brazo", repetitions: 9 },
      { name: "Rest", seconds: 40 },
      { name: "Elevación de piernas", repetitions: 9 },
      { name: "Rest", seconds: 40 },
      { name: "Escaladores", seconds: 30 },
      { name: "Rest", seconds: 40 },
      { name: "flexiones en pica", repetitions: 9 },
    ],
  },
  "Calisthenics full body 2": {
    description: "3-6 series\nSe necesita una silla",
    steps: [
      { name: "Calentamiento", seconds: 4 * 60 },
      { name: "Rest", seconds: 40 },
      { name: "Plancha lateral izquierda", seconds: 35 },
      { name: "Rest", seconds: 15 },
      { name: "Plancha lateral derecha", seconds: 35 },
      { name: "Rest", seconds: 40 },
      { name: "Dominada isométrica toalla", seconds: 30 },
      { name: "Rest", seconds: 40 },
      { name: "Sentadillas sumo", repetitions: 11 },
      { name: "Rest", seconds: 40 },
      { name: "Fondos trícpes", repetitions: 12 },
      { name: "Rest", seconds: 40 },
      { name: "Flexiones espalda", repetitions: 7 },
      { name: "Rest", seconds: 40 },
      { name: "Sentadillas pared", seconds: 30 },
      { name: "Rest", seconds: 40 },
      { name: "Flexiones negativas", repetitions: 6 },
      { name: "Rest", seconds: 40 },
      { name: "Elevación glúteos", repetitions: 12 },
    ],
  },
  "Calisthenics pierna": {
    description: "4 series",
    steps: [
      { name: "Calentamiento", seconds: 4 * 60, img: "piernas-warm-up.png" },
      { name: "Rest", seconds: 40 },
      { name: "Sentadillas", repetitions: 10 },
      { name: "Rest", seconds: 30 },
      { name: "Sentadillas arqueras, cada lado", repetitions: 10 },
      { name: "Rest", seconds: 30 },
      { name: "Elevación gemelos, por pierna", repetitions: 12 },
      { name: "Rest", seconds: 30 },
      { name: "Zancadas, por lado", repetitions: 10 },
      { name: "Rest", seconds: 30 },
      { name: "Sentadillas con salto", repetitions: 10 },
      { name: "Rest", seconds: 30 },
      { name: "Caminata pato", repetitions: 10 },
    ],
  },
  "Simplified": {
    description: "3 series each",
    steps: [
      {
        name: "Chest, knee pushup",
        repetitions: 20,
        img: "simplified/chest.PNG",
      },
      {
        name: "Back, table row",
        repetitions: 20,
        img: "simplified/back.PNG",
      },
      {
        name: "Shoulders, pike pushup",
        repetitions: 20,
        img: "simplified/shoulder.PNG",
      },
      {
        name: "Biceps, curl",
        repetitions: 20,
        img: "simplified/biceps.PNG",
      },
      {
        name: "Tripces, bench dips",
        repetitions: 20,
        img: "simplified/triceps.PNG",
      },
      {
        name: "Shoulder isolation, lateral raise & rear delt fly",
        repetitions: 20,
        img: "simplified/shoulder.PNG",
      },
      {
        name: "Quads, squat",
        repetitions: 20,
        img: "simplified/quads.PNG",
      },
      {
        name: "Hamstrings, reverse lunge",
        repetitions: 20,
        img: "simplified/hamstring.PNG",
      },
      {
        name: "Calves, calf raise",
        repetitions: 20,
        img: "simplified/calves.PNG",
      },
      {
        name: "Abs, sit up/plank",
        repetitions: 20,
        img: "simplified/abs.PNG",
      },
    ],
  },
};
