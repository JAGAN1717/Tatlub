import React,{useState} from 'react'
import { Collapse } from "reactstrap";
import { useTranslation } from 'react-i18next';
import { Col, Media } from "reactstrap";


export default function ProductFilter() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleBrand = () => setIsOpen(!isOpen);
    const { t } = useTranslation();

  return (
    <section>
        <div className="collection-filter-block shadow-sm">
          <div
            className="collection-mobile-back"
            onClick={() => closeSidebar()}
          >
            <span className="filter-back">
              <i className="fa fa-angle-left" aria-hidden="true"></i> {t('back')}
            </span>
          </div>

          <div className="collection-collapse-block  open">
            <h3
              className={
                isOpen ? "collapse-block-title" : "collapse-block-title1"
              }
              onClick={toggleBrand}
            >
              {t('Filter')}
            </h3>
            <Collapse isOpen={isOpen}>
              <div className="collection-collapse-block-content">
                <div className="collection-brand-filter">
                  <ul className="">
                    <li className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label fw-bolder">
                      With Price
                      </label>
                    </li>

                    <li className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label fw-bolder">
                      Mineral Water Plant
                      </label>
                    </li>

                    <li className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label fw-bolder">
                      Reverse Osmosis Systems
                      </label>
                    </li>

                    <li className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label fw-bolder">
                      Industrial Reverse Osmosis Plant
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
        <div>
          <button type="button"  className="btn btn_header w-100 py-2">
           {t('Reset Fitler')}
          </button>
        </div>
    </section>
  )
}
