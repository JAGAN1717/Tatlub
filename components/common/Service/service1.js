import React from "react";
import {
  svgFreeShipping,
  svgservice,
  svgoffer,
} from "../../../services/script";
import { Container, Row, Col } from "reactstrap";
import MasterServiceContent from "./MasterServiceConternt";
import { getRecentActivity } from "../../core/fashion_request";
import { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// import StarIcon from '@mui/icons-material/Star';
import { useTranslation } from "react-i18next";
import { Slider4 } from "../../../services/script";
import Slider from "react-slick";
import { Skeleton } from 'primereact/skeleton';


const ServiceLayout = ({ sectionClass }) => {
  const [recentActive, setRecentActive] = useState([]);
  const { t } = useTranslation();

  const fetchRecentActive = async () => {
    try{
      const response = await getRecentActivity();
      setRecentActive(response.data);
    }catch(error){
      console.error("err",error.message)
    }
  };

  useEffect(() => {
    // fetchRecentActive();
  }, []);



let elementsArray = document.querySelectorAll(".tile1");
console.log(elementsArray);
window.addEventListener('scroll', fadeIn ); 
function fadeIn() {
    for (var i = 0; i < elementsArray.length; i++) {
        var elem = elementsArray[i]
        var distInView = elem.getBoundingClientRect().top - window.innerHeight +20;
        if (distInView < 0) {
            elem.classList.add("inView1");
        } else {
            elem.classList.remove("inView1");
        }
    }
}


  return (
    <Container>
      {/* <section className={sectionClass}>
        <Row>
          {Data.map((data, index) => {
            return (
              <Col md="4" className="service-block" key={index}>
                <MasterServiceContent
                  link={data.link}
                  title={data.title}
                  service={data.service}
                />
              </Col>
            );
          })}
        </Row>
      </section> */}
      <section className="pt-0 slider-activity d-none">
        <div className=" py-4">
          <div className="d-flex justify-content-between my-3">
            <h3 className="fw-bolder">{t("Recent Activity")}</h3>{" "}
            {/* <a href=""> 
              <h4 className="theme_color cursor-pointer">{t('View All')}</h4>
            </a>{" "} */}
          </div>
          {/* <Row className="justify-content-start"> */}
          <Slider {...Slider4} className="slide-3 arrow tile1 ">
            { recentActive.length > 0 && recentActive?.map((data, index) => {
              return (
                <Col className="mb-3 px-2" key={index}>
                  <div className={`background_activity Slide_Card card-${index}`}>
                    <div className="row mx-1 align-items-center py-3">
                      <div className="col-3 p-0 activity-contect">
                        <img
                          src={data.seller_image}
                          
                          onError={(e) =>
                            (e.currentTarget.src =
                              "/assets/images/tatlub-img/no1.png")
                          }
                          className="img-fluid  p-1"
                        />
                      </div>
                      {/* <div className="col-3 p-0 activity-contect"><img src=""   
                       onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}
                       className="img-fluid  p-1"/></div>  */}
                      <div className="ms-xl-3 ms-2 px-0 col">
                        <h3 className="fw-bolder ">{data.seller_name}</h3>
                        <p className="one_line">Chennai, Anna Nagar</p>
                      </div>
                    </div>
                    <img
                      src={data.recent_activity_logo}
                      // src="/assets/images/recent-acitivity/2.jpg" 
                      onError={(e) =>
                        (e.currentTarget.src =
                          "/assets/images/tatlub-img/No.jpg")
                      }
                      className="img-fluid  img_activity"
                    />
                    <div className="d-flex align-items-center py-3">
                      <img
                        src="/assets/images/recent-acitivity/profile1.pg"
                        onError={(e) =>
                          (e.currentTarget.src =
                            "/assets/images/tatlub-img/no1.png")
                        }
                        className="img-fluid img_act mx-1"
                      />
                      <div className="ms-3">
                        <h4 className="fw-bolder fs-5 one_line">{data.user_name}</h4>
                        {/* <div>
                            <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                            <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                            <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                            <img src="/assets/images/recent-acitivity/star.png"  className="img-fluid start-icon  px-1"/>
                            <img src="/assets/images/recent-acitivity/star.png"  className="img-fluid start-icon  px-1"/>
                            </div> */}
                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="text-feedback"
                            value={data.rating}
                            readOnly
                            precision={0.5}
                            // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                        </Box>
                      </div>
                    </div>
                    <p>{data?.body}</p>
                  </div>
                </Col>
              );
            })}

            {
              recentActive.length == 0  && 
              <Col className="mb-3 px-2">
              <div className="background_activity">
                <div className="row mx-1  align-items-center py-3">
                  <div className="col-3 p-0 activity-contect justify-content-start">
                    {/* <img
                      src="sample"
                      
                      onError={(e) =>
                        (e.currentTarget.src =
                          "/assets/images/tatlub-img/no1.png")
                      }
                      className="img-fluid  p-1"
                    /> */}
                    <Skeleton className="w-100 h-100" shape="circle" />
                  </div>
                  {/* <div className="col-3 p-0 activity-contect"><img src=""   
                   onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}
                   className="img-fluid  p-1"/></div>  */}
                  <div className="ms-xl-3 ms-2 px-0 col">
                    <h3 className="fw-bolder "> <Skeleton/></h3>
                    <p className="one_line"><Skeleton/></p>
                  </div>
                </div>
                {/* <img
                  src="sample"
                  // src="/assets/images/recent-acitivity/2.jpg" 
                  onError={(e) =>
                    (e.currentTarget.src =
                      "/assets/images/tatlub-img/No.jpg")
                  }
                  className="img-fluid  img_activity"
                /> */}
               <Skeleton className="w-100 h-50 img_activity" shape="rectangle" />
                <div className="d-flex align-items-center py-3">
                  {/* <img
                    src="/assets/images/recent-acitivity/profile1.pg"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "/assets/images/tatlub-img/no1.png")
                    }
                    className="img-fluid img_act mx-1"
                  /> */}
                    <Skeleton className="w-100 h-100" shape="circle" />
                  <div className="ms-3">
                    <h4 className="fw-bolder fs-5 one_line"><Skeleton/></h4>
                    {/* <div>
                        <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/star.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/star.png"  className="img-fluid start-icon  px-1"/>
                        </div> */}
                    <Skeleton/>
                  </div>
                </div>
                <p><Skeleton/></p>
              </div>
            </Col>
            }
            {/* <Col lg="4" sm="6 mb-3 px-2">
              <div className="background_activity">
                  <div className="d-flex align-items-center py-3">
                   <div className="activity-contect"><img src="/assets/images/recent-acitivity/logo-2.png"  className="img-fluid  p-1"/></div> 
                    <div className="ms-3">
                        <h3 className="fw-bolder">DNS Restaurants</h3>
                       <p>Chennai, Ashok Nagar</p>
                    </div>
                  </div>
                  <img src="/assets/images/recent-acitivity/2.jpg"  className="img-fluid  img_activity"/>
                  <div className="d-flex align-items-center py-3">
                  <img src="/assets/images/recent-acitivity/profile2.jpg"  className="img-fluid img_act  px-1"/>
                    <div className="ms-3">
                        <h3 className="fw-bolder">Ramesh</h3>
                       <div>
                        <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/star.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/star.png"  className="img-fluid start-icon  px-1"/>
                        </div>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                </div>
              </Col>
              <Col lg="4" sm="6 mb-3 px-2">
              <div className="background_activity">
                  <div className="d-flex align-items-center py-3">
                   <div className="activity-contect"><img src="/assets/images/recent-acitivity/logo-3.png"  className="img-fluid  p-1"/></div> 
                    <div className="ms-3">
                        <h3 className="fw-bolder">DM Mens Wear</h3>
                       <p>Chennai, Anna Nagar</p>
                    </div>
                  </div>
                  <img src="/assets/images/recent-acitivity/3.jpg"  className="img-fluid  img_activity"/>
                  <div className="d-flex align-items-center py-3">
                  <img src="/assets/images/recent-acitivity/profile3.jpg"  className="img-fluid img_act  px-1"/>
                    <div className="ms-3">
                        <h3 className="fw-bolder">Praveen</h3>
                       <div>
                        <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/start-1.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/star.png"  className="img-fluid start-icon  px-1"/>
                        <img src="/assets/images/recent-acitivity/star.png"  className="img-fluid start-icon  px-1"/>
                        </div>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                </div>
              </Col> */}
              </Slider>
          {/* </Row> */}
        </div>
      </section>
    </Container>
  );
};

export default ServiceLayout;
