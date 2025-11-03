import React from 'react';
import './TechnologyFilter.css';

const TechnologyFilter = ({ activeFilter, onFilterChange, technologies }) => {
  const filters = [
    { key: 'all', label: 'Все', count: technologies.length },
    { key: 'not-started', label: 'Не начатые', count: technologies.filter(t => t.status === 'not-started').length },
    { key: 'in-progress', label: 'В процессе', count: technologies.filter(t => t.status === 'in-progress').length },
    { key: 'completed', label: 'Выполненные', count: technologies.filter(t => t.status === 'completed').length }
  ];

  return (
    <div className="technology-filter">
      <h3 className="technology-filter__title">Фильтр по статусу</h3>
      <div className="technology-filter__buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${activeFilter === filter.key ? 'filter-btn--active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
            <span className="filter-btn__count">{filter.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TechnologyFilter;