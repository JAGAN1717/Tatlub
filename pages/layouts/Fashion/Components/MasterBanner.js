import Link from "next/link";
import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";

const MasterBanner = ({
  img,
  title,
  desc,
  link,
  para,
  classes,
  btn,
  btnClass,
}) => {

  const router = useRouter()

  return (
    // <div className="home_bg cursor-pointer" onClick={()=>{ link?.startsWith('https://') ?  window.open(link,'_blank') : window.open('https://'+link,'_blank')}}>
    <div className="home_bg cursor-pointer" onClick={()=> { link?.startsWith('https://') ?  window.open(link,'_blank')  : router.push(link)} }>
      <div
        className={`home ${classes ? classes : "text-start"}`}
        style={{ backgroundImage: `url(${img})`}}
      >
        <Container>
          <Row>
            <Col>
              <div className="slider-contain d-flex align-items-center py-xl-5 py-4">
                <div className="container d-flex align-items-center justify-content-start">
                  <div className="col-lg-6 ps-xl-5 col-md-9 d-none">
                    <h4>{title}</h4>
                    <h1 className="mb-3 text_header_animatin" data-text={para}>
                      {para}
                    </h1>
                    <p>{desc}</p>
                    <div className="invisible">
                      {/* <Link href={link}> */}
                        <a
                          className={`btn ${btnClass ? btnClass : "btn-solid"}`}
                        >
                          {btn ? btn : "Get best Quotes"}{" "}
                        </a>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;
