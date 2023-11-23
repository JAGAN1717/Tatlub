import React, { useState,lazy,Suspense } from 'react';
import CommonLayout from '../../components/shop/common-layout';
import Seo from '../../seo/seo'
// import { withApollo } from '../../helpers/apollo/apollo';
// import ProductList from './common/productList';
const ProductList = lazy(()=> import('./common/productList'))
import { Container, Row} from 'reactstrap';
// import FilterPage from './common/filter';
const FilterPage = lazy(()=> import('./common/filter'))
import {getFilterbyCategory,getItemByLazyload,getFilterbyBrand} from "../../components/core/shop_requests"
import { useRouter ,} from "next/router";
import { useEffect } from 'react';
import { setmainId,mainId } from '../../IDmain';


const LeftSidebar = () => {
    const router = useRouter();
    const { Category,brand_id,searchList} = router.query;
    const [sidebarView,setSidebarView] = useState(false)
    const [filterBycategory,setfilterBycategory] = useState([])
    const [filterByBrand,setfilterByBrand] = useState([])
    const [filter, setFilter] = useState();
    const [filterbrand, setFilterbrand] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState();

   
    // useEffect(()=> {
    //     // alert(filter)
    // },[filter])

    const fetchCategoryList = async () => {
        const id = Category ?? mainId()
        const response = await getFilterbyCategory(id)
        setfilterBycategory(response.data)
    }

    const fetchRelatedBrands = async () => {
      const id = Category ?? mainId()
      const response = await getFilterbyBrand(id)
      setfilterByBrand(response.data)
     }

    const fetchItemsdata = async () => {
        setIsLoading(true)
        const id = Category ?? mainId()
        // const response = await getItemsList();
        const response = await getItemByLazyload(id,0);
        setItems(response.data);
        setItemsLength(response.count)
        setIsLoading(false)
    };

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

    useEffect(()=> {
      Category &&  fetchCategoryList();
      Category &&  fetchRelatedBrands();
    },[Category])
    
    const openCloseSidebar = () => {
        if(sidebarView){
            setSidebarView(!sidebarView)
        } else {
            setSidebarView(!sidebarView)
        }
    }

    return (<>
        <CommonLayout title="collection" parent="home" >
        <Seo title={`${searchList}s`} />
            <section className="container section-b-space ratio_asos pt-0 mt-4">
            <Suspense fallback={<Loader />}>
                <div className="collection-wrapper">
                    <Container>     
                        <Row>
                            <FilterPage sm="3" setfilter={setFilter} filter={filter} filterbrandId={filterbrand}  setBrandfilters={setFilterbrand} filterCategey={filterBycategory} filterBrand={filterByBrand} sidebarView={sidebarView} closeSidebar={() => openCloseSidebar(sidebarView)} />
                            <ProductList  filter_id={filter} brandfilered={filterbrand} Category={Category} brand_id={brand_id} colClass="col-xl-3 col-6 col-grid-box" layoutList=''  openSidebar={() => openCloseSidebar(sidebarView)}/>
                        </Row>
                    </Container>
                </div>
                        </Suspense>
            </section>
        </CommonLayout>
        </>)
}

export default LeftSidebar;