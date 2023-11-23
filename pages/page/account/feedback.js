import React, { useContext, useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Col, Media, Form, Label, Input } from "reactstrap";
import { postFeedback } from "../../../components/core/vendor_request";
import { ToastContainer, toast } from "react-toastify";
import AuthContex from "../../../components/auth/AuthContex";
import { useTranslation } from "react-i18next";



const Feedback = () => {
    const [feedback,setFeedback] = useState('')
    const {userData} = useContext(AuthContex)
    const [feedbackType,setFeedbackType] = useState()
     const { t } = useTranslation();


    const handleSubmit = (e) => {
        e.preventDefault()
        let body = {
            'user_id':userData?.id,
            'feedback_type': feedbackType,
            'feedback':feedback
        }
        postFeedback(body).then(res => {
            if(res.status == 200){
                toast.info("SUCCESS", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    icon:false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  setFeedback('')
            }else{
                toast.info(res?.message?.feedback_type[0]+'!' ?? 'somthing went wrong!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    icon:false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
            }
        }).catch(err => {
            console.error('er',err.message)
        })
    }

    return(<>
     <CommonLayout parent="home" title="Feedbcak">
        <section className="p-0 mb-4 mt-3">
            <Container>
           <div className="">
              <h3 className="text-color fs-3">{t("Feedback")}</h3>
            </div>
            <div className="row justify-content-start mt-4">
                <div className="col-xl-3 col-md-4 px-lg-4 mb-3">
                    <div className="card d-flex justify-content-start empty-wishlist shadow-sm p-3">
                        <div className="">
                        <div className="mb-xl-4 mb-2 d-flex align-items-center cursor-pointer" onClick={()=>setFeedbackType('Issue')}>
                         <div className="log_img1 cursor-pointer text-center " >
                            <img
                             src={feedbackType === "Issue" ? '/assets/images/tatlub-img/feedback/2.svg' : "/assets/images/tatlub-img/feedback/3.svg"} 
                            //  onMouseOver={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/2.svg'}
                            //  onMouseOut={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/3.svg'}
                             className="w-100"
                            />
                        </div>
                        <div className="ms-2" >
                            <h4 className={`mb-0 fs-5 foot-cat complete_1 ${feedbackType === "Issue" && 'text-color'}`}>{t("Report an Issue")}</h4>
                        </div>
                        </div>
                        <div className="mb-xl-4 mb-2 d-flex align-items-center cursor-pointer" onClick={()=>setFeedbackType('Issue with a vendor')}>
                         <div className="log_img1 cursor-pointer text-center " >
                            <img
                             src={feedbackType == "Issue with a vendor" ? '/assets/images/tatlub-img/feedback/5.svg' : "/assets/images/tatlub-img/feedback/4.svg"}
                            //  onMouseOver={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/5.svg'}
                            //  onMouseOut={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/4.svg'}
                             className="w-100"
                            />
                        </div>
                        <div className="ms-2">
                            <h4 className={`mb-0 fs-5 foot-cat complete_1 ${feedbackType == "Issue with a vendor" && 'text-color'}`}>{t("Issue with a vendor")}</h4>
                        </div>
                        </div>
                        <div className="mb-xl-4 mb-2 d-flex align-items-center cursor-pointer"  onClick={()=>setFeedbackType('Grievance Redressal')}>
                         <div className="log_img1 cursor-pointer text-center " >
                            <img
                             src={feedbackType == "Grievance Redressal" ? '/assets/images/tatlub-img/feedback/7.svg' : "/assets/images/tatlub-img/feedback/6.svg"}
                            //  onMouseOver={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/7.svg'}
                            //  onMouseOut={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/6.svg'}
                             className="w-100"
                            />

                        </div>
                        <div className="ms-2">
                            <h4 className={`mb-0 fs-5 foot-cat complete_1 ${feedbackType == "Grievance Redressal" && 'text-color'}`}>{t("Grievance Redressal")}</h4>
                        </div>
                        </div>
                        <div className="mb-xl-4 mb-2 d-flex align-items-center cursor-pointer"  onClick={()=>setFeedbackType('Real Estate')}>
                         <div className="log_img1 cursor-pointer text-center " >
                            <img
                             src={feedbackType == "Real Estate" ? '/assets/images/tatlub-img/feedback/8.svg' :"/assets/images/tatlub-img/feedback/9.svg"}
                            //  onMouseOver={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/8.svg'}
                            //  onMouseOut={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/9.svg'}
                             className="w-100"
                            />
                        </div>
                        <div className="ms-2">
                            <h4 className={`mb-0 fs-5 foot-cat complete_1 ${feedbackType == "Real Estate" && 'text-color'}`}>{t("Real Estate")}</h4>
                        </div>
                        </div>
                        <div className="mb-xl-4 mb-2 d-flex align-items-center cursor-pointer" onClick={()=>setFeedbackType('Suggest a feature')}>
                         <div className="log_img1 cursor-pointer text-center " >
                            <img
                             src={feedbackType == "Suggest a feature" ? '/assets/images/tatlub-img/feedback/10.svg' : "/assets/images/tatlub-img/feedback/11.svg"}
                            //  onMouseOver={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/10.svg'}
                            //  onMouseOut={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/11.svg'}
                             className="w-100"
                            />
                        </div>
                        <div className="ms-2">
                            <h4 className={`mb-0 fs-5 foot-cat complete_1 ${feedbackType == "Suggest a feature" && 'text-color'}`}>{t("Suggest a feature")}</h4>
                        </div>
                        </div>
                        <div className="mb-xl-4 mb-2 d-flex align-items-center cursor-pointer"  onClick={()=>setFeedbackType("Don't want call from us")}>
                         <div className="log_img1 cursor-pointer text-center " >
                            <img
                             src={feedbackType == "Don't want call from us" ? '/assets/images/tatlub-img/feedback/13.svg' :"/assets/images/tatlub-img/feedback/12.svg"}
                            //  onMouseOver={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/13.svg'}
                            //  onMouseOut={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/12.svg'}
                             className="w-100"
                            />
                        </div>
                        <div className="ms-2">
                            <h4 className={`mb-0 fs-5 foot-cat complete_1 ${feedbackType == "Don't want call from us" && 'text-color'}`}>{t("Don't want call from us?")}</h4>
                        </div>
                        </div>
                        <div className="mb-xl-4 mb-2 d-flex align-items-center cursor-pointer" onClick={()=>setFeedbackType('My Transaction')}>
                         <div className="log_img1 cursor-pointer text-center " >
                            <img
                             src={feedbackType == "My Transaction" ? '/assets/images/tatlub-img/feedback/1.svg' :"/assets/images/tatlub-img/feedback/14.svg"}
                            //  onMouseOver={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/1.svg'}
                            //  onMouseOut={(e)=>e.currentTarget.src='/assets/images/tatlub-img/feedback/14.svg'}
                             className="w-100"
                            />
                        </div>
                        <div className="ms-2">
                            <h4 className={`mb-0 fs-5 foot-cat complete_1 ${feedbackType == "My Transaction" && 'text-color'}`}>{t("My Transaction")}</h4>
                        </div>
                        </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-7 mb-3">
                    <div className="card empty-wishlist shadow-sm form_condition_  p-4" >
                        <div className="mb-3">
                            <h3 className="fw-bold">{t("Please share your valuable feedback")}</h3>
                            <h4 className="text-secondary">{t("Help us get better, let us know your feedback")}</h4>
                        </div>
                        <form onSubmit={handleSubmit} >
                            <div className="d-flex justify-content-between flex-column" style={{height:'350px'}}>
                                <div>
                                <textarea value={feedback} rows={6} placeholder={t("Description...")} className="form-control" onChange={(e)=>setFeedback(e.target.value)} />
                                </div>
                            <div className="">
                                <button type="submit" disabled={feedback ? false : true} className="btn rounded btn-theme px-5 p-2">{t("Submit")}</button>
                            </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            </Container>
        </section>
     </CommonLayout>
    </>)
}


export default Feedback;
