import { useState } from 'react';
import response from '../helpers/dataFiltering';

import Timeline, { DateHeader, TimelineHeaders } from 'react-calendar-timeline';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import airbnb from '../assets/images/airbnb.png';
import booking from '../assets/images/booking.png';
import close from '../assets/images/cross.png';
import name from '../assets/images/name.png';
import phone from '../assets/images/phone.png';
import people from '../assets/images/people.png';
import night from '../assets/images/night.png';

import 'react-calendar-timeline/lib/Timeline.css';

const CalendarTimeline = () => {
  const [show, setShow] = useState(false);
  const [showBooking, setShowBooking] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState({
    visibleTimeStart: moment().startOf('month').valueOf(),
    visibleTimeEnd: moment().startOf('month').add(30, 'day').valueOf(),
  });

  const { items, groups } = response;

  const itemRenderer = ({
    item,
    itemContext,
    getItemProps,
    getResizeProps,
  }) => {
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor: 'none',
            borderColor: 'none',
            background: 'none',
            borderStyle: 'solid',
            borderWidth: 0,
            borderRadius: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            textAlign: 'center',
          },
        })}
      >
        {item.customMarker ? (
          <div>
            <p
              style={{
                color: 'rgba(130,130,130,255)',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              {item.price} €
            </p>
          </div>
        ) : (
          <button
            style={{
              border: '2px solid white',
              color: 'white',
              padding: '8px',
              borderRadius: '20px',
              width: '100%',
              minWidth: '200px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: `${item.color}`,
              outline: 'none',
            }}
          >
            <img
              src={item.channel === 'Airbnb' ? airbnb : booking}
              alt='sda'
              width={30}
              height={30}
            />
            <p style={{ margin: '0', padding: '0', color: 'white' }}>
              {item.title}
            </p>
            <p style={{ margin: '0', padding: '0', color: 'white' }}>
              {item.price}
            </p>
          </button>
        )}
      </div>
    );
  };

  const groupRenderer = ({ group }) => {
    return (
      <div className='custom-group'>
        <p
          className='tip'
          style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}
        >
          {group.tip}
        </p>
      </div>
    );
  };

  const onItemClick = (itemId, e, time) => {
    const id = itemId;
    let show = items?.filter((array) => {
      return array.id === id;
    });
    if (!show[0].customMarker) handleShow();

    setShowBooking(show);
  };

  const onPrevClick = () => {
    const { visibleTimeEnd, visibleTimeStart } = state;
    const zoom = visibleTimeEnd - visibleTimeStart;
    setState({
      visibleTimeStart: visibleTimeStart - zoom,
      visibleTimeEnd: visibleTimeEnd - zoom,
    });
  };

  const onNextClick = () => {
    const zoom = state.visibleTimeEnd - state.visibleTimeStart;
    console.log(state, zoom);

    setState({
      visibleTimeStart: state.visibleTimeStart + zoom,
      visibleTimeEnd: state.visibleTimeEnd + zoom,
    });
  };

  const onTimeChange = (
    visibleTimeStart,
    visibleTimeEnd,
    updateScrollCanvas
  ) => {
    setState({ visibleTimeStart, visibleTimeEnd });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Booking Details</Modal.Title>
          <Button variant='light' onClick={handleClose}>
            <img src={close} alt='close' width={30} height={30} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset disabled>
              <div class='form-group'>
                <div
                  style={{
                    display: 'flex',
                    background: '#f3f6f9',
                    alignItems: 'center',
                    padding: '8px',
                    marginBottom: '5px',
                  }}
                >
                  <img src={name} alt='name' width={20} height={20} />
                  <p
                    style={{ marginLeft: '4px', marginBottom: '0' }}
                  >{`${showBooking[0]?.title}`}</p>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      background: '#f3f6f9',
                      alignItems: 'center',
                      padding: '8px',
                      width: '70%',
                      justifyContent: 'space-between',
                      marginTop: '5px',
                    }}
                  >
                    <div>
                      <p>Check-in</p>
                      <p style={{ marginLeft: '4px', marginBottom: '0' }}>
                        {showBooking[0]?.start_time?._i}
                      </p>
                    </div>
                    <div
                      style={{
                        height: '75px',
                        width: '30px',
                        marginLeft: '10px',
                        marginRight: '10px',
                        backgroundColor: '#a4a2a2',
                      }}
                    ></div>
                    <div>
                      <p>Check-out</p>
                      <p style={{ marginLeft: '4px', marginBottom: '0' }}>
                        {showBooking[0]?.end_time?._i}
                      </p>
                    </div>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div
                      style={{
                        background: '#f3f6f9',
                        height: '80px',
                        width: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src={night} alt='name' width={24} height={24} />
                      <p
                        style={{
                          marginTop: '5px',
                          marginLeft: '4px',
                          marginBottom: '0',
                        }}
                      >
                        {showBooking[0]?.nightsStay} Nights
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '5px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      background: '#f3f6f9',
                      alignItems: 'center',
                      padding: '8px',
                    }}
                  >
                    <img src={phone} alt='name' width={24} height={24} />
                    <p
                      style={{ marginLeft: '4px', marginBottom: '0' }}
                    >{`${showBooking[0]?.contact}`}</p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      background: '#f3f6f9',
                      alignItems: 'center',
                      padding: '8px',
                    }}
                  >
                    <img src={people} alt='people' width={24} height={24} />
                    <p
                      style={{
                        marginLeft: '4px',
                        marginBottom: '0',
                        background: '#f3f6f9',
                      }}
                    >{`${showBooking[0]?.numberOfGuests}`}</p>
                  </div>
                </div>
                <div className='d-flex flex-column  m-2 align-items-end'>
                  <button
                    style={{
                      backgroundColor: '#bd5f5f',
                      width: '150px',
                      height: '50px',
                      color: 'black',
                      marginBottom: '10px',
                      border: 'none',
                      borderRadius: '5px',
                    }}
                    onClick={handleClose}
                  >
                    <img
                      src={
                        showBooking[0]?.channel === 'Airbnb' ? airbnb : booking
                      }
                      alt='sda'
                      width={30}
                      height={30}
                    />
                    Total {showBooking[0]?.price} €
                  </button>
                  <button
                    style={{
                      backgroundColor: '#3bae88',
                      width: '150px',
                      height: '50px',
                      color: 'black',
                      border: 'none',
                      borderRadius: '5px',
                    }}
                    onClick={handleClose}
                  >
                    Verne
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </Modal.Body>
      </Modal>
      <Timeline
        groups={groups}
        items={items}
        sidebarWidth={150}
        visibleTimeStart={
          state.visibleTimeStart
            ? moment(state.visibleTimeStart)
            : moment().add(-12, 'hour')
        }
        visibleTimeEnd={
          state.visibleTimeEnd
            ? moment(state.visibleTimeEnd)
            : moment().add(12, 'hour')
        }
        itemRenderer={itemRenderer}
        groupRenderer={groupRenderer}
        lineHeight={80}
        onTimeChange={onTimeChange}
        showCursorLine={false}
        onItemClick={onItemClick}
        canMove={false}
        stackItems
      >
        <TimelineHeaders className='sticky' style={{ background: 'white' }}>
          <div>
            <DateHeader
              unit='primaryHeader'
              labelFormat='MMMM YYYY'
              style={{
                background: 'rgba(79,79,79,255)',
                display: 'flex',
                marginBottom: '15px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
              height={40}
            />
            <DateHeader
              unit='day'
              labelFormat='ddd'
              style={{ color: '#318367', fontWeight: 'bold' }}
              height={60}
            />
            <DateHeader
              unit='day'
              labelFormat='D'
              style={{ color: '#318367', fontWeight: 'bold' }}
              height={60}
            />
            <div>
              <button
                onClick={onPrevClick}
                style={{
                  position: 'absolute',
                  top: '5px',
                  border: 'none',
                  background: 'rgba(79,79,79,255)',
                  color: 'white',
                  outline: 'none',
                }}
              >
                {'<'}
              </button>
              <button
                onClick={onNextClick}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  border: 'none',
                  background: 'rgba(79,79,79,255)',
                  color: 'white',
                  outline: 'none',
                }}
              >
                {' >'}
              </button>
            </div>
          </div>
        </TimelineHeaders>
      </Timeline>
    </>
  );
};

export default CalendarTimeline;
