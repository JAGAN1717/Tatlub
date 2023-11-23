import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { getFilterbyCategory } from '../../../../components/core/shop_requests';


export default function cat_type({ Category, setcategoryId, categoryId, wantedjobs }) {

  const { t } = useTranslation();
  const [Loading, setLoading] = useState(false)
  // const [Category, setCategory] = useState([])




  return (
    <section>
      <div className='mb-4'>
        <div className="category_company ">
          <h3 className="mb-md-4 mb-3">{t('Categories')}</h3>
          <ul className="d-block ">
            {
              Category?.length > 0 ?
                Category?.map((data, index) => (
                  <li className="cursor-pointer foot-cat text-truncate w-100" key={index}>
                    {/* <div class="form-check ms-2"  onClick={()=>setcategoryId(data?.id)}> */}
                    <div class="form-check ms-2"  >
                      <input class="form-check-input" onChange={() => setcategoryId(data?.id)} disabled={wantedjobs} checked={categoryId == data.id ? true : false} type="checkbox" value="" id={`flexCheckCat${index}`} />
                      <label class="form-check-label text-capitalize" for={`flexCheckCat${index}`}>
                        {data?.category_name}
                      </label>
                    </div>
                  </li>
                )) :
                <li className="cursor-pointer foot-cat text-truncate w-100">
                  <label class="form-check-label" >
                    No data Found
                  </label>
                </li>
            }

            {/* <li><a href="#">{t('More')}</a> </li> */}
          </ul>
        </div>
      </div>
      <div className='mb-4 d-none'>
        <div className="category_company ">
          <h3 className="mb-md-4 mb-3">Locations</h3>
          <ul className="d-block ">
            <li className="cursor-pointer foot-cat text-truncate"><input type='checkbox' className='me-2' />Chennai</li>
            <li className="cursor-pointer foot-cat text-truncate"><input type='checkbox' className='me-2' />Madurai</li>
            <li className="cursor-pointer foot-cat text-truncate"><input type='checkbox' className='me-2' />Mamallapuram</li>
            <li className="cursor-pointer foot-cat text-truncate"><input type='checkbox' className='me-2' />Erode</li>
            <li className="cursor-pointer foot-cat text-truncate"><input type='checkbox' className='me-2' />Arcot</li>
            <li className="cursor-pointer foot-cat text-truncate"><input type='checkbox' className='me-2' />Chidambaram</li>
            <li className="cursor-pointer foot-cat text-truncate"><input type='checkbox' className='me-2' />Cuddalore</li>
            <li className="cursor-pointer foot-cat text-truncate"><input type='checkbox' className='me-2' />Kanchipuram</li>
            <li className="cursor-pointer foot-cat text-truncate"><input type='checkbox' className='me-2' />Kanniyakumari</li>
            <li className="cursor-pointer text-truncate"><a className='text_theme'>See All <i className='fa fa-angle-right ps-1 ' /></a></li>
            {/* <li><a href="#">{t('More')}</a> </li> */}
          </ul>
        </div>
      </div>
    </section>
  )
}
