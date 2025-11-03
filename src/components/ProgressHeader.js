import React from 'react';
import './ProgressHeader.css';

const ProgressHeader = ({ technologies }) => {
  const totalTechnologies = technologies.length;
  const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
  const inProgressTechnologies = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStartedTechnologies = technologies.filter(tech => tech.status === 'not-started').length;
  
  const progressPercentage = totalTechnologies > 0 
    ? Math.round((completedTechnologies / totalTechnologies) * 100) 
    : 0;

  const getProgressLevel = () => {
    if (progressPercentage >= 80) return 'high';
    if (progressPercentage >= 50) return 'medium';
    return 'low';
  };

  const getMostCommonStatus = () => {
    const statusCounts = {
      'completed': completedTechnologies,
      'in-progress': inProgressTechnologies,
      'not-started': notStartedTechnologies
    };
    
    const maxStatus = Object.keys(statusCounts).reduce((a, b) => 
      statusCounts[a] > statusCounts[b] ? a : b
    );
    
    return maxStatus;
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Изучено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return status;
    }
  };

  return (
    <div className="progress-header">
      <div className="progress-header__stats">
        <div className="progress-stat">
          <span className="progress-stat__value">{totalTechnologies}</span>
          <span className="progress-stat__label">Всего технологий</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat__value">{completedTechnologies}</span>
          <span className="progress-stat__label">Изучено</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat__value">{inProgressTechnologies}</span>
          <span className="progress-stat__label">В процессе</span>
        </div>
        <div className="progress-stat">
          <span className="progress-stat__value">{notStartedTechnologies}</span>
          <span className="progress-stat__label">Не начато</span>
        </div>
      </div>
      
      <div className="progress-bar">
        <div className="progress-bar__info">
          <span>Общий прогресс:</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="progress-bar__track">
          <div 
            className={`progress-bar__fill progress-bar__fill--${getProgressLevel()}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="progress-details">
        <div className="progress-detail">
          <strong>Самая частая категория:</strong> 
          <span className={`status-badge status-badge--${getMostCommonStatus()}`}>
            {getStatusText(getMostCommonStatus())}
          </span>
        </div>
        <div className="progress-detail">
          <strong>Следующая цель:</strong> 
          <span>
            {notStartedTechnologies > 0 
              ? `${notStartedTechnologies} технологий для изучения` 
              : 'Все технологии изучены! 🎉'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;