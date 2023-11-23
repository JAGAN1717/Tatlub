import React from 'react'
import { Row, Container, Col, Button } from "reactstrap";


export default function Details() {
  return (
    <section className='custom_care'>
              <div className=" pt-0">
              <div className='row'>
                <div className="col-lg-12 mb-3 mb-md-4">
                  <div className="review_card ">
                    <div className='row'>
                      <div className='col-xl-2 col-lg-3'>
                        <div className="profile-image">
                          <img
                            src="/assets/images/tatlub-img/Companies/1.jpg"
                            alt=""
                            className="company-logo "
                          />
                        </div>
                      </div>
                      <div className='col'>
                        <div className="d-md-flex justify-content-between">
                          <div className="fs-vp-pg">
                            <div className="d-flex align-items-center mb-3">
                              <h4 className="fw-600 mb-0 vendor-profile-title pe-1">
                              Amazon(Customer Care)
                              </h4>
                              <img
                                className="me-2 company_detail_icon"
                                src="/assets/images/company/1.png"
                              />
                            </div>
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
                            {/* <div className="d-flex">
                              <img
                                className="me-2 company_detail_icon"
                                src="/assets/images/tatlub-img/Icon 8.png"
                              />
                              <p>
                                4.4{" "}
                                <span className="custom_ratng_text ms-3">
                                  2053 Ratings
                                </span>
                              </p>
                            </div> */}
                            <div className="d-flex justify-content-start">

                              <p className='text-dark d-flex'> 
                              <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-5.png"
                             />
                               amazon@gmail.com </p>

                              <p className='ms-5 d-flex'>
                              <img
                            className="me-2 company_detail_icon"
                            src="/assets/images/tatlub-img/icon-6.png"
                             />
                                www.amazon.com</p>
                            </div>
                          </div>

                          <div className="d-flex profile-share_mobile">
                            <div>
                              <div className="like_profile me-2">
                                <img
                                  className="icon_ls"
                                  src="/assets/images/tatlub-img/Companies/Icons/_Share active.png"
                                />
                              </div>
                            </div>
                            <div>
                              {" "}
                              <div className="share_profile me-2">
                                <img
                                  className="icon_ls"
                                  src="/assets/images/tatlub-img/Companies/Icons/_Fav.png"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-md-flex justify-content-between">
                        <div className="d-flex mt-4">
                          <div className="vendor-icon-img mx-1">
                            <img src="/assets/images/tatlub-img/s-6.jpg" />
                          </div>
                          <div className="vendor-icon-img mx-1">
                            <img src="/assets/images/tatlub-img/s-7.jpg" />
                          </div>
                          <div className="vendor-icon-img mx-1">
                            <img src="/assets/images/tatlub-img/s-8.jpg" />
                          </div>
                          <div className="vendor-icon-img mx-1">
                            <img src="/assets/images/tatlub-img/s-9.jpg" />
                          </div>
                          <div className="vendor-icon-img mx-1">
                            <img src="/assets/images/tatlub-img/s-5.jpg" />
                          </div>
                        </div>
                        <div className="d-sm-flex">
                          {" "}
                          <button className="btn  send_enquery_btn me-2 mt-3">
                          <img src="/assets/images/tatlub-img/call-2.png"  className="btn-img"/>
                          Call Now
                          </button>
                         
                         {/* <Link href={'/shop/Booking'}> */}
                          <button type='button' className="btn contact_suplier_btn mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                          <img src="/assets/images/tatlub-img/customer/show.png"  className="btn-img"/>
                         Show Number
                          </button>
                          {/* </Link> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div className="pt-0 b2c-2 mb-4">
                  <div className="review_card  p-4">
                    <div className='row'>
                      <div className='col-lg-6' >
                      <h4 className="fw-bolder mx-3 mb-3">Quick Information</h4>
                        <div className="d-flex justify-content-between mx-3">
                          <div>
                            <h5 className="custom_timing">Mode Of Payment</h5>
                            <h5 className="custom_timing">Year Of Establishment</h5>
                          </div>

                          <div>
                            <h5>Cash, Cheques, UPI</h5>
                            <h5>1951</h5>
                          </div>
                        </div>
                      </div>
                      {/* <div className=" p-0 co divider"></div> */}
                      <div className="col-lg-5 divider">
                      <h4 className="fw-bolder mx-3 mb-3  ">Timing</h4>

                        <div className="d-flex justify-content-between mx-3 ">
                          <div>
                            <h5 className="custom_timing">Mon - Fri</h5>
                            <h5 className="custom_timing">Sat - Sun</h5>
                          </div>

                          <div>
                            <h5>00:00 am - 00:00 pm</h5>
                            <h5>Closed Closed</h5>
                          </div>
                        </div>
                      </div>
                    </div >
                  </div>
                </div>


                <div className="pt-0 mb-4">
                  <div className="review_card ">
                    <div className="mb-5">
                      <h4 className="fw-600 fs-5">Write A Review</h4>
                    </div>

                    <Row>
                        <Col md='4' className="mb-4">
                        <h5 className="fw-bolder">Property</h5>
                        <div className="d-flex mb-4 mt-3">
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        </div>
                        <h5 className="fw-bolder">value For Money   </h5>
                        <div className="d-flex mt-3">
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        </div>
                        </Col>
                        <Col md='4' className="mb-4">
                        <h5 className="fw-bolder">Location</h5>
                        <div className="d-flex mb-4 mt-3">
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        </div>
                        <h5 className="fw-bolder">Agent Support</h5>
                        <div className="d-flex mt-3 mb-5">
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 8.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        <img className="start-img mx-2" src="/assets/images/tatlub-img/Icon 9.png" />
                        </div>
                        </Col>
                        <Col lg='4'className="d-flex align-items-center mb-4  ">
                            <div className='w-100 d-flex align-items-center justify-content-center  h-100 A-rating mb-4'>
                        <div className=" ">
                            <h4 className='text-center'>2.75</h4>
                            <h5 className="text-muted">Average Rating</h5>
                        </div></div>
                        </Col>
                    </Row>

                    <form>
                      <div className="row ">
                        <div className="col mb-3">
                          <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Name"
                          />
                        </div>
                        <div className="col mb-3">
                          <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                      <div className="mt-3 mb-5">
                        <textarea
                          className="form-control border-0"
                          rows="8"
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <div className="text-stat">
                        <button type="submit" className="btn btn_filter1 w-25">Submit Review</button>
                      </div>
                    </form>
                  </div>
                </div>


                <div className="review_card mt-4">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="mb-3">Reviews & Rating</h4>
                    <div className="filer-search-wicon">
                      <div className="search">
                        <span className="fa fa-search"></span>
                        <input placeholder="Search In This Store" />
                      </div>
                    </div>
                  </div>
                  <p className="custom_ratng_text">253 Users Review</p>
                  <div className="d-flex">
                    <div className="btn_filter btn"> <span>All</span></div>
                    <div className="btn_filter btn"> <span>High to Low</span></div>
                    <div className="btn_filter btn"> <span>Low to High</span></div>
                  </div>

                  <div className="">
                    <Row className="row mt-4">
                      <div className="img-width_reviw">
                        <img className="review-img-" src="/assets/images/company/Testi 1.jpg" />
                      </div>
                      <Col className="right_review">
                        <div className="d-flex justify-content-between">
                          <h5>Benjamin Denny Son</h5> <p>2 Days Ago</p></div>
                        <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/tatlub-img/Icon 8.png" /><h6>5.0</h6></div>
                        <p>This Was My First Step In My Life....I Love My School Very Much..</p>
                      </Col>
                    </Row >
                  </div>
                  <hr></hr>

                  <div className="">
                    <Row className="row mt-4">
                      <div className="img-width_reviw">
                        <img className="review-img-" src="/assets/images/company/Testi 2.jpg" />
                      </div>
                      <Col className="right_review">
                        <div className="d-flex justify-content-between">
                          <h5>Benjamin Denny Son</h5> <p>5 Days Ago</p></div>
                        <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/tatlub-img/Icon 8.png" /><h6>5.0</h6></div>
                        <p>This Was My First Step In My Life....I Love My School Very Much..</p>
                      </Col>
                    </Row >
                  </div>
                  <hr></hr>
                  <div className="">
                    <Row className="row mt-4">
                      <div className="img-width_reviw">
                        <img className="review-img-" src="/assets/images/company/Testi 3.jpg" />
                      </div>
                      <Col className="right_review">
                        <div className="d-flex justify-content-between">
                          <h5>Benjamin Denny Son</h5> <p>6 Days Ago</p></div>
                        <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/tatlub-img/Icon 8.png" /><h6>5.0</h6></div>
                        <p>This Was My First Step In My Life....I Love My School Very Much..</p>
                      </Col>
                    </Row >
                  </div>
                  <hr></hr>
                  <div className="">
                    <Row className="row mt-4">
                      <div className="img-width_reviw">
                        <img className="review-img-" src="/assets/images/company/Testi 6.jpg" />
                      </div>
                      <Col className="right_review">
                        <div className="d-flex justify-content-between">
                          <h5>Benjamin Denny Son</h5> <p>1 Week Ago</p></div>
                        <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/tatlub-img/Icon 8.png" /><h6>5.0</h6></div>
                        <p>This Was My First Step In My Life....I Love My School Very Much..</p>
                      </Col>
                    </Row >
                  </div>
                  <hr></hr>
                  <div className="">
                    <Row className="row mt-4">
                      <div className="img-width_reviw">
                        <img className="review-img-" src="/assets/images/company/Testi 5.jpg" />
                      </div>
                      <Col className="right_review">
                        <div className="d-flex justify-content-between">
                          <h5>Benjamin Denny Son</h5> <p>2 Week Ago</p></div>
                        <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/tatlub-img/Icon 8.png" /><h6>5.0</h6></div>
                        <p>This Was My First Step In My Life....I Love My School Very Much..</p>
                      </Col>
                    </Row >
                  </div>

                  <div className="text-center"><Button className="btn btn_loadmore mt-3">Load More</Button></div>
                </div>
    </section>
  )
}
