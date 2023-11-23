import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Media } from "reactstrap";
import banner1 from "../../../../public/assets/images/sub-banner-1.png";
import banner2 from "../../../../public/assets/images/sub-banner-2.png";
import banner3 from "../../../../public/assets/images/sub-banner-3.png";
import axios from "axios";
import {
  getpopulorproduct,
  getSection,
  getPopular,
  getRecommended,
} from "../../../../components/core/fashion_request";
import { useRouter } from "next/router";
// import {useIdContex} from '../../../../initialvalueContex'
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { Slider6 } from "../../../../services/script";
import { Skeleton } from "primereact/skeleton";

const MasterCollectionBanner = ({ img, about, offer, link, read, classes }) => {
  return (
    <Col xl="4" md="6">
      <Link href={link}>
          <div className={`collection-banner ${classes}`}>
            <Media src={img} className="img-fluid img_home_bg_banner" alt="" />
            <div className="contain-banner text-start ">
              <div>
                <h3 className="mb-xl-3 mb-2">{about}</h3>
                <p className="pb-xl-3 pb-2">{offer}</p>
                <a className="btn_abou">
                  <i className="fa fa-angle-right pe-2" aria-hidden="true"></i>
                  {read}{" "}
                </a>
              </div>
            </div>
          </div>
      </Link>
    </Col>
  );
};

