import React,{useState,useEffect,useContext} from 'react'
// import { Steps } from 'primereact/steps';
import CommonLayout from '../../components/shop/common-layout';
import authenticated from '../../components/auth/auth';
import Shipping from './common/shipping';
import Confirmation from './common/confiration';
import Billing from './common/billing'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import itemscontex from '../initcontext';
import AuthContex from '../../components/auth/AuthContex';
import {getMyCart,removeCart,PostOrder} from '../../components/core/cart_request';
import { getContriesDrop,getStateDrop,getCityDrop } from '../../components/core/shop_requests';
import Seo from '../../seo/seo'
import { useTranslation } from "react-i18next";




 function ShippingCart() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [total,setTotal] = useState(0);
    const [url, setUrl] = useState();
    const [getlocation,setLocation] = useState('')
    const {userData} = useContext(AuthContex)
    const [orderDetails,setOrderData] = useState([])
    const {setCart} = useContext(itemscontex)


    const items = [
        {
            label: 'SHIPPING'
        },
        {
            label: 'BILLING'
        },
        {
            label: 'Confirmation'
        }
    ];

    const steps = [
        'SHIPPING',
        'BILLING',
        'CONFIRMATION',
      ];

      const [countries, setCountries] = useState([]);
      const [state, setState] = useState([]);
      const [city, setCity] = useState([]);
      const { t } = useTranslation();

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
    

      const fetchMyCart = async () => {
        setIsLoading(true)
        let id = userData?.id
        getMyCart(id).then(res => {
            setProducts(res)

            // setCart(res.data)
            setTotal(res?.total);
            setIsLoading(false)
        }).catch(err => {
            console.error('err',err.message);
            setIsLoading(false)
    })
    }




    useEffect(()=> {
        fetchMyCart()
        fetchCountries()
    },[])

    const placeOrder = async() => {
      setIsLoading(true)
       let body = {
            "user_id":userData?.id,
            "seller_id":products?.data?.map((res)=> res?.seller_id),
            "product_id":products?.data?.map((res)=> res?.product_id),
            "price":products?.data?.map((res)=> res?.price),
            "shipping_cost":34,
            "quantity":products?.data?.map((res)=> res?.quantity),
            "payment_status":1,
            "delivery_status":"completed",
            "shipping_address":getlocation?.id,
            "payment_type":1,
            "payment_details":"",
            "coupon_discount":"",
            "total":products?.total,
            "tax":0,
            'subtotal':products?.total
        }

        const response = await PostOrder(body)
        setCart(response)
        setOrderData(response.data)
        setIsLoading(false)
    }
      
    

  return (
    <CommonLayout>  
                <Seo title={`Shipping`}  />
          {isLoading ? (
          <div className="my-3 container">
          <div className="loader-wrapper2 rounded-4">
            {url === "Christmas" ? (
              <div id="preloader"></div>
            ) : (
              <div className="loader"></div>
            )}
          </div>
          </div>
        ) : 
    <section className='p-0 shipping mb-4 mt-4'>
        {/* <button type="button" className="d-none" id='fetchEditjfjhg' onclick={()=>EditAddressdata(getlocation)}></button> */}
        <div className='container'>
    <div className="mt-3 mb-4">
        {/* <Steps model={items} activeIndex={activeIndex}   onSelect={(e) => setActiveIndex(e.index)}  readOnly={false} /> */}
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeIndex}  alternativeLabel sx={{direction: 'ltr'}}>
                {steps.map((label,index) => (
                <Step key={label}>
                    <StepLabel><span className={`fw-bold text-uppercase  ${activeIndex == index ? 'text-color' : 'text-dark'}`}>{t(label)}</span></StepLabel>
                </Step>
                ))}
            </Stepper>
        </Box>
        
    </div>
    <div className={activeIndex == 0 ? 'd-block' : 'd-none'}>
        <Shipping setActiveIndex={setActiveIndex} cartData={products} countries={countries} state={state} city={city} fetchState={fetchState} fetchCity={fetchCity}  setLocation={setLocation} />
    </div>
    <div className={activeIndex == 1 ? 'd-block' : 'd-none'}>
        <Billing setActiveIndex={setActiveIndex} cartData={products} getlocation={getlocation} placeOrder={placeOrder} 
        countries={countries} state={state} city={city} fetchState={fetchState} fetchCity={fetchCity} setLocation={setLocation} />
    </div>
    <div className={activeIndex == 2 ? 'd-block' : 'd-none'}>
        <Confirmation orderDetails={orderDetails} setActiveIndex={setActiveIndex} cartData={products} />
    </div>
    </div>

    </section>
        }

    </CommonLayout>
  )
}

export default authenticated(ShippingCart)
