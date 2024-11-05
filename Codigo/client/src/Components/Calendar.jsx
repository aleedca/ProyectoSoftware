// Calendar.jsx

import React, { useState, useEffect ,useContext } from 'react';
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
import { UserContext } from '../UserContext'; // Asegúrate de importar UserContext


const localizer = momentLocalizer(moment);

function Calendar() {
  //const [Courses, setCourses] = useState([]);
  const { link,refrescar, setRefrescar } = useContext(UserContext); 
  const [detailsCourses, setDetailsCourses] = useState([]);
  const [detailsHolidays, setDetailsHolidays] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); 
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [view, setView] = useState('month');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');

  /*
  useEffect(() => {
    const fetchCoursesCalendar = async () => {
      try {
        const response = await axios.get(link + '/getCoursesCalendar');
        setCourses(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de cursos del calendario:', error);
      }
    };
    fetchCoursesCalendar();
  }, []);
  */
  console.log(refrescar)
  useEffect(() => {
    const fetchDetailsCourses = async () => {
      try {
        const response = await axios.get(link + '/getCourses', { withCredentials: true });
        setDetailsCourses(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de detalles de los cursos:', error);
      }
    };
    fetchDetailsCourses();
  }, []);

  useEffect(() => {
    const fetchDetailsHolidays = async () => {
      try {
        const response = await axios.get(link + '/getHolidays', { withCredentials: true });
        setDetailsHolidays(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al obtener la lista de detalles de los holidays:', error);
      }
    };
    fetchDetailsHolidays();
  }, []);

  useEffect(() => {
    const fetchDetailsHolidays = async () => {
      try {
        const response = await axios.get(link + '/getHolidays', { withCredentials: true });
        setDetailsHolidays(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error al obtener la lista de detalles de los holidays:', error);
      }
    };
    fetchDetailsHolidays();
  }, [refrescar]);

  useEffect(() => {
    const fetchDetailsCourses = async () => {
      try {
        const response = await axios.get(link + '/getCourses', { withCredentials: true });
        setDetailsCourses(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de detalles de los cursos:', error);
      }
    };
    fetchDetailsCourses();
  }, [refrescar]);


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

  const events = detailsCourses.flatMap((course) => {
    // Diccionario para convertir nombres de días a índices de JavaScript (0 para domingo a 6 para sábado)
    const dayMap = {
      'Domingo': 0,
      'Lunes': 1,
      'Martes': 2,
      'Miércoles': 3,
      'Jueves': 4,
      'Viernes': 5,
      'Sábado': 6,
    };
    
    // Convertir los días de la semana a sus correspondientes índices numéricos
    const daysOfWeek = course.Days.split(",").map(day => dayMap[day.trim()]);
    
    const startDate = new Date(course.StartDate);
    const endDate = new Date(course.EndDate);
    const startTime = new Date(course.StartTime);
    const endTime = new Date(course.EndTime);
    
    const eventsForCourse = [];

    // Iterar desde la fecha de inicio hasta la fecha de fin del curso
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (daysOfWeek.includes(currentDate.getDay())) {
        // Crear un evento para cada día correspondiente
        const eventStart = new Date(currentDate);
        const eventEnd = new Date(currentDate);

        // Asignar horas y minutos a start y end
        eventStart.setHours(startTime.getHours(), startTime.getMinutes());
        eventEnd.setHours(endTime.getHours(), endTime.getMinutes());

        // Agregar el evento
        eventsForCourse.push({
          ...course,
          id: course.Id,
          title: course.Course,
          start: eventStart,
          end: eventEnd,
          color: course.Color ? `#${course.Color}` : '#E0FFFF',
        });
      }

      // Avanzar al siguiente día
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return eventsForCourse;
  });

  const handleEventClick = (event, e) => {
    setSelectedCourse(event);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const closeTooltip = () => {
    setSelectedCourse(null);
  };

 /* const dayPropGetter = (date) => {
    const today = new Date();
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return {
        style: { backgroundColor: '#ffdd57', color: '#333' } // Cambia el color aquí
      };
    }
    return {};
  };*/

  const dayPropGetter = (date) => {
    // Cambia el color de fondo si `date` está dentro del rango de un festivo
    const isHoliday = detailsHolidays.some(holiday => {
      const startDate = new Date(holiday.StartDatetime);
      const endDate = new Date(holiday.EndDatetime);
      
      // Verifica si `date` está dentro del rango [startDate, endDate]
      return date >= startDate && date <= endDate;
    });
  
    return {
      style: {
        backgroundColor: isHoliday ? '#e0e0e0' : undefined, // Color específico si es festivo
      }
    };
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
          dayPropGetter={dayPropGetter} // Usar dayPropGetter aquí
        />
        {isPopupOpen && (
          <Popup type={popupType} closePopup={closePopup} />
        )}
        {selectedCourse && (
          <>
            <div className="overlay" onClick={closeTooltip} />
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
  const { Id, Course, Teacher, Email, Group, Modality, Location, Days, StartDate, EndDate, StartTime, EndTime, Notes } = course;
  return (
    <div className="tooltip">
      
      <div className='contenedor-columnas'>
          <div className='columna columna-imagen'>
              <img src={imaMostrar} alt="Imagen mostrar información" />
          </div>
          <div className='columna columna-formulario'>
              
          <h1 style={{fontSize:'26px', alignSelf:'center'}}>{Course}</h1>
          
          <p style={{fontSize:'16px', marginTop: '15px'}}><strong>PROFESOR: </strong>{Teacher}</p>
          <body style={{fontSize:'16px', alignSelf:'center'}}>{Email}</body>
          <h2>INFORMACIÓN GENERAL</h2>
          <body style={{fontSize:'16px'}}><strong>ID: </strong>{Id}</body>
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
