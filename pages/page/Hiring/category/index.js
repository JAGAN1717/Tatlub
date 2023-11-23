import React,{useState,lazy,Suspense} from 'react';
import CommonLayout from '../../../../components/shop/common-layout'
import Category from '../common/Category'
import Seo from '../../../../seo/seo'


const SelectCategory = () => {

    return(<>
        <CommonLayout parent="home" title="Select Category">
       <Seo title={'Job Category'} url={'Category'} />
            <Category/>
        </CommonLayout>
    </>
    )
}

export default SelectCategory;