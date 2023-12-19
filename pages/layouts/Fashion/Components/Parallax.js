import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import MasterParallaxBanner from "./MasterParallaxBanner";

const Parallax = ({ trending, Recommended,video }) => {
  return (
    <Fragment>
      <MasterParallaxBanner trending={trending} Recommended={Recommended} videoList={video} />
    </Fragment>
  );
};

export default Parallax;
