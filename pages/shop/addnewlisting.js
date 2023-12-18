import React, { useState, useEffect } from "react";
import { Container, Row, Form, Input, Label, Col } from "reactstrap";
import CommonLayout from "../../components/shop/common-layout";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddBranchesData } from "../../components/core/seller_request";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Router } from "next/router";
import { LinkOff } from "@mui/icons-material";
import { Backdrop } from "@mui/material";
import { useRouter } from 'next/router';
import authenticated from "../../components/auth/auth";
import Select from 'react-select';
import { getContriesDrop, getStateDrop, getCityDrop } from "../../components/core/shop_requests";

const initialValues = {
  phone_number: "",
  email: "",
  address: "",
  state: "",
  state_id: "",
  country: "",
  country_id: "",
  city: "",
  city_id: "",
  user_id: "",
};

function Addbranch() {
  const [formValues, setFormValues] = useState([initialValues]);
  const [branchsave, setbranchsave] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countriesval, setCountriesval] = useState();
  const [state, setState] = useState([]);
  const [stateval, setStateval] = useState([]);
  const [city, setCity] = useState([]);
  const [cityval, setCityval] = useState([]);

  const fetchBranchsave = async (id) => {
    const responcedata = await savebranch(id)
    setbranch(responcedata.data)
    // console.log("dhuig", responcedata)
  }

  const fetchCountries = async () => {
    const responce = await getContriesDrop();
    setCountries(responce.data);
  };

  const fetchState = async (id) => {

    const responce = await getStateDrop(id);
    setState(responce.data);
  };

  const fetchCity = async (id) => {
    const responce = await getCityDrop(id);
    setCity(responce.data);
  };

  useEffect(() => {
    fetchCountries();
    // fetchCity();
    // fetchState();
  }, []);


  const router = useRouter();
  const handleClick = () => {
    router.push('/shop/BrancheList')
  };

  const { t } = useTranslation();
  const branchSchema = Yup.object().shape({
    phone_number: Yup.string()
      .min(7, "Phone number must be at least 7 Digits")
      .required("Phone number is required"),
    email: Yup.string().email('Invalid email format').required("email is required"),
    address: Yup.string(),
    state: Yup.string(),
    country: Yup.string(),
    city: Yup.string(),
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
    validationSchema: branchSchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      const userId = JSON.parse(sessionStorage.getItem("data"))?.id ?? JSON.parse(localStorage.getItem("data"))?.id;
      try {
        let body = {
          "phone_number": values.phone_number,
          "email": values.email,
          "address": values.address,
          "state": values.state,
          "state_id": values.state_id,
          "country": values.country,
          "country_id": values.country_id,
          "city": values.city,
          "city_id": values.city_id,
          "user_id": userId,
        }
        const response = await AddBranchesData(body);
        toast.info("SAVE SUCCESSFULL", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          icon: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // resetForm()
        handleClick();
      } catch (error) {
        console.error(error);
        toast.error("Server Error!!!", {
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
        setLoading(false);
      }
    },
  });

  return (
    <CommonLayout parent="home" title="profile">
      <section className={"Edit-profile mb-5 mt-5"} >
        <Container>

          <div className='d-flex justify-content-end align-items-center d-none'>
            <Link href='/shop/BrancheList'>
              <button type='button' className='btn btn_header fw-500 mb-3' onClick={handleClick}>Back</button>
            </Link>
          </div>

          {/* <div className="mb-3 form_edit_bfranch"> */}
          <div className="mb-3 form_condition_">
            <div className="form-head mb-3 mt-3">
              <h4>{t("Branches")}</h4>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-3" >

                <div className="mb-lg-4 mb-3 col-md-4 col-6">

                  <label className="form-label">{t("Email")}</label>
                  <input type="email" className="form-control" placeholder="" name={`email`} {...formik.getFieldProps(`email`)} />

                  {formik.touched.email && formik.errors.email && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        <span role="alert" className="text-danger">
                          {formik.errors.email}
                        </span>
                      </div>
                    </div>
                  )}

                </div>

                <div className="mb-lg-4 mb-3 col-md-4 col-6">

                  <label className="form-label">{t("Phone Number")}</label>
                  <input type="text" className="form-control" placeholder="" name="phone_number" maxLength={15}  {...formik.getFieldProps('phone_number')} onChange={(e) => formik.setFieldValue("phone_number", e.target?.value.replace(/[^0-9]/g, ""))} />

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
                  <input type="text" className="form-control" placeholder="" name="address" {...formik.getFieldProps('address')} />

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

                  <label className="form-label">{t("Country")}</label>
                  {/* <input type="text" className="form-control" placeholder="" name="country" {...formik.getFieldProps('country')}/> */}
                  <Select
                    closeMenuOnSelect={true}
                    isSearchable={false}
                    name="country_id"
                    placeholder={t('Select Country')}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "country_id",
                        e.id
                      );
                      formik.setFieldValue('country', e.country_name)
                      setCountriesval(e.id)
                      fetchState(e.id);
                    }}
                    value={countries?.find(e => e.id == countriesval) ?? ''}
                    options={countries}
                    getOptionLabel={(option) => `${option.country_name}`}
                    getOptionValue={(option) => option.id}
                    className=" w-100"
                    classNamePrefix="select"
                    isRequired
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

                <div className="mb-lg-4 mb-3 col-md-4 col-6">

                  <label className="form-label">{t("State")}</label>
                  {/* <input type="text" className="form-control" placeholder="" name="state" {...formik.getFieldProps('state')} /> */}
                  <Select
                    closeMenuOnSelect={true}
                    required={true}
                    isSearchable={false}
                    name="state_id"
                    placeholder={t('Select State')}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "state_id",
                        e.id
                      );
                      formik.setFieldValue(
                        "state",
                        e.state_name
                      );
                      fetchCity(e.id);
                      setStateval(e.id);
                    }}
                    value={state?.find(e => e.id == stateval)}
                    options={state}
                    getOptionLabel={(option) => `${option.state_name}`}
                    getOptionValue={(option) => option.id}
                    className=" w-100"
                    classNamePrefix="select"
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
                  {/* <input type="text" className="form-control" placeholder="" name="city" {...formik.getFieldProps('city')} /> */}
                  <Select
                    closeMenuOnSelect={true}
                    required={true}
                    // isDisabled={!selectIntrovel}
                    isSearchable={false}
                    name="city_id"
                    placeholder={t('Select City')}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "city_id",
                        e.id
                      );
                      formik.setFieldValue(
                        "city",
                        e.city_name
                      );
                      fetchState(e.id);
                      setCityval(e.id)
                    }}
                    value={city?.find(e => e.id == cityval)}
                    options={city}
                    getOptionLabel={(option) => `${option.city_name}`}
                    getOptionValue={(option) => option.id}
                    className="w-100"
                    classNamePrefix="select"
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


              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex mt-3 justify-content-center align-items-cennter">
                  <button type="submit" className="btn btn-theme px-4 rounded fw-light mb-3">{t('SAVE BRANCH')}</button>
                </div>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </CommonLayout>
  );
}

export default authenticated(Addbranch); 