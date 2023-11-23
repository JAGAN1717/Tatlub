import React, { useState, useEffect,useContext } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import {
  Container,
  Row,
  Form,
  Label,
  Input,
  Col,
  InputGroup,
  InputGroupText,
  Button,
  Link,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Otpform from "./otpform";
import { getLogin, mailLogin, otpLogin, getLanguages, loginWithMobile } from "../../../components/core/account_request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
// import FacebookLogin from "react-facebook-login";
import { GoogleOAuthProvider,use} from "@react-oauth/google";
import { GoogleLogin, googleLogout,useGoogleLogin} from "@react-oauth/google";
import { useRouter } from 'next/router';
import AuthContex from "../../../components/auth/AuthContex";
import { useTranslation } from "react-i18next";
// import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
// import firebase from 'firebase/app'
// import 'firebase/auth';
import jwt_decode from 'jwt-decode'
// import FacebookLogin from "../../../components/auth/facebooklog";


const Login = (args) => {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState({});
  const [mobile, setmobile] = useState("");
  const [mail, setMail] = useState("");
  const [field, setField] = useState("mail");
  const [otp, setOtp] = useState(5042);
  const [lan, setLag] = useState();   
  // const [UserData, setUserData] = useState();
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const {userData,setUserData} = useContext(AuthContex);
  const { t } = useTranslation();


  const initialValues = {
    email: "",
    otp: ""
  };

  // useEffect(() => {
  //   toggle()
  // }, []);


 const toggle = () => setModal(!modal);

  const fetchLogin = async () => {
    let body = {
      email: mail,
      password: mobile,
    };
    const responcedata = await mailLogin(body);

    if (responcedata.status == 200) {
      setLogin(responcedata);
      // toast('OTP sent to mobile!', {
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      //   });
      document.getElementById("khfiuheriuehiergkjdnfsd")?.click();
      toast.info("LOGIN SUCCESSFULL", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        icon:false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // console.log("udata", responcedata.data);
      sessionStorage.setItem("data", JSON.stringify(responcedata.data));
      localStorage.setItem("data", JSON.stringify(responcedata.data));
      document.getElementById("defaultlogset")?.click();
      toggle();
    }
  };

  const handleLogin = (googleData) => {
    const token = googleData?.credential
    // var tokens = token.split(".")
    //  const email = JSON.parse(atob(tokens[1]))?.email
    //  console.log("email",email);
    const data = jwt_decode(token)
     console.log("email",data.email);
     if(data.email){
      setLoading(true)
      let body = {
        "email": data.email,
        "subject": "Your Tatlub otp",
        "name": "Tatlub"                
      }
      otpLogin(body).then(res => {
        let body = {
          "email": data.email,
          "subject": "Your Tatlub otp",
          "name": "Tatlub",
          "otp": res.data                        
        }
        if(res.data){
          mailLogin(body).then(response => {
            setLoading(false)
            document.getElementById("khfiuheriuehiergkjdnfsd")?.click();
            toast.info("LOGIN SUCCESSFULL", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              icon:false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            // console.log("udata", responcedata.data);
            setUserData(response.data)
            sessionStorage.setItem("data", JSON.stringify(response.data));
            localStorage.setItem("data", JSON.stringify(response.data));
            document.getElementById("closeLoginPopup")?.click();
            router.push('/')
          }).catch(err => console.error("err",err))
        }else{
          toast.error("UNABLE TO FETCH OTP", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            icon:false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }).catch(err => console.error('err',err))

     }else{
      toast.error("UNBALE TO FETCH YOUR MAIL ID", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        icon:false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
     }
  };

  // console.log("ejrhurguiwerw", sessionStorage.getItem("data"));



  const handleFailure = (result) => {
    console.log('result',result);
    // alert("fail");
  };

  const loginvalidation = Yup.object().shape({
    email: Yup.string().email("Please Enter Valid Email Id")
    .required("Email is required"),
    otp: Yup.string(),
    mobile : Yup.string().min(7, "Phone number must be at least 7 Digits")
  });
  const loginvalidationotp = Yup.object().shape({
    email: Yup.string().email("Please Enter Valid Email Id")
    .required("Email is required"),
    otp: Yup.string()
    .required("OTP is required"),
    mobile : Yup.string().min(7, "Phone number must be at least 7 Digits")
  });

  const fectLanguages = async () => {
    const responce = await getLanguages();
    setLag(responce.data);
  };

  const responseFacebook = (response) => {
    setUserData(response);
    console.log("facebook",response)
  };
  






  const formik = useFormik({
    initialValues,
    validationSchema: field == 'mail' ?  loginvalidation : loginvalidationotp,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {      
      try {
        let body = {
          "email": values.email,
          "subject": "Your Tatlub otp",
          "name": "Tatlub",
          "otp": values.otp                        
        }
        if(field == 'mail') {
          setLoading(true)
          const response = await otpLogin(body);
          setLoading(false)
          if (response.status == 200) {
            setField('otp');
            toast.error("OTP sent to your mail", {
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
        } else {
          setLoading(true)
          const responcedata = await mailLogin(body);
          setLoading(false)
        if (responcedata.status == 200) {
          setLogin(responcedata);
          document.getElementById("khfiuheriuehiergkjdnfsd")?.click();
          toast.info("LOGIN SUCCESSFULL", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            icon:false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          // console.log("udata", responcedata.data);
          setUserData(responcedata.data)
          sessionStorage.setItem("data", JSON.stringify(responcedata.data));
          localStorage.setItem("data", JSON.stringify(responcedata.data));
          document.getElementById("closeLoginPopup")?.click();
          router.push('/')
        } else {
          toast.error(responcedata.message + "!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }}
      } catch (error) {
        console.error(error);
        // alert(error)
        toast.error("Somthing Went Wrong!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setStatus("The details is incorrect");
        setSubmitting(false);
        // setLoading(false);
      }
    },
  });

  // useEffect(() => {
  //   fectLanguages();
  // }, [lan]);

  return (
    <>
      {/* <CommonLayout parent="home" title="login"> */}
      <section className="login-page">
        {/* {login.otp == undefined ?              */}
        <Container>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xl="12">
                <div className="px-sm-4 px-3 pb-xl-4 pb-3">
                  <img
                    src="/assets/images/icon/logo.png"
                    alt=""
                    className="contact-logo mb-3"
                  />
                  <h3 className="mb-2">{t("Welcome")}</h3>
                  <p className="mb-4 text-gray">
                    {t("For a smooth experience, log in.")}
                  </p>
                  <div className="">
                    <div className="theme-form">
                      <div className="mb-3">
                        {field == t('otp') ? 
                        <div>
                        <InputGroup>
                          <Input
                            placeholder={t("OTP...")}
                            {...formik.getFieldProps("otp")}
                            className="border"
                            // onChange={(e)=>setMail(e.target.value)}
                          />
                        </InputGroup>
                        {formik.touched.otp && formik.errors.otp && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert" className="text-danger">
                                {formik.errors.otp}
                              </span>
                            </div>
                          </div>
                        )}
                        </div> :
                        <div>
                        <InputGroup>
                          <Input
                            placeholder={t("Enter mail address")}
                            {...formik.getFieldProps("email")}
                            className="border"
                            // onChange={(e)=>setMail(e.target.value)}
                          />
                        </InputGroup>
                        {formik.touched.email && formik.errors.email && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert" className="text-danger">
                                {formik.errors.email}
                              </span>
                            </div>
                          </div>
                        )}
                        </div>}
                      </div>
                      <div className="mb-3 d-none">
                        {" "}
                        <InputGroup>
                          <InputGroupText>
                            <img
                              src="/assets/images/contact-us/3.png"
                              className="img-fluid contact_icon_  me-2"
                            />{" "}
                            <div className="no_mob">+974</div>
                          </InputGroupText>
                          {/* <Input
                            // {...formik.getFieldProps("password")}
                            {...formik.getFieldProps("mobile")}
                            // onChange={(e)=>setmobile(e.target.value)}
                            placeholder="Enter Mobile Number"
                          /> */}
                          <Input
                            {...formik.getFieldProps("password")}
                            // {...formik.getFieldProps("mobile")}
                            // onChange={(e)=>setmobile(e.target.value)}
                            placeholder="Enter Mobile Number"
                          />
                        </InputGroup>
                        {formik.touched.mobile && formik.errors.mobile && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert" className="text-danger">
                                {formik.errors.mobile}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mb-3 d-none">
                      {" "}
                        <InputGroup>
                          {/* <Input
                            // {...formik.getFieldProps("password")}
                            {...formik.getFieldProps("mobile")}
                            // onChange={(e)=>setmobile(e.target.value)}
                            placeholder="Enter Mobile Number"
                          /> */}
                          {/* <Input
                            {...formik.getFieldProps("password")}
                            className="border"
                           type="password"
                           placeholder="Password"
                          /> */}
                        </InputGroup>
                        {formik.touched.password && formik.errors.password && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              <span role="alert" className="text-danger">
                                {formik.errors.password}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* <Modal
                        className="model_contact modal-xl modal-dialog-centered"
                        isOpen={modal}
                        toggle={toggle}
                        {...args}
                      >
                        <ModalHeader
                          className="border-0"
                          toggle={toggle}
                        ></ModalHeader>
                        <ModalBody>
                          <Otpform number={mobile} />
                        </ModalBody>
                      </Modal> */}
                     
                      <button
                        type="submit"
                        className="btn btn-theme rounded-3 d-flex justify-content-center align-items-center w-100 px-3 py-2"
                        disabled={loading ? true : false}
                        // disabled={true}
                      >
                        {" "}
                        {/* Get Verification Code{" "} */}
                         {loading ? <span className="btn-ring"></span> : t('Login')}
                      </button>
                      {/* <Button onClick={toggle} type="submit" className="btn btn-contact w-100 px-3 py-2"> Get Verification Code </Button> */}

                      {/* <Button className="btn btn-contact w-100 px-3 py-2"> <a href="page/account/otp" >Get Verification Code</a> </Button> */}
                    </div>

                    <div className="py-3 mb-4 text-center position_border">
                      <span className="bg_bg px-3">{t("Or")}</span>
                    </div>
                    <Row>
                      <Col sm="6">
                        <div className="back_contac d-flex justify-content-center align-items-center mb-3">
                          {/* <img src="/assets/images/contact-us/4.png"  className="img-fluid contact_icon_1"  /><span className="cursor-pointer">{t("Signup with Google")}</span> */}
                          <GoogleOAuthProvider clientId="551835202218-qttsmjeipdj01fnoia1q7s3tkmdln7fb.apps.googleusercontent.com">
                            <GoogleLogin 
                              onSuccess={handleLogin}
                              onError={handleFailure}
                              theme="outline" 
                            />
                          </GoogleOAuthProvider>
                        </div>
                      </Col>
                      <Col sm="6">
                      <div className="back_contac d-flex justify-content-center align-items-center mb-3 d-none">
                      {/* <FacebookLogin /> */}
                      </div>
                        <div className="back_contac d-flex justify-content-center align-items-center mb-3 ">
                          <img
                            src="/assets/images/contact-us/5.png"
                            className="img-fluid contact_icon_1"
                          />
                          <span  className="cursor-pointer">{t("Signup with Facebook")}</span>
                          {/* <FacebookLogin  
                            appId="1088597931155576"
                            autoLoad={false}
                            fields="name,email,picture"
                            scope="public_profile,email,user_friends"
                            callback={responseFacebook}
                            // icon="fa-facebook"
                            cssClass="facebookfsk "
                          /> */}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              {/* <Col xl="6" className="right-login">
                <img
                  src="/assets/images/contact-us/1.png"
                  className="img-fluid "
                />
              </Col> */}
            </Row>
          </form>
        </Container>
        {/* //  : 
                // <Otpform number={mobile}/>} */}
      </section>
      {/* </CommonLayout> */}
    </>
  );
};

export default Login;
