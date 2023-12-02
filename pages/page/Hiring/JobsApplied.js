import React, { useState, useEffect, useContext } from 'react';
import CommonLayout from '../../../components/shop/common-layout'
import Category from './common/Category'
import { getappliedJobs, getJobApplylist } from '../../../components/core/realestate_request';
import AuthContex from '../../../components/auth/AuthContex'
import { useRouter } from 'next/router';
import Seo from "../../../seo/seo";
import { useTranslation } from "react-i18next";
import { DataGrid, GridToolbarExport, GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import moment from 'moment';
import Link from 'next/link';


function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const SelectCategory = () => {
    const { t } = useTranslation();

    const router = useRouter()
    const [appliedjobs, setAppliedJons] = useState([])
    const [Loading, setLoading] = useState(false)
    const [url, setUrl] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { userData } = useContext(AuthContex)

    const columns = [
        // { field: "id", headerName: "ID",
        //  width: 100 
        // },
        {
            field: "name",
            headerName: "First name",
            width: 150,
            editable: true
        },
        {
            field: "email",
            headerName: "Email",
            width: 161,
            sortable: false,
            editable: true
        },
        {
            field: "phone",
            headerName: "Mobile Number",
            width: 150,
            sortable: false,
            editable: true
        },
        {
            field: "item_title",
            headerName: "Job Title",
            width: 200,
            sortable: false,
            editable: true,
            filter: false
        },
        {
            field: "position",
            headerName: "Position",
            width: 150,
            sortable: false,
            editable: true
        },
        {
            field: "experience",
            headerName: "Experience",
            width: 100,
            sortable: false,
            editable: true
        },
        {
            field: "qualification",
            headerName: "Qualification",
            width: 100,
            sortable: false,
            editable: true
        },
        {
            field: "created_at",
            headerName: "Applied Date",
            width: 200,
            editable: true,
            renderCell: (params) => {
                let day = moment(params?.value);
                dayjs.extend(relativeTime);
                dayjs.extend(utc);
                dayjs.extend(timezone);
                // return <span>{dayjs.utc(day).tz(dayjs.tz.guess()).fromNow()}</span>
                return <span>{moment(day).format('MMM d')}</span>
            }
            // valueGetter: (params) =>
            //    params
        },
        {
            field: "image",
            headerName: "Download",
            width: 150,
            sortable: false,
            editable: true,
            renderCell: (params) => {
                return (
                    // <button type='button' className='btn btn-theme rounded'>Click</button>
                    <div onClick={() => window.open(params?.value, '_blank')} >
                        <i class="fa fa-cloud-download fs-4 foot-cat cursor-pointer  me-2 " aria-hidden="true"></i>
                    </div>
                )
            }
        },
    ]

    const { applyJobs } = router.query

    const fetchAppliedJobs = () => {
        setIsLoading(true)
        let id = userData?.id
        getappliedJobs(id).then(res => {
            setAppliedJons(res.data)
            setIsLoading(false)
        }).catch(err => { console.error('err', err.message); setIsLoading(false) })
    }

    const fetchAppliedJobs2 = () => {
        setIsLoading(true)
        let id = userData?.id
        getJobApplylist(id).then(res => {
            setAppliedJons(res.data)
            setIsLoading(false)
        }).catch(err => { console.error('err', err.message); setIsLoading(false) })
    }

    const exportOrder = () => {
        const workbook = XLSX.utils.book_new();

        const sheet = XLSX.utils.json_to_sheet(appliedjobs);

        XLSX.utils.book_append_sheet(workbook, sheet, 'Applied list');

        XLSX.writeFile(workbook, 'exported_jobs.xlsx');
    }


    useEffect(() => {
        !applyJobs && fetchAppliedJobs()
        applyJobs && fetchAppliedJobs2()
    }, [applyJobs])




    return (
        <CommonLayout parent="home" title="Select Category">
            <Seo title={`Jobs`} />

            {applyJobs ?
                <div className='mb-4 mt-4' >
                    {
                        isLoading ? (
                            <div className="my-3">
                                <div className="container">
                                    <div className="loader-wrapper2 rounded-4 mt-4 mb-4">
                                        {url === "Christmas" ? (
                                            <div id="preloader"></div>
                                        ) : (
                                            <div className="loader"></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : appliedjobs?.length > 0 ?
                            <div className='container '>
                                {/* <div className='applied-job row justify-content-start mb-3'> */}
                                <div className='card  rounded-4 border-0  p-4 '>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <h4 className="fw-bold fs-4">{t("My Job")}</h4>
                                    </div>

                                    <div className='row mt-3 px-1 mb-3'>
                                        {
                                            // appliedjobs?.map((data, index) => (
                                            //     <div class="card border-0 col-md-4   col-sm-6 mb-2" key={index}>
                                            //         <div class="card-body">
                                            //             <div class="card-company-fit row mb-3">
                                            //                 <div className='col-lg-5 mb-lg-0 mb-2'>
                                            //                     <img className='w-100 h-100'
                                            //                         src=""
                                            //                         onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                                            //                     />
                                            //                 </div>

                                            //                 <div className='col '>
                                            //                     <h5 class="card-title text-capitalize complete_1  job-title">{data?.name}</h5>
                                            //                     <div class=" mt-3">
                                            //                         <div className='d-flex mb-3'>
                                            //                             <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                            //                             <h4 className='ms-2'> {data?.email}</h4>
                                            //                         </div>
                                            //                         <div className='d-flex '>
                                            //                             <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                            //                             <h4 className='ms-2 text-capitalize complete_2'>{data?.position}</h4>
                                            //                         </div>
                                            //                     </div>
                                            //                 </div>
                                            //             </div>


                                            //             <div class="card-job-details mb-3">
                                            //                 <div className='d-flex align-items-center'>
                                            //                     {data?.item_address && <i class="fa fa-map-marker text-color fs-18" aria-hidden="true"></i>}
                                            //                     <h3 className='ms-2 mb-0 complete_2 text-capitalize'>{data?.item_address ?? data?.item_location_str}</h3>
                                            //                 </div>
                                            //             </div>

                                            //             <div class="skills-container">

                                            //                 <div id="stats" className='row w-100 text-center'>
                                            //                     <div class="col">
                                            //                         <p class="stat ">{data?.experience}</p>
                                            //                         <p class="label ">{t("Experience")}</p>
                                            //                     </div>
                                            //                     <div class="col">
                                            //                         <p class="stat text-uppercase complete_1 ">{data?.qualification}</p>
                                            //                         <p class="label ">{t("Qualification")}</p>
                                            //                     </div>
                                            //                     <div class="col">
                                            //                         <p class="stat ">{data?.year_of_passed_out ?? '_'}</p>
                                            //                         <p class="label ">{t("Year")}</p>
                                            //                     </div>
                                            //                 </div>
                                            //                 {
                                            //                     !applyJobs &&
                                            //                     <div className='d-flex justify-content-end'>
                                            //                         <button type='button' disabled={!data?.image} onClick={() => window.open(data?.image, '_blank')} className="btn send_enquery_btn mt-3" >
                                            //                             {t("View Resume")}
                                            //                         </button>
                                            //                     </div>
                                            //                 }
                                            //             </div>
                                            //         </div>
                                            //     </div>
                                            // ))
                                            appliedjobs?.map((data, index) => {
                                                let day = moment(data?.created_at);
                                                let fromhour = moment.utc(day).local().startOf('seconds').fromNow()

                                                return (
                                                    <div className='col-xl-6 mb-4 ' key={index}>
                                                        <div className='listing_card bg-light d-flex flex-column justify-content-between h-100'>
                                                            <div>
                                                                <div className='row align-items-center mb-3'>
                                                                    <div className='col-md-3 mb-2'>
                                                                        <Link href={{
                                                                            pathname: `/page/Hiring/details/${data?.item_slug}`,
                                                                            //  query: { 'id': data?.id } 
                                                                        }} >
                                                                            <img src={''} onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")} className='company-img cursor-pointer' />
                                                                        </Link>
                                                                    </div>
                                                                    <div className='col-md-9'>
                                                                        <div className='d-sm-flex justify-content-between'>
                                                                            <div className=''>
                                                                                <Link href={{
                                                                                    pathname: `/page/Hiring/details/${data?.item_slug}`,
                                                                                    // query: { 'id': data?.id }
                                                                                }}  >
                                                                                    <h4 className='fw-bold complete_2 cursor-pointer foot-cat text-capitalize mb-2'>{'Imran Software Solution'}</h4>
                                                                                </Link>
                                                                                <p className='text-capitalize'>{data?.position}</p>
                                                                                <p className='text-muted mb-0 d-flex align-items-center'> <img src='/assets/images/tatlub-img/Companies/Icons/_Location.png' className='locaList-img me-2' /><span className="complete_2">{data?.item_address ?? data?.item_location_str ?? 'P.O. Box 18109, 1st Floor Tata Showroom Building Azizia Salwa Road.'}</span></p>
                                                                            </div>
                                                                            <div className='d-none'>
                                                                                <div className="d-flex profile-share_mobile">
                                                                                    <div
                                                                                        role="button"
                                                                                        data-bs-toggle="modal"
                                                                                        data-bs-target={"#delete_confirm_popup12212"}
                                                                                    ><div className="like_profile me-2 cursor-pointer"><img className="icon_ls" src="/assets/images/tatlub-img/Companies/Icons/_Share active.png" /></div></div>
                                                                                    {/* <div> <div className="share_profile me-2 cursor-pointer "><img className="icon_ls" src="/assets/images/tatlub-img/Companies/Icons/_Fav.png" /></div></div> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='row justify-content-start align-items-center pq-img'>
                                                                    <div className="col px-1">
                                                                        <div className='d-flex  justify-content-center align-items-center mx-sm-2 listing-tags  mb-3'>
                                                                            <img src='/assets/images/tatlub-img/Companies/Icons/_Salary.png' classname=" " />
                                                                            <p classname="text-capitalize" >15,000-20,000 a month</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col px-1">
                                                                        <div className='d-flex  justify-content-center align-items-center mx-sm-2 listing-tags  mb-3'>
                                                                            <img src='/assets/images/tatlub-img/Companies/Icons/_Experience.png' />
                                                                            <p classname="" >Full-time</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col px-1">
                                                                        <div className='d-flex justify-content-center align-items-center mx-sm-2 listing-tags  mb-3'>
                                                                            <img src='/assets/images/tatlub-img/Companies/Icons/_Shift.png' classname=" " />
                                                                            <p classname=" " >Day Shift</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className=''>
                                                                <p className='text-muted'>{t('applied')} {fromhour}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </div>
                            </div> :
                         appliedjobs?.length == 0 &&                
                           <div className='container'>
                            <div className="card empty-wishlist shadow-sm p-4 mb-3">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                        <h4 className="fw-bold fs-4">{t("My Job")}</h4>
                                    </div>
                                <div className="text-center">
                                    <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                                    <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                                </div>
                            </div>
                        </div> 
                    }
                </div> :
                <div className='container'>
                    <div className='card empty-wishlist  p-4 mb-4 mt-4'>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h4 className="fw-bold fs-4">{t("Manage Job")}</h4>
                            <div className="filer-search-wicon ">
                                {
                                    appliedjobs?.length > 0 &&
                                    // <i title='Export Order' role='button' onClick={exportOrder} className="fa fa-cloud-download fs-4 text-color " aria-hidden="true"></i>
                                    <button
                                        type="button"
                                        className="btn px-5 btn_cart ms-sm-3 fs-5 fw-normal mb-2 rounded"
                                        onClick={exportOrder}
                                    >
                                        <i class="fa fa-cloud-download  me-2 " aria-hidden="true"></i>

                                        {t("Export Applied List")}
                                    </button>
                                }
                            </div>
                        </div>
                        <div style={{ height: 500, width: '100%' }}>
                            {/* MuiDataGrid-columnHeaderTitleContainer */}
                            <DataGrid
                                rowHeight={70}
                                disableColumnMenu
                                sx={{
                                    '& .MuiDataGrid-columnHeader': {
                                        backgroundColor: "#0681ce",
                                        color: "white",
                                        fontWeight: 700,
                                        width: "100% !important",
                                        // maxWidth:'29px !important',
                                        // minWidth:'100% !important',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    },
                                    '& .MuiDataGrid-cell': {
                                        display: 'flex',
                                        justifyContent: 'center'
                                    },
                                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                                        display: 'flex',
                                        justifyContent: 'center'
                                    },
                                    '& .MuiTablePagination-selectLabel': {
                                        marginBottom: '0px'
                                    },
                                    '& .MuiTablePagination-displayedRows': {
                                        marginBottom: '0px'
                                    }
                                }}
                                loading={isLoading}
                                rows={appliedjobs}
                                columns={columns}
                                pageSize={10}
                                localeText={{
                                    toolbarDensity: 'Size',
                                    toolbarDensityLabel: 'Size',
                                    toolbarDensityCompact: 'Small',
                                    toolbarDensityStandard: 'Medium',
                                    toolbarDensityComfortable: 'Large',
                                }}

                            // slots={{
                            //     toolbar: GridToolbar,
                            //   }}
                            />
                        </div>
                    </div>
                </div>
            }

        </CommonLayout>
    )
}

export default SelectCategory;