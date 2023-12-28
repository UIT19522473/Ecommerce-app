import React from "react";
import "../styles/contact.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="wrap-contact my-4 container p-4">
      <section className="row">
        <div className="col-lg-6">
          <h3>Contact</h3>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="contact-name"
                placeholder="Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="contact-email"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="contact-phone"
                placeholder="phone"
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                name="contact-cmt"
                id="contact-cmt"
                cols="30"
                rows="5"
                placeholder="Comment"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-contact-submit"
            >
              Send
            </button>
          </form>
        </div>
        <div className="col-lg-6">
          <h3>Get In Touch With Us</h3>

          <div className="contact-with-us-row">
            <FaFacebook size={20} />
            <Link to="https://www.facebook.com/profile.php?id=100013768984593">
              My facebook
            </Link>
          </div>
          <div className="contact-with-us-row">
            <MdEmail size={20} />
            <Link to={"https://www.google.com/intl/vi/gmail/about/"}>
              tuankapro156@gmail.com
            </Link>
          </div>
          <div className="contact-with-us-row">
            <FaPhoneAlt size={20} />
            <Link>0325709731</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
