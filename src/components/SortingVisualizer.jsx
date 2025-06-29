import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  generateRandomArray, 
  bubbleSort, 
  selectionSort, 
  insertionSort, 
  mergeSort, 
  quickSort, 
  heapSort, 
  radixSort, 
  shellSort 
} from '../utils/sortingAlgorithms';
import { AlgorithmInfo } from './AlgorithmInfo';

const algorithms = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  radixSort,
  shellSort
};

export const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState('bubbleSort');
  const [speed, setSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(50);
  const [showSettings, setShowSettings] = useState(false);
  
  const intervalRef = useRef(null);

  const initializeArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setIsPaused(false);
  }, [arraySize]);

  useEffect(() => {
    initializeArray();
  }, [initializeArray]);

  const startSorting = () => {
    if (steps.length === 0) {
      const sortSteps = algorithms[currentAlgorithm](array);
      setSteps(sortSteps);
    }
    
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseSorting = () => {
    setIsPlaying(false);
    setIsPaused(true);
  };

  const stopSorting = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetArray = () => {
    stopSorting();
    initializeArray();
  };

  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 101 - speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, steps, speed]);

  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      setArray(steps[currentStep].array);
    }
  }, [currentStep, steps]);

  const currentStepData = steps[currentStep];
  const maxValue = Math.max(...array);

  const getBarColor = (index) => {
    if (!currentStepData) return '#64b5f6';
    
    if (currentStepData.sorted?.includes(index)) return '#4caf50';
    if (currentStepData.comparing?.includes(index)) return '#f44336';
    if (currentStepData.pivot === index) return '#ff9800';
    if (currentStepData.current === index) return '#9c27b0';
    
    return '#64b5f6';
  };

  return (
    <div className="visualizer-container">
      <header className="header">
        <h1>Sorting Algorithm Visualizer</h1>
        <div className="controls">
          <select 
            value={currentAlgorithm}
            onChange={(e) => {
              setCurrentAlgorithm(e.target.value);
              resetArray();
            }}
            disabled={isPlaying}
            className="algorithm-select"
          >
            <option value="bubbleSort">Bubble Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="heapSort">Heap Sort</option>
            <option value="radixSort">Radix Sort</option>
            <option value="shellSort">Shell Sort</option>
          </select>

          <div className="control-buttons">
            {!isPlaying ? (
              <button onClick={startSorting} className="control-btn play">
                ▶
                {isPaused ? 'Resume' : 'Start'}
              </button>
            ) : (
              <button onClick={pauseSorting} className="control-btn pause">
                ⏸
                Pause
              </button>
            )}
            
            <button onClick={stopSorting} className="control-btn stop" disabled={!isPlaying && !isPaused}>
              ⏹
              Stop
            </button>
            
            <button onClick={resetArray} className="control-btn reset" disabled={isPlaying}>
              ↻
              Reset
            </button>

            <button 
              onClick={() => setShowSettings(!showSettings)} 
              className="control-btn settings"
              disabled={isPlaying}
            >
              ⚙
            </button>
          </div>
        </div>
      </header>

      {showSettings && (
        <div className="settings-panel">
          <div className="setting-group">
            <label htmlFor="speed">Speed: {speed}</label>
            <input
              id="speed"
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={isPlaying}
            />
          </div>
          
          <div className="setting-group">
            <label htmlFor="size">Array Size: {arraySize}</label>
            <input
              id="size"
              type="range"
              min="10"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isPlaying}
            />
          </div>
        </div>
      )}

      <div className="main-content">
        <div className="visualization-section">
          <div className="array-container">
            {array.map((value, index) => (
              <div
                key={index}
                className="array-bar"
                style={{
                  height: `${(value / maxValue) * 100}%`,
                  backgroundColor: getBarColor(index),
                  width: `${Math.max(800 / array.length - 2, 2)}px`
                }}
              >
                {array.length <= 20 && (
                  <span className="bar-value">{value}</span>
                )}
              </div>
            ))}
          </div>
          
          <div className="progress-info">
            <div className="step-counter">
              Step: {currentStep + 1} / {steps.length || 1}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        <div className="info-section">
          <AlgorithmInfo algorithm={currentAlgorithm} />
          
          <div className="legend">
            <h4>Color Legend</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color default"></div>
                <span>Unsorted</span>
              </div>
              <div className="legend-item">
                <div className="legend-color comparing"></div>
                <span>Comparing</span>
              </div>
              <div className="legend-item">
                <div className="legend-color pivot"></div>
                <span>Pivot</span>
              </div>
              <div className="legend-item">
                <div className="legend-color current"></div>
                <span>Current</span>
              </div>
              <div className="legend-item">
                <div className="legend-color sorted"></div>
                <span>Sorted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};