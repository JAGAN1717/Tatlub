import React, { useState, useEffect } from "react";
import { Container, Row, Form, Input, Label, Col } from "reactstrap";
import CommonLayout from "../../../components/shop/common-layout";
import { ToastContainer, toast } from "react-toastify";
import toast1 from 'react-hot-toast';
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddBranchesData } from "../../../components/core/seller_request";
import { useTranslation } from "react-i18next";

const initialValues = {
  phone_number: "",
  email: "",
  address: "",
  state: "",
  country: "",
  city: "",
  user_id: "",
  // listing_id:''
};

export default function Addbranch() {
  const [formValues, setFormValues] = useState([initialValues]);
  const { t } = useTranslation();

  const branchSchema = Yup.object().shape({
    phone_number: Yup.string()
    .min(7, "Phone number must be at least 7 Digits")
      .required("Phone number is required"),
      // .max(10, "invalid phone number")
    email: Yup.string().email("Please Enter Valid Email Id").required("email number is required"),
    address: Yup.string(),
    state: Yup.string(),
    country: Yup.string(),
    city: Yup.string(),
    // user_id:Yup.string(),
    // listing_id:Yup.string()
  });

  const addFormFields = () => {
    setFormValues([...formValues, initialValues]);
  };

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  // console.log(
  //   "lllllllll",
  //   formValues.map((data) => data.phone_number)
  // );

  const formik = useFormik({
    initialValues,
    // validationSchema: branchSchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      const userId = JSON.parse(sessionStorage.getItem("data"))?.id ?? JSON.parse(localStorage.getItem("data"))?.id;
      var roleId = "";
      try {
        const body = {
          phone_number: formValues.map((data) => data.phone_number),
          email: formValues.map((data) => data.email),
          address: formValues.map((data) => data.address),
          state: formValues.map((data) => data.state),
          country: formValues.map((data) => data.country),
          city: formValues.map((data) => data.city),
          user_id: formValues.map((data) => userId),
          //   listing_id:['']
        };

        // console.log("jhfjhfjh", body);
        const response = await AddBranchesData(body);
        // toast.info("SAVE SUCCESSFULL", {
        //   position: "bottom-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   icon:false,
        //   progress: undefined,
        //   theme: "dark",
        // });
        toast1.success('SAVE SUCCESSFULL')
      } catch (error) {
        console.error(error);
        alert(error);
        setStatus("The details is incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (<>
    {/* <CommonLayout parent="home" title="profile"> */}
      <section className={"Edit-profile mb-5 mt-5 "}>
        <Container>
          <div className="mb-3 form_edit_bfranch">
            <div className="form-head mb-3 mt-3">
              <h4>{t("Branches")}</h4>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {formValues.map((element, index) => (
                <div className="row mt-3" key={index}>
                  <div className="mb-lg-4 mb-3 col-md-4 col-6">
                    <label className="form-label">{t("Email")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name={`email`}
                      value={element.email || ""}
                      //  {...formik.getFieldProps(`email`)}
                      onChange={(e) => handleChange(index, e)}
                    />
                    {/* {formik.touched.email && formik.errors.email && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.email}
                          </span>
                        </div>
                      </div>
                    )} */}
                  </div>

                  <div className="mb-lg-4 mb-3 col-md-4 col-6">
                    <label className="form-label">{t("Phone Number")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      maxLength={15}
                      name="phone_number"
                      //  {...formik.getFieldProps('phone_number')}
                      value={element.phone_number || ""}
                      onChange={(e) => handleChange(index,  e.target?.value.replace(/[^0-9]/g, ""))}
                    />
                    {formik.touched.phone_number &&
                      formik.errors.phone_number && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert" className="text-danger">
                              {formik.errors.phone_number}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="mb-lg-4 mb-3 col-md-4 col-6">
                    <label className="form-label">{t("Address")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="address"
                      value={element.address || ""}
                      //  {...formik.getFieldProps('address')}
                      onChange={(e) => handleChange(index, e)}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.address}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-lg-4 mb-3 col-md-4 col-6">
                    <label className="form-label">{t("State")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="state"
                      value={element.state || ""}
                      //  {...formik.getFieldProps('state')}
                      onChange={(e) => handleChange(index, e)}
                    />
                    {formik.touched.state && formik.errors.state && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.state}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-lg-4 mb-3 col-md-4 col-6">
                    <label className="form-label">{t("City")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="city"
                      value={element.city || ""}
                      //  {...formik.getFieldProps('city')}
                      onChange={(e) => handleChange(index, e)}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.city}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-lg-4 mb-3 col-md-4 col-6">
                    <label className="form-label">{t("Country")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="country"
                      value={element.country || ""}
                      //  {...formik.getFieldProps('country')}
                      onChange={(e) => handleChange(index, e)}
                    />
                    {formik.touched.country && formik.errors.country && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.country}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {index ? (
                    <div className="d-flex justify-content-end align-items-cennter">
                      <button
                        type="button"
                        className="button btn btn-theme px-4 bg_red rounded fw-light  ms-3 remove"
                        onClick={() => removeFormFields(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : null}

                  {/* <div className="d-flex justify-content-end align-items-cennter">
                                 <button type='button' className="btn btn-theme px-5 rounded fw-light mb-3" onClick={() => addFormFields()}>
                                   ADD BRANCH
                                 </button>
                               </div> */}
                </div>
              ))}
              <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-end align-items-cennter mt-3">
                <button
                  type="button"
                  className="btn btn-theme px-4 rounded fw-light mb-3"
                  onClick={() => addFormFields()}
                >
                  {t('ADD')}
                </button>
              </div>

              <div className="d-flex mt-3 justify-content-center align-items-cennter">
                <button
                  type="submit"
                  className="btn btn-theme  px-4 rounded fw-light mb-3"
                >
                  {t('SAVE BRANCH')}
                </button>
              </div>
              </div>
            </form>
          </div>
        </Container>
      </section>
    {/* </CommonLayout> */}
  </>
  );
}
