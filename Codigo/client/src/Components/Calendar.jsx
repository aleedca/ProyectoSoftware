// Calendar.jsx

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Popup from './Popup';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';  // Asegurarse de que el locale esté correctamente importado
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Styles/Styles.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);  // Usa momentLocalizer directamente

function Calendar() {
  const [Courses, setCourses] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [view, setView] = useState('month');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');

  useEffect(() => {
    // Función para obtener la lista de cursos
    const fetchCoursesCalendar = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getCoursesCalendar');
        setCourses(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de cursos del calendario:', error);
      }
    };

    fetchCoursesCalendar();
  }, []);

  const openPopup = (type) => {
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const events = Courses.map((course) => ({
    ...course,
    start: new Date(course.start),  // Asegúrate de que estas fechas estén en formato Date
    end: new Date(course.end),
  }));

  const handleEventClick = (event) => {
    openPopup('AgregarCurso');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          width: isSidebarOpen ? '250px' : '80px',
          backgroundColor: '#f4f4f4',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} openPopup={openPopup} />
      </div>
      <div style={{ flex: 1, padding: '20px', position: 'relative' }}>
        <BigCalendar
          localizer={localizer}  // Usa el localizer directamente aquí
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '80vh' }}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          messages={{
            next: 'Siguiente',
            previous: 'Anterior',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Lista',
          }}
          onSelectEvent={handleEventClick}
          components={{
            toolbar: (props) => <Toolbar {...props} view={view} setView={setView} />,
            event: EventComponent,
          }}
        />
        {isPopupOpen && (
          <Popup type={popupType} closePopup={closePopup} />
        )}
      </div>
    </div>
  );
}

function EventComponent({ event }) {
  const { color } = event;
  return (
    <div
      style={{
        backgroundColor: color || '#007bff',
        color: '#fff',
        padding: '12px 10px',
        borderRadius: '4px',
        fontSize: '1.2em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {event.title}
    </div>
  );
}

function Toolbar(props) {
  const { view, setView } = props;

  return (
    <div className="rbc-toolbar">
      <div className="rbc-toolbar-header">
        <div className="rbc-toolbar-label">
          {props.label}
        </div>
      </div>
      <div className="rbc-toolbar-buttons">
        <button onClick={() => props.onNavigate('PREV')}>Anterior</button>
        <button onClick={() => props.onNavigate('TODAY')}>Hoy</button>
        <button onClick={() => props.onNavigate('NEXT')}>Siguiente</button>
      </div>
      <div className="view-buttons">
        <button
          className={view === 'agenda' ? 'active' : ''}
          onClick={() => { setView('agenda'); props.onView('agenda'); }}
        >
          Lista
        </button>
        <button
          className={view === 'day' ? 'active' : ''}
          onClick={() => { setView('day'); props.onView('day'); }}
        >
          Día
        </button>
        <button
          className={view === 'week' ? 'active' : ''}
          onClick={() => { setView('week'); props.onView('week'); }}
        >
          Semana
        </button>
        <button
          className={view === 'month' ? 'active' : ''}
          onClick={() => { setView('month'); props.onView('month'); }}
        >
          Mes
        </button>
      </div>
    </div>
  );
}

export default Calendar;
