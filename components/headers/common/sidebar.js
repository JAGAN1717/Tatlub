import React, { Fragment, useState, useContext } from "react";
import { Row, Col, Media, Button } from "reactstrap";
import fashion from "../../../public/assets/images/mega-menu/fashion.jpg";
import { Collapse } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";

const SideBar = () => {
  const closeNav = () => {
    var closemyslide = document.getElementById("mySidenav");
    if (closemyslide) closemyslide.classList.remove("open-side");
  };

  const handleSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) {
      return;
    }

    if (event.target.nextElementSibling.classList.contains("opensub1"))
      event.target.nextElementSibling.classList.remove("opensub1");
    else {
      document.querySelectorAll(".opensub1").forEach(function (value) {
        value.classList.remove("opensub1");
      });
      event.target.nextElementSibling.classList.add("opensub1");
    }
  };

  const handleSubTwoMenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensub2"))
      event.target.nextElementSibling.classList.remove("opensub2");
    else {
      document.querySelectorAll(".opensub2").forEach(function (value) {
        value.classList.remove("opensub2");
      });
      event.target.nextElementSibling.classList.add("opensub2");
    }
  };
  const handleSubThreeMenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensub3"))
      event.target.nextElementSibling.classList.remove("opensub3");
    else {
      document.querySelectorAll(".opensub3").forEach(function (value) {
        value.classList.remove("opensub3");
      });
      event.target.nextElementSibling.classList.add("opensub3");
    }
  };

  const handleSubFourMenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensub4"))
      event.target.nextElementSibling.classList.remove("opensub4");
    else {
      document.querySelectorAll(".opensub4").forEach(function (value) {
        value.classList.remove("opensub4");
      });
      event.target.nextElementSibling.classList.add("opensub4");
    }
  };

  const handleMegaSubmenu = (event) => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (event.target.nextElementSibling.classList.contains("opensidesubmenu"))
      event.target.nextElementSibling.classList.remove("opensidesubmenu");
    else {
      event.target.nextElementSibling.classList.add("opensidesubmenu");
    }
  };




  const context = useContext(FilterContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const setSelectedCategory = context.setSelectedCategory;
  const [url, setUrl] = useState();


  const [isOpen, setIsOpen] = useState(true);
  const toggle1 = () => setIsOpen(!isOpen);
  const setSelected = context.setSelected;

  const [isCategoryOpen1, setIsCategoryOpen1] = useState(true);
  const toggleCategory1 = () => setIsCategoryOpen1(!isCategoryOpen1);
  const setSelectedCategory1 = context.setSelectedCategory1;

  const [isCategoryOpen2, setIsCategoryOpen2] = useState(true);
  const toggleCategory2 = () => setIsCategoryOpen2(!isCategoryOpen2);
  const setSelectedCategory2 = context.setSelectedCategory2;


  const updateCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Fragment>
      <div id="mySidenav" className="sidenav side_filter">
        <a href={null} className="sidebar-overlay" onClick={closeNav}></a>
        <nav>
          <a href={null} onClick={closeNav}>
            <div className="sidebar-back text-start">
              <i className="fa fa-angle-left pe-2" aria-hidden="true"></i> Back
            </div>
          </a>
          {/* <ul id="sub-menu" className="sidebar-menu">
            <li>
              <a href="#" onClick={(e) => handleMegaSubmenu(e)}>
                clothing
                <span className="sub-arrow"></span>
              </a>
              <ul className="mega-menu clothing-menu">
                <li>
                  <Row m="0">
                    <Col xl="4">
                      <div className="link-section">
                        <h5>women's fashion</h5>
                        <ul>
                          <li>
                            <a href="#">dresses</a>
                          </li>
                          <li>
                            <a href="#">skirts</a>
                          </li>
                          <li>
                            <a href="#">westarn wear</a>
                          </li>
                          <li>
                            <a href="#">ethic wear</a>
                          </li>
                          <li>
                            <a href="#">sport wear</a>
                          </li>
                        </ul>
                        <h5>men's fashion</h5>
                        <ul>
                          <li>
                            <a href="#">sports wear</a>
                          </li>
                          <li>
                            <a href="#">western wear</a>
                          </li>
                          <li>
                            <a href="#">ethic wear</a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col xl="4">
                      <div className="link-section">
                        <h5>accessories</h5>
                        <ul>
                          <li>
                            <a href="#">fashion jewellery</a>
                          </li>
                          <li>
                            <a href="#">caps and hats</a>
                          </li>
                          <li>
                            <a href="#">precious jewellery</a>
                          </li>
                          <li>
                            <a href="#">necklaces</a>
                          </li>
                          <li>
                            <a href="#">earrings</a>
                          </li>
                          <li>
                            <a href="#">wrist wear</a>
                          </li>
                          <li>
                            <a href="#">ties</a>
                          </li>
                          <li>
                            <a href="#">cufflinks</a>
                          </li>
                          <li>
                            <a href="#">pockets squares</a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col xl="4">
                      <a href="#" className="mega-menu-banner">
                        <Media src={fashion.src} alt="" className="img-fluid" />
                      </a>
                    </Col>
                  </Row>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={(e) => handleSubmenu(e)}>
                bags
                <span className="sub-arrow"></span>
              </a>
              <ul>
                <li>
                  <a href="#">shopper bags</a>
                </li>
                <li>
                  <a href="#">laptop bags</a>
                </li>
                <li>
                  <a href="#">clutches</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => handleSubTwoMenu(e)}>
                    purses
                    <span className="sub-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">purses</a>
                    </li>
                    <li>
                      <a href="#">wallets</a>
                    </li>
                    <li>
                      <a href="#">leathers</a>
                    </li>
                    <li>
                      <a href="#">satchels</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" onClick={(e) => handleSubmenu(e)}>
                footwear
                <span className="sub-arrow"></span>
              </a>
              <ul>
                <li>
                  <a href="#">sport shoes</a>
                </li>
                <li>
                  <a href="#">formal shoes</a>
                </li>
                <li>
                  <a href="#">casual shoes</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">watches</a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleSubmenu(e)}>
                Accessories
                <span className="sub-arrow"></span>
              </a>
              <ul>
                <li>
                  <a href="#">fashion jewellery</a>
                </li>
                <li>
                  <a href="#">caps and hats</a>
                </li>
                <li>
                  <a href="#">precious jewellery</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => handleSubTwoMenu(e)}>
                    more..
                    <span className="sub-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">necklaces</a>
                    </li>
                    <li>
                      <a href="#">earrings</a>
                    </li>
                    <li>
                      <a href="#">wrist wear</a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => handleSubThreeMenu(e)}>
                        accessories
                        <span className="sub-arrow"></span>
                      </a>
                      <ul>
                        <li>
                          <a href="#">ties</a>
                        </li>
                        <li>
                          <a href="#">cufflinks</a>
                        </li>
                        <li>
                          <a href="#">pockets squares</a>
                        </li>
                        <li>
                          <a href="#">helmets</a>
                        </li>
                        <li>
                          <a href="#">scarves</a>
                        </li>
                        <li>
                          <a href="#" onClick={(e) => handleSubFourMenu(e)}>
                            more...
                            <span className="sub-arrow"></span>
                          </a>
                          <ul>
                            <li>
                              <a href="#">accessory gift sets</a>
                            </li>
                            <li>
                              <a href="#">travel accessories</a>
                            </li>
                            <li>
                              <a href="#">phone cases</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">belts & more</a>
                    </li>
                    <li>
                      <a href="#">wearable</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">house of design</a>
            </li>
            <li>
              <a href="#" onClick={(e) => handleSubmenu(e)}>
                beauty & personal care
                <span className="sub-arrow"></span>
              </a>
              <ul>
                <li>
                  <a href="#">makeup</a>
                </li>
                <li>
                  <a href="#">skincare</a>
                </li>
                <li>
                  <a href="#">premium beaty</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => handleSubTwoMenu(e)}>
                    more
                    <span className="sub-arrow"></span>
                  </a>
                  <ul>
                    <li>
                      <a href="#">fragrances</a>
                    </li>
                    <li>
                      <a href="#">luxury beauty</a>
                    </li>
                    <li>
                      <a href="#">hair care</a>
                    </li>
                    <li>
                      <a href="#">tools & brushes</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">home & decor</a>
            </li>
            <li>
              <a href="#">kitchen</a>
            </li>
          </ul> */}

          <div className=" me-xl-3 background_white">
            <div className="recommend_theme_propery shadow-none ">
              <div className="d-flex justify-content-between mb-3"><p className="fw-600">Filter</p> <a href=""><p className="theme_color">Clear All</p></a> </div>

              <div className="">
                <div className="d-flex">
                  <div className="cancek_custom">Mumabi <div className="bg_design-cancel"><i className="fa fa-times" aria-hidden="true"></i></div> </div>
                  <div className="cancek_custom">T Nagar <div className="bg_design-cancel"><i className="fa fa-times" aria-hidden="true"></i></div> </div>
                </div>
              </div>
              <hr></hr>


              <div className="collection-collapse-block open">
                <h3 className={isCategoryOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory}>
                  Search By Locality
                </h3>
                <Collapse isOpen={isCategoryOpen}>
                  <div className="collection-collapse-block-content">
                    <div className="collection-brand-filter">
                      <div className="sbvs">
                        <div className="search">
                          <span className="fa fa-search"></span>
                          <input placeholder="Enter Area Name" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>

              <hr></hr>


              <div className="collection-collapse-block open">
                <h3 className={isCategoryOpen2 ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory2}>
                  No. of Bedrooms
                </h3>
                <Collapse isOpen={isCategoryOpen2}>
                  <div className="collection-collapse-block-content">
                    <Row className="px-2">
                      <Col xs="4" md="4" xl="3 px-1"><div className="no-of-bed">1 RK</div></Col>
                      <Col xs="4" md="4" xl="3 px-1"><div className="no-of-bed">1 BHK</div></Col>
                      <Col xs="4" md="4" xl="3 px-1"><div className="no-of-bed">2 BHK</div></Col>
                      <Col xs="4" md="4" xl="3 px-1"><div className="no-of-bed">2 BHK</div></Col>
                      <Col xs="4" md="4" xl="3 px-1"><div className="no-of-bed">3 BHK</div></Col>
                      <Col xs="4" md="4" xl="3 px-1"><div className="no-of-bed">4 BHK</div></Col>
                      <Col xs="4" md="4" xl="3 px-1"><div className="no-of-bed">5 BHK</div></Col>
                      <Col xs="4" md="4" xl="3 px-1"><div className="no-of-bed">6 BHK</div></Col>


                    </Row>
                  </div>
                </Collapse>
              </div>


              <hr></hr>

              <div className="collection-collapse-block open">
                <h3 className={isOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggle1}>
                  Property Type
                </h3>
                <Collapse isOpen={isOpen}>
                  <div className="collection-collapse-block-content">

                    <p className="pt-3">Residential</p>
                    <ul>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Apartments
                        </label>
                      </li>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Builder Floor
                        </label>
                      </li>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          House/Villa
                        </label>
                      </li>

                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Penthouse
                        </label>
                      </li>

                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Farmhouse
                        </label>
                      </li>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Plot
                        </label>
                      </li>

                    </ul>



                    <p>Commercial</p>
                    <ul>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Office Space
                        </label>
                      </li>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Shop/Showroom
                        </label>
                      </li>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Land
                        </label>
                      </li>

                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Warehouse/Godown
                        </label>
                      </li>

                    </ul>

                  </div>
                </Collapse>
              </div>

              <hr></hr>


              <div className="collection-collapse-block open">
                <h3 className={isCategoryOpen1 ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory1}>
                  Property Type
                </h3>
                <Collapse isOpen={isCategoryOpen1}>
                  <div className="collection-collapse-block-content">
                    <ul>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Ready to Movee
                        </label>
                      </li>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Under Construction
                        </label>
                      </li>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          In 1 Year
                        </label>
                      </li>

                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          In 3 Year
                        </label>
                      </li>

                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Farmhouse
                        </label>
                      </li>
                      <li className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                        >
                          Beyond 3 Year
                        </label>
                      </li>

                    </ul>

                  </div>
                </Collapse>
              </div>

              <hr></hr>

              <div className="d-flex align-items-center ">
                <p className="mb-0">RERA Compliant Property</p>
                <label className="custom-toggle custom-toggle-primary">
                  <input type="checkbox" defaultChecked />
                  <span className="custom-toggle-slider rounded-circle" data-label-off="OFF" data-label-on="ON"></span>
                </label>
              </div>


              <hr></hr>


              <div className="collection-collapse-block open">
                <h3 className={isCategoryOpen ? `collapse-block-title` : `collapse-block-title1`} onClick={toggleCategory}>
                  Images & Vedios
                </h3>
                <Collapse isOpen={isCategoryOpen}>
                  <div className="collection-collapse-block-content">
                    <div className="d-flex">
                      <Button className="btn-imgages me-3">Images</Button>
                      <Button className="btn-imgages">Vedios</Button>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>


            <div className="recommend_theme_propery shadow-none mt-3">
              <h5>Popular Areas</h5>
              <ul>
                <li className="mb-3">Projects for sale in Thane West</li>
                <li className="mb-3">Projects for sale in Vashi</li>
                <li className="mb-3">Projects for sale in Borivali West</li>
                <li className="mb-3">Projects for sale in Andheri West</li>
                <li className="mb-3">Projects for sale in Andheri East</li>
                <li className="mb-3">Projects for sale in Malad West</li>
                <li className="mb-3">Projects for sale in Mira Road East</li>
                <li className="mb-3">Projects for sale in Kalyan</li>
                <li className="mb-3">Projects for sale in Ashok Nagar</li>
                <li className="mb-3">Projects for sale in Anna Nagar</li>
                <div className=""><a className="text-color">See All <i className="fa fa-angle-right" aria-hidden="true"></i></a></div>
              </ul>

            </div>


          </div>




        </nav>
      </div>
    </Fragment>
  );
};

export default SideBar;
