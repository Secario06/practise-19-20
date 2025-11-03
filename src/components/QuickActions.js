import React from 'react';
import './QuickActions.css';

const QuickActions = ({ onMarkAllCompleted, onResetAll, onRandomNext, technologies }) => {
  const notStartedCount = technologies.filter(tech => tech.status === 'not-started').length;
  const completedCount = technologies.filter(tech => tech.status === 'completed').length;

  return (
    <div className="quick-actions">
      <h3 className="quick-actions__title">Быстрые действия</h3>
      <div className="quick-actions__buttons">
        <button 
          className="quick-action-btn quick-action-btn--complete"
          onClick={onMarkAllCompleted}
          disabled={completedCount === technologies.length}
        >
          <span className="quick-action-btn__icon">✅</span>
          Отметить все как выполненные
        </button>
        
        <button 
          className="quick-action-btn quick-action-btn--reset"
          onClick={onResetAll}
          disabled={completedCount === 0}
        >
          <span className="quick-action-btn__icon">🔄</span>
          Сбросить все статусы
        </button>
        
        <button 
          className="quick-action-btn quick-action-btn--random"
          onClick={onRandomNext}
          disabled={notStartedCount === 0}
        >
          <span className="quick-action-btn__icon">🎲</span>
          Случайный выбор следующей технологии
          {notStartedCount > 0 && (
            <span className="quick-action-btn__badge">{notStartedCount}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuickActions;