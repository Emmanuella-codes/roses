const test = require("node:test");
const assert = require("node:assert/strict");
const { FlowerProgress } = require("../.test-dist/src/progress.js");

const messages = ["one", "two", "three", "four", "five"];

test("reveals one note for every six flowers", () => {
  const progress = new FlowerProgress(messages, 6, () => 0);

  for (let i = 0; i < 5; i++) progress.open(i);
  assert.equal(progress.revealedCount, 0);

  progress.open(5);
  assert.equal(progress.revealedCount, 1);

  for (let i = 6; i < 12; i++) progress.open(i);
  assert.equal(progress.revealedCount, 2);
});

test("shuffles notes without repeats", () => {
  const progress = new FlowerProgress(messages, 6, () => 0.99);
  for (let i = 0; i < 30; i++) progress.open(i);
  const order = progress.revealedMessages;

  assert.equal(new Set(order).size, messages.length);
  assert.deepEqual([...order].sort(), [...messages].sort());
});

test("finale audio can trigger only after all 30 flowers are open", () => {
  const progress = new FlowerProgress(messages, 6, () => 0);

  for (let i = 0; i < 29; i++) progress.open(i);
  assert.equal(progress.shouldPlayFinale, false);

  progress.open(29);
  assert.equal(progress.shouldPlayFinale, true);
  assert.equal(progress.revealedCount, 5);
});

test("reset clears flower and note progress", () => {
  const progress = new FlowerProgress(messages, 6, () => 0);

  for (let i = 0; i < 6; i++) progress.open(i);
  assert.equal(progress.revealedCount, 1);

  progress.reset();
  assert.equal(progress.openedCount, 0);
  assert.equal(progress.revealedCount, 0);
  assert.equal(progress.complete, false);
});
