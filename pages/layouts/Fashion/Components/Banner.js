import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  createContext,
  useRef,
} from "react";
import Slider, { slickGoTo } from "react-slick";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Row, Col, Dropdown, Input } from "reactstrap";
import MasterBanner from "./MasterBanner";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  getBrand,
  getBanners,
  getCategory,
  getSearchlist,
  getSearchProductlist
} from "../../../../components/core/fashion_request";
import { AES, enc } from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {useIdContex,IdContex} from '../../../../initialvalueContex'
import { useFormik } from "formik";
import itemscontex from "../../../initcontext";
import {
  getUserSearchList,
  getSellerMail,
  getSuggestions,
} from "../../../../components/headers/core/_request";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import { Skeleton } from "primereact/skeleton";
import { setmainId, mainId } from "../../../../IDmain";
import { useTranslation } from "react-i18next";



const CustomDot = (props) => {
  const { index, onClick, active } = props;

  // You can set a unique ID or use the index as the key
  const dotId = `custom-dot-${index}`;

  return (
    <div
      id={dotId}
      className={`slick-dots1  custom-dot ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <button type="button"></button>
    </div>
  );
};

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const Banner = ({ category, banners, brand, mainCategories, result1, product1, popperSearch, brandSug }) => {

  const { t } = useTranslation();

  const recognitionRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);



  // const ciphertext = AES.encrypt(plaintext, key).toString();
  // const decryptedText = AES.decrypt(ciphertext, key).toString(enc.Utf8);
  // console.log('0000000',ciphertext)
  // console.log("1111111", process.env.CRYPTO_KEY);
  // console.log("khewirygweurfvlkwejyrgfwie", mainCategories);

  const router = useRouter();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const jainsearchvalue = (key) => {
    let resultsKeys = []
    let value = []
    resultsKeys.push(result1.flatMap((item, i) => item?.tags?.split(',')))
    value.push(...result1?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
      { 'item_title': result1.flatMap((item, i) => item?.tags?.split(','))?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())), "type": 'Listing' },
      ...product1?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
      { 'item_title': product1.flatMap((item, i) => item?.tags?.split(','))?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())), "type": 'Product' },
      ...categorySug?.filter((item3) => item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
      ...brandSug?.filter((item3) => item3.item_title.toLowerCase()?.includes(key?.toLowerCase()))
    )

    // if(value.length == 1){
    //   let ProductKeys = []
    //   ProductKeys.push(product1.flatMap((item,i) => item?.tags?.split(',')))
    //   value.push(...product1?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
    //   {'item_title':product1.flatMap((item,i) => item?.tags?.split(','))?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())),"type":'Product'},
    //   ...categorySug?.filter((item3)=> item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
    //   ...brandSug?.filter((item3)=> item3.item_title.toLowerCase()?.includes(key?.toLowerCase()))
    //   )
    // }

    return value
  }

  // console.log('skdhsdhksgdsjghkdsgdsjkhskdsd',result1)

  const JoinSearcValue2 = (key) => {
    let ProductKeys = []
    ProductKeys.push(product1.flatMap((item, i) => item?.tags?.split(',')))
    let value = []
    value.push(...product1?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
      { 'item_title': product1.flatMap((item, i) => item?.tags?.split(','))?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())), "type": 'Product' },
      ...result1?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
      { 'item_title': result1.flatMap((item, i) => item?.tags?.split(','))?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())), "type": 'Listing' },
      ...categorySug?.filter((item3) => item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
      ...brandSug?.filter((item3) => item3.item_title.toLowerCase()?.includes(key?.toLowerCase()))
    )

    // if(value.length == 1){
    //   let resultsKeys = []
    //   resultsKeys.push(result1.flatMap((item,i) => item?.tags?.split(',')))
    //   value.push(...result1?.filter((item) => item.item_title.toLowerCase().includes(key?.toLowerCase())),
    //   {'item_title':result1.flatMap((item,i) => item?.tags?.split(','))?.filter((item2) => item2?.toLowerCase()?.includes(key?.toLowerCase())),"type":'Listing'},
    //    ...categorySug?.filter((item3)=> item3.item_title.toLowerCase()?.includes(key?.toLowerCase())),
    //    ...brandSug?.filter((item3)=> item3.item_title.toLowerCase()?.includes(key?.toLowerCase()))
    //   )
    // }

    return value
  }

  // const [category, setcategory] = useState([]);
  // const [brand, setbrand] = useState([]);
  // const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [location, setLocation] = useState("location");
  const [city, setCity] = useState("");
  const { setCategoryId, CategoryId } = useContext(itemscontex);
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);
  const targetRef = useRef(null);
  const targetRef2 = useRef(null);
  // const [result, setResult] = useState(result1 ?? []);
  // const [product, setPro] = useState(product1 ?? []);
  const [selectresult, setSelectresult] = useState(null);
  const [filteredresult, setFilteredresult] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [searchList, setSearchList] = useState("service");
  const [listToggle, setListToggle] = useState(false);
  const [ptoggle1, setptoggle1] = useState(false);
  const [categorySug, SetcategorySug] = useState([])





  useEffect(() => {
    let valuData = []
    category?.map(data => {
      valuData.push({ 'item_title': data?.category_name, "type": 'Category', "id": data?.id, "slug": data?.category_slug })
    })
    SetcategorySug(valuData)
  }, [category])



  const settings = {
    autoplay: false, // Disable autoplay
    dots: true,
    // fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // customPaging: function (i) {
    //   return <CustomDot index={i} />;
    // },
    // autoplay: true,
    // autoplaySpeed: 2000,
    // cssEase: "linear"
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const sliderRef = useRef();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentSlide((count) => count + 1);
    }, banners[currentSlide % banners?.length]?.autoplaySpeed ?? 4000);

    return () => clearInterval(timerId);
  }, []);

  const image = currentSlide % banners?.length

  useEffect(() => {
    //  document.getElementById(`custom-dot-${image}`)?.click();
    sliderRef.current.slickGoTo(image)
  }, [image])



  // useEffect(() => {
  //   autosetTime()
  // }, [currentSlide]);



  // useEffect(() => {
  //   const startAutoPlay = () => {
  //     intervalRef.current = setInterval(() => {
  //       setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
  //     }, banners[currentSlide]?.duration);
  //   };

  //   const stopAutoPlay = () => {
  //     clearInterval(intervalRef.current);
  //   };

  //   startAutoPlay();

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     stopAutoPlay();
  //   };
  // }, [currentSlide]);



  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }
    loaded.current = true;
  }
  useEffect(() => {
    location && localStorage.setItem("address", location)
  }, [location])
  const fetch1 = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );


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

  useEffect(() => {
    let active = true;
    if (!autocompleteService.current && window.google) {
      try {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
      } catch (err) {
        console.error("err", err.message);
      }
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch1({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch1]);

  const recognition = new window.webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  useEffect(() => {

    //  async function fetchLocation() {
    //    try {
    //      const position = await getLocation();
    //      const { latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed } = position.coords;
    //      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw`;
    //      fetch(url)
    //      .then(response => response.json())
    //      .then(data => {
    //        console.log('address',data)
    //        const address = data.results[0].formatted_address;
    //        setLocation(address);
    //      })
    //      .catch(error => {
    //        console.log(error);
    //      });
    //      setLocation(position.coords);
    //    } catch (error) {
    //      console.error(error);
    //    }
    //  }
    //  fetchLocation();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            latitude,
            longitude,
            altitude,
            accuracy,
            altitudeAccuracy,
            heading,
            speed,
          } = position.coords;
          // console.log(
          //   "eorwieurwer",
          //   latitude,
          //   longitude,
          //   altitude,
          //   accuracy,
          //   altitudeAccuracy,
          //   heading,
          //   speed
          // );
          localStorage.setItem('currentLatLng', JSON.stringify({ lat: latitude, lng: longitude }))
          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              // console.log(
              //   "address1",
              //   data?.plus_code?.compound_code?.toString()?.split(" ")[1]
              // );
              const address = data.results[0].formatted_address;
              // if(address){
              //   localStorage.setItem("address",address)
              // }
              setLocation(address);
              // setValue(address)
              setCity(
                data?.plus_code?.compound_code?.toString()?.split(" ")[1]
              );
            })
            .catch((error) => {
              console.log(error);
            });
          //  setLocation(position.coords);
          // console.log("lop", latitude, longitude);
          axios
            .get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            )
            .then((res) => console.log(res.data?.city));
        },
        (error) => {
          console.error("error1", error.message);
          // toast.error(error.message + "!", {
          //   position: "bottom-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "dark",
          // });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fectSearchList = async (listid) => {
    const sellerMail = await getSellerMail(listid);
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        // console.log("ipAdress", data.ip);
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
            // console.log("spd", res);
            // alert('spd')
          })
          .catch((err) => {
            console.error("err", err);
            // alert(err)
          });
      })
      .catch((error) => console.error(error));
  };

  const itemTemplate = (item) => {
    return (
      <>
        {item ? (
          <div className="d-flex align-items-center">
            <i className="fa fa-search me-2 text-secoundary" aria-hidden="true"></i>
            <div className="">{item.item_title}</div>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <i className="fa fa-search me-2 text-secoundary" aria-hidden="true"></i>
            <div className="">Not Found</div>
          </div>
        )}
      </>
    );
  };

  const AutoCompleteSearch = async (event) => {
    let _filteredresult;
    if (!event.query.trim()?.length) {
      _filteredresult = [...result1];
    } else {
      _filteredresult = result1?.filter((res) => {
        return res.item_title
          .toLowerCase()
          .startsWith(event.query.toLowerCase());
      });
    }

    if (_filteredresult?.length == 0) {
      _filteredresult = [{ item_title: "Not found" }];
    }
    setFilteredresult(_filteredresult);
  };

  const fetchSeggetion = async () => {
    const response = await getSuggestions()
      .then((res) => {
        setResult(res.data);
        setPro(res.products);
      })
      .catch((err) => {
        console.error("err", err.message);
      });
  };

  useEffect(() => {
    // fetchSeggetion();
  }, []);

  useEffect(() => {
    if (isListening) {
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscript(transcript);
        formik.setFieldValue("search", transcript);
        setSearchKey(transcript)
        fetchSearchList(transcript);
      };
    } else {
      recognition.stop();
    }
    return () => recognition.stop();
  }, [isListening]);

  // console.log("voice", transcript);

  const handleToggleListening = () => {
    setIsListening((prevState) => !prevState);
  };


  useEffect(() => {
    setTimeout(() => {
      transcript == "" && setIsListening(false);
    }, 10000);
  }, [isListening])

  const fetchSearchList = async (transcript) => {
    try {
      const response = await getSearchlist(transcript);
      const response2 = await getSearchProductlist(transcript);
      // console.log("pkpkpkpk", response.data);
      let ids = [];
      response.data.forEach((e) => ids.push(e.id));
      response2.data.forEach((e) => ids.push(e.id));
      // console.log("yyyyyyy", ids.join());
      if (response.data?.length > 0) {
        router.push({
          pathname: `/search/${searchList}`,
          query: { search: transcript, len: response.data?.length },
          // query: { listing_id: ids.join(), len: response.data.length,searchList: searchList },
        });
        fectSearchList(ids.join());
      } else if (response2.data?.length > 0) {
        router.push({
          pathname: `/search/${'product'}`,
          query: { search: transcript, len: response2.data?.length },
          // query: { listing_id: ids.join(), len: response.data.length,searchList: searchList },
        });
        fectSearchList(ids.join());
      } else {
        // toast('Not Found', {
        //    position: "bottom-right",
        //    autoClose: 2000,
        //    hideProgressBar: false,
        //    closeOnClick: true,
        //    pauseOnHover: true,
        //    draggable: true,
        //    progress: undefined,
        //    theme: "dark",
        //    });
        router.push({
          pathname: "/NotFound/search",
          query: { search: transcript, city: city },
        });
      }
    } catch (err) {
      console.log("errr", err.message);
    }
  };

  const fetchSearchList2 = async (e) => {
    let skey = e;
    router.push({
      pathname: `/search/${searchList}`,
      query: { search: skey, len: 0 }
    });
  }

  const fetchSearchList211 = async (e) => {
    try {
      let skey = e;
      // console.log("khfkjbl", skey);
      let response;
      if (searchList == 'service') {
        response = await getSearchlist(skey);
      } else {
        response = await getSearchProductlist(skey);
      }
      // console.log("pkpkpkpk", response.data);
      let ids = [];
      response.data.forEach((e) => ids.push(e.id));
      // console.log("yyyyyyy", ids.join());
      if (response.data?.length > 0) {
        router.push({
          pathname: `/search/${searchList}`,
          query: { search: skey, len: response.data?.length },
          // query: {listing_id: ids.join(), len: response.data.length,searchList: searchList },
        });
        fectSearchList(ids.join());
      } else {
        router.push({
          pathname: "/NotFound/search",
          query: { search: skey, city: city },
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
      pathname: `/search/${listby}`,
      query: { search: skey, len: 0 },
    });
  }

  const fetchSearchBylist11 = async (e, searchBy) => {
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
          pathname: `/search/${listby}`,
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


  const initialValues = {
    search: "",
  };

  const handleSearch2 = async (e) => {
    // e.preventDefault();
    // document.getElementById("SearchForm")?.reset();
    // setSearchKey()
    // router.push({
    //   pathname: "/shop/left_sidebar",
    //   query: { search: searchKey, len: 0 },
    // });
    e.preventDefault();
    document.getElementById("SearchForm")?.reset();
    setSearchKey()
    router.push({
      pathname: `/search/${searchList}`,
      query: { search: searchKey, len: 0 },
    });
  }

  const handleSearch27 = async (e) => {
    e.preventDefault();
    document.getElementById("SearchForm")?.reset();
    const response = await getSearchlist(searchKey ?? transcript);
    const response2 = await getSearchProductlist(searchKey ?? transcript);
    let ids = [];
    const key = searchKey ?? transcript
    response.data?.forEach((e) => ids.push(e.id));
    response2.data?.forEach((e) => ids.push(e.id));
    // console.log("yyyyyyy", ids.join());
    if (response.data?.length > 0) {
      router.push({
        pathname: `/search/${searchList}`,
        query: { search: key, len: response.data?.length },
      });
      fectSearchList(ids.join());
      setSearchKey()
    } else if (response2.data?.length > 0) {
      router.push({
        pathname: `/search/${'product'}`,
        query: { search: key, len: response2.data?.length },
        // query: { listing_id: ids.join(), len: response.data.length,searchList: searchList },
      });
      fectSearchList(ids.join());
      setSearchKey()
    } else {
      // toast('Not Found', {
      //    position: "bottom-right",
      //    autoClose: 2000,
      //    hideProgressBar: false,
      //    closeOnClick: true,
      //    pauseOnHover: true,
      //    draggable: true,
      //    progress: undefined,
      //    theme: "dark",
      //    });
      router.push({
        pathname: "/NotFound/search",
        query: { search: key, city: value },
      });
    }
  };

  const formik = useFormik({
    initialValues,
    // validationSchema:profileForm ,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      //   var userId = JSON.parse(sessionStorage.getItem('data')).id;
      //   var roleId ='';
      try {
        const trans = values.search;
        if (!trans) {
          return
        }
        const response = await getSearchlist(trans?.item_title ?? trans);
        // console.log("pkpkpkpk", trans);
        let ids = [];
        response.data.forEach((e) => ids.push(e.id));
        if (response.data?.length > 0) {
          fectSearchList(ids.join());
          // router.push({pathname:'/shop/left_sidebar',query:{search:trans}})
          router.push({
            pathname: "/shop/left_sidebar",
            query: { listing_id: ids.join(), len: response.data?.length, searchList: searchList },
          });
        } else {
          // toast('Not Found', {
          //    position: "bottom-right",
          //    autoClose: 2000,
          //    hideProgressBar: false,
          //    closeOnClick: true,
          //    pauseOnHover: true,
          //    draggable: true,
          //    progress: undefined,
          //    theme: "dark",
          //    });
          router.push({
            pathname: "/NotFound/search",
            query: { search: trans?.item_title ?? trans, city: city },
          });
        }
      } catch (error) {
        console.error("err", error.message);
        toast.error(error, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // alert(error);
        setStatus("The details is incorrect");
        setSubmitting(false);
      }
    },
  });

  console.log("filteredresultfilteredresult", filteredresult)

  // const fetchSearchList1 = async () => {
  //    try{
  //    const response = await getSearchlist(transcript);
  //    console.log("pkpkpkpk",response.data)
  //    if(response.data.length > 0){
  //    router.push({pathname:'/product-details/1',query:{item_id:response.data[0].id}})
  //    }else{
  //       toast('Not Found', {
  //          position: "bottom-right",
  //          autoClose: 2000,
  //          hideProgressBar: false,
  //          closeOnClick: true,
  //          pauseOnHover: true,
  //          draggable: true,
  //          progress: undefined,
  //          theme: "dark",
  //          });
  //    }
  //    }catch(err){
  //       console.log("errr",err.message);
  //    }
  // }

  // const fetchCategory = async () => {
  //    setIsLoading(true)
  //    const responcedata = await getCategory()
  //    setcategory(responcedata.data)
  //    setIsLoading(false)
  //    console.log("efgurfew", responcedata);
  // }

  // const fetchBanners = async () => {
  //    setIsLoading(true)
  //    const Banner =  await getBanners()
  //    setBanners(Banner.data)
  //    setIsLoading(false)
  // }

  // const fetchBrand = async () => {
  //    setIsLoading(true)
  //    const response =  await getBrand()
  //    setbrand(response.data)
  //    setIsLoading(false)
  // }

  // useEffect(() => {
  //    fetchCategory();
  //    fetchBrand();
  //    fetchBanners()
  // }, [])

  const handleSearch = (e) => {
    setTranscript(e.target.value);
    // console.log("khfghhk", e.target.value);
  };

  const handleSubmit = () => {
    alert();
    document.getElementById("clickOnSearch")?.click();
  };

  useEffect(() => {
    // setFilteredresult(searchList == 'service' ? result1?.filter((item) => item.item_title.toLowerCase().includes(searchKey?.toLowerCase())  ) : product1?.filter((item) => item.item_title.toLowerCase().includes(searchKey?.toLowerCase())))
    setFilteredresult(searchList == 'service' ? jainsearchvalue(searchKey) : JoinSearcValue2(searchKey))
  }, [searchList]);

  useEffect(() => {
    searchKey == '' && setSearchList('service')
  }, [searchKey])

  return (
    <>
      <Fragment>
        {/* <div className="dummy-wrap">
  <div className="success-wrap successfully-saved">Saved</div>
</div> */}
        <div className="bg-white">
          <Container className="py-4">
            <div className="search_home  mb-xl-3">
              <Row>
                <Col sm="5 mb-sm-0 mb-3">
                  {/* <Dropdown className="select-serch d-flex py-2 ">
                        <img src="/assets/images/icons-23/4.png" />
                        <input type="text" placeholder={t('Location')} value={location} onChange={(e)=>setLocation(e.target.value)}  className="w-100 border-0 text-truncate" />
                     </Dropdown> */}
                  <div className="getLocat">
                    <Autocomplete
                      id="google-map-demo"
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.description
                      }
                      filterOptions={(x) => x}
                      options={options}
                      autoComplete
                      includeInputInList
                      filterSelectedOptions
                      value={value ? value : location}
                      noOptionsText={
                        <div className="">
                          <span
                            className="text-primary cursor-pointer"
                            onClick={() => setValue()}
                          >
                            Direct Location
                          </span>
                        </div>
                      }
                      onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setValue(newValue);
                      }}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      renderInput={(params) => (
                        <div className="select-serch d-flex">
                          <img src="/assets/images/icons-23/4.png" />
                          <TextField
                            {...params}
                            //  label="Add a location"
                            fullWidth
                          />{" "}
                        </div>
                      )}
                      renderOption={(props, option) => {
                        const matches =
                          option.structured_formatting
                            .main_text_matched_substrings || [];

                        const parts = parse(
                          option.structured_formatting.main_text,
                          matches.map((match) => [
                            match.offset,
                            match.offset + match?.length,
                          ])
                        );

                        return (
                          <li {...props}>
                            <Grid container alignItems="center">
                              <Grid item sx={{ display: "flex", width: 44 }}>
                                <LocationOnIcon
                                  sx={{ color: "text.secondary" }}
                                />
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  width: "calc(100% - 44px)",
                                  wordWrap: "break-word",
                                }}
                              >
                                {parts.map((part, index) => (
                                  <Box
                                    key={index}
                                    component="span"
                                    sx={{
                                      fontWeight: part.highlight
                                        ? "bold"
                                        : "regular",
                                    }}
                                  >
                                    {part.text}
                                  </Box>
                                ))}

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {option.structured_formatting.secondary_text}
                                </Typography>
                              </Grid>
                            </Grid>
                          </li>
                        );
                      }}
                    />
                  </div>
                </Col>
                <Col sm="7">
                  <div className="search-container search-sug">
                    <form
                      // onSubmit={formik.handleSubmit}
                      onSubmit={handleSearch2}
                      className="d-flex justify-content-between align-items-center select-serch"
                    >
                      {/* <Input
                      type="text"
                      onChange={handleSearch}
                      {...formik.getFieldProps("search")}
                      placeholder={t(
                        "Search Products / Services / Companies / Brand"
                      )}
                      className="border-0 d-none"
                      name="search"
                    /> */}
                      <div className="search2 w-100">
                        {/* <AutoComplete
                        field="item_title"
                        onSelect={fetchSearchList2}
                        {...formik.getFieldProps("search")}
                        className="hgg"
                        placeholder={t(
                          "Search Products / Services / Companies / Brand"
                        )}
                        itemTemplate={itemTemplate}
                        suggestions={filteredresult}
                        completeMethod={AutoCompleteSearch}
                      /> */}
                        {/* <div className="card-body pt-0">
                          <h6 className="text-secondary">Popular Search</h6>
                          <ul>
                            <li className="p-2 rounded text-light cursor-pointer bg-secondary mx-1">Cement</li>
                            <li className="p-2 rounded text-light cursor-pointer bg-secondary mx-1">Plywood</li>
                            <li className="p-2 rounded text-light cursor-pointer bg-secondary mx-1">Solar Panel</li>
                          </ul>
                        </div> */}

                        <input type="search" value={searchKey} onChange={(e) => {
                          setSearchKey(e.target.value);
                          setListToggle(true);
                          setptoggle1(false)
                          // setFilteredresult(searchList == 'service' ? result1?.filter((item) => item.item_title.toLowerCase().includes(e.target.value?.toLowerCase())) : product1?.filter((item) => item.item_title.toLowerCase().includes(e.target.value?.toLowerCase())))
                          setFilteredresult(searchList == 'service' ? jainsearchvalue(e.target.value) : JoinSearcValue2(e.target.value))
                        }} placeholder={t(
                          "Search Products / Services / Companies / Brand"
                        )} className="border-0 w-100"
                          onFocus={() => setptoggle1(true)}
                        ></input>
                        {searchKey && listToggle &&
                          <div className="card search-list-dd-open-home" ref={targetRef2}>
                            <div className=''>
                              <ul className="nav nav-pills d-flex justify-content-center mx-2 row admin_tab_switch bg-gray-300 py-2 br_30" id="pills-tab" role="tablist">
                                <li className="nav-item col m-0" role="presentation" onClick={() => setSearchList('service')}>
                                  <button className={searchList == "service" ? "nav-link active text-dark w-100 h-100 m-0 py-2 br_25" : "nav-link text-dark w-100 h-100 m-0 py-2 br_25"} id="expireing-tab" data-bs-toggle="pill" data-bs-target="#expireing" type="button" role="tab" aria-controls="expireing" aria-selected="false">
                                    {t("Suppliers")}
                                  </button>
                                </li>
                                <li className="nav-item col m-0" role="presentation" onClick={() => setSearchList('product')}>
                                  <button className={searchList == "product" ? "nav-link active text-dark w-100 h-100 m-0 py-2 br_25" : "nav-link text-dark w-100 h-100 m-0 py-2 br_25"} id="upcomming-tab" data-bs-toggle="pill" data-bs-target="#upcomming" type="button" role="tab" aria-controls="upcomming" aria-selected="false">
                                    {t("Products")}
                                  </button>
                                </li>
                              </ul>
                            </div>
                            {filteredresult?.length > 0 ?
                              <div className="card-body pt-0 scroll">
                                {filteredresult?.map((item, index) => {
                                  // const title = item?.item_title;
                                  // const startIndex = title?.toLowerCase().indexOf(searchKey?.toLowerCase());
                                  // const endIndex = startIndex + searchKey.length;
                                  // const highlightedTitle = `${title?.substring(0, startIndex)}<span style={{color:'red'}}>${title?.substring(startIndex, endIndex)}</span>${title?.substring(endIndex)}`;

                                  // return(<>
                                  // {
                                  //    item?.item_title?.length > 0 &&
                                  //   <div className="dropdown-item py-2 cursor-pointer" onClick={() =>{
                                  //     setListToggle(false);
                                  //     fetchSearchList2(item.item_title);
                                  //     setSearchKey(item.item_title)
                                  //     setFilteredresult([]);
                                  //   }}>
                                  //     <div className="d-flex align-items-center" key={index}>
                                  //       <i className="fa fa-search me-2 text-secoundary" aria-hidden="true"></i>
                                  //       <div className="complete_1 text-capitalize">{item.item_title}</div>
                                  //     </div>
                                  //   </div>
                                  // }
                                  // </>
                                  // )
                                  return (<>
                                    {
                                      item?.item_title?.length > 0 &&
                                      <div className="dropdown-item py-2 cursor-pointer" onClick={() => {
                                        if (item?.type == 'Category') {
                                          router.push({
                                            // pathname: "/shop/left_sidebar",
                                            pathname: `/category/service/${item.slug}`,
                                            // query: { Category: item.category_slug, searchList: searchList },
                                          })
                                        } else if (item?.type == 'Brand') {
                                          router.push({
                                            pathname: `/brand/product/${item.slug}`,
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
                          <div className="card search-list-dd-open-home" ref={targetRef}>
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
                                    <div>
                                      <h6>{t("Popular Search")}</h6>
                                      {
                                        popperSearch?.length > 0 &&
                                        popperSearch?.map((data, index) => (
                                          <span class="badge p-ser mb-2 fs-13 cursor-pointer mb-0 fw-light p-2 mx-2" onClick={() => fetchSearchList2(data?.popular_search)} key={index}>{data?.popular_search}</span>
                                        ))
                                      }
                                    </div>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                      <div className="d-flex">
                        <button
                          type="button"
                          onClick={handleToggleListening}
                          className="border-0 bg-white p-0"
                        >
                          {isListening ? (
                            <div className="mic-container  me-xl-3">
                              <img
                                src="/assets/images/icons-23/mic active.png"
                                alt="Microphone icon"
                                className="mic-icon "
                              />
                            </div>
                          ) : (
                            <img
                              className="me-xl-3"
                              src="/assets/images/icons-23/3.png"
                            />
                          )}
                        </button>
                        <button type="submit" className="border-0 btn_sr p-0" >
                          <img src="/assets/images/icons-23/2.png" />
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* <div className="search2 ">
                         <AutoComplete field="item_title" placeholder={t('Search Products / Services / Companies / Brand')} multiple suggestions={filteredresult} completeMethod={AutoCompleteSearch}  />
                         </div> */}
                </Col>
              </Row>
            </div>

            <Row className="row_reverse ">
              <Col xl="3 pe-xl-0">
                <div className="h-100 category-card ">
                  <h3 className=" px-2 mb-3">{t("Categories")}</h3>
                  <Row className="animate_ul">
                    {/*<Col xl="12" md="4" xs="6" className="d-flex align-items-center mb-md-4 mb-3 px-md-3 px-2">
                           <img src="/assets/images/cate-Icons/8.png"  className="img-fluid img_category pe-1"/>  <span>CCTV Camera</span>
                        </Col> */}
                    {category?.length > 0 &&
                      category.slice(0, 9).map((i, index) => {
                        return (
                          <>
                            <Col
                              key={index}
                              xl="12"
                              md="4"
                              xs="6"
                              className="d-flex align-items-center mb-md-4 mb-3 px-md-3 px-2 h-100 animate_li"
                              title={i.category_name}
                            >
                              <Link href={{
                                pathname: `/category/service/${i.category_slug}`,
                                // query: { Category: i.category_slug,searchList: 'service' },
                              }}
                              // as={"/shop/left_sidebar"}
                              >
                                <span
                                  className="cursor-pointer d-flex align-items-center foot-cat"
                                  onClick={() => {
                                    // router.push({
                                    //   pathname: "/shop/left_sidebar",
                                    //   query: { Category: i.id,searchList: 'service' },
                                    // });
                                    // setCategoryId(i.id);
                                    setmainId(i.id)
                                  }}
                                >
                                  <img
                                    src={i.category_image}
                                    className="img-fluid img_category border-0"
                                    onError={(e) =>
                                    (e.currentTarget.src =
                                      "/assets/images/tatlub-img/no1.png")
                                    }
                                  />{" "}
                                  {/* <span className="one_line text-capitalize"> */}
                                  <span className="text-truncate text-capitalize">
                                    {i.category_name}
                                  </span>{" "}
                                </span>
                              </Link>
                            </Col>
                          </>
                        );
                      })}
                  </Row>
                  {category?.length > 9 && (
                    // <div className="px-md-3 px-2 mb-2" ><a className="text_theme cursor-pointer" onClick={toggle}>{t('View More')} <i className="fa fa-angle-right ps-1 " aria-hidden="true"></i></a></div>
                    <div className="px-md-3 px-2 mb-0">
                      <a
                        className="text_theme cursor-pointer text-capitalize "
                        role="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasWithBackdrop"
                        aria-controls="offcanvasWithBackdrop"
                      >
                        {t("view More")}{" "}
                        <i
                          className="fa fa-angle-right ps-1 "
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                  )}

                  {category?.length == 0 && (
                    <div className="d-flex justify-content-center align-items-center row">
                      <div className="col-3">
                        <Skeleton
                          className=""
                          width={50}
                          height={50}
                          shape="circle"
                        />
                      </div>
                      <div className="col-7">
                        <Skeleton />
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col xl="9">
                <div className="h-100">
                  <section className="mb-3 home-slick">

                    <Slider {...settings} ref={sliderRef} className="slide-1 home-slider dot">
                      {banners?.map((data, i) => {
                        return (
                          <div key={i}>
                            <MasterBanner
                              img={data.banner}
                              desc={data.description}
                              title={data.title}
                              para={data.sub_title}
                              link={data.button_url ?? ''}
                              btn={data.button_text}
                            />
                            {/* <MasterBanner 
                            img={banners[image]?.banner}
                            desc={banners[image]?.description}
                            title={banners[image]?.title}
                            para={banners[image]?.sub_title}
                            link={banners[image]?.button_url ?? ''}
                            btn={banners[image]?.button_text}
                          /> */}
                          </div>
                        );
                      })}
                      {/* <div className="">
                          <MasterBanner 
                            img={banners[image]?.banner}
                            desc={banners[image]?.description}
                            title={banners[image]?.title}
                            para={banners[image]?.sub_title}
                            link={banners[image]?.button_url ?? ''}
                            btn={banners[image]?.button_text}
                          />
                          </div> */}
                    </Slider>




                    <div className="d-none">
                      <div className="d-flex justify-content-between mt-3">
                        <h5 className="fw-bolder">{t("Popular Brands")}</h5>
                        <Link href={"/shop/metro"}>
                          <a>
                            <h5 className="theme_color fw-light">
                              {t("View All")}
                            </h5>
                          </a>
                        </Link>
                      </div>
                      <div className="row px-2">
                        {brand?.length > 0 &&
                          brand?.slice(0, 14).map((data, index) => {
                            return (
                              <div
                                className="col-1400 col-md-2 col-sm-3 col-4 px-1 mb-2"
                                key={index}
                              >
                                <div
                                  className="product_box-1"
                                  // onClick={()=>router.push('/shop/left_sidebar?brand_id='+data.id,'/shop/left_sidebar') }
                                  onClick={() =>
                                    router.push({
                                      pathname: "/shop/left_sidebar",
                                      query: { brand_id: data.id },
                                    })
                                  }
                                >
                                  <img
                                    src={data.logo}
                                    className="img-fluid img_proct1 px-1 cursor-pointer"
                                    onError={(e) =>
                                    (e.currentTarget.src =
                                      "/assets/images/tatlub-img/no1.png")
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })}

                        {!brand ||
                          (brand?.length == 0 && (
                            <div className="product_box">
                              <div className="">
                                <img
                                  src="/assets/images/Images-product/1.jg"
                                  onError={(e) =>
                                  (e.currentTarget.src =
                                    "/assets/images/tatlub-img/no1.png")
                                  }
                                  className="img-fluid img_proct1 px-1"
                                />
                                {/* <img src="/assets/images/brands/1.jpg" className="img-fluid img_proct2 px-1" /> */}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </section>

                  <section className="col-12 top_catBanner">
                    <div className="row ">
                      {mainCategories?.slice(0, 5).map((item, i) => {
                        return (
                          <div className="col-lg-2 col-sm-3 col-6 mb-3 " key={i}>
                            <div className="Ban_Category">
                              <h4 className="text-capitalize  fs-18">{t(item.category_name)}</h4>
                              <img
                                src={t(item.new_image)}
                                // src="/assets/images/tatlub-img/new/house_Keeping.jpg"
                                className=""
                                alt="not_found"
                                onClick={() => {
                                  if (item?.id == 14) {
                                    router.push({
                                      pathname: `/page/Hiring/category/${item?.category_slug}`,
                                      // query:{'id':14},
                                    });
                                  } else if (item?.id == 21 || item?.id == 36533 || item?.id == 12) {
                                    router.push({
                                      pathname: `/page/Hiring/${item?.category_slug}`,
                                      // query:{'id':item?.id},
                                    });
                                  } else {
                                    router.push({
                                      pathname: `/category/service/${item.category_slug}`,
                                      // query: { Category: item.category_slug, searchList: 'service'},
                                    });
                                  }
                                  setCategoryId(i.id);
                                }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>

      {/* <Modal
        className="model_contact modal-fullscreen modal-xl home-category start-0 position-absolute modal-dialog-scrollable"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle} className="position-relative">
          <div className=" d-sm-flex justify-content-between align-items-center">
            <div className="search-container mb-2">
              <form
                className="d-flex align-items-center select-serch"
                action="/action_page.php"
              >
                <Input
                  type="text"
                  placeholder=""
                  className="border-0"
                  name="search"
                />
                <button className="border-0 p-0" type="submit">
                  <img src="/assets/images/icons-23/2.png" />
                </button>
              </form>
            </div>
            <span className="modal-category">{t("Popular category")}</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="p-3">
            <Row>
              {category.map((i, index) => (
                <Col
                  xl="3"
                  className="d-flex align-items-center mb-md-4 mb-3 px-md-3 px-2"
                  onClick={() =>
                    router.push({
                      pathname: "/shop/left_sidebar",
                      query: { Category: i.id },
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
                  <span className="cursor-pointer">{i.category_name}</span>
                </Col>
              ))}
            </Row>
          </div>
        </ModalBody>
      </Modal> */}

      {/* <div className="silde_cat">
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
            <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
            <div className=" d-sm-flex justify-content-center align-items-center">
                     <div className="search-container d-none ms-2">
                        <span className="p-input-icon-left">
                           <i className="fa fa-search cursor-pointer" aria-hidden="true" />
                           <InputText placeholder="Search" />
                        </span>
                     </div>
                     <h4 className="modal-category">{t('Popular category')}</h4>
                  </div>
            </h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
            <div className="p-3">
                              <Row>
                              {
                                 category.map((i, index) => (
                                    <Col xl="3" className="d-flex align-items-center mb-md-4 mb-3 px-md-3 px-2"  onClick={()=>router.push({pathname:'/shop/left_sidebar',query:{ Category:i.id}})} key={index}>
                                    <img src={i.category_image} className="img-fluid img_category pe-1" onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'} /><span className="cursor-pointer text-truncate foot-cat">{i.category_name}</span>
                                 </Col>
                                 ))
                              }

                           </Row>
                  </div>
            </div>
            </div>
            </div> */}
    </>
  );
};

export default Banner;
