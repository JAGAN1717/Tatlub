
import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { getTrendingProperty} from "../../../components/core/fashion_request";
import { useRouter } from "next/router";
import { getCustomerVideo } from "../../../components/core/fashion_request";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Recommend = () => {

  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const { t } = useTranslation();

  const fetchTrending = async () => {
    try{
        setIsLoading(true)
     const response = await getTrendingProperty();
     setTrending(response.data)
     setIsLoading(false)
    }catch(error){
        console.error('err',error.message)
        setIsLoading(false)
    }
  }

      useEffect(()=>{
        fetchTrending();
      },[])
  
    return(
        <Fragment>
    <div className="container py-xl-5 py-3">
        <section className="bg_detail">
            <h3 className="mb-3">{t("Recommend Projects")}</h3>
        <Row>
        {isLoading &&
                    <div className="loader-wrapper2">
                    {url === "Christmas" ? (
                      <div id="preloader"></div>
                    ) : (
                      <div className="loader"></div>
                    )}
                  </div> }

                  {
                    trending.map((data, index) => {
                    return (
                      <Col className="col-6 col-xl-3 col-md-4 mb-3 px-2" key={index}>
                        <div className="card_theme_categty bg-white" 
                        onClick={() =>
                          router.push(
                            "/layouts/Propertydetail?property_id=" + data.id,
                            "/layouts/Propertydetail"
                          )
                        }
                        >
                        
                          <img
                              src={data.item_image_medium ?? 'null'}
                            onError={(e) =>
                              (e.currentTarget.src =
                                "/assets/images/tatlub-img/No.jpg")
                            }
                            className="img-fluid img_proct5-home "
                          />
                          <div className="">
                            <h4 className="cursor-pointer foot-cat text-capitalize">{data.item_title}</h4>
                          </div>
                        </div>
                      </Col>
                    );
                  })} 

          
                </Row>
        </section>
    </div>
    </Fragment>
    )
}


export default Recommend;