import React, { useState, lazy, Suspense } from 'react';
import Listing from '../../shop/left_sidebar'
import CommonLayout from '../../../components/shop/common-layout';
import { Container, Row } from 'reactstrap';
import Seo from '../../../seo/seo'
const ProductList = lazy(() => import('../../shop/common/productList'))
const FilterPage = lazy(() => import('../../shop/common/filter'))
import { getFilterbyCategory, getItemByLazyload, getFilterbyBrand } from "../../../components/core/shop_requests"
import { useRouter, } from "next/router";
import { useEffect } from 'react';
import { setmainId, mainId } from '../../../IDmain';

export default function index() {

  const router = useRouter()
  const { Category, brand, searchList } = router.query;
  const [sidebarView, setSidebarView] = useState(false)
  const [filterBycategory, setfilterBycategory] = useState([])
  const [filterByBrand, setfilterByBrand] = useState([])
  const [filter, setFilter] = useState();
  const [filterbrand, setFilterbrand] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();

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
    const response = await getItemByLazyload(id, 0);
    setItems(response.data);
    setItemsLength(response.count)
    setIsLoading(false)
  };

  const Loader = () => {
    return (
      <div className="loader-wrapper">
        {url === "Christmas" ? (
          <div id="preloader"></div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    )
  }

  useEffect(() => {
    Category && fetchCategoryList();
    Category && fetchRelatedBrands();
  }, [Category])

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView)
    } else {
      setSidebarView(!sidebarView)
    }
  }

  useEffect(() => {
    const handleWindowResize = () => {
      const productContainer = document.getElementById('productContain');

      if (window.innerWidth < 580) {
        productContainer.classList.add('container');
        // productContainer.classList.remove('large-container');
      } else {
        // productContainer.classList.add('large-container');
        productContainer.classList.remove('container');
      }
    };

    // Initial setup
    handleWindowResize();

    // Event listener for window resize
    window.addEventListener('resize', handleWindowResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  return (
    <div>
      {/* <CommonLayout title="collection" parent="home" > */}
        <Seo title={`${searchList}s`} />
        <section id='productContain' className="section-b-space ratio_asos pt-0 mt-4">
          <Suspense fallback={<Loader />}>
            <div className="collection-wrapper">
              <Container>
                <Row>
                  <FilterPage sm="3" setfilter={setFilter} filter={filter} filterbrandId={filterbrand} setBrandfilters={setFilterbrand} filterCategey={filterBycategory} filterBrand={filterByBrand} sidebarView={sidebarView} closeSidebar={() => openCloseSidebar(sidebarView)} />
                  <ProductList filter_id={filter} brandfilered={filterbrand} Category={Category} brand_id={brand} colClass="col-xl-3 col-6 col-grid-box" layoutList='' openSidebar={() => openCloseSidebar(sidebarView)} />
                </Row>
              </Container>
            </div>
          </Suspense>
        </section>
      {/* </CommonLayout> */}
    </div>
  )
}
