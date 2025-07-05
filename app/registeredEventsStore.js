// app/registeredEventsStore.js

// Start with initial events, or use an empty array if you want
export let registeredEventsGlobal = [
  {
    id: '1',
    date: '15 March 2025',
    title: 'Science Centre',
    details: 'Saturday 10AM - 1PM @ Science Centre\nPick up @ Pek Kio CC',
    paid: false,
  },
  {
    id: '2',
    date: '5 May 2025',
    title: 'Spring Carnival',
    details: 'Sunday 12PM - 4PM @ Community Park',
    paid: true,
  },
];

// Add an event (if not already present)
export function addRegisteredEvent(event) {
  if (!registeredEventsGlobal.some(e => e.id === event.id)) {
    registeredEventsGlobal.push(event);
  }
}

// Remove an event by id
export function removeRegisteredEvent(eventId) {
  registeredEventsGlobal = registeredEventsGlobal.filter(e => e.id !== eventId);
}
