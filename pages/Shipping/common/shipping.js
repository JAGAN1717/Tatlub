import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { PostAddress, GetAddress, EditAddress } from '../../../components/core/account_request';
import * as Yup from "yup";
import AuthContex from '../../../components/auth/AuthContex';
import { getContriesDrop, getStateDrop, getCityDrop } from '../../../components/core/shop_requests';
import { ToastContainer, toast } from "react-toastify";
import toast1 from 'react-hot-toast';
import itemscontex from '../../initcontext';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import Select from 'react-select';




export default function Shipping(
    {
        setActiveIndex,
        cartData,
        setLocation,
        countries,
        state,
        city,
        fetchState,
        fetchCity
    }) {

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

    const { t } = useTranslation();

    const [Address, setAddress] = useState([])
    const { userData } = useContext(AuthContex)
    const { cart } = useContext(itemscontex);
    // const [countries, setCountries] = useState([]);
    // const [state, setState] = useState([]);
    // const [city, setCity] = useState([]);
    const [addressId, serAddressId] = useState('');
    const [selectAddress, setselectAddress] = useState(0)
    const [countriesval, setCountriesval] = useState();
    const [stateval, setStateval] = useState([]);
    const [cityval, setCityval] = useState([]);
    const [countriesval1, setCountriesval1] = useState();
    const [stateval1, setStateval1] = useState([]);
    const [cityval1, setCityval1] = useState([]);


    const fetchAddress = async () => {
        try {
            const id = userData?.id
            const response = await GetAddress(id)
            if (response.status == 200) {
                setAddress(response.data);
                setLocation(response.data[0])
            } else {
                setAddress([])
            }
            // console.log("gfg",response.data)
        } catch (err) {
            console.error(err)
        }
    }

    // useEffect(()=> {
    //     setLocation(Address[selectAddress])
    // },[selectAddress])

    // const fetchCountries = async () => {
    //     const responce = await getContriesDrop();
    //     setCountries(responce.data);
    //   };

    //   const fetchState = async (id) => {
    //     const responce = await getStateDrop(id);
    //     setState(responce.data);
    //   };

    //   const fetchCity = async (id) => {
    //     const responce = await getCityDrop(id);
    //     setCity(responce.data);
    //   };


    useEffect(() => {
        fetchAddress();
        // fetchCountries()
    }, [])


    const EditAddressdata = (data) => {
        Object.entries(data).forEach(([key, value]) => {
            // initialValues[key] = value
            formikEdit.setFieldValue(key, value);
        });
        fetchState(data?.country_id);
        fetchCity(data?.state_id)
        setCountriesval1(data?.country_id);
        setStateval1(data?.state_id)
        setCityval1(data?.city_id)
    }

    const formValidation = Yup.object().shape({
        address: Yup.string().required(),
        country_id: Yup.string().required("select your Country"),
        state_id: Yup.string().required("select your State"),
        city_id: Yup.string().required("select your City"),
        postal_code: Yup.string(),
        phone: Yup.string().min(7, "Phone number must be at least 7 Digits").required("phone number required")
    })

    const formik = useFormik({
        initialValues,
        validationSchema: formValidation,
        onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
            try {
                const id = userData?.id
                let body = {
                    'address': values.address,
                    'country_id': values.country_id,
                    'state_id': values.state_id,
                    'city_id': values.city_id,
                    'longitude': '',
                    'latitude': '',
                    'postal_code': values.postal_code,
                    'phone': values.phone
                }

                const response = await PostAddress(id, body)
                if (response.status == 200) {
                    // toast.info("ADD SUCCESSFULL", {
                    //     position: "bottom-right",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     icon: false,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // });
                    toast1.success('ADD SUCCESSFULL')
                    setLocation(body);
                    setActiveIndex(1)
                    console.log("skhdskljdsd", response.data)
                } else {
                    // toast.error(response?.message + '!', {
                    //     position: "bottom-right",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // });
                    toast1.error(response?.message + '!')
                }
                // fetchAddress()
                resetForm()
            } catch (error) {
                console.error(error);
                setStatus("The details is incorrect");
                setSubmitting(false);
                // setLoading(false);
            }
        }
    })

    const formikEdit = useFormik({
        initialValues,
        validationSchema: formValidation,
        onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
            try {
                const id = values.id

                let body = {
                    'address': values.address,
                    'country_id': values.country_id,
                    'state_id': values.state_id,
                    'city_id': values.city_id,
                    'longitude': '',
                    'latitude': '',
                    'postal_code': values.postal_code,
                    'phone': values.phone
                }

                const response = await EditAddress(id, body)

                if (response.status == 200) {
                    // toast.info("Edith SUCCESSFULL", {
                    //     position: "bottom-right",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     icon: false,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // });
                    toast1.success('Edit SUCCESSFULL')
                } else {
                    // toast.error(response?.message + '!', {
                    //     position: "bottom-right",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // });
                    toast1.error(response?.message + '!')

                }
                document.getElementById('CloseAddressModal')?.click();
                fetchAddress()
                resetForm()
            } catch (error) {
                console.error(error);
                setStatus("The details is incorrect");
                setSubmitting(false);
                // setLoading(false);
            }
        }
    })

    return (
        <section className='p-0 mb-3'>
            <div className='container'>
                <div className='row mb-4 checkO'>
                    <div className='col-lg-8 mb-3'>
                        <div className='shipping_cart shadow-none mb-3'>
                            <div className='mb-3'>
                                <h3>{t("Shipping")}</h3>
                            </div>

                            <div className=''>
                                {
                                    Address?.length > 0 &&
                                    Address?.map((data, index) => (
                                        <div className={index == selectAddress ? 'shipping_address2 mb-3' : 'shipping_address mb-3'} key={index} onClick={() => { setselectAddress(index); serAddressId(data?.id); setLocation(data) }}>
                                            <div className='d-flex justify-content-start align-items-center' >
                                                <div className="form-check" >
                                                    <input className="form-check-input" checked={index == selectAddress ? true : false} type="radio" name={`address1${index}`} id={`address1${index}`} />
                                                </div>
                                                <h4 className='complete_1 ms-3 mb-0 pb-0 form-check-label' for={`address1${index}`}>{data?.address + ',' + data?.city_name + ',' + data?.state_name + ',' + data?.country_name}</h4>
                                            </div>
                                            <div className='d-flex justify-content-start align-items-center cursor-pointer'
                                                onClick={() => EditAddressdata(data)}
                                                role='button' data-bs-toggle="modal" data-bs-target="#editAddressModal2">
                                                <img src='/assets/images/tatlub-img/cart/edit.png' className='edit_sh' alt='Edit' />
                                                <h4 className='ms-2 text_theme mb-0 pb-0' >{t('Edit')}</h4>
                                            </div>
                                        </div>
                                    ))
                                }

                                <div className={'add' == selectAddress ? 'shipping_address2 mb-3' : 'shipping_address mb-3'} onClick={() => setselectAddress('add')}>
                                    <div className=''>
                                        <div className='d-flex justify-content-start align-items-center mb-3'>
                                            <div className="form-check">
                                                <input className="form-check-input" checked={'add' == selectAddress ? true : false} type="radio" name="address1" id="address1" />
                                            </div>
                                            <h4 className='complete_1 ms-3 mb-0 pb-0 fw-bold cursor-pointer' for="address13">{t('Add New Address')}</h4>
                                        </div>
                                        <div className='d-flex justify-content-center align-items-center pt-3 d-none'>
                                            <h4 className='complete_1 ms-3 mb-0 pb-0 fw-bold cursor-pointer' for="address13">{t('Add New Address')}</h4>
                                        </div>
                                        <div className='p-4 pt-2'>
                                            <form onSubmit={formik.handleSubmit}>
                                                <div className='row mb-3'>
                                                    {/* <div className='mb-3 col-md-6'>
                                                        <label className='form-labe'>First Name*</label>
                                                        <input type='text' className='form-control'  
                                                        {...formik.getFieldProps("name")}
                                                        />
                                                        </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <label className='form-labe'>Last Name*</label>
                                                        <input type='text' className='form-control' />
                                                    </div> */}

                                                    <div className='mb-3 col-md-12'>
                                                        <label className='form-labe'>{t("Address")}*</label>
                                                        <textarea className='form-control' {...formik.getFieldProps('address')} rows={3} required />
                                                        {formik.touched.address && formik.errors.address && (
                                                            <div className='fv-plugins-message-container'>
                                                                <div className='fv-help-block'>
                                                                    <span role='alert' className='text-danger'>{formik.errors.address}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className='mb-3 col-md-6'>
                                                        <label className='form-labe'>{t("Phone")}*</label>
                                                        <input type='text' className='form-control' maxLength={15} {...formik.getFieldProps('phone')} onChange={(e) => formik.setFieldValue("phone", e.target?.value.replace(/[^0-9]/g, ""))} required />
                                                        {formik.touched.phone && formik.errors.phone && (
                                                            <div className='fv-plugins-message-container'>
                                                                <div className='fv-help-block'>
                                                                    <span role='alert' className='text-danger'>{formik.errors.phone}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className='mb-3 col-md-6'>
                                                        <label className='form-labe'>{t("Country")} / {t("Region")}</label>
                                                        <select className="form-select d-none" {...formik.getFieldProps('country_id')} onChange={(e) => {
                                                            formik.setFieldValue(
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
                                                            required={true}
                                                            name="country_id"
                                                            placeholder={t('Select Country')}
                                                            onChange={(e) => {
                                                                formik.setFieldValue(
                                                                    "country_id",
                                                                    e.id
                                                                );
                                                                setCountriesval(e.id)
                                                                fetchState(e.id);
                                                            }}
                                                            value={countries?.find(e => e.id == countriesval) ?? ''}
                                                            options={countries}
                                                            getOptionLabel={(option) => `${option.country_name}`}
                                                            getOptionValue={(option) => option.id}
                                                            className="w-100 "
                                                            // classNamePrefix="select"
                                                            isRequired
                                                        />

                                                        {formik.touched.country_id && formik.errors.country_id && (
                                                            <div className='fv-plugins-message-container'>
                                                                <div className='fv-help-block'>
                                                                    <span role='alert' className='text-danger'>{formik.errors.country_id}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <label className='form-labe'>{t('State')}</label>
                                                        <select className="form-select d-none" {...formik.getFieldProps('state_id')}
                                                            onChange={(e) => {
                                                                formik.setFieldValue("state_id", e.target.value);
                                                                fetchCity(e.target.value);
                                                            }} >
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
                                                                formik.setFieldValue(
                                                                    "state_id",
                                                                    e.id
                                                                );
                                                                fetchCity(e.id);
                                                                setStateval(e.id)
                                                            }}
                                                            // defaultValue={state?.find(e => e.id == stateval)}
                                                            value={state?.find(e => e.id == stateval)}
                                                            options={state}
                                                            getOptionLabel={(option) => `${option.state_name}`}
                                                            getOptionValue={(option) => option.id}
                                                            className=" w-100"
                                                        // classNamePrefix="select"
                                                        />
                                                        {formik.touched.state_id && formik.errors.state_id && (
                                                            <div className='fv-plugins-message-container'>
                                                                <div className='fv-help-block'>
                                                                    <span role='alert' className='text-danger'>{formik.errors.state_id}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <label className='form-labe'>{t('City')}</label>
                                                        <select className="form-select d-none" {...formik.getFieldProps('city_id')} >
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
                                                                formik.setFieldValue(
                                                                    "city_id",
                                                                    e.id
                                                                );
                                                                fetchState(e.id);
                                                                setCityval(e.id)
                                                            }}
                                                            value={city?.find(e => e.id == cityval)}
                                                            options={city}
                                                            getOptionLabel={(option) => `${option.city_name}`}
                                                            getOptionValue={(option) => option.id}
                                                            className="w-100"
                                                        // classNamePrefix="select"
                                                        />
                                                        {formik.touched.city_id && formik.errors.city_id && (
                                                            <div className='fv-plugins-message-container'>
                                                                <div className='fv-help-block'>
                                                                    <span role='alert' className='text-danger'>{formik.errors.city_id}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <label className='form-labe'>{t("Postcode")}</label>
                                                        <input type='text' className='form-control' {...formik.getFieldProps('postal_code')}
                                                            onChange={(e) => formik.setFieldValue("postal_code", e.target?.value.replace(/[^0-9]/g, ""))}
                                                        />
                                                        {formik.touched.postal_code && formik.errors.postal_code && (
                                                            <div className='fv-plugins-message-container'>
                                                                <div className='fv-help-block'>
                                                                    <span role='alert' className='text-danger'>{formik.errors.postal_code}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* <div className='mb-3 col-md-6'>
                                                        <label className='form-labe'>Landmark*</label>
                                                        <input type='text' className='form-control' />
                                                    </div> */}
                                                </div>
                                                <div className='d-flex justify-content-center  align-items-center d-none'>
                                                    <button type='submit' id='cartAddressAdd' className='btn btn_checkOut rounded px-5'>{t('Submit')}</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='d-flex justify-content-center '>
                            <button type='button' disabled={selectAddress == 'add' ? Object.keys(formik.errors).length > 0 : Address?.length == 0} className='btn btn_checkOut px-5 p-2 rounded'
                                onClick={() => {
                                    selectAddress == 'add' ? document.getElementById('cartAddressAdd')?.click() : setActiveIndex(1);
                                }}>{t("Continue")}</button>
                        </div>
                    </div>

                    <div className='col-lg-4  mb-3'>
                        {
                            cartData?.data?.length > 0 &&
                            <div className='Cart_card shadow-none'>
                                <div className=''>
                                    <h4>{t('Order Summary')}</h4>
                                    {
                                        cartData?.data.map((data, index) => (
                                            <div className='d-flex justify-content-between align-items-center mt-3' key={index}>
                                                <p className='text-muted complete_2 text-capitalize'>{data?.product_name}</p>
                                                <p className=''>{t("QAR")}{data?.price}.00</p>
                                            </div>
                                        ))
                                    }
                                    <hr />
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className='text-muted text-truncate'>{t("Sub Total")}</p>
                                        <p className=''>{t("QAR")}{cartData?.total}.00</p>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className='text-muted text-truncate'>{t("Tax")}</p>
                                        <p className=''>{t("QAR")}00.00</p>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className=''>{t("Order Total")}</p>
                                        <p className='text_theme'>{t("QAR")}{cartData?.total}.00</p>
                                    </div>
                                    <Link href='/Cart/MyCart'>
                                        <button type='button' className='btn btn_checkOut w-100 rounded'>{t('Edit Order')}</button>
                                    </Link>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>



            <div class="modal fade" id="editAddressModal2" tabindex="-1" aria-labelledby="editAddressModal2Label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header d-none">
                            <h5 class="modal-title" id="editAddressModal2Label">{t('Edit Address')}</h5>
                            <button type="button" class="btn-close" id="CloseAddressModal" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='shipping_address border-0 '>
                                <div className=''> 
                                <div className='mb-3 d-flex justify-content-center align-items-center pt-3 mb-3'>
                                    <img src='/assets/images/icon/logo.png' className='w-25' />
                                </div>
                                    <div className='d-flex justify-content-center align-items-center pt-3 d-none'>
                                        <h4 className='complete_1 ms-3 mb-0 pb-0 fw-bold cursor-pointer' for="address13">{t('Edit Address')}</h4>
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
                                                    <label className='form-labe'>{t('Phone')}*</label>
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
                                                    <label className='form-labe'>{t('Country')} / t{('Region')}</label>
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
                                                            formik.setFieldValue(
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
                                                    <label className='form-labe'>{t("State")}</label>
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
                                                            formik.setFieldValue(
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
                                                            formik.setFieldValue(
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
                                                <button type='submit' className='btn fw-normal btn_checkOut rounded px-5'>{t('Edit Address')}</button>
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
    )
}
