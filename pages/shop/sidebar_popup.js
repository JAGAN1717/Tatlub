import React, { useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
// import { withApollo } from '../../helpers/apollo/apollo';
import Popupsidebr from "./common/Popupsidebr";
import { Container, Row, Col, Button } from "reactstrap";
import Slider from "react-slick";
import { Product3, Product6, Slider3, Slider4, Team4 } from "../../services/script";


const SidebarPopup = () => {

  const customeSlider = React.createRef();

  const gotoNext = () => {
    customeSlider.current.slickNext()
  }

  const gotoPrev = () => {
    customeSlider.current.slickPrev()
  }

  return (
    <CommonLayout title="collection" parent="home">
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            {/* <Row>
                            <Popupsidebr colClassName="col-xl-3 col-6 col-grid-box"/>
                        </Row> */}

            <Row>
              <Col lg="9">
                <section className="vendor-profile pt-0">
                  <Row>
                    <Col lg="12" className=" mb-3 mb-md-4">
                      <div className="review_card">
                        <Row>
                          <Col lg="12">
                            <div className="d-md-flex justify-content-between">
                              <div className="fs-vp-pg">
                                <div className="d-flex align-items-center mb-4">
                                  <h4 className="fw-600 mb-0 vendor-profile-title pe-1">
                                    Avichi Higher Secondary School Virugambakkam{" "}
                                  </h4>
                                </div>

                                <div className="d-lg-flex mt-4">
                                  <div className="d-flex me-4">
                                    <img
                                      className="me-2 company_detail_icon"
                                      src="/assets/images/company/5.png"
                                    />
                                    <p>avichi@admin.com</p>
                                  </div>
                                  <div className="d-flex me-4">
                                    <img
                                      className="me-2 company_detail_icon"
                                      src="/assets/images/company/6.png"
                                    />
                                    <p>www.avichihersecschool.com</p>
                                  </div>
                                </div>

                                <div className="d-flex">
                                  <img
                                    className="me-2 company_detail_icon"
                                    src="/assets/images/company/4.png"
                                  />
                                  <p>
                                    4.4{" "}
                                    <span className="custom_ratng_text ms-3">
                                      2053 Ratings
                                    </span>
                                  </p>
                                </div>

                                <div className="">
                                  <p className="fw-bold">
                                    <span className="text-success">
                                      Open at
                                    </span>{" "}
                                    8: 00 am tomorrow
                                  </p>
                                </div>
                              </div>

                              <div className="d-flex profile-share_mobile">
                                <div>
                                  <div className="like_profile me-2">
                                    <img
                                      className="icon_ls"
                                      src="/assets/images/tatlub-img/icon-2.png"
                                    />
                                  </div>
                                </div>
                                <div>
                                  {" "}
                                  <div className="share_profile me-2">
                                    <img
                                      className="icon_ls"
                                      title="Share"
                                      src="/assets/images/tatlub-img/icon-3.png"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <div className="d-md-flex justify-content-between">
                            <div className="d-flex mt-3">
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
                              <Button className="btn contact_suplier_btn me-2 mt-3">
                                Write Review
                              </Button>
                              <Button className="btn send_enquery_btn mt-3">
                                Send Enquiry
                              </Button>
                            </div>
                          </div>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </section>

                <div className="pt-0 b2c-2 mb-4">
                  <div className="review_card p-4">
                    {/* <Row>
                      <Col>
                        <h4 className="fw-bolder mx-3">Quick Information</h4>
                      </Col>
                      <Col>
                        <h4 className="fw-bolder mx-3">Timing</h4>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col lg='6' >
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
                      </Col>
                      {/* <div className=" p-0 co divider"></div> */}
                      <Col lg='5' className="divider">
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
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="pt-0 mb-4">
                  <div className="review_card p-4">
                    <div className="d-flex justify-content-between">
                    <h4 className="fw-600">Image Gallery</h4>
                    <button type="button" className="btn btn_header"><i className="fa fa-cloud-upload" aria-hidden="true"></i> uplode Image</button>
                    </div>

                    <div className="mt-3 position-relative">
                <Slider {...Slider3} ref={customeSlider} className="slide-4 offer-slider product_slider_ ">
                  <slick-list>
                    <div className="img-gallery">
                    <img
                        className="img-fluid "
                        src="/assets/images/tatlub-img/scl/1.jpg"
                      />
                    </div>
                  </slick-list>
                  <slick-list>
                    <div className="img-gallery">
                    <img
                        className="img-fluid "
                        src="/assets/images/tatlub-img/scl/2.jpg"
                      />
                    </div>
                  </slick-list>
                  <slick-list>
                    <div className="img-gallery">
                    <img
                        className="img-fluid "
                        src="/assets/images/tatlub-img/scl/4.jpg"
                      />
                    </div>
                  </slick-list>
                  <slick-list>
                    <div className="img-gallery">
                    <img
                        className="img-fluid "
                        src="/assets/images/tatlub-img/scl/5.jpg"
                      />
                    </div>
                  </slick-list>
                  <slick-list>
                    <div className="img-gallery">
                    <img
                        className="img-fluid "
                        src="/assets/images/tatlub-img/scl/6.jpg"
                      />
                    </div>
                  </slick-list>
                  <slick-list>
                    <div className="img-gallery">
                    <img
                        className="img-fluid "
                        src="/assets/images/tatlub-img/scl/7.jpg"
                      />
                    </div>
                  </slick-list>
                  </Slider>
                  <div onClick={()=>gotoNext()}><img src="/assets/images/tatlub-img/slid-3.png" className="slide-left" alt="..." /></div>
                  <div onClick={()=>gotoPrev()}><img src="/assets/images/tatlub-img/slid-4.png" className="slide-right" alt="..." /></div>
                    </div>
                  </div>
                </div>

                <div className="pt-0 mb-4">
                  <div className="review_card section_review_counter">
                    <div className="mb-3">
                      <h4 className="fw-600 fs-5">Write A Review</h4>
                    </div>
                    <div className="d-flex justify-content-arround ">
                      <img
                        className="review-start"
                        src="/assets/images/company/4.png"
                      />
                      <img
                        className="review-start"
                        src="/assets/images/company/4.png"
                      />
                      <img
                        className="review-start"
                        src="/assets/images/company/4.png"
                      />
                      <img
                        className="review-start"
                        src="/assets/images/company/44.png"
                      />
                      <img
                        className="review-start"
                        src="/assets/images/company/44.png"
                      />
                    </div>

                    <form>
                      <div className="row mt-3">
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
                      <div className="mt-sm-3 mb-md-5 mb-3">
                        <textarea
                          className="form-control border-0"
                          rows="8"
                          placeholder="Write A Review"
                        ></textarea>
                      </div>
                      <div className="text-end">
                        <button type="submit" className="btn btn_filter1 "> Post</button>
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
                        <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6>5.0</h6></div>
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
                        <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6>5.0</h6></div>
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
                        <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6>5.0</h6></div>
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
                        <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6>5.0</h6></div>
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
                        <div className="d-flex alidn-items-center mb-3"><img className="company_detail_icon me-3" src="/assets/images/company/4.png" /><h6>5.0</h6></div>
                        <p>This Was My First Step In My Life....I Love My School Very Much..</p>
                      </Col>
                    </Row >
                  </div>

                  <div className="text-center"><Button className="btn btn_loadmore mt-3">Load More</Button></div>
                </div>
              </Col>

              <Col lg="3" className="">
                <div className="p-3 py-4 review_card mb-4">
                  <p className="fs-4 fw-bolder">
                    {/* <img src="/assets/images/tatlub-img/locate.png" className="icon_ls" /> */}
                    <i className="fa fa-map-marker mx-2" aria-hidden="true"></i>
                     Address</p>
                  <h5>
                    No 130, Arcot Road, Virugambakkam, Chennai-600092
                    <h5>(Near Amirtha Madam)</h5>
                  </h5>

                  <div className="d-flex me-4">
                    <img
                      className="me-2 company_detail_icon"
                      src="/assets/images/company/7.png"
                    />
                    <h5 className="text-color">Get Directions</h5>
                  </div>
                </div>

                <div className="p-3 py-4 review_card">
                  <p className="fs-4 fw-bolder mb-3">Enquire Now</p>
                  <form>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control rounded"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control rounded"
                        placeholder="Mobile Number"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control rounded"
                        placeholder="Email Address"
                      />
                    </div>
                    <button type="submit" className="btn btn_filter1 w-100">
                      Send Enquiry
                    </button>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </CommonLayout>
  );
};

export default SidebarPopup;
