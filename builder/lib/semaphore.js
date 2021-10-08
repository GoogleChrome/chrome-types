

export class Semaphore {
  #count = 0;

  /** @type {(() => void)[]} */
  #pending = [];

  constructor(count = 0) {
    this.#count = Math.ceil(count || 0);  // ensure integer
  }

  release(value = 1) {
    for (let i = 0; i < value; ++i) {
      const next = this.#pending.shift();
      if (next) {
        next();
      } else {
        ++this.#count;
      }
    }
  }

  async acquire() {
    if (this.#count === 0) {
      await /** @type {Promise<void>} */ (new Promise((r) => this.#pending.push(r)));
    } else {
      --this.#count;
    }
  }
}
