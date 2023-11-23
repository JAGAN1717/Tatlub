import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { getPRoductDetail } from "../../../components/core/product_request";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";

const ProductTab = ({ desc, seller, addToCart, Listings }) => {
  const [activeTab, setActiveTab] = useState("2");
  const [productdetail, setdetail] = useState({});
  const [value, setvalue] = useState([]);
  const { t } = useTranslation();
  const router = useRouter();
  const [productLen, setProductlen] = useState(8);
  const { item_id, product_id } = router.query;

  const fetchproductdetail = async () => {
    const responcedata = await getPRoductDetail();
    setvalue(JSON.parse(responcedata.data.choice_options));
    setdetail(responcedata.data);
  };

  // useEffect(() => {
  //   fetchproductdetail()
  // }, []);

  return (
    <section className="tab-product m-0 mb-4 pt-2">
      <Container>
        <Row>
          <Col sm="12" lg="12 px-0">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">

                <NavItem className="nav nav-tabs" title="Description" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "2" ? "active fs-18" : "fs-18"}
                    onClick={() => setActiveTab("2")}
                    id="descopen"
                  >
                    {t("Description")}
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" title="Reviews" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "3" ? "active fs-18" : "fs-18"}
                    onClick={() => setActiveTab("3")}
                  >
                    {t("Reviews")}
                  </NavLink>
                </NavItem>
                {
                  desc?.item_specification?.length > 0 ?
                    <NavItem className="nav nav-tabs" title="Specification" id="myTab" role="tablist">
                      <NavLink
                        className={activeTab === "1" ? "active fs-18" : " fs-18"}
                        onClick={() => setActiveTab("1")}
                        id="speciopen"
                      >
                        {t("Specification")}
                      </NavLink>
                    </NavItem>
                    : desc?.product_attribute?.length > 3 &&
                    <NavItem className="nav nav-tabs" title="Specification" id="myTab" role="tablist">
                      <NavLink
                        className={activeTab === "1" ? "active fs-18" : " fs-18"}
                        onClick={() => setActiveTab("1")}
                        id="speciopen"
                      >
                        {t("Specification")}
                      </NavLink>
                    </NavItem>
                }
                {
                  seller?.products?.length > 0 &&
                  <NavItem className="nav nav-tabs" title="Products" id="myTab" role="tablist">
                    <NavLink
                      className={activeTab === "4" ? "active" : ""}
                      onClick={() => setActiveTab("4")}
                    >
                      {t('Products')}
                    </NavLink>
                  </NavItem>
                }
                {
                  Listings?.length > 0 &&
                  <NavItem className="nav nav-tabs" title="Services" id="myTab" role="tablist">
                    <NavLink
                      className={activeTab === "5" ? "active" : ""}
                      onClick={() => setActiveTab("5")}
                    >
                      {t('Services')}
                    </NavLink>
                  </NavItem>
                }
                {
                  desc?.seller_brands?.length > 0 &&
                  <NavItem className="nav nav-tabs" title="Brands" id="myTab" role="tablist">
                    <NavLink
                      className={activeTab === "6" ? "active fs-18" : " fs-18"}
                      onClick={() => setActiveTab("6")}
                      id="speciopen"
                    >
                      {t("Brands")}
                    </NavLink>
                  </NavItem>
                }
              </Nav>
              <TabContent activeTab={activeTab} className="nav-material product_Content">
                <TabPane tabId="1" >
                  {
                    desc?.item_specification ?
                      <div className="card border-0 doct-d">
                        {!desc?.item_specification ? (
                          <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="text-center">
                              <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                              <p className="text-muted text-center"> {t('There Have Been No Specification For yet')}.!</p>
                            </div>
                          </div>
                        ) : !desc?.item_specification?.length > 0 &&
                        (
                          <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="text-center">
                              <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                              <p className="text-muted text-center"> {t('There Have Been No Specification For yet')}.!</p>
                            </div>
                          </div>
                        )
                        }
                        {
                          desc?.item_specification?.length > 0 &&
                          // <ul className="list-group list-group-flush">
                          //   {
                          //     desc?.item_specification?.map((data,index)=> (
                          //     <li className="list-group-item d-flex" key={index}>
                          //       <p className="col">{data?.name ?? "Services"}</p>
                          //       <p className="col fw-bolder">{data?.values ?? '24 hours'}</p>
                          //     </li>
                          //     ))
                          //   }
                          //   {/* <li className="list-group-item d-flex">
                          //     <p className="col">RO Capacity (Liter/Hour)</p>
                          //     <p className="col fw-bolder">0-200 (Liter/Hour)</p>
                          //   </li> */}
                          // </ul>

                          <div className="row mt-2">
                            {
                              desc?.item_specification?.map((data, index) => (
                                <div key={index} className="col ">
                                  <div className="mb-3 d-flex justify-content-start">
                                    <h4 className="complete_1 ms-2 fs-5 text-dark fw-600 text-capitalize">{data?.name ?? "Services"}</h4>
                                  </div>
                                  <ul className="">
                                    {
                                      data?.values?.split(',')?.map((valu, i) => (<>
                                        <li className="w-100 text-truncate text-dark text-capitalize" key={i}><img src="/assets/images/tatlub-img/Icon 4.png" className="btn-img" />{valu}</li>
                                      </>))
                                    }
                                    {/* <li className="w-100"><img src="/assets/images/tatlub-img/Icon 4.png" className="btn-img"/>Traction</li> */}
                                  </ul>
                                </div>
                              ))
                            }

                          </div>
                        }
                      </div>
                      :
                      <section id="desc1" className="p-0 ">
                        {/* <p className="mb-0 pb-0 fs-5">{desc?.specifications != "null" && desc?.specifications}</p>
                        {!desc?.specifications ? (
                          <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="text-center">
                              <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                              <p className="text-muted text-center"> {t('There Have Been No Specification For yet')}.!</p>
                            </div>
                          </div>
                        ) : desc?.specifications == "null" &&
                        (
                          <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="text-center">
                              <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                              <p className="text-muted text-center"> {t('There Have Been No Specification For yet')}.!</p>
                            </div>
                          </div>
                        )
                        } */}

                        <ul className="list-group list-group-flush">
                          {
                            desc?.product_attribute?.map((data, index) => (
                              <li className="list-group-item d-flex" key={index}>
                                <p className="col">{data?.name ?? "Info"}</p>
                                <p className="col fw-bolder">{data?.value ?? ''}</p>
                              </li>
                            ))
                          }
                          {/* <li className="list-group-item d-flex">
                               <p className="col">RO Capacity (Liter/Hour)</p>
                               <p className="col fw-bolder">0-200 (Liter/Hour)</p>
                          </li> */}
                        </ul>
                      </section>
                  }

                  <section id="desc1" className="p-0 d-none">
                    <p className="mb-0 pb-0 fs-5">{desc?.specifications != "null" && desc?.specifications}</p>
                    {!desc?.specifications ? (
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-center">
                          <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                          <p className="text-muted text-center"> There Have Been No Specification For yet.!</p>
                        </div>
                      </div>
                    ) : desc?.specifications == "null" &&
                    (
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-center">
                          <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                          <p className="text-muted text-center">There Have Been No Specification For yet.!</p>
                        </div>
                      </div>
                    )
                    }
                  </section>
                </TabPane>
                <TabPane tabId="2">
                  <section id="desc1" className="p-0">
                    {/* <p>{productdetail.description}</p> */}
                    <p className="mb-0 pb-0 fs-5">
                      {desc?.item_description ?? desc?.product_description}
                    </p>
                    <p>{/* {desc?.item_features_string} */}</p>

                    {!desc?.item_description && !desc?.product_description && (
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-center">
                          {/* <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" /> */}
                          <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                          <p className="text-muted text-center">{t(`There Have Been No item description For This ${item_id ? 'Listing' : 'Product'} Yet`)}.!</p>
                        </div>
                      </div>
                    )}
                  </section>
                  {/* <p>We Are Very Well Known In The Manufacturer And Supply Of Commercial RO Plant.</p> */}
                </TabPane>
                <TabPane tabId="3" >
                  <div className="container list-group list-group-flush">
                    {desc?.reviews?.map((data, index) => {
                      // const day = data?.created_at
                      // const now = new Date('');
                      // const fetch_day = now - day
                      let day = moment(data?.created_at);
                      let day2 = new Date();
                      let now = moment(day2);
                      let ago = now.diff(day, "days");
                      let fromhour = moment.utc(day).local().startOf('seconds').fromNow()

                      return (
                        <>
                          <div className="list-group-item pb-2" key={index}>
                            <Row className="row mt-4">
                              <div className="img-width_reviw">
                                <img
                                  className="review-img-"
                                  src={data?.user_image ?? ''}
                                  onError={(e) =>
                                  (e.currentTarget.src =
                                    "/assets/images/tatlub-img/No.jpg")
                                  }
                                />
                              </div>
                              <Col className="right_review">
                                <div className="d-flex justify-content-between">
                                  <h5 className="text-capitalize">{data?.author_name}</h5>{" "}
                                  {/* <p>{ago ? ago + " Days Ago" : "Now"} </p> */}
                                  <p>{fromhour != 'Invalid date' ? fromhour : ''}</p>
                                </div>
                                <div className="d-flex alidn-items-center">
                                  <img
                                    className="company_detail_icon me-2"
                                    src="/assets/images/company/4.png"
                                  />
                                  <h6>{data?.rating ?? 1}.0</h6>
                                </div>
                                <div className="">
                                  <p className="complete_2 lh-lg">{data?.body}</p>
                                </div>
                                {
                                  data?.review_image &&
                                  <div className="row justify-content-start">
                                    <div className="col-12" >
                                      <div className="multi_imgP h-100">
                                        <img
                                          src={data?.review_image}
                                          className="rounded-3"
                                          alt="noImage"
                                          onError={(e) =>
                                          (e.currentTarget.src =
                                            "/assets/images/tatlub-img/No.jpg")
                                          }
                                        ></img>
                                      </div>
                                    </div>
                                  </div>
                                }
                              </Col>
                            </Row>
                            {/* <hr></hr> */}
                          </div>
                        </>
                      );
                    })}

                    {desc?.reviews?.length == 0 && (
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-center">
                          <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                          <p className="text-muted text-center"> {t(`There Have Been No Reviews For This  ${item_id ? 'Listing' : 'Product'} Yet`)}!</p>
                        </div>
                      </div>
                    )}
                    {!desc?.reviews && (
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-center">
                          <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                          <p className="text-muted text-center">
                            {t(`There Have Been No Reviews For This ${item_id ? 'Listing' : 'Product'} Yet`)}.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabPane>
                {/* <TabPane tabId="3" className="py-5">
                  <p className="mb-0 pb-0 text-muted text-center">
                  There Have Been No Reviews For This Product Yet.
                  </p>
                </TabPane> */}
                <TabPane tabId="4">
                  <div className="">
                    {/* {seller?.products?.length > 0 && (
                              <h5 className="fw-bolder">
                                {t("Popular Products")}
                              </h5>
                     )} */}
                    <Row>
                      {seller?.products &&
                        seller?.products
                          ?.slice(0, productLen)
                          .map((data, index) => {
                            return (
                              <>
                                <Col

                                  md="6"
                                  xs="6"
                                  xl="3 px-2 mb-3"
                                  key={index}
                                  className=""
                                >
                                  <div className="ItemS_Product h-100">
                                    <div className="card_pop-product shadow-none border d-flex flex-column justify-content-between" title={data?.meta_title}>
                                      <div
                                        className=""
                                        onClick={() =>
                                          router.push({
                                            pathname: `/product-details/${data.product_slug}`,
                                            // query: {
                                            //   product_id: data.id,
                                            // },
                                          })
                                        }
                                      >
                                        {/* <img src="/assets/images/company/12.jpg" /> */}
                                        <img
                                          src={
                                            data.product_image_medium ==
                                              null
                                              ? ""
                                              : data.product_image_medium
                                          }
                                          className="cursor-pointer object-fit-contain bg-body-tertiary"
                                          onError={(e) =>
                                          (e.currentTarget.src =
                                            "/assets/images/tatlub-img/No.jpg")
                                          }
                                        />
                                        <h6 className="text-color text-capitalize fw-bolder mt-2 cursor-pointer">
                                          {data.product_name}
                                        </h6>
                                        <h6>
                                          {data.product_price ? 'QAR: ' + parseInt(data.product_price) : 'Request For Price'}
                                        </h6>
                                        {/* <p>{data.product_slug}</p> */}
                                      </div>

                                      <Button className="btn btn-pop-proucd" onClick={() => addToCart(data)}>
                                      {/* {Loading ? <i class="fa fa-spinner box_1 me-2 fs-5" aria-hidden="true"></i> : */}
                                        <i
                                          className="fa fa-shopping-cart me-2 fs-5"
                                          aria-hidden="true"
                                        ></i>
                                        {/* } */}
                                        {t('Add To Cart')}
                                      </Button>
                                    </div>
                                  </div>
                                </Col>
                              </>
                            );
                          })}

                      {!seller?.products?.length > 0 && (
                        <div className="d-flex justify-content-center align-items-center h-100">
                          <div className="text-center">
                            <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                            <p className="text-muted text-center"> {t('Product Not Found')}.!</p>
                          </div>
                        </div>
                      )}
                    </Row>
                    {
                      productLen == seller?.products?.length ?
                        <div className="text-center">
                          <Button
                            className="btn btn_loadmore my-3"
                            onClick={() => setProductlen(8)}
                          >
                            {t("View Less")}
                          </Button>
                        </div>
                        :
                        seller?.products?.length > 7 && (
                          <div className="text-center">
                            <Button
                              className="btn btn_loadmore my-3"
                              onClick={() => setProductlen(seller?.products?.length)}
                            >
                              {t("Load More")}
                            </Button>
                          </div>
                        )}
                  </div>
                </TabPane>
                <TabPane tabId="5">
                  <Row className="">
                    {Listings?.length > 0 ?
                      Listings?.map((data, index) => {
                        return (
                          <Col
                            xl="3"
                            lg="4"
                            md="4"
                            xs="6"
                            className="mb-4"
                            key={index}
                          >
                            <div className="card d-flex flex-coloum px-0 justify-content-between product-list border-0 w-100 h-100">
                              <div className="p-2">
                                <div className="overflow-hidden rounded-4 mb-2">
                                  <Link href={{
                                   pathname: `/services/${data.item_slug}`,
                                      // query: { item_id: data.id } 
                                      }} >
                                    <img
                                      src={
                                        data?.item_image_medium
                                      }
                                      className={`card-img-top p-imgS cursor-pointer bg-white`}
                                      onError={(e) =>
                                      (e.currentTarget.src =
                                        "/assets/images/tatlub-img/No.jpg")
                                      }
                                    />
                                  </Link>
                                </div>
                                <Link href={{
                                 pathname: `/services/${data.item_slug}`,
                                    // query: { item_id: data.id }
                                     }} >
                                  <h6
                                    className="card-title text-color fs-16 text-capitalize  fw-bolder cursor-pointer"
                                  >
                                    {t(data?.item_title)}
                                  </h6>
                                </Link>
                                {data?.user && (
                                  <div className="d-flex align-items-center">
                                    <img
                                      // src="/assets/images/tatlub-img/productLogo.jpg"
                                      src={data?.user?.user_image ?? "NULL"}
                                      className="logo"
                                      onError={(e) =>
                                      (e.currentTarget.src =
                                        "/assets/images/tatlub-img/No.jpg")
                                        
                                      }
                                    />
                                    <Link href={{ pathname: "/page/vendor/vendor-profile", query: { id: data?.user?.id }, }} >
                                      <div
                                        className="card-text ps-1 cursor-pointer foot-cat d-flex align-items-center"
                                      >
                                        {" "}
                                        <span className="fs-7 ">{data?.user?.name}</span>
                                      </div>
                                    </Link>
                                  </div>
                                )}
                                <p className="card-text text-capitalize complete_2 fs-5 pt-2 ">
                                  {/* {data.item_address} */}
                                  {data?.item_location_str ?? data?.item_address}
                                </p>
                              </div>

                              <div className="px-2 pb-2">
                                <a
                                  href="#"
                                  role="button"
                                  className="btn btn_product_list w-100"
                                  data-bs-toggle="modal"
                                  data-bs-target="#QuateModal"
                                >
                                  {t('Get Quote')}
                                </a>
                              </div>
                            </div>
                          </Col>
                        );
                      }) :
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-center">
                          <img src="/assets/images/tatlub-img/not_Found.png" className="w-size" />
                          <p className="text-muted text-center">
                            {t('There Have Been No Services Yet')}.
                          </p>
                        </div>
                      </div>
                    }

                    <div className="text-center my-md-4 py-3 d-none">
                      <button type="button" className="btn_hover text-capitalize p-2 px-4">
                        {t("view More")}
                      </button>
                    </div>
                  </Row>
                </TabPane>
                <TabPane tabId="6">
                  <div className="row">
                    {
                      desc?.seller_brands?.map((value, i) => (
                        <div
                          className="col-xl-2 col-lg-3 col-sm-4 col-6 mb-3"
                          key={i}
                          title={value?.name}
                          onClick={() =>
                            router.push({
                              pathname:`/brand/product/${value.slug}`,
                              // query: { brand_id: value.id, searchList: 'product' },
                            })
                          }
                        >
                          <div className="brand-img p-3 text-center">
                            <div className="c-bg rounded">
                              <img
                                src={value?.logo}
                                // src="/assets/images/tatlub-img/Brands/Gap.jpg"
                                className="brand-img w-100 cursor-pointer rounded"
                                onError={(e) =>
                                (e.currentTarget.src =
                                  "/assets/images/tatlub-img/No.jpg")
                                }
                              ></img>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </TabPane>
              </TabContent>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductTab;
