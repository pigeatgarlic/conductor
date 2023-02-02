export class Queue<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) {}

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  async dequeue(): Promise<T> {
    let result = this.storage.shift();
    while (result === undefined) {
        await new Promise(resolve => setTimeout(resolve, 10));  // sleep 10ms
    }

    return result
  }
  size(): number {
    return this.storage.length;
  }
}