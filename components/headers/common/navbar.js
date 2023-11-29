import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { MENUITEMS } from "../../constant/menu";
// import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useRouter } from "next/router";
import Login from "../../../pages/page/account/login";
// import {useSelector,useDispatch} from 'react-redux'
import i18next from "../../constant/i18n";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  Input,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import SettingContext from "../../../helpers/theme-setting/SettingContext";
import { getLanguages } from "../../core/account_request";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ReactDOM from "react-dom";
import axios from "axios";
import { getSearchlist, getSearchProductlist } from "../../../components/core/fashion_request";
import {
  getUserSearchList,
  getSellerMail,
  getSuggestions,
  getPopularSearch
} from "../core/_request";
import { AutoComplete } from "primereact/autocomplete";
import Stack from "@mui/material/Stack";
import AuthContex from "../../../components/auth/AuthContex";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const NavBar = ({ sugCat, cartl, setPoduct, setRes, setPSearch, setbands }, args) => {

  // let roleId = '' 
  // if (typeof window !== 'undefined') {
  //   // do your stuff with sessionStorage
  //    roleId = JSON.parse(sessionStorage.getItem('data'))?.id
  //   return roleId
  // }

  if (typeof window !== "undefined") {
    require("popper.js");
    require("bootstrap/dist/js/bootstrap");
  }

  if (typeof window === "undefined") {
    return null;
  }

  const roleId =
    JSON.parse(localStorage.getItem("data"))?.id ??
    JSON.parse(sessionStorage.getItem("data"))?.id;
  const phone =
    JSON.parse(localStorage.getItem("data"))?.phone ??
    JSON.parse(sessionStorage.getItem("data"))?.phone;


  const { userData } = useContext(AuthContex);
  const targetRef = useRef(null);
  const targetRef2 = useRef(null);
  // const { t } = useTranslation();
  const [navClose, setNavClose] = useState({ right: "-410px" });
  const router = useRouter();
  // const {cartList} = useSelector((state)=>state.cart)
  const [modal, setModal] = useState(false);
  const [log, setlog] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [listToggle, setListToggle] = useState(false);
  const [ptoggle1, setptoggle1] = useState(false);
  const [language, setLanguage] = useState("en");
  const [searchList, setSearchList] = useState("service");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lan, setLag] = useState();
  const context = useContext(SettingContext);
  const layoutType = context.layoutFun;
  const layoutState = context.state;
  const [location, setLocation] = useState(null);
  const options = ["andhra"];
  const [value, setValue] = useState("Location");
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState();
  const [searchKey, setSearchKey] = useState("");
  const [result, setResult] = useState([]);
  const [brandSug, setBrandSug] = useState([]);
  const [resultkeys, setResultKeys] = useState([]);
  const [product, setPro] = useState([]);
  const [productkeys, setProKeys] = useState([]);
  const [selectresult, setSelectresult] = useState(null);
  const [categorySug, SetcategorySug] = useState([])
  const [filteredresult, setFilteredresult] = useState([]);
  const [popularSearch, setPopularSearch] = useState([])
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setLanguage(localStorage.getItem("slectLang"));
  }, [language]);


  const handleClickOutside = (event) => {
    if (targetRef.current && !targetRef.current.contains(event.target)) {
      setptoggle1(false);
    }
  };

  const handleClickOutside2 = (event) => {
    if (targetRef2.current && !targetRef2.current.contains(event.target)) {
      setListToggle(false);
    }
  };


  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutside2);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside2);
    };
  }, []);




  const jainsearchvalue = (key) => {
    let value = []
    // let key2 = resultkeys?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase()))
    value.push(...result?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
      { 'item_title': resultkeys?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())), "type": 'Listing' },
      ...product?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
      { 'item_title': productkeys?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())), "type": 'Product' },
      ...categorySug?.filter((item3) => item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
      ...brandSug?.filter((item3) => item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
    )
   
    // if (value.length == 1) {
    //   value.push(...product?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
    //     { 'item_title': productkeys?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())), "type": 'Product' },
    //     ...categorySug?.filter((item3)=> item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
    //     ...brandSug?.filter((item3)=> item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
    //   )
    // }

    return value
  }

  const JoinSearcValue2 = (key) => {
    let value = []
    value.push(...product?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
      { 'item_title': productkeys?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())), "type": 'Product' },
      ...result?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
      { 'item_title': resultkeys?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())), "type": 'Listing' },
      ...categorySug?.filter((item3) => item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
      ...brandSug?.filter((item3) => item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
    )

    // if (value.length == 1) {
    //   value.push(...result?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
    //     { 'item_title': resultkeys?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())), "type": 'Listing' },
    //     ...categorySug?.filter((item3) => item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
    //     ...brandSug?.filter((item3) => item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
    //   )
    // }

    return value
  }


  useEffect(() => {
    let valuData = []
    sugCat?.map(data => {
      valuData.push({ ...data,'item_title': data?.category_name, "type": 'Category', "id": data?.id })
    })
    SetcategorySug(valuData)
  }, [sugCat])


  useEffect(() => {
    localStorage.setItem(
      "slectLang",
      localStorage.getItem("slectLang")
        ? localStorage.getItem("slectLang")
        : language
    );
  }, []);

  const toggle = () => setModal(!modal);
  const toggle1 = () => setDropdownOpen(!dropdownOpen);
  const [lagLoad, setLangLoad] = useState(false);

  const fetchpopular = async () => {
    getPopularSearch().then(res => {
      setPopularSearch(res.data)
      setPSearch(res.data)
    }).catch(err => console.log('err', err.message))
  }

  useEffect(() => {
    fetchpopular()
    document.getElementById("ggg")?.classList.add("d-none");
    if (router.asPath !== "/layouts/Christmas")
      window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number >= 1) {
      if (window.innerWidth < 1) {
        document.getElementById("ggg")?.classList.remove("d-none");
      }
      else {
        document.getElementById("ggg")?.classList.remove("d-none");
        document.getElementById("ggg")?.classList.add("d-block");
      }
    }
    else document.getElementById("ggg")?.classList.add("d-none");
  };

  const itemTemplate = (item) => {
    return (
      <div className="d-flex align-items-center">
        <i className="fa fa-search me-2 text-secoundary" aria-hidden="true"></i>
        <div className="text-capitalize">{item.item_title}</div>
      </div>
    );
  };


  const changeLanguages = (lng) => {
    setOpen(true);
    // document.getElementById('chngeRtlltl')?.click();
    setLanguage(language == "en" ? "ar" : "en");
    setTimeout(() => {
      i18next.changeLanguage(language == "en" ? "ar" : "en");
      layoutType(language == "en" ? "ar" : "en");
      setOpen(false);
      // document.getElementById("closeloaderModal")?.click();
    }, 800);
    localStorage.setItem("slectLang", language == "en" ? "ar" : "en");
  };

  useEffect(() => {
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 1199) {
      setNavClose({ right: "-410px" });
    }
  }, []);


  useEffect(() => {
    roleId && setlog(roleId);
  }, [roleId]);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const position = await getLocation();
        const {
          latitude,
          longitude,
          altitude,
          accuracy,
          altitudeAccuracy,
          heading,
          speed,
        } = position.coords;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const address = data.results[0].formatted_address;
            setLocation(address);
            // setValue(data?.plus_code?.compound_code?.toString()?.split(' ')[1])
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
          .then((res) => {
            setValue(res.data?.city ?? "Location");
            if (res.data?.city) {
              localStorage.setItem('city', res.data?.city ?? 'location')
            }
          });
        // setLocation(position.coords);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLocation();
  }, []);


  useEffect(() => {
    setFilteredresult(searchList == 'service' ?
      jainsearchvalue(searchKey)
      : JoinSearcValue2(searchKey))
  }, [searchList]);


  const fectSearchList = async (listid) => {
    const sellerMail = await getSellerMail(listid);
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        console.log("ipAdress", data.ip);
        let arr = [listid];
        let body = {
          user_id: roleId,
          ip_address: data.ip,
          search_term: searchKey,
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
          })
          .catch((err) => {
            console.log("eee", err);
          });
      })
      .catch((error) => console.error(error));
  };


  const fetchSearchList2 = async (e) => {
    try {
      let skey = e?.value.item_title;
      const response = await getSearchlist(skey);
      let ids = [];
      response.data.forEach((e) => ids.push(e.id));
      if (response.data.length > 0) {
        router.push({
          pathname: "/shop/left_sidebar",
          query: { listing_id: ids.join(), len: response.data.length },
        });
        fectSearchList(ids.join());
      } else {
        router.push({
          pathname: "/NotFound/search",
          query: { search: skey, city: value },
        });
      }
    } catch (err) {
      console.log("errr", err.message);
    }
  };

  const fetchSearchList22 = async (e) => {
    let skey = e;
    router.push({
      pathname:`/search/${searchList}`,
      query: { search: skey, len: 0}
    });
  }

  const fetchSearchList221 = async (e) => {
    try {
      let skey = e;
      let response;
      if (searchList == 'service') {
        response = await getSearchlist(skey);
      } else {
        response = await getSearchProductlist(skey);
      }
      let ids = [];
      response.data.forEach((e) => ids.push(e.id));
      if (response.data.length > 0) {
        router.push({
          pathname:`/search/${searchList}`,
          query: { search: skey, len: response.data.length},
        });
        fectSearchList(ids.join());
      } else {
        router.push({
          pathname: "/NotFound/search",
          query: { search: skey, city: value, searchList: searchList },
        });
      }
    } catch (err) {
      console.log("errr", err.message);
    }
  };

  const fetchSearchBylist = async (e, searchBy) => {
    let skey = e;
    const listby = searchBy ?? searchList
    router.push({
      // pathname: "/shop/left_sidebar",
      pathname:`/search/${listby}`,
      query: { search: skey, len: 0},
      // query: { search: skey, len: 0, searchList: listby },
    });
  }

  const fetchSearchBylist77 = async (e, searchBy) => {
    try {
      let skey = e;
      const listby = searchBy ?? searchList
      let response;
      if (listby == 'service') {
        response = await getSearchlist(skey);
      } else {
        response = await getSearchProductlist(skey);
      }
      let ids = [];
      response.data.forEach((e) => ids.push(e.id));
      if (response.data.length > 0) {
        router.push({
         pathname:`/search/${listby}`,
          query: { search: skey, len: response.data.length },
        });
        fectSearchList(ids.join());
      } else {
        router.push({
          pathname: "/NotFound/search",
          query: { search: skey, city: value, searchList: listby },
        });
      }
    } catch (err) {
      console.log("errr", err.message);
    }
  };

  const fetchSeggetion = async () => {
    const response = await getSuggestions()
      .then((res) => {
        let serv = []
        let pro = []
        let brand = []
        let company = []

        res?.data.forEach(val1 => { serv.push({ ...val1, "type": "Listing" }) })
        setResult(serv);


        res?.products && res?.products.forEach(val2 => pro.push({ ...val2, "type": "Product" }))
        setPro(pro);

        setResultKeys(res.item_tags?.flatMap((item, i) => item?.split(',')))
        setProKeys(res.product_tags?.flatMap((item, i) => item?.split(',')))


        res?.user && res?.user.forEach(val4 => val4?.name != null && brand.push({...val4,'item_title': val4?.name, "type": 'company', "id": val4?.id }))
        res?.brands.forEach(val3 => brand.push({...val3,'item_title': val3?.name, "type": 'Brand', "id": val3?.id }))

        setBrandSug(brand)
        setRes(serv)
        setPoduct(pro)
        setbands(brand)
      })
      .catch((err) => {
        console.error("err1", err.message);
      });
  };


  useEffect(() => {
    fetchSeggetion();
  }, []);

  const fectLanguages = async () => {
    const responce = await getLanguages();
    setLag(responce.data);
    sessionStorage.setItem("lang", JSON.stringify(responce.data));
    sessionStorage.setItem("slectLang", "en");
    localStorage.setItem("lang", JSON.stringify(responce.data));
    // localStorage.setItem("slectLang",'en');
    // window.location.reload()
  };

  // useEffect(() => {
  //   fectLanguages();
  // }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    document.getElementById("SearchForm")?.reset();
    setSearchKey()
    router.push({
      pathname:`/search/${searchList}`,
      query: { search: searchKey, len: 0 },
    });
  }

  const handleSearch1 = async (e) => {
    e.preventDefault();
    document.getElementById("SearchForm")?.reset();
    const response = await getSearchlist(searchKey);
    let ids = [];
    response.data?.forEach((e) => ids.push(e.id));
    if (response.data?.length > 0) {
      router.push({
        pathname:`/search/${searchList}`,
        // query: { listing_id: ids.join(), len: response.data.length,searchList: searchList },
        query: { search: searchKey, len: response.data.length },
      });
      fectSearchList(ids.join());
      setSearchKey()
    } else {
      const response2 = await getSearchProductlist(searchKey);
      response2.data?.forEach((e) => ids.push(e.id));

      if (response2.data?.length > 0) {
        router.push({
          pathname:`/search/${'product'}`,
          query: { search: searchKey, len: response2.data?.length },
          // query: { listing_id: ids.join(), len: response.data.length,searchList: searchList },
        });
        fectSearchList(ids.join());
        setSearchKey()
      } else {
        router.push({
          pathname: "/NotFound/search",
          query: { search: searchKey, city: value },
        });
      }
    }
  };

  const openNav = () => {
    setNavClose({ right: "0px" });
    if (router.asPath == "/layouts/Gym")
      document.querySelector("#topHeader").classList.add("zindex-class");
  };

  const closeNav = () => {
    setNavClose({ right: "-410px" });
    if (router.asPath == "/layouts/Gym")
      document.querySelector("#topHeader").classList.remove("zindex-class");
  };


  useEffect(() => {
    searchKey == '' && setSearchList('service')
  }, [searchKey])



  return (
    <div>
      <div>
        <Backdrop
          sx={{ color: '#fff', height: '100vh', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <button
        type="button"
        className="d-none"
        id="openLoginPopup"
        onClick={toggle}
      ></button>
      <div className="main-navbar top_ser">
        <div id="mainnav">
          <div className="toggle-nav" onClick={openNav.bind(this)}>
            <i className="fa fa-bars sidebar-bar"></i>
          </div>
          
          <ul
            className="nav-menu d-xl-flex justify-content-between align-items-center"
            style={navClose}
          >
            <li className="back-btn" onClick={closeNav.bind(this)}>
              <div className="mobile-back text-end">
                <span>{t('Back navbar')}</span>
                <i className={`fa ${language == "en" ? 'fa-angle-right ps-2' : 'fa-angle-left pe-2'}  `} aria-hidden="true"></i>
              </div>
            </li>
            <div className=" d-xl-block d-none">
              {/* <div className="seacrch-icon_"><i className="fa fa-search"></i></div> */}
              {router.asPath != "/" ? (
                <div
                  className="search-box py-2 d-flex align-items-center mx-xl-5 "
                >
                  <img src="/assets/images/tatlub-img/locate.png" />
                  {/* <select className="w-25 border-0 ">
                       <option value="Qatar">Qatar</option>
                     </select> */}
                    <Autocomplete
                     value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    disabled={true}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    sx={{
                      width: 200,
                      m: -1,
                      "& .MuiOutlinedInput-root": {
                        // border: "1px solid yellow",
                        padding: "0",
                        // height:'10px'
                        paddingLeft: "10px",
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none",
                        padding: "unset",
                      },
                    }}
                    renderInput={(params) => {
                      // delete params.style;
                      // delete params.className;
                      return <TextField {...params} className="border-0" />;
                     }}
                    />
                  <form id="SearchForm" className="ps-2" onSubmit={handleSearch}>
                    {/* <input
                       type="text"
                       name="search"
                       className="  ms-3 ps-3 border-start"
                       onChange={(e)=>setSearchKey(e.target.value)}
                       placeholder={t('what are you looking For..')}
                     /> */}
                    <div className={`search3 ${layoutState == 'en'? 'border-end' : 'border-start' } sfsdssd ps-2  ms-2`}>
                      {/* <AutoComplete
                      field="item_title"
                      value={searchKey}
                      itemTemplate={itemTemplate}
                      onSelect={fetchSearchList2}
                      className="hgg ms-3"
                      placeholder={t("what are you looking For..")}
                      suggestions={filteredresult}
                      completeMethod={AutoCompleteSearch}
                      onChange={(e) => setSearchKey(e.target.value)}
                    /> */}
                      <input type="search" className={`${layoutState == 'en'? 'me-4' : '' }`} value={searchKey} onChange={(e) => {
                        setSearchKey(e.target.value);
                        setListToggle(true);
                        setptoggle1(false);
                        // setFilteredresult(searchList == 'service' ? result?.filter((item) => item.item_title.toLowerCase().includes(e.target.value?.toLowerCase())) : product?.filter((item) => item.item_title.toLowerCase().includes(e.target.value?.toLowerCase())))
                        setFilteredresult(searchList == 'service' ? jainsearchvalue(e.target.value) : JoinSearcValue2(e.target.value))
                      }} placeholder={t('Search Here')}
                        onFocus={() => setptoggle1(true)}
                      ></input>
                      {searchKey && listToggle &&
                        <div className="card search-list-dd-open-home mt-2" ref={targetRef2}>
                          <div className=''>
                            <ul className="nav nav-pills d-flex justify-content-center mx-2 row admin_tab_switch bg-gray-300 py-2 br_30" id="pills-tab" role="tablist">
                              <li className="nav-item col m-0" role="presentation" onClick={() => setSearchList('service')}>
                                <button className={searchList == "service" ? "nav-link active text-dark w-100 h-100 m-0 py-2 br_25" : "nav-link text-dark w-100 h-100 m-0 py-2 br_25"} id="expireing-tab" data-bs-toggle="pill" data-bs-target="#expireing" type="button" role="tab" aria-controls="expireing" aria-selected="false">
                                  {t('Suppliers')}
                                </button>
                              </li>
                              <li className="nav-item col m-0" role="presentation" onClick={() => setSearchList('product')}>
                                <button className={searchList == "product" ? "nav-link active text-dark w-100 h-100 m-0 py-2 br_25" : "nav-link text-dark w-100 h-100 m-0 py-2 br_25"} id="upcomming-tab" data-bs-toggle="pill" data-bs-target="#upcomming" type="button" role="tab" aria-controls="upcomming" aria-selected="false">
                                  {t('Products')}
                                </button>
                              </li>
                            </ul>
                          </div>
                          {filteredresult.filter(p => p.item_title?.length !== 0).length > 0 ?
                            <div className="card-body pt-0 scroll">
                              {filteredresult?.map((item, index) => {
                                // return(
                                //   <div className="dropdown-item py-2 cursor-pointer" onClick={() => {
                                //     setListToggle(false);
                                //     fetchSearchList22(item.item_title);
                                //     setSearchKey(item.item_title)
                                //     setFilteredresult([]);
                                //   }}>
                                //     <div className="d-flex " key={index}>
                                //       <i className="fa fa-search me-2 text-secoundary" aria-hidden="true"></i>
                                //       {/* <div className="complete_1">{item.item_title}</div> */}
                                //       <div className="">
                                //       {/* {item?.item_title?.length > 0 ? <div className="complete_1 text-capitalize">{item?.item_title}</div> : <div className="">No matches found</div>} */}
                                //       <div className="complete_1 text-capitalize">{item?.item_title}</div>
                                //       <h6 className="text-muted mb-0 pb-0">{item?.type}</h6>
                                //       </div>
                                //     </div>
                                //   </div>
                                // )
                                return (<>
                                  {
                                    item?.item_title?.length > 0 &&
                                    <div className="dropdown-item py-2 cursor-pointer" onClick={() => {
                                      if (item?.type == 'Category') {
                                        router.push({
                                          pathname:`/category/service/${item.category_slug}`,
                                          // query: { Category: item.category_slug, searchList: searchList },
                                        })
                                      } else if (item?.type == 'Brand') {
                                        router.push({
                                          pathname:`/brand/product/${item.slug}`,
                                          // query: { brand_id: item.id, searchList: 'product' },
                                        })
                                      } else if (item?.type == 'Product') {
                                        setListToggle(false);
                                        fetchSearchBylist(item.item_title, 'product');
                                        setSearchKey(item.item_title)
                                        setFilteredresult([]);
                                      } else if (item?.type == 'Listing') {
                                        setListToggle(false);
                                        fetchSearchBylist(item.item_title, 'service');
                                        setSearchKey(item.item_title)
                                        setFilteredresult([]);
                                      } else {
                                        router.push({
                                          pathname: "/page/vendor/vendor-profile",
                                          query: { id: item.id },
                                        })
                                      }
                                    }}>
                                      <div className="d-flex align-items-center" key={index}>
                                        <i className="fa fa-search me-2 text-secoundary" aria-hidden="true"></i>
                                        <div className="">
                                          <div className="complete_1 text-capitalize">{item?.item_title}</div>
                                          <h6 className="text-muted mb-0 pb-0">{item?.type}</h6>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                </>)
                              })}
                            </div> :
                            <div className="card-body">
                              <div className="dropdown-item py-2">
                                <div className="d-flex align-items-center">
                                  <i className="fa fa-search me-2 text-secoundary" aria-hidden="true"></i>
                                  <div className="">No matches found</div>
                                </div>
                              </div>
                            </div>}
                        </div>}

                      {
                        ptoggle1 &&
                        <div className="card search-list-dd-open-home mt-2" ref={targetRef}>
                          <div className=''>
                            <ul className="nav nav-pills d-flex justify-content-center row mx-2 admin_tab_switch bg-gray-300 py-2 br_30" id="pills-tab" role="tablist" >
                              <li className="nav-item col m-0" role="presentation" onClick={() => setSearchList('service')}>
                                <button className={searchList == "service" ? "nav-link active text-dark w-100 h-100 m-0 py-2 br_25" : "nav-link text-dark w-100 h-100 m-0 py-2 br_25"} id="expireing-tab" data-bs-toggle="pill" data-bs-target="#expireing" type="button" role="tab" aria-controls="expireing" aria-selected="false"
                                >
                                  {t('Suppliers')}
                                </button>
                              </li>
                              <li className="nav-item col m-0" role="presentation" onClick={() => setSearchList('product')}>
                                <button className={searchList == "product" ? "nav-link active text-dark w-100 h-100 m-0 py-2 br_25" : "nav-link text-dark w-100 h-100 m-0 py-2 br_25"} id="upcomming-tab" data-bs-toggle="pill" data-bs-target="#upcomming" type="button" role="tab" aria-controls="upcomming" aria-selected="false"
                                //  onBlur={()=>setListToggle(false)} 
                                >
                                  {t('Products')}
                                </button>
                              </li>
                            </ul>
                          </div>
                          <div className="card-body">
                            <div className="py-2">
                              <div className="">
                                {
                                  popularSearch?.length > 0 &&
                                  <div>
                                    <h6>{t('Popular Search')}</h6>
                                    {
                                      popularSearch?.map((data, index) => (
                                        <span class="badge p-ser mb-2 fs-13 cursor-pointer mb-0 fw-light p-2 mx-2" onClick={() => fetchSearchList22(data?.popular_search)} key={index}>{data?.popular_search}</span>
                                      ))
                                    }
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      }

                      {/* <Stack spacing={2} >  
                      <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={result.map((option) => option.item_title)} 
                        renderInput={(params) =>{
                          delete params.style
                          delete params.className;               
                          return( 
                          <TextField
                            {...params}
                            placeholder={t('what are you looking For..')}
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}

                          />
                        )} }
                        />
                     </Stack> */}
                    </div>
                    <button type="submit" className="d-none"></button>
                  </form>
                </div>
              ) : (
                <div
                  className="search-box py-2 d-flex align-items-center mx-xl-5 "
                  id="ggg"
                >
                  <img src="/assets/images/tatlub-img/locate.png" />
                  {/* <select className="w-25 border-0 ">
                       <option value="Qatar">Qatar</option>
                     </select> */}
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    disabled={true}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={options}
                    sx={{
                      width: 200,
                      m: -1,
                      "& .MuiOutlinedInput-root": {
                        // border: "1px solid yellow",
                        padding: "0",
                        // height:'10px'
                        paddingLeft: "10px",
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: "none",
                        padding: "unset",
                      },
                    }}
                    renderInput={(params) => {
                      // delete params.style;
                      // delete params.className;
                      return <TextField {...params} className="border-0" />;
                    }}
                  />
                  <form id="SearchForm" className="ps-2" onSubmit={handleSearch}>
                    {/* <input
                       type="text"
                       name="search"
                       className="  ms-3 ps-3 border-start"
                       onChange={(e)=>setSearchKey(e.target.value)}
                       placeholder={t('what are you looking For..')}
                     /> */}
                    <div className={`search3 ${layoutState == 'en'? 'border-end' : 'border-start' } sfsdssd ps-2  ms-2`} >
                      {/* <AutoComplete
                      field="item_title"
                      value={searchKey}
                      itemTemplate={itemTemplate}
                      onSelect={fetchSearchList2}
                      className="hgg ms-3"
                      placeholder={t("what are you looking For..")}
                      suggestions={filteredresult}
                      completeMethod={AutoCompleteSearch}
                      onChange={(e) => setSearchKey(e.target.value)}
                    /> */}
                      <input type="search" className={`${layoutState == 'en'? 'me-4' : '' }`} value={searchKey} onChange={(e) => {
                        setSearchKey(e.target.value);
                        setListToggle(true);
                        setptoggle1(false);
                        setFilteredresult(searchList == 'service' ? jainsearchvalue(e.target.value) : JoinSearcValue2(e.target.value))
                      }} placeholder={t('Search Here')}
                        // onClick={()=>setptoggle1(true)}
                        // onBlur={()=>setptoggle1(false)}
                        onFocus={() => { !searchKey && setptoggle1(true) }}
                      ></input>
                      {searchKey && listToggle &&
                        <div className="card search-list-dd-open-home mt-2" ref={targetRef2}>
                          <div className=''>
                            <ul className="nav nav-pills d-flex justify-content-center row mx-2 admin_tab_switch bg-gray-300 py-2 br_30" id="pills-tab" role="tablist" >
                              <li className="nav-item col m-0" role="presentation" onClick={() => setSearchList('service')}>
                                <button className={searchList == "service" ? "nav-link active text-dark w-100 h-100 m-0 py-2 br_25" : "nav-link text-dark w-100 h-100 m-0 py-2 br_25"} id="expireing-tab" data-bs-toggle="pill" data-bs-target="#expireing" type="button" role="tab" aria-controls="expireing" aria-selected="false"
                                >
                                  {t('Suppliers')}
                                </button>
                              </li>
                              <li className="nav-item col m-0" role="presentation" onClick={() => setSearchList('product')}>
                                <button className={searchList == "product" ? "nav-link active text-dark w-100 h-100 m-0 py-2 br_25" : "nav-link text-dark w-100 h-100 m-0 py-2 br_25"} id="upcomming-tab" data-bs-toggle="pill" data-bs-target="#upcomming" type="button" role="tab" aria-controls="upcomming" aria-selected="false"
                                //  onBlur={()=>setListToggle(false)} 
                                >
                                  {t('Products')}
                                </button>
                              </li>
                            </ul>
                          </div>
                          {filteredresult.filter(p => p.item_title?.length !== 0).length > 0 ?
                            <div className="card-body pt-0 scroll">
                              {filteredresult?.map((item, index) => {
                                return (<>
                                  {
                                    item?.item_title?.length > 0 &&
                                    <div className="dropdown-item py-2 cursor-pointer" onClick={() => {
                                      if (item?.type == 'Category') {
                                        router.push({
                                          pathname:`/category/service/${item.category_slug}`,
                                          // query: { Category: item.id, searchList: 'service' },
                                          // query: { Category: item.category_slug, searchList: searchList },
                                        })
                                      } else if (item?.type == 'Brand') {
                                        router.push({
                                          pathname:`/brand/product/${item.slug}`,
                                          // query: { brand_id: item.id, searchList: 'product' },
                                        })
                                      } else if (item?.type == 'Product') {
                                        setListToggle(false);
                                        fetchSearchBylist(item.item_title, 'product');
                                        setSearchKey(item.item_title)
                                        setFilteredresult([]);
                                      } else if (item?.type == 'Listing') {
                                        setListToggle(false);
                                        fetchSearchBylist(item.item_title, 'service');
                                        setSearchKey(item.item_title)
                                        setFilteredresult([]);
                                      } else {
                                        router.push({
                                          pathname: "/page/vendor/vendor-profile",
                                          query: { id: item.id },
                                        })
                                      }
                                    }}>
                                      <div className="d-flex align-items-center" key={index}>
                                        <i className="fa fa-search me-2 text-secoundary" aria-hidden="true"></i>
                                        <div className="">
                                          <div className="complete_1 text-capitalize">{item?.item_title}</div>
                                          <h6 className="text-muted mb-0 pb-0">{item?.type}</h6>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                </>)
                              })}
                            </div> :
                            <div className="card-body">
                              <div className="dropdown-item py-2">
                                <div className="d-flex align-items-center">
                                  <i className="fa fa-search me-2 text-secoundary" aria-hidden="true"></i>
                                  <div className="">No matches found</div>
                                </div>
                              </div>
                            </div>}
                        </div>}


                      {ptoggle1 &&
                        <div className="card search-list-dd-open-home mt-2" ref={targetRef}>
                          <div className=''>
                            <ul className="nav nav-pills d-flex justify-content-center row mx-2 admin_tab_switch bg-gray-300 py-2 br_30" id="pills-tab" role="tablist" >
                              <li className="nav-item col m-0" role="presentation" onClick={() => setSearchList('service')}>
                                <button className={searchList == "service" ? "nav-link active text-dark w-100 h-100 m-0 py-2 br_25" : "nav-link text-dark w-100 h-100 m-0 py-2 br_25"} id="expireing-tab" data-bs-toggle="pill" data-bs-target="#expireing" type="button" role="tab" aria-controls="expireing" aria-selected="false"
                                >
                                  {t('Suppliers')}
                                </button>
                              </li>
                              <li className="nav-item col m-0" role="presentation" onClick={() => setSearchList('product')}>
                                <button className={searchList == "product" ? "nav-link active text-dark w-100 h-100 m-0 py-2 br_25" : "nav-link text-dark w-100 h-100 m-0 py-2 br_25"} id="upcomming-tab" data-bs-toggle="pill" data-bs-target="#upcomming" type="button" role="tab" aria-controls="upcomming" aria-selected="false"
                                //  onBlur={()=>setListToggle(false)} 
                                >
                                  {t('Products')}
                                </button>
                              </li>
                            </ul>
                          </div>
                          <div className="card-body">
                            <div className="py-1">
                              <div className="">
                                {
                                  popularSearch?.length > 0 &&
                                  <div>
                                    <h6>{t('Popular Search')}</h6>
                                    {
                                      popularSearch?.map((data, index) => (
                                        <span class="badge p-ser mb-2 fs-13 cursor-pointer mb-0 fw-light p-2 mx-2" onClick={() => fetchSearchList22(data?.popular_search)} key={index}>{data?.popular_search}</span>
                                      ))
                                    }
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      }

                      {/* <Stack spacing={2} >  
                      <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={result.map((option) => option.item_title)} 
                        renderInput={(params) =>{
                          delete params.style
                          delete params.className;               
                          return( 
                          <TextField
                            {...params}
                            placeholder={t('what are you looking For..')}
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}
                          />
                        )} }
                        />
                     </Stack> */}
                    </div>
                    <button type="submit" className="d-none"></button>
                  </form>
                </div>
              )}
            </div>
            <div
              className={
                log ? "position-relative ms-xl-5 min-w-350px" : "d-none"
              }
            >
              <div className="d-xl-flex row d-block align-items-center rtl_nav">
                <li className="mega-menu user-select-none col">
                  <div
                    className="log_img1  cursor-pointer text-center"
                    title="tatlub-language"
                    onClick={() => changeLanguages()}
                  >
                    <img
                      src="/assets/images/tatlub-img/nav-12.png"
                      className="img-fluid"
                    />
                    {language == "en" ? <p>عربي</p> : <p>Eng</p>}
                  </div>
                </li>
                <li
                  className="mega-menu user-select-none col "
                  title="tatlub-postAd"
                >
                  <Link href="/business/form">
                    <div
                      className="log_img1  text-center cursor-pointer"
                      title="tatlub-postAd"
                    >
                      <img
                        src="/assets/images/tatlub-img/nav-13.png"
                        className="img-fluid"
                      />
                      <p className={router.pathname == '/business/form' ? 'text-color' : "" }>{t("Post Ad")}</p>
                    </div>
                  </Link>
                </li>
                <li className="mega-menu user-select-none col">
                  <Link href={"/page/Lead"}>
                    <div
                      className="log_img1 cursor-pointer text-center"
                      title="Leads"
                    >
                      <img
                        src="/assets/images/tatlub-img/nav-14.png"
                        className="img-fluid"
                      />
                      <p className={router.pathname == '/page/Lead' ? 'text-color' : "" } >{t("Leads")}</p>
                    </div>
                  </Link>
                </li>
                <li className="mega-menu user-select-none col">
                  <Link href={"/Cart/MyCart"}>
                    <div
                      className="log_img1 cursor-pointer text-center"
                      title="My-cart"
                    >
                      <div className="position-relative">
                        <img
                          src="/assets/images/tatlub-img/cart/Icons_cart.png"
                          className="img-fluid"
                        />
                        <div className="position-absolute top-0 start-50 cart_bg">
                          {cartl?.length ?? 0}
                        </div>
                      </div>
                      <p className={router.pathname == '/Cart/MyCart' ? 'text-color' : "" }>{t("My Cart")}</p>
                    </div>
                  </Link>
                </li>
                <li className="mega-menu user-select-none dropdown drop-Card col">
                  <div
                    className="log_img1 cursor-pointer text-center"
                    // id="hhhhhh"
                    // onClick={() =>
                    //   dropdown ? setDropdown(false) : setDropdown(true)
                    // }
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={userData?.user_image ?? ''}
                      className="img-fluid"
                      onError={(e) =>
                      (e.currentTarget.src =
                        "/assets/images/tatlub-img/No.jpg")
                      }
                    />
                    <p className="text-capitalize ">{userData?.name ?? 'user'}</p>
                  </div>
                  
                  <ul
                    className="dropdown-menu border-0 shadow rounded-3 px-3"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <h4 className="mt-3 text-capitalize fw-bolder lh-base">{userData?.name ?? 'user'}</h4>
                    {phone && <p className="">{'+974 ' + phone}</p>}
                    <hr className="my-2 mx-2"></hr>
                    <Link href={"/page/account/profile"}>
                      <li>
                        <a className="cursor-pointer dropdown-item foot-cat">
                          <img
                            src="/assets/images/dropdown-icon/18.png"
                            className="img-fluid "
                          />
                          <span className={router.pathname == '/page/account/profile' ? 'text-color' : "" }>{t("Edit Profile")}{" "}</span>
                        </a>
                      </li>
                    </Link>
                    <Link href="/business">
                      <li>
                        {" "}
                        <a className="cursor-pointer foot-cat  dropdown-item">
                          <img
                            src="/assets/images/dropdown-icon/16.png"
                            className="img-fluid"
                          />
                          
                          <span className={router.pathname == '/business' ? 'text-color' : "" }>{t("My Bussiness")}{" "}</span>
                        </a>
                      </li>
                    </Link>
                    {/* <Link href={"/page/account/wishlist"}>
                    <li>
                    <a className="cursor-pointer dropdown-item">
                      <img
                        src="/assets/images/dropdown-icon/17.png"
                        className="img-fluid "
                      />
                      {t('Favourite')}{" "}
                    </a>
                    </li>
                  </Link> */}
                    <Link href={"/shop/Booking2"} >
                      <li className="d-none">
                        <a className="cursor-pointer dropdown-item foot-cat">
                          <img
                            src="/assets/images/dropdown-icon/27.png"
                            className="img-fluid "
                          />
                          <span className={router.pathname == '/shop/Booking2' ? 'text-color' : "" }>{t('My Appointments')}{" "}</span>
                        </a>
                      </li>
                    </Link>
                    <Link href={"/shop/My_bookings"}>
                      <li className="d-none">
                        <a className="cursor-pointer dropdown-item foot-cat">
                          <img
                            src="/assets/images/tatlub-img/cart/My_bookings.png"
                            className="img-fluid "
                          />
                          <span className={router.pathname == '/shop/My_bookings' ? 'text-color' : "" }> {t('My Bookings')}{" "}</span>
                        </a>
                      </li>
                    </Link>
                    <Link href={"/page/account/My-Orders"}>
                      <li>
                        <a className="cursor-pointer dropdown-item foot-cat">
                          <img
                            src="/assets/images/dropdown-icon/26.png"
                            className="img-fluid "
                          />
                         
                          <span className={router.pathname == '/page/account/My-Orders' ? 'text-color' : "" }>{t("My Order")}</span>
                        </a>
                      </li>
                    </Link>
                    <Link href={{ pathname: "/page/Hiring/JobsApplied", query: { "applyJobs": 'list' } }}>
                      <li>
                        <a className="cursor-pointer dropdown-item foot-cat">
                          <img
                            src="/assets/images/tatlub-img/cart/My_jobs.png"
                            className="img-fluid "
                          />
                          <span className={router.asPath == '/page/Hiring/JobsApplied?applyJobs=list' ? 'text-color' : "" }>{t("My Jobs")}</span>
                        </a>
                      </li>
                    </Link>
                    <Link href={"/Subscription"}>
                      <li>
                        <a className="cursor-pointer dropdown-item foot-cat">
                          <img
                            src="/assets/images/dropdown-icon/23.png"
                            className="img-fluid "
                          />
                          <span className={router.pathname == '/Subscription' ? 'text-color' : "" }>{t('My Subscription')}{" "}</span>
                        </a>
                      </li>
                    </Link>
                    <Link href={"/page/account/Manage-orders"}>
                      <li>
                        <a className="cursor-pointer dropdown-item foot-cat">
                          <img
                            src="/assets/images/dropdown-icon/21.png"
                            className="img-fluid "
                          />
                         <span className={router.pathname == '/page/account/Manage-orders' ? 'text-color' : "" }>{t("Manage Order")}</span>
                        </a>
                      </li>
                    </Link>

                    <Link href={"/page/Hiring/JobsApplied"}>
                      <li>
                        <a className="cursor-pointer dropdown-item foot-cat">
                          <img
                            src="/assets/images/dropdown-icon/28.png"
                            className="img-fluid "
                          />
                          <span className={router.asPath == '/page/Hiring/JobsApplied' ? 'text-color' : "" }>{t('Manage Jobs')}{" "}</span>
                        </a>
                      </li>
                    </Link>
                    
                    {/* <Link href={"/Cart/MyCart"}>
                      <li>
                        <a className="cursor-pointer dropdown-item foot-cat">
                           {cartList?.length > 0 && <div className="red-dot"></div>}
                          <img
                            src="/assets/images/tatlub-img/cart/cart.png"
                            className="img-fluid "
                          />
                          {t("My Cart")}{" "}
                        </a>
                      </li>
                    </Link> */}
                    {/* <Link href={"/"}>
                    <li>
                      <a className="cursor-pointer dropdown-item foot-cat">
                        <img
                          src="/assets/images/dropdown-icon/19.png"
                          className="img-fluid "
                        />
                        {t('Manage My Catalogue')}{" "}
                      </a>
                    </li>
                  </Link> */}
                    <Link href={"/page/Lead"}>
                      <li title="tatlub-Leads">
                        <a className="cursor-pointer dropdown-item foot-cat">
                          <img
                            src="/assets/images/dropdown-icon/20.png"
                            className="img-fluid "
                          />
                         <span className={router.pathname == '/page/Lead' ? 'text-color' : "" }>{t("Leads")}{" "}</span>
                        </a>
                      </li>
                    </Link>

                    <Link href={"/page/Enquiry_manage"}>
                      <li>
                        <a className="cursor-pointer dropdown-item foot-cat">
                          <img
                            src="/assets/images/dropdown-icon/22.png"
                            className="img-fluid "
                          />
                          <span className={router.pathname == '/page/Enquiry_manage' ? 'text-color' : "" }> {t("Enquire & Manage Quotes")}{" "}</span>
                        </a>
                      </li>
                    </Link>

                    {/* <Link href={"/shop/Listing"}>
                      <li title="tatlub-postAd">
                        <a className="cursor-pointer dropdown-item foot-cat">
                        <img
                            src="/assets/images/dropdown-icon/25.png"
                            className="img-fluid "
                          />
                          {t("Post a Ad")}{" "}
                        </a>{" "}
                      </li>
                    </Link> */}
                    <Link href={"/"}>
                      <li>
                        {" "}
                        <a
                          className="cursor-pointer dropdown-item foot-cat"
                          onClick={() => {
                            setlog(false),
                              setDropdown(false),
                              sessionStorage.clear();
                            localStorage.removeItem("data");
                          }}
                        >

                          <img
                            src="/assets/images/dropdown-icon/24.png"
                            className="img-fluid "
                          />
                          {t("Logout")}{" "}
                        </a>
                      </li>
                    </Link>
                  </ul>
                </li>
              </div>
            </div>
            <div className={log ? "d-none" : ""}>
              <div className="w-60 d-xl-flex align-items-center justify-content-end rtl_nav">
                <li
                  className="px-3 mega-menu text-color cursor-pointer"
                  title="tatlub-language"
                  onClick={() => changeLanguages()}
                >
                  <img
                    src="/assets/images/icon/Language.png"
                    className="img-fluid langugae_img px-1"
                  />
                  {language == "en" ? <span>عربي</span> : <span>Eng</span>}
                </li>

                <li
                  className="px-3 mega-menu cursor-pointer foot-cat complete_1"
                  title="tatlub-postAd"
                  onClick={toggle}
                >
                  {t("Post Ad")}
                </li>
                <li className="px-3 cursor-pointer complete_1">
                  <a onClick={toggle}>
                    <span className="" id="log-sign">
                      <a className="foot-cat">
                        {" "}
                        {t("Login")}{" "}/{t("Sign Up")}
                      </a>

                      {/* href="/page/account/register" */}
                      {/* <a className=" ">{t("Sign Up")}</a> */}
                      <img
                        src="/assets/images/tatlub-img/nav.1.png"
                        className="img-fluid langugae_img"
                        id="defaultlogset"
                      // onClick={() => setlog(true)}
                      />
                    </span>
                  </a>
                </li>
                {/* <li className="mega-menu">
                <button type="button" className="btn btn_header ">
                 {t('Download App')} <i className="fa fa-cloud-download vert-move" aria-hidden="true"></i>
                </button>
              </li> */}
              </div>
            </div>
          </ul>
        </div>
      </div>

      <div
        id="drophhh"
        className={!dropdown ? "d-none drop-Card" : "d-block drop-Card"}
      >
        <h4 className="mt-3 ps-2 fw-bolder">IE&CL</h4>
        <p className="ps-2">+974 {userData?.phone ?? "1234567890"}</p>
        <hr className="my-2 mx-2"></hr>
        <ul>
          <Link href="/business">
            <li>
              {" "}
              <a className="cursor-pointer">
                <img
                  src="/assets/images/dropdown-icon/16.png"
                  className="img-fluid "
                />
                {t("My Bussiness")}{" "}
              </a>
            </li>
          </Link>
          <Link href={"/page/account/wishlist"}>
            <li className="cursor-pointer">
              <img
                src="/assets/images/dropdown-icon/17.png"
                className="img-fluid "
              />
              {t("Favourite")}{" "}
            </li>
          </Link>
          <Link href={"/page/account/profile"}>
            <li>
              <a className="cursor-pointer">
                <img
                  src="/assets/images/dropdown-icon/18.png"
                  className="img-fluid "
                />
                {t("Edit Profile")}{" "}
              </a>
            </li>
          </Link>
          <Link href={"/"}>
            <li>
              <a className="cursor-pointer">
                <img
                  src="/assets/images/dropdown-icon/19.png"
                  className="img-fluid "
                />
                {t("Manage My Catalogue")}{" "}
              </a>
            </li>
          </Link>
          <Link href={"/page/Lead"}>
            <li className="cursor-pointer" title="Leads">
              <a className="user-select-none ">
                <img
                  src="/assets/images/dropdown-icon/20.png"
                  className="img-fluid "
                />
                <span className={router.pathname == '/page/Lead' ? 'text-color' : "" }>{t("Leads")}{" "}</span>
              </a>
            </li>
          </Link>
          <Link href={"/page/account/Manage-orders"}>
            <li>
              <a className="cursor-pointer">
                <img
                  src="/assets/images/dropdown-icon/21.png"
                  className="img-fluid "
                />
                <span className={router.pathname == '/page/account/Manage-orders' ? 'text-color' : "" }>{t("Manage Order")}</span>
              </a>
            </li>
          </Link>
          <Link href={"/page/account/My-Orders"}>
            <li>
              <a className="cursor-pointer dropdown-item">
                <img
                  src="/assets/images/dropdown-icon/21.png"
                  className="img-fluid "
                />
                <span className={router.pathname == '/page/account/My-Orders' ? 'text-color' : "" }>{t("My Order")}</span>
              </a>
            </li>
          </Link>
          <Link href={"/page/account/Enquiry-manage"}>
            <li>
              <a className="cursor-pointer">
                <img
                  src="/assets/images/dropdown-icon/22.png"
                  className="img-fluid "
                />
                <span className={router.pathname == '/page/account/Enquiry-manage' ? 'text-color' : "" }>{t("Enquire & Manage Quotes")}{" "}</span>
              </a>
            </li>
          </Link>
          <Link href={"/"}>
            <li>
              <a className="cursor-pointer">
                <img
                  src="/assets/images/dropdown-icon/23.png"
                  className="img-fluid "
                />
                {t("Become a Seller")}{" "}
              </a>
            </li>
          </Link>
          <Link href={"/"}>
            <li title="tatlub-postAd">
              <a className="cursor-pointer">
                <img
                  src="/assets/images/dropdown-icon/24.png"
                  className="img-fluid "
                />
                {t("Post a Ad")}{" "}
              </a>{" "}
            </li>
          </Link>
          <Link href={"/"}>
            <li>
              {" "}
              <a
                className="cursor-pointer"
                onClick={() => {
                  setlog(false), setDropdown(false), sessionStorage.clear();
                  localStorage.removeItem("data");
                }}
              >
                <img
                  src="/assets/images/dropdown-icon/25.png"
                  className="img-fluid "
                />
                {t("Logout")}{" "}
              </a>
            </li>
          </Link>
        </ul>
      </div>

      <div>
        <Button
          className="d-none"
          id="closeLoginPopup"
          onClick={toggle}
        ></Button>
        <Modal
          className="model_contact modal-md modal-dialog-centered"
          isOpen={modal}
          toggle={toggle}
          {...args}
        >
          <ModalHeader className="border-0" toggle={toggle}></ModalHeader>
          <ModalBody>
            <Login />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default NavBar;
