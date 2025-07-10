const store = {
  registeredEventsGlobal: [
    {
      id: '1',
      date: '2025年3月15日',
      title: '科学中心',
      details: '星期六 上午10点 - 下午1点 @ 科学中心\n集合地点：白桥民众俱乐部',
      paid: false,
    },

  ],
};

export function addRegisteredEvent(event) {
  console.log('尝试添加活动:', event);
  if (!store.registeredEventsGlobal.some(e => String(e.id) === String(event.id))) {
    store.registeredEventsGlobal.push(event);
    console.log('已添加活动:', event);
  } else {
    console.log('活动已存在:', event.id);
  }
  console.log('当前活动列表:', store.registeredEventsGlobal);
}

export function removeRegisteredEvent(eventId) {
  store.registeredEventsGlobal = store.registeredEventsGlobal.filter(
    e => String(e.id) !== String(eventId)
  );
}

export default store;

