import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CalendarioAlimentacion.css';

const CalendarioAlimentacion = () => {
  // Datos de ejemplo para el calendario
  const eventos = [
    {
      title: 'Alimentación Mañana',
      start: '2025-07-25T08:00:00',
      end: '2025-07-25T09:00:00',
      backgroundColor: '#4e73df',
      borderColor: '#4e73df'
    },
    {
      title: 'Alimentación Tarde',
      start: '2025-07-25T15:00:00',
      end: '2025-07-25T16:00:00',
      backgroundColor: '#1cc88a',
      borderColor: '#1cc88a'
    },
    {
      title: 'Revisión de Inventario',
      start: '2025-07-26T10:00:00',
      end: '2025-07-26T11:00:00',
      backgroundColor: '#f6c23e',
      borderColor: '#f6c23e'
    }
  ];

  return (
    <Card className="shadow h-100">
      <Card.Header className="py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">Calendario de Alimentación</h6>
      </Card.Header>
      <Card.Body>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          height="auto"
          locale={esLocale}
          events={eventos}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          initialDate={new Date()}
          eventContent={renderEventContent}
        />
      </Card.Body>
    </Card>
  );
};

// Función para personalizar el renderizado de eventos
function renderEventContent(eventInfo) {
  return (
    <div className="fc-event-main">
      <i className="fas fa-utensils me-1"></i>
      <span>{eventInfo.event.title}</span>
    </div>
  );
}

export default CalendarioAlimentacion;
