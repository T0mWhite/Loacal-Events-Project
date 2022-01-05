// Date function
function viewdate() { 
  const event_date = document.getElementById("#event-date").value; 
}
  // Find min date for today
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("event-date").setAttribute("min", today);




const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#event-title').value.trim();
  const event_time = document.querySelector('#event-time').value.trim();
  const event_date = document.querySelector('#event-date').value.trim();
  // const host_id = document.querySelector('#host-id').value.trim();


  if (title && event_time && event_date) {
    // const userID = req.session.name;

    const response = await fetch(`/api/events/`, {
      method: 'POST',
      body: JSON.stringify({ title, event_time, event_date }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
      alert('Event created!');
    } else {
      alert('Failed to create event');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete event');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.event-list')
  .addEventListener('click', delButtonHandler);