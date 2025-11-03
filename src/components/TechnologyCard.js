import React from 'react';
import './TechnologyCard.css';

const TechnologyCard = ({ id, title, description, status, onStatusChange }) => {
  const handleClick = () => {
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const nextStatus = statusOrder[nextIndex];
    
    onStatusChange(id, nextStatus);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔄';
      case 'not-started':
        return '⏳';
      default:
        return '📝';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Изучено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
        return 'Не начато';
      default:
        return 'Не определено';
    }
  };

  return (
    <div 
      className={`technology-card technology-card--${status}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="technology-card__header">
        <h3 className="technology-card__title">{title}</h3>
        <span className="technology-card__status-icon">{getStatusIcon()}</span>
      </div>
      <p className="technology-card__description">{description}</p>
      <div className="technology-card__footer">
        <span className={`technology-card__status technology-card__status--${status}`}>
          {getStatusText()} (кликните для смены)
        </span>
      </div>
    </div>
  );
};

export default TechnologyCard;