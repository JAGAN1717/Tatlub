import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import Details from './common/Details';
import ProductSection from '../../product-details/common/product_section'



const ProductDetails = () => {
    return(<>
        <CommonLayout parent="home" title="Job Details">
            <div className='mt-3'>
            <Details />
           <ProductSection />
            </div>
        </CommonLayout>
    </>)
}

export default ProductDetails;
