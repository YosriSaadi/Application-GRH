const category = [
    {
        name: 'Jour chomé non payé',
        value: 'bg-danger'
    },
    {
        name: 'Repos Hebdomadaire',
        value: 'bg-success'
    },
    {
        name: 'Jour chomé payé',
        value: 'bg-warning'
    },
];

const calendarEvents = [
    {
        id: 1,
        title: 'Meeting',
        start: new Date().setDate(new Date().getDate() + 1),
        end: new Date().setDate(new Date().getDate() + 2),
        className: 'bg-warning text-white',
   
    },
    {
        id: 2,
        title: 'Lunch',
        start: new Date(),
        end: new Date(),
        className: 'bg-success text-white',
 
    },
    {
        id: 3,
        title: 'Birthday - party',
        start: new Date().setDate(new Date().getDate() + 8),
        className: 'bg-info text-white',
    
    },
    {
        id: 4,
        title: 'Long Event',
        start: new Date().setDate(new Date().getDate() + 7),
        end: new Date().setDate(new Date().getDate() + 8),
        className: 'bg-primary text-white',
      
    },
    {
        id: 5,
        title: 'Ltest',
        start: "2021-04-14",
        end: "2021-04-14",
        className: 'bg-primary text-white',
  
    }
];

export { category, calendarEvents };
