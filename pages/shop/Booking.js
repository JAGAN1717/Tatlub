import React, { useEffect, useState } from 'react'
import CommonLayout from "../../components/shop/common-layout";
import { Row, Container, Col, Button } from "reactstrap";
import moment from 'moment'
// import {
//   Calendar,
//   Views,
//   DateLocalizer,
//   momentLocalizer,
// } from 'react-big-calendar'
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { Calendar } from '@fullcalendar/core'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/'
// import interactionPlugin from "@fullcalendar/interaction";
import Link from 'next/link';
import { getItemsDetails } from "../../components/core/shop_requests";
// import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
// import ReactTimeslotCalendar from 'react-timeslot-calendar';
import { Calendar } from 'primereact/calendar';
import { getTimeSlot, potAppointmet } from '../../components/core/realestate_request';
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { useTranslation } from "react-i18next";

function renderEventContent(eventInfo) {

  // setSlotTime(eventInfo)

  return (
    <>
      slhjkshddj
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

// const localizer = momentLocalizer(moment)

export default function Booking() {
  const { t } = useTranslation();

  const [slotTime, setSlotTime] = useState([])
  const [Time, setTime] = useState()
  const [date, setDate] = useState(new Date());
  const [vist, setVisit] = useState('');
  const [num, setNum] = useState();
  const [timeSlots, setTimeSlots] = useState([]);
  const [checked, setChecked] = useState(false);
  const [bookedslots, setbookedSlots] = useState([])

  function padNumber(num) {
    return num.toString().padStart(2, '0');
  }

  const handleChecked = (e) => {
    const isChecked = e.target.checked;
    if(isChecked){
      Appointment.setFieldValue('mobile', num);
      setChecked(true)
    }else{
      Appointment.setFieldValue('mobile', '');
      setChecked(false)  }
  }

  console.log('datedatedate', date)
  // const TimeSlots = () => {
  //   const startHour = 9;
  //   const endHour = 23;
  //   const interval = 30;
  //   let time = []
  //   for (let hour = startHour; hour <= endHour; hour++) {
  //     for (let minute = 0; minute < 60; minute += interval) {
  //         const isAM = hour < 12; 
  //         const formattedHour = hour % 12 || 12; 
  //         const time1 = padNumber(formattedHour) + ':' + padNumber(minute) + ' ' + (isAM ? 'AM' : 'PM');
  //         time.push([{'slots':time1}])
  //         console.log("jhfjhg",time1)
  //     }
  // }
  // setSlotTime(time)
  // } 

  function generateTimeSlots() {
    const startTime = new Date(0, 0, 0, 9, 0); // 9:00 AM
    const endTime = new Date(0, 0, 0, 18, 0); // 6:00 PM
    const interval = 30; // 30 minutes
    const timeSlots = [];
    let currentTime = new Date(startTime);


    while (currentTime < endTime) {
      const slotStartTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      currentTime.setMinutes(currentTime.getMinutes() + interval);
      const slotEndTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      timeSlots.push({ time: `${slotStartTime} - ${slotEndTime}` });
    }

    // return timeSlots;
    setTimeSlots(timeSlots)
  }

  useEffect(()=> {
    generateTimeSlots()
  },[])

  // const timeSlots = generateTimeSlots(startTime, endTime, interval);
  // console.log("timeSlots",timeSlots.find(e => e.slot == '01:00pm-01:30pm'));


  const initialValues = {
    name: "",
    patient_mobile: "",
    mobile: "",
    // email: "",
    user_id: "",
  };

  const PatientSchema = yup.object().shape({
    name: yup.string().required("Please Enter Your Name"),
    mobile: yup.string().min(7, "Phone number must be at least 7 Digits").required("Please Enter Your Mobile Number"),
    patient_mobile: yup.string().min(7, "Phone number must be at least 7 Digits").required("Please Enter Your Mobile Number"),
    // email: yup
    //   .string()
    //   .email("Please Enter Valid Email Id")
    //   .required("Please Enter Your Email Id"),
  });




  const events = [{
    "title": "Appointment 1",
    "start": "2023-09-01 10:00",
    "end": "2023-09-02 11:00",
  },
  {
    "title": "Appointment 2",
    "start": "2023-09-08 13:00",
    "end": "2023-09-08 14:00",
  },
  {
    "title": "Appointment 2",
    "start": "2023-09-08 14:00",
    "end": "2023-09-08 15:00",
  }

  ]
  const router = useRouter()
  const { clinicId } = router.query

  const [Clinic, setClinic] = useState([])
  const [Loading, setLoading] = useState(false)


  const Appointment = useFormik({
    initialValues,
    validationSchema: PatientSchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        const user_id =
          JSON.parse(sessionStorage.getItem("data"))?.id ??
          JSON.parse(localStorage.getItem("data"))?.id;

        let body = {
          "item_id": clinicId,
          "date": moment(date).format('YYYY-MM-DD'),
          "time": Time,
          "patient_name": values.name,
          "patient_mobile": values.patient_mobile,
          "mobile": values.mobile,
          "nature_of_visit": vist,
          'user_id': user_id,
        };

        // document.getElementById("openloaderModal")?.click();
        setLoading(true)
        const response = await potAppointmet(body);
        setLoading(false)
        // document.getElementById("closeloaderModal")?.click();
        if (response.status == 200) {
          toast.info("SUCCESSFULL", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            icon: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          fetchDoctersInfo()
        } else {
          toast.error("NOT FOUND", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        resetForm();
        setTime();
      } catch (error) {
        alert()
        console.error(error);
        setStatus("dont give proper review details is incorrect");
        setSubmitting(false);
      }
    },
  });
  // const {data:Clinic,error} = useQuery(
  //   ['Clinic',clinicId],
  //   () => getItemsDetails(clinicId)
  // )

  const fetchDoctersInfo = () => {
    setLoading(true)
    getItemsDetails(clinicId).then(res => {
      setClinic(res)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
  }



  // const {isLoading,data:Slots,refetch} = useQuery(
  //   ['TimeSlots',clinicId],
  //   () => getTimeSlot(clinicId)
  // )

  const fetchTimeSlots = () => {
    const id = Clinic?.data?.user_id
    getTimeSlot(id).then(res => {
      setSlotTime(res.data)
    }).catch(err => console.error("err", err.message))
  }

  useEffect(() => {
    fetchTimeSlots()
  }, [Clinic])


  useEffect(() => {
    setbookedSlots(slotTime?.filter((e) => moment(e.date).format('YYY-MM-DD') == moment(date).format('YYY-MM-DD')))
    //  let val = slotTime?.filter((e)=> moment(e.date).format('YYY-MM-DD') ==  moment(date).format('YYY-MM-DD'))
    //  let sortedArray = [];
    //  timeSlots.map((first) => {
    //   sortedArray[val.findIndex(def => def === first)] = first;
    //  })
    //  sortedArray = sortedArray.filter(v => v);
    //  console.log('sortedArray',sortedArray);
  }, [date, slotTime])


  useEffect(() => {
    fetchDoctersInfo()
  }, [clinicId])



  function selctDate(info) {
    alert('selected ' + info.startStr + ' to ' + info.endStr);
  }

  function dateehf(info) {
    alert('clicked ' + info.dateStr);
  }

  const handleDateClick = (arg) => { // bind with an arrow function
    // alert(arg.dateStr)
    setDate(arg.dateStr)
  }

  const lessDate = new Date()





  return (
    <>
    {/* <CommonLayout title="Booking" parent="Doctors"> */}
      <section className='booking2 mb-3'>
        <Container>
          <div className="mb-3">
            <h3 className="fw-bolder text-capitalize">{Clinic?.data?.item_title}</h3>
            <p>(Book Appointment)</p>
          </div>

          <div className="review_card p-3">
            <div className="text-center">
              <h5 className="fw-bolder text-capitalize">
                {Clinic?.data?.item_address ?? Clinic?.data?.item_location_str} {t('Available On: Monday To Saturday ')}
                | 09:00 AM To 06:00 PM
              </h5>
            </div>

            <hr className="my-4"></hr>
            {
              !Time ?
                <div className='calender-view'>
                  <div className="d-flex justify-content-center mb-4">
                    <span className='text-capitalize'>{t('Select A Date From The Calendar To Book An Appointment With')} {Clinic?.data?.item_title}</span>
                  </div>

                  <div className='row'>
                    <div className="col-lg-6 mb-3">
                      {/* <Calendar
                 views={["month"]}
                 selectable
                //  localizer={localizer}
                 defaultView="month"
                 events={''}
                 style={{height: "500px"}}
            /> */}
                      {/* 
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                // onSelectEvent={()=> alert()}
                // selectable={true}
                // dateClick={alert('hasgadf')}
                // slotDuration={'00:30:00'}
                // slotMinTime={'09:00:00'}
                // slotMaxTime ={"22:00:00"}
                // select={selctDate}
                dateClick={handleDateClick}
                firstDay={1}
                selectable={true}
                // events={events}
                // eventContent={renderEventContent}
              /> */}

                      {/* <ReactTimeslotCalendar
                  initialDate={moment().format()}
                  
                /> */}

                      <Calendar value={date} minDate={lessDate} className='w-100 h-100' onChange={(e) => setDate(e.value)} showWeek inline />

                    </div>

                    <div className='col-lg-6 '>
                      <div className='slot_card h-100 overflow-auto'>
                        <div className=''>
                          <div className='text-center mb-5'>
                            <h4>{t('Select Time Slot')}</h4>
                          </div>
                          <div className='row'>
                            {
                              timeSlots?.map((data, index) => (
                                <div className='col-md-4 col-sm-6 mb-3' key={index} >
                                  {/* <Link href={{pathname:'/shop/Booking2',query:{'date':date,"time":data?.slot}}}> */}
                                  <button type="button" disabled={bookedslots.find(e => e.time == data?.time)} onClick={() => setTime(data?.time)} className={`${bookedslots.find(e => e.time == data?.time) ? 'slot_btn' : 'slot_btn1'} btn  px-4`}>{data?.time}</button>
                                  {/* </Link> */}
                                </div>
                              ))
                            }
                            {/* slot_btn1 */}
                            {/* <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn1 px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn px-4'>9:00 am-9:30 am</button>
                     </div>
                     <div className='col-md-4 col-sm-6 mb-3'>
                     <button type="button" className='btn slot_btn px-4'>9:00 am-9:30 am</button>
                     </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='d-md-flex justify-content-start bokking-status mt-lg-5 mt-3 mb-lg-4 mb-3'>
                    <div className='d-flex align-items-center  mb-2'>
                      <div className='not-available me-3'></div>
                      <h4 className='fs-5 mb-0'>{t('Not Available')}</h4>
                    </div>

                    <div className='d-flex align-items-center mx-md-5 mb-2'>
                      <div className='available me-3'></div>
                      <h4 className='fs-5 mb-0'>{t('Available')}</h4>
                    </div>

                    {/* <div className='d-flex align-items-center mb-2'>
                <div className='booked me-3'></div>
                <h4 className='fs-5 mb-0'>Fully Booked</h4>
              </div> */}
                  </div>

                </div>
                :
                <div className='booking-form'>
                  {/* <div className="d-flex justify-content-center ">
              <h4 className="mx-2">Booking Summary</h4>
              <h4 className="mx-2">Booking Confirmation</h4>
            </div> */}

                  <div className=" text-center booking-form p-sm-4">
                    <div className="mb-5">
                      <h4>{t('Enter Patient Details')}</h4>
                      <span>
                        {t('You Will Receive The Appointment Details On The Number Provided By You')}.{" "}
                      </span>
                    </div>
                    <form onSubmit={Appointment.handleSubmit} className="mx-lg-5  p-md-3">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-5 text-start">
                            <input
                              type="text"
                              className="form-control border-0"
                              placeholder={t("Patient's Name")}
                              {...Appointment.getFieldProps("name")}
                            />
                            {Appointment.touched.name &&
                              Appointment.errors.name && (
                                <div className="fv-plugins-message-container">
                                  <div className="fv-help-block">
                                    <span role="alert" className="text-danger">
                                      {Appointment.errors.name}
                                    </span>
                                  </div>
                                </div>
                              )}
                          </div>
                          <div className="mb-5 text-start">
                            <input
                              type="text"
                              className="form-control border-0"
                              placeholder={t("Your Mobile Number")}
                              {...Appointment.getFieldProps("mobile")}
                              maxLength={15}
                              onChange={(e) => Appointment.setFieldValue("mobile", e.target?.value.replace(/[^0-9]/g, ""))}
                            />
                            {Appointment.touched.mobile &&
                              Appointment.errors.mobile && (
                                <div className="fv-plugins-message-container">
                                  <div className="fv-help-block">
                                    <span role="alert" className="text-danger">
                                      {Appointment.errors.mobile}
                                    </span>
                                  </div>
                                </div>
                              )}

                            <div className="form-check d-flex align-items-center mt-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                defaultChecked={checked}
                                onChange={(e) =>handleChecked(e)}
                              />
                              <label className="form-check-label ms-3 " for="flexCheckDefault">
                                {t('I am the Patient')}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-5 text-start">
                            <input
                              type="text"
                              className="form-control border-0"
                              placeholder={t("Patient's Mobile")}
                              {...Appointment.getFieldProps("patient_mobile")}
                              maxLength={15}
                              onChange={(e) => { Appointment.setFieldValue("patient_mobile", e.target?.value.replace(/[^0-9]/g, "")), setNum(e.target?.value.replace(/[^0-9]/g, "")) }}
                            />
                            {Appointment.touched.patient_mobile &&
                              Appointment.errors.patient_mobile && (
                                <div className="fv-plugins-message-container">
                                  <div className="fv-help-block">
                                    <span role="alert" className="text-danger">
                                      {Appointment.errors.patient_mobile}
                                    </span>
                                  </div>
                                </div>
                              )}


                          </div>
                          <div className="mb-5 text-start">
                            <h4>{t('Nature of visit')}</h4>
                            <div className="form-check form-check-inline" onClick={() => setVisit('first_time_visit')}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                              />
                              <label className="form-check-label ms-3" for="inlineRadio1">
                                {t('First Time visit')}
                              </label>
                            </div>
                            <div className="form-check form-check-inline" onClick={() => setVisit('follow_up_visit')}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                              />
                              <label className="form-check-labe ms-3" for="inlineRadio2">
                                {t('Fallow Up Visit')}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-start mb-5">
                        {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onClick={()=> Appointment.setFieldValue('mobile',num)}
                  />
                  <label className="form-check-label ms-3" for="flexCheckDefault">
                    {t('I am the Patient')}
                  </label>
                </div> */}
                      </div>
                      <hr></hr>

                      <div className="">
                        <h4>{t('Appointment Details')}</h4>
                        <div className="d-md-flex justify-content-centermt-lg-5 mt-3 mb-lg-5 mb-3">
                          <div className="px-md-3 mb-2"><span>{t('Date of Appointment')} : {moment(date).format('MMMM Do YYYY') ?? 'MM-DD-YYY'}</span></div>
                          <div className="px-md-3 mb-2 confirm"><span>{t('Time of Appointment')}: {Time ?? "00:00-00:00"}</span></div>
                        </div>

                        <div className='d-flex justify-content-center'>
                          <button type="submit" disabled={Loading ? true : false} className="btn btn_filter1 d-flex align-items-center">{Loading ? <span class="btn-ring"></span> : t('Confirm')}</button>
                        </div>
                      </div>

                    </form>
                  </div>
                </div>
            }
          </div>
        </Container>
      </section>
    {/* </CommonLayout> */}
    </>
  )
}