const CollectionBanner = ({
  BannerSection,
  popular,
  recommended,
  categories,
  subCategory,
}) => {

  const router = useRouter();
  // const {CategoryId} = useIdContex()
  const [subcatlist, setSubCatList] = useState([]);
  
  const { t } = useTranslation();

  function convertToPNG(jpgImage) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = jpgImage;

      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        try {
          // const dataURL = canvas.toDataURL('image/png');
          resolve(canvas);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = function (error) {
        reject(error);
      };
    });
  }

  //   useEffect(()=> {
  // const categoryList = {}
  //     subCategory?.forEach(res => {
  //       if (!categoryList[res.parent_category_name]) {
  //         categoryList[res.parent_category_name] = [];
  //       }

  //       if(res.category === null){
  //         categoryList[res.parent_category_name] = [];
  //       }
  //       categoryList[res.parent_category_name].push(res);
  //     })

  //     setSubCatList(categoryList)
  //   },[])


  // useEffect(() => {
  //   convertToPNG(
  //     "https://classi.vrikshatech.in/laravel_project/storage/app/public/category/ac_service_2023-05-19_64675957d20ff.jpg"
  //   )
  // }, []);

  // const [BannerSection , setBannersection] = useState([]);
  // const [popular, setPopular] = useState([]);
  // const [recommended, setRecommended] = useState([]);

  // const fetchBannerSection = async () => {
  //   const section = await getSection()
  //   setBannersection(section.data)
  // }

  // const fetchPopularProduct = async () => {
  //   const responcedata = await getPopular()
  //   setPopular(responcedata.data)
  // }

  // const fetchRecomProduct = async () => {
  //   const responcedata = await getRecommended()
  //   setRecommended(responcedata.data)
  // }

  // useEffect(() => {
  //   fetchBannerSection();
  //   fetchPopularProduct();
  //   fetchRecomProduct();
  // }, [])

  return (
    <Fragment>
      {/*collection banner*/}
      <section className="pb-0 pt-0 populor_section bg-white">
        <Container>
          <Row className="partition2  mb-2 mb-xl-4 section_banner2">
            {/* {Data.map((data, i) => {
              return (
                <MasterCollectionBanner
                  key={i}
                  img={data.img.src}
                  about={data.about}
                  read={data.read}
                  link={data.link}
                  offer={data.offer}
                  classes={data.class}
                />
              );
            })} */}

            {BannerSection?.length > 0 &&
              BannerSection.map((obj, index) => {
                const key = Object.keys(obj)[0]; // get the key of the object
                const valueArray = obj[key]; // get the array of values
                const valueObject = valueArray.reduce((acc, item) => {
                  acc[item.type] = item.value;
                  return acc;
                }, {});

                return (
                  <Col xl="4" md="6" key={index}>
                        {/* <div className="collection-banner p-right text-center"> */}
                        <div className="collection-banner text-center">
                          <img
                            src={valueObject["home_" + key]}
                            onError={(e) =>
                              (e.currentTarget.src =
                                "/assets/images/tatlub-img/no1.png")
                            }
                            className="img-fluid img_home_bg_banner"
                            alt=""
                          />
                          <div className="contain-banner text-start ">
                            <div>
                              <h3 className="mb-xl-3 text-capitalize complete_1 mb-2">
                                {valueObject[key + "_title"]}
                              </h3>
                              <p className="pb-xl-3 text-capitalize complete_2  pb-2">
                                {valueObject[key + "_subtitle"]}
                              </p>
                              <Link href={{pathname:`${valueObject[key + "_button_url"]}`,
                              // query:{"id": valueObject[key + "_title"] == 'Jobs' ? 14 : ''}
                              }}>
                              <a className="btn_abou text-capitalize">
                                <i
                                  className="fa fa-angle-right pe-2"
                                  aria-hidden="true"
                                ></i>
                                {t(valueObject[key + "_button_text"])}
                              </a>
                            </Link>
                            </div>
                          </div>
                        </div>
                  </Col>
                );
              })}

            {BannerSection.length == 0 && 
            
            [...Array(3)]?.map((d,i)=>(
              <Col xl="4" md="6" key={i}>
              <div className="collection-banner text-center">
                <Skeleton width={480} height={200} shape="rectangle" />
              </div>
            </Col>
            ))
            }
          </Row>

          <Row className="pt-2 pb-lg-4 pb-2">
            <Col xl="12" className="mb-3 tile d-none">
              <div className="pop_card pop_cat p-4 h-100">
                <div className="d-flex justify-content-between mb-3">
                  <h3>{t("Popular Categories")}</h3>{" "}
                  {/* <Link href="/page/Product/popularProducts" className="">
                    <h5 className="theme_color cursor-pointer">{t("View All")}</h5>
                  </Link>{" "} */}
                </div>
                <Row>
                  <Slider
                    {...Slider6}
                    arrows={false}
                    className="slide-3 arrow tile1 mb-3"
                  >
                    {categories?.length > 0 &&
                      categories?.slice(0, 18).map((data, index) => {
                        return (
                          <Col
                            md="2"
                            className="mb-3"
                            key={index}
                            title={data.category_name}
                          >
                            <div
                              className={`card_theme Slide_Card card-${index} one_line_1 mb-0 d-flex justify-content-center align-items-center`}
                            >
                              <div
                                className=""
                                onClick={() => {
                                  router.push({
                                    pathname:`/category/service/${data.category_slug}`,
                                    // query: { Category: data.category_slug,searchList: 'service' },
                                  });
                                  // setCategoryId(i.id)
                                }}
                              >
                                <div className="d-flex justify-content-center">
                                  <div className="mb-3 prp_cat">
                                    <img
                                      src={data?.category_image}
                                      onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/no1.png")
                                      }
                                      className="img_proct7 cursor-pointer"
                                    />
                                  </div>
                                </div>
                                <div className=" ps-0 text-center cat_bot ">
                                  <p className="cursor-pointer fw-bold foot-cat">
                                    <i className="fa-solid fa-dash pe-1"></i>
                                    {data.category_name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                  </Slider>

                  {categories?.length == 0 && (
                    <Col md="2" className="mb-3">
                      <div
                        className={`card_theme  one_line_1 mb-0 d-flex justify-content-center align-items-center`}
                      >
                        <div>
                          <Skeleton
                            className="mb-3"
                            width={100}
                            height={100}
                            shape="circle"
                          />

                          <Skeleton />
                        </div>
                      </div>
                    </Col>
                  )}

                  {/* {
                   !popular || popular.length == 0  &&  
                   <Col sm="6" className="mb-3" >
                   <div
                     className="card_theme one_line_1 mb-0"
                   >
                     <h6>Empty</h6>
                     <Row className="align-items-center">
                       <div className="col-5 max-width_col">
                         <img
                           src="/assets/images/products-home/5.pg"
                           onError={(e) =>
                             (e.currentTarget.src =
                               "/assets/images/tatlub-img/no1.png")
                           }
                           className="img-fluid img_proct3"
                         />
                       </div>
                       <div className="col-7 ps-0" >
                         <p className="cursor-pointer foot-cat">
                           <i className="fa-solid fa-dash pe-1"></i>
                           sample
                         </p>
                         <p className="cursor-pointer foot-cat">
                           <i className="fa-solid fa-dash pe-1"></i>{" "}
                           sample
                         </p>
                         <p className="cursor-pointer foot-cat">
                           <i className="fa-solid fa-dash pe-1"></i>
                           sample
                         </p>
                         <p className="cursor-pointer foot-cat">
                           <i className="fa-solid fa-dash pe-1"></i>
                           sample
                         </p>
                       </div>
                     </Row>
                   </div>
                 </Col>
                  } */}
                </Row>
              </div>
            </Col>

            {Object.keys(subCategory)
              ?.slice(0, 2)
              .map((data, index) => {
                return (
                  <Col xl="6" className="tile mb-4" key={index}>
                    <div className="pop_card p-4 w-100">
                      <div className="d-flex justify-content-between mb-3">
                        <h3 className="fs-20 text-capitalize">{t(data)}</h3>{" "}
                      </div>
                      <div className="row">
                        {subCategory[data]?.slice(0, 3).map((value, i) => (
                          <div
                            className="col-md-4 col-sm-6 d-flex mb-3 justify-content-center"
                            onClick={() => {
                              router.push({
                                pathname:`/category/service/${value.category_slug}`,
                                // query: { Category: value.category_slug,searchList: 'service'},
                              });
                            }}
                            key={i}
                          >
                            <div className="text-center custome_hoveer w-100">
                              <div className="wed_img mb-3">
                                <img
                                  src={value?.new_image ?? "kj"}
                                  className=""
                                  alt="no_img"
                                  onError={(e) =>
                                    (e.currentTarget.src =
                                      "/assets/images/tatlub-img/no1.png")
                                   }
                                />
                              </div>
                              <h4 className="fw-300 complete_1 mb-0 fs-5 fw-bold text-capitalize cursor-pointer foot-cat">
                                {t(value?.category_name)}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Col>
              );
              })}

            {Object.keys(subCategory)?.length == 0 &&
              [...Array(2)].map((d, i) => (
                <Col xl="6" className="tile mb-4" key={i}>
                  <div className="pop_card p-3">
                    <div className="d-flex justify-content-between mb-3">
                      <Skeleton width={150} />{" "}
                    </div>
                    <div className="row">
                      <div className="col-md-4 d-flex justify-content-center ">
                        <div className="text-center ">
                          <div className="wed_img mb-3">
                            <Skeleton
                              width={210}
                              height={150}
                              shape="rectangle"
                            />
                          </div>
                          <div className="d-flex justify-content-center">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 d-flex justify-content-center ">
                        <div className="text-center ">
                          <div className="wed_img mb-3">
                            <Skeleton
                              width={210}
                              height={150}
                              shape="rectangle"
                            />
                          </div>
                          <div className="d-flex justify-content-center">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 d-flex justify-content-center ">
                        <div className="text-center ">
                          <div className="wed_img mb-3">
                            <Skeleton
                              width={210}
                              height={150}
                              shape="rectangle"
                            />
                          </div>
                          <div className="d-flex justify-content-center">
                            <Skeleton width={100} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}

            {/* <Col xl="6" className="tile mb-4">
            <div className="pop_card p-3">
            <div className="d-flex justify-content-between mb-3">
                <h3>{t("Home Services")}</h3>{" "}
                </div>
                <div className="row">
                  <div className="col-md-4 d-flex justify-content-center ">
                  <div className="text-center ">
                    <div className="wed_img mb-3">
                      <img src="/assets/images/tatlub-img/new/Categories/10.jpg" className="" alt="no_img" />
                    </div>
                    <h4 className="fw-600 text-truncate cursor-pointer foot-cat">Plumber</h4></div>
                  </div>
                  <div className="col-md-4 d-flex justify-content-center ">
                  <div className="text-center ">
                    <div className="wed_img mb-3">
                      <img src="/assets/images/tatlub-img/new/Categories/5.jpg" className="" alt="no_img" />
                    </div>
                    <h4 className="fw-600 text-truncate cursor-pointer foot-cat">Ac Repair</h4></div>
                  </div>
                  <div className="col-md-4 d-flex justify-content-center ">
                  <div className="text-center ">
                    <div className="wed_img mb-3">
                      <img src="/assets/images/tatlub-img/new/Categories/6.jpg" className="" alt="no_img" />
                    </div>
                    <h4 className="fw-600 text-truncate cursor-pointer foot-cat">Electrician</h4></div>
                  </div>
                  
                </div>
            </div>
            </Col> */}

            {/* <Col xl="6" className="tile mb-4">
            <div className="pop_card p-3">
            <div className="d-flex justify-content-between mb-3">
                <h3>{t("Daily Needs")}</h3>{" "}
                </div>
                <div className="row">
                  <div className="col-md-4 d-flex justify-content-center ">
                  <div className="text-center ">
                    <div className="wed_img mb-3">
                      <img src="/assets/images/tatlub-img/new/Categories/7.jpg" className="" alt="no_img" />
                    </div>
                    <h4 className="fw-600 text-truncate cursor-pointer foot-cat">Fashion</h4></div>
                  </div>
                  <div className="col-md-4 d-flex justify-content-center ">
                  <div className="text-center ">
                    <div className="wed_img mb-3">
                      <img src="/assets/images/tatlub-img/new/Categories/8.jpg" className="" alt="no_img" />
                    </div>
                    <h4 className="fw-600 text-truncate cursor-pointer foot-cat">Grocery</h4></div>
                  </div>
                  <div className="col-md-4 d-flex justify-content-center ">
                  <div className="text-center ">
                    <div className="wed_img mb-3">
                      <img src="/assets/images/tatlub-img/new/Categories/9.jpg" className="" alt="no_img" />
                    </div>
                    <h4 className="fw-600 text-truncate cursor-pointer foot-cat">Salons </h4></div>
                  </div>
                  
                </div>
            </div>
            </Col> */}

            {/* <Col xl="6" className="mb-3 tile">
              <div className="pop_card p-3 ">
                <div className="d-flex justify-content-between my-3">
                <h3>{t("Popular Products")}</h3>{" "}
                  <Link href="/page/Product/popularProducts" className="">
                    <h5 className="theme_color cursor-pointer">{t("View All")}</h5>
                  </Link>{" "}
                </div>
                < Row>
                  { popular.length > 0 && popular?.slice(0, 4).map((data, index) => {
                    return (
                      <Col sm="6" className="mb-3" key={index}>
                        <div
                          className="card_theme one_line_1 mb-0"
                        >
                          <h6>{data.product_name}</h6>
                          <Row className="align-items-center">
                            <div className="col-5 max-width_col">
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
                              pathname: "/product-details/1",
                              query: { product_id: data.id },
                            })
                            }>
                              <p className="cursor-pointer foot-cat">
                                <i className="fa-solid fa-dash pe-1"></i>
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

                  {
                   !popular || popular.length == 0  &&  
                   <Col sm="6" className="mb-3" >
                   <div
                     className="card_theme one_line_1 mb-0"
                   >
                     <h6>Empty</h6>
                     <Row className="align-items-center">
                       <div className="col-5 max-width_col">
                         <img
                           src="/assets/images/products-home/5.pg"
                           onError={(e) =>
                             (e.currentTarget.src =
                               "/assets/images/tatlub-img/no1.png")
                           }
                           className="img-fluid img_proct3"
                         />
                       </div>
                       <div className="col-7 ps-0" >
                         <p className="cursor-pointer foot-cat">
                           <i className="fa-solid fa-dash pe-1"></i>
                           sample
                         </p>
                         <p className="cursor-pointer foot-cat">
                           <i className="fa-solid fa-dash pe-1"></i>{" "}
                           sample
                         </p>
                         <p className="cursor-pointer foot-cat">
                           <i className="fa-solid fa-dash pe-1"></i>
                           sample
                         </p>
                         <p className="cursor-pointer foot-cat">
                           <i className="fa-solid fa-dash pe-1"></i>
                           sample
                         </p>
                       </div>
                     </Row>
                   </div>
                 </Col>
                  }

                </Row>
              </div>
            </Col> */}

            {/* <Col xl="6" className="mb-3 tile">
              <div className="pop_card p-3 ">
                <div className="d-flex justify-content-between my-3">
                  <h3>{t("Recommended Products")}</h3>{" "}
                  <Link href="/page/Product/recommendedProducts" className="">
                    <h5 className="theme_color cursor-pointer">{t("View All")}</h5>
                  </Link>{" "}
                </div>
                <Row>
                  {recommended.length > 0 && recommended?.slice(0, 4).map((data, index) => {
                    return (
                      <Col sm="6" className="mb-3" key={index}>
                        <div
                          className="card_theme one_line_1 mb-0"

                        >
                          <h6>{data.product_name}</h6>
                          <Row className="align-items-center">
                            <div className="col-5 max-width_col">
                              <img
                                src={data.product_image_medium}
                                onError={(e) =>
                                  (e.currentTarget.src =
                                    "/assets/images/tatlub-img/no1.png")
                                }
                                className="img-fluid img_proct3"
                              />
                            </div>
                            <div className="col-7  ps-0" 
                              onClick={() =>
                                router.push({
                                  pathname: "/product-details/1",
                                  query: { product_id: data.id },
                                })
                              }
                            >
                              <p className="cursor-pointer foot-cat">
                                <i className="fa-solid fa-dash pe-1"></i>
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
                  })} 

                  {
                    !recommended || recommended.length == 0 && 
                    <Col sm="6" className="mb-3" >
                    <div
                      className="card_theme one_line_1 mb-0"
                    >
                      <h6>Empty</h6>
                      <Row className="align-items-center">
                        <div className="col-5 max-width_col">
                          <img
                            src='jh'
                            onError={(e) =>
                              (e.currentTarget.src =
                                "/assets/images/tatlub-img/no1.png")
                            }
                            className="img-fluid img_proct3"
                          />
                        </div>
                        <div className="col-7  ps-0"  >
                          <p className="cursor-pointer foot-cat">
                            <i className="fa-solid fa-dash pe-1"></i>
                           sample
                          </p>
                          <p className="cursor-pointer foot-cat">
                            <i className="fa-solid fa-dash pe-1"></i>{" "}
                            sample
                          </p>
                          <p className="cursor-pointer foot-cat">
                            <i className="fa-solid fa-dash pe-1"></i>
                            sample
                          </p>
                          <p className="cursor-pointer foot-cat">
                            <i className="fa-solid fa-dash pe-1"></i>
                            sample
                          </p>
                        </div>
                      </Row>
                    </div>
                  </Col>
                   }
                </Row>
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
      {/*collection banner end*/}
    </Fragment>
  );
};

export default CollectionBanner;
