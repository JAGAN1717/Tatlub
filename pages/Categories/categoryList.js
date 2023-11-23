import React, { useEffect, useState } from 'react'
import CommonLayout from '../../components/shop/common-layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Seo from '../../seo/seo'
import Select from 'react-select'

export default function CategoryList() {

    const router = useRouter()
    const [CatgoryList, setCategoryList] = useState([])
    const [filterList, setFilterList] = useState([])
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState(20)
    const [SortA,setSortA] = useState()
    const [SearchCategory,setSearchCategory] = useState('')

    useEffect(() => {
        if (CatgoryList.length > 0) {
            setLoading(false)
        }
        setTimeout
    }, [CatgoryList]) 


    useEffect(()=> {
        if(SearchCategory){
            let data = []
            data.push(CatgoryList.filter(e => e?.category_name?.toLowerCase().includes(SearchCategory.toLowerCase())))
            setFilterList(CatgoryList.filter(e => e?.category_name?.toLowerCase().includes(SearchCategory.toLowerCase())))
        }else {
            setFilterList(CatgoryList)
        }
    },[SearchCategory])


    useEffect(()=> {
        if(SortA == 1){
            const sortedArrayAZ = CatgoryList.slice().sort((a, b) => a?.category_name.localeCompare(b?.category_name));
            setFilterList(sortedArrayAZ)
        }else  if(SortA == 0){
            const sortedArrayZA = CatgoryList.slice().sort((a, b) => b?.category_name.localeCompare(a?.category_name));
            setFilterList(sortedArrayZA)
        }else {
            setFilterList(CatgoryList)
        }
    },[SortA,CatgoryList])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setLoading(false)
        }, 5000)
        return () => clearTimeout(timeOut)
    }, [])


    return (<>
       <Seo title={`All Categories`} description={``} />
        <CommonLayout parent="Home" title="category" setCategoryList={setCategoryList} setLoading={setLoading} >
            <div>
                <div className='container'>
                    <div className='jsx-503117943  d-flex justify-content-between mt-5 mb-3'>
                        <div className=' h-100  p-2 d-flex justify-content-start align-items-center  '>
                            <div className='' onClick={() => router.back()}>
                                {/* <Link href='/'> */}
                                <img src={'/assets/images/tatlub-img/slid-4.png'} onError={(e) => e.currentTarget.src = "/assets/images/tatlub-img/No.jpg"} className='rounded cursor-pointer object-fit-contain' width='25' height='25' />
                                {/* </Link> */}
                            </div>
                            <div className='ms-3'>
                                <h4 className='fs-20 mb-0 complete_2 lh-base'>All Categories</h4>
                            </div>
                        </div>

                        <div className='row align-items-center justify-content-between w-50'>
                            <div className='h-100 col'>
                                <input type='text' placeholder='Search Category' onChange={(e)=>setSearchCategory(e.target.value)}  className='form-control h-100' /> 
                            </div>
                            <div className='col'>
                            <Select
                                closeMenuOnSelect={true}
                                name="to_time"
                                placeholder='Sort By'
                                onChange={(e)=> setSortA(e.value)}
                                options={[{label:'Sort by A-Z',value:'1'},{label:'Sort by Z-A',value:'0'}]}
                                // getOptionLabel={(option) => `${option.time}`}
                                // getOptionValue={(option) => option.time}
                                className=" w-100"
                                classNamePrefix="select"
                              />
                            </div>
                        </div>
                    </div>
                    {
                        loading ? (
                            <div className="loader-wrapper2 rounded-3 mb-3">
                                <div className="loader"></div>
                            </div>
                        ) : filterList?.length > 0 ?
                            <div className='jdmart_wrapper mt-3 mb-3'>
                                <div className='bg-white rounded-3 p-3'>
                                    <div className='row h-100 mt-3'>
                                        {
                                            filterList?.slice(0, view).map((data, index) => (
                                                <div className='col-2 h-100  mb-3' key={index} onClick={() => router.push({ pathname:`/category/service/${data.category_slug}`,
                                                //  query: { Category: data.category_slug, searchList: 'service' } 
                                                 })}>
                                                    <div className='border h-100 rounded p-2 d-flex justify-content-start align-items-center all_catlist cursor-pointer'>
                                                        <div className=''>
                                                            <img src={data?.category_image} onError={(e) => e.currentTarget.src = "/assets/images/tatlub-img/no1.png"} className='w-100 rounded object-fit-contain' width='50' height='50' />
                                                        </div>
                                                        <div className='ms-3'>
                                                            <h4 className='fs-16 complete_2 lh-base'>{data?.category_name}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {
                                        filterList?.length > 10 &&
                                        <div className='col-2 h-100  mb-3' onClick={() => setView(CatgoryList?.length)}>
                                            <div className='border h-100 rounded p-2 d-flex justify-content-start align-items-center all_catlist cursor-pointer'>
                                                <div className=''>
                                                    <img src={''} onError={(e) => e.currentTarget.src = "/assets/images/tatlub-img/no1.png"} className='w-100 rounded object-fit-contain' width='50' height='50' />
                                                </div>
                                                <div className='ms-3'>
                                                    <h4 className='fs-16 complete_2 lh-base'>View More</h4>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>

                            </div> 
                            : 
                            <div className="d-flex justify-content-center align-items-center bg-white rounded-3 mb-3">
                            <img
                              src="/assets/images/tatlub-img/not_Found.png"
                              className="no_image"
                            />
                          </div>
                    }
                </div>
            </div>
        </CommonLayout>
    </>)
}
