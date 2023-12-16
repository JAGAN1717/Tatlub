import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useRouter } from 'next/router';
import moment from 'moment/moment';
// import Authcontex from '../../../components/auth/auth';
import { Tag } from 'primereact/tag';
import { useTranslation } from "react-i18next";
import CommonLayout from '../../../components/shop/common-layout';
import Usercontex from '../../../components/auth/AuthContex';
import authenticated from '../../../components/auth/auth';
import { UpdateStatus, getOrderStatus, getOrderDetails } from '../../../components/core/Order_request';
import { ToastContainer, toast } from "react-toastify";



function ManageOrderInfo({ orderD }) {

    const [activeIndex, setActiveIndex] = useState(0);
    const { t } = useTranslation();

    const router = useRouter()
    const { id } = router.query

    const [orderData, setOrderdata] = useState(orderD)
    const { userData } = useContext(Usercontex);
    const [isLoading, setIsLoading] = useState(false);
    const [productList, setproductList] = useState([]);
    const [OrderId, setOrderId] = useState(null);
    const [Status, setStatus] = useState([]);


    // useEffect(()=> { 
    //  const status = parseInt(orderData?.order_details[0]?.delivery_status) - 1
    //     setActiveIndex(status)
    // },[orderData?.order_details[0]?.delivery_status])

    // useEffect(()=> {
    //     if(orderData?.product){
    //         setproductList(orderData?.order_details)
    //     }
    // },[orderData]) 




    const handleStatusChange = (status) => {
        let body = {
            "status": status,
            "order_id": OrderId
        }
        UpdateStatus(body).then(res => {
            FetchOrderDetails()
            toast.info("STATUS UPDATED", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                icon: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setIsLoading(false)
        }).catch(err => setIsLoading(false))
    }


    const FetchOrderDetails = () => {
        setIsLoading(true)
        const sId = userData?.id
        const ids = id
        getOrderDetails(ids, sId).then(res => {
            // console.log("skdhsgddkskd",res.data)
            setOrderdata(res.data?.order)
            const productNull = res.data?.order_detail?.filter(e => e.product != null)
            setproductList(productNull)
            setIsLoading(false)
        }).catch(err => setIsLoading(false))
    }


    const orderStatus = async () => {
        setIsLoading(true)
        getOrderStatus().then(res => {
            setStatus(res.data)
            setIsLoading(false)
        }).catch(err => {
            console.error("err", err.message)
            setIsLoading(false)
        })
    }


    useEffect(() => {
        FetchOrderDetails();
        orderStatus()
    }, [id])



    const steps = [
        'Pending',
        'Processing',
        'At Local Facility',
        'Out For Delivery',
        'Completed'
    ];

    const getSeverity = (product) => {

        // switch (product?.product?.product_status ?? 1) {
            switch (product ?? 1) {
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
        // switch (product?.product?.product_status ?? 1) {
            switch (product ?? 1) {
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
        <CommonLayout>
            <div>
                <div className='container mx-auto my-4'>
                    {
                        isLoading ? (
                            <div className="my-3 container">
                                <div className="loader-wrapper2 rounded-4">
                                    <div className="loader"></div>
                                </div>
                            </div>
                        ) : productList?.length > 0 ?
                            <div className='px-xl-5'>
                                <div className="position-relative overflow-hidden rounded-3 border shadow-sm mb-5">

                                    <div className={`order-2 d-sm-flex w-100 gap-6  justify-content-between flex-nowrap sm:order-1 p-3`} >
                                        <div className="d-flex  align-items-center mb-sm-auto mb-2">
                                            <span className=" fw-semibold d-block text-nowrap fs-5 text-xs xs:text-base mb-lg-0 d-lg-inline me-lg-4 lg:ltr:mr-4 lg:rtl:ml-4">
                                                {t("Order Status")} :
                                            </span>
                                            <div className="w-100 lg:w-auto mx-lg-auto mx-2">
                                                {/* {getSeverity2(orderData?.delivery_status) ?? 'Order Processing'} */}
                                                <Tag value={t(getSeverity2(productList[0]?.order_status))} severity={getSeverity(productList[0]?.order_status)}></Tag>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <span className=" d-block fw-semibold text-nowrap fs-5 text-xs xs:text-base lg:mb-0 d-lg-inline me-lg-4 lg:ltr:mr-4 lg:rtl:ml-4">
                                                {t("Payment Status")} :
                                            </span>
                                            <div className="w-100  lg:w-auto fs-5 mx-lg-auto mx-2">
                                                {t("COD")}
                                                {/* {orderData?.payment_status} */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-light p-4">
                                        <div className="mb-4 row d-none">
                                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>
                                                <div className="rounded border border-border-200  px-3 py-3 shadow-sm">
                                                    <h3 className="mb-2 text-sm fw-semibold text-heading">
                                                        {t("Order Number")}
                                                    </h3>
                                                    <p className="text-sm text-dark">
                                                        {orderData?.unique_id ?? orderData?.unique_id}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>

                                                <div className="rounded border border-border-200 px-3 py-3 shadow-sm">
                                                    <h3 className="mb-2 text-sm fw-semibold text-heading">
                                                        {t("Date")}
                                                    </h3>
                                                    <p className="text-sm text-body-dark">
                                                        {moment(orderData?.created_at ?? '', 'YYYY-MM-DD HH:mm:ss').format('MMMM D, YYYY')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>

                                                <div className="rounded border border-border-200 px-3 py-3 shadow-sm">
                                                    <h3 className="mb-2 text-sm fw-semibold text-heading">
                                                        {t("Total")}
                                                    </h3>
                                                    <p className="text-sm text-body-dark">{orderData?.total && "QAR " + parseInt(orderData?.total) + '.00'}</p>
                                                </div>
                                            </div>
                                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3'>

                                                <div className="rounded border border-border-200 px-3 py-3 shadow-sm">
                                                    <h3 className="mb-2 text-sm fw-semibold text-heading">
                                                        {t("Payment Method")}
                                                    </h3>
                                                    <p className="text-sm text-body-dark">
                                                        {t("CASH_ON_DELIVERY")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end of order received  */}

                                        {/* start of order Status */}
                                        <div className="mb-5  w-100 align-items-center justify-content-center d-none">
                                            <div className="d-none d-sm-block">
                                                <Box sx={{ width: '100%' }}>
                                                    <Stepper activeStep={activeIndex} orientation='horizontal' alternativeLabel sx={{ direction: 'ltr' }}>
                                                        {steps.map((label, index) => (
                                                            <Step key={label}>
                                                                <StepLabel><span className={`fw-bold text-uppercase  ${activeIndex == index ? 'text-color' : 'text-dark'}`}>{label}</span></StepLabel>
                                                            </Step>
                                                        ))}
                                                    </Stepper>
                                                </Box>
                                            </div>

                                            <div className="d-sm-none">
                                                <Box sx={{ width: '100%' }}>
                                                    <Stepper activeStep={activeIndex} orientation='vertical' sx={{ direction: 'ltr' }}>
                                                        {steps.map((label, index) => (
                                                            <Step key={label}>
                                                                <StepLabel><span className={`fw-bold text-uppercase  ${activeIndex == index ? 'text-color' : 'text-dark'}`}>{label}</span></StepLabel>
                                                            </Step>
                                                        ))}
                                                    </Stepper>
                                                </Box>
                                            </div>
                                        </div>
                                        {/* end of order Status */}

                                        <div className="d-flex flex-column flex-lg-row ">
                                            <div className="mb-5 w-100 lg:mb-0 lg:w-1/2 pe-lg-3 ltr:lg:pr-3 rtl:lg:pl-3">
                                                <h3 className="mb-4 fs-20 fw-bold text-heading">
                                                    {t("Total Amount")}
                                                </h3>
                                                <div>
                                                    <p className="mt-2 d-flex text-body-dark">
                                                        <strong className="w-100 fs-18 text-sm fw-semibold text-heading sm:w-50">
                                                            {t("Sub Total")}
                                                        </strong>
                                                        :
                                                        <span className="w-100 text-sm ltr:pl-4 fs-18 ps-4 rtl:pr-4 sm:w-50 text-secondary ">
                                                            {parseInt(orderData?.subtotal ?? 0) + ".00"} {t("QAR")}
                                                        </span>
                                                    </p>
                                                    {/* <p className="mt-2 d-flex text-body-dark">
                                                <strong className="w-100 fs-6  text-sm fw-semibold text-heading sm:w-50">
                                                    Shipping Charge
                                                </strong>
                                                :
                                                <span className="w-100 text-sm ltr:pl-4 ps-4 rtl:pr-4 sm:w-50 ">
                                                {parseInt(orderData?.shipping_cost ?? 0) + ".00"} {t("QAR")}
                                                </span>
                                            </p> */}
                                                    <p className="mt-2 d-flex text-body-dark">
                                                        <strong className="w-100 fs-18  text-sm fw-semibold text-heading sm:w-50">
                                                            {t("Tax")}
                                                        </strong>
                                                        :
                                                        <span className="w-100 text-sm ltr:pl-4 fs-18 ps-4 rtl:pr-4 sm:w-50 text-secondary">
                                                            {parseInt(orderData?.tax ?? 0) + ".00"} {t("QAR")}
                                                        </span>
                                                    </p>
                                                    <p className="mt-2 d-flex text-body-dark">
                                                        <strong className="w-100 fs-18  text-sm fw-semibold text-heading sm:w-50">
                                                            {t("Discount")}
                                                        </strong>
                                                        :
                                                        <span className="w-100 text-sm ltr:pl-4 fs-18 ps-4 rtl:pr-4 sm:w-50 text-secondary ">
                                                            {parseInt(orderData?.discount ?? 0) + ".00"}
                                                        </span>
                                                    </p>
                                                    <p className="mt-2 d-flex text-body-dark">
                                                        <strong className="w-100  fs-18  text-sm fw-semibold text-heading sm:w-50">
                                                            {t("Total")}
                                                        </strong>
                                                        :
                                                        <span className="w-100 text-sm ltr:pl-4 fs-18 ps-4 rtl:pr-4 sm:w-50 text-secondary">
                                                            {parseInt(orderData?.total ?? 0) + ".00"} {t("QAR")}
                                                        </span>
                                                    </p>

                                                </div>
                                            </div>
                                            {/* end of total amount */}

                                            <div className="w-100 lg:w-1/2 ps-lg-1  ltr:lg:pl-3 rtl:lg:pr-3">
                                                <h3 className="mb-4 text-xl fs-20 fw-bold text-heading">
                                                    {t("Order Details")}
                                                </h3>
                                                <div>
                                                    <p className="mt-2 d-flex text-body-dark">
                                                        <strong className="w-100 fs-18  text-sm fw-semibold text-heading">
                                                            {t("Name")}
                                                        </strong>
                                                        :
                                                        <span className="w-100 text-sm ltr:pl-4 fs-18 ps-4 rtl:pr-4 text-secondary">
                                                            {orderData?.user?.name}
                                                        </span>
                                                    </p>

                                                    <p className="mt-2 d-flex text-body-dark">
                                                        <strong className="w-100 text-sm fw-semibold text-heading fs-18">
                                                            {t("Total Item")}
                                                        </strong>
                                                        :
                                                        <span className="w-100 text-sm ltr:pl-4 fs-18 ps-4 rtl:pr-4 text-secondary">
                                                            {orderData?.order_details?.length} Item
                                                        </span>
                                                    </p>
                                                    {/* {!isEmpty(order?.delivery_time) && ( */}
                                                    <p className="mt-2 d-flex text-body-dark d-none">
                                                        <strong className="w-100 text-sm fw-semibold text-heading fs-18">
                                                            {t(" Delivery Time")}
                                                        </strong>
                                                        :
                                                        <span className="w-100 text-sm ltr:pl-4 fs-18 ps-4 rtl:pr-4 text-secondary">
                                                            10:00 pm
                                                        </span>
                                                    </p>
                                                    {/* )} */}
                                                    {/* {!isEmpty(order?.shipping_address) && ( */}
                                                    <p className="mt-2 d-flex text-body-dark">
                                                        <strong className="w-100 text-sm fw-semibold text-heading fs-18">
                                                            {t("Shipping Address")}
                                                        </strong>
                                                        :
                                                        <span className="w-100 text-sm ltr:pl-4 fs-18 ps-4 rtl:pr-4 text-secondary">
                                                            {orderData?.shipping_address?.address + ',' + orderData?.shipping_address?.city_name + ',' + orderData?.shipping_address?.state_name + ',' + orderData?.shipping_address?.country_name}
                                                        </span>
                                                    </p>
                                                    {/* )} */}
                                                    {/* {!isEmpty(order?.billing_address) && ( */}
                                                    <p className="mt-2 d-flex text-body-dark ">
                                                        <strong className="w-100 text-sm fw-semibold text-heading fs-18">
                                                            {t("Billing Address")}
                                                        </strong>
                                                        :
                                                        <span className="w-100 text-sm ltr:pl-4 fs-18 ps-4 rtl:pr-4 text-secondary">
                                                            {orderData?.user?.address}
                                                        </span>
                                                    </p>
                                                    {/* )} */}
                                                </div>
                                            </div>
                                            {/* end of order details */}
                                        </div>
                                        <div className="mt-5">
                                            {/* <OrderItems products={order?.products} orderId={order?.id} /> */}

                                            {
                                                productList?.map((product, index) => (
                                                    // <div className='card p-3 mb-3' key={index}>
                                                    //     <div className='row align-items-center'>
                                                    //         <div className='col-xl-4 col-sm-6'>
                                                    //             <div className='d-sm-flex align-items-center'>
                                                    //                 <div className=' mb-sm-auto mb-3'>
                                                    //                     <img src={product?.product?.product_image_medium} className=" orde_img rounded object-fit-contain   bg-white" />
                                                    //                 </div>
                                                    //                 <div className='mx-sm-3'>
                                                    //                     <h4 className='text-capitalize complete_2 lh-base'>{product?.product?.product_name}</h4>
                                                    //                 </div>
                                                    //             </div>
                                                    //         </div>
                                                    //         <div className='col-xl-3 col-sm-2 mb-sm-0 mb-3 d-sm-flex justify-content-center'>
                                                    //             <h4>{JSON.parse(product?.quantity)} {t("QTY")}</h4>
                                                    //         </div>
                                                    //         <div className='col-sm-2 mb-sm-0 mb-3 d-sm-flex  justify-content-center'>
                                                    //             <h4>{t("QAR")} {product?.product?.product_price}</h4>
                                                    //         </div>
                                                    //         <div className='col-xl-3 col-sm-2 mb-sm-0 mb-3  d-sm-flex justify-content-center'>
                                                    //             <div className=''>

                                                    //                 <div onClick={() => setOrderId(product?.id)} >
                                                    //                     <select class="form-select fs-5 p-3 w-100" value={product?.order_status ?? '0'} onChange={(e) => {  handleStatusChange(e.target.value) }} aria-label="Default select example">
                                                    //                         {
                                                    //                             Status?.map((data, i) => (
                                                    //                                 <option className='text-capitalize' value={data?.id} key={i}>{t(data?.name)}</option>
                                                    //                             ))
                                                    //                         }
                                                    //                     </select>
                                                    //                 </div>
                                                    //             </div>
                                                    //         </div>
                                                    //     </div>
                                                    // </div>
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
                                                                <div className='w-100'>
                                                                    <div className="w-100" onClick={() => setOrderId(product?.id)} >
                                                                        <select class="form-select fs-5 p-3 w-100" value={product?.order_status ?? '0'} onChange={(e) => { handleStatusChange(e.target.value) }} aria-label="Default select example">
                                                                            {
                                                                                Status?.map((data, i) => (
                                                                                    <option className='text-capitalize' value={data?.id} key={i}>{t(data?.name)}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>

                                </div>
                            </div> :
                            <div className="text-center">
                                <img src="/assets/images/tatlub-img/not_Found.png" className="w-50" />
                                <p className="text-muted">{("Order Not Found!")}</p>
                            </div>
                    }
                </div>
            </div>
        </CommonLayout>
    )
}


export default authenticated(ManageOrderInfo)