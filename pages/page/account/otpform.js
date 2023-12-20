import React, { useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Form, Label, Input, Col, InputGroup, InputGroupText, Button } from 'reactstrap';
import OtpInput from 'react-otp-input';
import { getLogin, postOTPCheck } from "../../../components/core/account_request"
import { ToastContainer, toast } from 'react-toastify';
import toast1 from 'react-hot-toast';


const Otpform = (props) => {
    const [otp, setOtp] = useState('');
    const [cursorPosition, setCursorPosition] = useState();

    const otpVrification = async () => {
        let body = {
                "phone": props.number,
                "otp": otp
        }
        const response = await postOTPCheck(body)
        if(response.status == 200) {
            document.getElementById("khfiuheriuehiergkjdnfsd")?.click();
            // toast.info('Loged-in Successfully!', {
            //     position: "bottom-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     icon:false,
            //     progress: undefined,
            //     theme: "dark",
            //     });
            toast1.success('Loged-in Successfully!')

        }
    }

    const fetchLogin = async() =>{
        let body = {
          "phone": props.number
        } 
        const responcedata = await getLogin(body)
        if(responcedata.status == 200) {
        //   toast.info('OTP sent to mobile!', {
        //     position: "bottom-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     icon:false,
        //     progress: undefined,
        //     theme: "dark",
        //     });
        toast1('OTP sent to mobile!!')
          sessionStorage.setItem('otp', responcedata.otp);
        }
      }

    return (
        <>
                <Container>
                    <Row>
                        <Col xl="6">
                            <div className="px-sm-5 px-3 pb-xl-5 pb-3">
                                <img src="/assets/images/icon/logo.png" alt="" className="contact-logo mb-3" />
                                <h3 className="mb-2">Verification</h3>
                                <p className="mb-4"><span className="text-gray">Enter 4 Digit Verification code send to</span> <span className="fw-bolder">{props.number}</span> </p>
                                <div className="">
                                    <Form className="theme-form">

                                        <div className="pb-5">


                                            <div className="otp py-3">
                                                 <OtpInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    numInputs={4}
                                                    renderSeparator={<span className='px-3'></span>}
                                                    renderInput={(props) => {
                                                        delete props.style;
                                                        delete props.className;
                                                        return(
                                                    <input className='w-25 border-0 text-center border-bottom fs-3' {...props} />
                                                    )}}
                                                    />
                                            </div>
                                        </div>

                                        <Button className="btn btn-contact w-100 px-3 py-2" onClick={otpVrification}> Submit </Button>

                                        {/* <Button className="btn btn-contact w-100 px-3 py-2"> <a href="page/account/otp" >Get Verification Code</a> </Button> */}
                                    </Form>

                                    <div className="text-center mt-4">
                                        <div><span className="text-gray">Didn't Receive the OTP?</span> <a className="ms-2 text-color" onClick={fetchLogin}>Resend OTP</a></div></div>
                                </div>
                            </div>
                        </Col>
                        <Col xl="6" className="right-login">
                            <img src="/assets/images/contact-us/1.png" className="img-fluid " />
                        </Col>
                    </Row>
                </Container>
        </>
    )
}

export default Otpform;