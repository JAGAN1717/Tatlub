import React, { useState, useContext, useEffect } from 'react'
import Seo from '../../seo/seo'
import { getLayout } from '../../components/shop/common-layout'
import CommonLayout from '../../components/shop/common-layout'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useRouter } from 'next/router';
import moment from 'moment/moment';
import Authcontex from '../../components/auth/AuthContex'
import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';
import { Column } from 'primereact/column';
import { useTranslation } from "react-i18next";
import { getMyOrderDetails } from '../../components/core/Order_request';
import { reviewForItems } from '../../components/core/vendor_request';
import { getOrderStatus } from '../../components/core/Order_request';
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import {
    Modal,
    ModalBody,
    Label,
} from "reactstrap";


function OdreDetails({ OrderD }, args) {
    const [activeIndex, setActiveIndex] = useState(0);
    const { t } = useTranslation();

    const router = useRouter();

    const [modal, setModal] = useState(false);
    const [isOpen, setIsopen] = useState(false);
    const [rating, setRating] = useState(1);
    const [reviewImg, setReviewImg] = useState();
    const [PreviewImg, setPReviewImg] = useState();
    const [productId, setProductId] = useState();
    const [Orderstatus, setorderStatus] = useState([]);
    const toggle = () => !userData ? document.getElementById('openLoginPopup')?.click() : setModal(!modal);


    const orderStatus = async () => {
        setIsLoading(true)
        getOrderStatus().then(res => {
            const status = res.data?.filter(e => e.name != 'Canceled')
            setorderStatus(status)
            setIsLoading(false)
        }).catch(err => {
            console.error("err", err.message)
            setIsLoading(false)
        })
    }


    useEffect(() => {
        orderStatus()
    }, [])



    const initialValues = {
        item_id: "",
        product_id: "",
        user_id: "",
        body: "",
        overall_rating: "",
        image: "",
    };

    const reviewSchema = yup.object().shape({
        overall_rating: yup.string(),
        body: yup.string().required("Please Add Your Review"),
    });


    const formik = useFormik({
        initialValues,
        validationSchema: reviewSchema,
        onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
            // setIsLoading(true)
            // alert()
            try {
                // let seller_id = seller?.id
                let user_id =
                    JSON.parse(sessionStorage.getItem("data"))?.id ??
                    JSON.parse(localStorage.getItem("data"))?.id;

                const body = {
                    item_id: '' ?? '',
                    product_id: productId ?? '',
                    user_id: user_id ?? '',
                    overall_rating: rating ?? '',
                    body: values.body,
                    image: reviewImg ?? '',
                };
                var formdata = new FormData();

                Object.entries(body).forEach(([key, value]) => {
                    formdata.append(key, value);
                });

                const response = await reviewForItems(formdata);
                if (response.status == 200) {
                    document.getElementById("closeRevie")?.click();
                    setdetail(response)
                    toast.info("SUCCESS", {
                        position: "bottom-right",
                        autoClose: 2000,
                        icon: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
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
            } catch (error) {
                console.error('skhdgsdsfdshdsd', error);
                setStatus("dont give proper review details is incorrect");
                setSubmitting(false);
                // setIsLoading(true)
            }
        },
    });


    const { id, ids } = router.query
    const [orderData, setOrderdata] = useState()
    const [Ordestatus, setstatus] = useState()
    const { userData } = useContext(Authcontex);
    const [isLoading, setIsLoading] = useState(false);
    const [productList, setproductList] = useState([])

    useEffect(() => {
        const status = Orderstatus.findIndex(e => e?.id == Ordestatus?.order_status?.id)
        setActiveIndex(status ?? 0)
    }, [orderData?.order_status, id, Ordestatus])

    const FetchOrderDetails = () => {
        setIsLoading(true)
        getMyOrderDetails(id, ids).then(res => {
            // console.log("skdhsgddkskd",res.data)
            setOrderdata(res.data?.order)
            // const product = res.data?.order_detail?.filter(e => e.product != null)
            setstatus(res.data?.order_detail)
            setproductList([res.data?.order_detail])
            setIsLoading(false)
        }).catch(err => setIsLoading(false))
    }


    useEffect(() => {
        // if (orderData?.product) {
        //     setproductList(orderData?.order_detail)
        // }
        FetchOrderDetails()
    }, [id])

    const steps = [
        'Pending',
        'Processing',
        'At Local Facility',
        'Out For Delivery',
        'Completed'
    ];

    const imageBodyTemplate = (product) => {
        if (product != null) {
            return (
                <div className='d-sm-flex align-items-center'>
                    <div className=' mb-sm-auto mb-3'>
                        <img src={product?.product_image_medium} className="shadow orde_img rounded object-fit-contain   bg-white" />
                    </div>
                    <div className='mx-sm-3'>
                        <h4 className='text-capitalize complete_2 lh-base'>{product?.product_name}</h4>
                    </div>
                </div>
                // <div className='d-flex align-items-center'>
                //     <img src={product?.product_image_medium} alt={product.image} className="shadow orde_img rounded object-fit-contain bg-white" /> 
                // </div>
            );
        }
    };

    const nameBodyTemplate = (product) => {
        if (product != null) {
            return <h4 className='text-capitalize'>{JSON.parse(orderData.quantity ?? '')}</h4>;
        }
    };

    const statusBodyTemplate = (product) => {
        if (product != null) {
            return <Tag value={t(getSeverity2(product))} severity={getSeverity(product)}></Tag>;
        }
    };

    const priceBodyTemplate = (product) => {
        if (product != null) {
            return <h4>{t("QAR")} {product?.product_price}</h4>;
        }
    };

    const getSeverity = (product) => {

        switch (product.product?.current_status ?? 1) {
            case '1':
                return 'warning';
            case '2':
                return 'success';
            case '3':
                return 'warning';
            case '4':
                return 'warning';
            case '5':
                return 'warning';
            case '6':
                return 'success';
            case '7':
                return 'danger';
            case '8':
                return 'Canceled';
            default:
                return 'warning';
        }
    };

    const getSeverity2 = (product) => {
        switch (product.product?.current_status ?? 1) {
            case '1':
                return 'Pending';
            case '2':
                return 'Confirmed';
            case '3':
                return 'Processing';
            case '4':
                return 'Handover';
            case '5':
                return 'Out for Delivery';
            case '6':
                return 'Delivered';
            case '7':
                return 'Canceled';
            case '8':
                return 'Canceled';
            default:
                return 'Pending';
        }
    };


    const getSeverity3 = (product) => {

        switch (product?.product?.product_status ?? 1) {
            case '1':
                return 'warning';
            case '2':
                return 'success';
            case '3':
                return 'warning';
            case '4':
                return 'warning';
            case '5':
                return 'warning';
            case '6':
                return 'success';
            case '7':
                return 'danger';
            case '8':
                return 'Canceled';
            default:
                return 'warning';
        }
    };

    const getSeverity4 = (product) => {
        switch (product?.product?.product_status ?? 1) {
            case '1':
                return 'Pending';
            case '2':
                return 'Confirmed';
            case '3':
                return 'Processing';
            case '4':
                return 'Handover';
            case '5':
                return 'Out for Delivery';
            case '6':
                return 'Delivered';
            case '7':
                return 'Canceled';
            case '8':
                return 'Canceled';
            default:
                return 'Pending';
        }
    };



    return (
        <div>

            <Modal
                className="model_contact modal-md modal-dialog-centered"
                isOpen={modal}
                toggle={toggle}
                {...args}
            >
                <ModalBody>
                    <div className="popup-review">
                        <div className="mb-3 d-flex justify-content-between align-items-center">
                            <img
                                src="/assets/images/icon/logo.png"
                                className="w-25"
                                onError={(e) =>
                                (e.currentTarget.src =
                                    "/assets/images/tatlub-img/no1.png")
                                }
                            />
                            {/* <h4 className="mb-0 pb-0">{t('Write a')}  {t('Review')}</h4> */}
                        </div>
                        <div className="">
                            <form onSubmit={formik.handleSubmit}>
                                {/* <h5>jhgj</h5>
                                          <p>anna Nager</p> */}
                                {/* <p>{seller?.user_details?.address}</p> */}
                                <div className="d-flex justify-content-between align-items-center my-3">
                                    <p className="mb-0">{t("Over All")}</p>{" "}
                                    <div className="d-flex">
                                        {/* <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
                                        {/* <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                                            <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                                            <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                                            <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
                                        <Stack spacing={1}>
                                            <Rating
                                                name="size-large star_rate"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                defaultValue={1}
                                                size="large"
                                            />
                                        </Stack>
                                    </div>
                                </div>
                                <Label>{t("Add Review")}</Label>
                                <textarea
                                    placeholder={t("Describe Your Experience")}
                                    {...formik.getFieldProps("body")}
                                ></textarea>
                                {formik.touched.body && formik.errors.body && (
                                    <div className="fv-plugins-message-container">
                                        <div className="fv-help-block">
                                            <span role="alert" className="text-danger">
                                                {formik.errors.body}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <p>{t("Add Photos")}</p>
                                <div className=" d-flex">
                                    <div className="file file--upload">
                                        <label for="input-file">
                                            <i className="fa fa-camera"></i>
                                        </label>
                                        <input
                                            id="input-file"
                                            type="file"
                                            onChange={(e) => { setReviewImg(e.target.files[0]); setPReviewImg(URL.createObjectURL(e.target.files[0])) }}
                                        />
                                    </div>
                                    {
                                        PreviewImg &&
                                        <div className="">
                                            <img src={PreviewImg} onError={(e) => e.currentTarget.src = "/assets/images/tatlub-img/No.jpg"} className=" mx-2 pre_imd " />
                                        </div>
                                    }
                                </div>
                                <button className="btn submit_btn" type="submit">
                                    {t("Submit")}
                                </button>
                            </form>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            <CommonLayout parent="home" title="Orders">
                <Seo title={`Orders`} />
                <div className='container mx-auto'>
                    {
                        isLoading ? (
                            <div className="my-3">
                                <div className="loader-wrapper2 rounded-4">
                                    <div className="loader"></div>
                                </div>
                            </div>
                        ) :
                            <div className='mb-5'>
                                <div className='row h-100'>
                                    <div className='col-xl-8 h-100 mb-3'>
                                        <div className='odered_card h-100 d-flex flex-column justify-content-between'>
                                            <div>
                                            <div className='mb-4'>
                                                <h4 className='fs-25 fw-bold'>{t('Order Status')}</h4>
                                            </div>
                                            <div className='bg-light rounded-4 p-3 d-sm-flex justify-content-between align-items-center mb-4'>
                                                <div className='mb-3'>
                                                    <div className='mb-3'>
                                                        <h4 className='text-secondary fs-18 lh-base'>{t("Order Number")}</h4>
                                                        <h4 className='fs-18 fw-bold lh-base complete_1'>{orderData?.order_code ?? orderData?.unique_id}</h4>
                                                    </div>
                                                    <div className=''>
                                                        <h4 className='text-secondary fs-18 lh-base'>{t("Date")}</h4>
                                                        <h4 className='fs-18 lh-base fw-bold'>{moment(orderData?.created_at ?? '', 'YYYY-MM-DD HH:mm:ss').format('MMMM D, YYYY')}</h4>
                                                    </div>
                                                </div>
                                                <div className='mb-3'>
                                                    <div className='mb-3'>
                                                        <h4 className='text-secondary fs-18 lh-base'>{t("Total")}</h4>
                                                        <h4 className='fs-18 lh-base fw-bold'>{orderData?.total && t("QAR")+ ' ' + parseInt(orderData?.total) + '.00'}</h4>
                                                    </div>
                                                    <div className=''>
                                                        <h4 className='text-secondary fs-18 lh-base'>{t("Payment Method")}</h4>
                                                        <h4 className='fs-18 lh-base fw-bold'>{t("CASH_ON_DELIVERY")}</h4>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* start of order Status */}
                                            <div className="mb-5 w-100 align-items-center justify-content-center step_order">
                                                <div className="d-none d-md-block">
                                                    <Box sx={{ width: '100%' }}>
                                                        <Stepper activeStep={activeIndex}  orientation='horizontal' alternativeLabel sx={{  direction: 'ltr'}}>
                                                            {Orderstatus.map((label, index) => (
                                                                <Step key={label} >
                                                                    <StepLabel><span className={`fw-bold text-uppercase fs-18  ${activeIndex == index ? 'text-color' : 'text-secondary '}`}>{label?.name}</span></StepLabel>
                                                                </Step>
                                                            ))}
                                                        </Stepper>
                                                    </Box>
                                                </div>

                                                <div className="d-md-none">
                                                    <Box sx={{ width: '100%' }}>
                                                        <Stepper activeStep={activeIndex} orientation='vertical' sx={{ direction: 'ltr' }}>
                                                            {Orderstatus.map((label, index) => (
                                                                <Step key={label}>
                                                                    <StepLabel><span className={`fw-bold text-uppercase  ${activeIndex == index ? 'text-color' : 'text-dark'}`}>{label?.name}</span></StepLabel>
                                                                </Step>
                                                            ))}
                                                        </Stepper>
                                                    </Box>
                                                </div>
                                            </div>
                                            </div>

                                        {/* Product list */}
                                        {
                                        productList?.map((product, index) => (
                                            <div className='card rounded-4 p-3 mb-3' key={index}>
                                            <div className='row align-items-center showwww'>
                                              <div className=' col-md-8 mb-lg-0 mb-3'>
                                                <div className='d-sm-flex align-items-center'>
                                                  <div className=' mb-sm-auto mb-3 rounded-3 d-flex justify-content-center bg-secondary-subtle  p-2'>
                                                    <img src={product?.product?.product_image_medium} className="orde_img2 object-fit-contain" />
                                                  </div>
                                                  <div className='mx-sm-3'>
                                                    <h4 className='text-capitalize complete_2 fs-20 fw-bold  lh-base'>{product?.product?.product_name}</h4>
                                                    <h4 className='text-secondary  fw-normal lh-base fs-20'>{JSON.parse(product?.quantity)} {t("QTY")}</h4>
                                                    <h4 className='text-color fw-normal lh-base fs-20'>{t("QAR")} {product?.product?.product_price}</h4>
                                                  </div>
                                                </div>
                                              </div>
                        
                        
                                              <div className=' col-md-4  col-6 mb-sm-0 mb-3 d-sm-flex justify-content-lg-end align-items-center'>
                                                <div className=''>
                                                    <button type='button' className='btn btn-lead1 mt-0 text-truncate' onClick={() => { setProductId(product?.product?.id); toggle() }} >{t("Write a Review")}</button>
                                                </div>
                                              </div>
                        
                                            </div>
                                          </div>
                                        ))
                                    }
                                        </div>
                                    </div>
                                    <div className='col-xl-4  mb-3'>
                                        <div className='odered_card h-100'>
                                           <div className='mb-3'>
                                                <h4 className='fs-25 fw-bold'>{t('Order Details')}</h4>
                                            </div>
                                            <div className='mb-3'>
                                                <div className=''>
                                                    <h4 className='text-secondary fs-18 lh-base'>{t("Name")} :</h4>
                                                    <h4 className='fs-18 lh-base complete_2 fw-bold'>{userData?.name}</h4>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className=''>
                                                    <h4 className='text-secondary fs-18 lh-base'>{t("Total Items")} :</h4>
                                                    <h4 className='fs-18 lh-base fw-bold'>{productList?.length ?? 0} Item</h4>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className=''>
                                                    <h4 className='text-secondary fs-18 lh-base'>{t("Shipping Address")} :</h4>
                                                    <h4 className='fs-18 lh-base complete_2 fw-bold'>{orderData?.shipping_address?.address + ',' + orderData?.shipping_address?.city_name + ',' + orderData?.shipping_address?.state_name + ',' + orderData?.shipping_address?.country_name}</h4>
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <div className=''>
                                                    <h4 className='text-secondary fs-18 lh-base'>{t("Billing Address")} :</h4>
                                                    <h4 className='fs-18 lh-base complete_2 fw-bold'>{userData?.address}</h4>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className=''>
                                                <div className='mb-3'>
                                                <h4 className='fs-25 fw-bold'>{t("Total Amount")}</h4>
                                                </div>
                                                <div className=''>
                                                    <div className='d-flex justify-content-between mb-3'>
                                                    <h4 className='fs-18 text-secondary lh-base'>{t("Sub Total")} </h4>
                                                    <h4 className='fs-18 lh-base fw-bold'>{parseInt(orderData?.subtotal ?? 0) + ".00"} {t("QAR")}</h4>
                                                    </div>
                                                    <div className='d-flex justify-content-between mb-3'>
                                                    <h4 className='fs-18 text-secondary lh-base'>{t("Shipping Charge")} </h4>
                                                    <h4 className='fs-18 lh-base fw-bold'>{parseInt(orderData?.shipping_cost ?? 0) + ".00"} {t("QAR")}</h4>
                                                    </div>
                                                    <div className='d-flex justify-content-between mb-3'>
                                                    <h4 className='fs-18 text-secondary lh-base'>{t("Tax")} </h4>
                                                    <h4 className='fs-18 lh-base fw-bold'>{parseInt(orderData?.tax ?? 0) + ".00"} {t("QAR")}</h4>
                                                    </div>
                                                </div>
                                                <hr/>
                                                    <div className='d-flex justify-content-between '>
                                                    <h4 className='fs-18 lh-base fw-bold'>{t("Total")} </h4>
                                                    <h4 className='fs-18 lh-base fw-bold'>{parseInt(orderData?.total ?? 0) + ".00"} {t("QAR")}</h4>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }


                    <div className='px-xl-5 d-none'>
                        <div className="position-relative overflow-hidden rounded-3 border shadow-sm mb-5 ">

                            <div className={`order-2 d-sm-flex w-100 gap-6  justify-content-between flex-nowrap sm:order-1 p-3`} >
                                <div className="d-flex  align-items-center mb-sm-auto mb-2">
                                    <span className=" fw-semibold d-block text-nowrap text-xs xs:text-base mb-lg-0 d-lg-inline me-lg-4 lg:ltr:mr-4 lg:rtl:ml-4">
                                        Order Status :
                                    </span>
                                    <div className="w-100 lg:w-auto mx-lg-auto mx-2">
                                        {/* {getSeverity2(orderData?.delivery_status) ?? 'Order Processing'} */}
                                        {/* <Tag value={t(getSeverity2(orderData))} severity={getSeverity(orderData)}></Tag> */}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className=" d-block fw-semibold text-nowrap text-xs xs:text-base lg:mb-0 d-lg-inline me-lg-4 lg:ltr:mr-4 lg:rtl:ml-4">
                                        Payment Status :
                                    </span>
                                    <div className="w-100  lg:w-auto mx-lg-auto mx-2">
                                        COD
                                        {/* {orderData?.payment_status} */}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-light p-4">
                                <div className="mb-4 row ">
                                    <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>
                                        <div className="rounded border border-border-200  px-3 py-3 shadow-sm">
                                            <h3 className="mb-2 text-sm fw-semibold text-heading">
                                                Order Number
                                            </h3>
                                            <p className="text-sm text-dark">
                                                {orderData?.order_code ?? orderData?.unique_id}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>

                                        <div className="rounded border border-border-200 px-3 py-3 shadow-sm">
                                            <h3 className="mb-2 text-sm fw-semibold text-heading">
                                                Date
                                            </h3>
                                            <p className="text-sm text-body-dark">
                                                {moment(orderData?.created_at ?? '', 'YYYY-MM-DD HH:mm:ss').format('MMMM D, YYYY')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>

                                        <div className="rounded border border-border-200 px-3 py-3 shadow-sm">
                                            <h3 className="mb-2 text-sm fw-semibold text-heading">
                                                Total
                                            </h3>
                                            <p className="text-sm text-body-dark">{orderData?.total && "QAR " + parseInt(orderData?.total) + '.00'}</p>
                                        </div>
                                    </div>
                                    <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>

                                        <div className="rounded border border-border-200 px-3 py-3 shadow-sm">
                                            <h3 className="mb-2 text-sm fw-semibold text-heading">
                                                Payment Method
                                            </h3>
                                            <p className="text-sm text-body-dark">
                                                CASH_ON_DELIVERY
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* end of order received  */}

                                {/* start of order Status */}
                                <div className="mb-5  w-100 align-items-center justify-content-center">
                                    <div className="d-none d-sm-block">
                                        <Box sx={{ width: '100%' }}>
                                            <Stepper activeStep={activeIndex} orientation='horizontal' alternativeLabel sx={{ direction: 'ltr' }}>
                                                {Orderstatus.map((label, index) => (
                                                    <Step key={label}>
                                                        <StepLabel><span className={`fw-bold text-uppercase  ${activeIndex == index ? 'text-color' : 'text-dark'}`}>{label?.name}</span></StepLabel>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                        </Box>
                                    </div>

                                    <div className="d-sm-none">
                                        <Box sx={{ width: '100%' }}>
                                            <Stepper activeStep={activeIndex} orientation='vertical' sx={{ direction: 'ltr' }}>
                                                {Orderstatus.map((label, index) => (
                                                    <Step key={label}>
                                                        <StepLabel><span className={`fw-bold text-uppercase  ${activeIndex == index ? 'text-color' : 'text-dark'}`}>{label?.name}</span></StepLabel>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                        </Box>
                                    </div>
                                </div>
                                {/* end of order Status */}

                                <div className="d-flex flex-column flex-lg-row ">
                                    <div className="mb-5 w-100 lg:mb-0 lg:w-1/2 pe-lg-3 ltr:lg:pr-3 rtl:lg:pl-3">
                                        <h3 className="mb-4  fw-bold text-heading">
                                            Total Amount
                                        </h3>
                                        <div>
                                            <p className="mt-2 d-flex text-body-dark">
                                                <strong className="w-100 fs-6 text-sm fw-semibold text-heading sm:w-50">
                                                    Sub Total
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4 sm:w-50 ">
                                                    {parseInt(orderData?.subtotal ?? 0) + ".00"} {t("QAR")}
                                                </span>
                                            </p>
                                            <p className="mt-2 d-flex text-body-dark">
                                                <strong className="w-100 fs-6  text-sm fw-semibold text-heading sm:w-50">
                                                    Shipping Charge
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4 sm:w-50 ">
                                                    {parseInt(orderData?.shipping_cost ?? 0) + ".00"} {t("QAR")}
                                                </span>
                                            </p>
                                            <p className="mt-2 d-flex text-body-dark">
                                                <strong className="w-100 fs-6  text-sm fw-semibold text-heading sm:w-50">
                                                    Tax
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4 sm:w-50 ">
                                                    {parseInt(orderData?.tax ?? 0) + ".00"} {t("QAR")}
                                                </span>
                                            </p>
                                            {/* <p className="mt-2 d-flex text-body-dark">
                                                <strong className="w-100 fs-6  text-sm fw-semibold text-heading sm:w-50">
                                                    Discount
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4 sm:w-50 ">
                                                    {parseInt(orderData?.discount ?? 0) + ".00"}
                                                </span>
                                            </p> */}
                                            <p className="mt-2 d-flex text-body-dark">
                                                <strong className="w-100  fs-6  text-sm fw-semibold text-heading sm:w-50">
                                                    Total
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4 sm:w-50">
                                                    {parseInt(orderData?.total ?? 0) + ".00"} {t("QAR")}
                                                </span>
                                            </p>
                                            {/* {wallet_total && ( */}
                                            {/* <p className="mt-5 d-flex text-body-dark">
                            <strong className="w-50 text-sm fw-semibold text-heading sm:w-50">
                                text-paid-from-wallet
                            </strong>
                            :
                            <span className="w-50 text-sm ltr:pl-4 rtl:pr-4 sm:w-50">
                                {"wallet_total"}
                            </span>
                            </p> */}
                                            {/* )} */}
                                        </div>
                                    </div>
                                    {/* end of total amount */}

                                    <div className="w-100 lg:w-1/2 ps-lg-1  ltr:lg:pl-3 rtl:lg:pr-3">
                                        <h3 className="mb-4 text-xl fw-bold text-heading">
                                            Order Details
                                        </h3>
                                        <div>
                                            <p className="mt-2 d-flex text-body-dark">
                                                <strong className="w-100 fs-6  text-sm fw-semibold text-heading">
                                                    Name
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4 ">
                                                    {userData?.name}
                                                </span>
                                            </p>

                                            <p className="mt-2 d-flex text-body-dark">
                                                <strong className="w-100 text-sm fw-semibold text-heading fs-6">
                                                    Total Item
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4 ">
                                                    {productList?.length} Item
                                                </span>
                                            </p>
                                            {/* {!isEmpty(order?.delivery_time) && ( */}
                                            <p className="mt-2 d-flex text-body-dark d-none">
                                                <strong className="w-100 text-sm fw-semibold text-heading fs-6">
                                                    Delivery Time
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4 ">
                                                    10:00 pm
                                                </span>
                                            </p>
                                            {/* )} */}
                                            {/* {!isEmpty(order?.shipping_address) && ( */}
                                            <p className="mt-2 d-flex text-body-dark ">
                                                <strong className="w-100 text-sm fw-semibold text-heading fs-6">
                                                    Shipping Address
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4 ">
                                                    {orderData?.shipping_address?.address + ',' + orderData?.shipping_address?.city_name + ',' + orderData?.shipping_address?.state_name + ',' + orderData?.shipping_address?.country_name}
                                                </span>
                                            </p>
                                            {/* )} */}
                                            {/* {!isEmpty(order?.billing_address) && ( */}
                                            <p className="mt-2 d-flex text-body-dark ">
                                                <strong className="w-100 text-sm fw-semibold text-heading fs-6">
                                                    Billing Address
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4">
                                                    {userData?.address}
                                                </span>
                                            </p>
                                            {/* )} */}
                                        </div>
                                    </div>
                                    {/* end of order details */}
                                </div>
                                <div className="mt-5">
                                    {/* <OrderItems products={order?.products} orderId={order?.id} /> */}

                                    {/* <div className="my_orderlist d-none">
                                        <DataTable value={productList} loading={isLoading} paginator rows={5} tableStyle={{ minWidth: '60rem' }}>
                                            <Column header={t("Image")} body={imageBodyTemplate}></Column>
                                            <Column header={t("Quantity")} body={nameBodyTemplate}></Column>
                                            <Column header={t("Quantity")} body={nameBodyTemplate}></Column>
                                            <Column header={t("Price")} body={priceBodyTemplate}></Column>
                                            <Column header={t("Status")} body={statusBodyTemplate}></Column>
                                        </DataTable>
                                    </div> */}

                                    {
                                        productList?.map((product, index) => (
                                            <div className='card p-3 mb-3' key={index}>
                                                <div className='row align-items-center'>
                                                    <div className='col-xl-4 col-sm-6'>
                                                        <div className='d-sm-flex align-items-center'>
                                                            <div className=' mb-sm-auto mb-3'>
                                                                <img src={product?.product?.product_image_medium} className=" orde_img rounded object-fit-contain   bg-white" />
                                                            </div>
                                                            <div className='mx-sm-3'>
                                                                <h4 className='text-capitalize complete_2 lh-base'>{product?.product?.product_name}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-xl-3 col-sm-2 mb-sm-0 mb-3 d-sm-flex justify-content-center'>
                                                        <h4>{JSON.parse(product?.quantity)} {t("QTY")}</h4>
                                                    </div>
                                                    <div className='col-sm-2 mb-sm-0 mb-3 d-sm-flex  justify-content-center'>
                                                        <h4>{t("QAR")} {product?.product?.product_price}</h4>
                                                    </div>
                                                    <div className='col-xl-3 col-sm-2 mb-sm-0 mb-3  d-sm-flex justify-content-center'>
                                                        <div className=''>
                                                            <p className='mb-0 cursor-pointer foot-cat' onClick={() => { setProductId(product?.product?.id); toggle() }}>Write a Review</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>

                                {/* <div>
                        <h2 className="mt-5 mb-4 text-xl fw-bold text-heading">
                        text-sub-orders
                        </h2>
                        <div>
                        <div className="mb-5 d-flex align-items-start rounded border border-secondary p-4">
                            <span className="mt-0.5 d-flex h-4 w-4 align-items-center justify-content-center rounded-sm bg-dark px-2 ltr:mr-3 rtl:ml-3">
                            <CheckMark className="h-2 w-2 shrink-0 text-light" />
                            </span>
                            <p className="text-sm text-heading">
                            <span className="fw-bold">text-note:</span>{' '}
                            message-sub-order
                            </p>
                        </div>
                        {Array.isArray(order?.children) && order?.children.length && (
                            <div className="">
                            <SuborderItems items={order?.children} />
                            </div>
                        )}
                        </div>
                    </div> */}



                                {/* <h2 className="mt-5 mb-5 text-xl fw-bold text-heading">
                        common:text-purchase-note
                        </h2>
                        <div className="mb-5 d-flex align-items-start rounded border border-secondary bg-gray-100 p-4">
                        <p className="text-sm text-heading">{"order?.note"}</p>
                        </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </CommonLayout>
        </div>
    )
}

// OdreDetails.getLayout = getLayout;

export default OdreDetails;
