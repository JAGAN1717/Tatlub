import React,{useState,useEffect} from 'react'
import {getPopular} from '../../../../components/core/fashion_request';
import { Container, Row, Col, Media } from "reactstrap";
import { useTranslation } from "react-i18next";



export default function Popular({popular}) {
  const { t } = useTranslation();



  return (<>
  <section className='p-0'>
    <div className='container py-xl-5 py-3'>
        <div className='Popular_productData'>
            <div className='mb-3'>
            <h3>{t("Popular Products")}</h3>   
                </div>

                <div className='row'>
                { popular.length > 0 && popular?.map((data, index) => {
                    return (
                      <Col sm="3" className="mb-3" key={index}>
                        <div
                          className="card_theme one_line_1 mb-0"
                        >
                          <h6 className='fw-bold text-dark'>{data.product_name}</h6>
                          <Row className="align-items-center">
                            <div className="col-5 max-width_col">
                              {/* <img src="/assets/images/products-home/5.png"  className="img-fluid img_proct3"/> */}
                              <img
                                src={data.product_image_medium}
                                onError={(e) =>
                                  (e.currentTarget.src =
                                    "/assets/images/tatlub-img/no1.png")
                                }
                                className="img-fluid img_proct3 cursor-pointer"
                              />
                            </div>
                            <div className="col-7 ps-0" 
                            onClick={() =>
                            router.push({
                              pathname: "/product-details/view",
                              query: { product_id: data.id },
                            })
                            }>
                              <p className="cursor-pointer foot-cat">
                                <i className="fa-solid fa-dash text-capitalize pe-1"></i>
                                {data.product_name}
                              </p>
                              <p className="cursor-pointer foot-cat">
                                <i className="fa-solid fa-dash pe-1"></i>{" "}
                                {data.product_description}
                              </p>
                              <p className="cursor-pointer foot-cat">
                                <i className="fa-solid fa-dash pe-1"></i>
                                {data.product_price}
                              </p>
                              <p className="cursor-pointer foot-cat">
                                <i className="fa-solid fa-dash pe-1"></i>
                                {data.product_slug}
                              </p>
                            </div>
                          </Row>
                        </div>
                      </Col>
                    );
                  }) 
                  }

                </div>
        </div>
    </div>
  </section>
  </>
  )
}
