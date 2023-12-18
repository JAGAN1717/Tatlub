import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import Menu2 from "../../../public/assets/images/mega-menu/2.jpg";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import FilterContext from "../../../helpers/filter/FilterContext";
import ProductItem from "../../../components/common/product-box/ProductBox1";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import { useRouter } from "next/router";
import PostLoader from "../../../components/common/PostLoader";
import CartContext from "../../../helpers/cart";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import Link from "next/link";
import {
  getAboutUs,
  getItemsList,
  getItemByCategory,
  getItemByLazyload,
  getProductBycategory,
  getAllItemByLazyload,
  getAllListing,
  getAllitemsLazyload,
  getItemBybrand,
  getAllproducts,
  getProductBybrand,
} from "../../../components/core/shop_requests";
import { getSellerMail, getUserSearchList } from "../../../components/headers/core/_request";
import { getSearchlist, getSearchProductlist } from "../../../components/core/fashion_request";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import { Skeleton } from "primereact/skeleton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { postQuotes } from "../../../components/core/seller_request";
import { addToCart } from '../../../components/core/product_request'
import AuthContex from "../../../components/auth/AuthContex";
import itemscontex from "../../initcontext";
import { setmainId, mainId } from "../../../IDmain";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import moment from "moment";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const GET_PRODUCTS = gql`
  query products(
    $type: _CategoryType!
    $indexFrom: Int!
    $limit: Int!
    $color: String!
    $brand: [String!]!
    $sortBy: _SortBy!
    $priceMax: Int!
    $priceMin: Int!
  ) {
    products(
      type: $type
      indexFrom: $indexFrom
      limit: $limit
      color: $color
      brand: $brand
      sortBy: $sortBy
      priceMax: $priceMax
      priceMin: $priceMin
    ) {
      total
      hasMore
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        sale
        stock
        discount
        variants {
          id
          sku
          size
          color
          image_id
        }
        images {
          image_id
          id
          alt
          src
        }
      }
    }
  }
`;

