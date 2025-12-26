import React from "react";
import { FiFilter, FiSearch } from "react-icons/fi";

export default function FilterBar({
  types,
  typeFilter,
  setTypeFilter,
  severityFilter,
  setSeverityFilter,
  query,
  setQuery,
}) {
  return (
    <div className="filter-container">

      {/* Top Row */}
      <div className="filter-top">
        <FiFilter className="filter-icon" />

        <select
          className="select fancy-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select
          className="select fancy-select"
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          <option value="All">All Severity</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Search */}
      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          className="search-input"
          placeholder="Search by city or region..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
