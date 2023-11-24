import React, { useState, useEffect, useContext } from "react";
import NavBar from "./common/navbar";
import SideBar from "./common/sidebar";
import Cart from "../containers/Cart";
import CartContainer from "../containers/CartContainer";
import TopBarDark from "./common/topbar-dark";
import {Button, Container, Row, Col, Modal, Input, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import LogoImage from "./common/logo";
import search from "../../public/assets/images/icon/search.png";
import settings from "../../public/assets/images/icon/setting.png";
import cart from "../../public/assets/images/icon/cart.png";
import Currency from "./common/currency";
import { useRouter } from "next/router";
import SearchOverlay from "./common/search-overlay";
import { getCategory } from "../core/fashion_request";
import { postRequirement } from "./core/_request";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import AuthContex from "../auth/AuthContex";
import {getMyCart,removeCart} from '../../components/core/cart_request';
import itemscontex from "../../pages/initcontext";


const HeaderOne = ({
  logoName,
  headerClass,
  topClass,
  noTopBar,
  direction,
  categoryList,
  setResult,
  setPopularSearch,
  setPro,
  setBrandSug,
  args,
}) => {
  const router = useRouter();
  const [category, setcategory] = useState(categoryList ?? []);
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { userData } = useContext(AuthContex);
  const {setCart,cart} = useContext(itemscontex);
  const [products, setProducts] = useState([]);



  const fetchMyCart = async () => {
    let id = userData?.id
    getMyCart(id).then(res => {
        setProducts(res.data)
        // setCart(res.data)
    }).catch(err => {
        console.error('err',err.message);
    })
   }

   useEffect(()=> {
    fetchMyCart();
    localStorage.setItem("cartCount",products?.length ?? 0)
   },[cart])

  /*=====================
     Pre loader
     ==========================*/
  useEffect(() => {
    // fetchCategory();
    setTimeout(function () {
      document.querySelectorAll(".loader-wrapper").style = "display:none";
    }, 2000);

    if (router.asPath !== "/layouts/Christmas")
      window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const initialValues = {
    name: "",
    description: "",
    user_id: "",
    city: "",
    first_name: "",
    email: "",
    mobile_number: "",
    landline_number: "",
  };

  const formValidation = Yup.object().shape({
    name: Yup.string().required("Enter Name"),
    description: Yup.string(),
    city: Yup.string(),
    first_name: Yup.string(),
    email: Yup.string().email("Please Enter Valid Email Id"),
    mobile_number: Yup.string().required("Enter Mobile Number").min(7, 'invalid phone number'),
    landline_number: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      var userId =
        JSON.parse(sessionStorage.getItem("data"))?.id ??
        JSON.parse(localStorage.getItem("data"))?.id;
      try {
        const body = {
          name: values.name,
          description: values.description,
          user_id: userId,
          city: values.city,
          first_name: values.first_name,
          email: values.email,
          mobile_number: values.mobile_number,
          landline_number: values.landline_number,
        };
        document.getElementById("openloaderModal")?.click();
        const response = await postRequirement(body);
        document.getElementById("closeloaderModal")?.click();
        if (response.status == 200) {
          toast.info("SUCCESSFULL POST", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon:false,
            progress: undefined,
            theme: "dark",
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
        resetForm();
      } catch (error) {
        document.getElementById("closeloaderModal")?.click();
        console.error(error);
        setStatus("The details is incorrect");
        setSubmitting(false);
      }
    },
  });

  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      3;
    if (number >= 5) {
      if (window.innerWidth < 5)
        document.getElementById("sticky").classList.remove("fixed");
      else document.getElementById("sticky").classList.add("fixed");
    } else document.getElementById("sticky").classList.remove("fixed");
  };

  const fetchCategory = async () => {
    const responcedata = await getCategory();
    setcategory(responcedata.data);
    // console.log("jhgg", responcedata)
  };

  const openNav = () => {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  };
  const openSearch = () => {
    document.getElementById("search-overlay").style.display = "block";
  };

  // eslint-disable-next-line
  const load = () => {
    setIsLoading(true);
    fetch().then(() => {
      // deal with data fetched
      setIsLoading(false);
    });
  };



  const [state, setState] = useState({
    email: "",
    city: "",
    name: "",
    description: "",
    number: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state,"y89oWDVTWRE");
  };  
  
  return (
    <div>
      <button
        type="button"
        id="openloaderModal"
        className="d-none border-0"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>
      <button
        type="button"
        id="closeloaderModal"
        className="d-none border-0"
        data-dismiss="modal"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered 'd-flex justify-content-center">
          <div className="d-flex justify-content-center">
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
          className="model_contact modal-xl modal-dialog-centered"
          isOpen={modal}
          toggle={toggle}
          {...args}
        >
      <div className='d-flex justify-content-center'>
        <div className="spinner-container">
      <div className="loading-spinner">
      </div>
        </div>
    </div>
        </Modal> */}

      {/* <header id="sticky" className="fixed-top"> */}
      <div className="header_section_ho">
      <header id="sticky" className={`sticky ${headerClass} header_border`}>
        {/* <div className="mobile-fix-option"></div> */}
        {/*Top Header Component*/}
        {noTopBar ? "" : <TopBarDark topClassName={topClass} />}

        <Container>
          <Row>
            <Col>
              <div className="main-menu">
                <div className="menu-left">
                  {/* <div className="navbar">
                    <a href={null} onClick={openNav}>
                      <div className="bar-style d-none">
                        <i
                          className="fa fa-bars sidebar-bar"
                          aria-hidden="true"
                        ></i>
                      </div>
                    </a>
                    <SideBar />
                  </div> */}
                  <div className="brand-logo">
                    <LogoImage logo={logoName} />
                  </div>
                </div>

                <div className="menu-right pull-right">
                  {/*Top Navigation Bar Component*/}
                  <NavBar sugCat={categoryList}  cartl={products} setPSearch={setPopularSearch} setbands={setBrandSug} setPoduct={setPro} setRes={setResult} />
                  <div>
                    {/* <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search  ">
                          <div>
                            <Media
                              src={search.src}
                              onClick={openSearch}
                              className="img-fluid"
                              alt=""
                            />
                            <i
                              className="fa fa-search"
                              onClick={openSearch}
                            ></i>
                          </div>
                        </li>
                        <Currency icon={settings.src} />
                        Header Cart Component
                        {direction === undefined ? (
                          // <></>
                          <CartContainer layout={direction} icon={cart.src} />
                        ) : (
                          
                          <Cart layout={direction} icon={cart.src} />
                        )}
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {router.asPath != "/" ? (
          <div className="new-nav d-xl-block d-none shadow-sm ">
            <Container>
              <Row>
                <div className="main-menu p-3">
                  <div className="menu-left">
                    <div className="bar-style d-flex justify-content-between align-items-center">
                      <div>
                        <i
                          className="fa fa-bars sidebar-bar pt-1 cursor-pointer"
                          aria-hidden="true" 
                          role="button"
                          onClick={()=> router.push('/Categories/categoryList')}
                        ></i>
                      </div>

                      <select
                        className="w-100 border-0 px-5 border-0 d-none"
                        onChange={(e) =>
                          router.push({
                            pathname:`/category/service/${e.target.value}`,
                            // query: { Category: e.target.value,searchList:'service'},
                          })
                        }
                      >
                        <option value="" disabled selected>
                          {t("Categories")}
                        </option>
                        {categoryList?.map((data, index) => (
                          <option value={data.category_slug} key={index}>
                            {data.category_name}
                          </option>
                        ))}
                      </select>

  
                    <div class="btn-group top_dowm ps-5 w-100">
                    <a  className="text-dark pe-4 d-flex align-items-center">
                    <span role="button" onClick={()=> router.push('/Categories/categoryList')} >{t("Categories")}</span>
                    </a>
                    <a type="button" class="fa fa-angle-down fw-bold text-dark ps-xl-5 pe-2" id="jhsdsjdhddsd" data-bs-toggle="dropdown" aria-expanded="false">
                      {/* <span class="visually-hidden">Toggle Dropdown</span> */}
                    </a>
                    <ul class="dropdown-menu">
                    {categoryList?.map((data, index) => (
                            <>
                              <li onClick={() =>
                                  router.push({
                                  pathname:`/category/service/${data.category_slug}`,
                                  // query: { Category: data.category_slug,searchList: 'service' },
                                 })
                              }>
                                <a
                                  className="dropdown-item cursor-pointer text-capitalize"
                                  key={index}
                                >
                                  {data.category_name}
                                </a>
                              </li>
                              <br />
                            </>
                          ))}
                    </ul>
                  </div>

                    </div>
                  </div>

                  <div className="sub-nav example  overflow-auto text-truncate ">
                    {/* <ul className="ps-4 header_custom_scroll "> */}
                    <ul className="px-4 ">
                      {categoryList?.slice(0, 7).map((data, index) => (
                        <li
                          className="px-2 cursor-pointer foot-cat text-capitalize"
                          key={index}
                          title={data.category_name}
                          onClick={() =>
                            router.push({
                              pathname:`/category/service/${data.category_slug}`,
                              // query: { Category: data.category_slug,searchList: 'service'},
                            })
                          }
                        >
                          {data.category_name.replace(/_/g, " ")}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="menu-right pull-right">
                    <ul>
                      <li title="post Your Requirement">
                        {userData ? (
                          <button
                            type="button"
                            className="btn_hover text-truncate px-4 p-1"
                            data-bs-toggle="modal"
                            data-bs-target="#postRequirment"
                            // disabled={userData ? false : true}
                            title="post Your Requirement"
                          >
                            {t("Post Your Requirement")}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn_hover text-truncate px-4 p-1"
                            // disabled={userData ? false : true}
                            onClick={() =>
                              document.getElementById("openLoginPopup")?.click()
                            }
                            title="post Your Requirement"
                          >
                            {t("Post Your Requirement")}
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </Row>
            </Container>
          </div>
        ) : (
          ""
        )}
      </header>
      </div>

      <SearchOverlay />

      <div
        className="modal fade post_top_model"
        id="postRequirment"
        tabIndex="-1"
        aria-labelledby="postRequirmentLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md mx-w-611">
          <div className="modal-content ">
            <div className="modal-header border-0 p-4 ">
              {/* <div className="mb-3">
                <img
                  src="/assets/images/icon/logo.png"
                  className="w-50"
                  onError={(e) =>
                    (e.currentTarget.src = "/assets/images/tatlub-img/no1.png")
                  }
                />
              </div> */}
              <div className="">
                <h3 className="modal-title" id="postRequirmentLabel">
                  <span className="text_theme">Post Your Requirement </span> llisting with India's top local search engine
                </h3>
                <p>Enter your details below</p>
              </div>
              <button
                type="button"
                className="btn-close btn_popup_clovghd"
                data-bs-dismiss="modal"
                aria-label="Close"
              ><i className="fa fa-times" aria-hidden="true"></i></button>
            </div>
            <div className="p-4 pt-0">




            <form className="d-none" onSubmit={handleSubmit}>
                <div className="row profile-edit">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("Name*")}</label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="name"
                      value={state.name}
                      onChange={handleInputChange}  
                      placeholder="Enter your Name" />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("Mobile Number")}</label>
                    <div className="d-flex justify-centent-center align-items-center">
                      <div className="input-group form-control d-flex justify-content-start">
                        <select className="fmr border-0"> <option>+974</option> </select>
                        <input 
                          type="text" 
                          className="form-mobile "
                          name="number"
                          value={state.number}
                          onChange={handleInputChange} 
                          aria-label="Text input with dropdown button " 
                          placeholder="Mobile Number"/>
                      </div>
                      {/* <button type="button" className="rounded bg-grey border-0 btn-hjgskpo mx-1 my-0 p-1" > + </button> */}
                    </div>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("Email Address*")}</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="email"
                      value={state.email}
                      onChange={handleInputChange}
                      placeholder="Enter your Email Address"/>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("City")}</label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="city"
                      value={state.city}
                      onChange={handleInputChange}  
                      placeholder="Enter your City"/>
                  </div>

                  <div className="mb-3 col-12">
                    <label className="form-label">{t("Description")}</label>
                    <textarea 
                       type="text" 
                       className="form-control" 
                       name="description"
                       value={state.description}
                       onChange={handleInputChange} 
                       placeholder="Type Your Description"/>
                  </div>

                  <div className="d-flex justify-content-center mt-2">
                    <button type="submit"className="btn px-5 fw-light rounded btn-notFount" > Submit </button>
                  </div>
                </div>
              </form>

              <form onSubmit={formik.handleSubmit}>
                <div className="row profile-edit">


                 {/* <div className="mb-3 col-md-6">
                    <label className="form-label">{t("Name*")}</label>
                    <input  type="text" className="form-control" placeholder="Enter your Name"/>
                  </div> */}


                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("Name*")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Name"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name &&
                      formik.errors.name && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert" className="text-danger">
                              {formik.errors.name}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("Mobile Number")}</label>
                    <div className="d-flex justify-centent-center align-items-center">
                      <div className="input-group form-control d-flex justify-content-start">
                        <select className="fmr border-0">
                          <option>+974</option>
                        </select>
                        <input
                          type="text"
                          className="form-mobile "
                          aria-label="Text input with dropdown button "
                          placeholder="Mobile Number"
                          {...formik.getFieldProps("mobile_number")}
                          maxLength={15}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "mobile_number",
                              e.target?.value.replace(/[^0-9]/g, "")
                            )
                          }
                        />
                      </div>
                      {/* <button
                        type="button"
                        className="rounded bg-grey border-0 btn-hjgskpo mx-1 my-0 p-1"
                      >
                        +
                      </button> */}
                    </div>
                    {formik.touched.mobile_number &&
                      formik.errors.mobile_number && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert" className="text-danger">
                              {formik.errors.mobile_number}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("Email Address*")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Email Address"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.email}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">{t("City")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your City"
                      {...formik.getFieldProps("city")}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.city}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <div className="mb-3 col-md-6">
                    <div className="row">
                      <label className="form-label">{t("First Name")}</label>
                      <div className="col-3 pe-0 fotn-jdh">
                        <select
                          className="form-select text-muted"
                          aria-label="Default select example"
                        >
                          <option selected className="text-muted">
                            Mr{" "}
                          </option>
                        </select>
                      </div>
                      <div className="col-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your First name"
                          {...formik.getFieldProps("first_name")}
                        />
                        {formik.touched.first_name &&
                          formik.errors.first_name && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.first_name}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="mb-3 col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Last Name"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.email}
                          </span>
                        </div>
                      </div>
                    )}
                  </div> */}

                    <div className="mb-3 col-12">
                    <label className="form-label">{t("Description")}</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Type Your Description"
                      {...formik.getFieldProps("description")}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert" className="text-danger">
                              {formik.errors.description}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>

                  {/* <div className="mb-3 col-md-6">
                    <label className="form-label">{t("Landline Number")}</label>
                    <div className="d-flex justify-centent-center align-items-center">
                      <div className="input-group form-control d-flex justify-content-start">
                        <select className="fmr">
                          <option>044</option>
                        </select>
                        <input
                          type="text"
                          className="form-mobile ms-2"
                          aria-label="Text input with dropdown button "
                          placeholder="Enter your Landline Number"
                          {...formik.getFieldProps("landline_number")}
                          maxLength={15}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "landline_number",
                              e.target?.value.replace(/[^0-9]/g, "")
                            )
                          }
                        />
                      </div>
                      <button
                        type="button"
                        className="rounded bg-grey border-0 btn-hjgskpo mx-1 p-1"
                      >
                        +
                      </button>
                    </div>
                    {formik.touched.landline_number &&
                      formik.errors.landline_number && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert" className="text-danger">
                              {formik.errors.landline_number}
                            </span>
                          </div>
                        </div>
                      )}
                  </div> */}
                  <div className="d-flex justify-content-center mt-2">
                    <button
                      type="submit"
                      className="btn px-5 fw-light rounded btn-notFount"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderOne;
