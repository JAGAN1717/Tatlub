import React, {useState} from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import { Input, Container, Row, Form, Label ,Col, Button,  InputGroup, InputGroupText,} from 'reactstrap';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { postRegister } from '../../../components/core/account_request'
import { ToastContainer, toast } from "react-toastify";

import { useRouter } from 'next/router'; 
import OtpInput from 'react-otp-input';
import { useTranslation } from "react-i18next";


const initialValues = {
    "email": "",
    "phone": "",
    "password": "",
    "pass": "",
    "name": "",
    "otp":""
}

const Register = () => {

    const { t } = useTranslation();

    const [image, setImage] = useState(null);
    const router = useRouter();
    const [otp, setOtp] = useState('');

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(`Name is required`),
        email: Yup.string().email("Please Enter Valid Email Id").required(`Email is required`),
        phone: Yup.string().min(7, "Phone number must be at least 7 Digits").required(`Phone Number is required`),
        // .matches(/^d$/, "Mobile Number Must be Numeric values and 7 to 15 digits only allow"),
        // pass: Yup.string()
        // .required('Password is required')
        // .matches(
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        // "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        // password: Yup.string()
        // .required()
        // .oneOf([Yup.ref("pass"), null], "Passwords must match"),
        password : Yup.string()
        .required('Password is required')
        // .matches(
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        // "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    })
    // console.log('jfghfh',image)

    const isValidFileUploaded = (file) => {
        const validExtensions = ["png", "jpeg", "jpg"];
        const fileExtension = file?.type.split("/")[1];
        return validExtensions.includes(fileExtension);
      };

    const handleimg = (e) => {
        if (e.target.files[0]?.size > 5242880) {
          toast.error("Maximum 5mb only accepted!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          const file = e.target.files[0];
          if (isValidFileUploaded(file)) {
            // setPreview(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
          }
        }
      };
    
      const handleOtp = () => [
        
      ]
    

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, {setStatus, setSubmitting, resetForm}) => {
        //   setLoading(true)
          try {    
            // alert("a")
            var formData = new FormData();

            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('password', values.password);
            formData.append('name', values.name);   
            formData.append('user_image', image);   

            const saveData = await postRegister(formData);

            if(saveData.status == 200) {
                document.getElementById("khfiuheriuehiergkjdnfsd")?.click();
                toast.info("REGISTER SUCCESSFULL", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    icon:false,
                    progress: undefined,
                    theme: "dark",
                  });
                //   console.log("ress", saveData.data);
                  sessionStorage.setItem("data", JSON.stringify(saveData.data));
                  localStorage.setItem("data", JSON.stringify(saveData.data));
                //   document.getElementById("defaultlogset")?.click();
                router.push('/')
            }else if(saveData.status == 400) {
                toast.error( "The password field is required !", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
            } else  {
                toast.error(saveData.message + "!", {
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
  

          } catch (error) {
            // alert("error")
            setStatus('The registration details is incorrect')
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
            setSubmitting(false)
          }
    }})

    // console.log('rrrrrrr',formik.errors)

    return (
        // <CommonLayout parent="home" title="register">
            <section className="register-page section-b-space mt-lg-5 mt-3">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h3>create account</h3>
                            <div className="theme-card">
                                <form noValidate onSubmit={formik.handleSubmit} className="theme-form">
                                    <Row>
                                        <Col md="6" className='mb-4'>
                                            <Label className="form-label required" for="name">Name</Label>
                                            <Input {...formik.getFieldProps('name')} type="text" className="form-control mb-2" id="name" placeholder="Name"
                                                required="" />
                                                {formik.touched.name && formik.errors.name && (
                                                <div className='fv-plugins-message-container'>
                                                    <div className='fv-help-block'>
                                                        <span role='alert' className='text-danger'>{formik.errors.name}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </Col>

                                        <Col md="6" className='mb-4'>
                                            <Label className="form-label required" for="email">Email</Label>
                                            <Input {...formik.getFieldProps('email')} type="email" className="form-control mb-2" id="email" placeholder="Email"
                                                required="" />
                                                {formik.touched.email && formik.errors.email && (
                                                <div className='fv-plugins-message-container'>
                                                    <div className='fv-help-block'>
                                                        <span role='alert' className='text-danger'>{formik.errors.email}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </Col>
                                        <Col md="6" className='mb-4'>
                                            <Label className="form-label required" for="phone">Phone</Label>
                                        <InputGroup>
                                            <Input  type="text" className="form-control mb-2" id="phone" placeholder="Phone"
                                                 maxLength={15} {...formik.getFieldProps('phone')} onChange={(e) => formik.setFieldValue("phone", e.target?.value.replace(/[^0-9]/g, ""))} />
                                                     {/* <button type='button' className='btn btn-theme fw-light border border-start-0 rounded-end h-100 p-3 ' onClick={()=>handleOtp()}>
                                                        SEND OTP
                                                    </button> */}
                                                 </InputGroup>

                                                 <p className='d-none' >Resend OTP <a href='#'>here?</a></p>
                                                {formik.touched.phone && formik.errors.phone && (
                                                <div className='fv-plugins-message-container'>
                                                    <div className='fv-help-block'>
                                                        <span role='alert' className='text-danger'>{formik.errors.phone}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </Col>
                                        <Col md="6" className='mb-4'>
                                            <Label className="form-label required" for="passs">Password</Label>
                                            <Input {...formik.getFieldProps('password')} type="password" className="form-control mb-2" id="passs" placeholder="Password" required="" />
                                            {formik.touched.password && formik.errors.password && (
                                                <div className='fv-plugins-message-container'>
                                                    <div className='fv-help-block'>
                                                        <span role='alert' className='text-danger'>{formik.errors.password}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </Col>
                                        {/* <Col md="6" className='mb-4 d-none'>
                                            <Label className="form-label required" for="passwords">Password</Label>
                                            <Input {...formik.getFieldProps('password')} type="password" className="form-control mb-2" id="passwords"
                                                placeholder="Password" required="" />
                                                {formik.touched.password && formik.errors.password && (
                                                <div className='fv-plugins-message-container'>
                                                    <div className='fv-help-block'>
                                                        <span role='alert' className='text-danger'>{formik.errors.password}</span>
                                                    </div>
                                                </div>
                                            )}
                                      <div className="">
                                      <div className="d-flex  align-items-center">
                                            <div className="  mx-2">
                                                <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={4}
                                                renderSeparator={<span className='px-2'></span>}
                                                renderInput={(props) => {
                                                    delete props.style;
                                                    delete props.className;
                                                    return(
                                                // <input className='w-100 text-center  fs-4 otp_reg ' style={{background:'#f8f8f8'}} {...props} />
                                              
                                                <input className='w-100 text-center  fs-4 otp_reg  ' {...props} />
                                                )}}
                                                />
                                                </div>
                                               
                                               <div className=' h-100 ms-2'>
                                               <button type='button' className='btn btn-theme px-4 rounded-3 mb-2 fw-light border   h-100 p-3 ' onClick={()=>handleOtp()}>
                                                        Verify
                                                    </button>
                                               </div>
                                                
                                            </div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        {/* <Col md="6" className='mb-4'>
                                            <Label className="form-label required" for="passwords">Confirm Password</Label>
                                            <Input {...formik.getFieldProps('password')} type="password" className="form-control mb-2" id="passwords"
                                                placeholder="Confirm Password" required="" />
                                                {formik.touched.password && formik.errors.password && (
                                                <div className='fv-plugins-message-container'>
                                                    <div className='fv-help-block'>
                                                        <span role='alert' className='text-danger'>{formik.errors.password}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </Col> */}
                                        <Col md="6" className='mb-4'>
                                            <Label className="form-label required" for="review">Profile Image</Label>
                                            <Input onChange={(e) => handleimg(e)} type="file" className="form-control mb-2" id="review"
                                                required="" />
                                        </Col>
                                        <Col md="12">
                                            <button type="submit" className="btn btn-solid fw-light w-auto" disabled={Object.keys(formik.errors).length > 0} >Create Account</button>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        // </CommonLayout>
    )
}

export default Register