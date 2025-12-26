import React from 'react';
import AlertCard from './AlertCard';

export default function AlertList({ alerts, onSelect }) {
  if (!alerts || alerts.length === 0) return <div>No alerts found</div>;
  return (
    <div>
      {alerts.map(alert => (
        <AlertCard key={alert.id} alert={alert} onClick={() => onSelect(alert)} />
      ))}
    </div>
  );
}
