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
  "Calisthenics 1": {
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
};
