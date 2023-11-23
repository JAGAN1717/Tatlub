import React, { useEffect } from "react";
import CommonLayout from '../../components/shop/common-layout';
import Plans from "./common/planslist";
import Addons from "./common/Addons";
import { useState,useContext } from "react";
import { getAddonslist,buySubscriptio } from "../.././components/core/plans_request";
import AuthContex from '../../components/auth/AuthContex'
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Seo from '../../seo/seo'



const SubscriptionPlans = () => {

    const [selectplans,setselectplans] = useState('')
    const [addonlist,setAddonslist] = useState([])
    const [addontId,setAddondsId] = useState([])
    const {userData} = useContext(AuthContex)
    const [categoryList,setCategoryList] = useState([])
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState([]);


    const fetchAddonslist = async () => {
        let id = '';
        selectedCategory?.map((val,i) => id += `category_id[${i}]=${val}&` )
        getAddonslist(id).then(res => {
            // let sperate = [] 
            // if(res.data?.length > 0){
            //     res.data?.map((e,i) => {
            //         sperate.push({...e,'key':i})
            //     })
            //     setAddonslist(sperate)
            // }else{
            //     setAddonslist([])
            // }
            setAddonslist(res.data)
        }).catch(err => {
            console.error("err",err.message)
        })
    }

    const postSubscription = async () => {
        let date = new Date()
        let validDate = moment(date,"YYY-MM-DD")
        let body = {
            "plan_id":selectplans?.id,
            "user_id":userData?.id,
            "subscription_start_date":validDate,
            "addon_id":addontId
        }
        buySubscriptio(body).then(res => {
            toast.info("SUCCESSFULL", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                icon:false,
              });
              router.push('/Subscription')
        }).catch(err => {
            console.error("err",err.message)
        })
    }

    useEffect(()=> {
        fetchAddonslist()
    },[selectedCategory])

    return (<>
        <CommonLayout setCategoryList={setCategoryList}>
        <Seo title={`Subscription`} />

            {
                selectplans ? 
                <Addons setAddondsId={setAddondsId} categoryList={categoryList} addontId={addontId} addonlist={addonlist} postSubscription={postSubscription} selectplans={selectplans} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /> : 
                 <Plans setselectplans={setselectplans} />
            }
        </CommonLayout>
        </>
        )
}

export default SubscriptionPlans