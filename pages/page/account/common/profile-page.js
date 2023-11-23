import React, { useEffect, useContext } from "react";
import { Container, Row, Form, Input, Label, Col } from "reactstrap";
import { UpdateProfileData, GetSellerData, getCityDrop, getStateDrop, getContriesDrop, UpdateProfile1, UpdateProfile2, UpdateProfile3, postBanners, UpdateSellerVidoes, sellerSpec } from '../../../../components/core/seller_request'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useTranslation } from "react-i18next";
import { Chips } from "primereact/chips";
import { Image } from 'primereact/image';
import AuthContex from "../../../../components/auth/AuthContex";
import Seo from '../../../../seo/seo'
import MulSelect from 'react-select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


let initialValues = {
  name: '',
  email: '',
  maritial_status: '',
  occupation: '',
  address: '',
  dob: '',
  country: '',
  state: '',
  city: '',
  area: '',
  zipcode: '',
  phone: '',
  alternate_phone: '',
  home_landline_1: '',
  home_landline_2: '',
  office_landline_1: '',
  office_landline_2: '',
  company_name: '',
  primary_mobile: '',
  primary_mobile2: '',
  secondary_mobile: '',
  secondary_mobile2: '',
  whatsapp: '',
  landline: '',
  company_email: '',
  office_country: '',
  office_state: '',
  office_city: '',
  office_area: '',
  address: '',
  landmark: '',
  website: '',
  office_zipcode: '',
  user_about: '',
  tags: '',
  image: '',
  dd: '',
  mm: '',
  yyy: '',
  Middle_name: '',
  last_name: '',
  dd: '',
  mm: '',
  yyy: ''
}

