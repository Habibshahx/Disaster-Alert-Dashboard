import React, { useState, useMemo } from 'react';
import MapView from './components/MapView';
import AlertList from './components/AlertList';
import FilterBar from './components/FilterBar';
import mockAlerts from './data/mockAlerts';

function App() {
  const [alerts] = useState(mockAlerts);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [sortBy, setSortBy] = useState("Newest");
  const [fitAll, setFitAll] = useState(false);  

  // Fit All Alerts 
  const handleFitAll = () => {
    setFitAll(prev => !prev); 
  };

  // Unique types
  const types = useMemo(
    () => ['All', ...new Set(alerts.map(a => a.type))],
    [alerts]
  );

  // Filtering
  const filtered = alerts.filter(a => {
    if (typeFilter !== 'All' && a.type !== typeFilter) return false;
    if (severityFilter !== 'All' && a.severity !== severityFilter) return false;
    if (query && !a.location.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  // Sorting
  const sortedAlerts = [...filtered].sort((a, b) => {
    if (sortBy === "Newest") return new Date(b.time) - new Date(a.time);
    if (sortBy === "Oldest") return new Date(a.time) - new Date(b.time);
    if (sortBy === "High Severity") {
      const rank = { High: 3, Medium: 2, Low: 1 };
      return rank[b.severity] - rank[a.severity];
    }
    return 0;
  });

  return (
    <>
      {/*Top navigation Bar*/}
      <nav className="top-nav">
        <div className="nav-title">🌐 Disaster Dashboard</div>
        <div className="nav-actions">
          <button className="nav-btn" onClick={handleFitAll}>
            Fit All Alerts
          </button>
        </div>
      </nav>

      <div className="app">

        {/* Side Panel */}
        <aside className="side-panel">

          {/* Header */}
          <div className="header">
            <div className="h-title">Disaster Alerts</div>

            {/* Count */}
            <span className="count-badge">{sortedAlerts.length}</span>

            {/* Sort Dropdown */}
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="High Severity">High Severity</option>
            </select>
          </div>

          {/* Filters */}
          <FilterBar
            types={types}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            severityFilter={severityFilter}
            setSeverityFilter={setSeverityFilter}
            query={query}
            setQuery={setQuery}
          />

          {/* Alerts */}
          <AlertList
            alerts={sortedAlerts}
            onSelect={setSelectedAlert}
          />

        </aside>

        {/* Map Section */}
        <main className="map-container">
          <MapView
            alerts={sortedAlerts}
            selectedAlert={selectedAlert}
            onMarkerClick={setSelectedAlert}
            triggerFitMap={fitAll}     
          />
        </main>

        {/* Modal */}
        {selectedAlert && (
          <div className="modal-overlay" onClick={() => setSelectedAlert(null)}>
            <div className="modal glass-modal" onClick={(e) => e.stopPropagation()}>

              {/* Close */}
              <div className="modal-close" onClick={() => setSelectedAlert(null)}>×</div>

              {/* Title */}
              <h2 className="modal-title">{selectedAlert.type}</h2>

              {/* Location */}
              <div className="modal-location">
                📍 {selectedAlert.location}
              </div>

              {/* Severity */}
              <div className={`modal-severity sev-${selectedAlert.severity.toLowerCase()}`}>
                {selectedAlert.severity} Severity
              </div>

              {/* Description */}
              <p className="modal-desc">{selectedAlert.description}</p>

              {/* Time */}
              <div className="modal-time">
                Reported: {new Date(selectedAlert.time).toLocaleString()}
              </div>

              {/* Affected Area */}
              {selectedAlert.affectedAreaKm2 && (
                <div className="modal-area">
                  Affected Area: <strong>{selectedAlert.affectedAreaKm2} km²</strong>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default App;
