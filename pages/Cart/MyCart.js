import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
import Cart from './common/Cart';
import authenticated from '../../components/auth/auth';
import Seo from '../../seo/seo'

 function MyCart() {
  return (<>
  <CommonLayout>
  <Seo title={`My Cart`}  />
    <Cart />
  </CommonLayout>
  </>
  )
}

export default authenticated(MyCart);