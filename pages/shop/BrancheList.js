import React, { useState, useEffect, useRef } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { getbranch, deletebranch, updatebranch } from "../../components/core/shop_requests";
import { Container, Row, Form, Input, Label, Col,  Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
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
import Link from "next/link";
import { useTranslation } from "react-i18next";
import authendicate from "../../components/auth/auth";


const columns = [
  // { id: 'id', label: 'ID', minWidth: 10 },
  { id: 'email', label: 'Email', minWidth: 30 },
  { id: 'phone_number', label: 'Phone Number', minWidth: 150 },
  { id: 'address', label: 'Address', minWidth: 250,},
  { id: 'state', label: 'State', minWidth: 150,},
  { id: 'city', label: 'City', minWidth: 150, },
  { id: 'country', label: 'Country', minWidth: 150, },
  { id: 'Edit', label: 'Edit', minWidth: 30, },
  { id: 'Delete', label: 'Delete', minWidth: 30, },
];


function createData(id, email, phone_number, address, state, city,country, Edit, Delete) {
  return { id, email, phone_number, address, state, city,country, Edit, Delete };
}

 function BrancheList(args) {
  const [branchdelete, setbranchdelete] = useState([]);
  const [branchupdate, setbranchupdate] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [edit, setEdit] = useState()
  const [newBranch, setNewBranch] = useState()
  const [dleteId, setDleteId] = useState()
  const [openForm, setOpenForm] = useState(false);
  const { t } = useTranslation();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState();

  const fetchBranchDelete = async (id) => {
    const responcedata = await deletebranch(dleteId)
    setbranchdelete(responcedata.data)
    setDleteId();
    toggle();
    // console.log(" ", responcedata)
    toast.info('Deleted Successful', {
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
    fetchBracnhes();
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggle = (val) => {
    setModal(!modal);
    setDleteId(val?.id);
  }

  const initialValues = {
    phone_number: '',
    email: '',
    address: '',
    state: '',
    country: '',
    city: '',
    user_id: '',
    listing_id: ''
  }
  
  const rows = [];
  const [branches, setBranches] = useState([])

  const fetchBracnhes = async () => {
    setIsLoading(true)
    let id = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
    const responce = await getbranch(id);
    if(responce?.data?.length == 0){
      router.push('/business')
    } 
    if(responce.status == 400){
      router.push('/business')
    }
    setBranches(responce.data);
    setIsLoading(false)
    // console.log('jhfgj', responce.data)
  }

  branches?.map((data, index) => (
    rows.push(createData(data.id, data.email, data.phone_number, data.address, data.state, data.city,data.country, <i className="fa fs-5 fa-edit edit_icon"></i>, <i className="fa fs-5 fa-trash delete_icon"></i>))
  ))

  const hadleEdit = (data) => {
    setEdit(data)
    // console.log(data)
    Object.entries(data).forEach(([key, value]) => {
      formik.setFieldValue(key, value);
    })
    setOpenForm(true)
  }

  const branchSchema = Yup.object().shape({
    phone_number: Yup.string().min(7, "Phone number must be at least 7 Digits").required('Phone number is required'),
    email: Yup.string().email('Invalid email format'),
    address: Yup.string(),
    state: Yup.string(),
    country: Yup.string(),
    city: Yup.string(),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: branchSchema,
    onSubmit: async (values, { setStatus, setSubmitting, resetForm }) => {
      const userId = JSON.parse(sessionStorage.getItem('data'))?.id ?? JSON.parse(localStorage.getItem('data'))?.id
      var roleId = '';
      try {
        const body = {
          "phone_number": values.phone_number,
          "email": values.email,
          "address": values.address,
          "state": values.state,
          "country": values.country,
          "city": values.city,
          "user_id": userId,
          "listing_id": ''
        }
        // console.log("jeyjh", body)
        const response = await updatebranch(edit.id, body)
        toast.info('Update Successful', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon:false,
          theme: "dark",
        });
        fetchBracnhes()
      } catch (error) {
        console.error(error)
        setStatus('The details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    }
  })

  useEffect(() => {
    fetchBracnhes();
  }, [])

  return (
    <CommonLayout > 

      {isLoading && (
      <div className="loader-wrapper">
      {url === "Christmas" ? (
        <div id="preloader"></div>
      ) : (
        <div className="loader"></div>
      )}
      </div> ) }
      {!isLoading &&  
            <section className="form_listing list_pg_nbh py-lg-5 py-3" >
            <div className="container">
              <div className='d-flex justify-content-end align-items-center'>
                <Link href='/shop/addnewlisting'>
                  <button type='button' className='btn btn_header fw-500'>Add New Branch</button>
                </Link>
              </div>
    
              <div className='mt-4 mb-3' >
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label=" table" >
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}> {column.label} </TableCell>
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
                                    <TableCell key={column.id} onClick={() => { column.id == 'Edit' && hadleEdit(row) , column.id == 'Delete' && toggle(row) }} >
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
    
    
    
                <Modal className="d-flex align-items-center justify-content-center h-100 w-100" isOpen={modal} toggle={toggle} {...args}>
                  <ModalHeader className=" border-0" toggle={toggle}></ModalHeader>
                   <ModalBody className="text-center">
                     <h5 className="deteletre d-flex justify-content-center w-100"><i className="fa fs-5 fa-trash"></i></h5>
                     <h5>Are you sure?</h5>
                      <p>Do you really want to delete these records? This process cannot be undone.</p>
                    </ModalBody>
                    <ModalFooter className="border-0">
                      <Button color="primary" className="delete_popup" onClick={fetchBranchDelete}> Delete</Button>{' '}
                      <Button color="secondary" type="submit" className="cancel_popup" onClick={toggle}> Cancel </Button>
                   </ModalFooter>
                </Modal>
              </div>
    
              <section className={edit ? "Edit-profile mb-5 mt-4 " : 'invisible'}>
                <Container className="px-0">
                  <div className="mb-3 form_edit_bfranch">
                    <div className="form-head mb-3">
                      <h4>{t('Branches')}</h4>
                    </div>
    
                    <form onSubmit={formik.handleSubmit}>
                      <div className="row mt-3">
                        <div className="mb-3 col-sm-4 col-6">
    
                          <label className="form-label">{t('Email')}</label>
                          <input type="text" className="form-control" placeholder="" {...formik.getFieldProps('email')}/>
    
                          {formik.touched.email && formik.errors.email && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik.errors.email}</span>
                              </div>
                            </div>
                          )}
    
                        </div>
    
                        <div className="mb-3 col-sm-4 col-6">
    
                          <label className="form-label">{t('Phone Number')}</label>
                          <input type="text" className="form-control" maxLength={15} placeholder="" {...formik.getFieldProps('phone_number')}  
                          onChange={(e) => formik.setFieldValue("phone_number", e.target?.value.replace(/[^0-9]/g, ""))}
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
    
                          <label className="form-label"> {t('Address')}</label>
                          <input type="text" className="form-control" placeholder="" {...formik.getFieldProps('address')} />
    
                          {formik.touched.address && formik.errors.address && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik.errors.address}</span>
                              </div>
                            </div>
                          )}
    
                        </div>
    
                        <div className="mb-3 col-sm-4 col-6">
    
                          <label className="form-label">{t('State')}</label>
                          <input type="text" className="form-control" placeholder="" {...formik.getFieldProps('state')} />
    
                          {formik.touched.state && formik.errors.state && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik.errors.state}</span>
                              </div>
                            </div>
                          )}
    
                        </div>
    
                        <div className="mb-3 col-sm-4 col-6">
    
                          <label className="form-label">{t('City')}</label>
                          <input type="text" className="form-control" placeholder="" {...formik.getFieldProps('city')}/>
    
                          {formik.touched.city && formik.errors.city && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert' className='text-danger'>{formik.errors.city}</span>
                              </div>
                            </div>
                          )}
    
                        </div>
    
                        <div className="mb-3 col-sm-4 col-6">
    
                          <label className="form-label">{t('Country')}</label>
                          <input type="text" className="form-control" placeholder="" {...formik.getFieldProps('country')}/>
    
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
            </div>
          </section>
      }
    </CommonLayout>
  );
}

export default authendicate(BrancheList)