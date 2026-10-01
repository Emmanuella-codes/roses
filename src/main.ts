import { finale, notes, songs, SNIPPET_SECONDS } from "./songs.js";

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
const revealedNotes = $<HTMLOListElement>("#revealed-notes");
const resetButton = $<HTMLButtonElement>("#reset");

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

// Baby's breath: seeded scatter so it looks the same every load
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (let k = 0; k < 170; k++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd());
    const y = 185 + Math.sin(a) * d * 140;
    if (y > 305) continue;
    mk("circle", { cx: 200 + Math.cos(a) * d * 165, cy: y, r: 1.4 + rnd() * 1.6,
                    fill: "#fff", stroke: "#d8d2c8", "stroke-width": 0.4 }, breath);
}

// Audio
let audio: HTMLAudioElement | null = null;
let stopTimer: number | undefined;
let current: SVGGElement | null = null;
const openedFlowers = new Set<number>();
let finalePlayed = false;

function renderNotes() {
  const revealedCount = Math.min(Math.floor(openedFlowers.size / 6), notes.length);
  revealedNotes.replaceChildren();

  notes.slice(0, revealedCount).forEach((message) => {
    const item = document.createElement("li");
    item.textContent = message;
    revealedNotes.appendChild(item);
  });

  if (revealedCount === notes.length && !finalePlayed) {
    finalePlayed = true;
    playFinale();
  }

  if (revealedCount < notes.length) {
    const remainder = openedFlowers.size % 6;
    const flowersUntilNext = remainder === 0 ? 6 : 6 - remainder;
    status.textContent = `${revealedCount} of ${notes.length} notes revealed — ${flowersUntilNext} more flower${flowersUntilNext === 1 ? "" : "s"} to go.`;
  } else {
    status.textContent = "All five notes are revealed. This one is for you.";
  }
}

function reset() {
  title.textContent = "Each one is a song";
  artist.textContent = "";
  note.textContent = "";
  openedFlowers.clear();
  finalePlayed = false;
  revealedNotes.replaceChildren();
  status.textContent = "Choose a rose to begin.";
  resetButton.disabled = true;
}

function stop() {
    clearTimeout(stopTimer);
    audio?.pause();
    audio = null;
}

function playFinale() {
  stop();
  const finalAudio = new Audio(`audio/${finale.file}`);
  finalAudio.addEventListener("loadedmetadata", () => {
    finalAudio.currentTime = finale.start;
    finalAudio.play().catch(() => {});
  }, { once: true });
  audio = finalAudio;
}

function toggle(g: SVGGElement, i: number) {
    const song = songs[i % songs.length];
    if (g.classList.contains("open")) return;
    g.classList.add("open");
    g.setAttribute("aria-pressed", "true");
    current = g;
    stop();

    title.textContent = song.title;
    artist.textContent = song.artist;
    note.textContent = song.note;
    status.textContent = "A little song for you.";
    resetButton.disabled = false;
    g.setAttribute("aria-pressed", "true");
    openedFlowers.add(i);
    renderNotes();

    if (openedFlowers.size === notes.length * 6) return;

    const a = new Audio(`audio/${song.file}`);
    a.addEventListener("loadedmetadata", () => {
    a.currentTime = song.start;
    a.play().catch(() => {});
    }, { once: true });
    audio = a;
    stopTimer = window.setTimeout(() => {
    stop();
    }, SNIPPET_SECONDS * 1000);
}

// Roses: one per song
SPOTS.forEach((_, i) => {
    const song = songs[i % songs.length];
    const [x, y] = SPOTS[i];
    const g = mk("g", {
    class: `rose ${song.tone ?? "red"}`, transform: `translate(${x} ${y}) rotate(${(i % 5 - 2) * 4})`,
    tabindex: 0, role: "button", "aria-pressed": "false",
    "aria-label": `${song.title} by ${song.artist}`,
    }, roses);
    const turn = mk("g", { class: "turn" }, g);
    for (let k = 0; k < 5; k++)
    mk("ellipse", { class: "outer", cy: -9, rx: 10, ry: 12, transform: `rotate(${k * 72})` }, turn);
    const inner = mk("g", { class: "inner" }, turn);
    for (let k = 0; k < 5; k++)
    mk("ellipse", { cy: -5, rx: 6, ry: 8, transform: `rotate(${k * 72 + 36})` }, inner);
    mk("circle", { class: "core", r: 3 }, inner);

    g.addEventListener("click", () => toggle(g, i));
    g.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(g, i); }
    if (e.key === "Escape" && current === g) toggle(g, i);
    });
});

resetButton.addEventListener("click", () => {
  roses.querySelectorAll<SVGGElement>(".rose.open").forEach((rose) => {
    rose.classList.remove("open");
    rose.setAttribute("aria-pressed", "false");
  });
  stop();
  current = null;
  reset();
});

reset();
