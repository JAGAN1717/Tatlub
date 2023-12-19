import React,{useState,lazy,Suspense} from 'react';
import CommonLayout from '../../../components/shop/common-layout'
// import ProfilePage from './common/profile';
const ProfilePage = lazy(()=> import('./common/profile'))
// import { withApollo } from '../../../helpers/apollo/apollo';


const VendorProfile = () => {
    const [url, setUrl] = useState();

    const Loader = () => {
      return(
        <div className="loader-wrapper">
        {url === "Christmas" ? (
          <div id="preloader"></div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
      )
    }

    return (
        // <CommonLayout parent="home" title="Vendor Profile">
         <Suspense fallback={<Loader />}>
            <ProfilePage />
        </Suspense>
        // </CommonLayout>
    )
}

export default VendorProfile;