import React, { useState } from 'react'

export default function List() {

    const [ btnhover ,setBtnhover] = useState(false)

  return (
    <section className='' id="b2c">
        <div className='job_list_layout '>
            <div className='mb-3'>
                <h4 className='fw-bold'>Customer Care in Chennai</h4>
            </div>
        <div className="row">
                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="/assets/images/tatlub-img/customer/1.jpg"
                          className="img-fluid2 position-relative"
                        />
                        <div className="text-center hearIcon">
                        {/* <i className="fa fa-heart p-1" aria-hidden="true"></i> */}
                        <img src="\assets\images\tatlub-img\icon-2.png" className="rounded-0"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        {/* <Link href={'/shop/sidebar_popup'}> */}
                        <h4 className="card-title">
                          Amazon(Customer Care)
                        </h4>
                        {/* </Link> */}
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="text-muted">Chennai,Tamil Nadu</p>
                        </div>

                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className=" ">
                            4.5{" "}
                            <span className=" ms-3">
                              51,427 Ratings
                            </span>
                          </p>
                        </div>
                        
                        <p className=" text-muted">
                          <span className="text-success fw-bolder">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-sm-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter2 me-sm-2 mb-2 text-truncate w-100"
                        onMouseOver={()=> setBtnhover(true)}
                        onMouseOut={()=>setBtnhover(false)}
                      >
                        <img src={!btnhover ? "/assets/images/tatlub-img/call-1.png" : "/assets/images/tatlub-img/call-2.png"}  className="btn-img"/>
                        Call Now
                      </button>

                      <button
                        type="button"
                        className="btn btn_filter2 text-truncate ms-sm-2 w-100"
                      >
                        <img src='/assets/images/tatlub-img/customer/show.png'  className="btn-img " ></img>
                        Show Number
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="/assets/images/tatlub-img/customer/5.jpg"
                          className="img-fluid2 position-relative"
                        />
                        <div className="text-center hearIcon">
                        {/* <i className="fa fa-heart p-1" aria-hidden="true"></i> */}
                        <img src="\assets\images\tatlub-img\icon-2.png" className="rounded-0"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        {/* <Link href={'/shop/sidebar_popup'}> */}
                        <h4 className="card-title">
                        Samsung(Customer Care)
                        </h4>
                        {/* </Link> */}
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="text-muted">Chennai,Tamil Nadu</p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className=" ">
                            4.5{" "}
                            <span className=" ms-3">
                              51,427 Ratings
                            </span>
                          </p>
                        </div>
                        <p className=" text-muted">
                          <span className="text-success fw-bolder">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-sm-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter2 me-sm-2 mb-2 text-truncate w-100"
                        onMouseOver={()=> setBtnhover(true)}
                        onMouseOut={()=>setBtnhover(false)}
                      >
                        <img src={!btnhover ? "/assets/images/tatlub-img/call-1.png" : "/assets/images/tatlub-img/call-2.png"}  className="btn-img"/>
                        Call Now
                      </button>

                      <button
                        type="button"
                        className="btn btn_filter2 text-truncate ms-sm-2 w-100"
                      >
                        <img src='/assets/images/tatlub-img/customer/show.png'  className="btn-img " ></img>
                        Show Number
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="/assets/images/tatlub-img/customer/4.jpg"
                          className="img-fluid2 position-relative"
                        />
                        <div className="text-center hearIcon">
                        {/* <i className="fa fa-heart p-1" aria-hidden="true"></i> */}
                        <img src="\assets\images\tatlub-img\icon-2.png" className="rounded-0"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        {/* <Link href={'/shop/sidebar_popup'}> */}
                        <h4 className="card-title">
                          LG(Customer Care)
                        </h4>
                        {/* </Link> */}
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="text-muted">Chennai,Tamil Nadu</p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className=" ">
                            4.5{" "}
                            <span className=" ms-3">
                              51,427 Ratings
                            </span>
                          </p>
                        </div>
                        <p className=" text-muted">
                          <span className="text-success fw-bolder">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-sm-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter2 me-sm-2 mb-2 text-truncate w-100"
                        onMouseOver={()=> setBtnhover(true)}
                        onMouseOut={()=>setBtnhover(false)}
                      >
                        <img src={!btnhover ? "/assets/images/tatlub-img/call-1.png" : "/assets/images/tatlub-img/call-2.png"}  className="btn-img"/>
                        Call Now
                      </button>

                      <button
                        type="button"
                        className="btn btn_filter2 text-truncate ms-sm-2 w-100"
                      >
                        <img src='/assets/images/tatlub-img/customer/show.png'  className="btn-img " ></img>
                        Show Number
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="/assets/images/tatlub-img/customer/6.jpg"
                          className="img-fluid2 position-relative"
                        />
                        <div className="text-center hearIcon">
                        {/* <i className="fa fa-heart p-1" aria-hidden="true"></i> */}
                        <img src="\assets\images\tatlub-img\icon-2.png" className="rounded-0"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        {/* <Link href={'/shop/sidebar_popup'}> */}
                        <h4 className="card-title">
                        Uber(Customer Care)
                        </h4>
                        {/* </Link> */}
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="text-muted">Chennai,Tamil Nadu</p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className=" ">
                            4.5{" "}
                            <span className=" ms-3">
                              51,427 Ratings
                            </span>
                          </p>
                        </div>
                        <p className=" text-muted">
                          <span className="text-success fw-bolder">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-sm-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter2 me-sm-2 mb-2 text-truncate w-100"
                        onMouseOver={()=> setBtnhover(true)}
                        onMouseOut={()=>setBtnhover(false)}
                      >
                        <img src={!btnhover ? "/assets/images/tatlub-img/call-1.png" : "/assets/images/tatlub-img/call-2.png"}  className="btn-img"/>
                        Call Now
                      </button>

                      <button
                        type="button"
                        className="btn btn_filter2 text-truncate ms-sm-2 w-100"
                      >
                        <img src='/assets/images/tatlub-img/customer/show.png'  className="btn-img " ></img>
                        Show Number
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="/assets/images/tatlub-img/customer/2.jpg"
                          className="img-fluid2 position-relative"
                        />
                        <div className="text-center hearIcon">
                        {/* <i className="fa fa-heart p-1" aria-hidden="true"></i> */}
                        <img src="\assets\images\tatlub-img\icon-2.png" className="rounded-0"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        {/* <Link href={'/shop/sidebar_popup'}> */}
                        <h4 className="card-title">
                        Jio(Customer Care)
                        </h4>
                        {/* </Link> */}
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="text-muted">Chennai,Tamil Nadu</p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className=" ">
                            4.5{" "}
                            <span className=" ms-3">
                              51,427 Ratings
                            </span>
                          </p>
                        </div>
                        <p className=" text-muted">
                          <span className="text-success fw-bolder">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-sm-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter2 me-sm-2 mb-2 text-truncate w-100"
                        onMouseOver={()=> setBtnhover(true)}
                        onMouseOut={()=>setBtnhover(false)}
                      >
                        <img src={!btnhover ? "/assets/images/tatlub-img/call-1.png" : "/assets/images/tatlub-img/call-2.png"}  className="btn-img"/>
                        Call Now
                      </button>

                      <button
                        type="button"
                        className="btn btn_filter2 text-truncate ms-sm-2 w-100"
                      >
                        <img src='/assets/images/tatlub-img/customer/show.png'  className="btn-img " ></img>
                        Show Number
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6 col-12 mb-3">
                  <div className="card p-3 pt-4  border-0 shadow-sm mx-1 B2C product-list">
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-2">
                        <img
                          src="/assets/images/tatlub-img/customer/3.jpg"
                          className="img-fluid2 position-relative"
                        />
                        <div className="text-center hearIcon">
                        {/* <i className="fa fa-heart p-1" aria-hidden="true"></i> */}
                        <img src="\assets\images\tatlub-img\icon-2.png" className="rounded-0"/>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        {/* <Link href={'/shop/sidebar_popup'}> */}
                        <h4 className="card-title">
                        Airtel(Customer Care)
                        </h4>
                        {/* </Link> */}
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-11.png"
                          />
                        <p className="text-muted">Chennai,Tamil Nadu</p>
                        </div>
                        <div className="d-flex">
                          <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/company/4.png"
                          />
                          <p className=" ">
                            4.5{" "}
                            <span className=" ms-3">
                              51,427 Ratings
                            </span>
                          </p>
                        </div>
                        <p className=" text-muted">
                          <span className="text-success fw-bolder">Open</span> Until 5:00
                          pm
                        </p>
                      </div>
                    </div>

                    <div className="d-sm-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn_filter2 me-sm-2 mb-2 text-truncate w-100"
                        onMouseOver={()=> setBtnhover(true)}
                        onMouseOut={()=>setBtnhover(false)}
                      >
                        <img src={!btnhover ? "/assets/images/tatlub-img/call-1.png" : "/assets/images/tatlub-img/call-2.png"}  className="btn-img"/>
                        Call Now
                      </button>

                      <button
                        type="button"
                        className="btn btn_filter2 text-truncate ms-sm-2 w-100"
                      >
                        <img src='/assets/images/tatlub-img/customer/show.png'  className="btn-img " ></img>
                        Show Number
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div className="text-center my-md-4 py-3">
                  <button type="button" className="btn_hover p-2 px-4">
                    View More 
                  </button>
                </div> */}
              </div>
        </div>
    </section>
  )
}
