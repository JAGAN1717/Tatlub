import React, { useEffect, useState, useContext} from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Collapse,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import LogoImage from "../../headers/common/logo";
import CopyRight from "./copyright";
import { getCategory } from "../core/_request";
import { useRouter } from "next/router";
import { getSocialmedia } from "../../core/fashion_request";
import { getAboutus } from "../../core/vendor_request";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";
// import { config } from "@fortawesome/fontawesome-svg-core";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// config.autoAddCss = false;
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { ToastContainer, toast } from "react-toastify";
import SettingContext from "../../../helpers/theme-setting/SettingContext";



const MasterFooter = ({
  containerFluid,
  logoName,
  layoutClass,
  footerClass,
  footerLayOut,
  footerSection,
  belowSection,
  belowContainerFluid,
  CopyRightFluid,
  newLatter,
  mediaLink,
  categoryList,
}) => {
  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const [catList, setCatlist] = useState(68);
  const [catList1, setCatlist1] = useState(136);
  const [catList2, setCatlist2] = useState(212);
  const [catList3, setCatlist3] = useState(280);
  const [categories, setCategories] = useState([]);
  const [searchCategory, setSerachCategory] = useState("");
  const [usefulllink,SetuseFulllinks] = useState([]);
  const [copied, setCopied] = useState(false);
  const context = useContext(SettingContext);
  const layoutType = context.layoutFun;

  console.log("layoutTypelayoutType",context?.state)

  const [activeTab, setActiveTab] = useState("1");
  if (typeof window === "undefined") {
    return null;
  }

  const width = window.innerWidth < 750;
  // const [category, setCategory] = useState([]);
  const [soacial, setSocial] = useState([]);
  const { t } = useTranslation();
  const router = useRouter();
  const [aboutdata, setAboutus] = useState();

  const fetchAboutUs = async () => {
    const responce = await getAboutus();
    setAboutus(responce.data);
  };

  const fetchSocialMedia = async () => {
    const response = await getSocialmedia();
    setSocial(response.data);
  };

  // const fetchCategory = async () => {
  //   const response = await getCategory()
  //   console.log("hkgkgk",response.data);
  //   setCategory(response.data)
  // }

  const shuffleArray = (array) => {
    const shuffledArray = [...array]; // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      if(JSON.stringify(shuffledArray[i]?.category_name)?.length < 15 ){
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
      }
    }
    SetuseFulllinks(shuffledArray)
  };

  useEffect(() => {
    setCategories(categoryList);
    shuffleArray(categoryList)
  },[categoryList]);

  useEffect(() => {
    let searchData = [];

    if (searchCategory == "") {
      setCategories(categoryList);
    }

    if (searchCategory) {
      categoryList.map((data, i) => {
        if (
          data?.category_name
            .toLowerCase()
            .includes(searchCategory.toLowerCase())
            // .startsWith(searchCategory.toLowerCase())
        ) {
        
          searchData.push(data);
        }
        // if(data?.category_name === searchCategory){
        //   searchData.push(data)
        // }
      });


      setCategories(searchData);
    }
  }, [searchCategory]);

  useEffect(() => {
    fetchSocialMedia();
    // fetchCategory();
    // fetchAboutUs();
  }, []);

  useEffect(() => {
    const changeCollapse = () => {
      if (window.innerWidth < 750) {
        setCollapse(0);
        setIsOpen(false);
      } else setIsOpen(true);
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      window.removeEventListener("resize", changeCollapse);
    };
  }, []);
  return (
    <div>
      <footer className={footerClass}>
        <div className="foat_download vert-move d-none">
          <div className="d-block text-center">
            <img
              className="mb-2 cursor-pointer"
              src="/assets/images/floading_icon/3.png"
            />
            {/* <FontAwesomeIcon icon="fa-brands fa-google-play" /> */}
            <img
              src="/assets/images/floading_icon/2.png"
              className="cursor-pointer"
            />
          </div>
          {/* {t('Download App')} <i className="fa fa-cloud-download ps-2" aria-hidden="true"></i> */}
        </div>

        {/* <section className={belowSection}> */}
        <section className={window.location.pathname == '/' ? "light_blue4 pb-4" : "pb-4 bg-white"}>
          <div className={window.location.pathname == '/' ?  "bg_fg_tp light_blue4 mb-lg-5 mb-3 pb-4" :"bg_fg_tp mb-lg-5 mb-3 pb-4"}>
            <div className="container ">
              <Nav
                tabs
                className="nav-material  justify-content-between align-items-center border-0 row mb-3"
              >
                <NavItem
                  className={
                    activeTab === "1"
                      ? "bg_blue_light nav nav-tabs col-lg-3 col-sm-6 headr_footer"
                      : "nav nav-tabs col-lg-3 col-sm-6 headr_footer"
                  }
                  id="myTab"
                  role="tablist"
                  onClick={() => setActiveTab("1")}
                >
                  <NavLink
                    className={
                      activeTab === "1"
                        ? "active p-0 bg-transparent border-0"
                        : ""
                    }
                  >
                    <h4 className="fw-bolder mb-0 text-center">
                      {t("Top Ranked Categories")}
                      {activeTab === "1" ? " -" : " +"}
                    </h4>
                  </NavLink>
                </NavItem>
                <NavItem
                  className={
                    activeTab === "2"
                      ? "bg_blue_light nav nav-tabs col-lg-3 col-sm-6 headr_footer"
                      : "nav nav-tabs col-lg-3 col-sm-6 headr_footer"
                  }
                  id="myTab"
                  role="tablist"
                  onClick={() => setActiveTab("2")}
                >
                  <NavLink
                    className={
                      activeTab === "2"
                        ? "active p-0 bg-transparent border-0"
                        : ""
                    }
                  >
                    <h4 className="fw-bolder mb-0 text-center">
                      {t("Trending Categories")}
                      {activeTab === "2" ? " -" : " +"}
                    </h4>
                  </NavLink>
                </NavItem>
                <NavItem
                  className={
                    activeTab === "3"
                      ? "bg_blue_light nav nav-tabs col-lg-3 col-sm-6 headr_footer"
                      : "nav nav-tabs col-lg-3 col-sm-6 headr_footer"
                  }
                  id="myTab"
                  role="tablist"
                  onClick={() => setActiveTab("3")}
                >
                  <NavLink
                    className={
                      activeTab === "3"
                        ? "active p-0 bg-transparent border-0"
                        : ""
                    }
                  >
                    <h4 className="fw-bolder mb-0 text-center">
                      {t("Popular Categories")}{" "}
                      {activeTab === "3" ? " -" : " +"}
                    </h4>
                  </NavLink>
                </NavItem>
                <NavItem
                  className={
                    activeTab === "4"
                      ? "bg_blue_light nav nav-tabs col-lg-3 col-sm-6 headr_footer"
                      : "nav nav-tabs col-lg-3 col-sm-6 headr_footer"
                  }
                  id="myTab"
                  role="tablist"
                  onClick={() => setActiveTab("4")}
                >
                  <NavLink
                    className={
                      activeTab === "4"
                        ? "active p-0 bg-transparent border-0"
                        : ""
                    }
                  >
                    <h4 className="fw-bolder mb-0 text-center">
                      {t("Recently Added Categories")}
                      {activeTab === "4" ? " -" : " +"}
                    </h4>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent
                activeTab={activeTab}
                className="nav-material bg-transparent shadow-none"
              >
                <TabPane tabId="1">
                  {categoryList?.slice(0, catList).map((data, index) => {
                    return (
                      <small
                        key={index}
                        className="cursor-pointer foot-cat text-capitalize"
                        onClick={() =>
                          router.push({
                            pathname:`/category/service/${data.category_slug}`,
                            // query: { Category: data.category_slug,searchList: 'service' },
                          })
                        }
                      >
                        {data.category_name} <span className="px-1">|</span>
                      </small>
                    );
                  })}
                  {categoryList?.length > catList && (
                    <small
                      className="text-color cursor-pointer"
                      onClick={() => setCatlist(categoryList?.length)}
                    >
                      View More
                    </small>
                  )}
                   {categoryList?.length == catList && (
                    <small
                      className="text-color cursor-pointer"
                      onClick={() => setCatlist(68)}
                    >
                      View Less
                    </small>
                  )}
                </TabPane>
                <TabPane tabId="2">
                  {categoryList?.slice(68, catList1).map((data, index) => {
                    return (
                      <small
                        key={index}
                        className="cursor-pointer foot-cat"
                        onClick={() =>
                          router.push({
                            pathname:`/category/service/${data.category_slug}`,
                            // query: { Category: data.category_slug,searchList: 'service' },
                          })
                        }
                      >
                        {data.category_name} <span className="px-1">|</span>
                      </small>
                    );
                  })}
                  {/* { categoryList?.length > catList  &&  <small className="text-color cursor-pointer" onClick={()=>setCatlist(categoryList?.length)}>View More</small>}    */}
                  {categoryList?.length > catList1 && (
                    <small
                      className="text-color cursor-pointer"
                      onClick={() => setCatlist1(categoryList?.length)}
                    >
                      View More
                    </small>
                  )}
                   {categoryList?.length == catList1 && (
                    <small
                      className="text-color cursor-pointer"
                      onClick={() => setCatlist1(136)}
                    >
                      View Less
                    </small>
                  )}
                </TabPane>
                <TabPane tabId="3">
                  {categoryList?.slice(136, catList2).map((data, index) => {
                    return (
                      <small
                        key={index}
                        className="cursor-pointer foot-cat text-capitalize"
                        onClick={() =>
                          router.push({
                            pathname:`/category/service/${data.category_slug}`,
                            // query: { Category: data.category_slug,searchList: 'service' },
                          })
                        }
                      >
                        {data.category_name} <span className="px-1">|</span>
                      </small>
                    );
                  })}
                   {categoryList?.length > catList2 && (
                    <small
                      className="text-color cursor-pointer"
                      onClick={() => setCatlist2(categoryList?.length)}
                    >
                      View More
                    </small>
                  )}
                   {categoryList?.length == catList2 && (
                    <small
                      className="text-color cursor-pointer"
                      onClick={() => setCatlist2(212)}
                    >
                      View Less
                    </small>
                  )}
                </TabPane>

                <TabPane tabId="4">
                  {categoryList?.slice(212, catList3).map((data, index) => {
                    return (
                      <small
                        key={index}
                        className="cursor-pointer foot-cat text-capitalize"
                        onClick={() =>
                          router.push({
                            pathname:`/category/service/${data.category_slug}`,
                            // query: { Category: data.category_slug,searchList: 'service' },
                          })
                        }
                      >
                        {data.category_name} <span className="px-1">|</span>
                      </small>
                    );
                  })}
                   {categoryList?.length > catList3 && (
                    <small
                      className="text-color cursor-pointer"
                      onClick={() => setCatlist3(categoryList?.length)}
                    >
                      View More
                    </small>
                  )}
                   {categoryList?.length == catList3 && (
                    <small
                      className="text-color cursor-pointer"
                      onClick={() => setCatlist3(280)}
                    >
                      View Less
                    </small>
                  )}
                </TabPane>
              </TabContent>

              {/* <div className="row border_light_bottom mb-3">
              <div className="col-3 headr_footer "><h4 className="fw-bolder mb-0 text-center">{t('Top Ranked Categories +')}</h4></div>
              <div className="col-3 headr_footer bg_blue_light"><h4 className="fw-bolder mb-0 text-center">{t('Trending Categories +')}</h4></div>
              <div className="col-3 headr_footer"><h4 className="fw-bolder mb-0 text-center">{t('Popular Categories +')}</h4></div>
              <div className="col-3 headr_footer bg_blue_light"><h4 className="fw-bolder mb-0 text-center">{t('Recently Added Categories -')}</h4></div>
            </div>
                {
                  categoryList?.slice(0,catList).map((data,index)=>{
                    return(
                      <small key={index} className="cursor-pointer foot-cat" onClick={()=>router.push({pathname:'/shop/left_sidebar',query:{ Category:data.id}}) }>
                          {data.category_name}  <span className="px-1">|</span>
                      </small>
                    )
                  })
                }
            { categoryList?.length > catList  &&  <small className="text-color cursor-pointer" onClick={()=>setCatlist(categoryList?.length)}>View More</small>}   
             <small className="text-color cursor-pointer" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">View More</small>
                <small className="text-color cursor-pointer" onClick={()=> document.getElementById('openallCategory')?.click()}>View More</small> */}
            </div>
          </div>
          
          {/* <Container fluid={belowContainerFluid ? belowContainerFluid : ""}> */}
          <Container >
            <Row className="footer-theme partition-f">
              <Col xl="5" lg='4' md="6">
                {/* <div
                  className={`footer-title ${isOpen && collapse == 1 ? "active" : ""
                    } footer-mobile-title`}
                >
                  <h4
                    onClick={() => {
                      setCollapse(1);
                      setIsOpen(!isOpen);
                    }}
                  >
                    about
                    <span className="according-menu"></span>
                  </h4>
                </div> */}
                {/* <Collapse
                  isOpen={width ? (collapse === 1 ? isOpen : false) : true}
                > */}
                <div className="footer-contant d-none">
                  <div className="footer-logo">
                    <LogoImage logo={logoName} />
                  </div>
                  <p className="complete_3">
                    {aboutdata?.setting_page_about.replace(/<[^>]+>/g, "")}
                  </p>
                </div>
                {/* </Collapse> */}
                <div className="sub-title mb-3">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 1 ? "active" : ""
                    } `}
                  >
                    <h3
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(1);
                        } else setIsOpen(true);
                      }}
                      className="fw-bolder"
                    >
                      {t("Quick Links")}
                      <span className="according-menu"></span>
                    </h3>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 1 ? isOpen : false) : true}
                  >
                    <div className="footer-contant w-100 d-flex">
                      <ul className="w-50">
                        <li>
                          <i
                            className={context.state == 'en' ? 'fa fa-angle-left pe-2':'fa fa-angle-right pe-2'}
                            aria-hidden="true"
                          ></i>
                          <Link href={`/page/about-us`}>
                            <a className="foot-cat">{t("About us")}</a>
                          </Link>
                        </li>
                        <li>
                          <i
                            className={context.state == 'en' ? 'fa fa-angle-left pe-2':'fa fa-angle-right pe-2'}
                            aria-hidden="true"
                          ></i>
                          <Link href={{pathname:"/page/Hiring/category"
                              //  ,query:{'id':14}
                          }}>
                            <a className="foot-cat">{t("We're Hiring")} </a>
                          </Link>
                        </li>
                        <li>
                          <i
                            className={context.state == 'en' ? 'fa fa-angle-left pe-2':'fa fa-angle-right pe-2'}
                            aria-hidden="true"
                          ></i>
                          {/* <Link href="/page/CustomerCare/CustomerCare-list"> /page/Hiring/Job-list?id=38166 */}
                          <Link href="/page/Hiring/Job-list?id=38166">
                            <a className="foot-cat">{t("Customer Care")}</a>
                          </Link>
                        </li>

                        <li>
                          <i
                            className={context.state == 'en' ? 'fa fa-angle-left pe-2':'fa fa-angle-right pe-2'}
                            aria-hidden="true"
                          ></i>
                          <Link href={`/shop/Listing`}>
                            <a className="foot-cat">{t("Free Listing")}</a>
                          </Link>
                        </li>
                      </ul>
                      <ul className="w-50">
                        <li>
                          <i
                            className={context.state == 'en' ? 'fa fa-angle-left pe-2':'fa fa-angle-right pe-2'}
                            aria-hidden="true"
                          ></i>
                          <Link href="/page/account/feedback">
                            <a className="foot-cat">{t("Feedback")}</a>
                          </Link>
                        </li>
                        <li>
                          <i
                            className={context.state == 'en' ? 'fa fa-angle-left pe-2':'fa fa-angle-right pe-2'}
                            aria-hidden="true"
                          ></i>
                          <Link href="/business">
                            <a className="foot-cat" href="#">{t("Business Badge")}</a>
                          </Link>
                        </li>
                        <li>
                          <i
                            className={context.state == 'en' ? 'fa fa-angle-left pe-2':'fa fa-angle-right pe-2'}
                            aria-hidden="true"
                          ></i>
                          <Link href="/page/account/testimonials">
                            <a className="foot-cat">{t("Testimonials")}</a>
                          </Link>
                        </li>
                        <li>
                          <i
                            className={context.state == 'en' ? 'fa fa-angle-left pe-2':'fa fa-angle-right pe-2'}
                            aria-hidden="true"
                          ></i>
                          <Link href="/page/account/contact">
                            <a className="foot-cat">{t("Contact Us")}</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>

              <Col xl='5' lg='4' md="6" className="mb-3">
                <div className="sub-title">
                  <div
                    className={`footer-title ${
                      isOpen && collapse == 2 ? "active" : ""
                    } `}
                  >
                    <h3
                      onClick={() => {
                        if (width) {
                          setIsOpen(!isOpen);
                          setCollapse(2);
                        } else setIsOpen(true);
                      }}
                      className="fw-bolder"
                    >
                      {t("Useful links")}
                      <span className="according-menu"></span>
                    </h3>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 2 ? isOpen : false) : true}
                  >
                    <div className="footer-contant w-100 d-flex">
                      <ul className="w-50">
                        {/* <li>
                          <i
                            className="fa fa-angle-right pe-2"
                            aria-hidden="true"
                          ></i>
                          <Link href={`/layouts/realestate`}>
                            <a>{t("Real Estate")}</a>
                          </Link>
                        </li> */}
                        {
                          usefulllink.length > 0 &&
                          usefulllink.slice(0,4).map((data,index)=>(
                        <li key={index}
                        onClick={() =>
                          router.push({
                            pathname:`/category/service/${data.category_slug}`,
                            // query: { Category: data.category_slug,searchList: 'service' },
                          })
                        }
                        >
                          <span  className="text-truncate">
                          <i
                            className={context.state == 'en' ? 'fa fa-angle-left pe-2':'fa fa-angle-right pe-2'}
                            aria-hidden="true"
                          ></i>
                         
                            <a className="cursor-pointer foot-cat">{t(data?.category_name)}</a>
  
                          </span>
                        </li>
                          ))
                        }
                      </ul>

                      <ul className="ms-2 w-50">

                        {
                          usefulllink.length > 4 &&
                          usefulllink.slice(4,8).map((data,index)=>(
                        <li key={index} 
                        onClick={() =>
                          router.push({
                            pathname:`/category/service/${data.category_slug}`,
                            // query: { Category: data.category_slug,searchList: 'service' },
                          })
                        }
                        >
                          <span  className="text-truncate">
                          <i
                            className={context.state == 'en' ? 'fa fa-angle-left pe-2':'fa fa-angle-right pe-2'}
                            aria-hidden="true"
                          ></i>
                            <a className="cursor-pointer ">{t(data?.category_name)}</a>
                          </span>
                        </li>
                          ))
                        }
                      </ul>
                    </div>
                  </Collapse>
                </div>
              </Col>

              <Col xl="2" lg='4'>
                <div className="footer-contant">
                  <h3 className="fw-bolder">{t("Get App")}</h3>
                  <div className="my-4">
                    <img
                      src={`/assets/images/icon/GooglePlay.png`}
                      alt=""
                      className="img-fluid me-2 mb-2 img_pay_app cursor-pointer"
                      onClick={()=> window.open('https://play.google.com/store/games?device=windows')}
                    />
                    <img
                      src="/assets/images/icon/appstore.png"
                      alt=""
                      className="img-fluid img_pay_app mb-2 cursor-pointer"
                      onClick={()=> window.open('https://www.apple.com/')}
                    />
                  </div>
                  <h3 className="fw-bolder mt-lg-5">{t("Follow us")}</h3>

                  <div className="footer-social">
                    <ul>
                      {soacial?.map((data, index) => (
                        <li key={index}>
                          <a href={data.social_media_link} target="_blank">
                            <i
                              className={data.social_media_icon}
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      ))}
                      {/* <li>
                          <a href="https://plus.google.com" target="_blank">
                            <i
                              className="fa fa-google-plus"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li> */}
                    </ul>
                  </div>
                </div>
               {/* </Collapse> */}
              </Col>
            </Row>
            <div className="mt-lg-5 mt-3 mb-3">
              <h4 className="fw-bolder mb-3">
                {t("Explore Tatlub Collection")}
              </h4>
              <p>
                {categoryList?.slice(categoryList?.length-8, categoryList?.length).map((data, index) => {
                  return (
                    <span
                      key={index}
                      className="cursor-pointer foot-cat text-capitalize"
                      onClick={() =>
                        router.push({
                          pathname:`/category/service/${data.category_slug}`,
                          // query: { Category: data.category_slug,searchList: 'service' },
                        })
                      }
                    >
                      {data.category_name} <span className="px-2">|</span>
                    </span>
                  );
                })}
              </p>
            </div>
          </Container>
        </section>

        <div className="text-center py-2 theme-color ">
          <p className="text-white">
            © 2022 {t("Copyrights by Tatlub.com All Rights Reserved")}
          </p>
        </div>

        {/* <CopyRight
          layout={layoutClass}
          fluid={CopyRightFluid ? CopyRightFluid : ""}
        /> */}

        <div className="silde_cat">
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasWithBackdrop"
            aria-labelledby="offcanvasWithBackdropLabel"
          >
            <div className="offcanvas-header">
              {/* <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
            </h5> */}
              <div className="w-75">
                <div className="search-container w-100  ms-2">
                  {/* <form className="d-flex align-items-center select-serch">
                           <Input type="text" placeholder="" className="border-0" name="search" />
                           <button  className="border-0 p-0 btn" type="submit"><img src="/assets/images/icons-23/2.png" /></button>
                        </form> */}
                  <span className="p-input-icon-left w-100">
                    <i
                      className="fa fa-search cursor-pointer"
                      aria-hidden="true"
                    />
                    <InputText
                      placeholder="Search"
                      className="w-100"
                      onChange={(e) => setSerachCategory(e.target.value)}
                    />
                  </span>
                </div>
                {/* <h4 className="modal-category">{t('Popular category')}</h4> */}
              </div>
              <div className="d-flex justify-content-end align-items-center w-100">
                <button
                  type="button"
                  className="btn-close text-reset text-end"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="offcanvas-body">
              <div className="p-3">
                <Row>
                  {categories.length > 0 &&
                    categories.map((i, index) => (
                      <Col
                        xl="3"
                        className="d-flex align-items-center mb-md-4 mb-3 px-md-3 px-2"
                        title={i.category_name}
                        onClick={() =>
                          router.push({
                            pathname:`/category/service/${i.category_slug}`,
                            // query: { Category: i.category_slug,searchList: 'service' },
                          })
                        }
                        key={index}
                      >
                        <img
                          src={i.category_image}
                          className="img-fluid img_category pe-1"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "/assets/images/tatlub-img/no1.png")
                          }
                        />
                        <span className="cursor-pointer text-truncate foot-cat text-capitalize">
                          {i.category_name}
                        </span>
                      </Col>
                    ))}

                  {categories.length == 0 && (
                    <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                      <img
                        src="/assets/images/tatlub-img/not_Found.png"
                        className="no_image"
                      />
                      <h3>{t("No Result Found")}</h3>
                    </div>
                  )}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </footer>

              {/* share  popup*/}
      <div
          className="modal fade"
          id={"delete_confirm_popup12212"}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h3>{t("Share With Friends")}</h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                {/* <div className='vendor-icon-img text-dark' data-bs-dismiss='modal'>
                    <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                    <i className="fa fa-xmark"></i>
                    </div> */}
              </div>
              <div className="modal-body p-3 pb-4 pt-4 ">
                <div className="d-flex justify-content-between">
                  <div
                    className="text-center"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <FacebookShareButton
                       url={window.location.href}
                    >
                      <div
                        className={
                          "vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center Facebook_xl"
                        }
                      >
                        <i className="fa fa-facebook"></i>
                      </div>
                      {t("Facebook")}
                    </FacebookShareButton>
                  </div>
                  <div
                    className="text-center"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <WhatsappShareButton
                       url={window.location.href}
                    >
                      <div
                        className={
                          "vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center Whatsapp_xl"
                        }
                        onClick={() =>
                          window.open(
                            "https://web.whatsapp.com/"
                          )
                        }
                      >
                        <i className="fa fa-whatsapp"></i>
                      </div>
                      {t("Whatsapp")}
                    </WhatsappShareButton>
                  </div>

                  <div
                    className="text-center position-relative"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    {/* {copied && <span className='position-absolute top-50 start-50 translate-middle'>Copied!</span>} */}
                    <div
                      className={
                        "vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center copy_link_xl"
                      }
                      onClick={() => {
                        navigator.clipboard.writeText(
                          window.location.href
                        );
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 2000);
                        toast.info(
                          "Link copied to clipboard!",
                          {
                            position: "bottom-center",
                            autoClose: 500,
                            icon: false,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          }
                        );
                      }}
                    >
                      <i className="fa fa-link"></i>
                    </div>
                    {t("Copy Link")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
export default MasterFooter;
