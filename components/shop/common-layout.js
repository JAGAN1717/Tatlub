import React from "react";
import HeaderOne from "../headers/header-one";
// import Breadcrubs from "../common/widgets/breadcrubs";
import Helmet from "react-helmet";
import favicon from "../../public/assets/images/favicon/1.png";
import MasterFooter from "../footers/common/MasterFooter";
import { getCategory } from '../core/fashion_request'
import { useEffect, useState } from "react";



const CommonLayout = ({ children, title, parent, subTitle, setCategoryList }) => {
  const [category, setcategory] = useState([]);

  const fetchCategory = async () => {
    // setIsLoading(true)
    try {
      const responcedata = await getCategory()
      setcategory(responcedata.data)
      setCategoryList(responcedata.data)
      //  setIsLoading(false)
    } catch (error) {
      console.error('err', error.message)
    }
  }

  useEffect(() => {
    fetchCategory();
  }, [])


  return (
    <>
      {/*<Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={favicon ? favicon : ""} />
      </Helmet>*/}
       <HeaderOne categoryList={category} topClass="top-header" logoName="logo.png" />
       {/* <Breadcrubs title={title} parent={parent} subTitle={subTitle} /> */}
       <>{children}</>
       <MasterFooter
         categoryList={category}
         footerClass={`footer-light `}
         footerLayOut={"light-layout upper-footer"}
         footerSection={"small-section border-section border-top-0"}
         belowSection={"section-b-space light-layout"}
         newLatter={true}
      />
    </>
  );
};



export const getLayout = (page) => (
  <CommonLayout>{page}</CommonLayout>
);


export default CommonLayout;
