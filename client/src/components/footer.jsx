import React from "react";
import {Link} from "react-router-dom"
import Wrapper from "../styles/footer";
import { GrLinkedin, GrInstagram } from "react-icons/gr";

export default function footer() {
  return (
    <Wrapper>
      <div className="social-media">
        <Link target="_blank" to="https://www.instagram.com/zaim_br/">
          <GrInstagram className="social-media-icon" />
        </Link>
        <Link
          target="_blank"
          to="https://www.linkedin.com/in/ibrahim-zaim-b07204232/"
        >
          <GrLinkedin className="social-media-icon" />
        </Link>
      </div>
      <div className="copyright"></div>
      <div className="founder">Made with 🤦‍♂️ by Zaim Ibrahim</div>
    </Wrapper>
  );
}
 