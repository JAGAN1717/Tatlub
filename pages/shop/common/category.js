import React, { useState, useContext } from "react";
import { Collapse } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import { useTranslation } from 'react-i18next';


const Category = ({ filterCategory, setFilters, filters }) => {
  const context = useContext(FilterContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const setSelectedCategory = context.setSelectedCategory;
  const [url, setUrl] = useState();
  const { t } = useTranslation();


  const updateCategory = (category) => {
    setSelectedCategory(category);
  };



  // function selectOnlyThis(id,index){
  //   setFilters(id)
  //   var myCheckbox = document.getElementsByName("flexCheckDefault"+index);
  //   Array.prototype.forEach.call(myCheckbox,function(el){
  //     el.checked = false;
  //   });
  //   id.checked = true;
  // }




  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className={isCategoryOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory}>
          {t('Related Category')}
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="">
                {filterCategory?.length > 0 && filterCategory?.slice(0, 10).map((data, index) => (
                  <li className="w-100 mb-3" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        name={`flexCheckDefault${index}`}
                        type="checkbox"
                        value=""
                        checked={filters == data.category_slug ? true : false}
                        id={`flexCheckDefault4343${index}`}
                        onChange={() => setFilters(data.category_slug)}
                      />
                      <label
                        className="form-check-label fw-600 text-capitalize complete_1 cursor-pointer foot-cat" for={`flexCheckDefault4343${index}`}
                      >
                        {data.category_name}
                      </label>
                    </div>
                  </li>
                ))
                }

                {
                  !filterCategory || !filterCategory?.length > 0 &&

                  <li className="form-check fw-bold">
                    <label className="form-check-label fw-600  cursor-pointer foot-cat" >
                      Data Not Found
                    </label>
                  </li>
                }
              </ul>
            </div>
          </div>
        </Collapse>

      </div>

    </>
  );
};

export default Category;
