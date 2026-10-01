export class FlowerProgress {
  private opened = new Set<number>();
  private order: string[] = [];

  constructor(
    private readonly messages: readonly string[],
    private readonly flowersPerNote = 6,
    private readonly random: () => number = Math.random,
  ) {
    this.reset();
  }

  open(index: number) {
    if (this.opened.has(index)) return false;
    this.opened.add(index);
    return true;
  }

  reset() {
    this.opened.clear();
    this.order = [...this.messages];
    for (let i = this.order.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
    }
  }

  get openedCount() {
    return this.opened.size;
  }

  get revealedCount() {
    return Math.min(Math.floor(this.openedCount / this.flowersPerNote), this.messages.length);
  }

  get revealedMessages() {
    return this.order.slice(0, this.revealedCount);
  }

  get complete() {
    return this.revealedCount === this.messages.length;
  }

  get shouldPlayFinale() {
    return this.complete;
  }
}
