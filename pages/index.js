import React, { useState, createContext, useEffect, lazy, Suspense } from "react";
const Banner = lazy(() => import("./layouts/Fashion/Components/Banner"))
const CollectionBanner = lazy(() => import("./layouts/Fashion/Components/Collection-Banner"))
// import TopCollection from "../components/common/Collections/Collection3";
// const TopCollection = lazy(()=> import("../components/common/Collections/Collection3"));
const Parallax = lazy(() => import("./layouts/Fashion/Components/Parallax"));
const ServiceLayout = lazy(() => import("../components/common/Service/service1"));
const HeaderOne = lazy(() => import("../components/headers/header-one"));
import Helmet from "react-helmet";
const MasterFooter = lazy(() => import("../components/footers/common/MasterFooter"));
import { getBrand, getBanners, getCategory, getSection, getPopular, getRecommended, getTrendingProperty, getRecommendedProperty, getSocialmedia, getCustomerVideo, getSubcategory, getMainCategory } from "../components/core/fashion_request";
import { getLanguages } from "../components/core/account_request";
import { getSuggestions } from "../components/headers/core/_request";


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
      // fetchCategory(),
      // fetchBrand(),
      fetchBanners(),
      fetchSeggetion(),
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

  const fetchSeggetion = async () => {
    const response = await getSuggestions()
      .then((res) => {
        let serv = []
        let pro = []
        let brand = []
        let company = []

        res?.data.forEach(val1 => { serv.push({ ...val1, "type": "Listing" }) })

        res?.products && res?.products.forEach(val2 => pro.push({ ...val2, "type": "Product" }))

        res?.user && res?.user.forEach(val4 => val4?.name != null && brand.push({ ...val4, 'item_title': val4?.name, "type": 'company', "id": val4?.id }))

        res?.brands.forEach(val3 => brand.push({ ...val3, 'item_title': val3?.name, "type": 'Brand', "id": val3?.id }))

        setResult(serv)
        setPro(pro)
        setBrandSug(brand)
      })
      .catch((err) => {
        console.error("err1", err.message);
      });
  };

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
        <>
          <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/x-icon" href={"/assets/images/favicon/27.png"} />
          </Helmet>
          {/* <div className="d-none">
          <Suspense fallback={<Loader />}>
            <HeaderOne categoryList={category} setBrandSug={setBrandSug} setResult={setResult} setPro={setPro} setPopularSearch={setPopularSearch} logoName={"logo.png"} topClass="top-header" />
          </Suspense>
          </div> */}
          <Suspense fallback={<Loader />}>
            <Banner
              popperSearch={popperSearch}
              // category={category}
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
            />
          </Suspense>


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
            <ServiceLayout sectionClass="border-section small-section" />
          </Suspense> */}

          {/* <Suspense fallback={<Loader />}>
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
          </Suspense> */}
        </>
      }

    </>
  );
};

export default Fashion;