const ProductList = ({
  colClassnaclassName,
  layoutList,
  openSidebar,
  noSidebar,
  props,
  filter_id,
  brandfilered,
  // brand,
  // Category
}) => {
  const { t } = useTranslation();
  const cartContext = useContext(CartContext);
  // const quantity = cartContext.quantity;
  const [quantity, setQuantity] = useState(1);
  const wishlistContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const curContext = useContext(CurrencyContext);
  const [grid, setGrid] = useState(colClassnaclassName);
  const symbol = curContext.state.symbol;
  // const filterContext = useContext(FilterContext);
  // const selectedBrands = filterContext.selectedBrands;
  // const selectedColor = filterContext.selectedColor;
  // const selectedPrice = filterContext.selectedPrice;
  // const selectedCategory = filterContext.state;
  // const selectedSize = filterContext.selectedSize;
  const [sortBy, setSortBy] = useState("AscOrder");
  const [aboutUss, setAboutUs] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Loading, setLoading] = useState(false)
  const [layout, setLayout] = useState(layoutList);
  const [url, setUrl] = useState();
  const [list, setlist] = useState(false);
  const [items, setItems] = useState([]);
  const [showContact, setSContact] = useState(true)
  const [productlist, setproductlist] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [itemsLength, setItemsLength] = useState([]);
  const { Category, brand, listing_id, search, len, searchList, type } = router.query;
  const [categoryId, setCategoryId] = useState(0);
  const [brandId, setBrandId] = useState(0);
  const [listingId, setListingId] = useState(0);
  const [itemsID, setItemsID] = useState(0);
  const { userData } = useContext(AuthContex);
  const { setCart } = useContext(itemscontex)
  const [open, setOpen] = React.useState(false);



  useEffect(() => {
    setSContact(Array(items.length)?.fill(true))
  }, [items])

  const fectSearchList = async (listid) => {
    const roleId =
      JSON.parse(localStorage.getItem("data"))?.id ??
      JSON.parse(sessionStorage.getItem("data"))?.id;

    const sellerMail = await getSellerMail(listid);
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        console.log("ipAdress", data.ip);
        let arr = [listid];
        let body = {
          user_id: roleId,
          ip_address: data.ip,
          search_term: search,
          listing_id: arr,
          email: sellerMail.data?.slice(0, 10).map((data1) => data1?.email),
          seller_id: sellerMail.data?.slice(0, 10).map((data1) => data1?.id),
          first_name: "Tat",
          last_name: "Lub",
          subject: "You have a new Lead",
          message:
            "Hi,Seller This is a mail from Tatlub that your bussiness is searched by our Customers take this lead to make your bussiness grow bigger with us.",
        };
        const responce = getUserSearchList(body)
          .then((res) => {
            console.log("spd", res);
            // alert('spd')
          })
          .catch((err) => {
            console.log("eee", err);
            // alert(err)
          });
      })
      .catch((error) => console.error(error));
  };

  // const { Category } = router?.location?.state;
  const initialValues = {
    item_id: "",
    item_lead_name: "",
    item_lead_email: "",
    item_lead_phone: "",
    item_lead_message: "",
  };
  const formValidation = Yup.object().shape({
    item_lead_name: Yup.string().required("Enter you Name"),
    item_lead_email: Yup.string()
      .email("Please Enter Valid Email Id")
      .required("Enter you Email Id"),
    item_lead_phone: Yup.string().min(7, "Phone number must be at least 7 Digits").required("Enter your Mobile Number"),
    item_lead_message: Yup.string(),
  });

  useEffect(() => {
    if (searchList == 'product') {
      setQuantity(Array(items?.length)?.fill(1))
      setLoading(Array(items?.length)?.fill(false))
    }
  }, [items])

  const fetchAddToCart = async (productId, sellerId, price, qnt, index) => {
    setLoading((pre) => {
      const old = [...pre];
      old[index] = true
      return old
    })
    if (!userData?.id) {
      document.getElementById('openLoginPopup')?.click();
      setLoading((pre) => {
        const old = [...pre];
        old[index] = false
        return old
      })
    }

    let body = {
      user_id: userData?.id,
      seller_id: sellerId,
      product_id: productId,
      price: price,
      quantity: qnt,
    };

    addToCart(body)
      .then((res) => {
        if (res.status == 200) {
          setCart(res)
          setLoading((pre) => {
            const old = [...pre];
            old[index] = false
            return old
          })
          toast.info("ADDED TO CART ", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            icon: false,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        console.error("err", error.message);
        setLoading((pre) => {
          const old = [...pre];
          old[index] = false
          return old
        })
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        const body = {
          item_id: itemsID,
          item_lead_name: values.item_lead_name,
          item_lead_email: values.item_lead_email,
          item_lead_phone: values.item_lead_phone,
          item_lead_message: values.item_lead_message,
        };
        // document.getElementById("openloaderModal")?.click();
        setOpen(true);
        const response = await postQuotes(body);
        setOpen(false);
        // document.getElementById("closeloaderModal")?.click();
        if (response.status == 200) {
          document.getElementById("closeQuotesmodal")?.click();
          toast.info("SAVE SUCCESSFULL", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            icon: false,
          });
        } else {
          toast.error("Somthing Went Wrong!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        setOpen(false);
        // document.getElementById("closeloaderModal")?.click();
        console.error("err", error.message);
        setStatus("The details is incorrect");
        toast.error("The details is incorrect!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setSubmitting(false);
      }

      resetForm();
    },
  });

  useEffect(() => {
    if (Category) {
      setCategoryId(Category);
    } else if (brand) {
      setBrandId(brand);
    }
    if (listing_id) {
      setListingId(listing_id);
    }
  }, [Category, brand, listing_id]);

  const fetchItemsdata = async () => {
    try {
      setIsLoading(true);
      const id = Category ?? mainId();
      // const response = await getItemsList();
      let response;
      if (searchList == 'product') {
        response = await getProductBycategory(id, 0);
      } else {
        response = await getItemByLazyload(id, 0);
      }
      setItems(response.data);
      setItemsLength(response?.count);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
      setItemsLength(0);
      setIsLoading(false);
    }
  };

  const RestItemsdata = async () => {
    try {
      setHasMore(true);
      setItems();
      setIsLoading(true);
      const id = Category ?? mainId();
      // const response = await getItemsList();
      const response = await getItemByLazyload(id, 0);
      setItems(response.data);
      setItemsLength(response.count);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
    }
  };

  const fetchitemsbyBrand = async () => {
    try {
      setIsLoading(true);
      const id = brand;
      const length = items?.length;
      // const response = await getItemBybrand(id,0);
      const response = await getProductBybrand(id, 0);
      setItems(response.data);
      setItemsLength(response.count);
      console.error("jgfhgsd", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
      setItemsLength(0);
      setIsLoading(false);
    }
  };

  const fetchprodbyBrand = async (barandId) => {
    try {
      setIsLoading(true);
      const id = barandId;
      const length = items?.length;
      // const response = await getItemBybrand(id,0);
      const response = await getProductBybrand(id, 0);
      setItems(response.data);
      setItemsLength(response.count);
      console.error("jgfhgsd", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
      setItemsLength(0);
      setIsLoading(false);
    }
  };

  const fetchProductbyCategory = async () => {
    try {
      setIsLoading(true);
      const id = Category;
      const length = items?.length;
      // const response = await getItemBybrand(id,0);
      const response = await getProductBycategory(id, 0);
      setItems(response.data);
      setItemsLength(response.count);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
    }
  };

  // useEffect(()=> {
  //   len &&  setItemsLength(len)
  // },[len])

  const fetchAllitems = async () => {
    try {
      setIsLoading(true);
      const id = listing_id;
      const length = items?.length;
      const response = await getAllListing(id, 0);
      setItems(response.data);
      setItemsLength(len);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
      setItemsLength(0);
      setIsLoading(false);
    }

    // const userId = JSON.parse(sessionStorage.getItem('data'))?.id
    // fetch('https://api.ipify.org?format=json')
    // .then(response => response.json())
    // .then(data =>{
    //   let arr = [listing_id]
    //   let body = {
    //     "user_id": userId,
    //     "ip_address":data.ip,
    //     "search_term": 'searchKey',
    //     "listing_id":arr,
    //     "email":response?.data?.forEach(val => val?.user?.email),
    //     "first_name":"Tat",
    //     "last_name":"Lub",
    //     "subject":"You have a new Lead",
    //     "message":"Hi,Seller This is a mail from Tatlub that your bussiness is searched by our Customers take this lead to make your bussiness grow bigger with us."
    //   }
    //   const responce = getUserSearchList(body);

    // })
    // .catch(error => console.error(error));
  };

  const fetchAllitems2 = async () => {
    try {
      setIsLoading(true);
      const id = "";
      const length = items?.length;
      const response = await getAllListing(id, 0);
      setItems(response.data);
      setItemsLength(response.count);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
    }
  };

  const fetchfilterbydata = async () => {
    try {
      setIsLoading(true);
      const id = filter_id;
      const length = items?.length;
      let response = []
      if (searchList == 'product') {
        response = await getProductBycategory(id, 0);
      } else {
        response = await getItemByLazyload(id, 0);
      }
      setItems(response.data);
      setItemsLength(response.count);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
    }
  };

  const fetchfilterbybrandlist = async () => {
    try {
      setIsLoading(true);
      const id = brandfilered;
      const length = items?.length;
      const response = await getItemBybrand(id, 0);
      setItems(response.data);
      setItemsLength(response.count);
      setIsLoading(false);
    } catch (error) {
      console.error("err", error.message);
    }
  };

  const fetchSearchbyCommon = async () => {
    try {
      setIsLoading(true);
      const response = await getSearchlist(search);
      if (response.data.length > 0) {
        let ids = [];
        response.data?.forEach((e) => ids.push(e.id));
        setItems(response.data);
        setItemsLength(response.data?.length ?? 0)
        // fectSearchList(ids.join());
        router.push({
          // pathname: "/shop/left_sidebar",
          query: { search: search, len: response.data.length, searchList: 'service' },
        });

        let preSearch = []
        let orderCoun1 = 0
        let orderCoun2 = 10
        const alter = JSON.parse(localStorage.getItem('preSearch')) ?? []
        const find = alter?.find((e) => e.key == search)
        if (find) {
          let addCount = find.count < find.total ? find.count + 10 : 10
          alter.filter(e => e.key != find.key)
          preSearch.push(...alter.filter(e => e.key != find.key), { key: search, precount: find.count, count: addCount, total: response.data.length, date: find.date })
          localStorage.setItem('preSearch', JSON.stringify(preSearch))
          orderCoun1 = find.count
          orderCoun2 = addCount
        } else {
          const date = new Date()
          const Now = moment(date).format('DD-MM-YYYY')
          // const today = new Date();
          // today.setHours(23, 59, 59, 999);
          // const endOfDayTimestamp = today.getTime();
          preSearch.push(...alter, { key: search, precount: 0, count: 10, total: response.data.length, date: Now })
          localStorage.setItem('preSearch', JSON.stringify(preSearch))
          //  localStorage.setItem('preSearch',JSON.stringify({
          //   initial: preSearch,
          //   expiresOn: endOfDayTimestamp
          //  }))
        }
        let orderList = []
        let ids2 = []
        response.data?.slice(orderCoun1, orderCoun2)
        orderList.push(...response.data?.slice(orderCoun1, orderCoun2), ...response.data?.slice(orderCoun2))
        orderList.forEach((r) => ids2.push(r.id))
        //  setItems(orderList) 
        fectSearchList(ids2.join())
        setIsLoading(false)
      } else {
        const response = await getSearchProductlist(search);
        if (response.data?.length > 0) {
          let ids = [];
          response.data?.forEach((e) => ids.push(e.id));
          setItems(response.data);
          setItemsLength(response.data?.length ?? 0)
          fectSearchList(ids.join());
          router.push({
            query: { search: search, len: response.data.length, searchList: 'product' },
          });
          setIsLoading(false)
        } else {
          const local = localStorage.getItem('city')
          router.push({
            pathname: "/NotFound/search",
            query: { search: search, city: local },
          })
        }
      }
      // setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.log("errr1", err.message);
    }
  }



  const fetchSearchList = async () => {
    try {
      setIsLoading(true);
      const response = await getSearchlist(search);
      if (response.data.length > 0) {
        let ids = [];
        response.data?.forEach((e) => ids.push(e.id));
        setItems(response.data);
        setItemsLength(response.data?.length ?? 0)
        fectSearchList(ids.join());
        router.push({
          query: { search: search, len: response.data.length, searchList: 'service' },
        });
        setIsLoading(false)
      } else {
        const local = localStorage.getItem('city')
        router.push({
          pathname: "/NotFound/search",
          query: { search: search, city: local },
        })
      }

    } catch (err) {
      console.log("errr", err.message);
    }
  }


  const fetchSearchProductList = async () => {
    try {
      setIsLoading(true);
      const response = await getSearchProductlist(search);
      if (response.data?.length > 0) {
        let ids = [];
        response.data?.forEach((e) => ids.push(e.id));
        setItems(response.data);
        setItemsLength(response.data?.length ?? 0)
        fectSearchList(ids.join());
        router.push({
          query: { search: search, len: response.data.length, searchList: 'product' },
        });
        setIsLoading(false)
      } else {
        const local = localStorage.getItem('city')
        router.push({
          pathname: "/NotFound/search",
          query: { search: search, city: local },
        })
      }
      // setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.log("errr", err.message);
    }
  }

  useEffect(() => {
    if (search) {
      if (searchList == 'product') {
        fetchSearchProductList()
      } else if (searchList == 'service') {
        fetchSearchList()
      } else {
        fetchSearchbyCommon()
      }
    }
  }, [search])

  useEffect(() => {
    // categoryId && fetchItemsdata();
    // brandId && fetchitemsbyBrand();
    filter_id && fetchfilterbydata();
  }, [filter_id]);

  useEffect(() => {
    if (searchList == 'product') {
      brandfilered && fetchprodbyBrand(brandfilered)
    } else {
      brandfilered && fetchfilterbybrandlist();
    }
  }, [brandfilered]);

  useEffect(() => {
    Category && !brandfilered && fetchItemsdata();
  }, [Category]);

  useEffect(() => {
    brand && fetchitemsbyBrand();
  }, [brand]);

  useEffect(() => {
    listing_id && fetchAllitems();
  }, [listing_id]);

  useEffect(() => {
    !brand && !Category && !listing_id && !search && !searchList && (fetchAllitems2);
  }, []);

  // var { loading, data, fetchMore } = useQuery(GET_PRODUCTS, {
  //   variables: {
  //     type: selectedCategory,
  //     priceMax: selectedPrice.max,
  //     priceMin: selectedPrice.min,
  //     color: selectedColor,
  //     brand: selectedBrands,
  //     sortBy: sortBy,
  //     indexFrom: 0,
  //     limit: limit,
  //   },
  // });

  // const handlePagination = () => {
  //   setIsLoading(true);
  //   setTimeout(
  //     () =>
  //       fetchMore({
  //         variables: {
  //           indexFrom: data.products.items.length,
  //         },
  //         updateQuery: (prev, { fetchMoreResult }) => {
  //           if (!fetchMoreResult) return prev;
  //           setIsLoading(false);
  //           return {
  //             products: {
  //               __typename: prev.products.__typename,
  //               total: prev.products.total,
  //               items: [
  //                 ...prev.products.items,
  //                 ...fetchMoreResult.products.items,
  //               ],
  //               hasMore: fetchMoreResult.products.hasMore,
  //             },
  //           };
  //         },
  //       }),
  //     1000
  //   );
  // };

  // const removeBrand = (val) => {
  //   const temp = [...selectedBrands];
  //   temp.splice(selectedBrands.indexOf(val), 1);
  //   filterContext.setSelectedBrands(temp);
  // };

  // const removeSize = (val) => {
  //   const temp = [...selectedSize];
  //   temp.splice(selectedSize.indexOf(val), 1);
  //   filterContext.setSelectedSize(temp);
  // };

  // const removeColor = () => {
  //   filterContext.setSelectedColor("");
  // };


  const itemsListLazyLoad = async () => {
    if (itemsLength == items?.length && itemsLength != 0 && items?.length != 0) {
      setHasMore(false);
    }

    // const id = Category
    const length = items?.length;
    let response = [];
    if (filter_id) {
      if (searchList == 'product') {
        response = await getProductBycategory(filter_id, length)
      } else {
        response = await getItemByLazyload(filter_id, length);
      }
    }

    if (categoryId && !filter_id && !brandfilered) {
      if (searchList == 'product') {
        setBrandId();
        response = await getProductBycategory(categoryId, length);
      } else {
        setBrandId();
        response = await getItemByLazyload(categoryId, length);
      }
    }


    if (brandId && !brandfilered) {
      setCategoryId();
      // response =  await getItemBybrand(brandId,length)
      response = await getProductBybrand(brandId, length);
    }

    if (brandfilered) {
      if (searchList == 'product') {
        response = await getProductBybrand(brandfilered, length);
      } else {
        response = await getItemBybrand(brandfilered, length);
      }
    }

    if (!filter_id && !categoryId && !brandId && !brandfilered) {
      // response =  await getAllItemByLazyload(listingId,length)
      response = await getAllListing(listingId, length);
    }
    // const response = await getAllitemsLazyload(length)
    setItems((post) => [...post, ...response?.data]);
  };

  return (
    <>
      <button
        type="button"
        id="resetFIlterALL"
        className="d-none"
        onClick={() => {
          if (search) {
            if (searchList == 'product') {
              fetchSearchProductList()
            } else {
              fetchSearchList()
            }
          } else if (brand) {
            fetchitemsbyBrand()
          } else {
            fetchItemsdata()
          }
        }
        }
      ></button>

      {!list ? (
        <Col
          lg="8"
          xl="9"
          className="collection-content body-layoyt px-sm-3 px-2"
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-start mt-3 mb-2">
              <span className="top-v fw-bold">{t("Showing")} {items?.length} {t("of")} {itemsLength} {t(searchList + 's')}</span>
            </div>
            <div className="text-end mt-3 mb-2">
              <span className="top-v">
                <span className="fw-bold">{t("View By")} :</span>
                <img
                  src="/assets/images/tatlub-img/grid_1.png"
                  className="img-fluid ms-3 cursor-pointer"
                  alt="..."
                />
                <img
                  src="/assets/images/tatlub-img/list_1.png"
                  className="img-fluid cursor-pointer"
                  alt="..."
                  onClick={() => setlist(true)}
                />
              </span>
            </div>
          </div>

          {/* Grid -view */}
          {/* <div className="page-main-content vh-100 overflow-auto" id="scrollableDiv"> */}
          <div className="page-main-content " id="scrollableDiv">
            {isLoading ? (
              <div className="loader-wrapper2">
                {url === "Christmas" ? (
                  <div id="preloader"></div>
                ) : (
                  <div className="loader"></div>
                )}
              </div>
            ) : (
              <div>
                <div
                  className="modal fade"
                  id="QuateModal"
                  tabIndex="-1"
                  aria-labelledby="QuateModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="pt-4 px-4">
                        <div className="text-center">
                          {/* <h3>Get Quote</h3> */}
                          <div className="mb-3">
                            <img
                              src="/assets/images/icon/logo.png"
                              className="w-25"
                              onError={(e) =>
                              (e.currentTarget.src =
                                "/assets/images/tatlub-img/no1.png")
                              }
                            />
                          </div>
                          <p className="text-muted">
                            To get please fill out the form below, we will get
                            back to you in 24 hours when you get your
                            request.Thank for you Being
                          </p>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                          <div className="row">
                            <div className="mb-3 col-12">
                              <label className="form-lable">{t("First Name")}</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Enter Your Name")}
                                {...formik.getFieldProps("item_lead_name")}
                              />
                              {formik.touched.item_lead_name &&
                                formik.errors.item_lead_name && (
                                  <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                      <span
                                        role="alert"
                                        className="text-danger"
                                      >
                                        {formik.errors.item_lead_name}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                            <div className="mb-3 col-12">
                              <label className="form-lable">{t("Email")}</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Enter Your Email ID")}
                                {...formik.getFieldProps("item_lead_email")}
                              />
                              {formik.touched.item_lead_email &&
                                formik.errors.item_lead_email && (
                                  <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                      <span
                                        role="alert"
                                        className="text-danger"
                                      >
                                        {formik.errors.item_lead_email}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                            <div className="mb-3 col-12">
                              <label className="form-lable">
                                {t("Mobile Number")}
                              </label>
                              <input
                                type="text"
                                maxLength={15}
                                className="form-control"
                                placeholder={t("Enter Your Mobile Number")}
                                {...formik.getFieldProps("item_lead_phone")}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "item_lead_phone",
                                    e.target?.value.replace(/[^0-9]/g, "")
                                  )
                                }
                              />
                              {formik.touched.item_lead_phone &&
                                formik.errors.item_lead_phone && (
                                  <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                      <span
                                        role="alert"
                                        className="text-danger"
                                      >
                                        {formik.errors.item_lead_phone}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                            <div className="mb-3 col-12">
                              <label className="form-lable">{t("Message")}</label>
                              <textarea
                                className="form-control"
                                placeholder={t("How Can We help You?")}
                                rows={3}
                                {...formik.getFieldProps("item_lead_message")}
                              />
                              {formik.touched.item_lead_message &&
                                formik.errors.item_lead_message && (
                                  <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                      <span
                                        role="alert"
                                        className="text-danger"
                                      >
                                        {formik.errors.item_lead_message}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="modal-footer border-0 d-flex justify-content-center align-items-center">
                            <button
                              type="button"
                              className="btn btn-secondary d-none"
                              id="closeQuotesmodal"
                              data-bs-dismiss="modal"
                            ></button>
                            <button
                              type="submit"
                              className="btn btn-theme rounded w-50"
                            >
                              {t("Save")}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {items?.length == 0 && (
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src="/assets/images/tatlub-img/not_Found.png"
                      className="no_image"
                    />
                  </div>
                )}

                <InfiniteScroll
                  dataLength={items?.length}
                  next={itemsListLazyLoad}
                  hasMore={itemsLength > items?.length}
                  loader={
                    <>
                      {itemsLength != items?.length && (
                        // <div className=''>
                        //      <div className='d-flex justify-content-center flex-column align-items-center h_80vh'>
                        //     <div className="loader-wrapper3">
                        //     {url === "Christmas" ? (
                        //       <div id="preloader"></div>
                        //     ) : (
                        //       <div className="loader"></div>
                        //     )}
                        //   </div>
                        //     </div>

                        //     {/* <div className="row mb-3 ">
                        //       <Instagram className='col' />
                        //       <Instagram className='col' />
                        //       <Instagram className='col' />
                        //       <Instagram className='col' />
                        //     </div> */}
                        // </div>
                        <Row className="">
                          {[...Array(4)].map((d, index) => (
                            <Col
                              xl="3"
                              lg="4"
                              md="4"
                              xs="6"
                              className=" mb-4 "
                              key={index}
                            >
                              <div className="card d-flex flex-coloum justify-content-between product-list border-0 w-100 h-100 mb-3">
                                <div className="p-2">
                                  <div className="overflow-hidden rounded-4 mb-2">
                                    <Skeleton
                                      width={240}
                                      height={200}
                                      shape="rectangle"
                                    />
                                  </div>
                                  <Skeleton width={225} />
                                  <div className="d-flex align-items-center mt-3">
                                    <Skeleton
                                      width={35}
                                      height={35}
                                      shape="circle"
                                    />
                                    <div className="card-text ps-1 cursor-pointer foot-cat d-flex align-items-center">
                                      {" "}
                                      <Skeleton width={190} />
                                    </div>
                                  </div>
                                </div>

                                <div className="px-2 pb-2">
                                  <Skeleton width={225} height={34} />
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      )}
                    </>
                  }
                  endMessage={
                    <div className="text-center ">
                      {/* <img src="/assets/images/tatlub-img/Warning.svg"  className="w-25" /> */}
                      {/* <h4 className="  my-4" >
                        @ END OF LIST
                      </h4> */}
                    </div>
                  }
                // scrollableTarget="scrollableDiv"
                >
                  <Row className="">
                    {items?.map((data, index) => {
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
                              {/* <img
                              src="/assets/images/tatlub-img/pList-1.jpg"
                              className="card-img-top"
                              alt="..."
                            /> */}
                              <div className="overflow-hidden rounded-4 mb-2">

                                <Link href={data?.item_title ? {
                                  pathname: `/services/${data.item_slug}`,
                                  //  query: { item_id: data.item_slug } 
                                } : {
                                  pathname: `/product-details/${data.product_slug}`,
                                  // query: { product_id: data.id } 
                                }} >
                                  <img
                                    src={
                                      data?.item_image_medium ??
                                      data?.product_image_medium
                                    }
                                    alt="items_image"
                                    className={`card-img-top p-imgS cursor-pointer ${searchList == 'product' && 'object-fit-contain'} bg-white`}
                                    onError={(e) =>
                                    (e.currentTarget.src =
                                      "/assets/images/tatlub-img/No.jpg")
                                    }
                                    onClick={() =>
                                      // data?.item_title
                                      //   ? router.push({
                                      //       pathname: "/product-details/view",
                                      //       query: { item_id: data.id },
                                      //     })
                                      //   : router.push({
                                      //       pathname: "/product-details/view",
                                      //       query: { product_id: data.id },
                                      //     })
                                      setmainId(data.id)
                                    }
                                  />
                                </Link>
                              </div>
                              <Link href={data?.item_title ? {
                                pathname: `/services/${data.item_slug}`,
                                //  query: { item_id: data.item_slug }
                              } : {
                                pathname: `/product-details/${data.product_slug}`,
                                //  query: { product_id: data.id }
                              }} >
                                <h6
                                  title={data?.item_title ?? data?.product_name}
                                  className="card-title foot-cat fs-16 text-capitalize  fw-bolder cursor-pointer"
                                  onClick={() =>
                                    // data?.item_title
                                    //   ? router.push({
                                    //       pathname: "/product-details/view",
                                    //       query: { item_id: data.id },
                                    //     })
                                    //   : router.push({
                                    //       pathname: "/product-details/view",
                                    //       query: { product_id: data.id },
                                    //     })
                                    setmainId(data.id)
                                  }
                                //  onClick={()=>router.push('/product-details/view?item_id='+data.id,'/product-details/view')}
                                >
                                  {t(data?.item_title ?? data?.product_name)}
                                </h6>
                              </Link>
                              {
                                searchList == 'product' ?
                                  <div className="d-flex ">
                                    <span className="fs-5 me-1 text-color">
                                      {data?.item_price || data?.product_price && "QAR :"}{" "}
                                      {data?.item_price ??
                                        data?.product_price}{" "}
                                    </span>
                                  </div> :

                                  data?.user && (
                                    <div className="d-flex align-items-center">
                                      <img
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
                                          onClick={() =>
                                            setmainId(data.id)
                                          }
                                        >
                                          {" "}
                                          <span className="fs-7 " title={data?.user?.name}>{data?.user?.name}</span>
                                        </div>
                                      </Link>
                                    </div>
                                  )
                              }
                              <p className="card-text text-capitalize complete_2 fs-5 pt-2 ">
                                {/* {data.item_address} */}
                                {data?.item_location_str ? <img src="/assets/images/tatlub-img/locate.png" className=" mx-1 mb-0" /> : data?.item_address ? <img src="/assets/images/tatlub-img/locate.png" className=" mx-1 mb-0" /> : ''}
                                {data?.item_location_str ?? data?.item_address}
                              </p>
                            </div>

                            <div className="px-2 pb-2">
                              {
                                brand || searchList == 'product' ?
                                  <button
                                    type="button"
                                    role="button"
                                    className="btn btn_product_list w-100"
                                    onClick={() => fetchAddToCart(data?.id, data?.user?.id ?? data?.user_id, data?.product_price, 1, index)}
                                    disabled={Loading[index]}
                                  >
                                    {Loading[index] ? <i class="fa fa-spinner box_1 me-2 fs-5" aria-hidden="true"></i> :
                                      <i
                                        className="fa fa-shopping-cart me-2 fs-5"
                                        aria-hidden="true"
                                      ></i>
                                    }
                                    {t('Add To Cart')}
                                  </button> : ''
                              }

                              {
                                !brand && searchList == 'service' ?
                                  <a
                                    href="#"
                                    title="Get Quote"
                                    role="button"
                                    className="btn btn_product_list w-100"
                                    onClick={() => setItemsID(data?.id)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#QuateModal"
                                  >
                                    {t('Get Best Price')}
                                  </a> : ''
                              }
                            </div>
                          </div>
                        </Col>
                      );
                    })}

                    <div className="text-center my-md-4 py-3 d-none">
                      <button type="button" className="btn_hover text-capitalize p-2 px-4">
                        {t("view More")}
                      </button>
                    </div>
                  </Row>
                </InfiniteScroll>
              </div>
            )}
          </div>
        </Col>
      ) : (
        <Col className="collection-content p-list body-layoyt px-sm-3 px-2" lg="8"
          xl="9">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-start mt-3 mb-2">
              {/* <span className="top-v">{t("Showing")} {items?.length} of {itemsLength} {searchList ?? 'supplier' + 's'}</span> */}
              <span className="top-v fw-bold">{t("Showing")} {items?.length} {t("of")} {itemsLength} {t(searchList + 's')}</span>
            </div>
            <div className="text-end mt-3 mb-2">
              <span className="top-v ">
                <span className="fw-bold">{t("View By")} :</span>
                <img
                  src="/assets/images/tatlub-img/grid.png"
                  className="img-fluid cursor-pointer ms-3"
                  alt="..."
                  onClick={() => setlist(false)}
                />
                <img
                  src="/assets/images/tatlub-img/icon_list.png"
                  className="img-fluid cursor-pointer"
                  alt="..."
                />
              </span>
            </div>
          </div>

          {/*  List -view */}
          <div className="page-main-content">
            {isLoading ? (
              <div className="loader-wrapper2">
                {url === "Christmas" ? (
                  <div id="preloader"></div>
                ) : (
                  <div className="loader"></div>
                )}
              </div>
            ) : (
              <div>
                <div
                  className="modal fade"
                  id="QuateModal22"
                  tabIndex="-1"
                  aria-labelledby="QuateModal22Label"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                    <div className="modal-content">
                      <div className="pt-4 px-4">
                        <div className="text-center">
                          {/* <h3>Get Quote</h3> */}
                          <div className="mb-3">
                            <img
                              src="/assets/images/icon/logo.png"
                              className="w-25"
                              onError={(e) =>
                              (e.currentTarget.src =
                                "/assets/images/tatlub-img/no1.png")
                              }
                            />
                          </div>
                          <p className="text-muted">
                            To get please fill out the form below, we will get
                            back to you in 24 hours when you get your
                            request.Thank for you Being
                          </p>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                          <div className="row">
                            <div className="mb-3 col-12">
                              <label className="form-lable">First Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Enter Your Name")}
                                {...formik.getFieldProps("item_lead_name")}
                              />
                              {formik.touched.item_lead_name &&
                                formik.errors.item_lead_name && (
                                  <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                      <span
                                        role="alert"
                                        className="text-danger"
                                      >
                                        {formik.errors.item_lead_name}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                            <div className="mb-3 col-12">
                              <label className="form-lable">Email</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={t("Enter Your Email ID")}
                                {...formik.getFieldProps("item_lead_email")}
                              />
                              {formik.touched.item_lead_email &&
                                formik.errors.item_lead_email && (
                                  <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                      <span
                                        role="alert"
                                        className="text-danger"
                                      >
                                        {formik.errors.item_lead_email}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                            <div className="mb-3 col-12">
                              <label className="form-lable">
                                Mobile Number
                              </label>
                              <input
                                type="text"
                                maxLength={15}
                                className="form-control"
                                placeholder={t("Enter Your Mobile Number")}
                                {...formik.getFieldProps("item_lead_phone")}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "item_lead_phone",
                                    e.target?.value.replace(/[^0-9]/g, "")
                                  )
                                }
                              />
                              {formik.touched.item_lead_phone &&
                                formik.errors.item_lead_phone && (
                                  <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                      <span
                                        role="alert"
                                        className="text-danger"
                                      >
                                        {formik.errors.item_lead_phone}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                            <div className="mb-3 col-12">
                              <label className="form-lable">Message</label>
                              <textarea
                                className="form-control"
                                placeholder={t("How Can We help You?")}
                                rows={3}
                                {...formik.getFieldProps("item_lead_message")}
                              />
                              {formik.touched.item_lead_message &&
                                formik.errors.item_lead_message && (
                                  <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">
                                      <span
                                        role="alert"
                                        className="text-danger"
                                      >
                                        {formik.errors.item_lead_message}
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="modal-footer border-0 d-flex justify-content-center align-items-center">
                            <button
                              type="button"
                              className="btn btn-secondary d-none"
                              id="closeQuotesmodal"
                              data-bs-dismiss="modal"
                            ></button>
                            <button
                              type="submit"
                              className="btn btn-theme rounded w-50"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {items?.length == 0 && (
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src="/assets/images/tatlub-img/not_Found.png"
                      className="no_image"
                    />
                  </div>
                )}

                <InfiniteScroll
                  dataLength={items?.length}
                  next={itemsListLazyLoad}
                  hasMore={itemsLength > items?.length}
                  loader={
                    <>
                      {itemsLength != items?.length && (
                        // <div className='w-100 h-100'>
                        //     <div className='d-flex justify-content-center flex-column align-items-center h_80vh'>
                        //     <div className="loader-wrapper3">
                        //     {url === "Christmas" ? (
                        //       <div id="preloader"></div>
                        //     ) : (
                        //       <div className="loader"></div>
                        //     )}
                        //   </div>
                        //     </div>
                        // </div>
                        <div className="card border-0 p-3 card_radius mb-3 mt-2 mx-2 ">
                          <Row>
                            <Col xl="8">
                              <div
                                className="card mb-3 border-0"
                                style={{ background: "#f2f2f2" }}
                              >
                                <div className="row g-0">
                                  <div className="col-md-4">
                                    <div className="overflow-hidden rounded-3">
                                      <Skeleton
                                        width={220}
                                        height={200}
                                        shape="rectangle"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-8 px-md-3">
                                    <div className=" px-0 pt-md-0 pt-3">
                                      <h6 className="card-title text-color fw-bolder cursor-pointer">
                                        <Skeleton />
                                      </h6>
                                      <div className="d-flex align-items-center my-3">
                                        <span>
                                          <Skeleton />
                                        </span>
                                      </div>
                                      <small className="">
                                        <a className="text-dark five_line">
                                          <Skeleton className="mb-2" />
                                          <Skeleton className="mb-2" />
                                          <Skeleton className="mb-2" />
                                        </a>
                                        {/* <span><a href="" className="text-color fw-600">Read More</a></span>  */}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col xl="4" className="px-2">
                              <div className="bg-gray">
                                <div>
                                  <p className="fw-600 one_line">
                                    <Skeleton />
                                  </p>
                                  <p className="two_line">
                                    <small>
                                      <Skeleton />
                                    </small>
                                  </p>
                                </div>
                                <div>
                                  <div className="d-flex justify-content-between py-2 ">
                                    <p className="text-truncate d-flex align-items-center cursor-pointer">
                                      <Skeleton
                                        width={30}
                                        height={30}
                                        shape="circle"
                                      />
                                      <Skeleton width={100} />
                                    </p>
                                    <p className="text-truncate d-flex align-items-center cursor-pointer">
                                      <Skeleton
                                        width={30}
                                        height={30}
                                        shape="circle"
                                      />
                                      <Skeleton width={100} />
                                    </p>
                                  </div>
                                  <div className="d-flex justify-content-between py-2 ">
                                    <p className="text-truncate d-flex align-items-center cursor-pointer">
                                      <Skeleton
                                        width={30}
                                        height={30}
                                        shape="circle"
                                      />
                                      <Skeleton width={100} />
                                    </p>
                                    <p className="text-truncate d-flex align-items-center cursor-pointer">
                                      <Skeleton
                                        width={30}
                                        height={30}
                                        shape="circle"
                                      />
                                      <Skeleton width={100} />
                                    </p>
                                  </div>
                                  <div className=" d-flex justify-content-end ">
                                    <Skeleton
                                      width={100}
                                      height={35}
                                      className="rounded-3"
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </>
                  }
                  endMessage={
                    <div className="text-center ">
                      {/* <img src="/assets/images/tatlub-img/Warning.svg"  className="w-25" /> */}
                      {/* <h4 className="  my-4" >
                        @ END OF LIST
                        </h4> */}
                    </div>
                  }
                >

                  {searchList != 'product' ? items?.map((data, index) => {
                    return (
                      <div
                        className="card border-0 p-3 card_radius mb-3 mt-2 mx-2 "
                        key={index}
                      >
                        <Row className="h-100">
                          <Col xl="8" >
                            <div
                              className="card border-0"
                              style={{ background: "#f2f2f2" }}
                            >
                              <div className="row g-0">
                                <div className="col-md-4">
                                  <div className="overflow-hidden rounded-3">
                                    <Link href={data?.item_title ? {
                                      pathname: `/services/${data.item_slug}`,
                                      //  query: { item_id: data.item_slug }
                                    } : {
                                      pathname: `/product-details/${data.product_slug}`,
                                      //  query: { product_id: data.id }
                                    }} >
                                      <img
                                        // src="/assets/images/tatlub-img/pList-7.jpg "
                                        className={`img-fluid img_detail-grid cursor-pointer ${searchList == 'product' && 'object-fit-contain'} bg-white`}
                                        src={
                                          data.item_image_medium ??
                                          data?.product_image_medium
                                        }
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/No.jpg")
                                        }
                                        alt="..."
                                        // onClick={()=>router.push({pathname:`/product-details/view`,query:{item_id:data.id}})}
                                        onClick={() =>
                                          // data?.item_title
                                          //   ? router.push({
                                          //       pathname: "/product-details/view",
                                          //       query: { item_id: data.id },
                                          //     })
                                          //   : router.push({
                                          //       pathname: "/product-details/view",
                                          //       query: { product_id: data.id },
                                          //     })
                                          setmainId(data.id)
                                        }
                                      />
                                    </Link>
                                  </div>
                                  <div className="row px-2 my-2 short-img d-none">
                                    <div className="col-3 p-1">
                                      <img
                                        src={
                                          data.item_image_medium ??
                                          data?.product_image_medium
                                        }
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/No.jpg")
                                        }
                                        className="img-fluid "
                                        alt="..."
                                      />
                                    </div>
                                    <div className="col-3 p-1">
                                      <img
                                        src={
                                          data.item_image_medium ??
                                          data?.product_image_medium
                                        }
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/No.jpg")
                                        }
                                        className="img-fluid "
                                        alt="..."
                                      />
                                    </div>
                                    <div className="col-3 p-1">
                                      <img
                                        src={
                                          data.item_image_medium ??
                                          data?.product_image_medium
                                        }
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/No.jpg")
                                        }
                                        className="img-fluid "
                                        alt="..."
                                      />
                                    </div>
                                    <div className="col-3 p-1">
                                      <img
                                        src={
                                          data.item_image_medium ??
                                          data?.product_image_medium
                                        }
                                        onError={(e) =>
                                        (e.currentTarget.src =
                                          "/assets/images/tatlub-img/No.jpg")
                                        }
                                        className="img-fluid "
                                        alt="..."
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-8 px-md-3 d-flex justify-content-between flex-column">
                                  <div className=" px-0 pt-md-0 pt-3">
                                    <Link href={data?.item_title ? {
                                      pathname: `/services/${data.item_slug}`
                                      //  query: { item_id: data.item_slug }
                                    } : {
                                      pathname: `/product-details/${data.product_slug}`,
                                      //  query: { product_id: data.id }
                                    }}>
                                      <h6
                                        title={data?.item_title ?? data?.product_name}
                                        className="card-title  text-capitalize text-color fw-bolder fs-18 cursor-pointer"
                                        onClick={() =>
                                          // data?.item_title
                                          //   ? router.push({
                                          //       pathname: "/product-details/view",
                                          //       query: { item_id: data.item_slug },
                                          //     })
                                          //   : router.push({
                                          //       pathname: "/product-details/view",
                                          //       query: { product_id: data.id },
                                          //     })
                                          setmainId(data.id)
                                        }
                                      >
                                        {t(data?.item_title ?? data?.product_name)}
                                      </h6>
                                    </Link>

                                    {
                                      data?.rating ?
                                        <div className="d-flex align-items-center mb-2">
                                          <Stack spacing={1}>
                                            <Rating
                                              name="size-large star_rate"
                                              value={data?.rating}
                                              readOnly={true}
                                              defaultValue={1}
                                              size="small"
                                            />
                                          </Stack>
                                          <span className="custom_ratng_text ms-3">
                                            {data?.rating + " " + t('Rating')}
                                          </span>
                                        </div> : ''
                                    }

                                    <p className="card-text text-capitalize complete_2 fs-5 pt-2 ">
                                      {data?.item_location_str ? <img src="/assets/images/tatlub-img/locate.png" className=" mx-1 mb-0" /> : data?.item_address ? <img src="/assets/images/tatlub-img/locate.png" className=" mx-1 mb-0" /> : ''}
                                      {data?.item_location_str ?? data?.item_address}
                                    </p>

                                    <div className="d-flex align-items-center mt-3 mb-1 d-none">
                                      <span className="fs-5 me-1">
                                        {data?.item_price || data?.product_price && "QAR :"}{" "}
                                        {data?.item_price ??
                                          data?.product_price}{" "}
                                      </span>
                                      {searchList == 'service' ? (
                                        <button className="btn_hover get_price px-3 fs-6"
                                          title="Get Quote"
                                          onClick={() => setItemsID(data?.id)}
                                          data-bs-toggle="modal"
                                          data-bs-target="#QuateModal22"
                                        >
                                          {/* {t('Get Latest Price')} */}
                                          {t('Get Quote')}
                                        </button>
                                      ) : ''}
                                    </div>
                                    <small className="complete_2" dangerouslySetInnerHTML={{__html: data?.item_description ?? data?.product_description }}>
                                      {/* <a className="text-dark fs-6 complete_2">
                                        {data?.item_description ??
                                          data?.product_description}
                                      </a> */}
                                     {/* <span><a href="" className="text-color fw-600">Read More</a></span>  */}
                                    </small>
                                  </div>


                                  {
                                    searchList == 'product' &&
                                    <div className="">
                                      <button type="button" className="btn btn-theme w-50 rounded-3"
                                        title="Add To Cart"
                                        onClick={() => fetchAddToCart(data?.id, data?.user?.id ?? data?.user_id, data?.product_price, 1, index)}
                                        disabled={Loading[index]}
                                      >
                                        {Loading[index] ? <i class="fa fa-spinner box_1 me-2 fs-5" aria-hidden="true"></i> :
                                          <i
                                            className="fa fa-shopping-cart me-2 fs-5"
                                            aria-hidden="true"
                                          ></i>
                                        }
                                        {t('Add To Cart')}</button>
                                    </div>
                                  }

                                  <div className="row align-items-center">
                                    <div className="col-sm-6 d-flex align-items-center mb-lg-0 mb-2">
                                      <span className="fs-5 me-1">
                                        {data?.item_price || data?.product_price && "QAR :"}{" "}
                                        {data?.item_price ??
                                          data?.product_price}{" "}
                                      </span>
                                      {searchList == 'service' ? (
                                        <button className="btn_hover get_price complete custom_btn  h-100 rounded-2 px-3 fs-15"
                                          title="Get Best Price"
                                          onClick={() => setItemsID(data?.id)}
                                          data-bs-toggle="modal"
                                          data-bs-target="#QuateModal22"
                                        >
                                          {/* {t('Get Latest Price')} */}
                                          {t('Get Best Price')}
                                        </button>
                                      ) : ''}
                                    </div>

                                    <div className="text-end col-sm-6">
                                      {
                                        showContact[index] ?
                                          <button className="btn fs-15 rounded-2 text-truncate custom_btn  btn_contactproduct_lister" title="Contact Supplier"
                                            onClick={() => {
                                              setSContact((pre) => {
                                                const old = [...pre];
                                                old[index] = false
                                                return old
                                              })
                                            }}
                                          >
                                            <i class="fa fa-phone  me-1 mb-0 pb-0" aria-hidden="true"></i>
                                            {" "}
                                            {t('Show Number')}{" "}
                                          </button>
                                          :
                                          <button className="btn fs-15 text-truncate rounded-2 custom_btn px-2 btn_contactproduct_lister" title={data?.user?.phone}>
                                            <a
                                              href={`tell:${data?.user?.phone}`}
                                              className=""
                                            >
                                              <i class="fa fa-phone  me-1 mb-0 pb-0" aria-hidden="true"></i>
                                              {" "}
                                              {data?.user?.phone ?? 'Show Number'}{" "}
                                            </a>
                                          </button>
                                      }
                                    </div>
                                  </div>


                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col xl="4" className="px-2 h-100">
                            {
                              data?.user ?
                                <div className="bg-gray mt-xl-0 mt-2 h-100" style={{ minHeight: '200px' }}>
                                  <div>
                                    <p className="fw-600 one_line text-capitalize" title={data?.user?.name}>
                                      {data?.user?.name}
                                    </p>
                                    {/* <p className="card-text text-capitalize complete_2 fs-5 pt-2 ">
                                {data?.item_location_str ? <img src="/assets/images/tatlub-img/locate.png" className=" mx-1 mb-0" /> : <small>{data?.item_address}</small>  ? <img src="/assets/images/tatlub-img/locate.png" className=" mx-1 mb-0" /> : ''}
                                <small>{data?.item_location_str ?? data?.item_address}</small>
                              </p> */}

                                  </div>
                                  <div>
                                    <div className="d-flex justify-content-between py-2 d-none">
                                      <p className="text-truncate foot-cat cursor-pointer" title="Industry Leader">
                                        <img
                                          src="/assets/images/tatlub-img/s-1.jpg"
                                          className="img-fluid logo"
                                          alt="..."
                                        />{" "}
                                        {t('Industry Leader')}
                                      </p>
                                      <p className="text-truncate foot-cat cursor-pointer" title="Trustseal Verified">
                                        <img
                                          src="/assets/images/tatlub-img/s-4.jpg"
                                          className="img-fluid logo"
                                          alt="..."
                                        />{" "}
                                        {t('Trustseal Verified')}
                                      </p>
                                    </div>
                                    <div className="d-flex justify-content-between py-2 ">
                                      {
                                        data?.user?.brochure?.startsWith('http') &&
                                        <p className="text-truncate foot-cat cursor-pointer" title="Brochure" onClick={() => window.open(data?.user?.brochure, "_blank")}>
                                          <img
                                            src="/assets/images/tatlub-img/s-2.jpg"
                                            className="img-fluid logo"
                                            alt="..."
                                          />
                                          {t('Brochure')}
                                        </p>
                                      }
                                      <Link href={{
                                        pathname: `/services/${data.item_slug}`,
                                        //  query: { item_id: data.item_slug },
                                      }} >
                                        <p
                                          title="Company Profile"
                                          className="text-truncate foot-cat cursor-pointer"
                                          onClick={() =>
                                            // router.push({
                                            //   pathname: "/page/vendor/vendor-profile",
                                            //   query: { id: data?.user?.id },
                                            // })
                                            setmainId(data.id)
                                          }
                                        >
                                          <img
                                            src="/assets/images/tatlub-img/s-3.jpg"
                                            className="img-fluid logo"
                                            alt="..."
                                          />
                                          {t('Company Profile')}
                                        </p>
                                      </Link>
                                    </div>
                                    <div className="row align-items-center d-none">
                                      <div className="col-sm-6 d-flex align-items-center mb-lg-0 mb-2">
                                        <span className="fs-5 me-1">
                                          {data?.item_price || data?.product_price && "QAR :"}{" "}
                                          {data?.item_price ??
                                            data?.product_price}{" "}
                                        </span>
                                        {searchList == 'service' ? (
                                          <button className="btn_hover get_price complete custom_btn  h-100 rounded-2 px-3 fs-15"
                                            title="Get Best Price"
                                            onClick={() => setItemsID(data?.id)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#QuateModal22"
                                          >
                                            {/* {t('Get Latest Price')} */}
                                            {t('Get Best Price')}
                                          </button>
                                        ) : ''}
                                      </div>

                                      <div className="text-end col-sm-6">
                                        {
                                          showContact[index] ?
                                            <button className="btn fs-15 rounded-2 text-truncate custom_btn  btn_contactproduct_lister" title="Contact Supplier"
                                              onClick={() => {
                                                setSContact((pre) => {
                                                  const old = [...pre];
                                                  old[index] = false
                                                  return old
                                                })
                                              }}
                                            >
                                              <i class="fa fa-phone  me-1 mb-0 pb-0" aria-hidden="true"></i>
                                              {" "}
                                              {t('Show Number')}{" "}
                                            </button>
                                            :
                                            <button className="btn fs-15 text-truncate rounded-2 custom_btn px-2 btn_contactproduct_lister" title={data?.user?.phone}>
                                              <a
                                                href={`tell:${data?.user?.phone}`}
                                                className=""
                                              >
                                                <i class="fa fa-phone  me-1 mb-0 pb-0" aria-hidden="true"></i>
                                                {" "}
                                                {data?.user?.phone ?? 'Show Number'}{" "}
                                              </a>
                                            </button>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div> : ''
                            }
                            <div className="text-end mt-2 d-none">
                              <Link href={{
                                pathname: `/services/${data.item_slug}`,
                                //  query: { item_id: data.item_slug }, 
                              }} >
                                <a
                                  className="text-color cursor-pointer text-capitalize"
                                  onClick={() =>
                                    // router.push({
                                    //   pathname: `/product-details/view`,
                                    //   query: { item_id: data.id },
                                    // })
                                    setmainId(data.id)
                                  }
                                >
                                  {t("view More")}
                                </a>
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    );
                  }) :

                    items?.map((data, index) => (
                      <div className="mb-3 mx-2 mt-2 dress_plp" key={index}>
                        <Row>
                          <Col lg="12" className=" mb-3 mb-md-4">
                            <div className="card_radius p-3">
                              <Row>
                                <Col xl="4" md="5">
                                  <Link href={data?.item_title ? {
                                    pathname: `/services/${data.item_slug}`,
                                    // query: { item_id: data.item_slug }
                                  } : {
                                    pathname: `/product-details/${data.product_slug}`,
                                    // query: { product_id: data.id }
                                  }} >
                                    <img
                                      src={data?.product_image_medium}
                                      alt=""
                                      className="doc-img cursor-pointer object-fit-contain bg-white"
                                    />
                                  </Link>
                                </Col>
                                <Col xl="8 mt-md-0 mt-3" md="7 mt-md-0 mt-3">
                                  <div className=" h-100 d-flex justify-content-between flex-column w-100">
                                    <div className="fs-vp-pg">

                                      <div className='mb-3'>
                                        <Link href={data?.item_title ? {
                                          pathname: `/services/${data.item_slug}`,
                                          // query: { item_id: data.item_slug }
                                        } : {
                                          pathname: `/product-details/${data.product_slug}`,
                                          // query: { product_id: data.id } 
                                        }} >
                                          <h5 className="card-title text-capitalize complete_2 foot-cat  fw-bolder fs-18 cursor-pointer">{data?.product_name}</h5>
                                        </Link>
                                      </div>

                                      <div className="d-flex  mb-2">
                                        <span className="fs-5 me-1 text-color">
                                          {data?.item_price || data?.product_price && "QAR :"}{" "}
                                          {data?.item_price ??
                                            JSON.parse(data?.product_price) * quantity[index]}{" "}
                                        </span>
                                      </div>

                                      {data?.user && (
                                        <div className="d-flex align-items-center  mb-2">
                                          <img
                                            // src="/assets/images/tatlub-img/productLogo.jpg"
                                            src={data?.user?.user_image ?? "NULL"}
                                            // className="logo"
                                            className="company_detail_icon2 me-2"
                                            onError={(e) =>
                                            (e.currentTarget.src =
                                              "/assets/images/tatlub-img/No.jpg")
                                            }
                                          />
                                          <Link href={{ pathname: "/page/vendor/vendor-profile", query: { id: data?.user?.id }, }} >
                                            <div
                                              className="card-text ps-1 cursor-pointer foot-cat d-flex align-items-center"
                                              onClick={() =>
                                                // router.push({
                                                //   pathname: "/page/vendor/vendor-profile",
                                                //   query: { id: data?.user?.id },
                                                // })
                                                setmainId(data.id)
                                              }
                                            >
                                              {" "}
                                              <h5 className='fw-bold mb-0 foot-cat' title={data?.user?.name}>{data?.user?.name}</h5>
                                            </div>
                                          </Link>
                                        </div>
                                      )}

                                      {/* {
                                        data?.user &&
                                        <div className="d-flex align-items-center mb-3">
                                          <img
                                            className="me-2 company_detail_icon"
                                            src="/assets/images/tatlub-img/icon-11.png"
                                          />{" "}
                                          <p className='complete_2 mb-0'>{data?.user?.address}</p>
                                        </div>
                                      } */}

                                      <small className="complete_2" dangerouslySetInnerHTML={{__html: data?.item_description ?? data?.product_description }}>
                                        {/* <a className="text-dark fs-6 complete_2">
                                          {data?.item_description ??
                                            data?.product_description}
                                        </a> */}
                                        {/* <span><a href="" className="text-color fw-600">Read More</a></span>  */}
                                      </small>

                                    </div>
                                    <div className="d-flex align-items-center profile-share_mobile">
                                      <div className=''>

                                        <div className="d-flex scond_cart">
                                          {/* <Link href={'/shop/Doctors_details'}> */}
                                          {/* <button
                                            type="button"
                                            // className="btn btn-theme rounded-3 px-5 w-100 text-truncate "
                                            className="btn px-5  btn_cart mb-2 rounded text-truncate"
                                            title="Added To Cart"
                                            onClick={() => fetchAddToCart(data?.id, data?.user?.id ?? data?.user_id, data?.product_price)}
                                            disabled={Loading}
                                          >
                                            {Loading ? <i class="fa fa-spinner box_1 me-2 fs-5" aria-hidden="true"></i> :
                                              <i
                                                className="fa fa-shopping-cart me-2 fs-5"
                                                aria-hidden="true"
                                              ></i>
                                            }
                                            {t("ADD TO CART")}
                                          </button> */}
                                          <div className="d-sm-flex mt-auto justify-content-start align-items-center">
                                            <div
                                              className=" bg-light px-3 rounded d-flex justify-content-between mb-2 align-items-center overflow-hidden"
                                              style={{ padding: "12px", width: '115px' }}
                                            >
                                              <button
                                                type="button"
                                                className="border-0 bg-transparent"
                                                onClick={() => {
                                                  let val = quantity[index] - 1;
                                                  if (val < 1) val = 1;
                                                  setQuantity((pre) => {
                                                    const newCounters = [...pre];
                                                    newCounters[index] = val;
                                                    return newCounters;
                                                  });
                                                }}
                                              >
                                                -
                                              </button>
                                              <div className="px-3">{quantity[index]}</div>
                                              <button
                                                type="button"
                                                className="border-0 bg-transparent"
                                                onClick={() => {
                                                  setQuantity((pre) => {
                                                    const newCounters = [...pre];
                                                    newCounters[index] += 1;
                                                    return newCounters;
                                                  })
                                                }}
                                              >
                                                +
                                              </button>
                                            </div>
                                            <button
                                              type="button"
                                              className="btn px-5 btn_cart ms-sm-3 mb-2 rounded"
                                              onClick={() => fetchAddToCart(data?.id, data?.user?.id ?? data?.user_id, data?.product_price, quantity[index], index)}
                                              disabled={Loading[index]}
                                            >
                                              {Loading[index] ? <i class="fa fa-spinner box_1 me-2 fs-5" aria-hidden="true"></i> :
                                                <i
                                                  className="fa fa-shopping-cart me-2 fs-5"
                                                  aria-hidden="true"
                                                ></i>
                                              }
                                              {t("ADD TO CART")}
                                            </button>
                                          </div>
                                          {/* </Link> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    ))

                  }

                </InfiniteScroll>
              </div>
            )}
          </div>
        </Col>
      )}

      <div>
        <Backdrop
          sx={{ color: '#fff', height: '100vh', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default ProductList;
