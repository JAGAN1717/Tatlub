import React, { useState, useEffect, useCallback, CSSProperties } from "react";
import { Container, Row, Form, Input, Label, Col } from "reactstrap";
import CommonLayout from "../../components/shop/common-layout";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddBranchesData } from "../../components/core/seller_request";
import { SaveProduct, getPRoductDetail, UpdateProduct } from '../../components/core/product_request'
import { getBrand } from '../../components/core/fashion_request'
import { DeleteProductGallery } from '../../components/core/shop_requests'
import Link from "next/link";
import { Router } from "next/router";
import { LinkOff } from "@mui/icons-material";
import { useRouter } from 'next/router';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import authenticate from "../../components/auth/auth";
import { useTranslation } from "react-i18next";
import Dropzone from 'react-dropzone'
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Seo from "../../seo/seo";
import Select from 'react-select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const ITEM_HEIGHT = 70;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];




function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


let initialValues = {
  product_name: "",
  product_price: "",
  product_image_medium: "",
  brands: "",
  product_status: "",
  feature_image: "",
  image_gallery: "",
  product_description: "",
  specifications: "",
  meta_title: "",
  meta_keyword: "",
  meta_description: "",
  tags: ''
};

function Addproduct() {
  const [formValues, setFormValues] = useState([initialValues]);
  const [tags, setTags] = useState([])
  const [featimg, setFeatImg] = useState('')
  const [galImg, setGalImg] = useState([])
  const [priview, setPreview] = useState("/assets/images/tatlub-img/No.jpg");
  const [priview2, setPreview2] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState();
  const [formvalue, setFormvValue] = useState("");
  const [dragging, setDragging] = useState(false);
  const { t } = useTranslation();
  const [categoryList, setCategoryList] = useState([])
  const [open, setOpen] = React.useState(false);
  const [categorId, setCategoryId] = useState([])
  const [specification, setSpecification] = useState({
    name: "",
    value: "",
  })
  const [specifivalue, setSpecifivalue] = useState([])

  const [personName, setPersonName] = React.useState([]);
  const theme = useTheme();
  const handleChange2 = (event) => {
    // const {
    //   target: { value },
    // } = event;
    // setPersonName(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    setCategoryId(event.map((p) => p?.id))
  };



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

  let options = []

  useEffect(() => {
    categoryList?.map(data => options.push({ 'value': data?.id, 'label': data?.category_name }))
  }, [categoryList])





  const router = useRouter();

  const { pro_id } = router.query

  const handleDeleteImg = (i) => {
    let val = Object.entries(galImg).filter((d, k) => k !== i)
    setGalImg(Object.fromEntries(val))

    let val2 = Object.entries(priview2).filter((d, k) => k == i)

    const ids = val2.length > 0 && formvalue?.product_galleries?.filter((d, k) => d?.product_image_gallery_name == val2[0][1] ?? val2)
    // console.log('odo',val2)

    const id = ids && ids[0]?.id
    if (id) {
      DeleteProductGallery(id).then(res => {
        // console.log("res",res)
      }).catch(err => {
        console.error("err", err.message)
      })
    }

  }



  // const {
  //   getRootProps,
  //   getInputProps,
  //   rootRef, // Ref to the `<div>`
  //   inputRef // Ref to the `<input>`
  // } = useDropzone() 

  // console.log('dsdsd',rootRef)


  const BrandDropDown = async () => {
    getBrand().then(res => {
      setBrands(res.data)
    }).catch(err => {
      console.error('err', err)
    })
  }

  const fetchProductdata = async () => {
    setIsLoading(true)
    const id = pro_id
    getPRoductDetail(id).then(res => {
      // console.log('dddd',res.data);
      setFormvValue(res.data)
      Object.entries(res.data).forEach(([key, value]) => {
        // formik.setFieldValue(key, value);
        if (value != "null") {
          initialValues[key] = value
        }
      });
      formik.setFieldValue("brands", res.data?.brand)
      setFeatImg(res.data?.product_image_medium);
      setPreview(res.data?.product_image_medium);
      setCategoryId(res.data?.category_id?.split(','))
      let tagslist = res.data?.tags ? res.data?.tags : ''
      // let tatt = tagslist == null ? '' : tagslist
      setTags(tagslist.split(','));
      setIsLoading(false)
      setSpecifivalue(res.data?.product_attribute ?? [])
      let imgs = res.data?.product_galleries.map(img => img?.product_image_gallery_name)
      setPreview2(imgs);
      setGalImg(imgs)
    }).catch(err => {
      console.error('err', err)
    })
  }

  useEffect(() => {
    BrandDropDown();
    pro_id && fetchProductdata()
  }, [pro_id])


  const handleChange = (tag) => {
    setTags(tag)
  }

  const isValidFileUploaded = (file) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type?.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleMulImg = (e) => {
    const previewImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]?.size > 5242880) {
        // console.log("ppp",e.target.files[i].name)
        toast.error(` Maximum 5mb only accepted!`, {
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
        if (isValidFileUploaded(file[i])) {
          if (file.length <= 12) {
            setGalImg(file);
            const file2 = file[i];
            const reader = new FileReader();
            reader.onload = () => {
              previewImages.push(reader.result);
              if (previewImages.length === file.length) {
                setPreview2([...priview2, ...previewImages]);
              }
            };
            reader.readAsDataURL(file2);
            // setPreview2(e.target.files)
            // console.log("jjj", file);
          } else {
            let twel = Array.from(file)?.slice(0, 12)
            setGalImg(twel);
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


    if (e.target.files.length > 12) {
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

  //  console.log('iii0',priview2)
  const handleImg = (e) => {
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
      const file = e.target.files[0];
      if (isValidFileUploaded(file)) {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setFeatImg(e.target.files[0])
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

  //  console.log("kkk",tags)

  function removePropertyByIndex(obj, index) {
    const keys = Object.keys(obj);
    const propertyToRemove = keys[index];
    if (propertyToRemove) {
      delete obj[propertyToRemove];
    }
  }

  const productShema = Yup.object().shape({
    product_name: Yup.string().required('product name required'),
    product_price: Yup.string().required('product price required'),
    product_image_medium: Yup.string(),
    brands: Yup.string().required('Must be a select any brand'),
    product_status: Yup.string().required('product status required'),
    feature_image: Yup.string(),
    // image_gallery:Yup.string(),
    product_description: Yup.string().required('product description required'),
    specifications: Yup.string().notRequired(),
    meta_title: Yup.string().notRequired(),
    meta_keyword: Yup.string().notRequired(),
    meta_description: Yup.string().notRequired(),
    tags: Yup.string().notRequired()
  })

  const formik = useFormik({
    initialValues,
    validationSchema: productShema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      const userId = JSON.parse(sessionStorage.getItem("data"))?.id ?? JSON.parse(localStorage.getItem("data"))?.id;
      try {
        let body = {
          "user_id": userId,
          "product_name": values.product_name,
          "product_price": values.product_price,
          // "product_image_medium":product_image_medium,
          // "attribute_id": '5',
          // "product_feature_value":'test',
          "brands": values.brands,
          "product_status": values.product_status,
          "feature_image": featimg,
          // "image_gallery":galImg,
          "product_description": values.product_description,
          "specifications": values.specifications,
          "meta_title": values.meta_title,
          "meta_keyword": values.meta_keyword,
          "meta_description": values.meta_description,
          "tags": tags,
          "category_id": categorId
        }

        var formdata = new FormData();

        Object.entries(body).forEach(([key, value]) => {
          formdata.append(key, value)
        })

        if (Object.keys(galImg).length != 0) {
          for (let i = 0; i < Object.keys(galImg).length; i++) {
            formdata.append(`image_gallery[${i}]`, galImg[i]);
          }
        }

        if (specifivalue?.length > 0) {
          specifivalue.map((val, index) => {
            !pro_id && !val?.id && formdata.append(`attribute_name_${(specifivalue?.length - 1) - index}`, val?.name);
            !pro_id && !val?.id && formdata.append(`attribute_value_${(specifivalue?.length - 1) - index}`, val?.value);
            val?.id && formdata.append(`attribute_name_${val?.id}_old`, val?.name);
            val?.id && formdata.append(`attribute_value_${val?.id}_old`, val?.value);
            pro_id && !val?.id && formdata.append(`attribute_name_${index}atri`, val?.name);
            pro_id && !val?.id && formdata.append(`attribute_value_${index}atri`, val?.value);
            // val?.id && formdata.append(`attribute_name_${specifivalue?.length-1}`, val?.name);
            // val?.id && formdata.append(`attribute_value_${specifivalue?.length-1}`, val?.value);
          })
        }

        if (pro_id) {
          const id = pro_id
          // document.getElementById('openloaderModal')?.click()
          setOpen(true)
          const responce = await UpdateProduct(id, formdata)
          setOpen(false)
          // document.getElementById('closeloaderModal')?.click();

          if (responce.status == 200) {
            toast.info("UPDATE SUCCESSFULL", {
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
            resetForm()
            router.push('/products')
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

        } else {
          // document.getElementById('openloaderModal')?.click()
          setOpen(true)
          const response = await SaveProduct(formdata);
          // document.getElementById('closeloaderModal')?.click();
          setOpen(false)
          if (response.status == 200) {
            toast.info("CREATE SUCCESSFULL", {
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
            resetForm()
            router.push('/products')
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
        // document.getElementById('closeloaderModal')?.click();
        setOpen(false)
      } catch (error) {
        // document.getElementById('closeloaderModal')?.click();
        setOpen(false)
        console.error(error);
        setStatus("The details is incorrect");
        setSubmitting(false);
        // setLoading(false);
      }
    }
  })

  return (<>
        <Backdrop
        sx={{ color: '#fff', height: '100vh', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <CommonLayout setCategoryList={setCategoryList}>
      <Seo title={`${formvalue?.product_name ?? 'Product'}`} description={`${formvalue?.product_description ?? ''}`} />
      {isLoading && (
        <div className="loader-wrapper">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>)}

      {!isLoading &&
        <div className="container  my-lg-5 my-3">
          {/* <div className="mb-3 d-flex justify-content-end">
            <Link href='/shop/addnewlisting'>
                  <button type='button' className='btn btn_header fw-500'>Back</button>
              </Link>
          </div> */}

          {/* <div className="mb-3 form_edit_bfranch form-add-brancdh"> */}
          <div className="mb-3 form_condition_">
            <div className="form-head mb-3 mt-3">
              {
                pro_id ?
                  <h4>{t('Update Product')} </h4>
                  :
                  <h4>{t('Create New Product')} </h4>
              }
            </div>

            {/* <FormControl sx={{ m: 1}} className="w-100" >
        <InputLabel id="demo-multiple-name-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          placeholder="Select Category"
          className="text-dark"
          value={personName}
          onChange={handleChange2}
          // input={<OutlinedInput label="Name" />}
          // MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, personName,theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
            {
              !pro_id &&
              <Select
                closeMenuOnSelect={false}
                isMulti
                name="category_name"
                placeholder={t('Select Category') + " *"}
                onChange={handleChange2}
                options={categoryList}
                getOptionLabel={(option) => `${option.category_name}`}
                getOptionValue={(option) => option.id}
                className="fs-5"
                classNamePrefix="select"
                required={true}
              />
            }



            <form onSubmit={formik.handleSubmit}>
              <div className="row mt-3" >

                <div className="mb-3 col-sm-6 col-lg-4">
                  <label className="form-label">{t('Product Name')}</label>
                  <input type="text" className="form-control" placeholder="" name="product_name"  {...formik.getFieldProps('product_name')} />

                  {formik.touched.product_name &&
                    formik.errors.product_name && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.product_name}
                          </span>
                        </div>
                      </div>
                    )}
                </div>

                <div className="mb-3 col-sm-6 col-lg-4">
                  <label className="form-label">{t('Product Price')}</label>
                  <input type="number" className="form-control" placeholder=""  {...formik.getFieldProps('product_price')} />
                  {formik.touched.product_price &&
                    formik.errors.product_price && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.product_price}
                          </span>
                        </div>
                      </div>
                    )}
                </div>


                <div className="mb-3 col-sm-6 col-lg-4">
                  <label className="form-label"> {t('Select Brand')} </label>
                  {/* <select className="form-select" aria-label="Default select example" {...formik.getFieldProps('brands')}>
                    <option selected >{t('Select Brand')}</option>
                    {
                      brands.length > 0 && brands.map((data,index) => (
                        <option value={data.id} key={index}>{data.name}</option>
                      ))
                    }
                  </select>  */}
                  <Select
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
                    value={brands?.find(e => e.id == formik.getFieldProps('brands')?.value)}
                    options={brands}
                    getOptionLabel={(option) => `${option.name}`}
                    getOptionValue={(option) => option.id}
                    className=" w-100"
                    classNamePrefix="select"
                  />

                  {formik.touched.brands &&
                    formik.errors.brands && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.brands}
                          </span>
                        </div>
                      </div>
                    )}
                </div>


                <div className="mb-3 col-sm-6 col-lg-4">
                  <label className="form-label">{t('Product Status')}</label>
                  {/* <select className="form-select" aria-label="Default select example" {...formik.getFieldProps('product_status')}>
                  <option selected>Select Status</option>
                  <option value="1">Pending</option>
                  <option value="2">Enable</option>
                  <option value="3">Disable</option>
                </select> */}
                  <Select
                    closeMenuOnSelect={true}
                    // isDisabled={!selectIntrovel}
                    isSearchable={false}
                    name="status"
                    placeholder={t('Select status')}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "product_status",
                        e.value
                      )
                    }}
                    value={[{ label: 'Enable', value: '2' }, { label: 'Disable', value: '3' }]?.find(e => e.value == formik.getFieldProps('product_status')?.value)}
                    options={[{ label: 'Enable', value: '2' }, { label: 'Disable', value: '3' }]}
                    getOptionLabel={(option) => `${option.label}`}
                    getOptionValue={(option) => option.value}
                    className=" w-100"
                    classNamePrefix="select"
                  />
                  {formik.touched.product_status &&
                    formik.errors.product_status && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.product_status}
                          </span>
                        </div>
                      </div>
                    )}
                </div>

                <div className="mb-3 col-sm-6 col-lg-4">
                  <label className="form-label">{t('Meta Title')}</label>
                  <input type="text" className="form-control" placeholder="" {...formik.getFieldProps('meta_title')} />
                  {formik.touched.meta_title &&
                    formik.errors.meta_title && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.meta_title}
                          </span>
                        </div>
                      </div>
                    )}
                </div>

                <div className="mb-3 col-sm-6 col-lg-4">
                  <label className="form-label">{t('Meta Keyword')}</label>
                  <input type="text" className="form-control" placeholder="" {...formik.getFieldProps('meta_keyword')} />
                  {formik.touched.meta_keyword &&
                    formik.errors.meta_keyword && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.meta_keyword}
                          </span>
                        </div>
                      </div>
                    )}
                </div>

                <div className="mb-3 col-sm-12">
                  <label className="form-label">{t('Product Description')}</label>
                  <textarea type="text" className="form-control" rows='3' placeholder="" {...formik.getFieldProps('product_description')} />
                  {formik.touched.product_description &&
                    formik.errors.product_description && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.product_description}
                          </span>
                        </div>
                      </div>
                    )}
                </div>

                <div className="mb-3 col-sm-6 col-lg-6 d-none">
                  <label className="form-label">{t('Specifications')}</label>
                  <textarea type="text" className="form-control" rows='3' placeholder="" {...formik.getFieldProps('specifications')} />
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

                <div className="mb-3 col-sm-12">
                  <label className="form-label">{t('Meta Description')}</label>
                  <textarea type="text" className="form-control" rows='3' placeholder="" {...formik.getFieldProps('meta_description')} />
                  {formik.touched.meta_description &&
                    formik.errors.meta_description && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert" className="text-danger">
                            {formik.errors.meta_description}
                          </span>
                        </div>
                      </div>
                    )}
                </div>

                <div className="mb-3 col-12 ">
                  <label
                    for="exampleFormControlInput1"
                    className="form-label"
                  >
                    {t("Attributes")}
                  </label>
                  <div className=" row mb-3" >
                    <div className="col-sm-5 mb-2">
                      <input className="form-control" placeholder={t("name")} value={specification?.name} name='name' onChange={(e) => handleSpecification(e)} />
                    </div>
                    <div className="col-sm-5 mb-2">
                      <input className="form-control" placeholder={t("Value")} name="value" disabled={!specification?.name} style={specification?.name ? { cursor: 'default' } : { cursor: 'not-allowed' }} value={specification?.value} onChange={(e) => handleSpecification(e)} />
                    </div>
                    <div className="col-sm-2 mb-2">
                      <button type="button" className="btn btn-theme rounded fw-light w-100" disabled={specification?.name && specification?.value ? false : true} onClick={() => { setSpecifivalue((v) => [...v, specification]); setSpecification({ name: "", value: "" }) }}>{t("ADD")}</button>
                    </div>
                  </div>
                  {
                    specifivalue.map((spec, key) => (
                      <div className=" row mb-3" key={key}>
                        <div className="col-sm-5 mb-2">
                          <input className="form-control" value={spec?.name} onChange={(e) => handleUptodat(e, key)} name='name' placeholder={t("Title")} />
                        </div>
                        <div className="col-sm-5 mb-2">
                          <input className="form-control" value={spec?.value} onChange={(e) => handleUptodat(e, key)} placeholder={t("value")} name="value" />
                        </div>
                        <div className="col-sm-2 mb-2">
                          <button type="button" className="btn btn-theme rounded fw-light w-100" onClick={() => {
                            let newArr = specifivalue.filter((item) => item != specifivalue[key])
                            setSpecifivalue(newArr)
                          }}>{t("REMOVE")}</button>
                        </div>
                      </div>
                    ))
                  }
                </div>


                <div className="mb-3 col-sm-12 tag_F">
                  <label className="form-label">{t("Tags")}</label>
                  <div className="">
                    <TagsInput className="form-control p-0" value={tags} onChange={handleChange} />
                  </div>
                </div>

                {/* <Dropzone onDrop={acceptedFiles => console.log('acceptedFiles',acceptedFiles)}>
                  {({getRootProps, getInputProps}) => (
                  <div className="mb-3 col-lg-5 col-md-7 col-xl-4 text-center" {...getRootProps()}>
                    <button className="btn bt_product_seliset mt-4 mb-3" onClick={()=>document.getElementById('openFeaturedimg')?.click()} type="button">
                    <p> {t('Select Image')} </p> 
                  <p><i className="fa fa-cloud-upload" aria-hidden="true"></i></p> </button>
                    <input type="file" onChange={(e)=> handleImg(e)} id="openFeaturedimg" {...getInputProps()} className="form-control mb-4 d-none" placeholder="" name="feature_image"/>
                        <div className="mb-2 d-flex justify-content-center" >
                            <img
                              src={priview}
                              className="image_no_product rounded-3"
                              alt="noImage" 
                              onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}
                            ></img>
                          </div>
                          <div className="d-flex justify-content-center ">
                          <button type="button" className= {featimg ?"btn w-100 btn-danger fw-light rounded":'d-none'} onClick={()=>{setFeatImg(),setPreview("/assets/images/tatlub-img/No.jpg")}} >{t('Remove Image')}</button>
                          </div>
                  </div> 
                    )}
                  </Dropzone> */}
                <div className="mb-3 col-lg-5 col-md-7 col-xl-4 text-center">
                  <button className="btn bt_product_seliset mt-4 mb-3" onClick={() => document.getElementById('openFeaturedimg')?.click()} type="button">
                    <p> {t('Product Image')} </p>
                    <p><i className="fa fa-cloud-upload" aria-hidden="true"></i></p> </button>
                  <input type="file" onChange={(e) => handleImg(e)} id="openFeaturedimg" className="form-control mb-4 d-none" placeholder="" name="feature_image" />
                  <div className="mb-2 d-flex justify-content-center position-relative multi_imgP2 rounded-3" >
                    <img
                      src={priview}
                      className="image_no_product rounded-3"
                      alt="noImage"
                      onError={(e) => e.currentTarget.src = '/assets/images/tatlub-img/No.jpg'}
                    ></img>

                         <div className={ priview == '/assets/images/tatlub-img/No.jpg' ? "d-none" : "position-absolute remove_galImg cursor-pointer top-50 start-50 translate-middle"}
                        onClick={() => { setFeatImg(), setPreview("/assets/images/tatlub-img/No.jpg") }}
                              >
                                <i className="fa fa-remove text-danger" ></i>
                              </div>
                  </div>
                  <div className="d-flex justify-content-center d-none">
                    <button type="button" className={featimg ? "btn w-100 btn-danger fw-light rounded" : 'd-none'} onClick={() => { setFeatImg(), setPreview("/assets/images/tatlub-img/No.jpg") }} >{t('Remove Image')}</button>
                  </div> 
                </div>

                <div className="mb-3 col-lg-7 col-xl-8 text-center">
                  {/* <label className="form-label">Gallery Images</label> */}
                  <button className="btn bt_product_seliset mt-4 mb-3" onClick={() => document.getElementById('OpenGalleryImageD')?.click()} type="button">
                    <p>{t('Gallery Image')}</p>
                    <p><i className="fa fa-cloud-upload" aria-hidden="true"></i></p>
                  </button>
                  <input type="file" onChange={(e) => handleMulImg(e)} id="OpenGalleryImageD" className="form-control mb-4 d-none" placeholder="" multiple="multiple" name="image_gallery" />
                  <div className="mb-2">
                    <div className="row justify-content-center">
                      {
                        priview2?.slice(0, 12).map((img, i) => (
                          <div className=" col-3 mb-3 col-sm-2" key={i}>
                            <div className="position-relative multi_imgP h-100">
                              <img
                                src={img}
                                className="w-100 rounded-3 "
                                alt="noImage"
                                onError={(e) => e.currentTarget.src = '/assets/images/tatlub-img/No.jpg'}
                              ></img>
                              <div className="position-absolute remove_galImg cursor-pointer top-50 start-50 translate-middle"
                                onClick={() => {
                                  const newArray = priview2.filter(item => item !== img);
                                  console.log("newArray", newArray)
                                  setPreview2(newArray)
                                  handleDeleteImg(i)
                                  // let val = Object.entries(galImg).filter((d,k)=> k !== i)
                                  // setGalImg(Object.fromEntries(val))
                                }}
                              >
                                <i className="fa fa-remove text-danger" ></i>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                      {/* 
                      {
                        !priview2.length > 0 && 
                        <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" onSelect={(e)=>handleMulImg(e)} emptyTemplate={<p className="">Drag and drop files to here to upload.</p>} /> 
                      } */}
                    </div>
                  </div>
                </div>
              </div>



              <div className="d-flex justify-content-end">
                <div className="d-flex mt-3 justify-content-end align-items-cennter p-3">
                  {
                    pro_id ?
                      <button type="submit" className="btn btn-theme px-5 p-2 rounded fw-light">{t('Update Product')}</button>
                      :
                      <button type="submit" disabled={Object.keys(formik.errors).length > 0 || !featimg || !categorId?.length > 0} className="btn btn-theme px-5 p-2 rounded fw-light">{t('Save Product')}</button>
                  }
                </div>
              </div>

            </form>
          </div>
        </div>
      }

    </CommonLayout>
  </>
  );
}


export default authenticate(Addproduct);