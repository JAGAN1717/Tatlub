import React, { useState, useEffect } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import { getTesimonials } from "../../../components/core/seller_request";
import { useTranslation } from "react-i18next";


export default function testimonials() {
  const [tesimonial, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState();
  const { t } = useTranslation();


  const fetchTestimonils = async () => {
    try {
      setIsLoading(true);
      const response = await getTesimonials();
      setTestimonials(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonils();

    // const article = document.querySelector('article');

    // // to compute the center of the card retrieve its coordinates and dimensions
    // const {
    //   x, y, width, height,
    // } = article.getBoundingClientRect();
    // const cx = x + width / 2;
    // const cy = y + height / 2;

    // // following the mousemove event compute the distance betwen the cursor and the center of the card
    // function handleMove(e) {
    //   const { pageX, pageY } = e;

    //   // ! consider the relative distance in the [-1, 1] range
    //   const dx = (cx - pageX) / (width / 2);
    //   const dy = (cy - pageY) / (height / 2);

    //   // rotate the card around the x axis, according to the vertical distance, and around the y acis, according to the horizontal gap
    //   this.style.transform = `rotateX(${10 * dy * -1}deg) rotateY(${10 * dx}deg)`;
    // }

    // // following the mouseout event reset the transform property
    // function handleOut() {
    //   this.style.transform = 'initial';
    // }

    // article.addEventListener('mousemove', handleMove);
    // article.addEventListener('mouseout', handleOut);
  }, []);

  return (
    <CommonLayout parent="home" title="Testimonials">
      {isLoading ? (
        <div className="loader-wrapper2">
          {url === "Christmas" ? (
            <div id="preloader"></div>
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : tesimonial.length > 0 ? (
        <section className="testimonials_card mb-5 mt-5 container">
          <div className="row justify-content-center">
            {tesimonial?.map((data, index) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-sm-3 mb-5 mt-5 d-flex justify-content-center " key={index}>
                <article className="h-100">
                  <figure>
                    <img
                      alt="Not_Found"
                      src={data?.testimonial_image ?? ""}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "/assets/images/tatlub-img/No.jpg")
                      }
                    />
                  </figure>

                  <div>
                    <h1 className="text-dark fw-bold fs-5">{data?.testimonial_name}</h1>
                    <p className="complete_3 fs-16">
                      {data?.testimonial_description}
                    </p>
                    <p className="text-color fw-bold fs-16">{data?.testimonial_company}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="contact-page section-b-space container">
          <div className="card empty-wishlist shadow-sm p-4">
            <div className="d-flex align-items-center justify-content-between">
              {/* <h4 className="fw-bold">MY CART</h4>  */}
              <div className="filer-search-wicon d-none">
                <div className="search">
                  <span className="fa fa-search"></span>
                  <input placeholder={t("Search In This Store")} />
                </div>
              </div>
            </div>

            <div className="text-center">
              <img src="/assets/images/tatlub-img/not_Found.png" className="" />
              <p className="text-muted text-center">{t('Testimonials Is Empty')}</p>
            </div>
          </div>
        </section>
      )}
    </CommonLayout>
  );
}
