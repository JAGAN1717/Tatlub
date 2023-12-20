import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Media, Modal, ModalBody } from "reactstrap";
import { useQuery } from "@apollo/client";
// import { gql } from '@apollo/client';
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { Slider4 } from "../../../services/script";
import { getRecommended } from '../../../components/core/fashion_request'
import { addToCart } from "../../../components/core/product_request";
import { useTranslation } from 'react-i18next';
// import Filter from "../common/filter";
import AuthContex from '../../../components/auth/AuthContex'
import { ToastContainer, toast } from "react-toastify";
import toast1 from 'react-hot-toast';


// const GET_PRODUCTS = gql`
//   query products($type: _CategoryType!, $indexFrom: Int!, $limit: Int!) {
//     products(type: $type, indexFrom: $indexFrom, limit: $limit) {
//       items {
//         id
//         title
//         description
//         type
//         brand
//         category
//         price
//         new
//         stock
//         sale
//         discount
//         variants {
//           id
//           sku
//           size
//           color
//           image_id
//         }
//         images {
//           image_id
//           id
//           alt
//           src
//         }
//       }
//     }
//   }
// `;

const ProductSection = ({ recom }) => {
  const router = useRouter();
  const { userData } = useContext(AuthContex)
  const curContext = useContext(CurrencyContext);
  const wishlistContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const symbol = curContext.state.symbol;
  const currency = curContext.state;
  const cartCtx = useContext(CartContext);
  // const addToCart = cartCtx.addToCart;
  const quantity = cartCtx.quantity;
  const plusQty = cartCtx.plusQty;
  const minusQty = cartCtx.minusQty;
  const setQuantity = cartCtx.setQuantity;
  const [selectedProduct, setSelectedProduct] = useState();
  const [modal, setModal] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const toggle = () => setModal(!modal);
  const uniqueTags = [];
  const { t } = useTranslation();
  const [Loading,setLoading] = useState(false)

  useEffect(() => {
    setRecommended(recom)
  }, [recom])


  const fetchAddToCart = async (id, userId, price) => {
    setLoading(true)
    let body = {
      user_id: userData?.id,
      seller_id: userId,
      product_id: id,
      price: price,
      quantity: 1,
    };

    if (!userData?.id) {
      document.getElementById('openLoginPopup')?.click();
    }

    addToCart(body)
      .then((res) => {
        setLoading(false)
        if (res.status == 200) {
          // setCart(res)
          // toast.info("ADDED TO CART ", {
          //   position: "bottom-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   icon: false,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "dark",
          // });
          toast1.success('ADDED TO CART')
        }
      })
      .catch((error) => {
        console.error("err", error.message);
        setLoading(false)
      });
  };

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const clickProductDetail = (product) => {
    const titleProps = product.title.split(" ").join("");
    router.push(`/product-details/${product.id}` + "-" + `${titleProps}`, undefined, { shallow: true });
  };

  const getSelectedProduct = (item) => {
    setSelectedProduct(item);
    toggle();
  };

  const fetchRecomProduct = async () => {
    const responcedata = await getRecommended()
    setRecommended(responcedata.data)
    // console.log('text',responcedata)
  }

  const customeSlider = React.createRef();

  const gotoNext = () => {
    customeSlider.current.slickNext()
  }

  const gotoPrev = () => {
    customeSlider.current.slickPrev()
  }

  // var { loading, data } = useQuery(GET_PRODUCTS, {
  //   variables: {
  //     type: "fashion",
  //     indexFrom: 0,
  //     limit: 8,
  //   },
  // });

  // useEffect(()=>{
  //   fetchRecomProduct();
  // },[])


  return (<>
    {
      recommended?.length > 0 ?
        <section className="ratio_asos">
          {/* <Container> */}

            <Row>
              <Col  xs="12">
                
                <Row>
                  <Col className="product-related mt-lg-4 mt-2">
                    <h4 className="fw-bolder fs-20">{t('Recommended Products')}</h4>
                  </Col>
                  <Col className={`mt-lg-4 mt-2 d-flex flex-row-reverse ${recommended?.length > 5 ? '' : 'd-none'}`}>
                    <div className="slide-arr mx-2 rounded" onClick={() => gotoNext()}>
                      {/* <img src="/assets/images/tatlub-img/slid-3.png" className="p-2 " alt="..." /> */}
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                    <div className="slide-arr mx-2 rounded" onClick={() => gotoPrev()}>
                      {/* <img src="/assets/images/tatlub-img/slid-4.png" className="p-2" alt="..." /> */}

                      <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </div>
                  </Col>
                </Row>


                <Slider {...Slider4} dots='false' ref={customeSlider} className="slide-4 offer-slider product_slider_ Recommended_Products">
                  {
                    recommended?.map((data, index) => {
                      return (<>
                        <slick-list key={index} >
                          <div className="card product-list border-0 w-100 mb-3 product-detail-card shadow"  >
                            {/* <img src="/assets/images/tatlub-img/pList-1.jpg" className="p-2 card-img-top" alt="..." /> */}
                            <img src={data.product_image_medium == null ? '' : data.product_image_medium}
                              onError={(e) => e.currentTarget.src = '/assets/images/tatlub-img/No.jpg'}
                              className="p-2 card-img-top cursor-pointer object-fit-contain bg-white" alt="..."
                              onClick={() =>
                                router.push({
                                  pathname: `/product-details/${data.product_slug}`,
                                  // query: { product_id: data.id },
                                })
                              }
                            />
                            <div className="p-2">
                              <h5 className="card-title text-capitalize text-color fw-bolder cursor-pointer"
                                onClick={() =>
                                  router.push({
                                    pathname: `/product-details/${data.product_slug}`,
                                    // query: { product_id: data.id },
                                  })
                                }
                              >{data.product_name}</h5>
                              {
                                data?.user &&
                                <div className=" d-flex ">
                                  <img src={data?.user?.user_image ?? ''} onError={(e) => e.currentTarget.src = '/assets/images/tatlub-img/No.jpg'} className="logo" />
                                  <div className="card-text ps-1 d-flex text-capitalize align-items-center">{data?.user?.name}</div>
                                </div>
                              }
                              <p className=" card-text fw-bolder"><img src="/assets/images/tatlub-img/locate.png" className="d-none" />{data.item_address}</p>
                              <div className="">
                                <a href="#" className="btn btn_header w-100 m-0" onClick={() => fetchAddToCart(data.id, data?.user_id, data?.product_price)}>
                                {/* {Loading ? <i class="fa fa-spinner box_1 me-2 fs-5" aria-hidden="true"></i> : */}
                                      <i
                                        className="fa fa-shopping-cart me-2 fs-5"
                                        aria-hidden="true"
                                      ></i>
                                    {/* } */}
                                  {t('Add To Cart')}
                                </a>
                              </div>
                            </div>
                          </div>
                        </slick-list>
                        
                      </>)
                    })
                  }

                </Slider>

              </Col>
            </Row>
          {/* </Container> */}
        </section> : <div className="mb-3"></div>
    }

  </>);
};

export default ProductSection;
