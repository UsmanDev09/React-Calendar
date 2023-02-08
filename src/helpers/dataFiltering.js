import moment from 'moment';

const data = [
  {
    propertyId: '123456789',
    propertyName: 'Demo 1',
    bookings: [
      {
        bookingId: '1234',
        arrivalDate: '2023-02-24',
        departureDate: '2023-02-26',
        bookingChannel: 'Airbnb',
        bookingColor: '#bd5f5f',
        bookingTotalPrice: 250.98,
        numberOfGuests: 4,
        guestName: 'John Doeerty',
        guestEmail: 'john@gmail.com',
        guestPhone: '+34685452412',
      },
      {
        bookingId: '12345',
        arrivalDate: '2023-02-21',
        departureDate: '2023-02-27',
        bookingChannel: 'Airbnb',
        bookingColor: '#bd5f5f',
        bookingTotalPrice: 250.98,
        numberOfGuests: 4,
        guestName: 'John Doe',
        guestEmail: 'john@gmail.com',
        guestPhone: '+34685452412',
      },
      {
        bookingId: '1235',
        arrivalDate: '2023-03-05',
        departureDate: '2023-03-08',
        bookingChannel: 'Booking.com',
        bookingColor: '#04387d',
        bookingTotalPrice: 130.65,
        numberOfGuests: 6,
        guestName: 'Pablo Lopez',
        guestEmail: 'asier@guten.tech',
        guestPhone: '+34685452412',
      },
    ],
    availableDates: {
      dates: [
        { id: '1', date: '2023-02-06' },
        { id: '2', date: '2023-02-07' },
        { id: '3', date: '2023-02-08' },
        { id: '4', date: '2023-02-09' },
      ],
      baseRate: 100.0,
    },
    otherPrices: [
      {
        fromDate: '2023-04-12',
        toDate: '2023-04-15',
        rate: 350.0,
      },
      {
        fromDate: '2023-04-16',
        toDate: '2023-04-18',
        rate: 400.0,
      },
    ],
  },
  {
    propertyId: '6546546544',
    propertyName: 'Demo 2',
    bookings: [
      {
        bookingId: '5632',
        arrivalDate: '2023-02-21',
        departureDate: '2023-02-28',
        bookingChannel: 'Airbnb',
        bookingColor: '#bd5f5f',
        bookingTotalPrice: 145.5,
        numberOfGuests: 4,
        guestName: 'John Doe',
        guestEmail: 'john@gmail.com',
        guestPhone: '+34685452412',
      },
      {
        bookingId: '5784',
        arrivalDate: '2023-03-03',
        departureDate: '2023-03-10',
        bookingChannel: 'Booking.com',
        bookingColor: '#04387d',
        bookingTotalPrice: 456.65,
        numberOfGuests: 6,
        guestName: 'Pablo Lopez',
        guestEmail: 'asier@guten.tech',
        guestPhone: '+34685452412',
      },
    ],
    availableDates: {
      dates: [
        { id: '5', date: '2023-02-05' },
        { id: '6', date: '2023-02-07' },
        { id: '7', date: '2023-02-08' },
        { id: '8', date: '2023-02-09' },
      ],
      baseRate: 100.0,
    },
    otherPrices: [
      {
        fromDate: '2023-02-26',
        toDate: '2023-03-05',
        rate: 800.0,
      },
      {
        fromDate: '2023-03-16',
        toDate: '2023-03-18',
        rate: 1200.0,
      },
    ],
  },
];

let items = [];
data.map((item) => {
  let bookingArray = [];
  bookingArray = item.bookings?.map((booking) => {
    let nightsStay = moment(booking.departureDate).diff(
      moment(booking.arrivalDate),
      'days'
    );
    console.log(nightsStay);

    return {
      id: +booking.bookingId,
      group: +item.propertyId,
      title: booking.guestName,
      price: booking.bookingTotalPrice,
      start_time: moment(booking.arrivalDate),
      end_time: moment(booking.departureDate),
      color: booking.bookingColor,
      channel: booking.bookingChannel,
      availableDates: item.availableDates,
      numberOfGuests: booking.numberOfGuests,
      contact: booking.guestPhone,
      nightsStay,

      itemProps: {
        className: 'weekend',
        style: {
          color: 'black',
          borderRadius: '20px',
        },
        onDoubleClick: () => {
          console.log('item 1 clicked');
        },
      },
    };
  });
  let availableDatesArray = [];
  availableDatesArray = item.availableDates?.dates.map((date) => {
    let today = moment(date.date);
    let tommorow = moment(date.date).add(1, 'days');
    return {
      customMarker: true,
      id: date.id,
      group: +item.propertyId,
      price: +item.availableDates.baseRate,
      start_time: today,
      end_time: tommorow,
    };
  });
  items = items.concat(bookingArray);
  items = items.concat(availableDatesArray);
});

const groups = data.map((s) => {
  return { id: s.propertyId, tip: s.propertyName };
});

const response = { items, groups };
export default response;
