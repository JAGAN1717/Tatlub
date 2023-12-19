import React, { useState, createContext, useEffect, lazy, Suspense } from "react";
// import Banner from "./layouts/Fashion/Components/Banner";
const Banner = lazy(() => import("./layouts/Fashion/Components/Banner"))
// import CollectionBanner from "./layouts/Fashion/Components/Collection-Banner";
const CollectionBanner = lazy(() => import("./layouts/Fashion/Components/Collection-Banner"))
// import TopCollection from "../components/common/Collections/Collection3";
// const TopCollection = lazy(()=> import("../components/common/Collections/Collection3"));
// import Parallax from "./layouts/Fashion/Components/Parallax";
const Parallax = lazy(() => import("./layouts/Fashion/Components/Parallax"));
// import SpecialProducts from "../components/common/Collections/TabCollection1";
// const SpecialProducts = lazy(() => import("../components/common/Collections/TabCollection1"));
// import ServiceLayout from "../components/common/Service/service1";
const ServiceLayout = lazy(() => import("../components/common/Service/service1"));
// import Blog from "../components/common/Blog/blog1";
// const Blog = lazy(() => import("../components/common/Blog/blog1"));
// import Instagram from "../components/common/instagram/instagram1";
// const Instagram = lazy(() => import("../components/common/instagram/instagram1"));
// import LogoBlock from "../components/common/logo-block";
// import HeaderOne from "../components/headers/header-one";
const HeaderOne = lazy(() => import("../components/headers/header-one"));
import { Product4 } from "../services/script";
// import Paragraph from "../components/common/Paragraph";
// import ModalComponent from "../components/common/Modal";
import Helmet from "react-helmet";
// import MasterFooter from "../components/footers/common/MasterFooter";
const MasterFooter = lazy(() => import("../components/footers/common/MasterFooter"));
import axios from "axios";
// require('dotenv').config()
// import initialProvider fro../initialvalueContextex';
import { getBrand, getBanners, getCategory, getSection, getPopular, getRecommended, getTrendingProperty, getRecommendedProperty, getSocialmedia, getCustomerVideo, getSubcategory, getMainCategory } from "../components/core/fashion_request";
import { getLanguages } from "../components/core/account_request";


export const testcontex = createContext(null)

