import React, { Fragment, useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import toast1 from 'react-hot-toast';
import { useRouter } from "next/router";
import { getProductCategory, getAddToCart } from "../../../../components/core/fashion_request";
import { getMyCart, removeCart, getquantity } from '../../../../components/core/cart_request';
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Skeleton } from "primereact/skeleton";
import { getBrandbyCategory } from "../../../../components/core/shop_requests";
import itemscontex from "../../../initcontext";
// import { useSelector, useDispatch } from 'react-redux'
// import { setCart,cart, setClearCart } from "../../../../redux/slices/cart_redux";
import SettingContext from "../../../../helpers/theme-setting/SettingContext";


const MasterParallaxBanner = ({ trending, Recommended, videoList }) => {
  const [play, setPlay] = useState();
  const [pause, setpause] = useState();
  const { t } = useTranslation();
  const [sidebarView, setSidebarView] = useState(false);
  const [brand, setbrand] = useState([]);
  const [productCategory, setProductCategory] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loadeMore, setLoadmore] = useState(4);
  const [loadeMore2, setLoadmore2] = useState(3);
  const { setCart } = useContext(itemscontex)
  const [counters, setCounters] = useState([]);
  const [counters1, setCounters1] = useState([]);
  const [counters2, setCounters2] = useState([]);
  const [product, setProduct] = useState([])
  const userjsonData = localStorage.getItem('data');
  const [brandlen, setBrandLen] = useState([])
  const context = useContext(SettingContext);


  // const dispatch = useDispatch()

  const cartFun = async (data, index) => {

    if (!userData?.id) {
      document.getElementById('openLoginPopup')?.click();
    }

    let body = {
      "user_id": userData?.id,
      "seller_id": data.user_id,
      "product_id": data.id,
      "price": data.product_price,
      "quantity": counters[index] ?? 1
    }

    const response = await getAddToCart(body)
    if (response.status == 200) {
      setCart(response)
      // setCart(response)
      // dispatch(
      //   setCart({
      //     ...data,
      //     totalPrice:data?.product_price,
      //     quantity:counters1[index],
      //     itemBasePrice:data?.product_price,
      //     cartId:response.data?.id
      //   })
      // )
      // toast.info("Added to cart", {
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   icon: false,
      //   progress: undefined,
      //   theme: "dark",
      // });
      toast1.success('Added to cart')
    }
  }
  const cartFun2 = async (data, index) => {

    if (!userData?.id) {
      document.getElementById('openLoginPopup')?.click();
    }

    let body = {
      "user_id": userData?.id,
      "seller_id": data.user_id,
      "product_id": data.id,
      "price": data.product_price,
      "quantity": counters1[index] ?? 1
    }

    const response = await getAddToCart(body)
    if (response.status == 200) {
      setCart(response)
      // setCart(response)
      // dispatch(
      //   setCart({
      //     ...data,
      //     totalPrice:data?.product_price,
      //     quantity:counters1[index],
      //     itemBasePrice:data?.product_price,
      //     cartId:response.data?.id
      //   })
      // )
      // toast.info("Added to cart", {
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   icon: false,
      //   progress: undefined,
      //   theme: "dark",
      // });
      toast1.success('Added to cart')
    }
  }
  const cartFun3 = async (data, index) => {

    if (!userData?.id) {
      document.getElementById('openLoginPopup')?.click();
    }

    let body = {
      "user_id": userData?.id,
      "seller_id": data.user_id,
      "product_id": data.id,
      "price": data.product_price,
      "quantity": counters2[index] ?? 1
    }

    const response = await getAddToCart(body)
    if (response.status == 200) {
      setCart(response)
      // setCart(response)
      // dispatch(
      //   setCart({
      //     ...data,
      //     totalPrice:data?.product_price,
      //     quantity:counters1[index],
      //     itemBasePrice:data?.product_price,
      //     cartId:response.data?.id
      //   })
      // )
      // toast.info("Added to cart", {
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   icon: false,
      //   progress: undefined,
      //   theme: "dark",
      // });
      toast1.success('Added to cart')
    }
  }

  useEffect(() => {
    if (userjsonData) {
      setUserData(JSON.parse(userjsonData));
    }
  }, [userjsonData]);

  useEffect(() => {
    // setCounters(Array(productCategory[Object.keys(productCategory)[0]]?.length).fill(1))
    // setCounters1(Array(productCategory[Object.keys(productCategory)[1]]?.length).fill(1))
    // setCounters2(Array(Object.keys(productCategory).length).fill(1))
    // setCounters2(Array(productCategory))
    setCounters2(product?.map(data => data?.qnt).fill(1))
  }, [product]);

  useEffect(() => {
    setBrandLen(Object.keys(brand).map((v, i) => i).fill(6))
  }, [brand])


  const handleIncrement = (index) => {
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] += 1;
      return newCounters;
    });
  };
  const handleIncrement1 = (index) => {
    setCounters1((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] += 1;
      return newCounters;
    });
  };
  const handleIncrement2 = (index) => {
    setCounters2((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] += 1;
      return newCounters;
    });
  };

  const handleDecrement = (index) => {
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] > 1 ? newCounters[index] -= 1 : newCounters[index] = 1;
      return newCounters;
    });
  };
  const handleDecrement1 = (index) => {
    setCounters1((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] > 1 ? newCounters[index] -= 1 : newCounters[index] = 1;
      return newCounters;
    });
  };
  const handleDecrement2 = (index) => {
    setCounters2((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] > 1 ? newCounters[index] -= 1 : newCounters[index] = 1;
      return newCounters;
    });
  };

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  const productAgainstCatagory = async () => {
    const response = await getProductCategory()
    let productData = []
    let val;
    response.data?.map((item, index) => {
      val = {
        ...item,
        'qnt': index
      }
      productData.push(val)
    })
    setProduct(productData)
    const groupByCategory = productData?.reduce((group, product) => {
      const { category_name } = product;
      group[category_name] = group[category_name] ?? [];
      group[category_name].push(product);
      return group;
    }, {});
    setProductCategory(groupByCategory);

  }

  useEffect(() => {
    productAgainstCatagory();
  }, []);

  const fetchBrandList = async () => {
    try {
      setIsLoading(true);
      const response = await getBrandbyCategory();

      const separatedData = {};
      response.data?.forEach((res) => {
        if (!separatedData[res.category_name]) {
          separatedData[res.category_name] = [];
        }

        if (res.category === null) {
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

  const updateQnt = async (cart_id, key) => {
    let body = {
      "cart_id": cart_id,
      "quantity": key
    }
    getquantity(body).then(res => {

    }).catch(err => {
      console.error('err', err.message);
    })
  }

  let elementsArray = document.querySelectorAll(".tile1");
  window.addEventListener("scroll", fadeIn);
  function fadeIn() {
    for (var i = 0; i < elementsArray.length; i++) {
      var elem = elementsArray[i];
      var distInView =
        elem.getBoundingClientRect().top - window.innerHeight + 20;
      if (distInView < 0) {
        elem.classList.add("inView1");
      } else {
        elem.classList.remove("inView1");
      }
    }
  }

  let elementsArray1 = document.querySelectorAll(".tile");

  window.addEventListener("scroll", fadeIn);
  function fadeIn() {
    for (var i = 0; i < elementsArray1.length; i++) {
      var elem = elementsArray1[i];
      var distInView =
        elem.getBoundingClientRect().top - window.innerHeight + 20;
      if (distInView < 0) {
        elem.classList.add("inView1");
      } else {
        elem.classList.remove("inView1");
      }
    }
  }

  fadeIn();

  return (
    <Fragment>
      <section className="d-none">
        <Container>
          <div className="">
            <div className="d-flex justify-content-between mb-3">
              <h3 className="fw-bolder">{t("Customer Videos")}</h3>{" "}
              <a href="" className="invisible">
                <h4 className="theme_color">{t("View All")}</h4>
              </a>{" "}
            </div>
            <Row className="justify-content-start">
              {videoList.length > 0 &&
                videoList?.slice(0, 4).map((data, index) => (
                  <Col
                    lg="3"
                    md="4"
                    className="col-6 mb-2 px-2 tile1"
                    key={index}
                  >
                    <div className="home-pdc-overlay ">
                      {/* <img
                    src="/assets/images/home-vedio/1.jpg"
                    className="img-fluid img_proct4-home "
                     /> */}
                      <video
                        width="350"
                        height="230"
                        id={`player${index}`}
                        loop="loop"
                        // preload={false}
                        className="img_proct4-home"
                        src={data.video}
                        autoPlay={false}
                        controls={false}
                      ></video>
                      <div className="home-pdc">
                        {/* <a className={ play == index ? "d-none":'cursor-pointer'} id={`playon${index}`}> */}
                        <a className={"cursor-pointer"} id={`playon${index}`}>
                          <img
                            src="/assets/images/icons-23/6.png"
                            className="play-icon"
                            onClick={() => {
                              document.getElementById(`player${index}`)?.play();
                              // etPlay(index); setpause(index)
                              document.getElementById(
                                `playon${index}`
                              ).style.display = "none";
                              document.getElementById(
                                `pouseon${index}`
                              ).style.display = "block";
                            }}
                          />
                        </a>
                        {/* <a  className={ pause == index ? 'cursor-pointer' : 'd-none'} id={`pouseon${index}`}> */}
                        <a
                          c
                          className={"cursor-pointer "}
                          id={`pouseon${index}`}
                          style={{ display: "none" }}
                        >
                          <img
                            src="/assets/images/icons-23/Pause.png"
                            className="play-icon"
                            onClick={() => {
                              document
                                .getElementById(`player${index}`)
                                ?.pause();
                              // setPlay(undefined);setpause(undefined)
                              document.getElementById(
                                `pouseon${index}`
                              ).style.display = "none";
                              document.getElementById(
                                `playon${index}`
                              ).style.display = "block";
                            }}
                          />
                        </a>
                      </div>
                      {/* <iframe width="350" height="250" src={data.video} frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe> */}
                      {/* <video width="350" height="230" className="img_proct4-home" src={data.video} controls={false}></video> */}
                    </div>
                  </Col>
                ))}

              {videoList.length == 0 && (
                <Col lg="3" md="4" className="col-6 mb-2 px-2">
                  <div className="home-pdc-overlay">
                    <img
                      src="/assets/images/home-vedio/1.jp"
                      onError={(e) =>
                      (e.currentTarget.src =
                        "/assets/images/tatlub-img/No.jpg")
                      }
                      className="img-fluid img_proct4-home "
                    />
                    {/* <video width="350" height="230"  id={`player1`}  loop="loop" preload={false} className="img_proct4-home" src={data.video} autoPlay={false} controls={false}></video> */}
                    <div className="home-pdc">
                      {/* <a className={ play == index ? "d-none":'cursor-pointer'} id={`playon${index}`}> */}
                      <a className={"cursor-pointer"} id={`playon1`} >
                        <img
                          src="/assets/images/icons-23/6.png"
                          className="play-icon"
                          onClick={() => {
                            document.getElementById(`player1`)?.play();
                            // etPlay(index); setpause(index)
                            document.getElementById(`playon1`).style.display =
                              "none";
                            document.getElementById(`pouseon1`).style.display =
                              "block";
                          }}
                        />
                      </a>
                      {/* <a  className={ pause == index ? 'cursor-pointer' : 'd-none'} id={`pouseon${index}`}> */}
                      <a
                        c
                        className={"cursor-pointer "}
                        id={`pouseon1`}
                        style={{ display: "none" }}
                      >
                        <img
                          src="/assets/images/icons-23/Pause.png"
                          className="play-icon"
                          onClick={() => {
                            document.getElementById(`player1`)?.pause();
                            // setPlay(undefined);setpause(undefined)
                            document.getElementById(`pouseon1`).style.display =
                              "none";
                            document.getElementById(`playon1`).style.display =
                              "block";
                          }}
                        />
                      </a>
                    </div>
                    {/* <iframe width="350" height="250" src={data.video} frameborder="0"
                       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe> */}
                    {/* <video width="350" height="230" className="img_proct4-home" src={data.video} controls={false}></video> */}
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </Container>
      </section>

      {/* <section className="pb-5 bg-white d-none">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="mb-3">
              <h3 className="title_home text-uppercase">{(Object.keys(productCategory)[0])?.replace(/_/g, " ")}</h3>
            </div>
            {
              productCategory[Object.keys(productCategory)[0]]?.length > 6 &&
             <div className="">
              <h5 className="pb-0 text_theme cursor-pointer fs-12" onClick={()=>router.push({pathname:'/shop/left_sidebar', query: { Category: productCategory[Object.keys(productCategory)[0]][1]?.category,type:'product'}})}>
                {t("View More ")}{" "}
                <span>
                   <i className="fa fa-angle-right fs-6 pb-0 ms-2"></i>
                </span>
              </h5>
            </div>
            }
          </div>
          <div className="row w-100 m-0">
            <div className="col-xl-33">
              <div className="Ban_Category d-none d-xl-block">
                <img
                  src="/assets/images/tatlub-img/new/Banner_1.jpg"
                  className="new_nome "
                  alt="not_found" 
                  onError={(e) =>
                    (e.currentTarget.src =
                      "/assets/images/tatlub-img/No.jpg")
                  }
                />
              </div>
            </div>
            <div className="col-xl-99 ps-xl-3 ps-0 pe-0">
              <div className="row h-100">
                {productCategory[Object.keys(productCategory)[0]]?.slice(0,6).map((item, index) => {
                  return(
                    <div className="col-xl-4 col-md-6 mb-3 px-2" key={index}>
                      <div className="card_homeApli" >
                        <div className="row align-items-center">
                          <div className="col-6 position-relative">
                            <div className="" 
                            onClick={() =>
                              router.push({
                                    pathname: "/product-details/view",
                                    query: { product_id: item.id },
                                  })
                              }
                            >
                              <img
                                src={item.product_image_medium}
                                // src="/assets/images/tatlub-img/new/Products/1.jpg"
                                onError={(e) =>
                                  (e.currentTarget.src =
                                    "/assets/images/tatlub-img/no1.png")
                                }
                                className="cursor-pointer "
                              />
                            </div>
                        
                          </div>
                          <div className="col-6 ps-0">
                            <div className="">
                              <h6 className="p-0">
                              </h6>
                              <h4 className="foot-cat cursor-pointer mb-3 text-capitalize fw-600 complete_2" 
                              onClick={() =>
                                router.push({
                                      pathname: "/product-details/view",
                                      query: { product_id: item.id },
                                    })
                                }
                              >
                               {item.product_name}
                              </h4>
                              <h4 className="fw-600 mb-2">{t("QAR")} {item.product_price}</h4>
                              <div className="d-flex align-items-center">
                                <div
                                  className="qnt px-2 rounded d-flex justify-content-between align-items-center me-2"
                                  style={{ padding: "5px" }}
                                >
                                  <button
                                    type="button"
                                    className="border-0"
                                    onClick={() => {                                      
                                      handleDecrement(index);
                                    }}
                                  >
                                    -
                                  </button>
                                  <div className="mx-2">{counters[index]}</div>
                                  <button
                                    type="button"
                                    className="border-0"
                                    onClick={() => {
                                      handleIncrement(index);
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="cart_icon p-1 d-flex justify-content-center align-items-center" 
                                
                                onClick={()=>cartFun(item,index)}
                                // onClick={async() => {
                                //           if(!userData?.id){
                                //             document.getElementById('openLoginPopup')?.click();
                                //           }
                                          
                                //     let body = {
                                //       "user_id": userData?.id,
                                //       "seller_id": item.user_id,
                                //       "product_id": item.id,
                                //       "price": item.product_price,
                                //       "quantity": counters[index]
                                //     }

                                //     const response = await getAddToCart(body)
                                //     if(response.status == 200) {
                                //       setCart(response)
                                //       toast("Product added to cart", {
                                //         position: "bottom-right",
                                //         autoClose: 2000,
                                //         hideProgressBar: false,
                                //         closeOnClick: true,
                                //         pauseOnHover: true,
                                //         draggable: true,
                                //         progress: undefined,
                                //         theme: "dark",
                                //       });
                                //     }
                                // }}
                                >
                                  <i
                                    className="fa fa-shopping-cart"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>                    
                )})}
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-5 bg-white d-none">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="mb-3">
              <h3 className="title_home text-uppercase">{(Object.keys(productCategory)[1])?.replace(/_/g, " ")}</h3>
            </div>
            {
              productCategory[Object.keys(productCategory)[1]]?.length > 3 &&
            <div className="">
              <h5 className="pb-0 text_theme cursor-pointer fs-12"
               onClick={()=>router.push({pathname:'/shop/left_sidebar', query: { Category: productCategory[Object.keys(productCategory)[1]][0]?.category,searchList:'product'}})}>
                {t("View More ")}
                <span>
                   <i className="fa fa-angle-right fs-6 pb-0 ms-2"></i>
                </span>
              </h5>
            </div>
            }
          </div>
          <div className="">
          <div className="row w-100 m-0">
            <div className="col-xl-33 ">
              <div className="Ban_Category d-none d-xl-block">
                <img
                  src="/assets/images/tatlub-img/new/Banner_2.jpg"
                  className="new_nome"
                  alt="not_found"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "/assets/images/tatlub-img/No.jpg")
                  }
                />
              </div>
            </div>
            <div className="col-xl-99 ps-xl-3 ps-0 pe-0 ">
              <div className="row h-100">
              {productCategory[Object.keys(productCategory)[1]]?.slice(0,6).map((item, index) => {
                  return(
                    <div className="col-xl-4 col-md-6 mb-3 px-2" key={index}>
                      <div className="card_homeApli">
                        <div className="row align-items-center">
                          <div className="col-6 position-relative">
                            <div className="" 
                            onClick={() =>
                              router.push({
                                    pathname: "/product-details/view",
                                    query: { product_id: item.id },
                                  })
                              }
                            >
                              <img
                                src={item.product_image_medium}
                                // src="/assets/images/tatlub-img/new/Products/1.jpg"
                                onError={(e) =>
                                  (e.currentTarget.src =
                                    "/assets/images/tatlub-img/no1.png")
                                }
                                className="cursor-pointer "
                              />
                            </div>
                          </div>
                          <div className="col-6 ps-0">
                            <div className="">
                              <h6 className="p-0">
                              </h6>
                              <h4 className="foot-cat cursor-pointer text-capitalize mb-3 fw-600 complete_2" 
                              onClick={() =>
                                router.push({
                                      pathname: "/product-details/view",
                                      query: { product_id: item.id },
                                    })
                                }
                              >
                               {item.product_name}
                              </h4>
                              <h4 className="fw-600 mb-2">{t("QAR")} {item.product_price}</h4>
                              <div className="d-flex align-items-center">
                                <div
                                  className="qnt px-2 rounded d-flex justify-content-between align-items-center me-2"
                                  style={{ padding: "5px" }}
                                >
                                  <button
                                    type="button"
                                    className="border-0"
                                    onClick={() => {                                      
                                      handleDecrement1(index);
                                    }}
                                  >
                                    -
                                  </button>
                                  <div className="mx-2">{counters1[index]}</div>
                                  <button
                                    type="button"
                                    className="border-0"
                                    onClick={() => {
                                      handleIncrement1(index);
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="cart_icon p-1 d-flex justify-content-center align-items-center" onClick={async() => {
                                  //   if(!userData?.id){
                                  //     document.getElementById('openLoginPopup')?.click();
                                  //   }
                                  // let body = {
                                  //     "user_id": userData?.id,
                                  //     "seller_id": item.user_id,
                                  //     "product_id": item.id,
                                  //     "price": item.product_price,
                                  //     "quantity": counters1[index]
                                  //   }

                                  //   const response = await getAddToCart(body)
                                  //   if(response.status == 200) {
                                  //     // setCart(response)
                                  //     toast("Product added to cart", {
                                  //       position: "bottom-right",
                                  //       autoClose: 2000,
                                  //       hideProgressBar: false,
                                  //       closeOnClick: true,
                                  //       pauseOnHover: true,
                                  //       draggable: true,
                                  //       progress: undefined,
                                  //       theme: "dark",
                                  //     });
                                  //   }
                                  cartFun2(item, index)
                                }}>
                                  <i
                                    className="fa fa-shopping-cart"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>                    
                )})}
              </div>

            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="pb-lg-4 bg-white d-none">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="mb-3">
              <h3 className="title_home text-uppercase">{(Object.keys(productCategory)[2])?.replace(/_/g, " ")}</h3>
            </div>
            {
              productCategory[Object.keys(productCategory)[2]]?.length > 6 &&
              <div className="">
                <h5 className="pb-0 text-color cursor-pointer fs-12"  onClick={()=>router.push({pathname:'/shop/left_sidebar', query: { Category: productCategory[Object.keys(productCategory)[2]][0]?.category,type:'product'}})}>
                {t("View More ")}{" "}
                  <span>
                    <i className="fa fa-angle-right fs-6 pb-0 ms-2"></i>
                  </span>
                </h5>
              </div>
            }
          </div>
          <div className="row w-100 m-0">
            <div className="col-xl-33">
              <div className="Ban_Category d-none d-xl-block">
                <img
                  src="/assets/images/tatlub-img/new/Banner_3.jpg"
                  className="new_nome"
                  alt="not_found"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "/assets/images/tatlub-img/No.jpg")
                  }
                />
              </div>
            </div>
            <div className="col-xl-99 ps-xl-3 ps-0 pe-0">
              <div className="row">
              {productCategory[Object.keys(productCategory)[2]]?.slice(0,6).map((item, index) => {
                  return(
                    <div className="col-xl-4 col-md-6 mb-3 px-2" key={index}>
                      <div className="card_homeApli">
                        <div className="row align-items-center">
                          <div className="col-6 position-relative">
                            <div className="" 
                            onClick={() =>
                              router.push({
                                    pathname: "/product-details/view",
                                    query: { product_id: item.id },
                                  })
                              }
                            >
                              <img
                                src={item.product_image_medium}
                                // src="/assets/images/tatlub-img/new/Products/1.jpg"
                                onError={(e) =>
                                  (e.currentTarget.src =
                                    "/assets/images/tatlub-img/no1.png")
                                }
                                className="cursor-pointer "
                              />
                            </div>
                          </div>
                          <div className="col-6 ps-0">
                            <div className="">
                              <h6 className="p-0">
                              </h6>
                              <h4 className="foot-cat cursor-pointer text-capitalize mb-3 fw-600 complete_2" 
                              onClick={() =>
                                router.push({
                                      pathname: "/product-details/view",
                                      query: { product_id: item.id },
                                    })
                                }
                              >
                              {item.product_name}
                              </h4>
                              <h4 className="fw-600 mb-2">{t("QAR")} {item.product_price}</h4>
                              <div className="d-flex align-items-center">
                                <div
                                  className="qnt px-2 rounded d-flex justify-content-between align-items-center me-2"
                                  style={{ padding: "5px" }}
                                >
                                  <button
                                    type="button"
                                    className="border-0"
                                    onClick={() => {                                      
                                      handleDecrement2(index);
                                    }}
                                  >
                                    -
                                  </button>
                                  <div className="mx-2">{counters2[index]}</div>
                                  <button
                                    type="button"
                                    className="border-0"
                                    onClick={() => {
                                      handleIncrement2(index);
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="cart_icon p-1 d-flex justify-content-center align-items-center" onClick={async() => {
                                cartFun3(item,index)
                                }}
                                >
                                  <i
                                    className="fa fa-shopping-cart"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>                    
                )})}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <div className="bg-white">
        {
          Object.keys(productCategory)?.slice(0, loadeMore2).map((data, index1) => {

            const title = data?.replace(/_/g, " ")

            return (
              <section className="pb-5 bg-white" key={index1}>
                <div className="container">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mb-2">
                      {/* <h3 className="title_home text-uppercase">{(Object.keys(productCategory)[2])?.replace(/_/g, " ")}</h3> */}
                      <h3 className="title_home text-uppercase">{t(title)}</h3>
                    </div>
                    {
                      productCategory[data]?.length > 6 &&
                      <div className="">
                        <h5 className="pb-0 text-color text-capitalize cursor-pointer fs-12"
                          onClick={() => router.push({
                            pathname: `/category/product/${productCategory[data][0]?.categorySlug}`,
                            // query: { Category: productCategory[data][0]?.cat_id, searchList: 'product' }
                          })}>
                          {t("view More")}{" "}
                          <span>
                            <i className={`fa ${context?.state == 'en' ? 'fa-angle-left' : 'fa-angle-right'} fs-6 pb-0 ms-2`}></i>
                          </span>
                        </h5>
                      </div>
                    }
                  </div>
                  <div className="row w-100 m-0">
                    <div className="col-xl-33">
                      <div className="Ban_Category d-none d-xl-block">
                        <img
                          src={productCategory[data][0]?.banner_image}
                          className="new_nome"
                          onClick={() => router.push({
                            pathname: `/category/product/${productCategory[data][0]?.categorySlug}`,
                            // query: { Category: productCategory[data][0]?.cat_id, searchList: 'product' }
                          })}
                          alt="not_found"
                          onError={(e) =>
                          (e.currentTarget.src =
                            "/assets/images/tatlub-img/No.jpg")
                          }
                        />
                      </div>
                    </div>
                    <div className="col-xl-99 px-xl-4 ">
                      <div className="row">
                        {productCategory[data]?.slice(0, 6).map((item, index) => {
                          return (
                            <div className="col-xl-4 col-md-6 mb-3 px-2" key={index}>
                              <div className="card_homeApli">
                                <div className="row ">
                                  <div className="col-6 position-relative">
                                    <div className=""
                                      onClick={() =>
                                        router.push({
                                          pathname: `/product-details/${item.product_slug}`,
                                          // query: { product_id: item.id },
                                        })
                                      }
                                    >
                                      <img
                                        src={item.product_image_medium}
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/no1.png")
                                        }
                                        className="cursor-pointer object-fit-contain bg-light"
                                      />
                                    </div>

                                  </div>
                                  <div className={`col-6 ${context?.state == 'en' ? 'pe-3' : 'ps-0'}`}>
                                    <div className="d-flex flex-column justify-content-between h-100">
                                      <div className="">
                                        <h4 className="foot-cat cursor-pointer text-capitalize mb-3 fw-600 complete_2"
                                          onClick={() =>
                                            router.push({
                                              pathname: `/product-details/${item.product_slug}`,
                                              // query: { product_id: item.id },
                                            })
                                          }
                                        >
                                          {item.product_name}
                                        </h4>
                                        <h4 className="fw-600 mb-2">{t("QAR")} {counters2[item?.qnt] * item.product_price}</h4>
                                      </div>

                                      <div className="d-flex align-items-center">
                                        <div
                                          className="qnt px-2 rounded d-flex justify-content-between align-items-center me-2"
                                          style={{ padding: "5px", width: '83px' }}
                                        >
                                          <button
                                            type="button"
                                            className="border-0 px-2 bg-transparent"
                                            onClick={() => {
                                              handleDecrement2(item?.qnt);
                                            }}
                                          >
                                            -
                                          </button>
                                          <div className="mx-2">{counters2[item?.qnt]}</div>
                                          <button
                                            type="button"
                                            className="border-0 px-2 bg-transparent"
                                            onClick={() => {
                                              handleIncrement2(item?.qnt);
                                            }}
                                          >
                                            +
                                          </button>
                                        </div>
                                        <div className="cart_icon p-1 ms-1  d-flex justify-content-center align-items-center" onClick={async () => {
                                          cartFun3(item, item?.qnt)
                                        }}
                                        >
                                          <i
                                            className="fa fa-shopping-cart"
                                            aria-hidden="true"
                                          ></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })
        }
        {Object.keys(productCategory)?.length > loadeMore2 && (
          <div className="text-center  pb-5 ">
            <button
              type="button"
              className="btn_hover bt_suyr fw-light fw-bolder p-2 px-4"
              onClick={() => setLoadmore2(loadeMore2 + 4)}
            >
              {t('Load More')}
            </button>
          </div>
        )}
      </div>

      <section className="pb-lg-4 pb-3 bg-white">
        <div className="collection-wrapper">
          <Container>
            <Row>
              <Col className="collection-content">
                {isLoading ? (
                  <div className="page-main-content card border-0 p-3 shadow-custome card_radius mb-4">
                    <div className="d-flex justify-content-between">
                      <h4 className="fw-bolder">
                        <Skeleton width={200} />
                      </h4>
                      {/* <p className='text-color cursor-pointer'>View More</p> */}
                    </div>
                    <div className="row">
                      {[...Array(6)].map((d, index) => (
                        <div
                          className="col-xl-2 col-lg-3 col-sm-4 col-6 mb-3"
                          key={index}
                        >
                          <div className="brand-img p-3 text-center">
                            <div className="c-bg rounded">
                              <Skeleton width={170} height={170} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  Object.keys(brand)
                    .slice(0, loadeMore)
                    .map((data, index) => {

                      return (
                        <div
                          className="page-main-content card border-0 p-3 shadow-custome card_radius mb-4"
                          key={index}
                        >
                          <div className="d-flex justify-content-between">
                            <h4 className="fw-bolder fs-18 text-capitalize">
                              {data == "undefined" ? t("General") : t(data)}{" "}
                            </h4>
                            {
                              brand[data].length > brandlen[index] &&
                              <p className='text-color text-capitalize cursor-pointer'
                                onClick={() => {
                                  // router.push({pathname:'/shop/left_sidebar',query:{ Category:brand[data][0].category }});
                                  setBrandLen((e) => {
                                    const count = [...e]
                                    count[index] = brand[data].length
                                    return count
                                  })
                                }}
                              >{t('view More')}</p>
                            }
                          </div>
                          <div className="row">
                            {brand[data].length > 0 &&
                              brand[data]?.slice(0, brandlen[index]).map((value, i) => (
                                <div
                                  className="col-xl-2 col-lg-3 col-sm-4 col-6 mb-3"
                                  key={i}
                                  onClick={() =>
                                    router.push({
                                      pathname: `/brand/product/${value.slug}`,
                                      // query: { brand: value.slug, searchList: 'product' },
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

                {Object.keys(brand)?.length > loadeMore && (
                  <div className="text-center my-md-4 py-3">
                    <button
                      type="button"
                      className="btn_hover bt_suyr fw-light fw-bolder p-2 px-4"
                      onClick={() => setLoadmore(loadeMore + 4)}
                    >
                      {t('Load More')}
                    </button>
                  </div>
                )}
                {/* {!brand ||
                    (brand.length == 0 && (
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src="/assets/images/tatlub-img/Manage Orders.png"
                          className="w-50"
                        />
                      </div>
                    ))} */}
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="pt-4 pt-0 d-none">
        <Container>
          <Row>
            <Col lg="6" className="mb-3 tile">
              <div className="pop_card_categty py-3 px-lg-4 px-3 ">
                <div className="d-flex justify-content-between my-3">
                  <h3 className="fw-bolder">{t("Trending Projects")}</h3>{" "}
                  <Link href="/trendinproject/trending_project">
                    <h4 className="theme_color cursor-pointer">
                      {t("View All")}
                    </h4>
                  </Link>{" "}
                </div>
                <Row>
                  {trending?.length > 0 &&
                    trending?.slice(0, 4).map((data, index) => {
                      return (
                        <Col
                          className="col-6 mb-3 px-2"
                          key={index}
                          title={data.item_title}
                        >
                          <div
                            className="card_theme_categty"
                            onClick={() =>
                              router.push(
                                "/layouts/Propertydetail?property_id=" +
                                data.id,
                                "/layouts/Propertydetail"
                              )
                            }
                          >
                            {/* <img src="/assets/images/trending-projects/8.jpg"  className="img-fluid img_proct5-home "/> */}
                            <img
                              src={data.item_image_medium ?? "null"}
                              onError={(e) =>
                              (e.currentTarget.src =
                                "/assets/images/tatlub-img/No.jpg")
                              }
                              className="img-fluid img_proct5-home "
                            />
                            <div className="">
                              <h4 className="cursor-pointer foot-cat footer_links text-capitalize">
                                {data.item_title}
                              </h4>
                            </div>
                          </div>
                        </Col>
                      );
                    })}

                  {trending?.length == 0 && (
                    <Col className="col-6 mb-3 px-2">
                      <div className="card_theme_categty">
                        <Skeleton
                          className="rounded-3"
                          width={280}
                          height={250}
                          shape="rectangle"
                        />
                        <div className="">
                          <h4 className="cursor-pointer foot-cat">
                            <Skeleton />
                          </h4>
                        </div>
                      </div>
                    </Col>
                  )}
                  {/* <Col className="col-6 mb-3 px-2" >
                         <div className="card_theme_categty">
                            <img src="/assets/images/trending-projects/7.jpg"  className="img-fluid img_proct5-home "/>
                            <div className=""><h4>Apartments</h4></div>
                         </div>
                       </Col>
                       <Col className="col-6 mb-3 px-2" >
                         <div className="card_theme_categty">
                            <img src="/assets/images/trending-projects/4.jpg"  className="img-fluid img_proct5-home "/>
                            <div className=""><h4>Individual Villa</h4></div>
                         </div>
                       </Col>
                       <Col className="col-6 mb-3 px-2" >
                         <div className="card_theme_categty">
                            <img src="/assets/images/trending-projects/3.jpg"  className="img-fluid img_proct5-home "/>
                            <div className=""><h4>Villa</h4></div>
                         </div>
                       </Col> */}
                </Row>
              </div>
            </Col>
            <Col lg="6" className="mb-3 tile">
              <div className="pop_card_categty py-3 px-lg-4 px-3 ">
                <div className="d-flex justify-content-between my-3">
                  <h3 className="fw-bolder">{t("Recommended Properties")}</h3>{" "}
                  {/* <Link href="/shop/left_sidebar" className="">
                    <h5 className="theme_color cursor-pointer">{t("View All")}</h5>
                  </Link>{" "} */}
                  <Link href="/recommendedproject/recommend_project">
                    <h4 className="theme_color cursor-pointer">
                      {t("View All")}
                    </h4>
                  </Link>{" "}
                </div>
                <Row>
                  {Recommended?.length > 0 &&
                    Recommended?.slice(0, 4).map((data, index) => {
                      return (
                        <Col
                          className="col-6 mb-3 px-2"
                          key={index}
                          title={data.item_title}
                        >
                          <div
                            className="card_theme_categty"
                            // onClick={()=>router.push({pathname:'/layouts/Propertydetail',query:{ property_id:data.id}})}
                            onClick={() =>
                              router.push(
                                "/layouts/Propertydetail?property_id=" +
                                data.id,
                                "/layouts/Propertydetail"
                              )
                            }
                          >
                            {/* <img src="/assets/images/trending-projects/6.jpg"  className="img-fluid img_proct5-home "/> */}
                            <img
                              src={
                                data.item_image_medium == null
                                  ? ""
                                  : data.item_image_medium
                              }
                              onError={(e) =>
                              (e.currentTarget.src =
                                "/assets/images/tatlub-img/No.jpg")
                              }
                              className="img-fluid img_proct5-home "
                            />
                            <div className="">
                              <h4 className="cursor-pointer foot-cat">
                                {data.item_title}
                              </h4>
                            </div>
                          </div>
                        </Col>
                      );
                    })}

                  {Recommended?.length == 0 && (
                    <Col className="col-6 mb-3 px-2">
                      <div className="card_theme_categty">
                        <Skeleton
                          className="rounded-3"
                          width={280}
                          height={250}
                          shape="rectangle"
                        />
                        <div className="">
                          <h4 className="cursor-pointer foot-cat">
                            <Skeleton />
                          </h4>
                        </div>
                      </div>
                    </Col>
                  )}

                  {/* <Col className="col-6 mb-3 px-2" >
                         <div className="card_theme_categty">
                            <img src="/assets/images/trending-projects/5.jpg"  className="img-fluid img_proct5-home "/>
                            <div className=""><h4>Rajesh Real Estate</h4></div>
                         </div>
                       </Col>
                       <Col className="col-6 mb-3 px-2" >
                         <div className="card_theme_categty">
                            <img src="/assets/images/trending-projects/1.jpg"  className="img-fluid img_proct5-home "/>
                            <div className=""><h4>MM SHA Apartments</h4></div>
                         </div>
                       </Col>
                       <Col className="col-6 mb-3 px-2" >
                         <div className="card_theme_categty">
                            <img src="/assets/images/trending-projects/1.jpg"  className="img-fluid img_proct5-home "/>
                            <div className=""><h4>DNS Apartments</h4></div>
                         </div>
                       </Col> */}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default MasterParallaxBanner;





