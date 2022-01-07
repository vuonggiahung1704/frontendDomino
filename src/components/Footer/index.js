import React from 'react';
import './styles.css';
const Footer = () => {
  return (
    <footer className="l-footer">
      <div className="bd-container">
        <div className="footer__social flex">
          <p>Kết nối Pizza Việt Nam:</p>
          <div>
            <a href="/">
              <span>
                {' '}
                <i className="bx bxl-facebook"></i>
              </span>
            </a>
            <a href="/">
              <span>
                <i className="bx bxl-instagram"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="footer__main flex">
          <div className="footer__contact flex">
            <a href="/" className="logo">
              <img src="https://dominos.vn/img/logo/domino.svg" alt="" />
            </a>
            <div className="hotline">
              <div>
                <i className="bx bxs-phone"></i> Hotline đặt hàng
              </div>
              <div>
                <span>1900 6099</span>
              </div>
            </div>
          </div>
          <div className="footer__payment">
            <img src="https://dominos.vn/img/credentials.png" alt="" />
          </div>
        </div>
        <div className="footer__end">
          <p>
            &#169; 2021 by <span> mr.VGH</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
