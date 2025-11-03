import React, { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import TechnologyFilter from './components/TechnologyFilter';

function App() {
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение базовых компонентов и их жизненного цикла', 
      status: 'not-started' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX и его особенностей', 
      status: 'not-started' 
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов и подъем состояния', 
      status: 'not-started' 
    },
    { 
      id: 4, 
      title: 'React Hooks', 
      description: 'Изучение основных хуков: useState, useEffect, useContext', 
      status: 'not-started' 
    },
    { 
      id: 5, 
      title: 'Component Composition', 
      description: 'Композиция компонентов и передача данных через props', 
      status: 'not-started' 
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const handleMarkAllCompleted = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const handleResetAll = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const handleRandomNext = () => {
    const notStarted = technologies.filter(tech => tech.status === 'not-started');
    if (notStarted.length > 0) {
      const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
      handleStatusChange(randomTech.id, 'in-progress');
      
      // Прокрутка к выбранной технологии
      const element = document.getElementById(`tech-${randomTech.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Визуальное выделение
        element.classList.add('highlight-pulse');
        setTimeout(() => element.classList.remove('highlight-pulse'), 2000);
      }
    } else {
      alert('Все технологии уже начаты или завершены! 🎉');
    }
  };

  const filteredTechnologies = technologies.filter(tech => {
    switch (activeFilter) {
      case 'not-started':
        return tech.status === 'not-started';
      case 'in-progress':
        return tech.status === 'in-progress';
      case 'completed':
        return tech.status === 'completed';
      default:
        return true;
    }
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Трекер изучения React</h1>
        <p>Кликайте на карточки для изменения статуса</p>
      </header>
      
      <ProgressHeader technologies={technologies} />
      
      <QuickActions 
        onMarkAllCompleted={handleMarkAllCompleted}
        onResetAll={handleResetAll}
        onRandomNext={handleRandomNext}
        technologies={technologies}
      />
      
      <TechnologyFilter 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        technologies={technologies}
      />
      
      <main className="app-main">
        <div className="technologies-grid">
          {filteredTechnologies.map(tech => (
            <div key={tech.id} id={`tech-${tech.id}`}>
              <TechnologyCard
                id={tech.id}
                title={tech.title}
                description={tech.description}
                status={tech.status}
                onStatusChange={handleStatusChange}
              />
            </div>
          ))}
        </div>
        
        {filteredTechnologies.length === 0 && (
          <div className="empty-state">
            <h3>Нет технологий для отображения</h3>
            <p>Попробуйте изменить фильтр</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;