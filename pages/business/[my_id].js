import React, { useState, useEffect, useRef, memo } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Row, Container, Col, Button } from "reactstrap";
import { alpha, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {styled,TextField, Box} from "@mui/material";
import { AutoComplete } from "primereact/autocomplete";
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import ReatAutocomplte from 'react-autocomplete'
import { getCategory, getBrand } from "../../components/core/fashion_request";
import {
  postListingSave,
  getCustomField,
  getItemsDetails,
  UpdateListingdata,
  getContriesDrop,
  getCityDrop,
  getStateDrop,
  SaveListingVideo,
  UpdateListingVideo,
  DeleteItemsGallery,
  getbranch,
  updatingHours,
  getSearchlocate
} from "../../components/core/shop_requests";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleMapReact from "google-map-react";
import { useTranslation } from "react-i18next";
import authenticated from "../../components/auth/auth";
import { MultiSelect } from "primereact/multiselect";
import { Chips } from "primereact/chips";
import { Calendar } from 'primereact/calendar';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import { deletetime } from "../../components/headers/core/_request";
import Seo from "../../seo/seo";
import axios from "axios";
import moment from "moment/moment";
import MulSelect from 'react-select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useCategory } from "../../components/auth/catgoryContext";
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';


const API_URL = process.env.NEXT_PUBLIC_API_URL

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Markers = ({ lat, lng, onMarkerDrag }) => {
  // const handleMarkerDrag = (event) => {
  //   // Extract updated coordinates from the drag event
  //   console.log("jgfgjfg",event)
  //   const newLat = event.latLng.lat();
  //   const newLng = event.latLng.lng();

  //   // Call the onMarkerDrag callback with the new coordinates
  //   onMarkerDrag(newLat, newLng);
  // };

  return (
    <div style={{
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      cursor: 'grab',
    }} className="text-danger fs-1" draggable='true' lat={lat} lng={lng}>
      <i className="fa fa-map-marker" aria-hidden="true"></i>
    </div>
  )
}

// const MyMapComponent = withScriptjs(withGoogleMap((props) => {
//   console.log(props)
//   // const [ lat, setLat ] = useState(props.position.lat ?? 13.0461007)
//   // const [ lng, setLng ] = useState(props.position.lng ?? 80.2209664)
//   const [ lat, setLat ] = useState(13.0461006)
//   const [ lng, setLng ] = useState(80.2209664)

//   const onMarkerDragEnd = (coord) => {
//     console.log('coord', coord)
//     if(coord && coord.latLng) {
//       const { latLng } = coord;

//       setLat(latLng.lat())
//       setLng(latLng.lng())

//       props.setPosition({
//         'lat':latLng.lat(),
//         'lng':latLng.lng()
//       })
//     }
//   }

//   return (
//     <>
//     {/* <p>lat {lat}</p>
//     <input value={lat} />
//     <p>lng: {lng}</p>
//     <input value={lng} /> */}
//     <GoogleMap
//       defaultZoom={15}
//       defaultCenter={{ lat, lng }}
//       onClick={e => console.log(e)}
//       >
//       {props.isMarkerShown && (
//         <Marker
//           position={{ lat, lng }}
//           draggable
//           onDragEnd={e => onMarkerDragEnd(e)}
//         />
//       )}
//     </GoogleMap>
//     </>
//   )
// }))

function Listing() {
  const handleDelete = async (id) => {
    try {
      const response = await deleteTime(id);
      if (response.status === 200) {
        // toast.info("DELETED SUCCESSFULLY", {
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
      } else {
        // toast.error('Something Went Wrong!', {
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
    } catch (error) {
      console.error('Error deleting listing timing:', error);
    }
  };

  const deleteTime = async (id) => {
    const DELETE_TIME_URL = `${API_URL}/delete-listing-timings/${id}`;
    return axios.get(DELETE_TIME_URL);
  };


  // function Listing() {
  //   const handleDelete = async (id) => {
  //     const responce = await deletetime()
  //     setHours(response.data?.item_hours);
  //     if(responce.status == 200){
  //       toast("DELETED SUCCESSFULL", {
  //         position: "bottom-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //       });
  //     }else {
  //       toast.error('Somthing Went Wrong!', {
  //         position: "bottom-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //         }); 
  //     }
  //   }




  if (typeof window === "undefined") {
    return null;
  }

  const [position, setPosition] = useState({
    lat: 25.3336984,
    lng: 51.2295295,
  });

  let initialValues = {
    user_id: "",
    listing_owner:
      JSON.parse(sessionStorage.getItem("data"))?.name ??
      JSON.parse(localStorage.getItem("data"))?.name,
    item_status: "2",
    item_featured: "0",
    branch: "",
    item_title: "",
    item_description: "",
    item_address: "",
    item_address_hide: "",
    country_id: "",
    state_id: "",
    city_id: "",
    item_postal_code: "",
    item_lat: "",
    item_lng: "",
    item_youtube_id: "",
    specifications: "",
    brands: "",
    item_phone: "",
    item_website: "",
    item_social_facebook: "",
    item_social_twitter: "",
    item_social_linkedin: "",
    item_social_instagram: "",
    item_social_whatsapp: "",
    categories: "",
    item_type: "",
    item_hour_time_zone: "0",
    item_hour_show_hours: "0",
    item_feature_value: "",
    multi_select_values: "",
    feature_image: "",
    day_week: "",
    open_hour: "",
    open_min: "",
    close_hour: "",
    close_min: "",
    image_galler: "",
    tags: "",
    founded_by: "",
    // image_gallery[1]:'',
    // video[0]:'',
    // video[1]:''
  };


  const markerPosition = {
    lat: 25.3336984,
    lng: 51.2295295,
  };

  // const [markerPosition, setMarkerPosition] = React.useState({
  //   lat: 13.0827,
  //   lng: 80.2707,
  // });

  const pointerMap = ({ text }) => <div>{text}</div>;
  const router = useRouter();

  const { t } = useTranslation();
  const { my_id } = router.query;
  const Ref = useRef(this);
  const [Category, setCategory] = useState([]);
  // const [Category, setCategory] = useState('');
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState();
  const [personName, setPersonName] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [openform, setOpenform] = useState(false);
  const [getimg, setimg] = useState("");
  const [mulimg, setmuImg] = useState([]);
  const [video, setVideo] = useState([]);
  const [customField, setCustomField] = useState([]);
  const [multiField, setMultiField] = useState([]);
  const [selectField, setSelectField] = useState([]);
  const [inputField, setInputField] = useState([]);
  const [formload, setFormLoad] = useState(false);
  const [ExceptionHour, setExceptionHour] = useState([]);
  const [showHours, setShowhours] = useState(false);
  const [hours, setHours] = useState([]);
  const [preview, setPreview] = useState("/assets/images/tatlub-img/No.jpg");
  const [priview2, setPreview2] = useState([]);
  const [formvalue, setFormvValue] = useState("");
  const [center, setCenter] = useState([51.505, -0.09]);
  const [countries, setCountries] = useState([]);
  const [countriesval, setCountriesval] = useState();
  const [state, setState] = useState([]);
  const [stateval, setStateval] = useState([]);
  const [city, setCity] = useState([]);
  const [cityval, setCityval] = useState([]);
  const [sellerID, setSellerID] = useState(my_id);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchLocat, setSearchLocat] = useState()
  const [predictions, setPredictions] = useState([])
  const [categoryId, setCategoryId] = useState([]);
  const [Tagvalue, setTagvalue] = useState([]);
  const [branches, setBranches] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hoursId, setHoursid] = useState('')
  const [uphours, setupHours] = useState('')
  const [open, setOpen] = React.useState(false);
  const [specify, setSpecify] = useState(0)
  const [TimeSlots, SetTimeSlots] = useState([])
  const [fromTime, SetfromTime] = useState('')
  const [selectIntrovel, SetSelectIntrovel] = useState(15)
  const [Timevalue, TimeonChange] = useState('10:00');
  const {CategoryList} = useCategory()

  useEffect(()=> {
    setCategory(CategoryList)
  },[CategoryList])
  
  const Introvels = [
    { time: '15 Minutes', val: 15 },
    { time: '30 Minutes', val: 30 },
    { time: '1 Hour', val: 60 },
    { time: '2 Hour', val: 120 }
  ]
  // const [AllTime, SetAllTime] = useState({
  //   from_time: "",
  //   to_time: "",
  // })
  const [Slots, Setslots] = useState([])

  console.log('Timevalue', Timevalue)

  const handleTimeSlots = (toTime) => {
    Setslots((e) => [...e, { from_time: fromTime, to_time: toTime }])
  }


  // console.log('djhkgdjhd',countries)






  useEffect( async() => {
    try {
      if(searchLocat){
        const responce = await getSearchlocate(searchLocat)
        if(responce){
          setPredictions(responce)
        }
      }
    } catch (error) {
      console.log('error',error.message)
    }
  }, [searchLocat])


  // time slots genarate
  function generateTimeSlots() {
    const startTime = new Date(0, 0, 0, 0, 0); // 12:00 AM
    const endTime = new Date(0, 0, 0, 24, 0); // 24:00 PM
    // const interval = 30; // 30 minutes
    const interval = selectIntrovel ?? 15

    const timeSlots = [];
    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
      const slotStartTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      currentTime.setMinutes(currentTime.getMinutes() + interval);
      const slotEndTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      // timeSlots.push({ time: `${slotStartTime} - ${slotEndTime}` });
      // timeSlots.push(slotEndTime);
      timeSlots.push({ time: slotEndTime });
    }
    // return timeSlots;
    SetTimeSlots(timeSlots)
  }

  useEffect(() => {
    generateTimeSlots()
  }, [selectIntrovel])



  // const timeSlots = generateTimeSlots();


  // console.log("sghfdgfdjd",timeSlots)


  const [specification, setSpecification] = useState({
    name: "",
    values: "",
  })
  const [specifivalue, setSpecifivalue] = useState([])


  const handleSpecification = (e) => {
    const { name, value } = e.target;
    setSpecification({ ...specification, [name]: value })
  }

  const handleUptodat = (e, key) => {
    const { name, value } = e.target;
    setSpecifivalue((pre) => {
      let newval = [...pre]
      newval[key] = { ...newval[key], [name]: value }
      return newval
    })
  }


  // useEffect(()=>{
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //        const { latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed } = position.coords;
  //        setPosition({
  //         lat: latitude,
  //         lng: longitude,
  //        })
  //       })}
  // },[position])

  const handleDeleteImg = (i) => {
    let val = Object.entries(mulimg).filter((d, k) => k !== i);
    setmuImg(Object.fromEntries(val));

    let val2 = Object.entries(priview2).filter((d, k) => k == i);

    const ids =
      val2.length > 0 &&
      formvalue?.galleries?.filter(
        (d, k) => d?.item_image_gallery_name == val2[0][1] ?? val2
      );
    // console.log("odo", ids);

    const id = ids && ids[0]?.id;
    if (id) {
      DeleteItemsGallery(id)
        .then((res) => {
          // console.log("res", res);
        })
        .catch((err) => {
          console.error("err", err.message);
        });
    }
  };

  // console.log("llld0", hours);
  useEffect(() => {
    setCategoryId(selectedCategory?.map((data) => data?.id));
    if (selectedCategory?.length == 0) {
      setOpenform(false)
    }
  }, [selectedCategory]);

  const initialhours = {
    id: '',
    day: "",
    open_hours: "0",
    open_minit: "0",
    close_hours: "0",
    close_minit: "0",
  };

  const initialhours1 = {
    day: "",
    open_hours: "",
    open_minit: "",
    close_hours: "",
    close_minit: "",
  };
  const [HoursValues, setHoursValues] = useState(initialhours);
  const [ExceptValues, setExceptValues] = useState({
    day: "",
    open_hours: "",
    open_minit: "",
    close_hours: "",
    close_minit: "",
  });

  // if(Object.keys(formik?.errors ?? {})?.length > 0){
  //   toast.error('Somthing Went Wrong!', {
  //     position: "bottom-right",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //     });
  // }

  // console.log("khgfjhfjhf", HoursValues);

  const CssTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        // color: theme.palette.primary.main,
        // background: theme.palette.whiteContainer.main,
    },
    '& .MuiInput-underline:after': {
        // borderBottomColor: theme.palette.primary.main,
        // background: theme.palette.whiteContainer.main,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        // border: 'none',
        borderRadius:'10px'
    },
    '& .MuiOutlinedInput-root': {
        padding: '5px',
        // border: '2px solid ',
        // borderColor: theme.palette.primary.main,
        '& fieldset': {
            // borderColor: theme.palette.primary.main,
        },
        '&:hover fieldset': {
            // borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            // borderColor: theme.palette.primary.main,
        },
    },
}))

  const handleHours = (e) => {
    const { name, value } = e.target;
    setHoursValues({ ...HoursValues, [name]: value });
    if (name == 'day') {
      if (hours.find(d => d.item_hour_day_of_week == value)) {
        setHoursValues()
      }
      if (hours.find(d => d.day == value)) {
        setHoursValues()
      }
    }
  };

  const DateOFException = (e) => {
    const { name, value } = e.target;
    setExceptValues({ ...ExceptValues, [name]: value });
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event;
    // console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    markerPosition["lat"] = lat;
    markerPosition["lng"] = lng;
    // console.log("jgfjfhkkk", markerPosition);
    setPosition({
      lat: lat,
      lng: lng,
    });
    formik.setFieldValue("item_lat", lat);
    formik.setFieldValue("item_lng", lng);
  };

  // useEffect(()=> {
  //   formik.setFieldValue("item_lat",position.lat)
  //   formik.setFieldValue("item_lng",position.lng)
  // },[position])

  // console.log("oooooo", ExceptionHour);
  const categoryList = async () => {
    setIsLoading(true)
    const response = await getCategory();
    // console.log("C-list ", response.data);
    setCategory(response.data);
    setIsLoading(false)
  };

  const BrandDropDown = async () => {
    getBrand()
      .then((res) => {
        setBrands(res.data);
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  useEffect(() => {
    BrandDropDown();
    // categoryList();
    my_id && fetchItemsdata();
    // my_id && formReupto()
  }, [my_id]);

  // useEffect(()=> {
  //   my_id &&  
  //   Object.entries(formvalue).forEach(([key, value]) => {
  //     initialValues[key] = value;
  //   });
  // },[formvalue])

  const fetchCountries = async () => {
    const responce = await getContriesDrop();
    setCountries(responce.data);
  };

  const fetchState = async (id) => {

    const responce = await getStateDrop(id);
    setState(responce.data);
  };

  const fetchCity = async (id) => {
    const responce = await getCityDrop(id);
    setCity(responce.data);
  };

  useEffect(() => {
    fetchCountries();
    // fetchCity();
    // fetchState();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };


  const submitVideos = async () => {
    var userId =
      JSON.parse(sessionStorage.getItem("data")).id ??
      JSON.parse(localStorage.getItem("data"))?.id;
    var formdata = new FormData();
    if (video.length != 0) {
      for (let i = 0; i < video.length; i++) {
        formdata.append(`video[${i}]`, video[i]);
      }
    }
    //   <div className="d-flex justify-content-center align-items-center  vh-100 position-absolute start-50 loader-new">
    //   <div className="spinner-border text-primary " style={{width:'50px',height:'50px'}}  role="status">
    //  <span className="visually-hidden ">Loading...</span>
    //  </div>
    //  </div>
    // document.getElementById("openloaderModal")?.click();
    setOpen(true);
    const responce = await SaveListingVideo(userId, formdata);
    setOpen(false);
    // document.getElementById("closeloaderModal")?.click();
    if (responce.status == 200) {
      toast.info("SAVE SUCCESSFULL", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        icon: false,
        draggable: true,
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
  };

  const UpdateVideos = async () => {
    try {
      // document.getElementById("openloaderModal")?.click();
      setOpen(true);
      let id = my_id;
      var formdata = new FormData();
      if (video.length != 0) {
        for (let i = 0; i < video.length; i++) {
          formdata.append(`video[${i}]`, video[i]);
        }
      }
      // document.getElementById("openloaderModal")?.click();
      const responce = await UpdateListingVideo(id, formdata);
      // document.getElementById("closeloaderModal")?.click();
      setOpen(false);
      if (responce.status == 200) {
        toast.info("UPDATE SUCCESSFULL", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          icon: false,
          draggable: true,
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
      console.error("error", error.message);
      // document.getElementById("closeloaderModal")?.click();
    }
  };

  const fetchItemsdata = async () => {
    try {
      setIsLoading(true);
      const response = await getItemsDetails(my_id);
      if (response.status == 200) {
        // localStorage.setItem('businessObj', JSON.stringify(response.data))
        setFormvValue(response.data);
        // Object.entries(response.data).forEach(([key, value]) => {
        //   formik.setFieldValue(key, value);
        // });
        // formik.setFieldValue('listing_owner',response.data.user.name)
        const fetcData = JSON.parse(localStorage.getItem('businessObj')) ?? initialValues
        //   Object.entries(response.data)?.forEach(([key, value]) => {
        //   if(value != "null"){
        //     initialValues[key] = value;
        //   }
        // });
        Object.assign(initialValues, response.data);
        formik.setFieldValue("brands", response.data.brand_id);
        setCountriesval(response.data.country_id)
        fetchState(response.data.country_id);
        fetchCity(response.data.state_id);
        setStateval(response.data.state_id)
        setCityval(response.data.city_id)
        setPreview(response.data?.item_image_medium);
        setimg(response.data?.item_image_medium);
        setHours(response.data?.item_hours);
        setExceptionHour(response.data?.item_hour_exceptions);
        // console.log('9999',response.data);
        setSpecifivalue(response.data?.item_specification ?? [])
        let imgs = response.data?.galleries.map(
          (img) => img?.item_image_gallery_name
        );
        setShowhours(response.data?.item_hour_show_hours == 1 ? true : false)
        setPreview2(imgs);
        // setmuImg(imgs);
        setTagvalue(response.data?.tags?.split(","));
        setIsLoading(false);
      } else {
        router.push('/business')
        toast.error("Internal Server Error", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          icon: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

    } catch (error) {
      console.error("err", error.message);
      setIsLoading(false);
      router.push('/business');
      toast.error("Internal Server Error", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        icon: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };


  const handleUpdate = async () => {
    var formdata = new FormData();
    const response = await UpdateListingdata(id, "");
    toast.info("UPDATE SUCCESSFULL", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      icon: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleCustom = (event) => {
    const {
      target: { value },
    } = event;
    setMultiField(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const custonText = (value) => {
    setInputField((e) => [...e, value]);
  };


  const custonSelect = (value) => {
    setSelectField((e) => [...e, value]);
  };

  const getCustomFeilds = async () => {
    // const response = await getCustomField(personName);
    setOpenform(false)
    const response = await getCustomField(categoryId);
    // console.log("res", response.data);
    setCustomField(response.data);
    setOpenform(true);
  };

  const fetchBracnhes = async () => {
    setIsLoading(true);
    let id =
      JSON.parse(sessionStorage.getItem("data"))?.id ??
      JSON.parse(localStorage.getItem("data"))?.id;
    const responce = await getbranch(id);
    setBranches(responce.data);
    setIsLoading(false);
    // console.log("jhfgj", responce.data);
  };

  // useEffect(() => {
  //   if(my_id){
  //     const fetcData = JSON.parse(localStorage.getItem('businessObj'))
  //     // Object.assign(initialValues, fetcData);
  //       Object.entries(fetcData ?? initialValues)?.forEach(([key, value]) => {
  //         if(value != 'null'){
  //           initialValues[key] = value;
  //         }
  //       });
  //     }
  // },[localStorage.getItem('businessObj'),my_id])

  const formReupto = () => {
    const fetcData = JSON.parse(localStorage.getItem('businessObj'))
    // const result = Object.assign(initialValues, fetcData);
    // if (result !== undefined) {
    //  alert("Object.assign was successful");
    // } else {
    //   alert("Object.assign was not successful");
    // }

    // initialValues = {...initialValues, ...JSON.parse(localStorage.getItem('businessObj'))};
    // Object.assign(initialValues, fetcData);
    Object.entries(fetcData ?? initialValues)?.forEach(([key, value]) => {
      // if(value != 'null'){
      //   initialValues[key] = value;
      // }
      formik.setFieldValue(key, value);
    });
  }

  useEffect(() => {
    fetchBracnhes();
  }, []);

  const listingForm = Yup.object().shape({
    item_status: Yup.string(),
    item_featured: Yup.string(),
    branch: Yup.string().notRequired(),
    item_title: Yup.string().required("Title is required"),
    item_description: Yup.string().notRequired(),
    item_address: Yup.string(),
    item_address_hide: Yup.string(),
    country_id: Yup.string().required("Country is required"),
    state_id: Yup.string().required("State is required"),
    city_id: Yup.string().required("City is required"),
    item_postal_code: Yup.string(),
    item_lat: Yup.string(),
    item_lng: Yup.string(),
    item_youtube_id: Yup.string().notRequired(),
    specifications: Yup.string().notRequired(),
    brands: Yup.string().notRequired(),
    item_phone: Yup.string().min(7, "Phone number must be at least 7 Digits").required("Mobile number is required"),
    item_website: Yup.string().notRequired().notRequired().url('website must be a valid URL'),
    item_social_facebook: Yup.string().notRequired().url('facebook must be a valid URL'),
    item_social_twitter: Yup.string().notRequired().url('twitter must be a valid URL'),
    item_social_linkedin: Yup.string().notRequired().url('linkedin must be a valid URL'),
    item_social_instagram: Yup.string().notRequired().url('instagram must be a valid URL'),
    item_social_whatsapp: Yup.string().min(7, "Phone number must be at least 7 Digits").notRequired(),
    categories: Yup.string(),
    item_type: Yup.string(),
    item_hour_time_zone: Yup.string(),
    item_hour_show_hours: Yup.string(),
    item_feature_value: Yup.string(),
    multi_select_values: Yup.string(),
    feature_image: Yup.string(),
    day_week: Yup.number(),
    open_hour: Yup.string(),
    open_min: Yup.string(),
    close_hour: Yup.string(),
    close_min: Yup.string(),
    image_galler: Yup.object(),
    founded_by: Yup.string().notRequired()
  });

  const Uptohours = (data) => {
    setupHours(data)
    formikhours.setFieldValue('day_week', data?.item_hour_day_of_week ?? data?.day)
    formikhours.setFieldValue('open_hour', moment(data?.item_hour_open_time, "HH:mm:ss").hour())
    formikhours.setFieldValue('open_min', moment(data?.item_hour_open_time, "HH:mm:ss").minutes())
    formikhours.setFieldValue('close_hour', moment(data?.item_hour_close_time, "HH:mm:ss").hour())
    formikhours.setFieldValue('close_min', moment(data?.item_hour_close_time, "HH:mm:ss").minutes())
  }

 

  const formikhours = useFormik({
    initialValues,
    // validationSchema: listingForm,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      try {

        const body = {
          'id': uphours?.id,
          'item_hour_day_of_week': values.day_week,
          'item_hour_open_time_hour': values.open_hour,
          'item_hour_open_time_minute': values.open_min,
          'item_hour_close_time_hour': values.close_hour,
          'item_hour_close_time_minute': values.close_min,
        };
        if (parseInt(values.open_hour) < parseInt(values.close_hour)) {
          const response = await updatingHours(body);
          fetchItemsdata()
          document.getElementById('timeCLosePopup')?.click()
          toast.info("UPDATED", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            icon: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error("must be greater then in open hours", {
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
      } catch (err) {
        console.error(err);
        setStatus("The details is incorrect");
        setSubmitting(false);
      }

      // setday((post) => [...post, ...body]);
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema: listingForm,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      setLoading(true);
      var userId =
        JSON.parse(sessionStorage.getItem("data"))?.id ??
        JSON.parse(localStorage.getItem("data"))?.id;
      var roleId = "";
      try {
        const body = {
          user_id: userId,
          item_status: values.item_status,
          item_featured: values.item_featured,
          branch: values.branch,
          item_title: values.item_title,
          item_description: values.item_description,
          item_address: values.item_address,
          item_address_hide: 1,
          country_id: values.country_id,
          state_id: values.state_id,
          city_id: values.city_id,
          item_postal_code: values.item_postal_code,
          item_lat: values.item_lat,
          item_lng: values.item_lng,
          item_youtube_id: values.item_youtube_id,
          specifications: values.specifications,
          brands: values.brands,
          item_phone: values.item_phone,
          item_website: values.item_website,
          item_social_facebook: values.item_social_facebook,
          item_social_twitter: values.item_social_twitter,
          item_social_linkedin: values.item_social_linkedin,
          item_social_instagram: values.item_social_instagram,
          item_social_whatsapp: values.item_social_whatsapp,
          categories: 1,
          item_type: "",
          item_hour_time_zone: values.item_hour_time_zone,
          item_hour_show_hours: values.item_hour_show_hours,
          item_feature_value: "",
          multi_select_values: "",
          feature_image: values.feature_image,
          image_gallery: values.image_galler,
          "image_gallery[1]": "",
          // 'video[0]':'',
          // 'video[1]':''
          item_hour_exceptions: "",
          tags: "",
          founded_by: values.founded_by
        };

        var formdata = new FormData();
        formdata.append("user_id", userId ?? '');
        formdata.append("founded_by", userId ?? '');
        formdata.append("item_status", values.item_status ?? '');
        formdata.append("item_featured", values.item_featured ?? '');
        formdata.append("branch", values.branch ?? '');
        formdata.append("item_title", values.item_title ?? '');
        formdata.append("item_description", values.item_description ?? '');
        formdata.append("item_address", values.item_address ?? '');
        formdata.append("item_address_hide", 1 ?? '');
        formdata.append("country_id", values.country_id ?? '');
        formdata.append("state_id", values.state_id ?? '');
        formdata.append("city_id", values.city_id ?? '');
        formdata.append("item_postal_code", values.item_postal_code ?? '');
        formdata.append("item_lat", values.item_lat ?? '');
        formdata.append("item_lng", values.item_lng ?? '');
        formdata.append("item_youtube_id", values.item_youtube_id ?? '');
        formdata.append("specifications", values.specifications ?? '');
        formdata.append("brands", values.brands ?? '');
        formdata.append("item_phone", values.item_phone ?? '');
        formdata.append("item_website", values.item_website ?? '');
        formdata.append("item_social_facebook", values.item_social_facebook ?? '');
        formdata.append("item_social_twitter", values.item_social_twitter ?? '');
        formdata.append("item_social_linkedin", values.item_social_linkedin ?? '');
        formdata.append("item_social_instagram", values.item_social_instagram ?? '');
        formdata.append("item_social_whatsapp", values.item_social_whatsapp ?? '');
        // formdata.append("categories", personName ?? '');
        formdata.append("categories", categoryId ?? '');
        formdata.append("item_type", "1" ?? '');
        formdata.append("item_hour_time_zone", "1" ?? '');
        formdata.append("item_hour_show_hours", values.item_hour_show_hours ?? '');
        formdata.append("item_feature_value", { inputField, selectField } ?? '');
        formdata.append("multi_select_values", multiField ?? '');
        formdata.append("feature_image", getimg ?? '');
        formdata.append("tags", Tagvalue ?? '');
        // formdata.append('item_hour_id',hoursId)
        // formdata.append("item_hours", '');
        // formdata.append("item_hour_exceptions", '');
        Slots.length > 0 && formdata.append("time_slot ", Slots?.map(data => data?.from_time + '-' + data.to_time,));

        if (Object.keys(mulimg).length != 0) {
          for (let i = 0; i < Object.keys(mulimg).length; i++) {
            formdata.append(`image_gallery[${i}]`, mulimg[i]);
          }
        }

        if (specifivalue?.length > 0) {
          specifivalue.map((val, index) => {
            !val?.id && formdata.append(`s_title[${((specifivalue?.length - 1) - index) + 1}]`, val?.name ?? '');
            !val?.id && formdata.append(`s_value[${((specifivalue?.length - 1) - index) + 1}][${index}]`, val?.values?.split(',') ?? '');
            val?.id && formdata.append(`name_old_${val?.id}`, val?.name);
            val?.id && formdata.append(`value_old_${val?.id}`, val?.values);
          })
        }



        if (video.length != 0) {
          for (let i = 0; i < video.length; i++) {
            formdata.append(`video[${i}]`, video[i]);
          }
        }

        if (hours.length != 0) {
          // let time = hours[i]?.day + '' +hours[i]?.open_hours+':'+hours[i]?.open_minit+''+hours[i]?.close_hours+':'+hours[i]?.close_minit
          // if(hours[0]?.day){
          for (let i = 0; i < hours.length; i++) {
            formdata.append(
              `item_hours[${i}]`,
              hours[i]?.day +
              " " +
              hours[i]?.open_hours +
              ":" +
              hours[i]?.open_minit +
              " " +
              hours[i]?.close_hours +
              ":" +
              hours[i]?.close_minit
            );
          }
          // }
          // else{
          //   for (let i = 0; i < hours.length; i++) {
          //     formdata.append(`item_hours[${i}]`, hours[i]?.item_hour_day_of_week +' '+hours[i]?.item_hour_open_time+' '+hours[i]?.item_hour_close_time);
          //   }
          // }
        }

        if (ExceptionHour.length != 0) {
          for (let i = 0; i < ExceptionHour.length; i++) {
            formdata.append(
              `item_hour_exceptions[${i}]`,
              ExceptionHour[i]?.day +
              " " +
              ExceptionHour[i]?.open_hours +
              ":" +
              ExceptionHour[i]?.open_minit +
              " " +
              ExceptionHour[i]?.close_hours +
              ":" +
              ExceptionHour[i]?.close_minit
            );
          }
        }



        // if(ExceptionHour.length != 0){
        //   for (let i = 0; i < ExceptionHour.length; i++) {
        //     formdata.append(`item_hour_exceptions[${i}]`, ExceptionHour[i]?.item_hour_exception_date +' '+ExceptionHour[i]?.item_hour_exception_open_time+' '+ExceptionHour[i]?.item_hour_exception_close_time);
        //   }
        // }

        if (my_id) {
          let id = my_id;
          // document.getElementById("openloaderModal")?.click();
          setOpen(true);
          const response = await UpdateListingdata(id, formdata);
          setOpen(false);
          if (response.status == 200) {
            toast.info("UPDATED SUCCESSFULL", {
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
            router.push("/business");
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
          // document.getElementById("closeloaderModal")?.click();
        } else {
          // document.getElementById("openloaderModal")?.click();
          setOpen(true);
          const response = await postListingSave(formdata);
          setOpen(false);
          // console.log("listing ", response.data);
          if (response.status == 200) {
            toast.info("CREATED SUCCESSFULL", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              icon: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            router.push("/business");
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
          // document.getElementById("closeloaderModal")?.click();
        }
        // document.getElementById("closeloaderModal")?.click();
      } catch (error) {
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
        // document.getElementById("closeloaderModal")?.click();
        console.error(error);
        setStatus("The details is incorrect");
        setSubmitting(false);
        setLoading(false);
        setOpen(false);
      }
    },
  });



  const isValidFileUploaded = (file) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type?.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const isValidFileUploaded3 = (file) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type?.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const isValidFileUploaded2 = (file) => {
    const validExtensions = ["mp4", "avi"];
    const fileExtension = file.type?.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleimg = (e) => {
    if (e.target.files[0].size > 5242880) {
      toast.error("Maximum 5mb only accepted!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const file = e.target.files[0];
        if (isValidFileUploaded(file)) {
          setPreview(URL.createObjectURL(e.target.files[0]));
          setimg(e.target.files[0]);
        } else {
          toast.error("image format only accepted!", {
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
      } catch (err) {
        console.err("err", err.message);
      }
    }
  };

  const handleVideo = (e) => {
    const file = e.target.files;
    for (let i = 0; i < e.target.files.length; i++) {
      if (isValidFileUploaded2(file[i])) {
        setVideo(file);
      } else {
        toast.error("video format only accepted!", {
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
    }
  };

  const handleMulimg = (e) => {
    const previewImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]?.size > 5242880) {
        toast.error("Maximum 5mb only accepted!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        const file = e.target.files;
        if (isValidFileUploaded3(file[i])) {
          if (file.length <= 12) {
            setmuImg(file);
            const file2 = file[i];
            const reader = new FileReader();
            reader.onload = () => {
              previewImages.push(reader.result);
              if (previewImages.length === file.length) {
                setPreview2([...priview2, ...previewImages]);
              }
            };
            reader.readAsDataURL(file2);
            // console.log("jjj", file);
          } 
          else {  
            let twel = Array.from(file)?.slice(0,12)
            setmuImg(twel);
            const file2 = file[i];
            const reader = new FileReader();
            reader.onload = () => {
              previewImages.push(reader.result);
              if (previewImages.length === twel.length) {
                setPreview2([...priview2, ...previewImages]);
              }
            };
            reader.readAsDataURL(file2);
          }
        } else {
          toast.error("image format only accepted!", {
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
      }
    }

    if(e.target.files.length > 12) {  
      toast.error("Maximum 12 images only accepted!", {
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
  };

  return (<>
    <div>
      <Backdrop
        sx={{ color: '#fff', height: '100vh', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
    {/* <CommonLayout title="collection" parent="home" setCategoryList={setCategory}> */}
      <Seo title={`${formvalue?.item_title ?? 'Listing'}`} description={`${formvalue?.item_description ?? ''}`} />
      <section>
        <div
          className="modal fade"
          id="openMapPoint"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="openMapPointLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded">
              <div className="modal-header border-bottom-0">
                <h3 className="modal-title" id="staticBackdropLabel">
                  Select Location
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-2">
                <div className="row  d-none">
                  <div className="col-md-8 mb-2">
                    <div className=" p-0 search3 sfsdssd form_condition_">
                    {/* <div className=" p-0"> */}
                      <input className="form-control border bg-light" value={searchLocat} placeholder="Search your location" type="text" onChange={(e) => setSearchLocat(e.target.value)} /> 
                     {
                     searchLocat && predictions?.length > 0 &&
                      <div className="card search-list-dd-open-home mt-2" style={{width:"515px"}}>
                          <div className="card-body pt-0 scroll">
                         {
                          predictions?.map((res,i) => (
                            <div className="dropdown-item py-2" key={i} onClick={()=> {
                              setPosition({
                                lat: res?.lat,
                                lng: res?.lon,
                              });
                              markerPosition["lat"] = res?.lat;
                              markerPosition["lng"] = res?.lon;
                              setSearchLocat()
                            }}>
                            <div className="d-flex align-items-center overflow-visible  ">
                              <i className="fa fa-search me-2 text-secoundary" aria-hidden="true"></i>
                              <div className="text-wrap">{res?.display_name}</div>
                            </div>
                          </div>
                          ))
                          }
                          </div>
                      </div>
                     }

                     {/* <ReatAutocomplte 
                      getItemValue={(item) => item.display_name}
                      items={predictions}
                      renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                          {item.display_name}
                        </div>
                      }
                      // className="form-control"
                      value={searchLocat}
                      onChange={(e) => setSearchLocat(e.target.value)}
                      onSelect={(val) => console.log('skhgsdjd',val)}
                     /> */}

                      {/* <Autocomplete
                        fullWidth
                        freeSolo
                        id="combo-box-demo"
                        options={predictions}
                        getOptionLabel={(option) =>
                          option?.display_name
                        } 
                        onChange={(event, value) => {
                          if (value) {
                            
                            console.log('dljfyhdfkdfdf',value)

                          }
                        }}
                        
                        clearOnBlur={false}
                        loadingText={t(
                          'Search suggestions are loading...'
                        )}
                        renderInput={(params) => (
                          <CssTextField
                            label={null}
                            {...params}
                            placeholder={t(
                              'Search location here...'
                            )}
                            onChange={(event) => {
                              setSearchLocat(event.target.value)
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                setSearchLocat(e.target.value)
                              }
                            }}
                          />
                        )}
                      /> */}
                    </div>
                  </div>
                  <div className="h-100 mb-2 col">
                    <button className="btn h-100 btn-theme w-100 rounded-3" onClick={() => {
                      const lacat = JSON.parse(localStorage.getItem('currentLatLng'))
                      const lat = lacat?.lat
                      const lng = lacat?.lng
                      markerPosition["lat"] = lat;
                      markerPosition["lng"] = lng;
                      setPosition({
                        lat: lat,
                        lng: lng,
                      });
                    }} style={{ padding: '13px' }}>Use Current Location</button>
                  </div>
                </div>
                <div
                  className=""
                  style={{
                    height: "500px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                >
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw",
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    defaultCenter={{
                      lat: position.lat,
                      lng: position.lng,
                    }}
                    // defaultCenter={markerPosition}
                    defaultZoom={8}
                    onClick={handleMapClick}
                  // draggable
                  // onDragEnd={handleMapClick}
                  // draggable='true'
                  >
                    {/* {position && ( */}
                    <Markers lat={position.lat} lng={position.lng} onMarkerDrag={handleMapClick} />
                    {/* )} */}
                  </GoogleMapReact>
                </div>

                {/* <div className="" style={{ height: '500px', width: '100%', borderRadius:'10px' }}>
                  <MyMapComponent
                    isMarkerShown
                    googleMapURL="AIzaSyCOYU6x7yqbUnNRtBuygEfCX9NgWakZRLw"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />} 
                    setPosition={setPosition}
                    position = {position}
                  />
                </div> */}
              </div>
              <div className="modal-footer d-flex justify-content-end ">
                <button
                  type="button"
                  className="btn btn-theme w-25 rounded p-2 px-4"
                  data-bs-dismiss="modal"
                >
                  OKAY
                </button>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="my-3">
            <div className="loader-wrapper2">
              {url === "Christmas" ? (
                <div id="preloader"></div>
              ) : (
                <div className="loader"></div>
              )}
            </div>
          </div>
        ) : (
          <div className="container mt-4">
            <div className="">
              <div
                className={
                  my_id
                    ? "d-none"
                    : "row justify-content-center align-items-center contect-dedign mx-1"
                }
              >
                <div className=" col-xl-11 col-lg-9 col-md-8 col-sm-7 form-deijdio  px-sm-2 px-0 mb-2">
                  {/* <FormControl fullWidth> 
                    <InputLabel id="demo-simple-select-label rounded">
                      {t('Select Category')}
                    </InputLabel>
                    <Select
                    className="rounded"
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Select Category" />}
                      MenuProps={MenuProps}
                      sx={{ m: 1, height: 36}}
                    >
                      {Category.map((data, index) => (
                        <MenuItem
                          key={index}
                          value={data.id}
                          style={getStyles(
                            data.category_name,
                            personName,
                            theme
                          )}
                        >
                          {data.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>  */}

                  {/* <MultiSelect
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.value)}
                    options={Category}
                    filter
                    optionLabel="category_name"
                    placeholder="Select Category"
                    className="w-100 "
                  /> */}

                  <MulSelect
                    closeMenuOnSelect={false}
                    isMulti
                    name="category_name"
                    placeholder={t('Select Category')}
                    onChange={(event) => setSelectedCategory(event)}
                    options={Category}
                    getOptionLabel={(option) => `${option.category_name}`}
                    getOptionValue={(option) => option.id}
                    className="fs-5 w-100"
                    classNamePrefix="select"
                    value={selectedCategory}
                  />

                </div>
                <div className="col px-0 mb-2 mx-sm-2">
                  <button
                    disabled={!categoryId?.length > 0}
                    className="btn btn-theme rounded w-100 fw-light"
                    onClick={getCustomFeilds}
                  >
                    {t("Load Form")} {isLoading && <i class="fa fa-spinner box_1 ms-1" aria-hidden="true"></i>}
                  </button>
                </div>
              </div>

              <div
                // className={
                //   personName.length || my_id
                //     ? "d-none"
                //     : " mb-3 d-flex align-items-center justify-content-center"
                // }
                className={
                  openform && selectedCategory?.length > 0 || my_id
                    ? "d-none"
                    : " mb-3 d-flex align-items-center justify-content-center"
                }
              >
                <div className="text-center">
                  <img
                    src="/assets/images/tatlub-img/Manage Orders.png"
                    className="no_image"
                  />
                </div>
              </div>

              <form onSubmit={formik.handleSubmit} className="">
                <div className={openform && selectedCategory?.length > 0 || my_id ? "" : "d-none "}>
                  <div className="form_condition_">
                    <div className="row d-none px-3 mb-3">
                      <div className="form-check col-md-6">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          <h5> {t("Regular Listing")} </h5>
                        </label>
                        <p>For business that has a physical address</p>
                      </div>
                      <div className="form-check col-md-6">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          <h5>{t("Online Listing")}</h5>
                        </label>
                        <p>
                          For business that entirely online with no physical
                          address
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-head mb-3">
                        <h4 className="text-color">{t("General Information")}</h4>
                        <p>
                          Fill out the basic information of the business
                          listing.
                        </p>
                      </div>

                      <div className="row csrd_">
                        <div className="mb-3 col-md-6">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {"Title"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            {...formik.getFieldProps("item_title")}
                            placeholder=""
                          />
                          {/* <select
                          className="form-select"
                          aria-label="Default select example"
                          {...formik.getFieldProps("item_title")}
                        >
                          <option value="">select</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Dr.">Dr.</option>
                        </select> */}

                          {formik.touched.item_title &&
                            formik.errors.item_title && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_title}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="mb-3 col-md-6">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Listing owner")}
                          </label>
                          {/* <select
                          className="form-select"
                          aria-label="Default select example"
                          {...formik.getFieldProps("listing_owner")}
                        >
                          <option selected></option>
                          <option value="1">choose</option>
                        </select> */}
                          <div className="input-group first mb-3 input_prepend">
                            {/* <select
                            className="px-2 py-2 btn_secondary btn btn-sm prepend"
                            aria-label="Default select example"
                            {...formik.getFieldProps("item_title")}
                          >
                            <option value="">select</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Dr.">Dr.</option>
                          </select> */}
                            <input
                              type="text"
                              className="form-control text-uppercase"
                              disabled
                              {...formik.getFieldProps("listing_owner")}
                              placeholder=""
                              style={{ cursor: 'not-allowed' }}
                            />
                          </div>
                          <small>
                            Listing owner cannot change after creation
                          </small>
                          {formik.touched.listing_owner &&
                            formik.errors.listing_owner && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.listing_owner}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        {/* <div className="col-md-3">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          {t('Status')}
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          {...formik.getFieldProps("item_status")}
                        >
                          <option selected  value={'0'}>Select</option>
                          <option value="1">Submitted</option>
                          <option value="2">Published </option>
                          <option value="3">Suspended</option>
                        </select>
                        {formik.touched.item_status &&
                          formik.errors.item_status && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.item_status}
                                </span>
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="mb-3 col-md-3">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          {t('Featured')}
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          {...formik.getFieldProps("item_featured")}
                        >
                          <option selected  value={0}>Select</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </select>
                        {formik.touched.item_featured &&
                          formik.errors.item_featured && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.item_featured}
                                </span>
                              </div>
                            </div>
                          )}
                      </div> */}

                        <div className="mb-3 col-md-3 ">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Branches")}
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            {...formik.getFieldProps("branch")}
                          >
                            <option selected value={0}>
                              Select Branch
                            </option>
                            {branches?.map((data, index) => (
                              <option value={data?.id} key={index}>
                                {data?.address}
                              </option>
                            ))}
                          </select>
                          {formik.touched.branch && formik.errors.branch && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.branch}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mb-3 col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Address")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            {...formik.getFieldProps("item_address")}
                          />
                          {formik.touched.item_address &&
                            formik.errors.item_address && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_address}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Country")}
                          </label>
                          <select
                            className="form-select d-none"
                            aria-label="Default select example"
                            {...formik.getFieldProps("country_id")}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "country_id",
                                e.target.value
                              );
                              fetchState(e.target.value);
                            }}
                          >
                            <option selected value={0}>
                              Select Country
                            </option>
                            {countries?.map((data, index) => (
                              <option value={data.id} key={index}>
                                {data.country_name}
                              </option>
                            ))}
                          </select>  

                          <MulSelect
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            name="country_id"
                            placeholder={t('Select Country')}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "country_id",
                                e.id
                              );
                              setCountriesval(e.id)
                              fetchState(e.id);
                            }}
                            value={countries?.find(e => e.id == countriesval) ?? ''}
                            options={countries}
                            getOptionLabel={(option) => `${option.country_name}`}
                            getOptionValue={(option) => option.id}
                            className=" w-100"
                            classNamePrefix="select"
                            isRequired
                          />

                          {formik.touched.country_id &&
                            formik.errors.country_id && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.country_id}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="mb-3 col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("State")}
                          </label>
                          {/* <select
                            className="form-select"
                            aria-label="Default select example"
                            {...formik.getFieldProps("state_id")}
                            onChange={(e) => {
                              formik.setFieldValue("state_id", e.target.value);
                              fetchCity(e.target.value);
                            }}
                          >
                            <option selected value="0">
                              Select State
                            </option>
                            {state?.map((data, index) => (
                              <option value={data.id} key={index}>
                                {data.state_name}
                              </option>
                            ))}
                          </select> */}

                          <MulSelect
                            closeMenuOnSelect={true}
                            required={true}
                            // isDisabled={!selectIntrovel}
                            isSearchable={false}
                            name="state_id"
                            placeholder={t('Select State')}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "state_id",
                                e.id
                              );
                              fetchCity(e.id);
                            }}
                            // defaultValue={state?.find(e => e.id == stateval)}
                            value={state?.find(e => e.id == stateval)}
                            options={state}
                            getOptionLabel={(option) => `${option.state_name}`}
                            getOptionValue={(option) => option.id}
                            className=" w-100"
                            classNamePrefix="select"
                            
                          />

                          {formik.touched.state_id &&
                            formik.errors.state_id && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.state_id}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("City")}
                          </label>
                          <select
                            className="form-select d-none"
                            aria-label="Default select example"
                            {...formik.getFieldProps("city_id")}
                          >
                            <option selected value="0">
                              Select City
                            </option>
                            {city?.map((data, index) => (
                              <option value={data.id} key={index}>
                                {data.city_name}
                              </option>
                            ))}
                          </select>

                          <MulSelect
                            closeMenuOnSelect={true}
                            required={true}
                            // isDisabled={!selectIntrovel}
                            isSearchable={false}
                            name="city_id"
                            placeholder={t('Select City')}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "city_id",
                                e.id
                              );
                              fetchState(e.id);
                            }}
                            value={city?.find(e => e.id == cityval)}
                            options={city}
                            getOptionLabel={(option) => `${option.city_name}`}
                            getOptionValue={(option) => option.id}
                            className=" w-100"
                            classNamePrefix="select"
                          />

                          {formik.touched.city_id && formik.errors.city_id && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.city_id}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mb-3 col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {" "}
                            {t("Postal code")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            {...formik.getFieldProps("item_postal_code")}
                          />
                          {formik.touched.item_postal_code &&
                            formik.errors.item_postal_code && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_postal_code}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="mb-3 col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Latitude")}
                          </label>
                          <div class="d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              {...formik.getFieldProps("item_lat")}
                            />
                            {/* <button type="button" className="btn btn-theme w-50 rounded mt-2 fw-light " id="map">select on map</button> */}
                            {formik.touched.item_lat &&
                              formik.errors.item_lat && (
                                <div className="fv-plugins-message-container">
                                  <div className="fv-help-block">
                                    <span role="alert" className="text-danger">
                                      {formik.errors.item_lat}
                                    </span>
                                  </div>
                                </div>
                              )}
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#openMapPoint"
                              className="btn p-2 btn-theme mt-2 rounded btn_open_map"
                            >
                              OPEN MAP
                            </button>
                          </div>
                        </div>
                        <div className="mb-3 col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Longitude")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            {...formik.getFieldProps("item_lng")}
                          />
                          {formik.touched.item_lng &&
                            formik.errors.item_lng && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_lng}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>
                        <div className="mb-3 col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Phone")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            maxLength={15}
                            {...formik.getFieldProps("item_phone")}
                            onChange={(e) =>
                              formik.setFieldValue(
                                "item_phone",
                                e.target?.value.replace(/[^0-9]/g, "")
                              )
                            }
                          />
                          {formik.touched.item_phone &&
                            formik.errors.item_phone && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_phone}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>
                        <div className="mb-3 col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Youtube video id")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            {...formik.getFieldProps("item_youtube_id")}
                          />
                          {formik.touched.item_youtube_id &&
                            formik.errors.item_youtube_id && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_youtube_id}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="mb-3 col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Brands")}
                          </label>
                          <select
                            className="form-select d-none"
                            aria-label="Default select example"
                            {...formik.getFieldProps("brands")}
                          >
                            <option selected value={0}>
                              Select Brand
                            </option>
                            {brands.length > 0 &&
                              brands.map((data, index) => (
                                <option value={data.id} key={index}>
                                  {data.name}
                                </option>
                              ))}
                          </select>

                          <MulSelect
                            closeMenuOnSelect={true}
                            // isDisabled={!selectIntrovel}
                            isSearchable={false}
                            name="brands"
                            placeholder={t('Select Brand')}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "brands",
                                e.id
                              )
                            }}
                            value={brands?.find(e => e.id == formik.getFieldProps("brands"))}
                            options={brands}
                            getOptionLabel={(option) => `${option.name}`}
                            getOptionValue={(option) => option.id}
                            className=" w-100"
                            classNamePrefix="select"
                          />

                          {formik.touched.brands && formik.errors.brands && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                <span role="alert" className="text-danger">
                                  {formik.errors.brands}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mb-3 col-md-3">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {" "}
                            {t("Founded By")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            maxLength={4}
                            placeholder=""
                            {...formik.getFieldProps("founded_by")}
                            onChange={(e) =>
                              formik.setFieldValue(
                                "founded_by",
                                e.target?.value.replace(/[^0-9]/g, "")
                              )
                            }
                          />
                          {formik.touched.founded_by &&
                            formik.errors.founded_by && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.founded_by}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="mb-3 col-12 d-none">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Specification")}
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea2"
                            rows="5"
                            {...formik.getFieldProps("specifications")}
                          ></textarea>
                          {formik.touched.specifications &&
                            formik.errors.specifications && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.specifications}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="mb-3 col-12">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Description")}
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="5"
                            {...formik.getFieldProps("item_description")}
                          ></textarea>
                          {formik.touched.item_description &&
                            formik.errors.item_description && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_description}
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="mb-3 col-12">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Specification")}
                          </label>
                          <div className=" row mb-3 " >
                            <div className="col-md-5 col-sm-6 mb-3">
                              <input className="form-control" placeholder={t("Title")} value={specification?.name} name='name' onChange={(e) => handleSpecification(e)} />
                            </div>
                            <div className="col-md-5 col-sm-6 mb-3">
                              <input className="form-control" placeholder={t("Value")} name="values" disabled={!specification?.name} value={specification?.values} style={specification?.name ? { cursor: 'default' } : { cursor: 'not-allowed' }} onChange={(e) => handleSpecification(e)} />
                            </div>
                            <div className="col-md-2">
                              <button type="button" disabled={specification?.name && specification?.values ? false : true} className="btn btn-theme rounded fw-light w-100" onClick={() => { setSpecifivalue((v) => [...v, specification]); setSpecification({ name: "", values: "" }) }}>{t("ADD")}</button>
                            </div>
                          </div>
                          {
                            specifivalue.map((spec, key) => (
                              <div className=" row mb-3" key={key}>
                                <div className="col-md-5 col-sm-6 mb-3">
                                  <input className="form-control" value={spec?.name} onChange={(e) => handleUptodat(e, key)} name='name' placeholder={t("Title")} />
                                </div>
                                <div className="col-md-5 col-sm-6 mb-3">
                                  <input className="form-control" value={spec?.values} onChange={(e) => handleUptodat(e, key)} placeholder={t("value")} name="values" />
                                </div>
                                <div className="col-md-2">
                                  <button type="button" className="btn btn-theme rounded fw-light w-100" onClick={() => {
                                    setSpecify(specify - 1);
                                    let newArr = specifivalue.filter((item) => item != specifivalue[key])
                                    setSpecifivalue(newArr)
                                  }}>{t("REMOVE")}</button>
                                </div>
                              </div>
                            ))
                          }
                        </div>

                        <div className="mb-3 col-md-6 col-xl-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Website")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            {...formik.getFieldProps("item_website")}
                          />
                          {formik.touched.item_website &&
                            formik.errors.item_website && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_website}
                                  </span>
                                </div>
                              </div>
                            )}
                          <small>
                            Only URL allowed (include http:// or https://)
                          </small>
                        </div>
                        <div className="mb-3 col-md-6 col-xl-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Facebook")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            {...formik.getFieldProps("item_social_facebook")}
                          />
                          {formik.touched.item_social_facebook &&
                            formik.errors.item_social_facebook && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_social_facebook}
                                  </span>
                                </div>
                              </div>
                            )}
                          <small>
                            Only URL allowed (include http:// or https://)
                          </small>
                        </div>
                        <div className="mb-3 col-md-6 col-xl-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Twitter")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            {...formik.getFieldProps("item_social_twitter")}
                          />
                          {formik.touched.item_social_twitter &&
                            formik.errors.item_social_twitter && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_social_twitter}
                                  </span>
                                </div>
                              </div>
                            )}
                          <small>
                            Only URL allowed (include http:// or https://)
                          </small>
                        </div>

                        <div className="mb-3 col-md-6 col-xl-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("LinkedIn")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            {...formik.getFieldProps("item_social_linkedin")}
                          />
                          {formik.touched.item_social_linkedin &&
                            formik.errors.item_social_linkedin && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_social_linkedin}
                                  </span>
                                </div>
                              </div>
                            )}
                          <small>
                            Only URL allowed (include http:// or https://)
                          </small>
                        </div>
                        <div className="mb-3 col-md-6 col-xl-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Instagram")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            {...formik.getFieldProps("item_social_instagram")}
                          />
                          {formik.touched.item_social_instagram &&
                            formik.errors.item_social_instagram && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_social_instagram}
                                  </span>
                                </div>
                              </div>
                            )}
                          <small>{t("Instagram Profile URL")}</small>
                        </div>
                        <div className="mb-3 col-md-6 col-xl-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {" "}
                            {t("Whatsapp")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            {...formik.getFieldProps("item_social_whatsapp")}
                            maxLength={15}
                            onChange={(e) =>
                              formik.setFieldValue(
                                "item_social_whatsapp",
                                e.target?.value.replace(/[^0-9]/g, "")
                              )
                            }
                          />
                          {formik.touched.item_social_whatsapp &&
                            formik.errors.item_social_whatsapp && (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">
                                  <span role="alert" className="text-danger">
                                    {formik.errors.item_social_whatsapp}
                                  </span>
                                </div>
                              </div>
                            )}
                          {/* <small>
                            whatsapp number, include country code + number, omit
                            any zeroes, brackets, dashes, or empty space. e.g.
                            17086546789
                          </small> */}
                        </div>

                        <div className="mb-3 col-md-12 col-xl-12  prime_tag">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {" "}
                            {t("Tags")}
                          </label>
                          <br />
                          <Chips
                            value={Tagvalue}
                            className=" border-none"
                            onChange={(e) => setTagvalue(e.value)}
                            separator=","
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 d-none">
                      <div className="form-head mb-3">
                        <h4>Branches</h4>
                      </div>

                      <div className="row">
                        <div className="mb-3 col-12">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>

                        <div className="mb-3 col-12">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                        <div className="mb-3 col-12">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                        <div className="mb-3 col-12">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                        <div className="mb-3 col-12">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                        <div className="mb-3 col-12">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                        </div>
                        <div className="col-1">
                          <button className="btn btn-theme rounded mb-3">
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-head mb-3">
                        <h4 className="text-color">{t("Opening Hours")}</h4>
                        <p>
                          Set up business listing opening hours, as well as
                          alternative opening hours for holidays.
                        </p>
                      </div>

                      <div className="row ">
                        {/* <div className="mb-3 col-md-6">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          {t('Time Zone')}
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          {...formik.getFieldProps("item_hour_time_zone")}
                        >
                          <option selected >Select</option>
                          <option value="1">india</option>
                        </select>
                        <small>Time zone for the opening hours</small>
                      </div> */}
                        <div className="mb-3 col-md-6">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Show opening hours")}
                          </label>
                          <select
                            className="form-select d-none"
                            aria-label="Default select example"
                            {...formik.getFieldProps("item_hour_show_hours")}
                            onChange={(e)=> setShowhours(e.target.value == 1 ? true : false)}
                          >
                            <option selected>Select</option>
                            <option value="1">yes</option>
                            <option value="2">no</option>
                          </select>

                          <MulSelect
                            closeMenuOnSelect={true}
                            // isDisabled={!selectIntrovel}
                            isSearchable={false}
                            name="item_hour_show_hours"
                            placeholder={t('Select')}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "item_hour_show_hours",
                                e.value
                              )
                              setShowhours(e.value == 1 ? true : false)
                            }}
                            value={[{ value: '1', label: 'YES' }, { value: '2', label: 'NO' }].find(e => e.value == formik.getFieldProps("item_hour_show_hours")?.value )}
                            options={[{ value: '1', label: 'YES' }, { value: '2', label: 'NO' }]}
                            // getOptionLabel={(option) => `${option.city_name}`}
                            // getOptionValue={(option) => option.id}
                            className=" w-100"
                            classNamePrefix="select"
                          />
                          <small>
                            Showing opening hours info on listing pages
                          </small>
                        </div>
                        {
                          showHours &&
                        <>
                        <div className="mb-3">
                          <h5>{t("Hours")}</h5>
                          <p>
                            Please make sure the opening time is earlier than
                            the closing time. Otherwise, the opening hour won't
                            be saved. Time range: 00:00-24:00
                          </p>
                        </div>

                        <div className="mb-3 col-lg-2 col-md-3 col-sm-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Day of Week")}
                          </label>
                          <select
                            id="defaultday"
                            className="form-select"
                            aria-label="Default select example"
                            name="day"
                            //  {...formik.getFieldProps('day_week')}
                            //  onChange={(e)=>setday(e.target.value)}
                            value={HoursValues?.day}
                            onChange={handleHours}
                          >
                            <option selected value="0">
                              Select
                            </option>
                            <option value="1">Mon</option>
                            <option value="2">Tue</option>
                            <option value="3">Wed</option>
                            <option value="4">Thu</option>
                            <option value="5">Fri</option>
                            <option value="6">Sat</option>
                            <option value="7">Sun</option>
                          </select>
                        </div>
                        <div className="mb-3 col-lg-2 col-md-3 col-sm-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Open Hour")}
                          </label>
                          <select
                            className="form-select"
                            id="defaultopenhour"
                            aria-label="Default select example"
                            name="open_hours"
                            // {...formik.getFieldProps('open_hour')}
                            //  onChange={(e)=>setOpenHours(e.target.value)}
                            value={HoursValues?.open_hours}
                            onChange={handleHours}
                          >
                            <option selected value="0">
                              0
                            </option>
                            {[...Array(24)].map((x, i) => (
                              <option value={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                          {/* <TimePicker onChange={TimeonChange} className='form-control ' value={Timevalue} /> */}
                        </div>
                        <div className="mb-3 col-lg-2 col-md-3 col-sm-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Open Minute")}
                          </label>
                          <select
                            className="form-select"
                            id="defaultopenmin"
                            aria-label="Default select example"
                            name="open_minit"
                            // {...formik.getFieldProps('open_min')}
                            // onChange={(e)=>setOpenMin(e.target.value)}
                            value={HoursValues?.open_minit}
                            onChange={handleHours}
                          >
                            <option selected value="0">
                              0
                            </option>
                            {[...Array(59)].map((x, i) => (
                              <option value={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3 col-lg-2 col-md-3 col-sm-4">
                          <label
                            for="exampleFormControlInput1"
                            id="defaultclosehour"
                            className="form-label"
                          >
                            {" "}
                            {t("Close Hour")}
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="close_hours"
                            // {...formik.getFieldProps('close_hour')}
                            // onChange={(e)=>setCloseHours(e.target.value)}
                            value={HoursValues?.close_hours}
                            onChange={handleHours}
                          >
                            <option selected value="0">
                              0
                            </option>
                            {[...Array(24)].map((x, i) => (
                              <option disabled={i + 1 > HoursValues?.open_hours ? false : true} value={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3 col-lg-2 col-md-3 col-sm-4">
                          <label
                            for="exampleFormControlInput1"
                            id="defaultclosemin"
                            className="form-label"
                          >
                            {" "}
                            {t("Close Minute")}
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="close_minit"
                            // onChange={(e)=>setCloseMin(e.target.value)}
                            // {...formik.getFieldProps('close_min')}
                            value={HoursValues?.close_minit}
                            onChange={handleHours}
                          >
                            <option selected value="0">
                              0
                            </option>
                            {[...Array(59)].map((x, i) => (
                              <option value={i + 1}>{i + 1}</option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3 col-lg-2 col-md-3 col-sm-4 d-flex align-items-end add_hours">
                          <button
                            type="button"
                            className="btn btn-theme rounded fw-light w-100"
                            onClick={() => {
                              for (let i = 0; i < hours.length; i++) {
                                if (hours[i].day === HoursValues?.day) {
                                  hours.splice(i, 1);
                                }

                                if (
                                  hours[i]?.item_hour_day_of_week ==
                                  HoursValues?.day
                                ) {
                                  setHoursid(hours[i]?.id)
                                  hours.splice(i, 1);
                                }
                              }
                              setHours((p) => [...p, HoursValues]);
                              // setHoursValues(initialhours);
                            }}
                            disabled={HoursValues?.day == 0 ? true : HoursValues?.day ? false : true}
                          >
                            + {t("Add Hours")}
                          </button>
                        </div>

                        <div className="d-sm-flex overflow-auto scroll-inner">
                          {hours?.map((data, index) => (
                            <div className="d-flex justify-content-start align-items-center mb-2" key={index}>
                              {data.day && (
                                <h5 className="text-success text-truncate ms-3 ">
                                  {data?.day == 1 && "Monday"}{" "}
                                  {data?.day == 2 && "Tuesday"}{" "}
                                  {data?.day == 3 && "Wendesday"}{" "}
                                  {data?.day == 4 && "Thurday"}{" "}
                                  {data?.day == 5 && "Friday"}{" "}
                                  {data?.day == 6 && "Saturday"}{" "}
                                  {data?.day == 7 && "Sunday"}{" "}
                                  {data?.open_hours}:{data?.open_minit}:00,{" "}
                                  {data?.close_hours}:{data?.close_minit}:00
                                </h5>
                              )}

                              {data?.item_hour_day_of_week && (
                                <h5 className="text-success text-truncate  ms-3">
                                  {data?.item_hour_day_of_week == 1 && "Monday"}{" "}
                                  {data?.item_hour_day_of_week == 2 &&
                                    "Tuesday"}{" "}
                                  {data?.item_hour_day_of_week == 3 &&
                                    "Wendesday"}{" "}
                                  {data?.item_hour_day_of_week == 4 &&
                                    "Thurday"}{" "}
                                  {data?.item_hour_day_of_week == 5 && "Friday"}{" "}
                                  {data?.item_hour_day_of_week == 6 &&
                                    "Saturday"}{" "}
                                  {data?.item_hour_day_of_week == 7 && "Sunday"}{" "}
                                  {data?.item_hour_open_time},{" "}
                                  {data?.item_hour_close_time}
                                </h5>
                              )}
                              {
                                !data?.day &&
                                <h5
                                  role="button"
                                  data-bs-toggle="modal" data-bs-target="#hourdEdit"
                                  onClick={() => Uptohours(data)}
                                >
                                  <i class="fa fa-pencil-square-o text-color ms-2" aria-hidden="true"></i>
                                </h5>
                              }
                              <h5
                                onClick={() => {
                                  hours.splice(index, 1);
                                  setHours(hours);
                                  const newArray = hours.filter(
                                    (item) => item !== data
                                  );
                                  setHours(newArray);
                                  // handleDelete(data.id)
                                }}
                              >
                                <i
                                  className="fa fa-trash ms-1 text-danger cursor-pointer"
                                  aria-hidden="true"
                                ></i>
                              </h5>
                            </div>
                          ))}
                        </div>
                        <div className="d-none">
                          <div className="mb-3">
                            <h5>{t("Exceptions")}</h5>
                            <p>
                              Hours for holidays and vacations. The date of
                              exception is required, please make sure the opening
                              time is earlier than the closing time. Otherwise,
                              the exception opening hour won't be saved. Time
                              range: 00:00-24:00
                            </p>
                          </div>

                          <div className="mb-3 col-lg-2 col-md-3 col-sm-4">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              {t("Date of Exception")}
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              name="day"
                              placeholder=""
                              value={ExceptValues?.day}
                              onChange={DateOFException}
                            // {...formik.getFieldProps("day_Excep")}
                            />
                            {/* <Calendar 
                                className="form-control"
                                name="day"
                                placeholder=""
                                value={ExceptValues?.day}
                                onChange={DateOFException}
                                showIcon /> */}
                          </div>

                          <div className="mb-3 col-lg-2 col-md-3 col-sm-4">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              {t("Open Hour")}
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              name="open_hours"
                              // {...formik.getFieldProps("open_hour1")}
                              value={ExceptValues?.open_hours}
                              onChange={DateOFException}
                            >
                              <option selected value="0">
                                0
                              </option>
                              {[...Array(24)].map((x, i) => (
                                <option value={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                          </div>

                          <div className="mb-3 col-lg-2 col-md-3 col-sm-4">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              {t("Open Minute")}
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              name="open_minit"
                              // {...formik.getFieldProps("open_min1")}
                              value={ExceptValues?.open_minit}
                              onChange={DateOFException}
                            >
                              <option selected value="0">
                                0
                              </option>
                              {[...Array(59)].map((x, i) => (
                                <option value={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                          </div>

                          <div className="mb-3 col-lg-2 col-md-3 col-sm-4">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              {t("Close Hour")}
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              name="close_hours"
                              // {...formik.getFieldProps("close_hour1")}
                              value={ExceptValues?.close_hours}
                              onChange={DateOFException}

                            >
                              <option selected value="0">
                                0
                              </option>
                              {[...Array(24)].map((x, i) => (
                                <option disabled={i + 1 > ExceptValues?.open_hours ? false : true} value={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                          </div>
                          <div className="mb-3 col-lg-2 col-md-3 col-sm-4">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              {t("Close Minute")}
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              // {...formik.getFieldProps("close_min1")}
                              name="close_minit"
                              value={ExceptValues?.close_minit}
                              onChange={DateOFException}
                            >
                              <option selected value="0">
                                0
                              </option>
                              {[...Array(59)].map((x, i) => (
                                <option value={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                          </div>
                          <div className="mb-3 col-lg-2 col-md-3 col-sm-4 d-flex align-items-end add_hours">
                            <button
                              type="button"
                              className="btn btn-theme rounded fw-light w-100 text-truncate"
                              onClick={() => {
                                setExceptionHour((p) => [...p, ExceptValues]),
                                  setExceptValues(initialhours);
                              }}
                              disabled={ExceptValues?.day ? false : true}
                            >
                              + {t("Add Exceptions")}
                            </button>
                          </div>
                        </div>
                        </>
                        }
                      </div>

                      <div className="d-flex overflow-auto scroll-inner d-none">
                        {ExceptionHour?.map((data, index) => (
                          <div className="d-flex" key={index}>
                            {data?.day && (
                              <h5 className="text-success text-truncate ms-3">
                                {data?.day} {data?.open_hours}:
                                {data?.open_minit}:00, {data?.close_hours}:
                                {data?.close_minit}:00
                              </h5>
                            )}
                            {data?.item_hour_exception_date && (
                              <h5 className="text-success text-truncate ms-3">
                                {data?.item_hour_exception_date}{" "}
                                {data?.item_hour_exception_open_time},{" "}
                                {data?.item_hour_exception_close_time}
                              </h5>
                            )}
                            <h5
                              onClick={() => {
                                // hours.splice(index, 1);
                                // setHours(hours);
                                const newArray = ExceptionHour.filter(
                                  (item) => item !== data
                                );
                                // console.log("newArray", newArray);
                                setExceptionHour(newArray);
                              }}
                            >
                              <i
                                className="fa fa-trash ms-2 text-danger"
                                aria-hidden="true"
                              ></i>
                            </h5>
                          </div>
                        ))}
                      </div>

                    </div>

                    <div className="mb-3">
                      <div
                        className={
                          my_id || customField.length == 0
                            ? "d-none"
                            : "form-head mb-3"
                        }
                      >
                        <h4 className="text-color">{t("Custom Fields")}</h4>
                        <p>Select category, and load form for custom fields.</p>
                      </div>
                      <div className="row">
                        {customField?.map((data, index) => {
                          var str = data.custom_field_seed_value;
                          var arr = str?.split(",");

                          return (
                            <>
                              {data.custom_field_type_name == "select" ? (
                                <div className="mb-3 col-md-6" key={index}>
                                  <label
                                    for="exampleFormControlInput1"
                                    className="form-label text-capitalize"
                                  >
                                    {data.custom_field_name}
                                  </label>
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) =>
                                      custonSelect(e.target.value)
                                    }
                                  >
                                    <option selected>Select</option>
                                    {/* <option value="1">choose</option> */}
                                    {arr.map((list, index) => (
                                      <option value={list} key={index}>{list}</option>
                                    ))}
                                  </select>
                                  {/* <small>Listing owner cannot change after creation</small> */}
                                </div>
                              ) : data.custom_field_type_name == "link" ? (
                                <div className="mb-3 col-md-6">
                                  <label
                                    for="exampleFormControlInput1"
                                    className="form-label text-capitalize"
                                  >
                                    {data.custom_field_name}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={data?.custom_field_seed_value}
                                    onClick={(e) => custonText(e.target.value)}
                                  />
                                </div>
                              ) : data.custom_field_type_name == "text" ? (
                                <div className="mb-3 col-md-6">
                                  <label
                                    for="exampleFormControlInput1"
                                    className="form-label text-capitalize"
                                  >
                                    {data.custom_field_name}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={data?.custom_field_seed_value}
                                    onClick={(e) => custonText(e.target.value)}
                                  />
                                </div>
                              ) : (
                                <div className="mb-3 col-md-6">
                                  {/* <InputLabel id="demo-simple-select-label">{data.custom_field_name}</InputLabel> */}
                                  <label
                                    for="exampleFormControlInput1"
                                    className="form-label text-capitalize"
                                  >
                                    {data.custom_field_name}
                                  </label>

                                  <FormControl fullWidth>
                                    <Select
                                      labelId="demo-multiple-name-label"
                                      id="demo-multiple-name"
                                      multiple
                                      value={multiField}
                                      onChange={handleCustom}
                                      MenuProps={MenuProps}
                                      sx={{ m: 1, height: 40 }}
                                    >
                                      {arr.map((data, index) => (
                                        <MenuItem
                                          key={index}
                                          value={data}
                                        // style={getStyles(data.category_name, personName, theme)}
                                        >
                                          {data}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </div>
                              )}
                            </>
                          );
                        })}
                      </div>
                    </div>

                    {
                      categoryId?.find(e => e == 17) || formvalue?.all_categories?.find(e => e.id == 17) ?
                        <div className="mb-3">
                          <div className="form-head mb-3">
                            <h4 className="text-color">{t("Add Your Appointment Slots")}</h4>
                            <p>
                              Select to add your daily Appointment Slot times.
                            </p>
                          </div>
                          <div className="row mb-2">
                            <div className="mb-3 col-md-4">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
                              >
                                {t("Select Interval")}
                              </label>
                              <MulSelect
                                closeMenuOnSelect={true}
                                defaultValue={Introvels[0]}
                                isSearchable={false}
                                name="from_interval"
                                placeholder={t('Select Interval')}
                                onChange={(event) => SetSelectIntrovel(event.val)}
                                options={Introvels}
                                getOptionLabel={(option) => `${option.time}`}
                                getOptionValue={(option) => option.val}
                                className=" w-100"
                                classNamePrefix="select"
                              />
                            </div>
                            <div className="mb-3 col-md-4">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
                              >
                                {t("From Time")}
                              </label>
                              <MulSelect
                                closeMenuOnSelect={true}
                                isDisabled={!selectIntrovel}
                                isSearchable={false}
                                name="from_rime"
                                placeholder={t('Select Time')}
                                onChange={(event) => SetfromTime(event.time)}
                                isOptionDisabled={(event) => Slots.find(e => e.from_time == event.time)}
                                options={TimeSlots}
                                getOptionLabel={(option) => `${option.time}`}
                                getOptionValue={(option) => option.time}
                                className=" w-100"
                                classNamePrefix="select"
                              />
                            </div>

                            <div className="mb-3 col-md-4">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
                              >
                                {t("To Time")}
                              </label>
                              <MulSelect
                                closeMenuOnSelect={true}
                                isDisabled={!fromTime}
                                name="to_time"
                                placeholder={t('Select Time')}
                                isOptionDisabled={(event) => event.time == fromTime || moment(event.time, 'h:mm A') < moment(fromTime, 'h:mm A')}
                                onChange={(event) => handleTimeSlots(event.time)}
                                options={TimeSlots}
                                getOptionLabel={(option) => `${option.time}`}
                                getOptionValue={(option) => option.time}
                                className=" w-100"
                                classNamePrefix="select"
                              />
                            </div>
                          </div>
                          {
                            Slots?.length > 0 &&
                            <div className="">
                              <span className="mx-2 fw-bold fs-6">SLOTS :</span>
                              {
                                Slots.map((data, index) => (
                                  <span className="mx-2 fw-bold text-success fs-6" key={index}>{data?.from_time + '-' + data.to_time}
                                    <i onClick={() => {
                                      let time = Slots.filter(e => e.from_time != data?.from_time)
                                      Setslots(time)
                                    }}
                                      className="fa fa-trash ms-1 text-danger cursor-pointer"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                ))
                              }
                            </div>
                          }
                        </div> : ''
                    }

                    <div className="mb-3">
                      <div className="form-head mb-3">
                        <h4 className="text-color">{t("Upload Photos")}</h4>
                        <p>
                          Upload a featured image and gallery images for the
                          business listing.
                        </p>
                      </div>

                      <div className="row">
                        <div className="col-xl-4 col-md-6 mb-3">
                          <h5>{t("Feature image")}</h5>
                          <p>
                            minimum ratio suggestion: 800px * 687px, and maximum
                            file size: 5mb
                          </p>
                          <input
                            type="file"
                            id="featureimg"
                            className="d-none"
                            onChange={(e) => handleimg(e)}
                          />
                          {/* <button
                          type="button"
                          className="btn btn-theme fw-light rounded"
                          onClick={() =>
                            document.getElementById("featureimg")?.click()
                          }
                        >
                          {t('Select Image')}
                        </button> */}
                          <button
                            type="button"
                            className="btn bt_product_seliset mt-4 w-100 text-center"
                            onClick={() =>
                              document.getElementById("featureimg")?.click()
                            }
                          >
                            <p>{t("Select Image")}</p>
                            <p>
                              <i
                                className="fa fa-cloud-upload"
                                aria-hidden="true"
                              ></i>
                            </p>
                          </button>
                          <div className='d-flex justify-content-center'>
                            <div className="">
                              <div className="my-3 ">
                                <img
                                  src={preview}
                                  className="OnPreImg rounded-3"
                                  alt="noImage"
                                  onError={(e) =>
                                  (e.currentTarget.src =
                                    "/assets/images/tatlub-img/No.jpg")
                                  }
                                ></img>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setPreview("/assets/images/tatlub-img/No.jpg"),
                                    setimg("");
                                }}
                                className={
                                  getimg
                                    ? "btn btn-danger fw-light rounded mb-3"
                                    : "d-none"
                                }
                              >
                                {t("Remove Feature Image")}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="offset-xl-2 col-md-6 mb-3">
                          <h5>{t("Gallery images")}</h5>
                          <input
                            type="file"
                            id="Galleryimg"
                            className="d-none"
                            multiple="multiple"
                            onChange={(e) => handleMulimg(e)}
                          />
                          <p className="">
                            maximum file size: 5mb per image, maximum 12 images,
                            if more than 12 images selected, first 12 images
                            will be saved.
                          </p>
                          {/* <button
                          type="button"
                          className="btn btn-theme fw-light rounded"
                          onClick={() =>
                            document.getElementById("Galleryimg")?.click()
                          }
                        >
                          {t('Select Image')}
                        </button>  */}
                          <button
                            type="button"
                            className="btn bt_product_seliset mt-4 w-100 text-center "
                            onClick={() =>
                              document.getElementById("Galleryimg")?.click()
                            }
                          >
                            <p>{t("Select Image")}</p>
                            <p>
                              <i
                                className="fa fa-cloud-upload"
                                aria-hidden="true"
                              ></i>
                            </p>
                          </button>

                          <div className="mb-2 mt-3">
                            <div className="row justify-content-center">
                              {priview2?.slice(0, 12).map((img, i) => (
                                <div className="col-4 mb-3 col-xl-2 " key={i}>
                                  <div className="position-relative multi_imgP h-100">
                                    <img
                                      src={img}
                                      className="rounded-3"
                                      alt="noImage"
                                      onError={(e) =>
                                      (e.currentTarget.src =
                                        "/assets/images/tatlub-img/No.jpg")
                                      }
                                    ></img>
                                    <div
                                      className="position-absolute remove_galImg cursor-pointer top-50 start-50 translate-middle"
                                      onClick={() => {
                                        const newArray = priview2.filter(
                                          (item) => item !== img
                                        );
                                        // console.log("newArray", newArray);
                                        setPreview2(newArray);
                                        handleDeleteImg(i);
                                      }}
                                    >
                                      <i className="fa fa-remove text-danger"></i>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {my_id && (
                      <div className="row">
                        <div className="mt-4 col-md-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            {t("Video")}
                          </label>
                          <div className="input-group">
                            <input
                              type="file"
                              className="form-control rounded form_control_vedio"
                              accept="video/*"
                              placeholder=""
                              onChange={(e) => handleVideo(e)}
                              multiple="multiple"
                            />
                            {my_id ? (
                              <button
                                type="button"
                                onClick={() => UpdateVideos()}
                                className="btn btn_header px-4 border-start-0 input-group-text"
                              >
                                {" "}
                                {t("UPDATE VIDEO")}
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => submitVideos()}
                                className="btn btn_header px-4  input-group-text"
                              >
                                {" "}
                                {t("SAVE VIDEO")}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-center mt-4">
                      {my_id ? (
                        <button
                          type="submit"
                          className="btn btn-theme fw-light rounded"
                        >
                          {t("UPDATE")}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-theme fw-light rounded"
                          disabled={Object.keys(formik.errors).length > 0}
                        >
                          {t("CREATE")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      <div class="modal fade" id="hourdEdit" tabindex="-1" aria-labelledby="hourdEditLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="hourdEditLabel">UPDATE HOURS</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" id='timeCLosePopup' aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={formikhours.handleSubmit}>
                <div className="row p-3">
                  <div className="mb-3 col">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      {t("Day of Week")}
                    </label>
                    <select
                      id="defaultday"
                      className="form-select"
                      aria-label="Default select example"
                      name="day"
                      {...formikhours.getFieldProps('day_week')}
                      //  onChange={(e)=>setday(e.target.value)}
                      // value={HoursValues?.day}
                      // onChange={handleHours}
                      disabled
                    >
                      <option selected value="0">
                        Select
                      </option>
                      <option value="1">Mon</option>
                      <option value="2">Tue</option>
                      <option value="3">Wed</option>
                      <option value="4">Thu</option>
                      <option value="5">Fri</option>
                      <option value="6">Sat</option>
                      <option value="7">Sun</option>
                    </select>
                  </div>
                  <div className="mb-3 col">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      {t("Open Hour")}
                    </label>
                    <select
                      className="form-select"
                      id="defaultopenhour"
                      aria-label="Default select example"
                      name="open_hours"
                      {...formikhours.getFieldProps('open_hour')}
                    //  onChange={(e)=>setOpenHours(e.target.value)}
                    // value={HoursValues?.open_hours}
                    // onChange={handleHours}
                    >
                      <option selected value="0">
                        0
                      </option>
                      {[...Array(24)].map((x, i) => (
                        <option value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      {t("Open Minute")}
                    </label>
                    <select
                      className="form-select"
                      id="defaultopenmin"
                      aria-label="Default select example"
                      name="open_minit"
                      {...formikhours.getFieldProps('open_min')}
                    // onChange={(e)=>setOpenMin(e.target.value)}
                    // value={HoursValues?.open_minit}
                    // onChange={handleHours}
                    >
                      <option selected value="0">
                        0
                      </option>
                      {[...Array(59)].map((x, i) => (
                        <option value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col">
                    <label
                      for="exampleFormControlInput1"
                      id="defaultclosehour"
                      className="form-label"
                    >
                      {" "}
                      {t("Close Hour")}
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="close_hours"
                      {...formikhours.getFieldProps('close_hour')}
                    // onChange={(e)=>setCloseHours(e.target.value)}
                    // value={HoursValues?.close_hours}
                    // onChange={handleHours}
                    >
                      <option selected value="0">
                        0
                      </option>
                      {[...Array(24)].map((x, i) => (
                        <option value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col">
                    <label
                      for="exampleFormControlInput1"
                      id="defaultclosemin"
                      className="form-label"
                    >
                      {" "}
                      {t("Close Minute")}
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="close_minit"
                      // onChange={(e)=>setCloseMin(e.target.value)}
                      {...formikhours.getFieldProps('close_min')}
                    // value={HoursValues?.close_minit}
                    // onChange={handleHours}
                    >
                      <option selected value="0">
                        0
                      </option>
                      {[...Array(59)].map((x, i) => (
                        <option value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 align-items-end add_hours">
                    <button
                      type="submit"
                      className="btn btn-theme rounded fw-light "
                    >
                      {t("Update Hours")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    {/* </CommonLayout> */}
  </>
  );
}



export default authenticated(Listing);
