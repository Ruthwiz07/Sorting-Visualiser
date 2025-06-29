import React from 'react';
import { algorithmInfo } from '../utils/sortingAlgorithms';

export const AlgorithmInfo = ({ algorithm }) => {
  const info = algorithmInfo[algorithm];

  return (
    <div className="algorithm-info">
      <h3>{info.name}</h3>
      <p className="description">{info.description}</p>
      
      <div className="complexity-grid">
        <div className="complexity-section">
          <h4>Time Complexity</h4>
          <div className="complexity-values">
            <span className="complexity-item best">
              <strong>Best:</strong> {info.timeComplexity.best}
            </span>
            <span className="complexity-item average">
              <strong>Average:</strong> {info.timeComplexity.average}
            </span>
            <span className="complexity-item worst">
              <strong>Worst:</strong> {info.timeComplexity.worst}
            </span>
          </div>
        </div>
        
        <div className="complexity-section">
          <h4>Space Complexity</h4>
          <span className="complexity-item space">
            <strong>{info.spaceComplexity}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};