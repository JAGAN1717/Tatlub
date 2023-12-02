import React, { useContext, useEffect, useState } from "react";
import CommonLayout from '../../components/shop/common-layout';
import { getSubscription } from "../../components/core/plans_request";
import authendiacte from "../../components/auth/AuthContex";
import auth from "../../components/auth/auth";
import { useRouter } from "next/router";
import Seo from '../../seo/seo'
import { useTranslation } from "react-i18next";
import Link from "next/link";
import moment from 'moment/moment';


const SubscriptionList = () => {
    const { t } = useTranslation();
    const [Loading, setLoading] = useState(false)
    const [url, setUrl] = useState();

    const [list, setlist] = useState([])
    const { userData } = useContext(authendiacte)
    const router = useRouter()
    const fetchSubList = async () => {
        setLoading(true)
        let id = userData?.id
        getSubscription(id).then(res => {
            if (res.data.length == 0) {
                router.push('/plans')
            }
            setlist(res.data)
            setLoading(false)
        }).catch(err => {
            console.log('err', err.message)
            router.push('/plans')
            setLoading(false)
        })

    }


    useEffect(() => {
        fetchSubList();
    }, [])

    return (<>
        <CommonLayout>
            <Seo title={`My Subscription`} />
            <section>
                <div className="container">
                <div className="mb-4 mt-3">
                    {
                        Loading ?
                            <div className="my-3">
                                <div className="loader-wrapper2 rounded-4">
                                    {url === "Christmas" ? (
                                        <div id="preloader"></div>
                                    ) : (
                                        <div className="loader"></div>
                                    )}
                                </div>
                            </div> :
                            list?.length > 0 ?
                                <div className="sub_CardList">
                                    <div className="d-sm-flex justify-content-between align-items-center">
                                        <div className="text-center mb-3">
                                            <h2 className="fs-25 complete_1 mb-0">{t('Subscription List')}</h2>
                                        </div>
                                        <div className="mb-3 text-center">
                                            <Link href={'/plans'} >
                                                <button type="button" className="btn btn_filter1 text-truncate rounded-5  fs-15 px-4 mb-0">{t("Add Addons")}</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row wrapper mb-3 d-none">
                                        {
                                            list?.map((data, index) => (
                                                <div className="col-lg-3 col-md-4 col-sm-6 mb-3 " key={index}>
                                                    <div className="card">
                                                        <svg version="1.0" id="Layer_1" className="icon icon-like" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                                                            viewBox="0 0 64 64" enable-background="new 0 0 64 64" space="preserve">
                                                            <g>
                                                                <path fill="#231F20" d="M62.828,37.172L48.347,22.69l0.012,0.011C48.764,21.201,49,19.629,49,18c0-9.94-8.059-18-18-18
                                                            c-1.663,0-3.266,0.244-4.793,0.666C25.557,0.236,24.791,0,24,0H4C1.791,0,0,1.791,0,4v20c0,1.061,0.422,2.078,1.172,2.828l36,36
                                                            C37.952,63.609,38.977,64,40,64s2.048-0.391,2.828-1.172l20-20C64.391,41.267,64.391,38.733,62.828,37.172z M31,2.001
                                                            c8.837,0,16,7.163,16,16c0,1.003-0.117,2.088-0.295,3.048l-1.77-1.77l-0.024-0.025C44.949,18.855,45,18.383,45,18.001
                                                            c0-7.731-6.268-14-14-14c-0.432,0-0.856,0.026-1.278,0.064c-0.82,0.074-1.616,0.228-2.391,0.438
                                                            c-3.525,0.955-6.49,3.249-8.327,6.308c-0.345,0.573-0.66,1.165-0.921,1.788C17.387,14.262,17,16.086,17,18.001
                                                            c0,0.617,0.131,1.817,0.131,1.817S16.396,20,16,20c-0.303,0-0.595-0.04-0.878-0.104c-0.033-0.008-0.038-0.008,0,0
                                                            C15.049,19.273,15,18.644,15,18.001c0-2.118,0.421-4.134,1.168-5.983c0.268-0.662,0.577-1.299,0.927-1.913
                                                            c1.899-3.337,4.963-5.915,8.64-7.198c0.72-0.252,1.458-0.461,2.221-0.607C28.941,2.108,29.958,2.001,31,2.001z M42.965,17.309
                                                            L31.692,6.036C37.765,6.383,42.617,11.235,42.965,17.309z M20,16c0,0.991-0.371,1.885-0.971,2.579
                                                            C19.021,18.387,19,18.197,19,18.001c0-1.301,0.213-2.55,0.596-3.724C19.848,14.801,20,15.381,20,16z M13,18
                                                            c0,0.211,0.022,0.418,0.031,0.627C12.402,17.924,12,17.018,12,16c0-1.397,0.72-2.625,1.806-3.34C13.282,14.348,13,16.141,13,18z
                                                            M61.414,41.414l-20.001,20C41.036,61.792,40.534,62,40,62s-1.036-0.208-1.414-0.586l-36-36C2.214,25.041,2,24.525,2,24V4
                                                            c0-1.104,0.897-2,2-2h18.778c-3.446,1.775-6.235,4.627-7.94,8.115C12.081,10.656,10,13.084,10,16c0,3.313,2.687,6,6,6s6-2.687,6-6
                                                            c0-1.488-0.545-2.848-1.443-3.896c1.748-3.088,4.822-5.316,8.451-5.924l32.406,32.406C61.792,38.964,62,39.466,62,40
                                                            S61.792,41.036,61.414,41.414z"/>
                                                                <path fill="#231F20" d="M50.122,37.88c-1.17-1.17-3.073-1.171-4.243-0.001l-7.984,7.984c-1.169,1.169-1.212,3.116-0.042,4.286
                                                            c1.168,1.17,3.108,1.134,4.278-0.036l7.992-7.99h-0.002C51.291,40.953,51.291,39.049,50.122,37.88z M48.707,40.709l-7.96,7.96
                                                            c-0.391,0.391-1.092,0.457-1.48,0.066c-0.391-0.391-0.34-1.074,0.051-1.465l7.976-7.976c0.391-0.391,1.023-0.391,1.414,0
                                                            C49.098,39.684,49.098,40.318,48.707,40.709z"/>
                                                                <path fill="#231F20" d="M42.122,34.124c1.17-1.17,1.17-3.074,0.001-4.243c-1.17-1.17-3.073-1.171-4.243-0.001l-7.984,7.984
                                                            c-1.169,1.169-1.212,3.116-0.042,4.286c1.168,1.17,3.108,1.134,4.278-0.036l7.992-7.99H42.122z M40.708,32.71l-7.96,7.96
                                                            c-0.391,0.391-1.092,0.457-1.48,0.066c-0.391-0.391-0.34-1.074,0.051-1.465l7.976-7.976c0.391-0.391,1.023-0.391,1.414,0
                                                            C41.099,31.685,41.099,32.319,40.708,32.71z"/>
                                                                <path fill="#231F20" d="M34.118,26.12c1.17-1.17,1.17-3.074,0.001-4.243c-1.17-1.17-3.073-1.171-4.243-0.001l-7.984,7.984
                                                            c-1.169,1.169-1.212,3.116-0.042,4.286c1.168,1.17,3.108,1.134,4.278-0.036l7.992-7.99H34.118z M32.704,24.706l-7.96,7.96
                                                            c-0.391,0.391-1.092,0.457-1.48,0.066c-0.391-0.391-0.34-1.074,0.051-1.465l7.976-7.976c0.391-0.391,1.023-0.391,1.414,0
                                                            C33.095,23.681,33.095,24.315,32.704,24.706z"/>
                                                            </g>
                                                        </svg>
                                                        <img className="person_img" src="https://d3iw72m71ie81c.cloudfront.net/male-11.jpg" alt="" />
                                                        <p className="person_name fs-5">{data?.plan?.plan_name}</p>
                                                        <p className="person_desg fs-13 text-color">{t("Expire Date")} : {data?.subscription_end_date}</p>
                                                        <div className="p-2 text-center ">
                                                            {
                                                                data?.subscriptions_with_addons?.length > 0 &&
                                                                data?.subscriptions_with_addons?.map(g => (
                                                                    <h4 className='text-dark mb-0  text-capitalize fw-bold'>{t("QAR")} {parseInt(g?.total_price ?? 0)}</h4>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className="row sub_plans">
                                        {
                                            list?.map((data, index) => (
                                                <div className="col-xl-3 col-lg-4 col-md-6 mb-3" key={index}>
                                                    <div className="border sub_card p-3">
                                                        <div className="">
                                                            <div className="mb-4 d-flex justify-content-center align-items-center">
                                                                <div className="">
                                                                    <img src="/assets/images/gold2.png" alt="" className="card__sub-img" />
                                                                </div>
                                                                <div className="ms-2">
                                                                    <h4 className="fs-23 mb-0 complete_1 fw-bold">{data?.plan?.plan_name}</h4>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-center mb-3">
                                                                <div className="d-flex align-items-center ">
                                                                    <i class="fa fa-clock-o fs-5 fw-normal text-color" aria-hidden="true"></i>
                                                                    <h4 className="fw-bold fs-17 mx-2 mb-0">{t("Start Date")} :</h4>
                                                                </div>
                                                                <div className="">
                                                                    <h4 className="fs-17  mb-0">{moment(data?.subscription_start_date).format('DD/MM/YYYY')}</h4>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-center mb-3">
                                                                <div className="d-flex align-items-center">
                                                                    <i class="fa fa-clock-o fs-5  fw-normal text-color" aria-hidden="true"></i>
                                                                    <h4 className="fw-bold fs-17 mx-2 mb-0">{t("End Date")}&nbsp;&nbsp;&nbsp;:</h4>
                                                                </div>
                                                                <div className="">
                                                                    <h4 className="fs-17  mb-0">{moment(data?.subscription_end_date).format('DD/MM/YYYY')}</h4>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4">
                                                                {
                                                                    data?.subscriptions_with_addons?.length > 0 &&
                                                                    data?.subscriptions_with_addons?.map(g => (
                                                                        <span className="btn btn_plan fs-17"  >{t("QAR")} {parseInt(g?.total_price ?? 0)}</span>
                                                                    ))
                                                                }
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                        {/* 
                                        <div className="col-lg-3 col-md-4">
                                            <div className="border rounded-4 p-3">
                                                <div className="mb-3 d-flex align-items-center">
                                                <div className="">
                                                    <img src="/assets/images/gold2.png" alt="" className="card__sub-img"/>
                                                </div>
                                                <div className="ms-2">
                                                <h4 className="fs-25 mb-0 fw-bold">Yearly Premium</h4>
                                                </div>
                                                </div>
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="d-flex align-items-center">
                                                    <i class="fa fa-clock-o fs-5 fw-normal text-color" aria-hidden="true"></i>
                                                    <h4 className="fw-bold fs-18 mx-2 mb-0">Start Date :</h4>
                                                    </div>
                                                    <div className="">
                                                        <h4 className="fs-18 mx-2">12/09/2023</h4>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="d-flex align-items-center">
                                                    <i class="fa fa-clock-o fs-5  fw-normal text-color" aria-hidden="true"></i>
                                                    <h4 className="fw-bold fs-18 mx-2 mb-0">End Date :</h4>
                                                    </div>
                                                    <div className="">
                                                        <h4 className="fs-18 mx-2">12/10/2023</h4>
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <button className="btn btn_plan" type="button" >QAR 4505</button>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>

                                </div>
                                :
                                <div className="card empty-wishlist shadow-sm p-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="fw-bold">{("MY SUBSCRIPTION")}</h4>
                                        <div className="filer-search-wicon d-none">
                                            <div className="search">
                                                <span className="fa fa-search"></span>
                                                <input placeholder="Search In This Store" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                                        <p className="text-muted text-center">{("No Data Found")}!</p>
                                    </div>
                                </div>
                    }
                </div>
                </div>

            </section>
        </CommonLayout>
    </>)
}

export default auth(SubscriptionList)