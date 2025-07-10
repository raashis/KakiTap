const store = {
  registeredEventsGlobal: [
    {
      id: '1',
      date: '15 Mac 2025',
      title: 'Pusat Sains',
      details: 'Sabtu 10AM - 1PM @ Pusat Sains\nAmbil di Pek Kio CC',
      paid: false,
    },
    // Untuk menguji penambahan Fiesta Durian, jangan masukkan di sini!
  ],
};

export function addRegisteredEvent(event) {
  console.log('Cuba tambah acara:', event);
  if (!store.registeredEventsGlobal.some(e => String(e.id) === String(event.id))) {
    store.registeredEventsGlobal.push(event);
    console.log('Acara telah ditambah:', event);
  } else {
    console.log('Acara sudah wujud:', event.id);
  }
  console.log('Senarai acara semasa:', store.registeredEventsGlobal);
}

export function removeRegisteredEvent(eventId) {
  store.registeredEventsGlobal = store.registeredEventsGlobal.filter(
    e => String(e.id) !== String(eventId)
  );
}

export default store;
