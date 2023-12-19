import React from 'react';
import CommonLayout from '../../../components/shop/common-layout'
import Details from './common/Details';
import CategoryType from '../Hiring/common/categoryType'


export default function CustomerCareDetails() {
  return (
    // <CommonLayout parent="home" title="Customer Care">
    <div className='container mt-lg-5 mt-3 mb-lg-5 mb-3 '>
    <div className='row'>
                <div className='col-md-9 '>
                <Details />
                </div>
                <div className="col-lg-3 d-lg-block d-none">
                <CategoryType />
                </div>
            </div>
    </div>
    // </CommonLayout>
  )
}  
