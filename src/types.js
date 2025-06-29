// Type definitions for the sorting visualizer (JSX version)

// Algorithm names
export const ALGORITHM_NAMES = {
  BUBBLE_SORT: 'bubbleSort',
  SELECTION_SORT: 'selectionSort',
  INSERTION_SORT: 'insertionSort',
  MERGE_SORT: 'mergeSort',
  QUICK_SORT: 'quickSort',
  HEAP_SORT: 'heapSort',
  RADIX_SORT: 'radixSort',
  SHELL_SORT: 'shellSort'
};

// Helper function to validate algorithm names
export const isValidAlgorithmName = (name) => {
  return Object.values(ALGORITHM_NAMES).includes(name);
};

// Default sort step structure
export const createSortStep = (array, options = {}) => {
  return {
    array: [...array],
    comparing: options.comparing || null,
    sorted: options.sorted || null,
    pivot: options.pivot || null,
    current: options.current || null
  };
};

// Default algorithm info structure
export const createAlgorithmInfo = (name, description, timeComplexity, spaceComplexity) => {
  return {
    name,
    description,
    timeComplexity: {
      best: timeComplexity.best,
      average: timeComplexity.average,
      worst: timeComplexity.worst
    },
    spaceComplexity
  };
};