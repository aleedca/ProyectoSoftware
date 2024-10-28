// Calendar.jsx

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Popup from './Popup';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Styles/Styles.css';
import '../App.css';
import axios from 'axios';
import imaMostrar from '../Assets/MostrarInfo.png';

const localizer = momentLocalizer(moment);

function Calendar() {
  const [Courses, setCourses] = useState([]);
  const [detailsCourses, setDetailsCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // Estado para el evento seleccionado
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [view, setView] = useState('month');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');

  useEffect(() => {
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

  useEffect(() => {
    const fetchDetailsCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getCourses');
        setDetailsCourses(response.data[0]);
      } catch (error) {
        console.error('Error al obtener la lista de detalles de los cursos:', error);
      }
    };
    fetchDetailsCourses();
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
    start: new Date(course.start),
    end: new Date(course.end),
  }));

  const handleEventClick = (event, e) => {
    setSelectedCourse(detailsCourses);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const closeTooltip = () => {
    setSelectedCourse(null);
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
          localizer={localizer}
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
        {selectedCourse && (
          <>
            <div className="overlay" onClick={closeTooltip} /> {/* Overlay para desenfoque y bloqueo */}
            <Tooltip course={selectedCourse} position={tooltipPosition} closeTooltip={closeTooltip} />
          </>
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

function Tooltip({ course, closeTooltip }) {
  const { Course, Teacher, Group, Modality, Location, Days, StartDate, EndDate, StartTime, EndTime, Notes } = course;
  return (
    <div className="tooltip">
      
      <div className='contenedor-columnas'>
          <div className='columna columna-imagen'>
              <img src={imaMostrar} alt="Imagen mostrar información" />
          </div>
          <div className='columna columna-formulario'>
              
          <h1>{Course}</h1>
          
          <p style={{fontSize:'16px', marginTop: '15px'}}><strong>PROFESOR: </strong>{Teacher}</p>
          <h2>INFORMACIÓN GENERAL</h2>
          <body style={{fontSize:'16px', marginTop: '10px'}}><strong>GRUPO: </strong>{Group}</body>
          <body style={{fontSize:'16px', marginTop: '10px'}}><strong>MODALIDAD: </strong>{Modality}</body>
          <body style={{fontSize:'16px', marginTop: '10px'}}><strong>LUGAR: </strong>{Location}</body>

          <h2>INFORMACIÓN HORARIOS</h2>
          <body style={{fontSize:'16px'}}><strong>DÍA(S): </strong>{Days}</body>
          <body style={{fontSize:'16px', marginTop: '10px'}}><strong>FECHA INICIO: </strong>{moment(StartDate).format('LL')}</body>
          <body style={{fontSize:'16px', marginTop: '10px'}}><strong>FECHA FINAL: </strong>{moment(EndDate).format('LL')}</body>
          <body style={{fontSize:'16px', marginTop: '10px'}}><strong>HORARIO: </strong>{moment(StartTime).format('HH:mm')} a {moment(EndTime).format('HH:mm')}</body>
          
          <body style={{fontSize:'16px', marginTop: '10px'}}><strong>NOTAS: </strong>{Notes || 'Ninguna'}</body>
        </div>
      </div>
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
