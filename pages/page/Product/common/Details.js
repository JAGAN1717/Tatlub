import React,{useState  } from 'react';
import { useTranslation } from 'react-i18next';
import { Media, Container, Row, Col, Button, TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, Label, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import ProductTab from '../../../product-details/common/product-tab'
import Service from '../../../product-details/common/service';
import {useFormik} from 'formik';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import toast1 from 'react-hot-toast';





export default function Details(args) {
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  const[rating,setRating]=useState()
  const[desc,setDesc]=useState()
  const[reviewImg,setReviewImg]=useState()
  const [isLoading, setIsLoading] = useState(true);
  const [reviewlevel, setReviewlevel] = useState();
  const[review,setReview]=useState([])


  const initialValues = {
    benificial_id: '',
    user_id : '',
    overall_rating: '',
    body: '' ,
    image: ''  
  }

  const formik = useFormik({
    initialValues,
    onSubmit:async (values,{setStatus,setSubmitting,resetForm}) => {
      // setIsLoading(true)
      alert()
      try{
        let seller_id = seller[0]?.id
        let user_id = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
  
        const body = {
          "benificial_id": seller_id,
          "user_id": user_id,
          "overall_rating": rating,
          "body": desc ,
          "image": reviewImg  
      } 
      var formdata = new FormData()
  
      Object.entries(body).forEach(
        ([key,value]) => {
          formdata.append(key,value)
        }
      )
  
        // const response = await reviewForSeller(formdata)
        const response = ''
        // console.log('jljlj',response.data)
        if(response.status == 200){
        // toast.info('SUCCESS', {
        //   position: "bottom-right",
        //   autoClose: 2000,
        //   icon:false,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        //   }); 
        toast1.success('SUCCESS')
        }else {
          // toast.error('NOT FOUND', {
          //   position: "bottom-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "dark",
          //   });
          toast1.error('Somthing Went Wrong!')
        }

      }catch(error){
        console.error(error);
        setStatus('dont give proper review details is incorrect');
        setSubmitting(false)
        // setIsLoading(true)
      }
    }

  })



  return (
    <section className="dress_details">
    <div className="collection-wrapper ">

    <Modal className="model_contact modal-md modal-dialog-centered" isOpen={modal2} toggle={toggle2} {...args}>
                        <ModalBody>
                          <div className="popup-review">
                             <h4>{t('Write a')}  {t('Review')}</h4>
                             <form>
                                <div className='mb-3'>
                                <label for="exampleFormControlInput1" className="form-label">Quantity</label>
                                <div className="row">
                                <div className="mb-3 col mb-3">
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="1" />
                                </div>
                                <div className="mb-3 col">
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Piece</option>
                                    <option value="1">One</option>
                                    </select>
                                </div>
                                </div>
                                </div>

                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>


                             </form>
                          </div>
                        </ModalBody>
                      </Modal>

      <Container>
        <Row>
         <Col lg="8" xl='9'>
          <div className="card mb-3 shadow px-md-4 px-3 pt-md-4 pt-3 pb-2 border-0 p-details">
              <div className="row">
                <div className="col-xl-5 mb-3">
                  <div className="img-1">

                  <img
                    src='/assets/images/tatlub-img/plp/p (13).jpeg'
                      className="img-fluid w-100 rounded-4"
                      onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}
                    />
                  </div>
                  <div className="row mt-3 img-2">

                    <div className="col">
                      {" "}

                     <img
                      src={`/assets/images/tatlub-img/plp/p (10).jpeg`}
                      className="img-fluid w-100 rounded-4"
                      onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}
                    />
                    </div>
                    <div className="col">
                      {" "}

                     <img
                      src={`/assets/images/tatlub-img/plp/p (12).jpeg`}
                      className="img-fluid w-100 rounded-4"
                      onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}
                    />
                    </div>
                    <div className="col">
                      {" "}
                    <img
                      src={`/assets/images/tatlub-img/plp/p (14).jpeg`}
                      className="img-fluid w-100 rounded-4"
                      onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}
                    />
                    </div>
                    <div className="col">
                      {" "}
                      <img
                      src={`/assets/images/tatlub-img/plp/p (15).jpeg`}
                      className="img-fluid w-100 rounded-4"
                      onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}
                    />
                    </div>
                  </div>
                </div>
                <div className="col-xl-7">
                  <h3 className="fw-bolder mb-3">
                  2019 Brand Casual Plaid Luxury Plus Size Long Sleeve Slim Fit Men 
                  Shirt Spring Social Dress Shirts Mens Fashions Jersey 41607
                  </h3>
                  <div className="d-flex mb-2">
                    <p className="">
                    Availability:<span className='text-success'>In Stock</span>
                    </p>
                  </div> 
                  <hr className='mt-0'/>

                  <div className="d-flex ">
                    <h5 className='fw-bold'>{t("QAR")} 687.00</h5>
                    <h5 className='text-decoration-line-through text-muted ms-2'>{t("QAR")} 1,687.00</h5>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                  <h4 className="fw-bolder">{t('Description')}</h4>
                  <a className="text-color">{t('Read More')}</a>
                  </div>
                  <p className="">
                  Note:We Sell ASIAN SIZE.It Is About 1-2 Size SMALLER Than US,UK,AU.EU Size.Please Choose The Size According To Our Size Form.All The Dimensions We Have Personally Measured And Reality Try. When You Place The Order Please Live The Message With Your Weight (KG/LB) And Height(CM/IN).We Will Help You To Confirm The Size.Thank You!
                  </p>
                  <div className='d-flex justify-content-center align-items-center mb-3'>
                    <button type='button'  onClick={toggle2} className='btn btn-contact_suplier btn-theme text-truncate text-white fw-light p-2 w-50' >
                        <img src='/assets/images/tatlub-img/Companies/Icons/_Fav.png'  className='locaList-img me-3'/>
                        Add To Wishlist</button>
                    <button type='button' className='btn btn-contact_suplier text-truncate fw-light p-2 w-50' >Get Best Price</button>
                  </div>

                </div>
              </div>
          </div>

            <ProductTab   />

          </Col>

          <Col xl="3" lg="4" className="collection-filter" id="filter">
            {/* <Filter /> */}
            <Service  /> 

            <div className="reviewrite_company mt-4 mb-xl-0 mb-4">
                      <h3 className="mb-md-4 mb-3">{t('Write a')}  {t('Review')}</h3>
                      <div className="d-flex justify-content-xs-between mt-3">
                        <div className="star-icon-com"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                        <div className="star-icon-com"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                        <div className="star-icon-com"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                        <div className="star-icon-com"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                        <div className="star-icon-com"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                      </div>
                      <Button onClick={toggle} className="btn btn-review mt-md-5 mt-4">{t('Write a')}  {t('Review')}</Button>

                      <Modal className="model_contact modal-md modal-dialog-centered" isOpen={modal} toggle={toggle} {...args}>
                        <ModalBody>
                          <div className="popup-review">
                            <h4>{t('Write a')}  {t('Review')}</h4>
                            <div className="">
                            <form onSubmit={formik.handleSubmit}>
                              <h5>Rathna Fan House Pvt Ltd</h5>
                              <p>T. Nagar, Chennai</p>
                              <div className="d-flex justify-content-between align-items-center my-3"><p className="mb-0">{t('Over All')}</p> <div className="d-flex">
                                {/* <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
                                {/* <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                                <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                                <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div>
                                <div className="star-icon-com me-2"><img src="/assets/images/tatlub-img/icon-8.png" /></div> */}
                                <Stack spacing={1}>
                                  <Rating name="size-large star_rate" onChange={(e)=> setRating(e.target.value)}  defaultValue={1} size="large"  />
                                </Stack>
                              </div></div>
                              <Label>{t('Add Review')}</Label>
                              <textarea placeholder="Describe Your Experience" onChange={(e)=>setDesc(e.target.value)} {...formik.getFieldProps('body')}></textarea>
                              <p>{t('Add Photos')}</p>
                              <div className='file file--upload'>
                                <label for='input-file'>
                                  <i className="fa fa-camera"></i>
                                </label>
                                <input id='input-file' type='file'  onChange={(e)=>setReviewImg(e.target.files[0])} />
                              </div>
                              <button className="btn submit_btn" type="submit" >{t('Submit')}</button>
                          </form>
                            </div>
                          </div>
                        </ModalBody>
                      </Modal>

                    </div>
            {/* <!-- side-bar single product slider start --> */}
            {/* <NewProduct /> */}
            {/* <!-- side-bar single product slider end --> */}
          </Col>
        </Row>
      </Container>
    </div>
  </section>
  )
}
