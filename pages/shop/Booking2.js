import React from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Row, Container, Col, Button } from "reactstrap";
import { useRouter } from "next/router";
import { getTimeSlot } from '../../components/core/realestate_request';
import { useEffect, useState } from "react";
import Authcontex from '../../components/auth/AuthContex'
import { useContext } from "react";
import { useTranslation } from "react-i18next";


export default function Booking2() {
  const { t } = useTranslation();

  const { userData } = useContext(Authcontex)
  const [slotTime, setSlotTime] = useState([])

  const fetchTimeSlots = () => {
    const id = userData?.id
    getTimeSlot(id).then(res => {
      setSlotTime(res.data)
    }).catch(err => console.error("err", err.message))
  }

  useEffect(() => {
    fetchTimeSlots()
  }, [])


  const router = useRouter()

  return (
    // <CommonLayout title="Booking" parent="Doctors">
      <section className="booking2 mb-3">
        <Container>
          <div className="mb-3">
            {/* <h3 className="fw-bolder">Raji Clinic Vadapalani</h3> */}
            <p>({t("Booking Appointments")})</p>
          </div>

          <div className="review_card p-3">
            {/* <div className="newSlotList text-center booking-form p-sm-4 rounded-3"> */}
            <div className="newSlotList text-center  p-sm-4 rounded-3">
              <div className="row">
                {  slotTime?.length > 0 ?
                  slotTime?.map((data,index)=> (
                  <div className='col-6' key={index}>
                    <div className="review_card text-start p-4 mb-3">
                      <div className="d-flex justify-content-between mb-3">
                        <div className="">
                          <h4 className="fw-bold text-uppercase text-color mb-0 fs-18">{data?.patient_name}</h4>
                        </div>
                        <div className="">
                          <h4 className="fw-bold text-uppercase mb-0 fs-5">{data?.nature_of_visit?.replace(/_/g, " ")}</h4>
                        </div>
                      </div>
                      <div className="">
                      <h5 className="fw-bold mb-2 text-uppercase fs-5">{t("DATE")} : {data?.date}</h5>
                      <h5 className="fw-bold mb-2 text-uppercase fs-5">{t("Time")} : {data?.time}</h5>
                      <h5 className="fw-bold mb-2 text-uppercase fs-5">{t("Mobile")} : {data?.mobile}</h5>
                      </div>
                    </div>
                  </div>
                  )) : 
                  <div className="d-flex flex-column justify-content-center align-items-center ">
                  <img
                    src="/assets/images/tatlub-img/not_Found.png"
                    className="no_image"
                  />
                  <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                </div>
                }
              </div>
            </div>
          </div>
        </Container>
      </section>
    // </CommonLayout>
  );
}
