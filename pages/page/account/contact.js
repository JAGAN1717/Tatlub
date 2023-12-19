import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { Container, Row, Col, Media, Form, Label, Input } from "reactstrap";
import { getContactus } from "../../../components/core/seller_request";
import { useTranslation } from "react-i18next";
import Seo from "../../../seo/seo";


const Data = [
  {
    img: "fa-phone",
    title: "Contact us",
    desc1: "+974 123 - 456 - 7890",
    desc2: "+86 163 - 451 - 7894",
  },
  {
    img: "fa-map-marker",
    title: "ADDRESS",
    desc1: "ABC Complex,Near xyz, New York",
    desc2: "USA 123456",
  },
  {
    img: "fa-envelope-o",
    title: "ADDRESS",
    desc1: "Support@Shopcart.com",
    desc2: "info@shopcart.com",
  },
  {
    img: "fa-fax",
    title: "fax",
    desc1: "Support@Shopcart.com",
    desc2: "info@shopcart.com",
  },
];

const ContactDetail = ({ img, title, desc1, desc2 }) => {

  const { t } = useTranslation();


  return (
    <li>
      <div className="contact-icon">
        <i className={`fa ${img}`} aria-hidden="true"></i>
        <h6>{title}</h6>
      </div>
      <div className="media-body">
        <p>{desc1}</p>
        <p>{desc2}</p>
      </div>
    </li>
  );
};
const Contact = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [contactus,setContactus] = useState([]) 

  const FetchContactus = async () => {
    try {
      setIsLoading(true)
      const response = await getContactus()
      setContactus(response?.data)
      setIsLoading(false)
    } catch (error) {
      console.error('err',error.message)
      setIsLoading(false)
    }
  }

  useEffect(()=> {
    FetchContactus()
  },[])


  return (<> 
  <Seo title={`Contact`} />
     {/* <CommonLayout parent="home" title="Contact"> */}
      <section className="contact-page section-b-space container">
        {/* <Container>
          <Row className="section-b-space">
            <Col lg="7" className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1605.811957341231!2d25.45976406005396!3d36.3940974010114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1550912388321"
                allowFullScreen
              ></iframe>
            </Col>
            <Col lg="5">
              <div className="contact-right">
                <ul>
                  {Data.map((data, i) => {
                    return (
                      <ContactDetail
                        key={i}
                        img={data.img}
                        title={data.title}
                        desc1={data.desc1}
                        desc2={data.desc2}
                      />
                    );
                  })}
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Form className="theme-form">
                <Row>
                  <Col md="6">
                    <Label className="form-label" for="name">First Name</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Your name"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">Last Name</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="last-name"
                      placeholder="Email"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="review">Phone number</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="review"
                      placeholder="Enter your number"
                      required=""
                    />
                  </Col>
                  <Col md="6">
                    <Label className="form-label" for="email">Email</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required=""
                    />
                  </Col>
                  <Col md="12">
                    <Label className="form-label" for="review">Write Your Message</Label>
                    <textarea
                      className="form-control"
                      placeholder="Write Your Message"
                      id="exampleFormControlTextarea1"
                      rows="6"
                    ></textarea>
                  </Col>
                  <Col md="12">
                    <button className="btn btn-solid" type="submit">
                      Send Your Message
                    </button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container> */}
        <Container>
          <div className="mt-3">
            <div className="">
              <h3 className="text-color fs-3">{t("Contact Us")}</h3>
            </div>
            <div className="row mt-4">
              {
                contactus.length > 0 ?
                contactus?.map((data,index)=> (
                <div className="col-md-4 mb-4" key={index}>
                    <div className="Contact_card d-flex justify-content-center align-items-center">
                      <div className="text-center">
                        <h3 className="fs-4">{data?.location_name}</h3>
                        <div className="mt-2">
                          <h5 className="mb-0 text-secondary">{data?.address}.</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : 
                <div className="card empty-wishlist shadow-sm p-4 ">
                <div className="d-flex align-items-center justify-content-between">
                  {/* <h4 className="fw-bold">MY CART</h4>  */}
                  <div className="filer-search-wicon d-none">
                    <div className="search">
                      <span className="fa fa-search"></span>
                      <input placeholder={t("Search In This Store")} />
                    </div>
                  </div>
                </div>
      
                <div className="text-center">
                  <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                  {/* <p className="text-muted">Your Cart Is Empty!</p> */}
                </div>
              </div>
              }
            </div>
          </div>
        </Container>

      </section>
     {/* </CommonLayout> */}
  </>
  );
};

export default Contact;
