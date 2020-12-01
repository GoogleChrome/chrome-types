
import os from 'os';

/**
 * Runs a number of tasks in async parallel.
 * 
 * @template T
 * @template V
 * @param {!Array<T>} sourceArray source
 * @param {function(T): Promise<V>|V} work to perform
 * @param {number=} count of tasks, equal to CPUs
 * @return {!Array<V>} results
 */
export async function tasks(sourceArray, work, count = os.cpus().length) {
  count = Math.max(1, Math.ceil(count));
  let index = 0;
  const outputArray = new Array(sourceArray.length);

  const worker = async (i) => {
    while (index < sourceArray.length) {
      const localIndex = index;
      ++index;

      const source = sourceArray[localIndex];
      const result = await work(source);
      outputArray[localIndex] = result;
    }
  };

  const workerPromises = [];
  for (let i = 0; i < count; ++i) {
    workerPromises.push(worker(i));
  }
  await Promise.all(workerPromises);

  return outputArray;
}
