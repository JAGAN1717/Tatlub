import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getMyCart, removeCart, getquantity } from '../../../components/core/cart_request';
import AuthContex from '../../../components/auth/AuthContex';
import { ToastContainer, toast } from "react-toastify";
import toast1 from 'react-hot-toast';
import Link from 'next/link';
import itemscontex from '../../initcontext';
// import {useSelector,useDispatch} from 'react-redux'
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { DataGrid, GridToolbarExport, GridToolbarContainer, GridToolbar } from '@mui/x-data-grid';


export default function Cart() {
    const router = useRouter();
    const { userData } = useContext(AuthContex)
    const { setCart } = useContext(itemscontex)
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0)
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState();
    const [counters, setCounters] = useState([]);
    // const {cartList} = useSelector((state)=>state.cart)
    // const dispatch = useDispatch()


    const { t } = useTranslation();

    const fetchMyCart = async () => {
        setIsLoading(true)
        let id = userData?.id
        getMyCart(id).then(res => {
            setProducts(res.data)
            // setCart(res.data)
            setTotal(res?.total);
            setIsLoading(false)
        }).catch(err => {
            console.error('err', err.message);
            setIsLoading(false)
        })
    }


    const fetchMyCart2 = async () => {
        // setIsLoading(true)
        let id = userData?.id
        getMyCart(id).then(res => {
            setProducts(res.data)
            // setCart(res.data)
            setTotal(res?.total);
            // setIsLoading(false)
        }).catch(err => {
            console.error('err', err.message);
            setIsLoading(false)
        })
    }

    const updateQnt = async (cart_id, key) => {
        let body = {
            "cart_id": cart_id,
            "quantity": key
        }
        getquantity(body).then(res => {
            fetchMyCart2()
        }).catch(err => {
            console.error('err', err.message);
        })
    }




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

    useEffect(() => {
        setCounters(products?.map((item) => item.quantity))
    }, [products]);

    const DeleteCart = async (id, item) => {
        // dispatch(
        //     removeProduct(
        //         {
        //             ...item,
        //         }
        //     )
        // )

        removeCart(id).then(res => {
            // setProducts(res.data);
            setCart(res)
            fetchMyCart2()
            // toast.info("REMOVED SUCCESSFULL", {
            //     position: "bottom-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     icon: false,
            //     theme: "dark",
            // });
            toast1.success('REMOVED SUCCESSFULL')
        }).catch(err => {
            console.error('err', err.message)
        })
    }

    useEffect(() => {
        fetchMyCart();
    }, [])

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const priceBodyTemplate = (product) => {
        return (
            <div className='d-flex justify-content-center align-items-center'>
                {formatCurrency('1000')}
            </div>
        )
    };
    const QntBodyTemplate = (val, index) => {

        return (
            <div className='d-flex justify-content-center align-items-center'>
                <div className='qnt px-2 p-2 rounded d-flex justify-content-between align-items-center me-2'>
                    <button type='button' className='border-0 fw-bold px-2 bg-transparent' disabled={counters[index.rowIndex] == 1 ? true : false} onClick={() => {
                        handleDecrement(index.rowIndex);
                        // dispatch(decrementProductQty(val))
                        updateQnt(val?.id, 'sub')
                    }}>-</button>
                    <div className='mx-3 fw-600'>{counters[index.rowIndex]}</div>
                    {/* <div className='mx-3'>{val.quantity}</div> */}
                    <button type='button' className='border-0 px-2 fw-bold bg-transparent' onClick={() => {
                        handleIncrement(index.rowIndex);
                        updateQnt(val?.id, 'add')
                        // dispatch(incrementProductQty(val))
                    }}>+</button>
                </div>
            </div>
        )
    }

    const cartItemsTotalAmount = (cartList) => {
        let totalAmount = 0
        if (cartList.length > 0) {
            cartList.forEach((item) => {
                totalAmount += item?.totalPrice
            })
        }
        return totalAmount
    }

    const handleTotalAmountWithAddonsFF = (
        mainTotalAmount,
        selectedAddOns
    ) => {
        if (selectedAddOns?.length > 0) {
            let selectedAddonsTotalPrice = 0
            selectedAddOns.forEach(
                (item) => (selectedAddonsTotalPrice += item.price * item.quantity)
            )
            return mainTotalAmount + selectedAddonsTotalPrice
        } else {
            return mainTotalAmount
        }
    }


    const PriceBodyTemplate = (val, index) => {

        return (
            <div className='d-flex justify-content-center align-items-center fw-600 pe-3'>
                {t("QAR")} {parseInt(val.price * counters[index.rowIndex])}.00
                {/* {val?.totalPrice} */}
            </div>
        )
    }


    const imageBodyTemplate = (product) => {

        return (
            // <div className='d-flex justify-content-start align-items-center position-relative' onClick={() => router.push(`/product-details/${product.product_slug}`)}>
            <div className='d-flex justify-content-start align-items-center position-relative' >
            <img src={product?.product_image_medium} className="cart_img shadow-2 object-fit-contain cursor-pointer bg-light" onError={(e) => e.currentTarget.src = '/assets/images/tatlub-img/No.jpg'} />
                <div className='ms-3'>
                    <h4 className='fw-bold complete_2 text-capitalize lh-base fs-5 foot-cat cursor-pointer'>{product?.product_name}</h4>
                    <div className="d-flex justify-content-start"><h4 className='fw-bold fs-5 text-color'>{t("QAR")} {product?.price ?? product?.product_price}.00</h4>
                        {/* <h4 className='fw-light text-decoration-line-through text-muted text-truncate ms-2'>{t("QAR")}1000.00</h4> */}
                    </div>
                </div>
                <div className='cancel_img position-absolute' onClick={() => DeleteCart(product?.id, product)}>
                    {/* <img src='/assets/images/tatlub-img/cart/remove.png'  className="" /> */}
                    <i class="fa fa-times" aria-hidden="true"></i>
                    {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
                </div>
            </div>
        )
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">MY CART</span>
        </div>
    );


    return (<>
        <section className='p-0 mb-5 mt-5'>
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
                <div className='container'>
                    {
                        products?.length > 0 &&
                        <div className='row '>
                            <div className='col-lg-9 mb-3'>
                                <div className='Cart_card shadow-none h-100'>
                                    <div className='mb-3'>
                                        <h3 className="fs-25">{t('My Cart')}</h3>
                                    </div>
                                    <DataTable value={products} className="" >
                                        <Column header={t("Product")} style={{ width: '450px' }} alignHeader={'center'} className='' body={imageBodyTemplate}></Column>
                                        <Column field="quantity" header={t('Qnt')} alignHeader={'center'} body={QntBodyTemplate}></Column>
                                        <Column field="price" header={t("Price")} style={{ width: '250px' }} alignHeader={'center'} body={PriceBodyTemplate}></Column>
                                    </DataTable>
                                    <ul class="list-group list-group-flush d-none">
                                        {
                                            products?.map((product, index) => (
                                                <div className='list-group-item'>
                                                    <div className='row align-items-center showwww  mt-2' key={index}>
                                                        <div className='col-lg-6 col-md-9 mb-lg-0 mb-3'>
                                                            <div className='d-sm-flex align-items-center'>
                                                                <div className=' mb-sm-auto mb-3 rounded-3 d-flex justify-content-center bg-light p-2 position-relavtive'>
                                                                    <img src={product?.product_image_medium} className="orde_img2 object-fit-contain" />
                                                                    <div className='cancel_img position-absolute top-50 translate-middle' onClick={() => DeleteCart(product?.id, product)}>
                                                                        {/* <img src='/assets/images/tatlub-img/cart/remove.png'  className="" /> */}
                                                                        <i class="fa fa-times" aria-hidden="true"></i>
                                                                        {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
                                                                    </div>
                                                                </div>
                                                                <div className='mx-sm-3'>
                                                                    <h4 className='text-capitalize complete_2 fs-5 fw-bold  lh-base'>{product?.product_name}</h4>
                                                                    {/* <h4 className='text-secondary  fw-normal lh-base fs-20'>{JSON.parse(product?.quantity)} {t("QTY")}</h4> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-3 col-md-4 col-6 mb-sm-0 mb-3  d-sm-flex justify-content-lg-end align-items-center'>
                                                            <div className='qnt px-3 p-1 rounded d-flex justify-content-between'>
                                                                <button type='button' className='border-0' disabled={counters[index] == 1 ? true : false} onClick={() => {
                                                                    handleDecrement(index);
                                                                    // dispatch(decrementProductQty(val))
                                                                    updateQnt(product?.id, 'sub')
                                                                }}>-</button>
                                                                <div className='mx-3'>{counters[index]}</div>
                                                                {/* <div className='mx-3'>{val.quantity}</div> */}
                                                                <button type='button' className='border-0' onClick={() => {
                                                                    handleIncrement(index);
                                                                    updateQnt(product?.id, 'add')
                                                                    // dispatch(incrementProductQty(val))
                                                                }}>+</button>
                                                            </div>
                                                        </div>

                                                        <div className='col-lg-3 col-md-4  col-6 mb-sm-0 mb-3 d-sm-flex justify-content-lg-end align-items-center'>
                                                            <div className=''>
                                                                <h4 className='text-color fw-normal lh-base fs-5'>{t("QAR")} {product?.price * counters[index]}</h4>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div className='col-lg-3 px-lg-0'>
                                <div className='Cart_card shadow-none'>
                                    <div className=''>
                                        <h4 className='fs-20'>{t('Order Summary')}</h4>
                                        {
                                            products?.length > 0 &&
                                            products.map((data, index) => (
                                                <div className='row align-items-center mt-3' key={index}>
                                                    <div className='col-7'>
                                                        <p className='text-muted complete_1 text-capitalize'>{data?.product_name}</p>
                                                    </div>
                                                    <div className='col-5 d-flex justify-content-end'>
                                                        <p className=''>{t("QAR")} {data?.price * counters[index]}.00</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <hr />
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className='text-dark text-truncate'>{t('Sub Total')}</p>
                                            <p className=''>{t("QAR")} {total}.00</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className='text-muted text-truncate'>{t("Tax")}</p>
                                            <p className=''>{t("QAR")} 00.00</p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className=''>{t('Order Total')}</p>
                                            <p className='text_theme'>{t("QAR")} {total}.00</p>
                                        </div>
                                        <hr />
                                        {/* <h4>Discount Code</h4>
                                            <div className='mb-3'>
                                                <input type='text' placeholder='Enter code' className='form-control' />
                                            </div> */}
                                        <Link href={'/Shipping'}><a className='text-light '><button type='button' className='btn p-2 fs-15 btn_checkOut w-100 rounded'>{t("Check Out")}</button></a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        products?.length == 0 || !products &&
                        <div className="card empty-wishlist shadow-sm p-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="fw-bold">{'MY CART'}</h4>
                                <div className="filer-search-wicon d-none">
                                    <div className="search">
                                        <span className="fa fa-search"></span>
                                        <input placeholder="Search In This Store" />
                                    </div>
                                </div>
                            </div>


                            <div className="text-center">
                                <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                                <p className="text-muted text-center">{t('Your Cart Is Empty')}!</p>
                            </div>
                        </div>
                    }

                </div>

            }
        </section>
    </>
    )
}
