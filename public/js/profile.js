const session = require('express-session');

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#event-title').value.trim();
  const event_time = document.querySelector('#event-time').value.trim();
  const event_date = document.querySelector('#event-date').value.trim();
  // const host_id = document.querySelector('#host-id').value.trim();


  if (title && event_time && event_date) {
    const userID = req.session.name;

    const response = await fetch(`/api/events/`, {
      method: 'POST',
      body: JSON.stringify({ title, event_time, event_date, userID }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
      alert('Event created!');
    } else {
      alert('Failed to create event');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
