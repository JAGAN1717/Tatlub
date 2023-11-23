import React, { useState, useEffect } from "react";
import { getPRoductDetail } from "../../core/product_request";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const MasterServiceContent = ({
  link,
  title,
  service,
  location,
  webpage,
  marijuana,
  lastChild,
  rating,
  review,
  email,
  phone,
  id,
  img,
  data,
  soacialMedia,
  mdetail,
  contact,
  vprofile,
  nodata,
}) => {
  const router = useRouter();
  const [productdetail, setdetail] = useState({});
  const { t } = useTranslation();
  const [showContact,setSContact] = useState(true)

  const fetchproductdetail = async () => {
    const responcedata = await getPRoductDetail();
    setdetail(responcedata.data.user);
  };

  useEffect(() => {
    // fetchproductdetail()
  }, []);

  return (
    <div
      className={`${!marijuana ? "media" : ""} ${
        lastChild ? "border-0 m-0" : ""
      }`}
    >
      {/* <div dangerouslySetInnerHTML={{ __html: link }} /> */}
      {/* <div className="media-body">
      <div className="d-flex"><img src="/assets/images/tatlub-img/productLogo.jpg" className="logo_exchngesuy me-2"></img><h5 className="fw-bolder"> {title}</h5></div>
        <div className="d-flex"><i className="fa fa-envelope" aria-hidden="true"></i><p>{service}</p></div>
        <div className="d-flex"><i className="fa fa-map-marker fa-lg" aria-hidden="true"></i><p>{location}</p></div>
        <div className="d-flex"><i className="fa fa-globe" aria-hidden="true"></i> <p> {webpage}</p></div>
        <div className="d-flex"><img src="/assets/images/recent-acitivity/start-1.png" className="img-fluid start-icon-detail"></img> <p ><span>{rating}</span><span>{review}</span></p></div>
        <div className="d-flex">
          <div className="icon-background whatsapp-i"><i className="fa fa-whatsapp" aria-hidden="true"></i></div>
          <div className="icon-background facebook-i"><i className="fa fa-facebook" aria-hidden="true"></i></div>
          <div className="icon-background linkedin-i"><i className="fa fa-linkedin" aria-hidden="true"></i></div>
          <div className="icon-background twiter-i"><i className="fa fa-twitter" aria-hidden="true"></i></div>
          <div className="icon-background youtube-i"><i className="fa fa-youtube-play" aria-hidden="true"></i></div>
        </div>
        <hr></hr>
       <div ><p className="text-center">{mdetail}</p></div>
       <div className="text-center mx-4 mb-3"><button className="btn btn-contact_suplier ">{contact}</button></div>
       <div className="text-center mx-4"><button className="btn btn-view_profile">{vprofile}</button></div>
      </div> */}
      <div className="media-body">
        <div className="d-flex align-items-center">
          <img
            src={img ? img : ""}
            onClick={() =>
              router.push({
                pathname: "/page/vendor/vendor-profile",
                query: { id: id },
              })
            }
            onError={(e) =>
              (e.currentTarget.src = "/assets/images/tatlub-img/No.jpg")
            }
            className="logo_exchngesuy1 me-2 cursor-pointer"
          ></img>
          <h5 className="fw-bolder cursor-pointer  foot-cat fs-18" title={title} onClick={() =>
              router.push({
                pathname: "/page/vendor/vendor-profile",
                query: { id: id },
              })
            }>{t(title)}</h5>
        </div>
        {email && (
          <div className="d-flex align-items-center mt-3 mb-3">
            <img
              src="/assets/images/tatlub-img/icon-5.png"
              className="icon-2"
            />
            <h6 className="text-dark complete_1 fs-15 mb-0 ms-2" title={email} >{t(email)}</h6 >
          </div>
        )}
        {location && (
          <div className="d-flex align-items-center mb-3">
            <img
              src="/assets/images/tatlub-img/icon-11.png"
              className="icon-2"
            />
            <h6 className="text-dark complete_2 fs-15 mb-0 ms-2" title={location} >{location}</h6 >
          </div>
        )}
        {webpage && (
          <div className="d-flex align-items-center">
            <img
              src="/assets/images/tatlub-img/icon-6.png"
              className="icon-2"
            />
            <h6 className=" complete_1 foot-cat fs-15 mb-0 ms-2 cursor-pointer" onClick={()=> window.open('https://'+webpage,'_blank')} >{webpage}</h6 >
          </div>
        )}
        <div className="d-flex align-items-center mt-2 mb-2">
          <img src="/assets/images/tatlub-img/icon-4.png" className="icon-2" />
          <p className="mb-0">
            <span className="fs-15">
              {rating+" "}
              <small className="fs-15">{t("Ratings")}</small>
            </span>{" "}
            <small className="mx-2 fs-15 text-muted">
              {review+" "}
              <small className="fs-15">{t("Reviews")}</small>
            </small>
          </p>
        </div>
        <div className="d-flex mt-2 border border-start-0 border-top-0 border-end-0 pb-4">
          {/* {
            data.item_social_whatsapp &&
            <div className="icon-img mx-2" onClick={() => window.open(`https://wa.me/${data.item_social_whatsapp}`, '_blank')}><img src="/assets/images/tatlub-img/s-6.jpg" /></div>
          } */}
            {
              data?.item_social_facebook && 
             <div className="vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center Facebook" onClick={() => { data?.item_social_facebook?.startsWith('https://') ? window.open(data?.item_social_facebook, '_blank') : window.open('https://'+data?.item_social_facebook, '_blank')  }}><i className='fa fa-facebook' /></div>
            }
          {
            data.item_social_instagram &&
            <div className="vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center Instagram" onClick={() => { data?.item_social_instagram?.startsWith('https://') ? window.open(data?.item_social_instagram, '_blank') : window.open('https://'+data?.item_social_instagram, '_blank')  }}><i className='fa fa-instagram'></i></div>
          }
          {
            data?.item_social_linkedin && 
           <div className="vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center LinkedIn" onClick={() => { data?.item_social_linkedin?.startsWith('https://') ? window.open(data?.item_social_linkedin, '_blank') : window.open('https://'+data?.item_social_linkedin, '_blank')  }}><i className='fa fa-linkedin' /></div>
          }
          {
            data?.item_social_twitter &&
           <div className="vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center Twitter" onClick={() => { data?.item_social_twitter?.startsWith('https://') ? window.open(data?.item_social_twitter, '_blank') : window.open('https://'+data?.item_social_twitter, '_blank')  }}><i className='fa fa-twitter' /></div>
          }
          {/* {soacialMedia?.map((link, i) => (
            <>
               <Link href={link.social_media_link}>
              <div 
                title="Share"
                className={
                  "vendor-icon-img mx-1 cursor-pointer text-light d-flex align-items-center justify-content-center " +
                  link.social_media_name
                }
                onClick={() => window.open(link.social_media_link)} 
              >
                <i className={link.social_media_icon}></i>
              </div>
              <div className="vendor-icon-img mx-1 cursor-pointer"><img src={`/assets/images/tatlub-img/social/${link.social_media_name}.jpg`} onClick={()=>window.open(link.social_media_link)}/></div>
               </Link>
            </>
          ))} */}
          {/* <div className="icon-img mx-1 cursor-pointer"><img src="/assets/images/tatlub-img/s-5.jpg" /></div> */}
        </div>
        <div className="mt-3">
          <p className="text-center">{t("For More Detail")}</p>
        </div>
        {
          showContact ? 
          <div className="text-center mx-4 mb-3">
                <button
                type="button"
                onClick={()=>{ setSContact(false)}}
                    className="btn btn-contact_suplier d-flex align-items-center justify-content-center fw-light mx-0"
                  >
                    <i class="fa fa-phone fs-6 me-3  mb-0 pb-0" aria-hidden="true"></i>
                    {t("Show Number") } 
                  </button>
           </div> :
              <div className="text-center mx-4 mb-3">
              <a 
                       title={phone}
                        href={"tel:" + phone}
                        className="btn btn-contact_suplier d-flex align-items-center justify-content-center fw-light mx-0"
                      >
                        <i class="fa fa-phone fs-6 me-3  mb-0 pb-0" aria-hidden="true"></i>
                        {phone ? phone : t("Contact Supplier") } 
                      </a>
          </div>
        }
        <div className="text-center mx-4">
          <button
          title="View Profile"
            disabled={nodata}
            className="btn btn-contact_suplier fw-light mx-0"
            // onClick={()=>router.push('/page/vendor/vendor-profile?id='+id,'/page/vendor/vendor-profile')}
            onClick={() =>
              router.push({
                pathname: "/page/vendor/vendor-profile",
                query: { id: id },
              })
            }
          >
            {t("View Profile")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterServiceContent;
