import React from "react";
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
import "./Footer.css";

import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ShopKart</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MeAvinash</p>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        
        
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/sahu_avinash_07/">Instagram</a>
        <a href="#">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
