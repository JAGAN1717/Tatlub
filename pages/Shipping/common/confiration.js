import React,{useState,useEffect,useContext} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Link from 'next/link';
import { useTranslation } from "react-i18next";


export default function confiration({cartData,orderDetails}) {

  const [counters, setCounters] = useState([]);
  const { t } = useTranslation();

  
const handleDecrement = (index) => {
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] > 1 ? newCounters[index] -= 1 : newCounters[index] = 1;
      return newCounters;
    });
};

const handleIncrement = (index) => {
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] += 1;
      return newCounters;
    });
}; 

const QntBodyTemplate = (val) => {        
    return(
        <div className='d-flex justify-content-center align-items-center'>
         <div className='qnt px-3 p-1 rounded d-flex justify-content-between'>
            <button type='button' disabled className='border-0' onClick={() => {                                      
                // handleDecrement(index.rowIndex);
            }}>-</button>
            <div className='mx-3'>{parseInt(val?.quantity)}</div>
            <button type='button' disabled className='border-0'onClick={() => {
                // handleIncrement(index.rowIndex);
            }}>+</button>
        </div>
    </div>
    )
}

useEffect(() => {
  setCounters(cartData?.data?.map((item) => item.quantity))
}, [cartData]);


const PriceBodyTemplate = (val, index) => {
    return(
        <div className='d-flex justify-content-end align-items-center pe-3'>
            {/* {val.price * counters[index.rowIndex]} */}
            {t("QAR")} {val?.product?.product_price}
        </div>
    )
}


const imageBodyTemplate = (data) => {

    return (
        <div className='d-flex justify-content-start align-items-center position-relative '>
            <img  src={data?.product?.product_image_medium}  className="cart_img shadow-2" onError={(e)=> e.currentTarget.src='/assets/images/tatlub-img/No.jpg'}/>
            <div className='ms-3'>
                <h4 className='fw-bold complete_2 text-capitalize'>{data?.product?.product_name}</h4>
                <div className="d-flex justify-content-start"><h4 className='fw-bold'>{t("QAR")} {data?.product?.product_price}.00</h4> </div>
            </div>
            {/* <div className='cancel_img position-absolute' onClick={()=>DeleteCart(product?.id)}>
            <img src='/assets/images/tatlub-img/cart/remove.png'  className="" />
            </div> */}
        </div>
    )
};


const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span className="text-xl text-900 font-bold">{t("Order Confirmation")}</span>
    </div>
);


  return (<>
  <section className='p-0'>
    <div className='container'>
      <div className='d-flex justify-content-center align-items-center mb-4'>
        <div className='text-center'>
        <div className='mb-3'>
        <h3 className='text-color fs-4'>{t("Thank You For Your Order")}</h3>
        </div>
        <div className=''>
          <h4 className='fs-6 lh-base '>{t("Your Order Number Is")} <span className='text-color'>{orderDetails?.order?.unique_id}</span>. {t("A Confirmation Email Has Also Been Sent To The Email Address Provider")}.</h4>
        </div>
        </div>
      </div>

      <div className='row mb-4'>
            <div className='col-lg-9 mb-3'>
              <div className='Cart_card shadow-none '>
                    <div className='mb-3'>
                        <h3>{t("Order Confirmation")}</h3>
                    </div>
                <DataTable value={orderDetails?.order_detail}  >
                        <Column header={t('Product')} alignHeader={'center'} className='' body={imageBodyTemplate}></Column>
                        <Column field="quantity" header={t('Qty')} alignHeader={'center'} body={QntBodyTemplate}></Column>
                        <Column field="price" header={t('Price')} alignHeader={'center'} body={PriceBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>

            <div className='col-lg-3'>
                <div className='Cart_card hadow-none h-100'>
                    {
                    orderDetails &&
                   <div className=''>
                   <h4>{t("Order Summary")}</h4>
                   {/* <div className='d-flex justify-content-between align-items-center mt-3'>
                    <p className='text-muted text-truncate'>2019 Brands Casual Place</p>
                    <p className=''>{t("QAR")}1000.00</p>
                   </div> */}
                   {
                    orderDetails?.order_detail?.length > 0 && 
                    orderDetails?.order_detail.map((data,index)=> (
                        <div className='d-flex justify-content-between align-items-center mt-3' key={index}>
                        <p className='text-muted complete_2 text-capitalize'>{data?.product?.product_name}</p>
                        <p className=''>{t("QAR")} {data?.product?.product_price}.00</p>
                       </div>
                    ))
                   }
                   <hr/>
                   <div className='d-flex justify-content-between align-items-center'>
                    <p className='text-muted text-truncate'>{t("Sub Total")}</p>
                    <p className=''>{t("QAR")} {orderDetails?.order?.total}.00</p>
                   </div>
                   <div className='d-flex justify-content-between align-items-center'>
                    <p className='text-muted text-truncate'>{t("Tax")}</p>
                    <p className=''>{t("QAR")} 00.00</p>
                   </div>
                   <div className='d-flex justify-content-between align-items-center'>
                    <p className=''>{t("Order Tota")}l</p>
                    <p className='text_theme'>{t("QAR")} {orderDetails?.order?.total}.00</p>
                   </div>
                   <hr/>
                   <div className=''>
                   <h4>{t("Payment Method")}</h4>
                   <div className='mt-2'>
                    <h5>{t("Credit Card Number")}</h5>
                   </div>
                   </div>
                   <hr/>
                   <div className=''>
                   <h4>{t("Payment Method")}</h4>
                   <div>
                    <h5>{t("You Will receive your order in 3-4 business days")}</h5>
                   </div>
                   <Link href='/page/account/My-Orders'>
                   {/* <Link href={{pathname:`/orders/${orderDetails?.id}`,query:{data:JSON.stringify(orderDetails?.order_detail)}}}> */}
                   <button type='button' className='btn btn_checkOut w-100 rounded'>{t("Track Order")}</button>
                   </Link>
                   </div>
                   </div>
                    }
                </div>
            </div>
        </div>
    </div>
  </section>
  </>
  )
}
