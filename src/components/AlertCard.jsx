import React from "react";
import { FiChevronRight } from "react-icons/fi";

const sevClass = (severity) => {
  if (severity === "High") return "sev-high";
  if (severity === "Medium") return "sev-medium";
  return "sev-low";
};

export default function AlertCard({ alert, onClick }) {
  return (
    <div 
      className="alert-card card-animate"
      onClick={onClick}
    >
      <div className="left">
        <span className={`severity-dot ${sevClass(alert.severity)}`}></span>

        <div className="alert-info">
          <div className="alert-type">{alert.type}</div>
          <div className="alert-loc">{alert.location}</div>
        </div>
      </div>

      <div className="right">
        <div className="alert-time">
          {new Date(alert.time).toLocaleString()}
        </div>
        <FiChevronRight className="arrow-icon" />
      </div>
    </div>
  );
}
