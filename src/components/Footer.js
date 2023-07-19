import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-lg-5 col-1">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="/images/newsletter.png" alt="newsletter" />
                <h2 className="mb-0 text-white d-none d-lg-block">
                  Sign Up for Newsletter
                </h2>
              </div>
            </div>
            <div className="col-11 col-lg-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-sm-4 col-6 mb-3 col-middle-footer">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Tuan Store <br />
                  Thu Duc, Ho Chi Minh
                </address>
                <a
                  className="text-white mt-4 d-block mb-2"
                  href="tel:+84 000000000"
                >
                  +84 325 709 xxx
                </a>

                <a
                  className="text-white mt-4 d-block mb-2 text-white"
                  href="mailto:tuankapro156@gmail.com"
                >
                  tuankapro156@gmail.com
                </a>

                <div className="social_icons d-flex align-items-center gap-30 mt-3">
                  <Link className="text-white" to="#" alt="social_icons">
                    <BsLinkedin className=" fs-4" />
                  </Link>
                  <Link className="text-white" to="#" alt="social_icons">
                    <BsGithub className=" fs-4" />
                  </Link>
                  <Link className="text-white" to="#" alt="social_icons">
                    <BsYoutube className=" fs-4" />
                  </Link>
                  <Link className="text-white" to="#" alt="social_icons">
                    <BsInstagram className=" fs-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-6 mb-3 col-middle-footer">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Privacy Policy</Link>
                <Link className="text-white py-2 mb-1">Refund Policy</Link>
                <Link className="text-white py-2 mb-1">Shipping Policy</Link>
                <Link className="text-white py-2 mb-1">Terms Of Service</Link>
                <Link className="text-white py-2 mb-1">Blogs</Link>
              </div>
            </div>
            <div className="col-sm-3 col-6 mb-3 col-middle-footer">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">About us</Link>
                <Link className="text-white py-2 mb-1">Faq</Link>
                <Link className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-sm-2 col-6 mb-3 col-middle-footer">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Laptop</Link>
                <Link className="text-white py-2 mb-1">Tablets</Link>
                <Link className="text-white py-2 mb-1">Watch</Link>
                <Link className="text-white py-2 mb-1">Headphones</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="contianer-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center text-white">
                ©️ {new Date().getFullYear()}: Powered by Tuan Nguuyen
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