const Fashion = () => {

  const [category, setcategory] = useState([]);
  const [popperSearch, setPopularSearch] = useState([])
  const [brand, setbrand] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState();
  const [BannerSection, setBannersection] = useState([]);
  const [popular, setPopular] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [trending, setTrending] = useState([])
  const [Recommended, setrecommended] = useState([])
  const [soacial, setSocial] = useState([])
  const [videoList, setVideoList] = useState([])
  const [subCategory, setSubcategory] = useState([])
  const [mainCategories, setMainCategories] = useState([])
  const [result, setResult] = useState([]);
  const [product, setPro] = useState([]);
  const [brandSug, setBrandSug] = useState([]);



  const fetchTrending = async () => {
    try {
      const response = await getTrendingProperty();
      setTrending(response.data)
    } catch (error) {
      console.error('err', error.message)
    }
  }

  const fectLanguages = async () => {
    const responce = await getLanguages();
    sessionStorage.setItem("lang", JSON.stringify(responce.data));
    sessionStorage.setItem("slectLang", "en");
    localStorage.setItem("lang", JSON.stringify(responce.data));
    // localStorage.setItem("slectLang",'en');
    // window.location.reload()
  };


  const fetchMainCategories = async () => {
    try {
      const response = await getMainCategory();
      setMainCategories(response.data)
    } catch (error) {
      console.error('err', error.message)
    }
  }

  const fetchSubCategory = async () => {
    try {
      const response = await getSubcategory();
      //  setSubcategory(response.data)

      const categoryList = {}
      response.data?.forEach(res => {
        if (!categoryList[res.parent_category_name]) {
          categoryList[res.parent_category_name] = [];
        }

        if (res.category_id === null) {
          categoryList[res.parent_category_name] = [];
        }
        categoryList[res.parent_category_name].push(res);
      })

      setSubcategory(categoryList)
    } catch (error) {
      console.error('err', error.message)
    }
  }

  const fetchSocialMedia = async () => {
    try {
      const response = await getSocialmedia();
      setSocial(response.data)
    } catch (error) {
      console.error('err', error.message)
    }
  }

  const fetchRecommended = async () => {
    try {
      const response = await getRecommendedProperty();
      setrecommended(response.data)
    } catch (error) {
      console.error('err', error.message)
    }
  }

  const fetchCategory = async () => {
    try {
      setIsLoading(true)
      const responcedata = await getCategory()
      setcategory(responcedata.data)
      setIsLoading(false)
    } catch (error) {
      console.error('err', error.message);
      setIsLoading(false)
    }
  }

  const fetchBanners = async () => {
    try {
      setIsLoading(true)
      const response = await getBanners();
      let emptyar = []
      response?.data.forEach(val => {
        emptyar.push({ ...val, "autoplaySpeed": `${val?.duration}000` })
      })
      // console.log('jhfghkghjkvfhff',emptyar)
      setBanners(emptyar)
      setIsLoading(false)
    } catch (error) {
      console.error('err', error.message);
      setIsLoading(false)
    }

    // setIsLoading(true)
    // getBanners().then(res => {
    //   setBanners(res.data)
    //   console.log('res.data',res)
    //   setIsLoading(false) 
    // }).catch(err => {
    //   console.error('err',err.message);
    //   setIsLoading(false)
    // })
  }

  const fetchBrand = async () => {
    try {
      setIsLoading(true)
      const response = await getBrand()
      setbrand(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error('err', error.message);
      setIsLoading(false)
    }
  }

  const fetchPopularProduct = async () => {
    try {
      setIsLoading(true)
      const responcedata = await getPopular()
      setPopular(responcedata.data);
      setIsLoading(false)
    } catch (error) {
      console.error('err', error.message);
      setIsLoading(false)
    }
  }

  const fetchRecomProduct = async () => {
    try {
      setIsLoading(true)
      const responcedata = await getRecommended()
      setRecommended(responcedata.data);
      setIsLoading(false)
    } catch (error) {
      console.error('err', error.message);
      setIsLoading(false)
    }
  }

  const fetchBannerSection = async () => {
    try {
      setIsLoading(true)
      const section = await getSection()
      setBannersection(section.data)
      setIsLoading(false)
    } catch (error) {
      console.error('err', error.message);
      setIsLoading(false)
    }
  }


  const fetchVideoList = async () => {
    try {
      setIsLoading(true)
      const responce = await getCustomerVideo();
      setVideoList(responce.data)
      setIsLoading(false)
    } catch (error) {
      console.error('err', error.message);
      setIsLoading(false)
    }
  }



  // useEffect(() => {
  //    fetchCategory();
  //    fetchBrand();
  //    fetchBanners();
  //    fetchBannerSection();
  //    fetchPopularProduct();
  //    fetchRecomProduct();
  //    fetchTrending();
  //    fetchRecommended();
  //    fetchSocialMedia();
  //    fetchVideoList();
  // }, [])

  useEffect(async () => {

    await Promise.all[
      fetchMainCategories(),
      fetchCategory(),
      // fetchBrand(),
      fetchBanners(),
      fetchBannerSection(),
      fectLanguages(),
      // fetchPopularProduct(),
      // fetchRecomProduct(),
      // fetchVideoList(),
      //  fetchData()
      // fetchTrending(),
      // fetchRecommended(),
      // fetchSocialMedia(),
      fetchSubCategory()
    ]
  }, [])

  // useEffect(() => {
  //   let timer=setTimeout(function () {
  //     setIsLoading(false)
  //   },3000);
  //   return () => {clearTimeout(timer)}
  // }, []);


  const Loader = () => {
    return (
      <div className="loader-wrapper">
        {url === "Christmas" ? (
          <div id="preloader"></div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    )
  }

  //   axios.interceptors.request.use(function (config) {
  //     if(config){
  //       setIsLoading(true)
  //     }
  //     return config;
  //   }, function (error) {
  //     return Promise.reject(error);
  //   });

  // // Add a response interceptor
  // axios.interceptors.response.use(function (response) {
  //   if(response){
  //     setIsLoading(false)
  //   }
  //     return response;
  //   }, function (error) {
  //     // Any status codes that falls outside the range of 2xx cause this function to trigger
  //     // Do something with response error
  //     return Promise.reject(error);
  //   });

  return (
    <>
      {isLoading ? (
        <div className="loader-wrapper">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) :
        // <initialProvider>
        <>
          <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/x-icon" href={"/assets/images/favicon/27.png"} />
          </Helmet>
          {/* <ModalComponent /> */}
          <Suspense fallback={<Loader />}>
            <HeaderOne categoryList={category} setBrandSug={setBrandSug} setResult={setResult} setPro={setPro} setPopularSearch={setPopularSearch} logoName={"logo.png"} topClass="top-header" />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <Banner
              popperSearch={popperSearch}
              category={category}
              banners={banners}
              result1={result}
              product1={product}
              brand={brand}
              brandSug={brandSug}
              mainCategories={mainCategories}
            />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <CollectionBanner
              subCategory={subCategory}
              BannerSection={BannerSection}
              popular={popular}
              recommended={recommended}
              categories={category}
            />
          </Suspense>

          {/* <Paragraph
            // title="title1 section-t-space"
            inner="title-inner1"
            hrClass={false}
          /> */}
          {/* <Suspense fallback={<Loader />}>
      <TopCollection
        noTitle="null"
        backImage={true}
        type="fashion"
        title="top collection"
        subtitle="special offer"
        productSlider={Product4}
        // designClass="section-b-space p-t-0 ratio_asos px-2"
        noSlider="false"
        cartClass="cart-info cart-wrap"
      />
      </Suspense> */}
          <Suspense fallback={<Loader />}>
            <Parallax
              trending={trending}
              Recommended={Recommended}
              video={videoList}
            />
          </Suspense>
          {/* <Suspense fallback={<Loader />}>
            <SpecialProducts
              type="fashion"
              backImage={true}
              productSlider={Product4}
              line={true}
              title="title1 section-t-space"
              inner="title-inner1"
              // designClass="section-b-space p-t-0 ratio_asos"
              noSlider="true"
              cartClass="cart-info cart-wrap"
            />
          </Suspense> */}
          <Suspense fallback={<Loader />}>
            <ServiceLayout sectionClass="border-section small-section" />
          </Suspense>
          {/* <Suspense fallback={<Loader />}>
            <Blog type="fashion" title="title1" inner="title-inner1" />
          </Suspense> */}
          {/* <Suspense fallback={<Loader />}>
            <Instagram type="fashion" />
          </Suspense> */}

          {/* <div className="section-b-space">
        <LogoBlock />
      </div> */}
          <Suspense fallback={<Loader />}>
            <MasterFooter
              categoryList={category}
              footerClass={`footer-light`}
              footerLayOut={"light-layout upper-footer"}
              footerSection={"small-section border-section border-top-0"}
              belowSection={"section-b-space light-layout"}
              newLatter={true}
              mediaLink={soacial}
              logoName={"logo.png"}
            />
          </Suspense>
        </>
        // </initialProvider>
      }

    </>
  );
};

export default Fashion;
