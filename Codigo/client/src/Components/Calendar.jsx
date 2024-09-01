// Calendar.jsx

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Popup from './Popup';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { format, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Styles/Styles.css';

const localizer = momentLocalizer(moment);

const customLocalizer = {
  formats: {
    dateFormat: 'dd',
    dayFormat: 'd',
    weekdayFormat: 'dddd',
    dayRangeHeaderFormat: ({ start, end }, culture, local) => `${format(start, 'd MMM', { locale: es })} - ${format(end, 'd MMM', { locale: es })}`,
    monthHeaderFormat: (date, culture, local) => format(date, 'MMMM yyyy', { locale: es }),
    dayHeaderFormat: (date, culture, local) => format(date, 'dddd, MMMM d', { locale: es }),
    agendaHeaderFormat: (date, culture, local) => format(date, 'dddd, MMMM d', { locale: es }),
    timeGutterFormat: (date, culture, local) => format(date, 'H:mm', { locale: es }),
  },
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  messages: {
    next: 'Siguiente',
    previous: 'Anterior',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Lista',
  },
};

function Calendar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [view, setView] = useState('month');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');

  const openPopup = (type) => {
    console.log("Opening popup:", type); // Verificar el tipo de popup al abrir
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    console.log("Closing popup"); // Verificar cuando se cierra el popup
    setIsPopupOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const events = [
    {
      title: 'Evento 1',
      start: new Date(),
      end: new Date(),
      color: '#ff5733',
    },
    {
      title: 'Evento 2',
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      color: '#33caff',
    },
  ];

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
          messages={customLocalizer.messages}
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
