import React, { useContext, useEffect, useState } from 'react'
import CommonLayout from '../../../components/shop/common-layout';
import { Row, Container, Col } from "reactstrap";
import { getOrderList } from '../../../components/core/Order_request';
import Usercontex from '../../../components/auth/AuthContex';
import authenticated from '../../../components/auth/auth';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Skeleton } from 'primereact/skeleton';
import Seo from '../../../seo/seo'
import { useTranslation } from "react-i18next";
import Link from 'next/link';
import moment from 'moment';


function My_orders() {
  const { t } = useTranslation();

  const { userData } = useContext(Usercontex)
  const [oderlist, setOrderlist] = useState([])
  const [sliceOrder, setsliceOrder] = useState(6)
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState();


  const fetchOrderList = async () => {
    setIsLoading(true)
    let id = userData?.id
    getOrderList(id).then(res => {
      setIsLoading(false)
      let data = res.data?.order_detail?.filter(e => e.product != null)
      let data3 = res.data?.order
      //  let data2 = res.data?.order_detail.filter(e => res.data?.order?.some(p => e.order_id == p.id))
      setOrderlist(data)
      let data2 = res.data?.order_detail.map(p => res.data?.order?.find(e => e.id == p.order_id)?.order_status)
    }).catch(err => {
      console.error("err", err.message);
      setIsLoading(false)
    })

  }
  useEffect(() => {
    fetchOrderList()
  }, [])

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const imageBodyTemplate = (product) => {
    if (product?.product != null) {
      return <img src={product?.product?.product_image_medium} alt={product.image} className="shadow orde_img rounded object-fit-contain bg-white" />;
    }
  };

  const priceBodyTemplate = (product) => {
    // if (product?.product != null) {
    // return <h4>{t("QAR")} {product?.product?.product_price}</h4>;
    return <h4>{t("QAR")} {parseInt(product?.total)}</h4>;
    // }
  };

  // const ratingBodyTemplate = (product) => {
  //     return <Rating value={product.rating} readOnly cancel={false} />;
  // };

  const nameBodyTemplate = (product) => {

    // return <h4 className='text-capitalize'>{product.product?.product_name}</h4>;
    return <h4 className='text-capitalize'>{product.unique_id}</h4>;
  };

  const statusBodyTemplate = (product) => {
    // if (product?.product != null) {
    return <Tag value={t(getSeverity2(product))} severity={getSeverity(product)}></Tag>;
    // }
  };

  const trackBodyTemplate = (product) => {
    // if (product?.product != null) {
    return (
      <Link href={{ pathname: `/orders/${product?.id}`, query: { id: product?.id } }}>
        <button type='button' className='btn btn-theme p-2 rounded' >{product.order_status?.id == 6 ? t('View Details') : t('Track Order')}</button>
      </Link>
    );
    // }
  };

  const CreatedOrder = (product) => {
    let day = moment(product?.created_at);
    let fromhour = moment.utc(day).local().startOf('seconds').fromNow()

    return <h4>{fromhour}</h4>;
  };


  const getSeverity = (product) => {
    switch (product?.order_status?.id) {
      case '1':
        return 'warning';
      case '2':
        return 'success';
      case '3':
        return 'warning';
      case '4':
        return 'warning';
      case '5':
        return 'warning';
      case '6':
        return 'success';
      case '7':
        return 'danger';
      case '8':
        return 'danger';
      default:
        return 'warning';
    }
  };

  const getSeverity2 = (product) => {
    switch (product?.order_status?.id) {
      case '1':
        return 'Pending';
      case '2':
        return 'Confirmed';
      case '3':
        return 'Processing';
      case '4':
        return 'Handover';
      case '5':
        return 'Out for Delivery';
      case '6':
        return 'Delivered';
      case '7':
        return 'Canceled';
      case '8':
        return 'Canceled';
      default:
        return 'Pending';
    }
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{t("Order List")}</span>
      {/* <Button icon="pi pi-refresh" rounded raised /> */}
    </div>
  );
  // const footer = `In total there are ${products ? products.length : 0} products.`;

  const loadingTemplate = (options) => {
    return (
      <div className="flex align-items-center" style={{ height: '17px', flexGrow: '1', overflow: 'hidden' }}>
        <Skeleton width={'60%'} height="1rem" />
      </div>
    );
  };


  return (
    <CommonLayout parent="home" title="Manage Orders">
      <Seo title={`My Orders`} />

      <section className='Mange_order mb-3'>
        <Container>
          <div className="card empty-wishlist shadow-none p-lg-5 p-4 mt-3">
            <div className="d-flex align-items-start justify-content-between mb-4">
              <h4 className="fw-bold fs-25">{t("My Orders")}</h4>
              <div className="filer-search-wicon d-none">
                <div className="search">
                  <span className="fa fa-search"></span>
                  <input placeholder="Search In This Store" />
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
            ) : <>
              <div className='d-none'>
                {
                  oderlist.length > 0 &&
                  <div className="my_orderlist orree">
                    <DataTable value={oderlist} loading={isLoading} paginator rows={5} tableStyle={{ minWidth: '60rem' }}>
                      {/* <Column header={t("Image")} body={imageBodyTemplate}></Column> */}
                      <Column header={t("ORDER ID")} body={nameBodyTemplate}></Column>
                      <Column header={t("ORDER DATE")} body={CreatedOrder}></Column>
                      <Column header={t("TOTAL")} body={priceBodyTemplate}></Column>
                      <Column header={t("STATUS")} body={statusBodyTemplate}></Column>
                      <Column header={t("TRACK")} body={trackBodyTemplate}></Column>
                    </DataTable>
                  </div>
                }
              </div>

              {
                oderlist?.slice(0, sliceOrder).map((data, index) => (
                  <div className='card rounded-4 p-3 mb-3' key={index}>
                    <div className='row align-items-center showwww'>
                      <div className='col-lg-6 col-md-9 mb-lg-0 mb-3'>
                        <div className='d-sm-flex align-items-center'>
                          <div className=' mb-sm-auto mb-3 rounded-3 d-flex justify-content-center bg-secondary-subtle p-2'>
                            <img src={data?.product?.product_image_medium} className="orde_img2 object-fit-contain" />
                          </div>
                          <div className='mx-sm-3'>
                            <h4 className='text-capitalize complete_2 fs-20 fw-bold  lh-base'>{data?.product?.product_name}</h4>
                            <h4 className='text-color fw-normal fs-20'>{t("QAR")} {data?.product?.product_price}</h4>
                          </div>
                        </div>
                      </div>

                      {/* <div className='col-sm-2 mb-sm-0 mb-3 d-sm-flex  justify-content-center'>
                      </div> */}

                      <div className='col-lg-3 col-md-4 col-6 mb-sm-0 mb-3  d-sm-flex justify-content-lg-end align-items-center'>
                        <div className=''>
                          <Tag value={t(getSeverity2(data))} className='p-2 rounded-4' severity={getSeverity(data)}></Tag>
                        </div>
                      </div>

                      <div className='col-lg-3 col-md-4  col-6 mb-sm-0 mb-3 d-sm-flex justify-content-lg-end align-items-center'>
                        <div className=''>
                          <Link href={{ pathname: `/orders/${data?.order_id}`, query: { id: data?.order_id, ids: data?.id } }}>
                            <button type='button' className='btn btn-lead1 mt-0 text-truncate' >{data?.product?.order_status?.id == 6 ? t('View Details') : t('Track Order')}</button>
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                ))
              }

              {
                oderlist?.length > 6 && oderlist?.length != sliceOrder &&
                <div className='d-flex justify-content-center mt-4'>
                  <button type='button' onClick={() => setsliceOrder(oderlist?.length)} className='btn_hover bt_suyr fw-light fw-bolder p-2 px-4' >{t("Load More")}</button>
                </div>
              }

              {
                oderlist.length == 0 &&
                <div className="text-center">
                  <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                  <p className="text-muted">{("Order Not Found!")}</p>
                </div>
              }

            </>
            }



            {/* 
              { oderlist.length > 0 &&
              oderlist.map((data,index)=> (
              <div className='review_card p-4 mb-3' key={index}>
                  <div className='row justify-content-center align-items-center'>
                    <div className='col-md-5 mb-3'>
                     <div className='d-flex  align-items-center'>
                      <div className='d-flex justify-content-center'>
                      <img src={data?.product?.product_image_medium} className='ord_Img ' />
                      </div>
                      <div>
                        <p className='complete_1 ms-2'>{data?.product?.product_name}</p>
                      </div>
                      </div>
                    </div>
                    <div className='col-md-3 mb-3'>
                      <h4>{data?.product?.product_price}</h4>
                    </div>
                    <div className='col-md-4 mb-3'>
                      <div className='d-flex  align-items-center mb-2'>
                      <div className="red-dot"></div>
                      <div className='ms-2'>Delivery Expected By Today</div>
                      </div>
                      <p>Seller has been processed your order</p>
                    </div>
                  </div>
                </div>
              ))
                } */}
          </div>
        </Container>
      </section>
    </CommonLayout>
  )
}


export default authenticated(My_orders)