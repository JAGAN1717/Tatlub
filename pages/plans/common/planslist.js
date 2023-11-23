import React, { useEffect, useState } from "react";
import { getPlanList } from "../../../components/core/plans_request";
import { Skeleton } from "primereact/skeleton";
import { useTranslation } from "react-i18next";



const Plans = ({setselectplans}) => {
    const { t } = useTranslation();

    const [planslist,setplanslist] = useState([])
    const [losding,isLoading] = useState(true)


    const fetchPlans = async () => {
        isLoading(true)
        getPlanList().then(res => {
            setplanslist(res.data)
            isLoading(false)
        }).catch(err => {
            console.error("err",err.message)
            isLoading(false)
        })
    }

    useEffect(()=> {
        fetchPlans()
    },[])


    return(<>
    <div className="planslist mt-3 container">
       <section className="mb-4 d-flex justify-content-center ">
            <div className="row  w-100">
                {
                    planslist.length > 0 && 
                    planslist.map((data,index)=> (
                        <div className="col-xl-3 col-lg-4 col-sm-6 mb-4" key={index}>
                        <div className="card__content grid" >
                            <div className="card__pricing">
                                <div className="card__pricing-number">
                                    <span className="card__pricing-symbol">{t("QAR")} </span>{data?.plan_price}
                                <span className="card__pricing-month">/{data?.plan_type == 2 ? t('Paid'): t('Free')}</span>
                                </div>
                            </div>
                            
                            <header className="card__header">
                                <div className="card__header-circle grid">
                                    <img src="/assets/images/gold2.png" alt="" className="card__header-img"/>
                                </div>
                                
                                <span className="card__header-subtitle">{t("GET PLAN")}</span>
                                <h1 className="card__header-title">{data?.plan_name}</h1>
                            </header>
                            
                            <ul className="card__list grid">
                                <li className="card__list-item">
                                    <i className="fa fa-check card__list-icon" aria-hidden="true"></i>
                                    <p className="card__list-description mb-0">{data?.plan_features}</p>
                                </li>
                                <li className="card__list-item">
                                <i className="fa fa-check card__list-icon" aria-hidden="true"></i>
                                    <p className="card__list-description mb-0">{t("Plan Period")} : {data?.plan_period == 1 ? t('Lifetime'): data?.plan_period == 2 ? t('Monthly'):data?.plan_period == 3 ? t('Quarterly') : t('Yearly')}</p>
                                </li>
                                <li className="card__list-item">
                                <i className="fa fa-check card__list-icon" aria-hidden="true"></i>
                                    <p className="card__list-description mb-0">{t("Featured Listing")} : {data?.plan_max_featured_listing ?? 0}</p>
                                </li>
                                <li className="card__list-item">
                                <i className="fa fa-check card__list-icon" aria-hidden="true"></i>
                                    <p className="card__list-description mb-0">{t("Read all Leads")}</p>
                                </li>
                            </ul>
            
                            <button className="card__button" onClick={()=>setselectplans(data)}>{t("Choose this plan")}</button>
                        </div>
                        </div>
                    ))
                }
              
                {/* 
                <article className="card__content grid">
                    <div className="card__pricing">
                        <div className="card__pricing-number">
                            <span className="card__pricing-symbol">$</span>29
                        <span className="card__pricing-month">/month</span>
                        </div>
                    </div>
    
                    <header className="card__header">
                        <div className="card__header-circle grid">
                            <img src="assets/img/enterprise-coin.png" alt="" className="card__header-img"/>
                        </div>
    
                        <span className="card__header-subtitle">For agencies</span>
                        <h1 className="card__header-title">Enterprise</h1>
                    </header>
                    
                    <ul className="card__list grid">
                        <li className="card__list-item">
                            <i className="uil uil-check card__list-icon"></i>
                            <p className="card__list-description">Unlimited  user request</p>
                        </li>
                        <li className="card__list-item">
                            <i className="uil uil-check card__list-icon"></i>
                            <p className="card__list-description">Unlimited downloads</p>
                        </li>
                        <li className="card__list-item">
                            <i className="uil uil-check card__list-icon"></i>
                            <p className="card__list-description">Unlock all features from our site</p>
                        </li>
                        <li className="card__list-item">
                            <i className="uil uil-check card__list-icon"></i>
                            <p className="card__list-description">Daily content updates</p>
                        </li>
                        <li className="card__list-item">
                            <i className="uil uil-check card__list-icon"></i>
                            <p className="card__list-description">Fully editable files</p>
                        </li>
                    </ul>
    
                    <button className="card__button">Choose this plan</button>
                </article> */}

            </div>
        </section>
                {
                    losding && 
                    <div className="d-flex justify-conetent-center">
                    <div className="row  w-100">
                   <div className="col-xl-3 col-lg-4 col-sm-6 mb-4">
                      <Skeleton
                          className="rounded-3"
                          width={330}
                          height={389}
                          shape="rectangle"
                        />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 mb-4">
                      <Skeleton
                          className="rounded-3"
                          width={330}
                          height={389}
                          shape="rectangle"
                        />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 mb-4">
                      <Skeleton
                          className="rounded-3"
                          width={330}
                          height={389}
                          shape="rectangle"
                        />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 mb-4">
                      <Skeleton
                          className="rounded-3"
                          width={330}
                          height={389}
                          shape="rectangle"
                        />
                    </div>
                    </div>
                    </div>
                }

        {
            planslist.length == 0 || !planslist && 
            <div className="card empty-wishlist shadow-sm p-4">
            <div className="d-flex align-items-center justify-content-between">  
            <h4 className="fw-bold">{t("MY PLANS")}</h4> 
                      <div className="filer-search-wicon d-none">
                         <div className="search">
                           <span className="fa fa-search"></span>
                           <input placeholder="Search In This Store"/>
                         </div>
                      </div>
                  </div>

             
                <div className="text-center">
                    <img src="/assets/images/tatlub-img/not_Found.png"  className=""/>
                    <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                </div>
            </div>
        }
    </div>
    </>)
}

 
export default Plans