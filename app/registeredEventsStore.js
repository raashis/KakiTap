const store = {
  registeredEventsGlobal: [
    {
      id: '1',
      date: '15 March 2025',
      title: 'Science Centre',
      details: 'Saturday 10AM - 1PM @ Science Centre\nPick up @ Pek Kio CC',
      paid: false,
    },
    // DO NOT include Durian Fiesta here if you want to test adding it!
  ],
};



export function addRegisteredEvent(event) {
  console.log('Trying to add event:', event);
  if (!store.registeredEventsGlobal.some(e => String(e.id) === String(event.id))) {
    store.registeredEventsGlobal.push(event);
    console.log('Event added:', event);
  } else {
    console.log('Event already exists:', event.id);
  }
  console.log('Current store:', store.registeredEventsGlobal);
}


export function removeRegisteredEvent(eventId) {
  store.registeredEventsGlobal = store.registeredEventsGlobal.filter(
    e => String(e.id) !== String(eventId)
  );
}


export default store;
