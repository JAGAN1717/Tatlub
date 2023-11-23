import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import ProfilePage from './common/profile-page';
import authenticate from '../../../components/auth/auth';

const Profile = () => {
    return (
        <CommonLayout parent="home" title="profile">
            <ProfilePage />
        </CommonLayout>        
    )
}

export default authenticate(Profile);