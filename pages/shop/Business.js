import React, { useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Row, Container, Col, Button } from "reactstrap";
import Link from "next/link";
import {getMyBussiness,getproduct,getbranch} from '../../components/core/shop_requests'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import authenticate from "../../components/auth/auth";
import Seo from '../../seo/seo'


 function Business() {
  const router = useRouter();
  const { t } = useTranslation();
  const [Business,setBusiness] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const [product, setProducts] = useState([]);
  const [branches, setBranches] = useState([])



  const fetchBusinessData = async () => {
    try {
        setIsLoading(true)
      let id = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
        const response = await getMyBussiness(id)
        setBusiness(response.data)
        setIsLoading(false)      
    } catch (error) {
      console.error('err',error.message)
    }
  }

  const fetchproducts = async () => {
    try {
      setIsLoading(true)
      let id = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
      const responce = await getproduct(id)
      setProducts(responce.data);
      setIsLoading(false)
    } catch (error) {
      console.error('err',error.message)
    }
 } 

 const fetchBracnhes = async () => {
  setIsLoading(true)
  let id = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
  const responce = await getbranch(id)
  setBranches(responce.data);
  setIsLoading(false)
}

  useEffect(()=> {
    fetchBusinessData();
    fetchproducts();
    fetchBracnhes();
  },[])


  return (
    <CommonLayout title="collection" parent="home">
          <Seo title={`My Businesses`} />

      {isLoading ? (
        <div className="loader-wrapper">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : 
      <section className="my_businessess mt-lg-5 mt-3 mb-lg-5 mb-3">
      <Container>
        <div className="mb-3 d-flex align-items-center justify-content-end">
        {
            product?.length > 0 ?
            <Link href='/shop/addproduct'>
            <a>
            <button className="btn btn_filter1 px-sm-4 px-2 fs-15 me-2">{t('Product List')}</button>
            </a>
            </Link> 
            :
            <Link href='/shop/addnewproduct'>
            <a>
            <button className="btn btn_filter1 px-sm-4 px-2 fs-15 me-2">{t('Add Product')}</button>
            </a>
          </Link>
          }
          
           {
            branches?.length > 0 ? 
            <Link href='/shop/BrancheList'><button className="btn btn_filter1 fs-15 px-4">{t('Branch List')}</button></Link>
            :  <Link href='/shop/addnewlisting'><a><button className="btn btn_filter1 fs-15 px-4">{t('Add Branch')}</button></a></Link>
          }
        </div>
        <div className="review_card card_bussiness">
          <div className="d-sm-flex justify-content-between">
          <div className="mb-3">
            <h4 className="mb-3 fs-20">{t('My Businesses')}</h4>
            <p>You Have Existing Business On Tatlub.com</p >
          </div>

          <div className="text-sm-center"> 
            <Link href='/shop/Listing'>
            <a>
            <button className="btn fs-15 btn_filter1 px-sm-4 px-2 mb-sm-0 mb-3">{t('Create New Business')}</button>
            </a>
            </Link>
          </div>
          </div>

          <div className="row "> 

            {  
             
             Business.length > 0  ?
              Business?.map((data,index)=> {
                return(
                  <div className="col-lg-6 mb-3" key={index}>
                  <div className="card p-3 h-100">
                    <div className="row">
  
                    <div className="col-sm-3 col-xl-3 col-lg-4 col-md-3 col-12">
                      <img src={data?.item_image_medium}  onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}  />
                    </div>
                    <div className="col-sm-9 col-xl-9 col-lg-8 col-12">
                      <div className="col_alignment_bussiness">
                      <div className="mb-3">
                      <h4 className="fs-18 text-capitalize">{data.item_title}</h4>
                      <h5 className="text-muted fs-6 mt-3 text-capitalize">{data?.item_location_str ?? data?.item_address}</h5>
                      </div>
                      <div className="d-sm-flex align-items-end">
                        <button type="button" className="btn btn-bus fs-13" onClick={()=>router.push({pathname:'/product-details/view',query:{ item_id:data.id}})}>{t('Ratings')}</button>
                        <button type="button" className="btn btn-bus mx-sm-3 fs-13 text-truncate" onClick={()=>router.push({pathname:'/shop/Listing',query:{ my_id:data.id},})}>{t('Edit Listing')}</button>
                        <button type="button" className="btn btn-bus fs-13" onClick={()=>router.push({pathname:'/product-details/view',query:{ item_id:data.id}})}>{t('Manage')}</button>
                      </div>
                      </div>
                    </div>
                    <div className="form-check  res_dot_select d-none">
                    <input className="form-check-input float-end" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    </div>
                  </div>
                  </div>
                </div>
                )
              }) : <div className="d-flex justify-content-center align-items-center">
                <img src="/assets/images/tatlub-img/not_Found.png"  className="w-size h-100 no_image"/> 
              </div>

            }

            {/* <div className="col-lg-6">
              <div className="card p-3">
                <div className="row">

                <div className="col-sm-3 col-12">
                  <img src="/assets/images/tatlub-img/productLogo.jpg" className="w-100 h-100" />
                </div>
                <div className="col-sm-9 col-12">
                  <div className="mb-3">
                  <h4>Indian Exchange & Chemicals Limited</h4>
                  <p className="text-muted">Anna Nagar,Chennai</p>
                  </div>
                  <div className="d-sm-flex align-items-end">
                    <button className="btn btn-bus">Ratings</button>
                    <button className="btn btn-bus mx-sm-3 text-truncate">Edit Listing</button>
                    <button className="btn btn-bus">Manage</button>
                  </div>
                </div>
                <div className="form-check  res_dot_select">
               <input className="form-check-input float-end" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                </div>
              </div>
              </div>
            </div> */}

          </div>

{/* 
          <div className="line my-5"><h4>(Or)</h4></div>

          <div className="text-center">
            <Link href='/shop/Listing'>
            <a>
            <button className="btn btn_filter1 px-4">Create New Business</button>
            </a>
            </Link>
          </div> */}
        </div>
      </Container>
    </section>
      }

    </CommonLayout>
  );
}

export default authenticate(Business);
