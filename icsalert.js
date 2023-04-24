
function formatDate(date) {
  return date.toISOString().slice(0, 10).replace(/-/g, '');
}


const startDate = document.querySelector('#startDate');
const endDate = document.querySelector('#endDate');
const today = new Date();
startDate.valueAsDate = today;
endDate.valueAsDate = today;


startDate.addEventListener('change', function() {
  endDate.min = startDate.value;
});


function createICS() {

  const event = {
    start: startDate.value,
    end: endDate.value,
    summary: document.querySelector('#summary').value,
    description: document.querySelector('#description').value
  };
  

  const icsContent =
    'BEGIN:VCALENDAR\n' +
    'VERSION:2.0\n' +
    'PRODID:-//Test Cal//EN\n' +
    'BEGIN:VEVENT\n' +
    'UID:' + Math.random().toString(36).substr(2, 9) + '\n' +
    'DTSTAMP:' + formatDate(new Date()) + 'T000000Z\n' +
    'DTSTART:' + formatDate(new Date(event.start)) + 'T000000Z\n' +
    'DTEND:' + formatDate(new Date(event.end)) + 'T000000Z\n' +
    'SUMMARY:' + event.summary + '\n' +
    'DESCRIPTION:' + event.description + '\n' +
    'END:VEVENT\n' +
    'END:VCALENDAR';

  const icsBlob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const downloadLink = document.createElement('a');
  downloadLink.download = 'event.ics';
  downloadLink.href = window.URL.createObjectURL(icsBlob);
  downloadLink.click();
}

const createButton = document.querySelector('#create');
createButton.addEventListener('click', createICS);