const ProfilePage = () => {
  const { userData, setUserData } = useContext(AuthContex);
  const [image, setImage] = useState()
  const [brocher, setbrocher] = useState()
  const [preimage, setPreimage] = useState("/assets/images/2.jpg")
  const [banners, setbannerslist] = useState("/assets/images/2.jpg")
  const [mulimg, setmuImg] = useState([]);
  const [video, setVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const [sellerData, setSellerData] = useState([]);
  const [countries, setCountries] = useState([])
  const [state, setState] = useState([])
  const [city, setCity] = useState([])
  const [upload, setuploded] = useState(false)
  const [modal, setModal] = useState(true);
  const { t } = useTranslation();
  const [Tagvalue, setTagvalue] = useState([])
  const [open, setOpen] = React.useState(false);
  const [specify, setSpecify] = useState(0)

  const [specification, setSpecification] = useState({
    title: "",
    value: "",
  })
  const [specifivalue, setSpecifivalue] = useState([])


  const handleSpecification = (e) => {
    const { name, value } = e.target;
    setSpecification({ ...specification, [name]: value })
  }


  console.log('skjdshkdsdsd', specifivalue)

  const handleUptodat = (e, key) => {
    const { name, value } = e.target;
    setSpecifivalue((pre) => {
      let newval = [...pre]
      newval[key] = { ...newval[key], [name]: value }
      return newval
    })
  }


  const toggle = () => setModal(!modal);

  const fetchSellerData = async () => {
    try {
      setIsLoading(true)
      let id = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
      const responcedata = await GetSellerData(id)

      setSellerData(responcedata.data)
      Object.entries(responcedata.data)?.forEach(([key, value]) => {
        if (value != 'null') {
          initialValues[key] = value;
        }
      });
      // Object.entries(responcedata.data[0])?.forEach(([key, value]) => {
      //   formik2.setFieldValue(key, value);
      // });
      if (responcedata.data?.user_details) {
        Object.entries(responcedata.data?.user_details)?.forEach(([key, value]) => {
          if (value != 'null') {
            initialValues[key] = value ?? '';
          }
        });

        formik1.setFieldValue('email', responcedata.data?.email);
        formik3.setFieldValue('company_email', responcedata.data?.user_details?.email);
        setTagvalue(responcedata.data?.user_details?.tags?.split(','))
        setSpecifivalue(responcedata.data?.seller_specs ?? [])
        // console.log("opoo",responcedata.data?.user_details?.tags)
      }

      // if (responcedata.data?.dob != null) {
      //   const DOB = responcedata.data?.dob.split('-')
      //   formik1.setFieldValue('yyy', DOB[0])
      //   formik1.setFieldValue('mm', DOB[1])
      //   formik1.setFieldValue('dd', DOB[2])
      // }
      setPreimage(responcedata?.data?.user_image)
      fetchState(responcedata.data?.country)
      fetchCity(responcedata.data?.state)
      formik3.setFieldValue('office_country', responcedata.data?.user_details.country);
      formik3.setFieldValue('office_state', responcedata.data?.user_details?.state);
      formik3.setFieldValue('office_city', responcedata.data?.user_details?.city);
      formik2.setFieldValue('country', responcedata.data?.country);
      formik2.setFieldValue('state', responcedata.data?.state);
      formik2.setFieldValue('city', responcedata.data?.city);
      formik2.setFieldValue('address', responcedata.data?.address);
      formik2.setFieldValue('area', responcedata.data?.area);
      formik2.setFieldValue('zipcode', responcedata.data?.zipcode);
      setIsLoading(false)
      // console.log("opopopopo",responcedata.data?.user_details?.city);
    } catch (error) {
      console.error('err', error.message)
      setIsLoading(false)
    }
  }

  const fetchCountries = async () => {
    const responce = await getContriesDrop()
    setCountries(responce.data)
  }

  const fetchState = async (id) => {
    const responce = await getStateDrop(id)
    setState(responce.data)
  }

  const fetchCity = async (id) => {
    const responce = await getCityDrop(id)
    setCity(responce.data)
  }

  useEffect(() => {
    fetchCountries();
    // fetchCity();
    // fetchState();
  }, [])


  const removerSpec = async (id) => {
    try {
      let body = {
        "remove": '1',
        "id": id
      }
      const response = await sellerSpec(body)
    } catch (error) {
      console.error("err", error.message)
      toast.error('Somthing Went Wrong!', {
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

  const handleCompanySpc = async () => {

    try {

      var formdata = new FormData();
      const id = userData?.id
      formdata.append(`user_id`, id)
      if (specification?.value) {
        formdata.append(`s_title[${(specifivalue?.length)}]`, specification?.title ?? '');
        formdata.append(`s_value[${(specifivalue?.length)}]`, specification?.value?.split(',') ?? '');
      }
      if (specifivalue?.length > 0) {
        specifivalue.map((val, index) => {
          formdata.append(`s_title[${(index)}]`, val?.title ?? '');
          formdata.append(`s_value[${(index)}]`, val?.value?.split(',') ?? '');
          // formdata.append(`s_title[${((specifivalue?.length - 1) - index) + 1}]`, val?.title ?? '');
          //  formdata.append(`s_value[${((specifivalue?.length - 1) - index) + 1}]`, val?.value?.split(',') ?? '');
          // val?.id && formdata.append(`name_old_${val?.id}`, val?.name);
          // val?.id && formdata.append(`value_old_${val?.id}`, val?.values);
        })
      }

      let body = {
        user_id: id,
        s_title: specifivalue?.map(e => e?.name ?? ''),
        s_value: specifivalue?.map(e => e?.values ?? ''),
      }
      // document.getElementById('openloaderModal')?.click()
      setOpen(true)
      const response = await sellerSpec(formdata)
      setOpen(false)
      if (response.status == 200) {
        // document.getElementById('closeloaderModal')?.click();
        toast.info('SAVE SUCCESSFULL', {
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
        // document.getElementById('closeloaderModal')?.click();
        toast.error('Somthing Went Wrong!', {
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
      // document.getElementById('closeloaderModal')?.click();
      setOpen(false)
      console.error("err", error.message)
      toast.error('Somthing Went Wrong!', {
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

  useEffect(() => {
    fetchSellerData();
  }, [])


  const profileForm = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email('Invalid email format'),
    maritial_status: Yup.string(),
    occupation: Yup.string(),
    address: Yup.string(),
    // dob:Yup.string(),
    country: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    area: Yup.string(),
    zipcode: Yup.string(),
    user_about: Yup.string(),
    alternate_phone: Yup.string(),
    home_landline_1: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    home_landline_2: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    office_landline_1: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    office_landline_2: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    company_name: Yup.string(),
    primary_mobile: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    primary_mobile2: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    secondary_mobile: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    secondary_mobile2: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    whatsapp: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    landline: Yup.string(),
    company_email: Yup.string().email(),
    office_country: Yup.string(),
    office_state: Yup.string(),
    office_city: Yup.string(),
    office_area: Yup.string(),
    address: Yup.string(),
    landmark: Yup.string(),
    website: Yup.string(),
    office_zipcode: Yup.string(),
    tags: Yup.string(),
    dd: Yup.string(),
    mm: Yup.string(),
    yyy: Yup.string()
  })

  const formik = useFormik({
    initialValues,
    validationSchema: profileForm,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      var userId = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
      var roleId = '';
      try {

        const body = {
          'name': values.name,
          'email': values.email,
          'maritial_status': values.maritial_status,
          'occupation': values.occupation,
          'address': values.address,
          'dob': values.yyy + '-' + values.mm + '-' + values.dd,
          'country': values.country,
          'state': values.state,
          'city': values.city,
          'area': values.area,
          'zipcode': values.zipcode,
          'user_about': values.user_about,
          'alternate_phone': values.alternate_phone,
          'home_landline_1': values.home_landline_1,
          'home_landline_2': values.home_landline_2,
          'office_landline_1': values.office_landline_1,
          'office_landline_2': values.office_landline_2,
          'company_name': values.company_name,
          'primary_mobile': values.primary_mobile,
          'primary_mobile2': values.primary_mobile2,
          'secondary_mobile': values.secondary_mobile,
          'secondary_mobile2': values.secondary_mobile2,
          'whatsapp': values.whatsapp,
          'landline': values.landline,
          'company_email': values.company_email,
          'office_country': values.office_country,
          'office_state': values.office_state,
          'office_city': values.office_city,
          'office_area': values.office_area,
          'address': values.address,
          'landmark': values.landmark,
          'website': values.website,
          'office_zipcode': values.office_zipcode,
          'tags': values.tags,
          'image': image,
          // 'sellerImages':mulimg,
          // 'sellerVideos':video
        }

        var formdata = new FormData()
        Object.entries(body).forEach(([key, value]) => {
          formdata.append(key, value)
        })

        if (mulimg.length != 0) {
          for (let i = 0; i < mulimg.length; i++) {
            formdata.append(`sellerImages[${i}]`, mulimg[i]);
          }
        }
        if (video.length != 0) {
          for (let i = 0; i < video.length; i++) {
            formdata.append(`sellerVideos[${i}]`, video[i]);
          }
        }


        //  const id = JSON.parse(sessionStorage.getItem('data')).id
        // document.getElementById('openloaderModal')?.click()
      setOpen(true)
        const response = await UpdateProfileData(userId, formdata)
        // document.getElementById('closeloaderModal')?.click();
      setOpen(false)
        if (response.status == 200) {
          toast.info('UPDATE SUCCESSFULL', {
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
          toast.error('Somthing Went Wrong!', {
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

        console.error(error)
        alert(error)
        setStatus('The details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    }
  })

  const form1valid = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone is required').min(7, "Phone number must be at least 7 Digits"),
    home_landline_1: Yup.string().notRequired(),
    home_landline_2: Yup.string().notRequired(),
    // office_landline_1: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    // office_landline_2: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    primary_mobile: Yup.string().notRequired(),
    primary_mobile2: Yup.string().notRequired(),
    secondary_mobile: Yup.string().notRequired(),
    alternate_phone: Yup.string().notRequired(),
  })

  const form2valid = Yup.object().shape({
    user_about: Yup.string().required('Please Enter about your Company'),
    // user_about: Yup.string(),
    address: Yup.string().required('Address is required'),
  })

  const form3valid = Yup.object().shape({
    company_name: Yup.string().required('company name is required'),
    primary_mobile: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    secondary_mobile: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    whatsapp: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    landline: Yup.string().min(7, "Phone number must be at least 7 Digits"),
    company_email: Yup.string().email().required('email is required'),
    office_country: Yup.string().required('country is required'),
    office_state: Yup.string(),
    office_city: Yup.string(),
    office_area: Yup.string(),
    address: Yup.string(),
    landmark: Yup.string(),
    website: Yup.string(),
    office_zipcode: Yup.string(),
    tags: Yup.string(),
    image: Yup.string(),
  })

  const formik1 = useFormik({
    initialValues,
    validationSchema: form1valid,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      var userId = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
      try {
        const body = {
          "name": values.name,
          "maritial_status": values.maritial_status,
          "occupation": values.occupation,
          "dob": values.yyy + '-' + values.mm + '-' + values.dd,
          "email": values.email,
          "home_landline_1": values.home_landline_1,
          "home_landline_2": values.home_landline_2,
          "phone": values.phone,
          "alternate_phone": values.alternate_phone,
        }

        let formdata = new FormData()

        Object.entries(body).forEach(([key, value]) => {
          formdata.append(`${key}`, value)
        })


        if (mulimg.length != 0) {
          for (let i = 0; i < mulimg.length; i++) {
            formdata.append(`sellerImages[${i}]`, mulimg[i]);
          }
        }
        console.log('sdjhgdsdj', formdata)

        // document.getElementById('openloaderModal')?.click()
      setOpen(true)
        const response = await UpdateProfile1(userId, formdata)
        // document.getElementById('closeloaderModal')?.click();
      setOpen(false)
        if (response.status == 200) {
          let jfydf = JSON.parse(localStorage.getItem('data'));
          let fjgkjdsf = {
            ...jfydf, "name": values.name,
            "maritial_status": values.maritial_status,
            "occupation": values.occupation,
            "dob": values.yyy + '-' + values.mm + '-' + values.dd,
            "email": values.email,
            "home_landline_1": values.home_landline_1,
            "home_landline_2": values.home_landline_2,
            "phone": values.phone,
            "alternate_phone": values.alternate_phone
          }
          setUserData(fjgkjdsf)
          localStorage.setItem('data', JSON.stringify(fjgkjdsf))
          toast.info('UPDATED SUCCESSFULL', {
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
          toast.error('Somthing Went Wrong!', {
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
        console.error(error)
        // document.getElementById('closeloaderModal')?.click();
      setOpen(false)
        // alert(error)
        setStatus('The details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    }
  })



  const formik2 = useFormik({
    initialValues,
    validationSchema: form2valid,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {

      var userId = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
      try {

        // alert()
        const body = {
          "country": values.country,
          "state": values.state,
          "city": values.city,
          "area": values.area,
          "zipcode": values.zipcode,
          "user_about": values.user_about,
          "address": values.address,
          "image": image,
          "brochure": brocher
        }

        var formdata = new FormData()
        Object.entries(body).forEach(([key, value]) => {
          formdata.append(key, value)
        })
        // document.getElementById('openloaderModal')?.click()
      setOpen(true)
        const response = await UpdateProfile2(userId, formdata)
        // document.getElementById('closeloaderModal')?.click();
      setOpen(false)

        if (response.status == 200) {
          console.log('fggfgf', response)
          let jfydf = JSON.parse(localStorage.getItem('data'));
          let fjgkjdsf = {
            ...jfydf, "country": values.country,
            "state": values.state,
            "city": values.city,
            "area": values.area,
            "zipcode": values.zipcode,
            "user_about": values.user_about,
            "address": values.address,
            "user_image": response?.data?.user_image
          }
          setUserData(fjgkjdsf)
          localStorage.setItem('data', JSON.stringify(fjgkjdsf))
          toast.info('UPDATED SUCCESSFULL', {
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
          toast.error('Somthing Went Wrong!', {
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
        console.error(error)
        alert(error)
        setStatus('The details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    }
  })

  const formik3 = useFormik({
    initialValues,
    validationSchema: form3valid,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      var userId = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
      try {
        const body = {
          "company_name": values.company_name,
          'primary_mobile': values.primary_mobile,
          'secondary_mobile': values.secondary_mobile,
          'whatsapp': values.whatsapp,
          'landline': values.landline,
          'company_email': values.company_email,
          'office_country': values.office_country,
          'office_state': values.office_state,
          'area': values.office_area,
          'office_city': values.office_city,
          // 'office_country':values.office_country,
          // 'office_state':values.office_state,
          // 'office_city':values.office_city,
          // 'office_area':values.office_area,
          'address': values.address,
          'landmark': values.landmark,
          'website': values.website,
          'office_zipcode': values.office_zipcode,
          'tags': Tagvalue,
          // 'image':image,
        }

        var formdata = new FormData()
        Object.entries(body).forEach(([key, value]) => {
          formdata.append(key, value)
        })

        if (mulimg.length != 0) {
          for (let i = 0; i < mulimg.length; i++) {
            formdata.append(`sellerImages[${i}]`, mulimg[i]);
          }
        }
        // if (video.length != 0) {
        //   for (let i = 0; i < video.length; i++) {
        //     formdata.append(`sellerVideos[${i}]`, video[i]);
        //   }
        // }
        // document.getElementById('closeloaderModal')?.click();
      setOpen(true)
        const response = await UpdateProfile3(userId, formdata)
        // document.getElementById('closeloaderModal')?.click();
      setOpen(false)


        // const responce2 =- await UpdateSellerVidoes()

        if (response.status == 200) {
          toast.info('UPDATED SUCCESSFULL', {
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
          toast.error('Somthing Went Wrong!', {
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
        console.error(error)
        alert(error)
        setStatus('The details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    }
  })




  const submitVideos = async () => {
    try {
      var userId = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
      var formdata = new FormData()
      if (video.length != 0) {
        for (let i = 0; i < video.length; i++) {
          formdata.append(`sellerVideos[${i}]`, video[i]);
        }
      }
      // document.getElementById('openloaderModal')?.click()
      setOpen(true)
      setuploded(true)
      const responce = await UpdateSellerVidoes(userId, formdata);
      // document.getElementById('closeloaderModal')?.click();
      setOpen(false)
      if (responce.status == 200) {
        setuploded(false)
        toast.info('UPDATED SUCCESSFULL', {
          position: "bottom-right",
          autoClose: 2000,
          icon: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        // document.getElementById('closeloaderModal')?.click();
      setOpen(false)
        toast.error('Somthing Went Wrong!', {
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
      console.log('err', err.message)
      // document.getElementById('closeloaderModal')?.click();
      setOpen(false)
    }
  }

  
  
  const [bannerurl, setbannerurl] = useState()
  const [bannerErr, setbannerErr] = useState(false)

  function isHttpValid(str) {
    try {
      const newUrl = new URL(str);
      return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
      return false;
    }
  }

  // console.log("ghfjgjh",isHttpValid('https://www.ddfdffdfdff.com/'))
  
  const SaveBanners = async () => {
    var userId = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
    var formdata = new FormData()
    formdata.append(`user_id`, userId);
    formdata.append(`url`, bannerurl);
    if (mulimg.length > 0) {
      for (let i = 0; i < mulimg.length; i++) {
        formdata.append(`image[${i}]`, mulimg[i]);
      }
    }

    // document.getElementById('openloaderModal')?.click()
    setOpen(true)
    setuploded(true)
    const responce = await postBanners(formdata);
    // document.getElementById('closeloaderModal')?.click();
    setOpen(false)
    if (responce.status == 200) {
      setuploded(false)
      toast.info(responce?.data ?? 'SUCCESSFULL', {
        position: "bottom-right",
        autoClose: 2000,
        icon: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setmuImg('');
    } else {
      toast.error('Somthing Went Wrong!', {
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

  const isValidFileUploaded = (file) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const isValidFileUploaded2 = (file) => {
    const validExtensions = ["mp4", "avi"];
    const fileExtension = file.type?.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleMulimg = (e) => {
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
        if (file.length <= 12) {
          setmuImg(file);
        } else {
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

  const hanleprofile = (e) => {
    try {
      setImage(e.target.files[0])
      setPreimage(URL.createObjectURL(e.target.files[0]))
    } catch (err) {
      console.error('err', err.message)
    }
  }

  const isValidFileCheck = (file) => {
    const validExtensions = ["pdf", "doc"];
    const fileExtension = file.type?.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const hanleBroucher = (e) => {
    try {
      const file = e.target.files[0];
      if (isValidFileCheck(file)) {
        setbrocher(e.target.files[0])
      } else {
        toast.error("pdf and doc format only accepted!", {
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
      // setPreimage(URL.createObjectURL(e.target.files[0]))
      // console.log('yyyyy',e.target.files[0])
    } catch (err) {
      console.error('err', err.message)
    }
  }

  const handleBanner = (e) => {
    try {
      setbannerslist(e.target.files[0])
      // setPreimage(URL.createObjectURL(e.target.files[0]))
      // console.log('yyyyy',e.target.files[0])
    } catch (err) {
      console.error('err', err.message)
    }
  }


  return (
    <>
     <Backdrop
        sx={{ color: '#fff', height: '100vh', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isLoading && (
        <div className="loader-wrapper">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      )
      }
      <Seo title={`Profile`} />
      <section className="Edit-profile mb-5 mt-3">
        <Container>
          {/* </form> */}
          <div className="d-flex justify-content-end align-items-center mb-4 d-none">
            <Link href='/page/account/branches'>
              <button type="button" className="btn btn_header px-3 py-2">{'BRANCHES'}</button>
            </Link>
          </div>
          {
            sellerData?.customer_id &&
            <div className="d-flex justify-content-start align-items-center mb-4 ">
              <div className="card  p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Customer Id : </h4>
                  <h4 className="mb-0">&nbsp;{sellerData?.customer_id}</h4>
                </div>
              </div>
            </div>
          }
          {/* <form onSubmit={formik.handleSubmit}> */}
          <Row className="mb-4">
            <Col xl="6" className="mb-xl-0 mb-4 ">
              <form className="h-100" onSubmit={formik1.handleSubmit}>
                <div className="card profile-edit p-3 shadow-sm h-100">
                  <div className="text-start">
                    <h3 className="fw-bold mt-2 mb-4">
                      {t('Please Provide Your Company Details')}
                    </h3>
                  </div>
                  <div className="d-flex flex-column justify-content-betweem h-100" >
                    <div className="row mt-2 mb-auto">
                      {/* <div className=" col-12"> */}
                      <div className="col-md-6 mb-3">
                        <div className="">
                          <label className="form-label">{t('Company Name')}</label>
                          <div className="col-4 fotn-jdh d-none">
                            <select
                              className="form-select text-muted"
                              aria-label="Default select example"
                            >
                              <option selected className="text-muted">
                                Mr{" "}
                              </option>
                            </select>
                          </div>
                          <div className="">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t("Enter your company name")}
                              {...formik1.getFieldProps('name')}
                            />
                            {formik1.touched.name && formik1.errors.name && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert' className='text-danger'>{formik1.errors.name}</span>
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>

                      <div className="col-md-6 mb-3 d-none">
                        <div className=" ">
                          <label className="form-label">{t('Middle Name')}</label>
                          <input
                            type="text"
                            className="form-control w-100"
                            placeholder={t("Enter Middle Name")}
                            {...formik1.getFieldProps('Middle_name')}
                          />
                          {formik1.touched.Middle_name && formik1.errors.Middle_name && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.Middle_name}</span>
                              </div>
                            </div>
                          )}
                        </div></div>

                      <div className="col-md-6 mb-3 d-none">
                        <div className=" ">
                          <label className="form-label">{t('Last Name')}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("Enter Last name")}
                            {...formik1.getFieldProps('last_name')}
                          />
                          {formik1.touched.last_name && formik1.errors.last_name && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.last_name}</span>
                              </div>
                            </div>
                          )}
                        </div></div>


                      <div className="col-md-6 mb-3">
                        <label for="basic-url" className="form-label">
                          {t('Email Address')}
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            // className="form-control form_hgssg"
                            className="form-control"
                            placeholder={t("Enter email")}
                            aria-describedby="basic-addon2"
                            {...formik1.getFieldProps('email')}
                          />
                          {/* <button type='button' className="input-group-text btn_hgssg" id="basic-addon2">
                    <span> {t('Verify')}</span> 
                    </button>
                    <button type='button' className="border-0 rounded bg-grey my-0 mx-2 p-2 btn-hjgskpo">+</button> */}
                        </div>
                        {formik1.touched.email && formik1.errors.email && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.email}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className=" col-md-6 mb-3">
                        <label className="form-label">
                          {t('Primary Mobile Number')}
                        </label>
                        <div className="input-group  d-flex ">
                          {/* <select className="fmr" >
                       <option >+974</option>
                       </select> */}
                          <input
                            type="text"
                            className="form-control rounded-3"
                            aria-label="Text input with dropdown button "
                            {...formik1.getFieldProps('phone')}
                            maxLength={15}
                            onChange={(e) => formik1.setFieldValue("phone", e.target?.value.replace(/[^0-9]/g, ""))}
                          />
                          <div className=" " >
                            {/* <span  className="verfy pb-1 px-2">verify</span> */}
                          </div>
                        </div>
                        {formik1.touched.phone && formik1.errors.phone && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.phone}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          {t('Secondary Mobile Number')}
                        </label>
                        <div className="">
                          <div className="input-group  d-flex justify-content-between align-items-center">
                            {/* <select className="fmr">
                       <option >+974</option>
                       </select> */}
                            <input
                              type="text"
                              className="form-control "
                              aria-label="Text input with dropdown button "
                              {...formik1.getFieldProps('alternate_phone')}
                              maxLength={15}
                              onChange={(e) => formik1.setFieldValue("alternate_phone", e.target?.value.replace(/[^0-9]/g, ""))}
                            />
                            {/* <div className=" " >
                        <button type='button'  className="border-0 verfy px-3">verify</button>
                        </div> */}
                          </div>
                          {formik1.touched.alternate_phone && formik1.errors.alternate_phone && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.alternate_phone}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>


                      <div className="col-md-6 mb-3 d-none">
                        <div className=" ">
                          <label className="form-label">{t('Marital Status')}</label>
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                            {...formik1.getFieldProps('maritial_status')}
                          >
                            <option selected >Select</option>
                            <option >Married </option>
                            <option >Single </option>
                          </select>
                          {formik1.touched.maritial_status && formik1.errors.maritial_status && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.maritial_status}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>


                      <div className="col-md-6 mb-3 d-none">
                        {/* <div className="row  d-none">
                        <label className="form-label">{t('DOB')}</label>
                        <div className="col-4 fotn-jdh">
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                            {...formik1.getFieldProps('dd')}
                          >
                            <option disabled selected>DD</option>
                            {
                              [...Array(31)].map((x, i) => (
                                <option value={i + 1}>{i + 1}</option>
                              ))
                            }
                          </select>
                          {formik1.touched.dd && formik1.errors.dd && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.dd}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-4 fotn-jdh">
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                            {...formik1.getFieldProps('mm')}
                          >
                            <option disabled selected>MM </option>
                            {
                              [...Array(12)].map((x, i) => (
                                <option value={i + 1}>{i + 1}</option>
                              ))
                            }
                          </select>
                          {formik1.touched.mm && formik1.errors.mm && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.mm}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-4 fotn-jdh">
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                            {...formik1.getFieldProps('yyy')}
                          >
                            <option disabled selected>YYYY </option>
                            {
                              [...Array(70)].map((x, i) => (
                                <option value={i + 1950}>{i + 1950}</option>
                              ))
                            }
                          </select>
                          {formik1.touched.yyy && formik1.errors.yyy && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.yyy}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div> */}

                        <div className="row">
                          <label className="form-label">{t('DOB')}</label>
                          <div className="col-4 fotn-jdh">
                            <input type="text" pattern="-?\d*" {...formik1.getFieldProps('dd')} onChange={(e) => e.target?.value.replace(/[^0-9]/g, "") < 32 && formik1.setFieldValue("dd", e.target?.value.replace(/[^0-9]/g, ""))} placeholder="DD" maxlength="2" size="2" className="date-field form-select" />
                          </div>
                          <div className="col-4 fotn-jdh">
                            <input type="text" pattern="[0-9]*" {...formik1.getFieldProps('mm')} onChange={(e) => e.target?.value.replace(/[^0-9]/g, "") < 13 && formik1.setFieldValue("mm", e.target?.value.replace(/[^0-9]/g, ""))} maxlength="2" placeholder="MM" size="2" className="date-field form-select" />
                          </div>
                          <div className="col-4 fotn-jdh">
                            <input type="text" pattern="[0-9]*"  {...formik1.getFieldProps('yyy')} onChange={(e) => e.target?.value.replace(/[^0-9]/g, "") < 2023 && formik1.setFieldValue("yyy", e.target?.value.replace(/[^0-9]/g, ""))} maxlength="4" size="4" placeholder="YYYY" className="date-field form-select date-field--year" />
                          </div>
                        </div >

                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">{t('Home Landline')} 1</label>
                        <div className="row">
                          <div className="col-3">
                            <input type="text" className="form-control text-center" {...formik1.getFieldProps('std1')} value="STD" />
                          </div>
                          <div className="col-9 ps-0">
                            <input type="text" className="form-control" {...formik1.getFieldProps('home_landline_1')}
                              maxLength='10' onChange={(e) => formik1.setFieldValue("home_landline_1", e.target?.value.replace(/[^0-9]/g, ""))}
                            />
                            {formik1.touched.home_landline_1 && formik1.errors.home_landline_1 && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert' className='text-danger'>{formik1.errors.home_landline_1}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">{t('Home Landline')} 2</label>
                        <div className="row">
                          <div className="col-3">
                            <input type="text" className="form-control text-center" {...formik1.getFieldProps('std2')} value="STD" />
                          </div>
                          <div className="col-9 ps-0">
                            <input type="text" className="form-control " {...formik1.getFieldProps('home_landline_2')}
                              maxLength='10' onChange={(e) => formik1.setFieldValue("home_landline_2", e.target?.value.replace(/[^0-9]/g, ""))}
                            />
                          </div>
                        </div>
                        {formik1.touched.home_landline_2 && formik1.errors.home_landline_2 && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.home_landline_2}</span>
                            </div>
                          </div>
                        )}
                      </div>


                      <div className="col-md-6  mb-3">
                        <div className=" ">
                          <label className="form-label">{t('Occupation')}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("Enter your Occupation")}
                            {...formik1.getFieldProps('occupation')}
                          />
                          {formik1.touched.occupation && formik1.errors.occupation && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.occupation}</span>
                              </div>
                            </div>
                          )}
                        </div></div>

                      <div className="mb-3 col-md-6">
                        <label className="form-label">{t('Gallery')}</label>
                        <input
                          type="file"
                          className="form-control"
                          multiple="multiple"
                          onChange={(e) => handleMulimg(e)}
                        />
                      </div>


                    </div>
                    <div className=" text-end mt-3">
                      <button type="submit" className="btn btn_header" disabled={formik1.isSubmitting}>
                        {" "}
                        {t('save & Continue')}
                      </button>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </form>
            </Col>

            <Col xl="6">
              <form className="h-100" onSubmit={formik2.handleSubmit}>
                <div className="card profile-edit p-sm-4 p-3 shadow-sm  h-100">
                  <div className="row p-edit mx-0">
                    <div className="col-sm-3 col-5 ps-0 ">
                      <img
                        src={preimage}
                        className="profile_img1 p-3"
                        onError={(e) => e.currentTarget.src = '/assets/images/tatlub-img/No.jpg'}
                      />
                    </div>
                    <div className="col-sm-9 col-7  d-flex align-items-center ">
                      <div className="w-100">
                        <input
                          className="form-control custom-file-input border-0 w-100"
                          onChange={(e) => hanleprofile(e)}
                          type="file"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="row">


                      <div className="col-md-6 mb-3">
                        <div className="multi_p">
                          <label className="form-label">{t('Country')}</label>
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                            {...formik2.getFieldProps('country')}
                            onChange={(e) => { formik2.setFieldValue('country', e.target.value); fetchState(e.target.value) }}
                          >
                            <option className="">Select Country</option>
                            {
                              countries?.map((data, index) => (
                                <option value={data.id} key={index}>{data.country_name}</option>
                              ))
                            }
                          </select>
                          {/* <MulSelect
                            closeMenuOnSelect={true}
                            isSearchable={false}
                            name="country"
                            placeholder={t('Select Country')}
                            onChange={(e) => {
                              formik2.setFieldValue(
                                "country",
                                e.id
                              );
                              fetchState(e.id);
                            }}
                            options={countries}
                            getOptionLabel={(option) => `${option.country_name}`}
                            getOptionValue={(option) => option.id}
                            className="Select"
                            // classNamePrefix="select"
                          /> */}

                          {formik2.touched.country && formik2.errors.country && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik2.errors.country}</span>
                              </div>
                            </div>
                          )}
                        </div></div>

                      <div className="col-md-6 mb-3">
                        <div className=" ">
                          <label className="form-label">{t('State')}</label>
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                            {...formik2.getFieldProps('state')}
                            onChange={(e) => { formik2.setFieldValue('state', e.target.value); fetchCity(e.target.value) }}
                          >
                            <option className="">Select State</option>
                            {
                              state?.map((data, index) => (
                                <option value={data.id} key={index}>{data.state_name}</option>
                              ))
                            }
                          </select>
                          {formik2.touched.state && formik2.errors.state && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik2.errors.state}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <div className=" ">
                          <label className="form-label">{t('City')}</label>
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                            {...formik2.getFieldProps('city')}
                          >
                            <option selected >{t('Select City')} </option>
                            {
                              city?.map((data, index) => (
                                <option value={data.id} key={index}>{data.city_name}</option>
                              ))
                            }
                          </select>
                          {formik2.touched.city && formik2.errors.city && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik2.errors.city}</span>
                              </div>
                            </div>
                          )}
                        </div></div>

                      <div className="col-md-6 mb-3 d-none">
                        <div className=" ">
                          <label className="form-label">{t('Area')}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("Enter your area")}
                            {...formik2.getFieldProps('area')}
                          />
                          {formik2.touched.area && formik2.errors.area && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik2.errors.area}</span>
                              </div>
                            </div>
                          )}
                        </div></div>

                      <div className="col-md-6 mb-3  ">
                        <div className=" ">
                          <label className="form-label">{t('Zipcode')}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("Enter your zipcode")}
                            {...formik2.getFieldProps('zipcode')}
                          />
                          {formik2.touched.zipcode && formik2.errors.zipcode && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik2.errors.zipcode}</span>
                              </div>
                            </div>
                          )}
                        </div></div> 



                        <div className="col-md-6 mb-3">
                        <div className=" ">
                          <label className="form-label">{t('Address')}</label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder={t("Enter your Address")}
                            {...formik2.getFieldProps('address')}
                          />
                          {formik2.touched.address && formik2.errors.address && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik2.errors.address}</span>
                              </div>
                            </div>
                          )}
                        </div></div>

                        <div className="col-md-6 mb-2 ">
                        <div className=" ">
                          <label className="form-label">{t('About')}</label>
                          <textarea className="form-control" {...formik2.getFieldProps('user_about')} />
                          {formik2.touched.user_about && formik2.errors.user_about && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik2.errors.user_about}</span>
                              </div>
                            </div>
                          )}
                        </div></div>


                        <div className="col-md-12 mb-3 ">
                        <div className=" ">
                          <label className="form-label">{t('Brochure')}</label>
                          <input
                            type="file"
                            // value={brocher ?? ''}
                            className="form-control"
                            onChange={(e) => hanleBroucher(e)}
                          />
                        </div></div>




                    </div>

                  </div>
                  <div className="text-end mt-2">
                    <button type="submit" className="btn btn_header">
                      {" "}
                      {t('save & Continue')}
                    </button>
                  </div>

                </div>
              </form>
            </Col>
          </Row>

          <div className="card profile-edit p-3 mt-3 mb-4 shadow-sm">
            <form onSubmit={(e) => e.defaultPrevented()} >
              <div className=" col-12">
                <label
                  for="exampleFormControlInput1"
                  className="form-label"
                >
                  {t("Specification")}
                </label>
                <div className=" row mb-3 " >
                  <div className="col-md-5 col-sm-6 mb-3">
                    <input className="form-control" placeholder={t("Title")} value={specification?.title} name='title' onChange={(e) => handleSpecification(e)} />
                  </div>
                  <div className="col-md-5 col-sm-6 mb-3">
                    <input className="form-control" disabled={!specification?.title} placeholder={t("Value")} name="value" value={specification?.value} onChange={(e) => handleSpecification(e)} />
                  </div>
                  <div className="col-md-2">
                    <button type="submit" disabled={specification?.title && specification?.value ? false : true} className="btn d-none btn-theme rounded fw-light w-100" onClick={() => { setSpecifivalue((v) => [...v, specification]); setSpecification({ title: "", value: "" }) }}>{t("ADD")}</button>
                    <button type="button" disabled={!specifivalue?.length > 0} className="btn btn-theme rounded fw-light w-100" onClick={() => { setSpecification({ title: "", value: "" }); handleCompanySpc() }}>{t("SAVE DETAILS")}</button>
                  </div>
                </div>
                {
                  specifivalue.map((spec, key) => (
                    <div className=" row mb-3" key={key}>
                      <div className="col-md-5 col-sm-6 mb-3">
                        <input className="form-control" value={spec?.title} onChange={(e) => handleUptodat(e, key)} name='title' placeholder={t("Title")} />
                      </div>
                      <div className="col-md-5 col-sm-6 mb-3">
                        <input className="form-control" value={spec?.value} disabled={!spec?.title} onChange={(e) => handleUptodat(e, key)} placeholder={t("value")} name="value" />
                      </div>
                      <div className="col-md-2">
                        <button type="button" className="btn btn-theme rounded fw-light w-100" onClick={() => {
                          setSpecify(specify - 1);
                          let newArr = specifivalue.filter((item) => item != specifivalue[key])
                          setSpecifivalue(newArr);
                          spec?.id && removerSpec(spec?.id)
                        }}>{t("REMOVE")}</button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </form>
          </div>

          <div className="card profile-edit p-3 mt-3 mb-4 shadow-sm">
            <div className="row">
              <label className="form-label">{t('ADDONS BANNERS')}</label>
              <div className="mb-3 col-md-4 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("Enter Banner url")}
                  onChange={(e) => { setbannerurl(e.target.value) }}
                />
                {
                  // !bannerErr ?
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert' className='text-warning'>{t('you must be enter prefix')} : https://</span>
                    </div>
                  </div>
                  // :
                  //   <div className='fv-plugins-message-container'>
                  //   <div className='fv-help-block'>
                  //   <span role='alert' className='text-danger'>Enter Valid URL</span>
                  //   </div>
                  //   </div>
                }
              </div>
              <div className="mb-3 col-md-8 ">
                <div className="input-group">
                  <input
                    type="file"
                    // value={mulimg}
                    className="form-control "
                    multiple="multiple"
                    // accept="video/*"
                    onChange={(e) => handleMulimg(e)}
                  />
                  <button type="button" onClick={() => SaveBanners()} className="btn btn_header px-4 py-1 input-group-text">
                    {" "}
                    {t('SAVE DETAILS')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card profile-edit p-3 mt-3 shadow-sm">
            <div className="row">
              <label className="form-label">{t('Videos')}</label>
              <div className="mb-3 col-md-6 input-group">
                <input
                  type="file"
                  className="form-control "
                  multiple="multiple"
                  accept="video/*"
                  onChange={(e) => handleVideo(e)}
                />
                <button type="button" onClick={() => submitVideos()} className="btn btn_header px-4 py-1 input-group-text">
                  {" "}
                  {t('SAVE DETAILS')}
                </button>
              </div>
            </div>
          </div>

        </Container>
      </section>

      <section className="Edit-profile mb-5 mt-3 d-none">
        <Container>
          {/* </form> */}
          <div className="d-flex justify-content-end align-items-center mb-4 d-none">
            <Link href='/page/account/branches'>
              <button type="button" className="btn btn_header px-3 py-2">{'BRANCHES'}</button>
            </Link>
          </div>

          {/* <form onSubmit={formik.handleSubmit}> */}
          <Row className="mb-4">
            <Col xl="6" className="mb-xl-0 mb-4 ">
              <form className="h-100" onSubmit={formik1.handleSubmit}>
                <div className="card profile-edit p-sm-4 p-3 shadow-sm h-100">
                  <div className="text-start">
                    <h4 className="fw-bold">
                      {t('Please Provide Your Personal Details')}
                    </h4>
                  </div>
                  <div className="row g-3 mt-2">
                    {/* <div className=" col-12"> */}
                    <div className="col-md-6 mb-2">
                      <div className="  row">
                        <label className="form-label">{t('First Name')}</label>
                        <div className="col-4 fotn-jdh">
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                          >
                            <option selected className="text-muted">
                              Mr{" "}
                            </option>
                          </select>
                        </div>
                        <div className="col-8">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("Enter your First name")}
                            {...formik1.getFieldProps('name')}
                          />
                          {formik1.touched.name && formik1.errors.name && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.name}</span>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>

                    <div className="col-md-6 mb-2">
                      <div className=" ">
                        <label className="form-label">{t('Middle Name')}</label>
                        <input
                          type="text"
                          className="form-control w-100"
                          placeholder={t("Enter Middle Name")}
                          {...formik1.getFieldProps('Middle_name')}
                        />
                        {formik1.touched.Middle_name && formik1.errors.Middle_name && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.Middle_name}</span>
                            </div>
                          </div>
                        )}
                      </div></div>

                    <div className="col-md-6 mb-2">
                      <div className=" ">
                        <label className="form-label">{t('Last Name')}</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("Enter Last name")}
                          {...formik1.getFieldProps('last_name')}
                        />
                        {formik1.touched.last_name && formik1.errors.last_name && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.last_name}</span>
                            </div>
                          </div>
                        )}
                      </div></div>

                    <div className="col-md-6 mb-2">
                      <div className=" ">
                        <label className="form-label">{t('Marital Status')}</label>
                        <select
                          className="form-select text-muted"
                          aria-label="Default select example"
                          {...formik1.getFieldProps('maritial_status')}
                        >
                          <option selected >Select Status </option>
                          <option >Married </option>
                          <option >Single </option>
                        </select>
                        {formik1.touched.maritial_status && formik1.errors.maritial_status && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.maritial_status}</span>
                            </div>
                          </div>
                        )}
                      </div></div>

                    <div className="col-md-6 mb-2">
                      <div className=" ">
                        <label className="form-label">{t('Occupation')}</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("Enter your Occupation")}
                          {...formik1.getFieldProps('occupation')}
                        />
                        {formik1.touched.occupation && formik1.errors.occupation && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.occupation}</span>
                            </div>
                          </div>
                        )}
                      </div></div>

                    <div className="col-md-6 mb-2">
                      <div className="row ">
                        <label className="form-label">{t('DOB')}</label>
                        <div className="col-4 fotn-jdh">
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                            {...formik1.getFieldProps('dd')}
                          >
                            <option disabled selected>DD</option>
                            {
                              [...Array(31)].map((x, i) => (
                                <option value={i + 1}>{i + 1}</option>
                              ))
                            }
                          </select>
                          {formik1.touched.dd && formik1.errors.dd && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.dd}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-4 fotn-jdh">
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                            {...formik1.getFieldProps('mm')}
                          >
                            <option disabled selected>MM </option>
                            {
                              [...Array(12)].map((x, i) => (
                                <option value={i + 1}>{i + 1}</option>
                              ))
                            }
                          </select>
                          {formik1.touched.mm && formik1.errors.mm && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.mm}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-4 fotn-jdh">
                          <select
                            className="form-select text-muted"
                            aria-label="Default select example"
                            {...formik1.getFieldProps('yyy')}
                          >
                            <option disabled selected>YYYY </option>
                            {
                              [...Array(70)].map((x, i) => (
                                <option value={i + 1950}>{i + 1950}</option>
                              ))
                            }
                          </select>
                          {formik1.touched.yyy && formik1.errors.yyy && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik1.errors.yyy}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                    <div className="col-md-6 mb-2">
                      <div className=" ">
                        <label className="form-label">{t('Country')}</label>
                        {/* <select
                        className="form-select text-muted"
                        aria-label="Default select example"
                        {...formik1.getFieldProps('country')} 
                        onChange={(e)=>{formik1.setFieldValue('country',e.target.value); fetchState(e.target.value)}}
                      >
                        <option  selected>Select Country</option>
                        {
                      countries?.map((data,index)=> (
                        <option value={data.id} key={index}>{data.country_name}</option>
                        ))
                       }
                      </select> */}
                        <select
                          className="form-select text-muted"
                          aria-label="Default select example"
                          {...formik1.getFieldProps('country')}
                          onChange={(e) => { formik1.setFieldValue('country', e.target.value); fetchState(e.target.value) }}
                        >
                          <option className="">Select Country</option>
                          {
                            countries?.map((data, index) => (
                              <option value={data.id} key={index}>{data.country_name}</option>
                            ))
                          }
                        </select>

                        {formik1.touched.country && formik1.errors.country && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.country}</span>
                            </div>
                          </div>
                        )}
                      </div></div>

                    <div className="col-md-6 mb-2">
                      <div className=" ">
                        <label className="form-label">{t('State')}</label>
                        <select
                          className="form-select text-muted"
                          aria-label="Default select example"
                          {...formik1.getFieldProps('state')}
                          onChange={(e) => { formik1.setFieldValue('state', e.target.value); fetchCity(e.target.value) }}
                        >
                          <option className="">Select State</option>
                          {
                            state?.map((data, index) => (
                              <option value={data.id} key={index}>{data.state_name}</option>
                            ))
                          }
                        </select>
                        {formik1.touched.state && formik1.errors.state && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.state}</span>
                            </div>
                          </div>
                        )}
                      </div></div>

                    <div className="col-md-6 mb-2">
                      <div className=" ">
                        <label className="form-label">{t('City')}</label>
                        <select
                          className="form-select text-muted"
                          aria-label="Default select example"
                          {...formik1.getFieldProps('city')}
                        >
                          <option selected >Select City </option>
                          {
                            city?.map((data, index) => (
                              <option value={data.id} key={index}>{data.city_name}</option>
                            ))
                          }
                        </select>
                        {formik1.touched.city && formik1.errors.city && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.city}</span>
                            </div>
                          </div>
                        )}
                      </div></div>

                    <div className="col-md-6 mb-2">
                      <div className=" ">
                        <label className="form-label">{t('Area')}</label>
                        {/* <select
                        className="form-select text-muted"
                        aria-label="Default select example"
                        {...formik1.getFieldProps('area')} 
                      >
                        <option selected value='0' disabled>Select Area</option>
                        <option  value='1' >Anna Nagar</option>
                      </select> */}
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("Enter your area")}
                          {...formik1.getFieldProps('area')}
                        />
                        {formik1.touched.area && formik1.errors.area && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.area}</span>
                            </div>
                          </div>
                        )}
                      </div></div>




                    <div className="col-md-12 mb-2">
                      <div className=" ">
                        <label className="form-label">{t('About')}</label>
                        <textarea className="form-control" {...formik1.getFieldProps('user_about')} />
                        {formik1.touched.user_about && formik1.errors.user_about && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.user_about}</span>
                            </div>
                          </div>
                        )}
                      </div></div>

                    <div className="col-md-6 mb-2">
                      <div className=" ">
                        <label className="form-label">{t('Zipcode')}</label>
                        <select
                          className="form-select text-muted"
                          aria-label="Default select example"
                          {...formik1.getFieldProps('zipcode')}
                        >
                          <option selected value='0' className="text-muted">
                            Select Zipcode
                          </option>
                          <option value="1" className="text-muted">
                            1
                          </option>
                        </select>
                        {formik1.touched.zipcode && formik1.errors.zipcode && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik1.errors.zipcode}</span>
                            </div>
                          </div>
                        )}
                      </div></div>



                    {/* </div> */}

                    {/* <div className="col-md-6 mb-2 col-12"> */}
                    {/* 
                    <div className=" ">
                      <label className="form-label">State</label>
                      <select
                        className="form-select text-muted"
                        aria-label="Default select example"
                        {...formik1.getFieldProps('state')} 
                        onChange={(e)=>{ formik3.setFieldValue('state',e.target.value); fetchCity(e.target.value)} }
                      >
                        <option className="" value='0'>select State</option>
                        {
                            state?.map((data,index)=> (
                              <option value={data.id} key={index}>{data.state_name}</option>
                            ))
                          }
                      </select>
                      {formik1.touched.state && formik1.errors.state && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik1.errors.state}</span>
                        </div>
                      </div>
                    )}
                    </div> */}


                    <div className="col-md-6 d-flex align-items-end justify-content-end text-end mt-3">
                      <button type="submit" className="btn btn_header">
                        {" "}
                        {t('save & Continue')}
                      </button>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </form>
            </Col>

            <Col xl="6">
              <form className="h-100" onSubmit={formik2.handleSubmit}>
                <div className="card profile-edit p-sm-4 p-3 shadow-sm  h-100">
                  <div className="row p-edit ">
                    <div className="col-sm-3 col-5 ps-0 ">
                      <img
                        src={preimage}
                        className="profile_img1 p-3"
                        onError={(e) => e.currentTarget.src = '/assets/images/tatlub-img/No.jpg'}
                      />
                      {/* <Image src={preimage} alt="Image"  imageClassName="profile_img1 p-3"  onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}   preview /> */}
                    </div>

                    <div className="col-sm-9 col-7 ps-0 d-flex align-items-center ">
                      <div className="w-100">
                        <input
                          className="form-control custom-file-input border-0 w-100"
                          onChange={(e) => hanleprofile(e)}
                          type="file"
                        // {...formik.getFieldProps('image')}
                        />
                      </div>
                      {/* {formik.touched.name && formik.errors.name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.name}</span>
                        </div>
                      </div>
                    )} */}
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="mb-3">
                      <label for="basic-url" className="form-label">
                        {t('Email Address')}
                      </label>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control form_hgssg"
                          placeholder={t("Enter Middle Name")}
                          aria-describedby="basic-addon2"
                          {...formik2.getFieldProps('email')}
                        />
                        <button type='button' className="input-group-text btn_hgssg" id="basic-addon2">
                          <span> {t('Verify')}</span>
                        </button>
                        <button type='button' className="border-0 rounded bg-grey my-0 mx-2 p-2 btn-hjgskpo">+</button>
                      </div>
                      {formik2.touched.email && formik2.errors.email && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert' className='text-danger'>{formik2.errors.email}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="row">
                      {/* <div className="col-md-6 mb-2 col-12"> */}
                      <div className=" col-md-6 mb-3">
                        <label className="form-label">
                          {t('Primary Mobile Number')}
                        </label>
                        <div className="input-group form-control d-flex justify-content-start">
                          <select className="fmr" >
                            <option >+974</option>
                          </select>
                          <input
                            type="text"
                            className="form-mobile ms-2"
                            aria-label="Text input with dropdown button "
                            {...formik2.getFieldProps('phone')}
                            maxLength={15}
                            onChange={(e) => formik2.setFieldValue("phone", e.target?.value.replace(/[^0-9]/g, ""))}
                          />
                          <div className=" " >
                            {/* <span  className="verfy pb-1 px-2">verify</span> */}
                          </div>
                        </div>
                        {formik2.touched.phone && formik2.errors.phone && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik2.errors.phone}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="col-md-6 mb-2 mb-3">
                        <label className="form-label">
                          {t('Secondary Mobile Number')}
                        </label>
                        <div className="mb-3">
                          <div className="input-group form-control d-flex justify-content-between align-items-center p-1">
                            <select className="fmr">
                              <option >+974</option>
                            </select>
                            <input
                              type="text"
                              className="form-mobile"
                              aria-label="Text input with dropdown button "
                              {...formik2.getFieldProps('alternate_phone')}
                              maxLength={15}
                              onChange={(e) => formik2.setFieldValue("alternate_phone", e.target?.value.replace(/[^0-9]/g, ""))}
                            />
                            <div className=" " >
                              <button type='button' className="border-0 verfy px-3">verify</button>
                            </div>
                          </div>
                          {formik2.touched.alternate_phone && formik2.errors.alternate_phone && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik2.errors.alternate_phone}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 mb-2 mb-3">
                        <label className="form-label">{t('Home Landline')} 1</label>
                        <div className="row">
                          <div className="col-3">
                            <input type="text" className="form-control text-center" value="STD" />
                          </div>
                          <div className="col-9 ps-0">
                            <input type="text" className="form-control " {...formik2.getFieldProps('home_landline_1')}
                              maxLength='10' onChange={(e) => formik2.setFieldValue("home_landline_1", e.target?.value.replace(/[^0-9]/g, ""))}
                            />
                            {formik2.touched.home_landline_1 && formik2.errors.home_landline_1 && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert' className='text-danger'>{formik2.errors.home_landline_1}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className="col-md-6 mb-2 mb-3">
                        <label className="form-label">{t('Home Landline')} 2</label>
                        <div className="row">
                          <div className="col-3">
                            <input type="text" className="form-control text-center" value="STD" />
                          </div>
                          <div className="col-9 ps-0">
                            <input type="text" className="form-control " {...formik2.getFieldProps('home_landline_2')}
                              maxLength='10' onChange={(e) => formik2.setFieldValue("home_landline_2", e.target?.value.replace(/[^0-9]/g, ""))}
                            />
                          </div>
                        </div>
                        {formik2.touched.home_landline_2 && formik2.errors.home_landline_2 && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik2.errors.home_landline_2}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="col-md-6 mb-2 mb-3">
                        <label className="form-label">{t('Office Landline')} 1</label>
                        <div className="row">
                          <div className="col-3">
                            <input type="text" className="form-control text-center" value="STD" />
                          </div>
                          <div className="col-9 ps-0">
                            <input type="text" className="form-control " {...formik2.getFieldProps('office_landline_1')}
                              maxLength='10' onChange={(e) => formik2.setFieldValue("office_landline_1", e.target?.value.replace(/[^0-9]/g, ""))}
                            />
                            {formik2.touched.office_landline_1 && formik2.errors.office_landline_1 && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>
                                  <span role='alert' className='text-danger'>{formik2.errors.office_landline_1}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                      {/* </div> */}
                      {/* <div className="col-md-6 mb-2 mb-3 col-12"> */}

                      <div className="col-md-6 mb-2 mb-3">
                        <label className="form-label">{t('Office Landline')} 2</label>
                        <div className="row">
                          <div className="col-3">
                            <input type="text" className="form-control text-center" value="STD" />
                          </div>
                          <div className="col-9 ps-0">
                            <input type="text" className="form-control " {...formik2.getFieldProps('office_landline_2')}
                              maxLength='10' onChange={(e) => formik2.setFieldValue("office_landline_2", e.target?.value.replace(/[^0-9]/g, ""))}
                            />
                          </div>
                        </div>
                        {formik2.touched.office_landline_2 && formik2.errors.office_landline_2 && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert' className='text-danger'>{formik2.errors.office_landline_2}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* </div> */}
                      <div className="text-end mt-3">
                        <button type="submit" className="btn btn_header">
                          {" "}
                          {t('save & Continue')}
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </form>
            </Col>
          </Row>

          <div className="card profile-edit p-3 shadow-sm">
            <div className="text-start mb-4">
              <h4 className="fw-bold">{t('Please Provide Office Address')}</h4>
            </div>
            <form onSubmit={formik3.handleSubmit}>
              <div className="row ">
                {/* <div className="col-lg-3 col-md-6 col-12"> */}

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Company Name')}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("Enter your Company Name")}
                    {...formik3.getFieldProps('company_name')}
                  />
                  {formik3.touched.company_name && formik3.errors.company_name && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.company_name}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Primary Mobile Number')}</label>
                  <div className="d-flex justify-centent-center align-items-center">
                    <div className="input-group form-control d-flex justify-content-start">
                      <select className="fmr" >
                        <option >+974</option>
                      </select>
                      <input
                        type="text"
                        className="form-mobile ms-2"
                        aria-label="Text input with dropdown button "
                        {...formik3.getFieldProps('primary_mobile')}
                        maxLength={15}
                        onChange={(e) => formik3.setFieldValue("primary_mobile", e.target?.value.replace(/[^0-9]/g, ""))}
                      />
                    </div>
                    {/* <span role="button" className="rounded bg-grey  mx-1 p-1">+</span> */}
                    <button type='button' className="rounded bg-grey border-0 btn-hjgskpo mx-1 p-1">+</button>
                  </div>
                  {formik3.touched.primary_mobile && formik3.errors.primary_mobile && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.primary_mobile}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className=" mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Secondary Mobile Number')}</label>
                  <div className="d-flex">
                    <div className="input-group form-control d-flex justify-content-between align-items-center p-1">
                      <select className="fmr" >
                        <option >+974</option>
                      </select>
                      <input
                        type="text"
                        className="form-mobile"
                        aria-label="Text input with dropdown button "
                        {...formik3.getFieldProps('secondary_mobile')}
                        maxLength={15}
                        onChange={(e) => formik3.setFieldValue("secondary_mobile", e.target?.value.replace(/[^0-9]/g, ""))}
                      />
                      <div className="" >
                        <button type='button' className="border-0 verfy px-3"><span>{t('verify')}</span></button>
                      </div>
                    </div>
                    {/* <span className="rounded bg-grey  mx-1 p-1">+</span> */}
                  </div>
                  {formik3.touched.secondary_mobile && formik3.errors.secondary_mobile && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.secondary_mobile}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Whats App Number')}</label>
                  <div className="input-group form-control d-flex justify-content-start ">
                    <select className="fmr" >
                      <option >+974</option>
                    </select>
                    <input
                      type="text"
                      className="form-mobile ms-2"
                      aria-label="Text input with dropdown button "
                      {...formik3.getFieldProps('whatsapp')}
                      maxLength={15}
                      onChange={(e) => formik3.setFieldValue("whatsapp", e.target?.value.replace(/[^0-9]/g, ""))}
                    />
                    <div className=" " >
                      {/* <span  className="verfy pb-1 px-2">verify</span> */}
                    </div>
                  </div>
                  {formik3.touched.whatsapp && formik3.errors.whatsapp && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.whatsapp}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Landline')}</label>
                  <input type="text" className="form-control" {...formik3.getFieldProps('landline')}
                    maxLength={10}
                    onChange={(e) => formik3.setFieldValue("landline", e.target?.value.replace(/[^0-9]/g, ""))}
                  />
                  {formik3.touched.landline && formik3.errors.landline && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.landline}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Email Address')}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("Enter your email")}
                    {...formik3.getFieldProps('company_email')}
                  />
                  {formik3.touched.company_email && formik3.errors.company_email && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.company_email}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Country')}</label>
                  <select
                    className="form-select text-muted"
                    aria-label="Default select example"
                    {...formik3.getFieldProps('office_country')}
                    onChange={(e) => { formik3.setFieldValue('office_country', e.target.value); fetchState(e.target.value) }}
                  >
                    <option className="">Select Country</option>
                    {
                      countries?.map((data, index) => (
                        <option value={data.id} key={index}>{data.country_name}</option>
                      ))
                    }
                  </select>
                  {formik3.touched.office_country && formik3.errors.office_country && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.office_country}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('State')}</label>
                  <select
                    className="form-select text-muted"
                    aria-label="Default select example"
                    {...formik3.getFieldProps('office_state')}
                    onChange={(e) => { formik3.setFieldValue('office_state', e.target.value); fetchCity(e.target.value) }}
                  >
                    <option className="">Select State</option>
                    {
                      state?.map((data, index) => (
                        <option value={data.id} key={index}>{data.state_name}</option>
                      ))
                    }
                  </select>
                  {formik3.touched.office_state && formik3.errors.office_state && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.office_state}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('City')}</label>
                  <select
                    className="form-select text-muted"
                    aria-label="Default select example"
                    {...formik3.getFieldProps('office_city')}
                  >
                    <option selected>Select City</option>
                    {
                      city?.map((data, index) => (
                        <option value={data.id} key={index}>{data.city_name}</option>
                      ))
                    }
                  </select>
                  {formik3.touched.office_city && formik3.errors.office_city && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.office_city}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Area')}</label>
                  {/* <select
                    className="form-select text-muted"
                    aria-label="Default select example"
                    {...formik3.getFieldProps('office_area')}
                  >
                    <option className="">Select area</option>
                  </select> */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("Enter your area")}
                    {...formik3.getFieldProps('office_area')}
                  />
                  {formik3.touched.office_area && formik3.errors.office_area && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.office_area}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Address')}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("Enter your Address")}
                    {...formik3.getFieldProps('address')}
                  />
                  {formik3.touched.address && formik3.errors.address && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.address}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Landmark')}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("Enter your Landmark")}
                    {...formik3.getFieldProps('landmark')}
                  />
                  {formik3.touched.landmark && formik3.errors.landmark && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.landmark}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Zipcode')}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("Enter your Zipcode")}
                    {...formik3.getFieldProps('office_zipcode')}
                  />
                  {formik3.touched.office_zipcode && formik3.errors.office_zipcode && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.office_zipcode}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* </div> */}

                {/* <div className="col-lg-3 col-md-6 col-12"> */}

                {/* <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Tags')}</label>
                  <select
                    className="form-select text-muted"
                    aria-label="Default select example"
                    {...formik3.getFieldProps('tags')}
                  >
                    <option className="" value='0'>Select Tags</option>
                    <option className="" value='1'>Tags One</option>
                  </select>
                  {formik3.touched.tags && formik3.errors.tags && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik3.errors.tags}</span>
                        </div>
                      </div>
                    )}
                </div> */}

                {/* </div> */}

                {/* <div className="col-lg-3 col-md-6 col-12"> */}

                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Images')}</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple="multiple"
                    onChange={(e) => handleMulimg(e)}
                  />
                </div>

                {/* </div> */}

                {/* <div className="col-lg-3 col-md-6 col-12"> */}

                {/* <div className="mb-3">
                <label className="form-label">Videos</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple="multiple"
                    accept="video/*"
                    onChange={(e) => handleVideo(e)}
                  />
              </div> */}
                {/* </div> */}


                <div className="mb-3 col-lg-3 col-md-6">
                  <label className="form-label">{t('Website')}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("Enter your Website")}
                    {...formik3.getFieldProps('website')}
                  />
                  {formik3.touched.website && formik3.errors.website && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.website}</span>
                      </div>
                    </div>
                  )}
                </div>


                <div className="mb-3 col-lg-8 col-md-6 proFile_tag">
                  <label className="form-label">{t('Tags')}</label><br />
                  <Chips value={Tagvalue} className="" onChange={(e) => setTagvalue(e.value)} separator="," />
                  {formik3.touched.tags && formik3.errors.tags && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik3.errors.tags}</span>
                      </div>
                    </div>
                  )}
                </div>


                <div className="col-lg-4 col-12 d-flex justify-content-end align-items-end mt-lg-4 mt-3 mb-3">
                  <button type="submit" className="btn btn_header px-sm-4 px-2 py-2">
                    {" "}
                    {t('SAVE DETAILS')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Container>
      </section>

    </>
  );
};

export default ProfilePage;
