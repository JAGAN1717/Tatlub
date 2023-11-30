import React, { useContext, useEffect, useState, useRef } from 'react'
import CommonLayout from '../../../components/shop/common-layout';
import { Row, Container, Col } from "reactstrap";
import { getManageOrderList, getOrderStatus, UpdateStatus } from '../../../components/core/Order_request';
import Usercontex from '../../../components/auth/AuthContex';
import authenticated from '../../../components/auth/auth';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Skeleton } from 'primereact/skeleton';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import Seo from '../../../seo/seo';
import { useTranslation } from "react-i18next";
import Selection from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import 'rc-table/assets/index.css';
import Table from 'rc-table'
import moment from 'moment';
import ManageOrderInfo from './ManageOrderInfo';
import * as XLSX from 'xlsx';
import Link from 'next/link';


function Manage_orders() { 
  const { userData } = useContext(Usercontex)
  const [oderlist, setOrderlist] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [Status, setStatus] = useState([]);
  const [url, setUrl] = useState();
  const [viewD,setViewD] = useState('')
  const [rcdata,setRcData] = useState([])
  const [expandedRows, setExpandedRows] = useState(null);
  // const toast = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const { t } = useTranslation();

  console.log("viewDviewD",viewD)

  const handleStatusChange = (status) => {
    let body = {
      "status": status,
      "order_id": OrderId
    }
    UpdateStatus(body).then(res => {
      fetchOrderList()
      toast.info("STATUS UPDATED", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        icon: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false)
    }).catch(err => console.error("err", err.message))
  }


  const fetchOrderList = async () => {
    setIsLoading(true)
    let id = userData?.id
    getManageOrderList(id).then(res => {
      let data = res.data?.filter(e => e.unique_id != null)
      setOrderlist(data)
      let rcvalue = []
       data.map(v => {
        rcvalue.push({...v,children:v?.order_details})
      })
      setRcData(rcvalue)
      setIsLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setIsLoading(false)
    })
  }


  const orderStatus = async () => {
    setIsLoading(true)
    getOrderStatus().then(res => {
      setStatus(res.data)
      setIsLoading(false)
    }).catch(err => {
      console.error("err", err.message)
      setIsLoading(false)
    })
  }


  useEffect(() => {
    fetchOrderList()
    orderStatus()
  }, []) 

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const imageBodyTemplate = (product) => {
    return <img src={product?.products?.product_image_medium ?? 'kghk'} onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")} alt={product.image} className="shadow orde_img rounded object-fit-contain bg-white" />;
  };

  const image1BodyTemplate = (product) => {
    return <img src={product?.user?.user_image} alt={product.image} onError={(e) => (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")} className="shadow orde_img rounded" />;
  };

  const priceBodyTemplate = (product) => {
    return <h4>{t("QAR")} {parseInt(product?.products?.product_price)}</h4>;
  };

  const qntBodyTemplate = (product) => {
    return <h4>{parseInt(product?.quantity)}</h4>;
  };

  const TotalBodyTemplate = (product) => {
    return <h4>{t("QAR")} {parseInt(product?.total)}</h4>;
  };

  const CreatedOrder = (product) => {
    let day = moment(product?.created_at);
    let fromhour = moment.utc(day).local().startOf('seconds').fromNow()

    return <h4>{fromhour}</h4>;
  };



  const StatusBodyTemplate = (product) => {
    // return (<div onClick={() => setOrderId(product?.id)} >
    //   <select class="form-select fs-5 p-3 w-100" value={product?.order_status ?? '0'} onChange={(e) => { setSelectedStatus(e.target.value); handleStatusChange(e.target.value) }} aria-label="Default select example">
    //     {
    //       Status?.map((data, i) => (
    //         <option className='text-capitalize' value={data?.id} key={i}>{t(data?.name)}</option>
    //       ))
    //     }
    //   </select>
    // </div>)

    return (
      <Link href={{ pathname: `/page/account/ManageOrderInfo`, query: { id: product?.id  } }}>
      <button type='button' className='btn btn-theme p-2 rounded' >{t('View Details')}</button>
    </Link>
    )
  };


  // const ratingBodyTemplate = (product) => {
  //     return <Rating value={product.rating} readOnly cancel={false} />;
  // };

  const nameBodyTemplate = (product) => {
    return <h4 className='text-capitalize'>{product?.products?.product_name}</h4>;
  };

  // const statusBodyTemplate = (product) => {
  //   if(product?.product != null){
  //     return <Tag value={product.delivery_status} severity={getSeverity(product)}></Tag>;
  //   }
  // }; 

  const rowExpandable = (record) => false;


  const columns = [
    {
      title: "Tracking Number" ,
      dataIndex: 'unique_id',
      key: 'unique_id',
      align: 'center',
      width: 150,
    },
    {
      title: t('Total'),
      dataIndex: 'total',
      key: 'total',
      align: "alignLeft",
      render: (price) => (
        <span>{JSON.parse(price ?? 0)}</span>
      ),
    },
    {
      title: t("Order Date"),
      className: 'cursor-pointer',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      // onHeaderCell: () => onHeaderClick('created_at'),
      render: (date) => {
        let day = moment(date?.created_at);
        let day2 = new Date();
        let now = moment(day2);
        let ago = now.diff(day, "days");
        let fromhour = moment.utc(date?.created_at).local().startOf('seconds').fromNow()
        return (
          <span className="whitespace-nowrap">
           {fromhour != 'Invalid date' ? fromhour : ''}
          </span>
        );
      },
    }, 
    {
      title: t('Status'),
      dataIndex: 'order_status',
      key: 'order_status',
      align: "alignLeft",
      render: (value) => (
        <Tag value={t(getSeverity2(value))} className='w-100 p-2' severity={getSeverity3(value)}></Tag>
      ),
    },
    {
      title: t('Shipping Address'),
      dataIndex: 'user',
      key: 'user',
      align: "alignLeft",
      render: (user) => (
        <span>{user?.address
        }</span>
      ),
    },
    {
      title: t('Action'),
      // dataIndex: 'id',
      key: 'actions',
      align: "center",
      render: (data) => (
        <button type='button' onClick={()=>setViewD(data)} className='btn btn-theme fw-normal rounded p-2 '>{t('View Details')}</button>
      ),
    },
  ]
 
  const getSeverity2 = (status) => {
    switch (status) {
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

  const getSeverity3 = (status) => {
    switch (status) {
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
        return 'Canceled';
      default:
        return 'warning';
    }
  };

  const getSeverity = (product) => {
    switch (product.delivery_status) {
      case 'completed':
        return 'success';

      case 'pending':
        return 'warning';

      case 'cancel':
        return 'danger';

      default:
        return null;
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

  const onRowExpand = (event) => {
    // toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
  };

  const onRowCollapse = (event) => {
    // toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
  };

  const expandAll = () => {
    let _expandedRows = {};

    products.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const allowExpansion = (rowData) => {
    return rowData.order_details?.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3 ordlis">
        {/* <h5>Orders for Tatlub</h5> */}
        <DataTable value={data?.order_details}>
          {/* <Column field="id" header="Id" sortable></Column> */}
          <Column header={t("IMAGE")} body={imageBodyTemplate}></Column>
          <Column header={t("PRODUCT NAME")} body={nameBodyTemplate} ></Column>
          <Column header={t("PRICE")} body={priceBodyTemplate} ></Column>
          <Column header={t("QNT")} body={qntBodyTemplate} ></Column>
          {/* <Column fheader="Status" body={statusBodyTemplate} sortable></Column> */}
          {/* <Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></Column> */}
        </DataTable>
      </div>
    );
  }; 

  const expandedRowRender = (record) => {
    const childColumns = [
      {
        title: "Order ID" ,
        dataIndex: 'order_id',
        key: 'order_id',
        align: 'center',
        width: 150,
      },
      {
        title: "Product Name" ,
        dataIndex: 'products',
        key: 'products',
        align: 'center',
        render: (data) => (
          <span>{data?.product_name}</span>
        ),
      },
      {
        title: "Price" ,
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        width: 150,
      },
      {
        title: "Quantity" ,
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
        width: 150,
        render: (data) => (
          <span>{JSON.parse(data)}</span>
        ),
      },
    ];

    return (
      <Table
        columns={childColumns}
        data={record.children}
        rowKey={(record) => record.id}
        pagination={false}
      />
    );
  }; 
  

  const exportToExcel = () => {
    // Sample data for Sheet 1
    const dataSheet1 = [
      { name: 'John Doe', age: 25, city: 'New York', date: '2023-11-21 06:10:44' },
      { name: 'Jane Smith', age: 30, city: 'San Francisco', date: '2023-11-20 06:10:44' },
      // Add more data as needed
    ];
    
    // Sample data for Sheet 2
    const dataSheet2 = [
      { product: 'Laptop', price: 1000, quantity: 5, date: '2023-11-24 06:10:44' },
      { product: 'Phone', price: 500, quantity: 10, date: '2023-11-23 06:10:44' },
      // Add more data as needed
    ];

    // Create a workbook
    const workbook = XLSX.utils.book_new();

    // Add Sheet 1
    const sheet1 = XLSX.utils.json_to_sheet(dataSheet1);
    XLSX.utils.book_append_sheet(workbook, sheet1, 'Sheet 1');
  
    // Add Sheet 2
    const sheet2 = XLSX.utils.json_to_sheet(dataSheet2);
    XLSX.utils.book_append_sheet(workbook, sheet2, 'Sheet 2');
  
    // Save the workbook
    XLSX.writeFile(workbook, 'exported_data.xlsx');

    // Save the blob as a file
    // const fileName = 'exported_data.xlsx';
    // const link = document.createElement('a');
    // link.href = window.URL.createObjectURL(blob);
    // link.download = fileName;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }; 

  const exportOrder = () => {
    // const jsonData = JSON.stringify(oderlist);
    // const blob = new Blob([jsonData], { type: 'application/json' });
    // const url = URL.createObjectURL(blob);

    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'data.json';
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);
  
    const workbook = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(oderlist);

    let product = []
    oderlist?.map(data => {
      data?.order_details?.map(data2 => {
        product.push(data2?.products,data2)
      })
    })
 
    const sheet2 = XLSX.utils.json_to_sheet(product);

    XLSX.utils.book_append_sheet(workbook, sheet, 'Order list');

    XLSX.utils.book_append_sheet(workbook, sheet2, 'Product list');

    XLSX.writeFile(workbook, 'exported_orders.xlsx');

  }
   


  return (
    <CommonLayout parent="home" title="Manage Orders">
      <Seo title={`Manage Orders`} />

      <section className='Mange_order mb-3 '>
        <Container>
          <div className="card empty-wishlist shadow-sm p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="fw-bold fs-25">{t("Manage Orders")}</h4>
              <div className="filer-search-wicon ">
                {/* <div className="search">
                  <span className="fa fa-search"></span>
                  <input placeholder="Search In This Store" />
                </div> */}
                {
                oderlist?.length > 0 &&
                // <i title='Export Order' role='button' onClick={exportOrder} className="fa fa-cloud-download fs-4 text-color " aria-hidden="true"></i>
                <button
                type="button"
                className="btn px-5 btn_cart ms-sm-3 fs-5 fw-normal mb-2 rounded"
                onClick={exportOrder}
              >
               <i class="fa fa-cloud-download  me-2 " aria-hidden="true"></i> 

                {t("Export Order")}
              </button>
               }
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
            ) :
              oderlist?.length > 0 ?
                <div className="my_orderlist ordlis">
                  {/* <button onClick={exportToExcel}>Export to Excel</button> */}
                  {/*  rowsPerPageOptions={[5, 10, 25, 50]} */}
                  {/* <DataTable value={oderlist}  scrollable  virtualScrollerOptions={{ itemSize: oderlist?.length }} scrollHeight="400px"  tableStyle={{ minWidth: '60rem' }}> */}
                  <DataTable value={oderlist} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate} dataKey="id" paginator rows={5} tableStyle={{ minWidth: '60rem' }}>
                    {/* <Column expander={allowExpansion} style={{ width: '5rem' }} /> */}
                    <Column header={t("ORDER ID")} field='order_code'></Column>
                    <Column header={t("NAME")} field='user.name'></Column>
                    {/* <Column header={t("IMAGE")} body={image1BodyTemplate}></Column> */}
                    <Column header={t("TOTAL")} body={TotalBodyTemplate}></Column>
                    <Column header={t("ORDER DATE")} body={CreatedOrder}></Column>
                    <Column header={t("ACTION STATUS")} body={StatusBodyTemplate}></Column>
                  </DataTable> 
 
                  {/* {
                    viewD ?  
                   <ManageOrderInfo orderD={viewD} /> 
                    : 
                  <Table
                    columns={columns}
                    emptyText={t('Data Not Found')}
                    data={oderlist}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                    expandable={{ 
                      expandedRowRender: ()=> '',
                      rowExpandable: rowExpandable,
                    }}
                   />
                  } */}
                </div> :
                 <div className="text-center">
                  {/* <img src="/assets/images/tatlub-img/Manage Orders.png"  className=""/> */}
                  <img src="/assets/images/tatlub-img/not_Found.png" className="" />
                  <p className="text-muted">{t("Order Not Found")}</p>
                </div>
                }
          </div>
        </Container>
      </section>
    </CommonLayout>
  )
}


export default authenticated(Manage_orders)