import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import two from "../../public/assets/images/2.jpg";
import avtar from "../../public/assets/images/avtar.jpg";
import twenty from "../../public/assets/images/20.jpg";
import {
  Media,
  Container,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Dayjs } from 'dayjs';
import AuthContex from "../../components/auth/AuthContex";
import { useContext } from "react";
import { useRouter } from "next/router";
import { getLeadslist, getFilteredlead } from "../../components/core/vendor_request";
import { Calendar } from 'primereact/calendar';
import moment from "moment";
import Seo from '../../seo/seo'
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const Review = () => {
  const { userData } = useContext(AuthContex);
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const router = useRouter()
  const [leadlist, setLeadlist] = useState([]);
  const [leadTotal, setleadTotal] = useState()
  const [filterleadlist, setFilterLeadlist] = useState(false);
  const [loadmore, setLoadmor] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const [date, setDate] = useState(null);
  const { t } = useTranslation();

  console.log("jhfsjdsdld", dayjs(startdate).format('YYYY-MM-DD'))

  const handleEnd = (e) => {
    // console.log("hhkgk",moment(startdate).isBefore(e.value))
    // if(moment(startdate).isBefore(e.value)){
    //   setEndDate(e.value)
    // }
  }

  // console.log("ghfgh",moment(startdate).format('YYYY-MM-DD'))
  const filterLeads = async () => {
    setIsLoading(true);
    let id = userData?.id;
    let body = {
      'startDate': dayjs(startdate).format('YYYY-MM-DD'),
      'endDate': dayjs(enddate).format('YYYY-MM-DD')
    }

    getFilteredlead(id, body)
      .then((res) => {
        setLeadlist(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("err12", err.message);
        setIsLoading(false);
      });
  }

  const fetchLeadList = async (enddate) => {
    if (startdate > enddate) {
      toast.info("Must be End date greater than start date", {
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
    } else if (enddate) {
      setIsLoading(true);
      let id = userData?.id;
      let start = startdate ? dayjs(startdate).format('YYYY-MM-DD') : ''
      let end = enddate ? dayjs(enddate).format('YYYY-MM-DD') : ''
      getLeadslist(id, start, end)
        .then((res) => {
          // document.getElementById('ClosedModallaed')?.click()
          setLeadlist(res.data);
          setFilterLeadlist(true)
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("err12", err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      let id = userData?.id;
      getLeadslist(id)
        .then((res) => {
          // document.getElementById('ClosedModallaed')?.click()
          setLeadlist(res.data);
          setleadTotal(res.data?.length)
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("err12", err.message);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchLeadList();
  }, []);






  return (
    <CommonLayout parent="home" title="Lead">
      <Seo title={`Leads`} />
      {isLoading ? (
        <div className="container">
        <div className="loader-wrapper2 rounded-4 mt-4 mb-4">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
        </div>
      ) : (
        <section className="leads mb-4 mt-3">
          <Container>
            <div className="lead">
              <div className="review_card p-4 pb-1 mb-3 d-none">
                <div className="d-flex justify-content-between">
                  <div className="mb-3">
                    {/* <select className="form-select w-100 form-select-lg fw-bold border-0 ps-md-3 ps-0">
                      <option selected>{userData?.name}</option>
                    </select> */}
                    <span className="ms-md-3 fs-5 text-capitalize fw-bold mb-">
                      {/* {userData?.email} */}
                      {userData?.name ?? 'user'}
                      {/* {localStorage.getItem('city')} */}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="">
                    <h4 className="text-muted ms-md-3">
                      <span className="fw-light ">{t("Leads")}</span>{" "}
                      <span className="fs-5">{leadlist?.length ?? 0}</span>
                    </h4>
                  </div>
                  <div className="d-flex justify-content-center p-2">
                    <div className="">
                      <div className="row mb-3">
                        <div class="form-group new_date col-sm-4 col-sm-6 mb-3">
                          {/* <label for="startDate" className="form-label fw-bold">Start Date</label> */}
                          <input id="startDate" name="startDate" className="fs-16" type="date" value={startdate} onChange={(e) => setStartDate(e.target.value)} class="form-control" />
                        </div>
                        <div class="form-group new_date col-sm-4 col-sm-6  mb-3">
                          {/* <label for="endDate" className="form-label fw-bold">End Date</label> */}
                          {/* <input id="endDate" name="endDate" className="fs-16" type="date" value={enddate} onChange={(e) => { startdate <= e.target.value && setEndDate(e.target.value)  }} class="form-control" /> */}
                          <input id="endDate" name="endDate" className="fs-16" type="date" disabled={startdate ? false : true} value={enddate} onChange={(e) => { fetchLeadList(e.target.value); setEndDate(e.target.value) }} class="form-control" />
                        </div>
                        <div className="new_date form-group   w-100 col-sm-4 mb-3 d-none">
                          <button type="button" className="btn btn-theme fs-16 rounded" data-bs-dismiss="modal" aria-label="Close" disabled={enddate ? false : true} onClick={() => fetchLeadList()}>{t('Filter')}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lead-tab d-none">
                  <Nav
                    tabs
                    className="nav-material d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex">
                      <NavItem
                        className="nav nav-tab"
                        id="myTab"
                        role="tablist"
                      >
                        <NavLink
                          className={activeTab === "1" ? "active" : ""}
                          onClick={() => setActiveTab("1")}
                        >
                          {t("Leads")}
                        </NavLink>
                      </NavItem>
                      {/* <NavItem className="nav nav-tab" id="myTab" role="tablist">
                        <NavLink
                          className={activeTab === "2" ? "active" : ""}
                          onClick={() => setActiveTab("2")}
                        >
                          Performance
                        </NavLink>
                      </NavItem>
                      <NavItem className="nav nav-tab" id="myTab" role="tablist">
                        <NavLink
                          className={activeTab === "3" ? "active" : ""}
                          onClick={() => setActiveTab("3")}
                        >
                          RFQ
                        </NavLink>
                      </NavItem>
                      <NavItem className="nav nav-tab" id="myTab" role="tablist">
                        <NavLink
                          className={activeTab === "4" ? "active" : ""}
                          onClick={() => setActiveTab("4")}
                        >
                          Reviews
                        </NavLink>
                      </NavItem> */}
                    </div>
                  </Nav>
                  <div className="d-flex mt-3 text-truncate d-none">
                    <div className="mx-md-3 mx-0">
                      <h4>Leads</h4>
                    </div>
                    <div className="mx-4">
                      <h4>Performance</h4>
                    </div>
                    <div className="mx-4">
                      <h4>RFQ</h4>
                    </div>
                    <div className="mx-4">
                      <h4>Reviews</h4>
                    </div>
                  </div>
                  {/* <hr className="mt-1"></hr> */}
                  <TabContent activeTab={activeTab} className="nav-material">
                    <TabPane tabId="1">
                      <div className="mt-1" id="documentcallLead">
                        <div className="d-flex justify-content-between align-items-center">
                          <h4 className="text-muted ms-md-3">
                            <span className="fw-light ">Leads</span>{" "}
                            <span className="fs-5">{leadlist?.length ?? 0}</span>
                          </h4>
                          <div className="">
                            {/* <Button className="btn btn_filyter_lead" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                              <i
                                className="fa fa-filter"
                                aria-hidden="true"
                              ></i>{" "}
                              filter
                            </Button> */}
                            {/* <Button className="btn btn_filyter_lead" disabled={!leadlist?.length > 0} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> */}
                            <Button className="btn btn_filyter_lead" disabled={!leadlist?.length > 0} data-bs-toggle="modal" data-bs-target="#Filter_lead">
                              <i
                                className="fa fa-filter"
                                aria-hidden="true"
                              ></i>{" "}
                              {t("Filter")}
                            </Button>
                          </div>
                        </div>
                        <div className="collapse border-0 mt-3 d-none" id="collapseExample">
                          <div className="d-flex justify-content-center align-items-center">
                            <div className="text-center">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="mx-2 p-float-label">
                                  <Calendar inputId="start_date" value={startdate} onChange={(e) => setStartDate(e.value)} dateFormat="yy/mm/dd" />
                                  <label htmlFor="start_date " className="fw-bold">Start Date</label>
                                </div>
                                <div className="mx-2  p-float-label">
                                  <Calendar inputId="end_date" value={enddate} disabled={startdate ? false : true}
                                    onChange={(e) => handleEnd(e)} dateFormat="yy/mm/dd" />
                                  <label htmlFor="end_date " className="fw-bold">End Date</label>
                                </div>
                              </div>
                              <button className="btn btn-theme px-5 p-2 rounded" disabled={enddate ? false : true} onClick={() => filterLeads()} type="button">Update</button>
                            </div>
                          </div>
                        </div>

                        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                          <div class="offcanvas-header">
                            <h5 id="offcanvasRightLabel">Lead Filter</h5>
                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                          </div>
                          <div class="offcanvas-body">
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="text-start">
                                <div className="datePickerL justify-content-between align-items-center mb-2">
                                  {/* <LocalizationProvider  dateAdapter={AdapterDayjs} > */}
                                  {/* <DemoContainer  components={['DatePicker']} > */}
                                  {/* <DatePicker  value={startdate} label="Start Date"  onChange={(newValue) =>{ setStartDate(newValue?.$d); setMinDate(newValue) }}/> */}
                                  {/* </DemoContainer> */}
                                  {/* </LocalizationProvider>  */}
                                  <label className="form-label fw-bold">Start Date</label>
                                  <input type="date" className="form-control" value={startdate} onChange={(e) => setStartDate(e.target.value)} />
                                </div>
                                <div className="datePickerL justify-content-between align-items-center mb-3">
                                  {/* <LocalizationProvider dateAdapter={AdapterDayjs} > */}
                                  {/* <DemoContainer components={['DatePicker']} > */}
                                  {/* <DatePicker value={enddate} label="To Date" minDate={minDate}  onChange={(newValue) => setEndDate(newValue?.$d)} /> */}
                                  {/* </DemoContainer> */}
                                  {/* </LocalizationProvider>  */}
                                  <label className="form-label fw-bold">End Date</label>
                                  <input type="date" className="form-control" value={enddate} onChange={(e) => { startdate <= e.target.value && setEndDate(e.target.value) }} />
                                </div>
                                <button className="btn btn-theme w-100 px-5 p-3 rounded" disabled={enddate ? false : true} onClick={() => fetchLeadList()} type="button">Update</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="mt-1" id="documentcallLead">
                        <div className="d-flex justify-content-between align-items-center">
                          <h4 className="text-muted ms-md-3">
                            <span className="fw-light ">Leads</span>{" "}
                            <span className="fs-5">3,540</span>
                          </h4>
                          <div className="">
                            <Button className="btn btn_filyter_lead"  >
                              <i
                                className="fa fa-filter"
                                aria-hidden="true"
                              ></i>{" "}
                              Filter
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <div className="mt-1" id="documentcallLead">
                        <div className="d-flex justify-content-between align-items-center">
                          <h4 className="text-muted ms-md-3">
                            <span className="fw-light ">Leads</span>{" "}
                            <span className="fs-5">3,540</span>
                          </h4>
                          <div className="">
                            <Button className="btn btn_filyter_lead">
                              <i
                                className="fa fa-filter"
                                aria-hidden="true"
                              ></i>{" "}
                              Filter
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tabId="4">
                      <div className="mt-1" id="documentcallLead">
                        <div className="d-flex justify-content-between align-items-center">
                          <h4 className="text-muted ms-md-3">
                            <span className="fw-light ">Leads</span>{" "}
                            <span className="fs-5">3,540</span>
                          </h4>
                          <div className="">
                            <Button className="btn btn_filyter_lead">
                              <i
                                className="fa fa-filter"
                                aria-hidden="true"
                              ></i>{" "}
                              filter
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                  </TabContent>
                </div>
              </div>

              <div className="lead_card mb-3">
                <div className="border-bottom p-2 mb-2">
                  <h4 className="fw-bold fs-20">{t("Leads")}</h4>
                </div>
                <div className="d-sm-flex align-items-center justify-content-between">
                  <div className="">
                    <h4 className="text-secondary  fs-5">{t("Leads")} <span className="fw-bold fs-18">{leadTotal ?? 0}</span></h4>
                  </div>
                  <div className="d-flex p-2">
                    <div className="d-flex align-items-center lead_dates">
                      <div className="row">
                        <div class=" row new_date  col d-flex align-items-center  justify-content-between d-none">
                          <label for="endDate" class="col-sm-2 col-form-label fs-16 fw-normal">{t("From")}</label>
                          <div class="col-sm-10">
                            <input id="startDate" name="startDate" data-date-format="DD/MM/YYYY" className="form-control fs-16" type="date" value={startdate} onChange={(e) => { setStartDate(e.target.value); }} class="form-control" />
                          </div>
                        </div>

                        <div class=" row new_date  col d-flex  align-items-center justify-content-between d-none">
                          <label for="endDate" class="col-sm-2 col-form-label fs-16 fw-normal">{t("To")}</label>
                          <div class="col-sm-10">
                            <input id="endDate" name="endDate" className="fs-16 form-control rounded-3" placeholder="dd/mm/yyyy" data-date-format="DD/MM/YYYY" type="date" disabled={startdate ? false : true} value={enddate} onChange={(e) => { fetchLeadList(e.target.value); setEndDate(e.target.value) }} class="form-control" />
                          </div>
                        </div>

                        <div class=" col d-flex  align-items-center justify-content-between">
                          <label for="endDate" class="col-sm-2 col-form-label fs-16 fw-normal">{t("From")}</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={"DD/MM/YYYY"}>
                            <DatePicker format="DD/MM/YYYY" value={startdate} onChange={(e) => setStartDate(e)} />
                          </LocalizationProvider>
                        </div>

                        <div class=" col d-flex  align-items-center justify-content-between">
                          <label for="endDate" class="col-sm-2 col-form-label fs-16 fw-normal">{t("To")}</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}  >
                            <DatePicker format="DD/MM/YYYY" disabled={startdate ? false : true} value={enddate} onChange={(e) => { fetchLeadList(e); setEndDate(e) }} />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4">
                {
                  filterleadlist &&
                  <h4 className="fw-normal fs-5">{t("Filter Results")} : <span className="fs-18 fw-bold"> {leadlist?.length ?? 0} {t("Lead Found")}</span> </h4>
                }
              </div>

              {leadlist?.length > 0 &&
                leadlist?.slice(0, loadmore).map((data, index) => {
                  var date = moment(data?.created_at, "YYYY-MM-DD HH:mm:ss");
                  var formatedDate = date.format("DD MMM YYYY, hh:mm a");

                  return (
                    <div className="review_card p-3 mb-3 or_lead" key={index}>
                      <div className="d-flex justify-content-start align-items-center mb-3">
                        <div className="d-sm-flex justify-content-start mb-sm-2 mt-2">
                          <div className="me-md-3 mx-0">
                            <h4 className="fw-bold fs-18 text-capitalize">{data?.name ?? 'Name Not Found'}</h4>
                          </div>
                        </div>
                        <div className=" mx-2 text-muted_light ">
                          <h4 className="fs-16 fw-normal">{formatedDate}</h4>
                        </div>
                      </div>
                      <div className="d-xl-flex justify-content-between mb-0">
                        <div className="me-md-3 mx-0 mt-2">
                          <h6 className="fw-normal complete_1 fs-18">
                            {data?.sentence}
                          </h6>
                        </div>
                        <div className="d-flex justify-content-xl-between">
                          <button type="button" className="btn fs-18 btn-lead  me-3 text-truncate" data-bs-toggle="modal" data-bs-target="#upgradeplans">
                            <i className="fa fa-envelope me-2 " aria-hidden="true"></i>{" "}
                            {t("Send Mail")}
                          </button>
                          <button type="button" className="btn btn-lead1  fs-18" data-bs-toggle="modal" data-bs-target="#upgradeplans">
                            {t("View Number")}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {leadlist?.length > loadmore && (
                <div className="text-center my-md-4 py-3">
                  <button
                    type="button"
                    className="btn_hover bt_suyr fw-bolder p-2 px-4"
                    onClick={() => setLoadmor(leadlist?.length)}
                  >
                    {t("Load More")}
                  </button>
                </div>
              )}

              {leadlist?.length == 0 ||
                (!leadlist && (
                  <div className="text-center ">
                    <img
                      src="/assets/images/tatlub-img/not_Found.png"
                      className="w-size"
                    />
                  </div>
                ))}
                
              <div className="modal fade" id="upgradeplans" tabindex="-1" aria-labelledby="upgradeplansLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body p-4">
                      <div className="d-flex justify-content-end"> <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                      <div className="d-flex justify-content-center p-2">
                        <div>
                          <div className="mb-4 d-flex justify-content-center">
                            <img className="popup_img_logo" src="/assets/images/icon/logo.png" />
                          </div>
                          <div className="">
                            <h3>You Discovered a Premium Feature </h3>
                            <button type='button ' data-bs-dismiss="modal" aria-label="Close" className="btn popup_btn_logo w-100 fw-light rounded mt-4 w-100" onClick={() => router.push('/plans')}>To Access Upgrade Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="modal fade" id="Filter_lead" tabindex="-1" aria-labelledby="leadfilerLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body p-4">
                      <div className="d-flex justify-content-end"> <button type="button" id="ClosedModallaed" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                      <div className="d-flex justify-content-center p-2">
                        <div className="">
                          <div className="row mb-3">
                            <div class="form-group new_date col mb-3">
                              <label for="startDate" className="form-label fw-bold">Start Date</label>
                              <input id="startDate" name="startDate" className="fs-16" type="date" value={startdate} onChange={(e) => setStartDate(e.target.value)} class="form-control" />
                            </div>
                            <div class="form-group new_date col mb-3">
                              <label for="endDate" className="form-label fw-bold">End Date</label>
                              <input id="endDate" name="endDate" className="fs-16" type="date" value={enddate} onChange={(e) => { startdate <= e.target.value && setEndDate(e.target.value) }} class="form-control" />
                            </div>
                          </div>
                          <div className="new_date d-flex justify-content-center w-100">
                            <button type="button" className="btn btn-theme fs-16 rounded" data-bs-dismiss="modal" aria-label="Close" disabled={enddate ? false : true} onClick={() => fetchLeadList()}>Update</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </section>
      )}
    </CommonLayout>
  );
};

export default Review;
