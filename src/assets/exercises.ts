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
      { name: "Plancha", seconds: 30 },
      { name: "Rest", seconds: 40 },
      { name: "Sentadillas", repetitions: 8 },
      { name: "Rest", seconds: 40 },
      { name: "Zancadas", repetitions: 8 },
      { name: "Rest", seconds: 40 },
      { name: "Flexiones de brazo", repetitions: 8 },
      { name: "Rest", seconds: 40 },
      { name: "Elevación de piernas", repetitions: 8 },
      { name: "Rest", seconds: 40 },
      { name: "Escaladores", seconds: 30 },
      { name: "Rest", seconds: 40 },
      { name: "flexiones en pica", repetitions: 8 },
    ],
  },
  "Calisthenics full body 2": {
    description: "3-6 series\nSe necesita una silla",
    steps: [
      { name: "Calentamiento", seconds: 4 * 60 },
      { name: "Rest", seconds: 40 },
      { name: "Plancha lateral", seconds: 30 },
      { name: "Rest", seconds: 40 },
      { name: "Dominada isométrica toalla", seconds: 30 },
      { name: "Rest", seconds: 40 },
      { name: "Sentadillas sumo", repetitions: 10 },
      { name: "Rest", seconds: 40 },
      { name: "Fondos trícpes", repetitions: 12 },
      { name: "Rest", seconds: 40 },
      { name: "Flexiones espalda", repetitions: 6 },
      { name: "Rest", seconds: 40 },
      { name: "Sentadillas pared", seconds: 30 },
      { name: "Rest", seconds: 40 },
      { name: "Flexiones negativas", repetitions: 6 },
      { name: "Rest", seconds: 40 },
      { name: "Elevación glúteos", repetitions: 10 },
    ],
  },
};
