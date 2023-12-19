import React, { useEffect,useState } from 'react'
import {getRecommended} from '../../../components/core/fashion_request';
import { Container, Row, Col, Media } from "reactstrap";
import CommonLayout from '../../../components/shop/common-layout'
import Recommended from './common/recommended'

export default function RecommendedProducts() {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState()
    const [recommended, setRecommended] = useState([]);

    const fetchRecomProduct = async () => {
        try {
          setIsLoading(true)
          const responcedata = await getRecommended()
          setRecommended(responcedata.data);
          setIsLoading(false)
        } catch (error) {
          console.error('err',error.message)
        }
      }
    
     useEffect(()=> {
        fetchRecomProduct()
     },[])


  return (<>
  {/* <CommonLayout parent="home" title="Recommended Products"> */}
  {isLoading ? (
        <div className="loader-wrapper2">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) :
      <Recommended recommended={recommended} /> }
    
  {/* </CommonLayout> */}
  </>
  )
}
