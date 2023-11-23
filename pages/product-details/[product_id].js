import React,{useState,lazy,Suspense} from 'react';
import { useRouter } from 'next/router'
import CommonLayout from '../../components/shop/common-layout';
import Seo from '../../seo/seo'
import { useTranslation } from "react-i18next";

// import ProductSection from './common/product_section';
const ProductSection = lazy(()=> import('./common/product_section'))
// import { withApollo } from '../../helpers/apollo/apollo';
// import LeftSidebarPage from './product/leftSidebarPage';
const LeftSidebarPage = lazy(()=> import('./product/leftSidebarPage'))


const LeftSidebar = () => {
  
  const { t } = useTranslation();
  const router = useRouter();
  const {item_id,product_id} = router.query
  const [url, setUrl] = useState();
  const [isLoading2,setLoading2] = useState(false)

  const [recom,setRecom] = useState([])

  const Loader = () => {
    return(
      <div className="loader-wrapper">
      {url === "Christmas" ? (
        <div id="preloader"></div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
    )
  }
  
  return (
    <CommonLayout parent="Home" title="Product">
    {/* <Seo title={`${JobData?.item_title}`} description={`${JobData?.item_description}`} /> */}
   <Suspense fallback={<Loader />}>
      <div className='mt-2 mb-3'>
      {
        item_id || product_id ? <>
      <LeftSidebarPage setRecom={setRecom} />
      {/* <ProductSection  recom={recom} /> */}
      </>
        : 
        <div className='d-flex flex-column justify-content-center align-items-center mb-4'>
          <img src='/assets/images/tatlub-img/not_Found.png'  className='no_image'/>
          <h3 className='text-center'>{t('DATA NOT FOUND')}</h3>
        </div>
      }
 </div>
 </Suspense>
    </CommonLayout>
  );
} 


export default LeftSidebar;