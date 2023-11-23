import React,{useState,useEffect} from 'react'
import CommonLayout from '../../../components/shop/common-layout'
import Popular from './common/popular'
import {getPopular} from '../../../components/core/fashion_request';
import { Container, Row, Col, Media } from "reactstrap";

export default function PopularProducts() {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState()
    const [popular, setPopular] = useState([]);

    
    const fetchPopularProduct = async () => {
        try {
          setIsLoading(true)
          const responcedata = await getPopular()
          setPopular(responcedata.data);
          setIsLoading(false)
        } catch (error) {
          console.error('err',error.message)
        }
      }

      useEffect(()=> {
        fetchPopularProduct();
      },[])

  return (<>
  <CommonLayout parent="home" title="Popular Products">
  {isLoading ? (
        <div className="loader-wrapper2">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) :
    <Popular popular={popular}/> }
    </CommonLayout>
  </>
  )
}
