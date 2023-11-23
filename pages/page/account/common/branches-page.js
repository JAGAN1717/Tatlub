import React,{useState,useEffect} from 'react'
import { Container, Row, Form, Input, Label, Col } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import {GetBranchesData,UpdateBranchesData} from '../../../../components/core/seller_request';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link";
import { useTranslation } from "react-i18next";
import authenticate from '../../../../components/auth/auth';

  
const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone_number', label: 'Phone Number', minWidth: 100 },
  {
    id: 'address',
    label: 'Address',
    minWidth: 170,
    // align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'state',
    label: 'State',
    minWidth: 170,
    // align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 170,
    // align: 'right',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'Edit',
    label: 'Edit',
    minWidth: 170,
    // align: 'right',
    // format: (value) => value.toFixed(2),
  },
];

function createData(id,email, phone_number,address, state, city,Edit) {
  return {id, email, phone_number,address, state, city,Edit};
}

 function branchesPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5  );
  const [edit,setEdit] = useState()
  const [newBranch,setNewBranch] = useState()
  const [openForm,setOpenForm] = useState(false);
  const { t } = useTranslation();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const initialValues = {
    phone_number:'',
    email:'',
    address:'',
    state:'',
    country:'',
    city:'',
    user_id:'',
    listing_id:''
    }
    const rows = [ ];
  const [branches,setBranches] = useState([])
  // rows.push(createData("sdsds","sdds",'sdd',"sdsdsd",'sdsdsd'))


  const fetchBracnhes = async () => {
    let id = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
    const responce = await GetBranchesData(id)
    setBranches(responce.data);
    // console.log('jhfgj',responce.data)
    // branches.map((data,index)=> (
    //   rows.push( createData("sdsds","sdds",'sdd',"sdsdsd",'sdsdsd'))
    // ))
    
  }


  branches?.map((data,index)=> (
    
    rows.push( createData(data.id,data.email,data.phone_number,data.address,data.state,data.city,<i className="fa fs-5 fa-edit"></i>))
  ))    

      const hadleEdit = (data) => {
        setEdit(data)
        // console.log(data)
        Object.entries(data).forEach(([key,value]) => {
          formik.setFieldValue(key, value);
        })
        setOpenForm(true)
      }
  

  const branchSchema = Yup.object().shape({
    phone_number:Yup.string().min(7, "Phone number must be at least 7 Digits").max(15,'invalid phone number').required('Phone number is required'),
    email:Yup.string().email("Please Enter Valid Email Id"),
    address:Yup.string(),
    state:Yup.string(),
    country:Yup.string(),
    city:Yup.string(),  
    // user_id:Yup.string(),
    // listing_id:Yup.string()
  })

  const formik = useFormik({
    initialValues,
    validationSchema:branchSchema ,
    onSubmit: async (values, {setStatus, setSubmitting, resetForm}) => {   
      const userId = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
      var roleId ='';
      try {    
      
        const body = {
          phone_number:values.phone_number,
          email:values.email,
          address:values.address,
          state:values.state,
          country:values.country,
          city:values.city,
          user_id:userId,
          listing_id:''
          }

          // if(edit){
          // console.log("jhfjhfjh",body)
          const response = await UpdateBranchesData(edit.id,body)
          toast.info('UPDATE SUCCESSFULL', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon:false,
            progress: undefined,
            theme: "dark",
            });
            fetchBracnhes()
          // }else{

          // }

    } catch (error) {
     
    console.error(error)
    alert(error)
    setStatus('The details is incorrect')
    setSubmitting(false)
    setLoading(false)
    }
}}) 

  useEffect(()=> {
    fetchBracnhes();
  },[])

  return (<>
    <section className="mt-3">
      <Container>
        <div className='d-flex justify-content-end align-items-center'>
          <Link href='/page/account/Add-branch'>
          <button type='button' className='btn btn_header'>ADD NEW BRANCH</button>
          </Link>
        </div>

        <div className='mt-4 mb-3'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}  onClick={()=> {column.id == 'Edit' && hadleEdit(row)}}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
        </div>
      </Container>
    </section>

    <section className={ edit ? "Edit-profile mb-5 mt-4 " :'d-none'}>
    <Container>
      <div className="mb-3 form_edit_bfranch">
                    <div className="form-head mb-3">
                      <h4>{t('Branches')}</h4>
                    </div>
                    
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row mt-3">
                      <div className="mb-3 col-sm-4 col-6">
                        <label
                          className="form-label"
                        >
                          {t('Email')}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="" 
                          {...formik.getFieldProps('email')}
                        />
                     {formik.touched.email && formik.errors.email && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.email}</span>
                        </div>
                      </div>
                    )}
                      </div>

                      <div className="mb-3 col-sm-4 col-6">
                        <label
                          className="form-label"
                        >
                          {t('Phone Number')}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...formik.getFieldProps('phone_number')}
                        />
                      {formik.touched.phone_number && formik.errors.phone_number && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.phone_number}</span>
                        </div>
                      </div>
                    )}
                      </div>

                      <div className="mb-3 col-sm-4 col-6">
                        <label
                          className="form-label"
                        >
                          {t('Address')}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...formik.getFieldProps('address')}
                        />
                      {formik.touched.address && formik.errors.address && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.address}</span>
                        </div>
                      </div>
                    )}                     
                      </div>

                      <div className="mb-3 col-sm-4 col-6">
                        <label
                          className="form-label"
                        >
                          {t('State')}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...formik.getFieldProps('state')}
                        />
                      {formik.touched.state && formik.errors.state && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.state}</span>
                        </div>
                      </div>
                    )}                     
                      </div>

                      <div className="mb-3 col-sm-4 col-6">
                        <label
                          className="form-label"
                        >
                          {t('City')}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...formik.getFieldProps('city')}
                        />
                      {formik.touched.city && formik.errors.city && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.city}</span>
                        </div>
                      </div>
                    )}                     
                      </div>

                      <div className="mb-3 col-sm-4 col-6">
                        <label
                          className="form-label"
                        >
                          {t('Country')}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...formik.getFieldProps('country')}
                        />
                      {formik.touched.country && formik.errors.country && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert' className='text-danger'>{formik.errors.country}</span>
                        </div>
                      </div>
                    )}                      
                      </div>
                    </div>
            
                    <div className="d-flex mt-3 justify-content-end align-items-center">
                        <button type='submit' className="btn btn-theme px-4 py-2 rounded fw-light ">
                          {t('Edit Branch')}
                        </button>
                      </div>

                      </form>    
  </div>

    </Container>
    </section>
  </>)
}

export default authenticate(branchesPage)