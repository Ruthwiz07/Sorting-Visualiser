export const generateRandomArray = (size, min = 10, max = 400) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export const bubbleSort = (arr) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k)
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k)
        });
      }
    }
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i)
  });

  return steps;
};

export const selectionSort = (arr) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        comparing: [minIdx, j],
        sorted: Array.from({ length: i }, (_, k) => k),
        current: i
      });

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }

    steps.push({
      array: [...array],
      sorted: Array.from({ length: i + 1 }, (_, k) => k)
    });
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i)
  });

  return steps;
};

export const insertionSort = (arr) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    steps.push({
      array: [...array],
      current: i,
      sorted: Array.from({ length: i }, (_, k) => k)
    });

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        current: i,
        sorted: Array.from({ length: i }, (_, k) => k)
      });

      array[j + 1] = array[j];
      j--;

      steps.push({
        array: [...array],
        current: i,
        sorted: Array.from({ length: i }, (_, k) => k)
      });
    }

    array[j + 1] = key;
    steps.push({
      array: [...array],
      sorted: Array.from({ length: i + 1 }, (_, k) => k)
    });
  }

  return steps;
};

export const mergeSort = (arr) => {
  const steps = [];
  const array = [...arr];

  const merge = (left, mid, right) => {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...array],
        comparing: [left + i, mid + 1 + j]
      });

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }
      k++;

      steps.push({ array: [...array] });
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      i++;
      k++;
      steps.push({ array: [...array] });
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      j++;
      k++;
      steps.push({ array: [...array] });
    }
  };

  const mergeSortHelper = (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  };

  mergeSortHelper(0, array.length - 1);
  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, i) => i)
  });

  return steps;
};

export const quickSort = (arr) => {
  const steps = [];
  const array = [...arr];

  const partition = (low, high) => {
    const pivot = array[high];
    let i = low - 1;

    steps.push({
      array: [...array],
      pivot: high
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...array],
        comparing: [j, high],
        pivot: high
      });

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({
          array: [...array],
          pivot: high
        });
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({
      array: [...array],
      pivot: i + 1
    });

    return i + 1;
  };

  const quickSortHelper = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  };

  quickSortHelper(0, array.length - 1);
  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, i) => i)
  });

  return steps;
};

export const heapSort = (arr) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;

  const heapify = (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      steps.push({
        array: [...array],
        comparing: [i, largest]
      });

      [array[i], array[largest]] = [array[largest], array[i]];
      
      steps.push({ array: [...array] });
      heapify(n, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    steps.push({
      array: [...array],
      comparing: [0, i]
    });

    [array[0], array[i]] = [array[i], array[0]];
    
    steps.push({
      array: [...array],
      sorted: Array.from({ length: n - i }, (_, k) => i + k)
    });

    heapify(i, 0);
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i)
  });

  return steps;
};

export const radixSort = (arr) => {
  const steps = [];
  const array = [...arr];
  const max = Math.max(...array);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(array, exp, steps);
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, i) => i)
  });

  return steps;
};

const countingSort = (array, exp, steps) => {
  const n = array.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  for (let i = 0; i < n; i++) {
    count[Math.floor(array[i] / exp) % 10]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(array[i] / exp) % 10;
    output[count[digit] - 1] = array[i];
    count[digit]--;
    
    steps.push({
      array: [...array],
      current: i
    });
  }

  for (let i = 0; i < n; i++) {
    array[i] = output[i];
  }

  steps.push({ array: [...array] });
};

export const shellSort = (arr) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;

      steps.push({
        array: [...array],
        current: i
      });

      while (j >= gap && array[j - gap] > temp) {
        steps.push({
          array: [...array],
          comparing: [j, j - gap]
        });

        array[j] = array[j - gap];
        j -= gap;

        steps.push({ array: [...array] });
      }

      array[j] = temp;
      steps.push({ array: [...array] });
    }
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i)
  });

  return steps;
};

export const algorithmInfo = {
  bubbleSort: {
    name: 'Bubble Sort',
    description: 'Repeatedly compares adjacent elements and swaps them if they are in the wrong order. Simple but inefficient for large datasets.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)'
  },
  selectionSort: {
    name: 'Selection Sort',
    description: 'Finds the minimum element and places it at the beginning, then repeats for the remaining unsorted portion.',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)'
  },
  insertionSort: {
    name: 'Insertion Sort',
    description: 'Builds the sorted array one element at a time by inserting each element into its correct position.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)'
  },
  mergeSort: {
    name: 'Merge Sort',
    description: 'Divides the array into halves, sorts them recursively, then merges the sorted halves. Stable and efficient.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)'
  },
  quickSort: {
    name: 'Quick Sort',
    description: 'Selects a pivot element and partitions the array around it, then recursively sorts the partitions.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)'
  },
  heapSort: {
    name: 'Heap Sort',
    description: 'Builds a max heap and repeatedly extracts the maximum element. Not stable but has consistent performance.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)'
  },
  radixSort: {
    name: 'Radix Sort',
    description: 'Sorts integers by processing digits from least to most significant. Not comparison-based.',
    timeComplexity: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' },
    spaceComplexity: 'O(n + k)'
  },
  shellSort: {
    name: 'Shell Sort',
    description: 'Extension of insertion sort that allows exchanges of elements that are far apart, gradually reducing the gap.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n^1.25)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)'
  }
};