// Date function
function viewdate() {
  const event_date = document.getElementById("#event-date").value;
}
// Find min date for today
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

today = yyyy + "-" + mm + "-" + dd;
document.getElementById("event-date").setAttribute("min", today);

// new event
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#event-title").value.trim();
  const event_time = document.querySelector("#event-time").value.trim();
  const DTEvent_time = date_time(event_time);
  console.log(DTEvent_time);
  const event_date = document.querySelector("#event-date").value.trim();
  // const host_id = document.querySelector('#host-id').value.trim();

  if (title && event_time && event_date) {
    const response = await fetch(`/api/events`, {
      method: "POST",
      body: JSON.stringify({ title, event_time, event_date }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard");
      alert("Event created!");
    } else {
      alert("Failed to create event");
    }
  }
};

// remove event
const delButtonHandler = async (event) => {
  event.preventDefault();
  if (
    event.target.hasAttribute("data-id") &&
    event.target.matches(".deleteBtn")
  ) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete event");
    }
  }
};

const updateButtonHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute("data-id");
  const response = await fetch(`/api/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    // pass text title and desc text value data into edit
    body: JSON.stringify({
      title: document.getElementById("edit-event-title").value,
      description: document.getElementById("edit-event-desc").value,
    }),
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to update event");
  }
};

document
  .querySelector(".new-event-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".event-delete")
  .addEventListener("click", delButtonHandler);

document
  .querySelector("#updateBtn")
  .addEventListener("click", updateButtonHandler);
