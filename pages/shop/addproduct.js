import React, { useState, useEffect, useRef } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { getbranch, deletebranch, updatebranch, getproduct} from "../../components/core/shop_requests";
import { Container, Row, Form, Input, Label, Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authenticate from "../../components/auth/auth";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {DeleteProduct} from '../../components/core/product_request'
import Avatar from "@mui/material/Avatar";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import { Skeleton } from 'primereact/skeleton';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";   
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';
import Seo from "../../seo/seo";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as XLSX from 'xlsx';
import FileCopyIcon from '@mui/icons-material/FileCopy';


const RenderProfileImage = ({ value }) => {

    return (
      <Avatar variant="rounded" src={value} />
    )
  };


const columns = [
    // { id: 'id', label: 'ID', minWidth: 10 },
    { id: 'product_name', label: 'Product Name', minWidth: 150 },
    { id: 'product_price', label: 'Product Price', minWidth: 150 },
    // { id: 'product_image_medium', label: 'Preview Images', minWidth: 150, },
    {
        id: 'product_image_medium',
        label: 'product_image_medium',
        renderCell: (param) => console.log("whreurhieugrergg"),
      },
    { id: 'edit', label: 'edit', minWidth: 100, },
    { id: 'Delete', label: 'Delete', minWidth: 100, },
    // { id: 'select_brand', label: 'Select Brand', minWidth: 250,},
    // { id: 'product_status', label: 'Product Status', minWidth: 150,},
    // { id: 'feature_image', label: 'Feature Image', minWidth: 150, },
    // { id: 'gallery_images', label: 'Gallery Images', minWidth: 150, },
    // { id: 'product_description', label: 'Product Description', minWidth: 250,},
  ];

  function createData(product_name, product_price,product_image_medium,edit, Delete) {
    return { product_name, product_price,product_image_medium,edit, Delete };
  }


 function Addproduct() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const rows = [];
    const [product, setProducts] = useState([]);
    const router = useRouter()
    const [produtId,setProductId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState();
    const [lockedCustomers, setLockedCustomers] = useState([]);
    const { t } = useTranslation();
    const ITEM_HEIGHT = 48;


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    }; 

    const exportProduct = () => {
      const workbook = XLSX.utils.book_new();
      // Add Sheet 
      const sheet = XLSX.utils.json_to_sheet(product);
      
      XLSX.utils.book_append_sheet(workbook, sheet, 'Order list');
  
      XLSX.writeFile(workbook, 'product_list.xlsx');
      handleClose()
    }


    const toast2 = useRef(null); 

    const accept = () => {
      toast2.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  }

  const reject = () => {
      toast2.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }



    const fetchproducts = async () => {
          try {
            setIsLoading(true)
            let id = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
            const responce = await getproduct(id)
            setProducts(responce.data);
            if(responce?.data?.length == 0){
              router.push('/shop/Business')
            }
            setIsLoading(false)
            // console.log('jhfgj', responce.data)
          } catch (error) {
            console.error('err',error.message)
          }
    }
  
    product?.map((data, index) => (
      rows.push(createData( data.product_name,data.product_price,data.product_image_medium, <i className="fa fs-5 fa-edit edit_icon"></i>, <i className="fa fs-5 fa-trash delete_icon"></i>))
    ))
        
    

const handleChangeRowsPerPage = () => {  }
const handleChangePage = () => { }


useEffect(() => {
    fetchproducts(); 

    setLockedCustomers([
      // {
      //     id: 5135,
      //     name: 'Geraldine Bisset',
      //     country: {
      //         name: 'France',
      //         code: 'fr'
      //     },
      //     company: 'Bisset Group',
      //     status: 'proposal',
      //     date: '2019-05-05',
      //     activity: 0,
      //     representative: {
      //         name: 'Amy Elsner',
      //         image: 'amyelsner.png'
      //     }
      // }
  ]);
  }, [])

  const lockTemplate = (rowData, options) => {
    const icon = options.frozenRow ? 'fa fa-lock' : 'fa fa-unlock';
    const disabled = options.frozenRow ? false : lockedCustomers.length >= 2;

    return <Button type="button" icon={icon} disabled={disabled} className="p-button-sm p-button-text" onClick={() => toggleLock(rowData, options.frozenRow, options.rowIndex)} />;
};

        const toggleLock = (data, frozen, index) => {
          let _lockedCustomers, _unlockedCustomers;

          if (frozen) {
              _lockedCustomers = lockedCustomers.filter((c, i) => i !== index);
              _unlockedCustomers = [...product, data];
          } else {
              _unlockedCustomers = product.filter((c, i) => i !== index);
              _lockedCustomers = [...lockedCustomers, data];
          }

          _unlockedCustomers.sort((val1, val2) => {
              return val1.id < val2.id ? -1 : 1;
          });

          setLockedCustomers(_lockedCustomers);
          setProducts(_unlockedCustomers);
        };


const loadingTemplate = (options) => {
    return (
        <div className="flex align-items-center" style={{ height: '17px', flexGrow: '1', overflow: 'hidden' }}>
            <Skeleton width={options.cellEven ? (options.field === 'product_name' ? '30%' : '40%') : '60%'} height="1rem" />
        </div>
    );
};

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const priceBodyTemplate = (product) => {
  return formatCurrency(product.product_price);
};

  const imageBodyTemplate = (product) => {
    // return <img src={product.product_image_medium} alt={product.image} className="table_img" />;
    return (
        <img src={product.product_image_medium} className="pro_table bg-light object-fit-contain" alt={product.image} height="70" width="70"  />

    )
};

const handleEdit = (product) => {
  // onClick={()=> router.push({pathname:'/shop/addnewproduct',query:{pro_id : product.id }})}
  return (
  <div onClick={()=> router.push({pathname:'/shop/addnewproduct',query:{pro_id : product.id }})}>
    <i className="fa fs-5 fa-edit edit_icon"></i> 
  </div>
  )
}

const RemoveProduct = async () => {
  const id = produtId
  const responce = await DeleteProduct(id)
  if(responce.status == 200){
    toast.info("DELETED SUCCESSFULL", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      icon:false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    fetchproducts();
  }else {
    toast.error('Somthing Went Wrong!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      }); 
  }
}

const confirm2 = () => {
  confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,
      reject
  });
};

const handleDelete = (product) => {
  return (
  <div role="button" data-bs-toggle="modal" data-bs-target="#exampleModalCenter1" onClick={()=>setProductId(product.id)}>
  <i className="fa fs-5 fa-trash delete_icon" ></i>
  </div>
  )
}

const handleAction = (product) => {
  return (
    <div className="d-flex align-items-center">
  <div role="button" className="mx-2" data-bs-toggle="modal" data-bs-target="#exampleModalCenter1" onClick={()=>setProductId(product.id)}>
  <i className="fa fs-5 fa-trash delete_icon" ></i>
  </div>
  <div className="mx-2 pt-1" onClick={()=> router.push({pathname:'/shop/addnewproduct',query:{pro_id : product.id }})}>
    <i className="fa fs-5 fa-edit edit_icon"></i> 
  </div>
    </div>
  )
}

const getSeverity2 = (product) => {
  switch (product) {
    case '3':
      return 'draft';
    case '2':
      return 'Publish';
};
}

const getSeverity = (product) => {
  switch (product) {
    case '3':
      return 'danger';
    case '2':
      return 'info';
};
}



const handleStatus = (product) => {
  console.log('kjsgsklddgddlsd',product?.product_status)

  return(
    <Tag value={t(getSeverity2(`${product?.product_status}`))} severity={getSeverity(`${product?.product_status}`)}></Tag>
  )
}






const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const header = (
    <div className="d-flex  align-items-center justify-content-center gap-2">
        <span className=" fs-4 fw-bold">{t('Products')}</span>
        {/* <Button icon="pi pi-refresh" rounded raised /> */}
    </div>
);

const footer =(
 <div className="foot"> {t('In total there are')} {product ? product.length : 0} {t('products')}</div>
)

  return (
    <CommonLayout>
        <Seo title={`Products`} description={`''`} />

{/* Delete popup */}
<div className="modal fade" id="exampleModalCenter1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
    <div className="modal-body w-100">
      <div className="d-flex justify-content-center text-center align-items-center">
        <div className="p-5">
          <h4 className="fw-bold">{t('Are You Sure')}?</h4>
          <p>{t('You Want to Delete This File')}?</p>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button type="buton" data-bs-dismiss="modal" className="btn btn-success w-100 mx-2 rounded">{t('NO')}</button>
            <button type="buton" data-bs-dismiss="modal" className="btn btn-danger w-100 mx-2 rounded" onClick={()=>RemoveProduct()}>{t('YES')}</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{isLoading && (
<div className="loader-wrapper">
  {url === "Christmas" ? (
    <div id="preloader"></div>
  ) : (
    <div className="loader"></div>
  )}
</div> ) }

{!isLoading &&   
<div className="container my-lg-5 my-3 img_ciljhf">
    <div className="mb-3 d-flex justify-content-md-end justify-content-start align-items-center">
       <Link href='/shop/addnewproduct'>
            <button type='button' className='btn btn_header fw-500 fs-15 p-3 px-4 cursor-pointer'>{t('Add New Product')}</button>
        </Link>
        {
          product?.length > 0 && 
          <div className="mx-1">
          <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '25ch',
            },
          }}
        >

            <MenuItem key={'Export Product'}  onClick={exportProduct}>
            <i class="fa fa-cloud-download pe-2" aria-hidden="true"></i> 
            {/* <FileCopyIcon /> */}
             {'Export Product'}
            </MenuItem>
        </Menu>
          </div>
        }
    </div>

  {/* <Toast ref={toast2} />
  <ConfirmDialog />
<Button onClick={confirm2} icon="pi pi-times" label="Delete"></Button> */}
    <div className="primer_Table">
      <div className="rounded-3">
            <DataTable value={product} footer={footer} frozenValue={lockedCustomers}  scrollable  scrollHeight="500px"  paginator rows={5}  tableStyle={{ minWidth: '60rem' }}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" 
          // paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} 
         >
                <Column header="Image" body={imageBodyTemplate} style={{ width: '10%' }} ></Column>
                <Column field="product_name" sortable   header="Name" style={{ width: '20%' }}></Column>
                <Column field="product_price" sortable  header="Price" style={{ width: '20%' }} ></Column>
                <Column field="meta_title" header="Meta" style={{ width: '20%' }}></Column>
                <Column  header="Status" body={handleStatus} style={{ width: '20%' }}></Column>
                <Column  header="Action" body={handleAction} style={{cursor:'pointer'}}></Column>
                {/* <Column  header="EDIT" body={handleEdit} style={{cursor:'pointer'}} ></Column>
                <Column  header="DELETE" body={handleDelete} style={{cursor:'pointer'}}></Column> */}
                {/* <Column style={{ flex: '0 0 4rem' }} body={lockTemplate}></Column> */}
                {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column> */}
                {/* <Column header="Status" body={statusBodyTemplate}></Column> */}
            </DataTable>
        </div> 
        </div>

          </div> }

    </CommonLayout>
  );
}


export default authenticate(Addproduct);