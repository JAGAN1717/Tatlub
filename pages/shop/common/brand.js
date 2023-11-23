import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";
import { useTranslation } from 'react-i18next';

const GET_BRAND = gql`
  query getBrands($type: String) {
    getBrands(type: $type) {
      brand
    }
  }
`;

const Brand = ({filterbyBrand,setbyFilter,filterbrandIds}) => {
  const context = useContext(FilterContext);
  const isChecked = context.isChecked;
  const filterChecked = context.filterChecked;
  const [isOpen, setIsOpen] = useState(false);
  const toggleBrand = () => setIsOpen(!isOpen);
  const [fileredbrand,setFilteredbrand] = useState()
  const { t } = useTranslation();

  

  var { loading, data } = useQuery(GET_BRAND, {
    variables: {
      type: context.state,
    },
  });

  function selectOnlyThis(id) {
    for (var i = 1;i <= 4; i++)
    {
        document.getElementById(i).checked = false;
    }
    document.getElementById(id).checked = true;
  }

  return (
    <div className="collection-collapse-block open">
      <h3 className={isOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleBrand}>
        {t('Related Brands')}
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          {/* <div className="collection-brand-filter">
            {!data || !data.getBrands || data.getBrands.length === 0 || loading
              ? "loading"
              : data &&
                data.getBrands.brand.map((brand, index) => (
                  <div
                    className="form-check custom-checkbox collection-filter-checkbox"
                    key={index}
                  >
                    <Input
                      checked={context.selectedBrands.includes(brand)}
                      onChange={() => {
                        context.handleBrands(brand, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={brand}
                    />
                    <label className="custom-control-label" htmlFor={brand}>
                      {brand}
                    </label>
                  </div>
                ))}
          </div> */}
          <div className="collection-brand-filter">
            <ul>
              {
                filterbyBrand?.length  > 0 ? 
                filterbyBrand?.slice(0,10).map((data,index)=> (
                  <li className="w-100 mb-3">
                    <div className="form-check">
                  <input
                    className="form-check-input"
                    name={`fitersagainst${index}`}
                    type="checkbox"
                    value=""
                    checked={filterbrandIds == data.id ? true : false}
                    id={'fitersagainst'+index}
                    onChange={()=> setbyFilter(data.id)}
                  />
                  <label
                    className="form-check-label complete_1 text-capitalize fw-600 cursor-pointer foot-cat" for={'fitersagainst'+index}  
                  >
                    {data?.name}
                  </label>
                    </div>
                </li> 
                ))
              : 

              <li className="form-check fw-bold"> 
              <label className="form-check-label fw-600  cursor-pointer foot-cat" > 
              Data Not Found
                 </label>
          </li>
              }
              {/* <li className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="2"
                />
                <label
                  className="form-check-label fw-bolder"
                >
                  Aguapuro Reverse Osmosis Plants
                </label>
              </li> */}
            </ul>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Brand;
