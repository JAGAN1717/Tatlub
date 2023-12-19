import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
// import { withApollo } from '../../helpers/apollo/apollo';
import { Media, Container, Row, Col } from "reactstrap";
import menu2 from "../../public/assets/images/mega-menu/2.jpg";
import Products from "../../components/common/Collections/Collection12";
import FilterPage from "./common/filter";
import { getBrandbyCategory } from "../../components/core/shop_requests";
import { useRouter } from "next/router";

const Metro = () => {
  const [sidebarView, setSidebarView] = useState(false);
  const [brand, setbrand] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const router = useRouter();

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  const fetchBrandList = async () => {
    try {
      setIsLoading(true);
      const response = await getBrandbyCategory();
      // setbrand(response.data)
      //  response.data?.reduce((acc,obj)=> {
      //     const key = obj.category_id?.toSting();
      //     if(!acc[key]){
      //         acc[key] = [];
      //     }
      //     acc[key].push(obj);
      //     setbrand(acc)
      // },{})

      const separatedData = {};
      response.data?.forEach((res) => {
        if (!separatedData[res.category_name]) {
          separatedData[res.category_name] = [];
        }

        if (res.category_id === null) {
          separatedData[res.category_name] = [];
        }

        separatedData[res.category_name].push(res);
      });
      setbrand(separatedData);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrandList();
  }, []);

  return (<>
    {/* <CommonLayout title="collection" parent="home"> */}
      <section className="mb-4 mt-5">
        <div className="collection-wrapper">
          <Container>
            <Row>
              <FilterPage
                sm="3"
                sidebarView={sidebarView}
                closeSidebar={() => openCloseSidebar(sidebarView)}
              />
              <Col className="collection-content">
                {isLoading ? (
                  <div className="loader-wrapper2 rounded-3">
                    {url === "Christmas" ? (
                      <div id="preloader"></div>
                    ) : (
                      <div className="loader"></div>
                    )}
                  </div>
                ) : (
                  Object.keys(brand).map((data, index) => {

                    return (
                      <div className="page-main-content card border-0 p-3 shadow-sm card_radius mb-4">
                        <div className="d-flex justify-content-between">
                          <h4 className="fw-bolder">
                            {data == "undefined" ? "" : data}{" "}
                          </h4>
                          {/* <p className='text-color cursor-pointer'>View More</p> */}
                        </div>
                        <div className="row">
                          {brand[data].length > 0 &&
                            brand[data]?.map((value, i) => (
                              <div
                                className="col-xl-2 col-lg-3 col-sm-4 col-6 mb-3"
                                onClick={() =>
                                  router.push({
                                    pathname: "/shop/left_sidebar",
                                    query: { brand_id: value.id },
                                  })
                                }
                              >
                                <div className="brand-img p-3 text-center">
                                  <div className="c-bg rounded">
                                    <img
                                      src={value?.logo}
                                      className="brand-img w-100 cursor-pointer"
                                      onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/No.jpg")
                                      }
                                    ></img>
                                  </div>
                                  {/* <img src="/assets/images/tatlub-img/Brand Logo/16.jpg" className='w-75 pt-2 rounded'/> */}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                  })
                )}

                {!brand ||
                  (brand.length == 0 && (
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        src="/assets/images/tatlub-img/not_Found.png"
                        className="w-50"
                      />
                    </div>
                  ))}

                   {/* <div className="page-main-content card border-0 p-3 shadow-sm card_radius mb-4">
                                  <div className='d-flex justify-content-between'>
                                    <h4 className='fw-bolder'>UPS</h4>
                                    <p className='text-color'>View More</p>
                                </div>
                                <div className='row'>
                                    <div className='col-xl-2 col-lg-3 col-sm-4 col-6'>
                                        <div className='brand-img p-3 text-center'>
                                            <div className='c-bg rounded'>
                                            <img src="/assets/images/tatlub-img/Images/1.png" className='img-fluid '/>
                                            </div>
                                            <img src="/assets/images/tatlub-img/Brand Logo/28.jpg" className='w-75 pt-2 rounded'/>
                                        </div>
                                    </div>
                                    <div className='col-xl-2 col-lg-3 col-sm-4 col-6'>
                                        <div className='brand-img p-3 text-center'>
                                            <div className='c-bg rounded'>
                                            <img src="/assets/images/tatlub-img/Images/2.png" className='img-fluid '/>
                                            </div>
                                            <img src="/assets/images/tatlub-img/Brand Logo/29.jpg" className='w-75 pt-2 rounded'/>
                                        </div>
                                    </div>
                                    <div className='col-xl-2 col-lg-3 col-sm-4 col-6'>
                                        <div className='brand-img p-3 text-center'>
                                        <div className='c-bg rounded'>
                                        <img src="/assets/images/tatlub-img/Images/3.png" className='img-fluid '/>
                                            </div>
                                            <img src="/assets/images/tatlub-img/Brand Logo/30.jpg" className='w-75 pt-2 rounded'/>
                                        </div>
                                    </div>
                                    <div className='col-xl-2 col-lg-3 col-sm-4 col-6'>
                                        <div className='brand-img p-3 text-center'>
                                        <div className='c-bg rounded'>
                                        <img src="/assets/images/tatlub-img/Images/4.png" className='img-fluid '/>
                                            </div>
                                            <img src="/assets/images/tatlub-img/Brand Logo/31.jpg" className='w-75 pt-2 rounded'/>
                                        </div>
                                    </div>
                                    <div className='col-xl-2 col-lg-3 col-sm-4 col-6'>
                                        <div className='brand-img p-3 text-center'>
                                        <div className='c-bg rounded'>
                                        <img src="/assets/images/tatlub-img/Images/5.png" className='img-fluid '/>
                                            </div>
                                            <img src="/assets/images/tatlub-img/Brand Logo/32.jpg" className='w-75 pt-2 rounded'/>
                                        </div>
                                    </div>
                                    <div className='col-xl-2 col-lg-3 col-sm-4 col-6'>
                                        <div className='brand-img p-3 text-center'>
                                        <div className='c-bg rounded'>
                                        <img src="/assets/images/tatlub-img/Images/6.png" className='img-fluid '/>
                                            </div>
                                            <img src="/assets/images/tatlub-img/Brand Logo/33.jpg" className='w-75 pt-2 rounded'/>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                {/* 
                            <div className="text-center my-md-4 py-3">
                                  <button type="button" className="btn_hover p-2 px-4">
                                     View More
                                    </button>
                                 </div> */}
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    {/* </CommonLayout> */}
  </>
  );
};

export default Metro;
