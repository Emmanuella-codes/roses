export type FlowerTone = "red" | "white";

export interface Finale {
  title: string;
  artist: string;
  note: string;
  file: string;
}

export const notes = [
  "I get so happy when i see notifications from you. 🫣",
  "Here's hoping i get to make you smile today.",
  "Looking forward to the dance we owe each other.",
  "You bring out the creative sides of me.",
  "Keep going, there is a song hiding in here.",
];

export const flowerTones: FlowerTone[] = Array.from({ length: 30 }, (_, i) =>
  i % 2 === 0 ? "red" : "white"
);

export const finale: Finale = {
  title: "Addiction",
  artist: "Rema",
  note: "All of a sudden this song is linked to one of my favorite memories with you.",
  file: "Rema_Addicted.mp3",
};
