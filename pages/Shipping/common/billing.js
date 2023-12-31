import React, { useContext, useEffect, useState } from 'react'
import itemscontex from '../../initcontext';
import Link from 'next/link';
import { PostAddress, GetAddress, EditAddress } from '../../../components/core/account_request';
import { UpdateProfile2 } from '../../../components/core/seller_request';
import AuthContex from '../../../components/auth/AuthContex';
import { useFormik } from 'formik'
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import toast1 from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import Select from 'react-select';



export default function billing({ setActiveIndex, cartData, getlocation, placeOrder, countries, state, city, fetchState, fetchCity, setLocation }) {
  const { cart } = useContext(itemscontex);
  const { t } = useTranslation();

  const [paytype, setPaytype] = useState('')
  const { userData, setUserData } = useContext(AuthContex)
  const [billingAddress, setBillingAddress] = useState('');
  const [countriesval1, setCountriesval1] = useState();
  const [stateval1, setStateval1] = useState([]);
  const [cityval1, setCityval1] = useState([]);
  const postOrder = () => {
    placeOrder();
    setActiveIndex(2)
  }


  let initialValues = {
    id: '',
    address: "",
    country_id: "",
    state_id: "",
    city_id: "",
    longitude: "",
    latitude: "",
    postal_code: "",
    phone: ""
  }


  const EditAddressdata = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      // initialValues[key] = value
      formikEdit.setFieldValue(key, value);
    });
    console.log('datadata',data)
    fetchState(data?.country);
    fetchCity(data?.state)
    setCountriesval1(data?.country);
    setStateval1(data?.state)
    setCityval1(data?.city)
  }

  const formValidation = Yup.object().shape({
    address: Yup.string().required(),
    // country_id:"",
    // state_id:"",
    // city_id:"",
    postal_code: Yup.string(),
    phone: Yup.string().min(7, "Phone number must be at least 7 Digits").required("phone number required")
  })

  const formikEdit = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        const id = userData.id

        let body = {
          'address': values.address,
          'country': values.country_id,
          'state': values.state_id,
          'city': values.city_id,
          'zipcode': values.postal_code,
          'phone2': values.phone
        }

        const response = await UpdateProfile2(id, body)

        if (response.status == 200) {
          // setLocation(response.data)
          let jfydf = JSON.parse(localStorage.getItem('data'));
          let fjgkjdsf = {
            ...jfydf, "country": values.country,
            "state": values.state_id,
            "city": values.city_id,
            "country": values.country_id,
            "zipcode": values.postal_code,
            "address": values.address
          }
          setUserData(fjgkjdsf)
          localStorage.setItem('data', JSON.stringify(fjgkjdsf))
          setBillingAddress(response?.data?.address)
          // toast.info("Edith SUCCESSFULL", {
          //   position: "bottom-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   icon: false,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "dark",
          // });
          toast1.success('Edit SUCCESSFULL')
        } else {
          // toast.error(response?.message + '!', {
          //   position: "bottom-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "dark",
          // });
          toast1.error(response?.message + '!')
        }
        document.getElementById('CloseAddressModal23')?.click();
        resetForm()
      } catch (error) {
        console.error(error);
        setStatus("The details is incorrect");
        setSubmitting(false);
        // setLoading(false);
      }
    }
  })



  return (<>
    <section className='p-0 mb-3'>
      <div className='container'>
        <div className='row checkO mb-4'>
          <div className='col-lg-8 mb-3' >
            <div className='shipping_cart shadow-none  mb-4'>
              <div className='mb-4'>
                <h3 className='fw-bold'>{t("Billing")}</h3>
              </div>
              <div className='mb-3'>
                <h4 className='fw-bold'>1.{t("Review Shipping And Billing Address")}</h4>
                <div className='address_cart'>
                  <div className='row h-100'>
                    <div className='col-md-6 d-flex flex-column h-100'>
                      <div className='d-flex flex-column justify-content-between flex-fill ' style={{ height: '140px' }}>
                        <h5>{t("SHIPPING ADDRESS")}</h5>
                        <div className=''>
                          {getlocation && <p className='complete_2'>{getlocation?.address}</p>}
                        </div>
                        <h5 className='text-decoration-underline cursor-pointer' onClick={() => setActiveIndex(0)}>
                          {t("CHANGE SHIPPING ADDRESS")}
                        </h5>
                      </div>
                    </div>

                    <div className='col-md-6 d-flex flex-column h-100'>
                      <div className='d-flex flex-column justify-content-between flex-fill' style={{ height: '140px' }}>
                        <h5>{t("BILLING ADDRESS")}</h5>
                        <div className=''>
                          <div className='form-check' onClick={() => { billingAddress === getlocation?.address ? setBillingAddress('') : setBillingAddress(getlocation?.address) }}>
                            <input className='form-check-input' checked={billingAddress === getlocation?.address} type='checkbox' value='' id='flexCheckDefault675' />
                            <label className='form-check-label' htmlFor='flexCheckDefault675'>
                              {t("Same as Shipping Address")}
                            </label>
                          </div>
                          <p className='complete_2 mb-0'>{t(billingAddress)}</p>
                        </div>
                        <h5 className='text-decoration-underline cursor-pointer' role='button' data-bs-toggle='modal' data-bs-target='#editAddresspopup' onClick={() => EditAddressdata(userData)}>
                          {t("EDIT BILLING ADDRESS")}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mb-3'>
                <h4 className='fw-bold'>2.{t("Delivery Method")}</h4>
                <div className='address_cart'>
                  <div className='mb-3'>
                    <h5>{t("EXPRESS DELIVERY")} ({t("Free")})</h5>
                  </div>
                  <div className=''>
                    <p>{t("Delivery in 3-4 bussiness days")}</p>
                  </div>
                </div>
              </div>

              <div className='mb-3'>
                <h4 className='fw-bold'>3.{t("Payment Details")}</h4>
                <div className='mb-3'>
                  <div className='border-bottom mb-3'>
                    <div className=' d-flex justify-content-between align-items-center '>
                      <div className="form-check" onClick={() => setPaytype('card')}>
                        <input className="fs-5 form-check-input" type="radio" name="flexRadioDefault" id="paymentmethod" />
                        <label className="fs-5 fw-bold form-check-label" for="paymentmethod">
                          {t("Credit Card")}
                        </label>
                      </div>
                      <div className='d-flex justify-content-between align-items-center'>
                        <img src='/assets/images/tatlub-img/payment/card.png' className='pay_icon' />
                        <img src='/assets/images/tatlub-img/payment/Visa.png' className='pay_icon' />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='mb-3 col-12'>
                      <input type='text' className='form-control' placeholder={t('Enter card Number')} />
                    </div>
                    <div className='mb-3 col-12'>
                      <input type='text' className='form-control' placeholder={t('Name of the Card Holder')} />
                    </div>
                    <div className='mb-3 col-md-6'>
                      <input type='text' className='form-control' placeholder={t('Expiration Date(MM/YY)')} />
                    </div>
                    <div className='mb-3 col-md-6'>
                      <input type='text' className='form-control' placeholder={t('CVV')} />
                    </div>
                  </div>
                </div>
                <div className='border-bottom mb-3'>
                  <div className=' d-flex justify-content-between align-items-center '>
                    <div className="form-check" onClick={() => setPaytype('cod')}>
                      <input className="fs-5 form-check-input" type="radio" name="flexRadioDefault" id="paymentmethod1" />
                      <label className="fs-5 fw-bold form-check-label" for="paymentmethod1">
                        {t('Cash On Delivery')}
                      </label>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                      <img src='/assets/images/tatlub-img/payment/__cod.png' className='pay_icon' />
                    </div>
                  </div>
                </div>
                <div className='border-bottom mb-3'>
                  <div className=' d-flex justify-content-between align-items-center '>
                    <div className="form-check" onClick={() => setPaytype('upi')}>
                      <input className="fs-5 form-check-input" type="radio" name="flexRadioDefault" id="paymentmethod2" />
                      <label className="fs-5 fw-bold form-check-label" for="paymentmethod2">
                        {t('UPI & Net Banking')}
                      </label>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                      <img src='/assets/images/tatlub-img/payment/__phonepe.png' className='pay_icon' />
                      <img src='/assets/images/tatlub-img/payment/__Gpay.png' className='pay_icon' />
                    </div>
                  </div>
                </div>
                <div className=' mb-3'>
                  <div className=' d-flex justify-content-between align-items-center '>
                    <div className="form-check" onClick={() => setPaytype('paypal')}>
                      <input className="fs-5 form-check-input" type="radio" name="flexRadioDefault" id="paymentmethod3" />
                      <label className="fs-5 fw-bold form-check-label" for="paymentmethod3">
                        {t('Paypal')}
                      </label>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                      <img src='/assets/images/tatlub-img/payment/__paypal.png' className='pay_icon' />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className='d-flex justify-content-center d-none'>
              <button type='button' disabled={paytype ? false : true} className='btn btn_checkOut px-5 p-2 rounded' onClick={() => postOrder()}> {t("Pay")} {t("QAR")} {cartData?.total}</button>
            </div>
          </div>
          <div className='col-lg-4'>
            {
              cartData?.data?.length > 0 &&
              <div className='Cart_card shadow-none'>
                <div className=''>
                  <h4>{t('Order Summary')}</h4>
                  {
                    cartData?.data?.map((data, index) => (
                      <div className='d-flex justify-content-between align-items-center mt-3' key={index}>
                        <p className='text-muted complete_2 text-capitalize'>{data?.product_name}</p>
                        <p className=''>{t("QAR")} {data?.price}.00</p>
                      </div>
                    ))
                  }
                  <hr />
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='text-muted text-truncate'>{t("Sub Total")}</p>
                    <p className=''>{t("QAR")} {cartData?.total}.00</p>
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='text-muted text-truncate'>{t("Tax")}</p>
                    <p className=''>{t("QAR")} 00.00</p>
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className=''>{t('Order Total')}</p>
                    <p className='text_theme'>{t("QAR")} {cartData?.total}.00</p>
                  </div>
                  {/* <Link href='/Cart/MyCart'> */}
                    {/* <button type='button' className='btn btn_checkOut w-100 rounded'>{t("Edit Order")}</button> */}
                    <button type='button' disabled={paytype ? false : true} className='btn btn_checkOut w-100 rounded' onClick={() => {postOrder()}}> {t("Place Order")}</button>
                  {/* </Link> */}
                </div>

              </div>
            }
          </div>
        </div>
      </div>

      <div className="modal fade" id="editAddresspopup" tabindex="-1" aria-labelledby="editAddresspopupLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-none">
              <h5 className="modal-title text-dark" id="editAddresspopupLabel">{t('Edit Address')}</h5>
              <button type="button" className="btn-close" id="CloseAddressModal23" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='shipping_address border-0 '>
                <div className=''>
                  <div className='d-flex justify-content-center align-items-center pt-3 mb-3'>
                    <img src='/assets/images/icon/logo.png' className='w-25' />
                  </div>
                  <div className='p-4 pt-2'>
                    <form onSubmit={formikEdit.handleSubmit}>
                      <div className='row mb-3'>
                        <div className='mb-3 col-md-12'>
                          <label className='form-labe'>{t("Address")}*</label>
                          <textarea className='form-control' {...formikEdit.getFieldProps('address')} rows={3} />
                          {formikEdit.touched.address && formikEdit.errors.address && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formikEdit.errors.address}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className='mb-3 col-md-6'>
                          <label className='form-labe'>{t("Phone")}*</label>
                          <input type='text' className='form-control' maxLength={15} {...formikEdit.getFieldProps('phone')} onChange={(e) => formikEdit.setFieldValue("phone", e.target?.value.replace(/[^0-9]/g, ""))} />
                          {formikEdit.touched.phone && formikEdit.errors.phone && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formikEdit.errors.phone}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className='mb-3 col-md-6'>
                          <label className='form-labe'>{t('Country')} / {t('Region')}</label>
                          <select className="form-select d-none" {...formikEdit.getFieldProps('country_id')}
                            onChange={(e) => {
                              formikEdit.setFieldValue(
                                "country_id",
                                e.target.value
                              );
                              fetchState(e.target.value)
                            }
                            }
                          >
                            <option selected value={0} >{t('Select Country')}</option>
                            {countries?.map((data, index) => (
                              <option value={data.id} key={index}>
                                {data.country_name}
                              </option>
                            ))}
                          </select>
                          <Select
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            name="country_id"
                            placeholder={t('Select Country')}
                            onChange={(e) => {
                              formikEdit.setFieldValue(
                                "country_id",
                                e.id
                              );
                              setCountriesval1(e.id)
                              fetchState(e.id);
                            }}
                            value={countries?.find(e => e.id == countriesval1) ?? ''}
                            options={countries}
                            getOptionLabel={(option) => `${option.country_name}`}
                            getOptionValue={(option) => option.id}
                            className="w-100 "
                            // classNamePrefix="select"
                            isRequired
                          />
                          {formikEdit.touched.country_id && formikEdit.errors.country_id && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formikEdit.errors.country_id}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='mb-3 col-md-6'>
                          <label className='form-labe'>{t('State')}</label>
                          <select className="form-select d-none" {...formikEdit.getFieldProps('state_id')}
                            onChange={(e) => {
                              formikEdit.setFieldValue("state_id", e.target.value);
                              fetchCity(e.target.value);
                            }}
                          >
                            <option selected value={0} >{t('Select State')}</option>
                            {state?.map((data, index) => (
                              <option value={data.id} key={index}>
                                {data.state_name}
                              </option>
                            ))}
                          </select>
                          <Select
                            closeMenuOnSelect={true}
                            required={true}
                            // isDisabled={!selectIntrovel}
                            isSearchable={false}
                            name="state_id"
                            placeholder={t('Select State')}
                            onChange={(e) => {
                              formikEdit.setFieldValue(
                                "state_id",
                                e.id
                              );
                              fetchCity(e.id);
                              setStateval1(e.id)
                            }}
                            // defaultValue={state?.find(e => e.id == stateval)}
                            value={state?.find(e => e.id == stateval1)}
                            options={state}
                            getOptionLabel={(option) => `${option.state_name}`}
                            getOptionValue={(option) => option.id}
                            className=" w-100"
                          // classNamePrefix="select"
                          />
                          {formikEdit.touched.state_id && formikEdit.errors.state_id && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formikEdit.errors.state_id}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='mb-3 col-md-6'>
                          <label className='form-labe'>{t("City")}</label>
                          <select className="form-select d-none" {...formikEdit.getFieldProps('city_id')}
                            onChange={(e) => {
                              formikEdit.setFieldValue(
                                "city_id",
                                e.target.value
                              );
                            }
                            }
                          >
                            <option selected value={0} >{t('Select City')}</option>
                            {city?.map((data, index) => (
                              <option value={data.id} key={index}>
                                {data.city_name}
                              </option>
                            ))}
                          </select>
                          <Select
                            closeMenuOnSelect={true}
                            required={true}
                            isSearchable={false}
                            name="city_id"
                            placeholder={t('Select City')}
                            onChange={(e) => {
                              formikEdit.setFieldValue(
                                "city_id",
                                e.id
                              );
                              fetchState(e.id);
                              setCityval1(e.id)
                            }}
                            value={city?.find(e => e.id == cityval1)}
                            options={city}
                            getOptionLabel={(option) => `${option.city_name}`}
                            getOptionValue={(option) => option.id}
                            className="w-100"
                          // classNamePrefix="select"
                          />
                          {formikEdit.touched.city_id && formikEdit.errors.city_id && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formikEdit.errors.city_id}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='mb-3 col-md-6'>
                          <label className='form-labe'>{t('Postcode')}*</label>
                          <input type='text' className='form-control' {...formikEdit.getFieldProps('postal_code')}
                            onChange={(e) => formikEdit.setFieldValue("postal_code", e.target?.value.replace(/[^0-9]/g, ""))}
                          />
                          {formikEdit.touched.postal_code && formikEdit.errors.postal_code && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formikEdit.errors.postal_code}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='d-flex justify-content-center  align-items-center'>
                        <button type='submit' className='btn btn_checkOut fw-normal rounded px-5'>{t('Edit Address')}</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>)
}
