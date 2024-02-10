type Exercise = {
  steps: Array<{ name: string; img?: string; seconds?: number }>;
};

export const exercises: Record<string, Exercise> = {
  "Back stretches": {
    steps: [
      // { name: "NO TIME TEST", img: "1.png" },
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
  // "Calisthenics 1": {
  //   steps: [
  //     { name: "NO TIME TEST", img: "1.png" },
  //     { name: "Psoas stretch, LEFT", seconds: 25, img: "1.png" },
  //     { name: "Rest", seconds: 10 },
  //     { name: "Psoas stretch, RIGHT", seconds: 25, img: "1.png" },
  //     { name: "Rest", seconds: 10 },
  //     { name: "Glute bridges", seconds: 50, img: "2.png" },
  //     { name: "Rest", seconds: 10 },
  //     { name: "Chest openers", seconds: 25, img: "3.png" },
  //     { name: "Rest", seconds: 10 },
  //     { name: "Modified McKenzie", seconds: 25, img: "4.png" },
  //     { name: "Rest", seconds: 10 },
  //     { name: "Reverse Wall Plank", seconds: 60, img: "5.png" },
  //     { name: "Rest", seconds: 10 },
  //     { name: "Cervico-Thoracic Traction", seconds: 120, img: "6.png" },
  //   ],
  // },
};
