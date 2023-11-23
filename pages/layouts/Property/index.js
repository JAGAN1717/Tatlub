import React, { useState, useContext } from "react";
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row, Col, Button, AccordionItem, UncontrolledAccordion, AccordionHeader, AccordionBody } from "reactstrap";
import { Collapse } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import Link from "next/link";
import { getSearchList, getProperty } from '../../../components/core/realestate_request'
import { postQuotes } from "../../../components/core/seller_request";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
// import { useQuery } from 'react-query'
import { useEffect } from "react";
import moment from "moment/moment";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { ToastContainer, toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Seo from "../../../seo/seo";
import { useTranslation } from "react-i18next";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getCustomField } from "../../../components/core/shop_requests";



const property = () => {

  const { t } = useTranslation();

  const router = useRouter()
  const defaultPriceRange = [100000, 2000000];
  const defaultPriceRange1 = [100, 10000];

  const { searchKey, prop } = router.query
  const [property, setProperty] = useState([])
  const [propertyData, setPropertyData] = useState()
  const [itemsData, setItemsData] = useState([])
  const [itemData, setItemData] = useState([])
  const [Loading, setLoading] = useState(false)
  const [viewMorw, setViewmore] = useState(5)
  const [bhkid, setbhkid] = useState(false);
  const [item_id, setItem_id] = useState(null)
  const [priceRange, setPriceRange] = useState(defaultPriceRange)
  const [sqftRange, setsqftRange] = useState(defaultPriceRange1)
  const [searchedkey, setSearchedKey] = useState('')
  const [showContact, setSContact] = useState(true)

  const [getbhk, setBhk] = useState(["1BHK","2BHK","3BHK","4BHK","5BHK","6BHK"])
  //   { id: "1", value: "1BHK" },
  //   { id: "2", value: "2BHK" },
  //   { id: "3", value: "3BHK" },
  //   { id: "4", value: "4BHK" },
  //   { id: "5", value: "5BHK" },
  //   { id: "6", value: "6BHK" }
  // ])
  const [gettype, settype] = useState(["Apartments","Plots","Office Space"])
  //   { id: "1", value: "Apartments" },
  //   { id: "2", value: "Plots" },
  //   { id: "3", value: "Office Space" },

  // ])

  const openNav = () => {
    var openmyslide = document.getElementById("mySidenav");
    if (openmyslide) {
      openmyslide.classList.add("open-side");
    }
  };

  const openSetting = () => {
    if (process.browser) {
      document.getElementById("setting_box1").classList.add("open-setting");
      document.getElementById("setting-icon1").classList.add("open-icon");
    }
  };

  const closeSetting = () => {
    if (process.browser) {
      document.getElementById("setting_box1").classList.remove("open-setting");
      document.getElementById("setting-icon1").classList.remove("open-icon");
    }
  };

  useEffect(()=> {
    setSContact(Array(itemsData.length)?.fill(true))
  },[itemsData])

  const fetchSearchList = async () => {
    setLoading(true)
    getSearchList(searchKey).then(res => {
      // setProperty(res.data);
      let FilterData = []
      res.data?.map((data,i)=> {
        const arr = data.features ?? [] 
        const result = arr.filter( r => r.custom_field?.custom_field_name === "Select BHK" )  ?? []
        const result2 = arr.filter( r => r.custom_field?.custom_field_name === "Square Feet" )  ?? []
        const result3 = arr.filter( r => r.custom_field?.custom_field_name === "Property Type")  ?? []
        const BHK = result[result?.length-1 ?? 0]  
        const Sqft = result2[result2?.length-1 ?? 0]
        const type = result3[result3?.length-1 ?? 0] 
        FilterData.push({...data,bhk:BHK,sqft:Sqft,ptype:type})
      })
      setItemsData(FilterData)
      if (res.data?.length == 0) {
        router.push({
          pathname: "/NotFound/search",
          query: { search: searchKey, city: localStorage.getItem('city') },
        });
      }
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
      router.push({
        pathname: "/NotFound/search",
        query: { search: searchKey, city: localStorage.getItem('city') },
      });
    })
  }

  // const {isLoading:load,data:properties,error,refetch} = useQuery(
  //   ['properties'],
  //   () => getProperty()
  // )
 
  const fetchFilters = async() => {
    const responce = getCustomField(18).then(res => {
      const types =  res.data.find(e => e.custom_field_name == "Property Type") 
      const bhk =  res.data.find(e => e.custom_field_name == "Select BHK") 
      console.log('yyfyyyyyyyyy',types?.custom_field_seed_value?.split(','))
      settype(types?.custom_field_seed_value?.split(','))
      setBhk(bhk?.custom_field_seed_value?.split(','))
    }).catch(err => console.log('err',err.message)) 
  }


  const fetchProperty = () => { 
    setLoading(true)
    getProperty().then(res => {
      setProperty(prop == 'Recommended' ? res?.data?.recommended : prop == 'Popular' ? res?.data?.Popular : res?.data?.trending)
      setPropertyData(res?.data)
      const Pdata = prop == 'Recommended' ? res?.data?.recommended : prop == 'Popular' ? res?.data?.Popular : res?.data?.trending
      let FilterData = []
      Pdata?.map((data,i)=> {
        const arr = data.features ?? [] 
        const result = arr.filter( r => r.custom_field?.custom_field_name === "Select BHK" )  ?? []
        const result2 = arr.filter( r => r.custom_field?.custom_field_name === "Square Feet" )  ?? []
        const result3 = arr.filter( r => r.custom_field?.custom_field_name === "Property Type")  ?? []
        const BHK = result[result?.length-1 ?? 0]  
        const Sqft = result2[result2?.length-1 ?? 0]
        const type = result3[result3?.length-1 ?? 0] 
        FilterData.push({...data,bhk:BHK,sqft:Sqft,ptype:type})
      })
      setItemsData(FilterData)
      setItemData(FilterData)

      // let alldata = [] 
      // alldata.push(res?.data?.recommended,res?.data?.Popular,res?.data?.trending)
      // const result = alldata.reduceRight((accumulator, currentValue) =>
      //           accumulator.concat(currentValue),
      //         );
      // setItemsData(result)
      setLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setLoading(false)
    })
  }

  // console.log('sdwwdwddw',itemsData)
  
  // useEffect(()=> {
  //  let FilterData = []
  // property?.map((data,i)=> {
  //   const arr = data.features ?? [] 
  //   const result = arr.filter( r => r.custom_field?.custom_field_name === "Select BHK" )  ?? []
  //   const result2 = arr.filter( r => r.custom_field?.custom_field_name === "Square Feet" )  ?? []
  //   const result3 = arr.filter( r => r.custom_field?.custom_field_name === "Property Type")  ?? []
  //   const BHK = result[result?.length-1 ?? 0]  
  //   const Sqft = result2[result2?.length-1 ?? 0]
  //   const type = result3[result3?.length-1 ?? 0] 
  //   FilterData.push({...data,bhk:BHK,sqft:Sqft,ptype:type})
  // })
  // setItemsData(FilterData)
  // // console.log("shfdyugdsdk",FilterData)
  // },[property])

  const resetFilter = () => {
    // setProperty(prop == 'Recommended' ? propertyData?.recommended : prop == 'Popular' ? propertyData?.Popular : propertyData?.trending)
    setItemsData(itemData)
    setSearchedKey('')
    setbhkid('')
    setPriceRange(defaultPriceRange)
  }


   useEffect(()=> {
    let searchData = [];

    if (searchedkey == "") {
      // setProperty(prop == 'Recommended' ? propertyData?.recommended : prop == 'Popular' ? propertyData?.Popular : propertyData?.trending);
       setItemsData(itemData);
    }

    if (searchedkey) {
      itemData.map((data, i) => {
        if (
          data?.item_title
            .toLowerCase()
            .includes(searchedkey.toLowerCase())
        ) {
          searchData.push(data);
        }
      });
      // setProperty(searchData);
      setItemsData(searchData);
    }
   },[searchedkey])


  useEffect(() => {
    prop && fetchProperty()
    // setLoading(load)
    // prop && setProperty( prop == 'recommended'? properties?.data?.recommended : prop == 'popular'? properties?.data?.popular : properties?.data?.trending )
    fetchFilters()
  }, [prop])

  useEffect(() => {
    searchKey && fetchSearchList()
  }, [searchKey])

  // console.log('kgjhgfgg', property)

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
    item_lead_phone: Yup.string().required("Enter your Mobile Number").min(7, "Phone number must be at least 7 Digits"),
    item_lead_message: Yup.string(),
  });


  const formik = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {
        const body = {
          item_id: item_id,
          item_lead_name: values.item_lead_name,
          item_lead_email: values.item_lead_email,
          item_lead_phone: values.item_lead_phone,
          item_lead_message: values.item_lead_message,
        };
        document.getElementById("openloaderModal")?.click();
        const response = await postQuotes(body);
        document.getElementById("closeloaderModal")?.click();
        if (response.status == 200) {
          document.getElementById("closeQuotesmodal")?.click();
          toast.info("SAVE SUCCESSFULL", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: false,
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
      } catch (error) {
        document.getElementById("closeloaderModal")?.click();
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
    },
  });


  const context = useContext(FilterContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const setSelectedCategory = context.setSelectedCategory;
  const [url, setUrl] = useState();


  const [isOpen, setIsOpen] = useState(false);
  const toggle1 = () => setIsOpen(!isOpen);
  const setSelected = context.setSelected;

  const [isCategoryOpen1, setIsCategoryOpen1] = useState(false);
  const toggleCategory1 = () => setIsCategoryOpen1(!isCategoryOpen1);
  const setSelectedCategory1 = context.setSelectedCategory1;

  const [isCategoryOpen2, setIsCategoryOpen2] = useState(false);
  const toggleCategory2 = () => setIsCategoryOpen2(!isCategoryOpen2);
  const setSelectedCategory2 = context.setSelectedCategory2;


  const [isCategoryOpen3, setIsCategoryOpen3] = useState(false);
  const toggleCategory3 = () => setIsCategoryOpen3(!isCategoryOpen3);
  const setSelectedCategory3 = context.setSelectedCategory3;

  const [isCategoryOpen4, setIsCategoryOpen4] = useState(false);
  const toggleCategory4 = () => setIsCategoryOpen4(!isCategoryOpen4);
  const setSelectedCategory4 = context.setSelectedCategory4;


  const updateCategory = (category) => {
    setSelectedCategory(category);
  };

  const todoClicked = (e) => {
     
    // setBhk((e)=> [...e,!getbhk.find(v => v.id == e.id)?.selected])
    const data = itemData.filter(v => v?.bhk?.item_feature_value == e) 
    setItemsData(data ?? itemData )
    setbhkid(e)
    // if (!e.selected) {
    //   const selectedCount = getbhk.filter((todo) => todo.selected).length;
    //   if (selectedCount === 1) {
    //     return;
    //   }
    // }

    // setBhk(
    //   getbhk.map((todo) =>
    //     todo.id === e.id
    //       ? { ...todo, selected: !todo.selected }
    //       : todo
    //   )
    // );
  };
 
  const handleTypefilter = (e) => {
    const data = itemData.filter(v => v?.ptype?.item_feature_value == e) 
    setItemsData(data ?? itemData )
    setbhkid(e)
  } 

  const handlepricefilter = (e) => {
    const filteredData = itemData.filter(item => item.price >= e[0] && item.price <= e[1]);
    setItemsData(filteredData ?? itemData )
    setPriceRange(e)
  }




  return (
    <CommonLayout>

      <Seo title={`${prop ?? searchKey}`} />
      <Container>


        {/* <div className="navbar d-lg-none d-block">
          <a href={null} onClick={openNav}>
            <div className="bar-style ">
              <i className="fa fa-filter text-color fs-25" aria-hidden="true" ></i>
            </div>
          </a>
        </div> */}





        <Row className="my-3">
          <Col xl="3" lg="4 d-lg-block d-none">
            <div className=" h-100 me-xl-3 ">
              <div className="recommend_theme_propery ">
                <div className="d-flex justify-content-between mb-3"><p className="fw-600">Filter</p> <p className="theme_color cursor-pointer" onClick={()=>resetFilter()}>Clear All</p> </div>

                <div className="d-none">
                  <div className="d-flex">
                    <div className="cancek_custom">Mumabi <div className="bg_design-cancel"><i className="fa fa-times" aria-hidden="true"></i></div> </div>
                    <div className="cancek_custom">T Nagar <div className="bg_design-cancel"><i className="fa fa-times" aria-hidden="true"></i></div> </div>
                  </div>
                </div>
                {/* <hr></hr> */}

                <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory}>
                    Search villa & Plots
                  </h3>
                  <Collapse isOpen={isCategoryOpen}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <div className="sbvs">
                          <div className="search">
                            <span className="fa fa-search"></span>
                            <input type="text" placeholder={t("Search villa & plots")} value={searchedkey}  onChange={(e)=>setSearchedKey(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>

                <hr></hr>
                <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen2 ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory2}>
                    Price
                  </h3>
                  <Collapse isOpen={isCategoryOpen2}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <Slider
                          allowCross={false}
                          range
                          min={100000}
                          max={2000000}
                          step={50000}
                          //@ts-ignore
                          defaultValue={priceRange}
                          //@ts-ignore
                          value={priceRange}
                          ariaLabelForHandle={priceRange}
                          onChange={(value) =>{ handlepricefilter(value) }}
                        />
                        <div className="d-flex justify-content-between mt-2 mb-2">
                          <span>Min : {priceRange[0]}</span>
                          <span>Max : {priceRange[1]}</span>
                        </div>
                         {/* <input type="number" id="quantity" name="quantity" min="0" step="1"></input> */}
                      </div>
                    </div>
                  </Collapse>
                </div>

                <hr></hr>

                <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen4 ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory4}>
                    No. of Bedrooms
                  </h3>
                  <Collapse isOpen={isCategoryOpen4}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <Row className="px-2">
                          {
                            getbhk?.map((bhk,i)=> (
                              <Col xs="6" md="4" xl="3 px-1" onClick={()=> todoClicked(bhk)}  key={i}><div className={ bhkid == bhk ? 'selected no-of-bed2 cursor-pointer' : "no-of-bed cursor-pointer"} >{bhk}</div></Col>
                            ))
                          }
                        </Row>
                      </div>
                    </div>
                  </Collapse>
                </div>

                <hr></hr>

                <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen3 ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory3}>
                    Area Sq.ft
                  </h3>
                  <Collapse isOpen={isCategoryOpen3}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                      <Slider
                          allowCross={false}
                          range
                          min={100}
                          max={10000}
                          //@ts-ignore
                          defaultValue={sqftRange}
                          //@ts-ignore
                          // value={state}
                          ariaLabelForHandle={sqftRange}
                          onChange={(value) =>{ console.log("value",value); setsqftRange(value) }}
                        />
                        <div className="d-flex justify-content-between mt-2 mb-2">
                          <span>Min : {sqftRange[0]}</span>
                          <span>Max : {sqftRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>

                <hr></hr>

                {/* <div className="collection-collapse-block open">
                  <h3 className={isOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggle1}>
                    Property Type
                  </h3>
                  <Collapse isOpen={isOpen}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <p className="pt-3">Residential</p>
                        <ul>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Apartments
                            </label>
                          </li>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Builder Floor
                            </label>
                          </li>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              House/Villa
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Penthouse
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Farmhouse
                            </label>
                          </li>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Plot
                            </label>
                          </li>

                        </ul>
                        <p>Commercial</p>
                        <ul>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Office Space
                            </label>
                          </li>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Shop/Showroom
                            </label>
                          </li>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Land
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Warehouse/Godown
                            </label>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </Collapse>
                </div>
                <hr></hr> */}


                <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen1 ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory1}>
                    Property Type
                  </h3>
                  <Collapse isOpen={isCategoryOpen1}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <ul>
                          {
                            gettype?.map((data,index)=>(
                              <li className="w-100 mb-3" key={index}>
                                <div className="form-check">
                                <input
                                  className="form-check-input"
                                  name={`flexCheckDefault${index}`}
                                  type="checkbox"
                                  value=""
                                  checked={bhkid == data ? true : false }
                                  id={`flexCheckDefault4343${index}`}
                                  onChange={()=>handleTypefilter(data)}
                                />
                                <label
                                  className="form-check-label fw-600 text-capitalize complete_1 cursor-pointer foot-cat" for={`flexCheckDefault4343${index}`} 
                                >
                                 {data}
                                </label>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </Collapse>
                </div>

                {/* <hr></hr> */}
                {/* <div className="d-flex justify-content-between ">
                  <p className="mb-0 fs-5">RERA Compliant Property</p>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  </div>
                </div>

                <hr></hr> */}
                {/* <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory}>
                    Images & Vedios
                  </h3>
                  <Collapse isOpen={isCategoryOpen}>
                    <div className="collection-collapse-block-content">
                      <div className="d-flex">
                        <Button className="btn-imgages me-3">Images</Button>
                        <Button className="btn-imgages">Vedios</Button>
                      </div>
                    </div>
                  </Collapse>
                </div> */}

              </div>


              <div className="recommend_theme_propery mt-3 d-none">
                <h5 className="mb-3">Popular Areas</h5>
                <ul>
                  <li className="mb-3">Projects for sale in Thane West</li>
                  <li className="mb-3">Projects for sale in Vashi</li>
                  <li className="mb-3">Projects for sale in Borivali West</li>
                  <li className="mb-3">Projects for sale in Andheri West</li>
                  <li className="mb-3">Projects for sale in Andheri East</li>
                  <li className="mb-3">Projects for sale in Malad West</li>
                  <li className="mb-3">Projects for sale in Mira Road East</li>
                  <li className="mb-3">Projects for sale in Kalyan</li>
                  <li className="mb-3">Projects for sale in Ashok Nagar</li>
                  <li className="mb-3">Projects for sale in Anna Nagar</li>
                  <div className=""><a className="text-color">See All <i className="fa fa-angle-right" aria-hidden="true"></i></a></div>
                </ul>
              </div>
              
            </div>
          </Col>
          <Col xl="9" lg="8">
            {/* <ul className="breadcrumb">
                            <li><a href="#">Home</a> <i className="fa fa-angle-right" aria-hidden="true"></i></li>
                            <li><a href="#">Real Estate</a> <i className="fa fa-angle-right" aria-hidden="true"></i></li>
                            <li><a href="#">New Projects In T Nagar, Mumbai</a></li>
                        </ul>
                        <h5>200+ Projects For Sale In T Nagar, Mumbai</h5> */}

            {
              Loading ?
                <div className="my-3">
                  <div className="loader-wrapper2 rounded-4">
                    {url === "Christmas" ? (
                      <div id="preloader"></div>
                    ) : (
                      <div className="loader"></div>
                    )}
                  </div>
                </div> : <>
                  {
                    itemsData?.length > 0 ?
                    itemsData?.slice(0, viewMorw).map((data, index) => {
                      // const arr = data.features ?? [] 
                      // const result = arr.filter( r => r.custom_field?.custom_field_name === "Select BHK" )  ?? []
                      // const result2 = arr.filter( r => r.custom_field?.custom_field_name === "Square Feet" )  ?? []
                      // const result3 = arr.filter( r => r.custom_field?.custom_field_name === "Property Type")  ?? []
                      // const BHK = result[result?.length-1 ?? 0]  
                      // const Sqft = result2[result2?.length-1 ?? 0]
                      // const type = result3[result3?.length-1 ?? 0]  
                      // console.log("hgsdusgdwdk",BHK)

                      return(
                        <div className="recommend_theme_propery my-3" key={index}>
                        <div className="profile-left">
                          <Row>
                            <Col xl="4">
                              <div className="profile-image">
                                <img className="property_img cusor-pointer" src={data?.item_image_medium}
                                  onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")}
                                  onClick={() => router.push({ pathname: '/layouts/Propertydetail', query: { 'property_id': data?.id } })}
                                />
                              </div>
                            </Col>
                            <Col xl="8">
                              <div className='d-flex flex-column justify-content-between h-100'>
                                <div className="mb-3">
                                  <div className="d-md-flex mt-2 justify-content-between mb-2">
                                    <div className="">
                                      <h5 className="text-color cursor-pointer">{data?.price != null && t("QAR") + " " + data?.price}</h5>
                                      <Link href={{ pathname: '/layouts/Propertydetail', query: { 'property_id': data?.id } }}>
                                        <a><h5 className="text-capitalize foot-cat">{t(data?.item_title)}</h5></a>
                                      </Link>
                                      <p>{data?.item_location_str}</p>
                                    </div>
                                    <div className="d-flex profile-share_mobile mb-md-0 mb-3">
                                      {/* <div><div className="like_profile me-2"><img className="icon_ls" src="/assets/images/tatlub-img/icon-2.png" /></div></div> */}
                                      <div> <div className="share_profile me-2"
                                        role="button"
                                        data-bs-toggle="modal"
                                        data-bs-target={"#delete_confirm_popup12212"}
                                      ><img className="icon_ls" src="/assets/images/tatlub-img/icon-3.png" /></div></div>
                                    </div>
                                  </div>

                                  <Row>
                                    <Col sm="4 mb-sm-0 mb-2"> <div className=" bg_builder_horm"><img className="me-2 company_property_icon" src="/assets/images/icons-new/10.png" /><div ><h6>{data?.bhk?.item_feature_value ?? "unknown" } Apartments</h6><p>Building</p></div></div></Col>
                                    <Col sm="4 mb-sm-0 mb-2"> <div className=" bg_builder_horm"><img className="me-2 company_property_icon" src="/assets/images/icons-new/11.png" /><div ><h6>{data?.sqft?.item_feature_value ?? "unknown"} Sq.Ft</h6><p>Built-Up Area</p></div></div></Col>
                                    <Col sm="4 mb-sm-0 mb-2"> <div className=" bg_builder_horm"><img className="me-2 company_property_icon" src="/assets/images/icons-new/12.png" /><div ><h6>{data?.ptype?.item_feature_value ?? "unknown"} Property</h6><p>Property type</p></div></div></Col>
                                  </Row>
                                </div>


                                <div className="d-md-flex justify-content-between">
                                  {
                                    data?.rating ?
                                      <div>
                                        <h6>Review</h6>
                                        <div className="d-flex ">
                                          {/* <img className="me-1 star-property_icon1" src="/assets/images/company/4.png" />
                                              <img className="me-1 star-property_icon1" src="/assets/images/company/4.png" />
                                              <img className="me-1 star-property_icon1" src="/assets/images/company/4.png" />
                                              <img className="me-1 star-property_icon1" src="/assets/images/company/44.png" />
                                              <img className="me-1 star-property_icon1" src="/assets/images/company/44.png" /> */}
                                          <Stack spacing={1}>
                                            <Rating
                                              name="size-large star_rate"
                                              value={data?.rating}
                                              // onChange={(e) =>
                                              //   setRating(e.target.value)
                                              // }
                                              readOnly={true}
                                              defaultValue={1}
                                              size="small"
                                            />
                                          </Stack>
                                          <span className="ms-2">{data?.rating + ' Rating'}</span>
                                        </div>
                                      </div> : ""
                                  }
                                  <div className="d-flex">
                                    {
                                      showContact[index] ? 
                                      <Button className="btn  d-flex align-items-center justify-content-center get_seal_btn me-2 mt-3" 
                                      onClick={()=> {setSContact((pre)=> {
                                        const old  = [...pre];
                                        old[index] = false 
                                        return old
                                      })}}
                                      >
                                        <i class="fa fa-phone fs-5  me-1 mb-0 pb-0" aria-hidden="true"></i>
                                        {/* {data?.item_phone ?? data?.user?.phone ?? 'Call Now'} */}
                                        {t("Show Number")}
                                        </Button>
                                        : 
                                     <a href={"tel:" + data?.item_phone ?? data?.user?.phone}>
                                     <Button className="btn  d-flex align-items-center justify-content-center get_seal_btn me-2 mt-3">
                                       <i class="fa fa-phone fs-5  me-2 mb-0 pb-0" aria-hidden="true"></i>
                                       {data?.item_phone ?? data?.user?.phone ?? 'Call Now'}
                                       </Button>
                                   </a> 
                                    }
                                    <Button type="button" data-bs-toggle="modal" data-bs-target="#QuateModal" className="btn get_seal_btn mt-3" onClick={() => setItem_id(data?.id)}>{t('Get Best Deal')}</Button></div>
                                </div>
                              </div>
                            </Col>

                          </Row>
                        </div>
                      </div>
                      )
                    }) : 
                    <div className="card empty-wishlist shadow-sm p-4">       
                    <div className="text-center">
                        <img src="/assets/images/tatlub-img/not_Found.png"  className=""/>
                        <h3 className="text-center">{t("DATA NOT FOUND")}</h3>
                    </div>
                </div>
                  }
                </>
            }



            {/* <div className="recommend_theme_propery my-3">
                            <div className="profile-left">
                                <Row>
                                    <Col xl="4">
                                        <div className="profile-image">
                                            <img className="property_img" src="/assets/images/company-6/property-8.jpg" />
                                        </div>
                                    </Col>
                                    <Col xl="8">
                                        <div className="">
                                            <div className="d-md-flex mt-2 justify-content-between">
                                                <div className="">
                                                    <h5 className="text-color">{t("QAR")} 2.25 Cr-3.72 Cr</h5>
                                                    <a href="/layouts/Propertydetail"><h5>The Views By Adani Realty</h5></a>
                                                    <p>2,3 BHK Apartments, Ghatkopar East, Mumbai</p>
                                                </div>
                                                <div className="d-flex profile-share_mobile mb-md-0 mb-3">
                                                    <div><div className="like_profile me-2"><img className="icon_ls" src="/assets/images/tatlub-img/icon-2.png" /></div></div>
                                                    <div> <div className="share_profile me-2"><img className="icon_ls" src="/assets/images/tatlub-img/icon-3.png" /></div></div>
                                                </div>
                                            </div>

                                            <Row>
                                                <Col sm="4 mb-sm-0 mb-2"> <div className=" bg_builder_horm"><img className="me-2 company_property_icon" src="/assets/images/icons-new/10.png" /><div ><h6>2,3 BHK Apartments</h6><p>Building</p></div></div></Col>
                                                <Col sm="4 mb-sm-0 mb-2"> <div className=" bg_builder_horm"><img className="me-2 company_property_icon" src="/assets/images/icons-new/11.png" /><div ><h6>634-1,022 Sq.Ft</h6><p>Built-Up Area</p></div></div></Col>
                                                <Col sm="4 mb-sm-0 mb-2"> <div className=" bg_builder_horm"><img className="me-2 company_property_icon" src="/assets/images/icons-new/12.png" /><div ><h6>Under Construction</h6><p>Possession</p></div></div></Col>
                                            </Row>


                                        </div>


                                        <div className="d-md-flex justify-content-between mt-3">
                                            <div>
                                                <h6>Review</h6>
                                                <div className="d-flex ">
                                                    <img className="me-1 star-property_icon1" src="/assets/images/company/4.png" />
                                                    <img className="me-1 star-property_icon1" src="/assets/images/company/4.png" />
                                                    <img className="me-1 star-property_icon1" src="/assets/images/company/4.png" />
                                                    <img className="me-1 star-property_icon1" src="/assets/images/company/44.png" />
                                                    <img className="me-1 star-property_icon1" src="/assets/images/company/44.png" />
                                                    <span>3.5 Rating</span>
                                                </div>
                                            </div>
                                            <div className="d-flex"> <Button className="btn contact_now_btn me-2 mt-3">Contact Now</Button><Button className="btn get_seal_btn mt-3">Get Best Deal</Button></div>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </div> */}

            {
              itemsData?.length > 5 && viewMorw != itemsData?.length &&
              <div className="text-center text-capitalize"><button onClick={() => setViewmore(itemsData?.length)} className="btn btn_viwemore mb-3 ">{t('view More')}</button></div>
            }



          </Col>
        </Row>

        {/* share  popup*/}
        {/* <div
          className="modal fade"
          id={"delete_confirm_popup"}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h3>Share With Friends</h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-3 pb-4 pt-4 ">
                <div className="d-flex justify-content-between">
                  <div
                    className="text-center"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <FacebookShareButton
                      url={'/layouts/Propertydetail?property_id='}
                    >
                      <div
                        className={
                          "vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center Facebook_xl"
                        }
                      >
                        <i className="fa fa-facebook"></i>
                      </div>
                      Facebook
                    </FacebookShareButton>
                  </div>
                  <div
                    className="text-center"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <WhatsappShareButton
                      url={'/layouts/Propertydetail?property_id='}
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
                      Whatsapp
                    </WhatsappShareButton>
                  </div>

                  <div
                    className="text-center position-relative"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <div
                      className={
                        "vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center copy_link_xl"
                      }
                      onClick={() => {
                        navigator.clipboard.writeText(
                          '/layouts/Propertydetail?property_id='
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
                    Copy Link
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* get price */}
        <div
          className="modal fade"
          id="QuateModal"
          tabIndex="-1"
          aria-labelledby="QuateModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content position-relative ">
              <div className="pt-4 px-4">
                <div className="text-center">
                  <div className="mb-2">
                    <img
                      src="/assets/images/icon/logo.png"
                      className="w-25"
                    />
                  </div>
                  {/* <h3>Get Quote</h3> */}
                  <p className="text-muted">
                    To get please fill out the form below, we will get back to
                    you in 24 hours when you get your request.Thank for you
                    Being
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
                              <span role="alert" className="text-danger">
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
                              <span role="alert" className="text-danger">
                                {formik.errors.item_lead_email}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                    <div className="mb-3 col-12">
                      <label className="form-lable">Mobile Number</label>
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
                              <span role="alert" className="text-danger">
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
                              <span role="alert" className="text-danger">
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
                      className="btn btn-theme rounded fw-light w-50"
                    >
                      Post Quote
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>


      <div>
        <a href={null} onClick={() => openSetting()}>
          <div className="setting-sidebar1 d-lg-none " id="setting-icon1">
            <div>
              <i className="fa fa-filter" aria-hidden="true"></i>
            </div>
          </div>
        </a>

        <div id="setting_box1" className="setting-box1 d-lg-none">
          <div className="setting_box_body">
            <div onClick={() => closeSetting()}>
              <div className="sidebar-back text-start">
                <i className="fa fa-angle-left pe-2" aria-hidden="true"></i>{" "}
                {t("Back")}
              </div>
            </div>
            <div className="setting-body">
              {/* <CategoryType /> */}
              <div className=" h-100 me-xl-3 ">
              <div>
            <div className=" h-100 me-xl-3 ">
              <div className="recommend_theme_propery shadow-none mt-3">
                <div className="d-flex justify-content-between mb-3"><p className="fw-600">Filter</p> <p className="theme_color cursor-pointer" onClick={()=>resetFilter()}>Clear All</p> </div>

                <div className="d-none">
                  <div className="d-flex">
                    <div className="cancek_custom">Mumabi <div className="bg_design-cancel"><i className="fa fa-times" aria-hidden="true"></i></div> </div>
                    <div className="cancek_custom">T Nagar <div className="bg_design-cancel"><i className="fa fa-times" aria-hidden="true"></i></div> </div>
                  </div>
                </div>
                {/* <hr></hr> */}

                <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory}>
                    Search villa & Plots
                  </h3>
                  <Collapse isOpen={isCategoryOpen}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <div className="sbvs">
                          <div className="search">
                            <span className="fa fa-search"></span>
                            <input type="text" placeholder={t("Search villa & plots")} value={searchedkey}  onChange={(e)=>setSearchedKey(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>

                <hr></hr>
                <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen2 ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory2}>
                    Price
                  </h3>
                  <Collapse isOpen={isCategoryOpen2}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <Slider
                          allowCross={false}
                          range
                          min={100000}
                          max={2000000}
                          step={50000}
                          //@ts-ignore
                          defaultValue={priceRange}
                          //@ts-ignore
                          value={priceRange}
                          ariaLabelForHandle={priceRange}
                          onChange={(value) =>{ handlepricefilter(value) }}
                        />
                        <div className="d-flex justify-content-between mt-2 mb-2">
                          <span>Min : {priceRange[0]}</span>
                          <span>Max : {priceRange[1]}</span>
                        </div>
                         {/* <input type="number" id="quantity" name="quantity" min="0" step="1"></input> */}
                      </div>
                    </div>
                  </Collapse>
                </div>

                <hr></hr>

                <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen4 ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory4}>
                    No. of Bedrooms
                  </h3>
                  <Collapse isOpen={isCategoryOpen4}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <Row className="px-2">
                          {
                            getbhk?.map((bhk,i)=> (
                              <Col xs="6" md="4" xl="3 px-1" onClick={()=> todoClicked(bhk)}  key={i}><div className={ bhkid == bhk ? 'selected no-of-bed2 cursor-pointer' : "no-of-bed cursor-pointer"} >{bhk}</div></Col>
                            ))
                          }
                        </Row>
                      </div>
                    </div>
                  </Collapse>
                </div>

                <hr></hr>

                <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen3 ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory3}>
                    Area Sq.ft
                  </h3>
                  <Collapse isOpen={isCategoryOpen3}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                      <Slider
                          allowCross={false}
                          range
                          min={100}
                          max={10000}
                          //@ts-ignore
                          defaultValue={sqftRange}
                          //@ts-ignore
                          // value={state}
                          ariaLabelForHandle={sqftRange}
                          onChange={(value) =>{ console.log("value",value); setsqftRange(value) }}
                        />
                        <div className="d-flex justify-content-between mt-2 mb-2">
                          <span>Min : {sqftRange[0]}</span>
                          <span>Max : {sqftRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>

                <hr></hr>

                {/* <div className="collection-collapse-block open">
                  <h3 className={isOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggle1}>
                    Property Type
                  </h3>
                  <Collapse isOpen={isOpen}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <p className="pt-3">Residential</p>
                        <ul>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Apartments
                            </label>
                          </li>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Builder Floor
                            </label>
                          </li>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              House/Villa
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Penthouse
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Farmhouse
                            </label>
                          </li>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Plot
                            </label>
                          </li>

                        </ul>
                        <p>Commercial</p>
                        <ul>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Office Space
                            </label>
                          </li>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Shop/Showroom
                            </label>
                          </li>
                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Land
                            </label>
                          </li>

                          <li className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                            >
                              Warehouse/Godown
                            </label>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </Collapse>
                </div>
                <hr></hr> */}


                <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen1 ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory1}>
                    Property Type
                  </h3>
                  <Collapse isOpen={isCategoryOpen1}>
                    <div className="collection-collapse-block-content">
                      <div className="collection-brand-filter">
                        <ul>
                          {
                            gettype?.map((data,index)=>(
                              <li className="w-100 mb-3" key={index}>
                                <div className="form-check">
                                <input
                                  className="form-check-input"
                                  name={`flexCheckDefault${index}`}
                                  type="checkbox"
                                  value=""
                                  checked={bhkid == data ? true : false }
                                  id={`flexCheckDefault4343${index}`}
                                  onChange={()=>handleTypefilter(data)}
                                />
                                <label
                                  className="form-check-label fw-600 text-capitalize complete_1 cursor-pointer foot-cat" for={`flexCheckDefault4343${index}`} 
                                >
                                 {data}
                                </label>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </Collapse>
                </div>

                {/* <hr></hr> */}
                {/* <div className="d-flex justify-content-between ">
                  <p className="mb-0 fs-5">RERA Compliant Property</p>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  </div>
                </div>

                <hr></hr> */}
                {/* <div className="collection-collapse-block open">
                  <h3 className={isCategoryOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory}>
                    Images & Vedios
                  </h3>
                  <Collapse isOpen={isCategoryOpen}>
                    <div className="collection-collapse-block-content">
                      <div className="d-flex">
                        <Button className="btn-imgages me-3">Images</Button>
                        <Button className="btn-imgages">Vedios</Button>
                      </div>
                    </div>
                  </Collapse>
                </div> */}

              </div>


              <div className="recommend_theme_propery mt-3 d-none">
                <h5 className="mb-3">Popular Areas</h5>
                <ul>
                  <li className="mb-3">Projects for sale in Thane West</li>
                  <li className="mb-3">Projects for sale in Vashi</li>
                  <li className="mb-3">Projects for sale in Borivali West</li>
                  <li className="mb-3">Projects for sale in Andheri West</li>
                  <li className="mb-3">Projects for sale in Andheri East</li>
                  <li className="mb-3">Projects for sale in Malad West</li>
                  <li className="mb-3">Projects for sale in Mira Road East</li>
                  <li className="mb-3">Projects for sale in Kalyan</li>
                  <li className="mb-3">Projects for sale in Ashok Nagar</li>
                  <li className="mb-3">Projects for sale in Anna Nagar</li>
                  <div className=""><a className="text-color">See All <i className="fa fa-angle-right" aria-hidden="true"></i></a></div>
                </ul>
              </div>
              
            </div>
               </div>


                <div className="recommend_theme_propery shadow-none mt-3 d-none">
                  <h5 className="mb-3">Popular Areas</h5>
                  <ul>
                    <li className="mb-3">Projects for sale in Thane West</li>
                    <li className="mb-3">Projects for sale in Vashi</li>
                    <li className="mb-3">Projects for sale in Borivali West</li>
                    <li className="mb-3">Projects for sale in Andheri West</li>
                    <li className="mb-3">Projects for sale in Andheri East</li>
                    <li className="mb-3">Projects for sale in Malad West</li>
                    <li className="mb-3">Projects for sale in Mira Road East</li>
                    <li className="mb-3">Projects for sale in Kalyan</li>
                    <li className="mb-3">Projects for sale in Ashok Nagar</li>
                    <li className="mb-3">Projects for sale in Anna Nagar</li>
                    <div className=""><a className="text-color">See All <i className="fa fa-angle-right" aria-hidden="true"></i></a></div>
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default property;
