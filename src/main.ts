import { FlowerProgress } from "./progress.js";
import { finale, flowerTones, notes } from "./songs.js";

const NS = "http://www.w3.org/2000/svg";
const SPOTS: [number, number][] = [
  [200,95],[135,125],[265,125],[85,175],[200,160],[315,175],[140,205],
  [260,205],[200,240],[95,245],[305,245],[150,285],[250,285],
  [65,125],[335,125],[55,225],[345,225],[200,300],
  [110,90],[290,90],[55,150],[345,150],[110,285],[290,285],
  [80,100],[320,100],[80,300],[320,300],[160,120],[240,120],
];

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel)!;
const roses = $<SVGGElement>("#roses");
const ferns = $<SVGGElement>("#ferns");
const breath = $<SVGGElement>("#breath");
const title = $<HTMLElement>("#title");
const artist = $<HTMLElement>("#artist");
const note = $<HTMLElement>("#note");
const status = $<HTMLElement>("#status");
const resetButton = $<HTMLButtonElement>("#reset");
const progress = new FlowerProgress(notes);

function mk<K extends keyof SVGElementTagNameMap>(
  tag: K, attrs: Record<string, string | number>, parent?: Element
): SVGElementTagNameMap[K] {
  const el = document.createElementNS(NS, tag);
  for (const k in attrs) el.setAttribute(k, String(attrs[k]));
  parent?.appendChild(el);
  return el;
}

// Ferns: leaves fanning out at the base of the bouquet
for (let k = 0; k < 18; k++) {
  const side = k % 2 ? 1 : -1, n = k >> 1;
  const x = 200 + side * (40 + n * 16), y = 310 - n * 4;
  mk("ellipse", {
    cx: x, cy: y, rx: 9, ry: 34,
    transform: `rotate(${side * (40 + n * 6)} ${x} ${y})`,
    fill: k % 4 < 2 ? "#2f6b3a" : "#3d8247",
  }, ferns);
}

// Baby's breath: use fewer decorative nodes on small screens for faster rendering.
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const breathCount = window.matchMedia("(max-width: 600px)").matches ? 80 : 170;
for (let k = 0; k < breathCount; k++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd());
    const y = 185 + Math.sin(a) * d * 140;
    if (y > 305) continue;
    mk("circle", { cx: 200 + Math.cos(a) * d * 165, cy: y, r: 1.4 + rnd() * 1.6,
                    fill: "#fff", stroke: "#d8d2c8", "stroke-width": 0.4 }, breath);
}

// Audio
let audio: HTMLAudioElement | null = null;
let finalePlayed = false;

function renderNotes() {
  const revealedCount = progress.revealedCount;
  note.textContent = revealedCount > 0 ? progress.revealedMessages[revealedCount - 1] : "";

  if (progress.shouldPlayFinale && !finalePlayed) {
    finalePlayed = true;
    playFinale();
  }

  if (revealedCount < notes.length) {
    const remainder = progress.openedCount % 6;
    const flowersUntilNext = remainder === 0 ? 6 : 6 - remainder;
    status.textContent = `${revealedCount} of ${notes.length} notes revealed — ${flowersUntilNext} more flower${flowersUntilNext === 1 ? "" : "s"} to go.`;
  } else {
    status.textContent = "All five notes are revealed. This one is for you.";
  }
}

function reset() {
  title.textContent = "A little note for you";
  artist.textContent = "";
  note.textContent = "";
  progress.reset();
  finalePlayed = false;
  status.textContent = "Choose a rose to begin.";
  resetButton.disabled = true;
}

function stop() {
    audio?.pause();
    audio = null;
}

function playFinale() {
  stop();
  title.textContent = finale.title;
  artist.textContent = finale.artist;
  const finalAudio = new Audio(`audio/${finale.file}`);
  finalAudio.preload = "auto";
  audio = finalAudio;
  finalAudio.play().catch(() => {
    status.textContent = "Tap the bouquet once more to play the finale song.";
  });
}

function toggle(g: SVGGElement, i: number) {
    if (g.classList.contains("open")) {
      if (progress.shouldPlayFinale && audio?.paused) playFinale();
      return;
    }
    g.classList.add("open");
    g.setAttribute("aria-pressed", "true");
    resetButton.disabled = false;
    progress.open(i);
    renderNotes();
}

// Roses: thirty flowers, with the existing song tones used for visual variation
SPOTS.forEach((_, i) => {
    const [x, y] = SPOTS[i];
    const g = mk("g", {
    class: `rose ${flowerTones[i]}`, transform: `translate(${x} ${y}) rotate(${(i % 5 - 2) * 4})`,
    tabindex: 0, role: "button", "aria-pressed": "false",
    "aria-label": `Rose ${i + 1}`,
    }, roses);
    mk("circle", { class: "hit-area", r: 16 }, g);
    const turn = mk("g", { class: "turn" }, g);
    for (let k = 0; k < 5; k++)
    mk("ellipse", { class: "outer", cy: -9, rx: 10, ry: 12, transform: `rotate(${k * 72})` }, turn);
    const inner = mk("g", { class: "inner" }, turn);
    for (let k = 0; k < 5; k++)
    mk("ellipse", { cy: -5, rx: 6, ry: 8, transform: `rotate(${k * 72 + 36})` }, inner);
    mk("circle", { class: "core", r: 3 }, inner);

    g.addEventListener("pointerup", (e) => {
      if (e.button === 0) toggle(g, i);
    });
    g.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(g, i); }
    });
});

resetButton.addEventListener("click", () => {
  roses.querySelectorAll<SVGGElement>(".rose.open").forEach((rose) => {
    rose.classList.remove("open");
    rose.setAttribute("aria-pressed", "false");
  });
  stop();
  reset();
});

reset();
