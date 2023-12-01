import React, { useState } from "react";
import { Col, Media } from "reactstrap";
import sideBanner from "../../../public/assets/images/side-banner.png";
import NewProduct from "./newProduct";
import Category from "./category";
import Brand from "./brand";
import Color from "./color";
import Size from "./size";
import Price from "./price";
import { Collapse } from "reactstrap";
import { useTranslation } from "react-i18next";

const FilterPage = ({
  sm,
  sidebarView,
  closeSidebar,
  filter,
  filterCategey,
  setfilter,
  filterBrand,
  setBrandfilters,
  filterbrandId
}) => {
  const { t } = useTranslation();

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  const [isOpen, setIsopen] = useState(false);

  const toggleBrand = () => setIsopen(!isOpen);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  return (
    <>
      <a href={null} onClick={() => ToggleSidebar()}>
        <div className="setting-sidebar1 d-lg-none " id="setting-icon1">
          <div>
            <i className="fa fa-filter" aria-hidden="true"></i>
          </div>
        </div>
      </a>
      <div className="d-lg-none d-block">
        <div className={`sidebar ${isOpen == true ? "active" : ""}`}>
          <div className="sd-header">
            <h4 className="mb-0"></h4>
            <div className="" onClick={ToggleSidebar}>
              <i className="fa fa-times"></i>
            </div>
          </div>
          <div className="sd-body">
            <Col
              // sm={sm}
              xl="3"
              lg="4"
              className=" px-xl-4"
              style={sidebarView ? { left: "0px" } : {}}
            >
              <div className="collection-filter-block shadow-none">
                <div
                  className="collection-mobile-back d-none"
                  onClick={() => closeSidebar()}
                >
                  <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                    {t("back")}
                  </span>
                </div>
                <Category
                  setFilters={setfilter}
                  filterCategory={filterCategey}
                  filters={filter}
                />
              </div>
              <div className="collection-filter-block shadow-none">
                <div
                  className="collection-mobile-back d-none"
                  onClick={() => closeSidebar()}
                >
                  <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                    {t("back")}
                  </span>
                </div>
                <Brand
                  filterbyBrand={filterBrand}
                  setbyFilter={setBrandfilters}
                  filterbrandIds={filterbrandId}
                />
              </div>

              <div className="collection-filter-block shadow-none d-none">
                <div
                  className="collection-mobile-back d-none"
                  onClick={() => closeSidebar()}
                >
                  <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                    {t("back")}
                  </span>
                </div>

                <div className="collection-collapse-block  open">
                  <h3
                    className={
                      isOpen ? "collapse-block-title" : "collapse-block-title1"
                    }
                    onClick={toggleBrand}
                  >
                    {t("Business Type")}
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
                              No Data Found
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("resetFIlterALL")?.click()
                  }
                  className="btn btn_header w-100 py-2"
                >
                  {t("Reset Fitler")}
                </button>
              </div>
            </Col>
          </div>
        </div>
        <div
          className={`sidebar-overlay ${isOpen == true ? "active" : ""}`}
          onClick={ToggleSidebar}
        ></div>

        {/* <div className="navbar mb-2 ms-2 d-xl-none d-block">
          <a href={null} onClick={ToggleSidebar}>
            <div className="bar-style ">
              <i
                className="fa fa-filter text-color fs-25"
                aria-hidden="true"
              ></i>
            </div>
          </a>
        </div> */}
      </div>
      <Col
        // sm={sm}
        xl="3"
        lg="4"
        className="collection-filter px-xl-4"
        style={sidebarView ? { left: "0px" } : {}}
      >
        <div className="sideFilter">
          <div className="collection-filter-block shadow-none">
            <div
              className="collection-mobile-back"
              onClick={() => closeSidebar()}
            >
              <span className="filter-back">
                <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                {t("back")}
              </span>
            </div>
            <Category setFilters={setfilter} filters={filter} filterCategory={filterCategey} />
          </div>
          <div className="collection-filter-block shadow-none">
            <div
              className="collection-mobile-back"
              onClick={() => closeSidebar()}
            >
              <span className="filter-back">
                <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                {t("back")}
              </span>
            </div>
            <Brand filterbyBrand={filterBrand} filterbrandIds={filterbrandId} setbyFilter={setBrandfilters} />
          </div>
          <div className="collection-filter-block shadow-sm d-none">
            <div
              className="collection-mobile-back"
              onClick={() => closeSidebar()}
            >
              <span className="filter-back">
                <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                {t("back")}
              </span>
            </div>

            <div className="collection-collapse-block  open">
              <h3
                className={
                  isOpen ? "collapse-block-title" : "collapse-block-title1"
                }
                onClick={toggleBrand}
              >
                {t("Business Type")}
              </h3>
              <Collapse isOpen={isOpen}>
                <div className="collection-collapse-block-content">
                  <div className="collection-brand-filter">
                    <ul className="">
                      <li className="form-check mb-3">
                        <label className="form-check-label fw-bolder">
                          Data Not Found
                        </label>
                      </li>
                      {/* <li className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label fw-bolder">
                        Manufacturerr
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
                        Exporter
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
                        Wholesaler
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
                        Retailer
                      </label>
                    </li> */}
                    </ul>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { document.getElementById("resetFIlterALL")?.click(); setfilter(''); setBrandfilters('') }}
            className="btn btn_header w-100 py-2"
          >
            {t("Reset Fitler")}
          </button>
        </div>
        <div>
        </div>
      </Col>
    </>
  );
};

export default FilterPage;
