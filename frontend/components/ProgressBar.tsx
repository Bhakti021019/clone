import React from "react";

interface ProgressTrackerProps {
  progress: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  return (
    <div className="progress-tracker">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <span>{progress}% Complete</span>

      {/* Inline CSS */}
      <style jsx>{`
        .progress-tracker {
          margin: 20px 0;
          position: relative;
          height: 20px;
          background-color: #e0e0e0;
          border-radius: 10px;
          width: 100%;
        }

        .progress-bar {
          height: 100%;
          background-color: #007bff;
          border-radius: 10px;
          transition: width 0.5s ease-in-out;
        }

        .progress-tracker span {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default ProgressTracker;
