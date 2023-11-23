import React,{useState} from 'react';
import CommonLayout from '../../../components/shop/common-layout'
import List from './common/List'
import ProductFilter from './common/ProductFilter';




const ProductList = () => {


    return(<>
         <CommonLayout parent="home" title="Job Details">
            <div className='container mb-3 mt-3'>
                <div className='row'>
                    <div className='col-md-3 d-md-block d-none'>
                        <ProductFilter />
                    </div>
                    <div className='col'>
                    <List />
                    </div>
                </div>
            </div>
        </CommonLayout>
    </>)
}

export default ProductList
