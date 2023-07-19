import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";

import Slider from "react-slick";

const Home = () => {
  // setting categories part
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          infinite: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //setting product cards

  const sliderRef = useRef(null);
  const sliderRefNews = useRef(null);
  const sliderRefPopular = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const nextNews = () => {
    sliderRefNews.current.slickNext();
  };

  const previousNews = () => {
    sliderRefNews.current.slickPrev();
  };

  const nextPopular = () => {
    sliderRefPopular.current.slickNext();
  };

  const previousPopular = () => {
    sliderRefPopular.current.slickPrev();
  };

  var settingProductCards = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          infinite: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // setting popular
  var settingPopular = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-lg-6 col-12 mb-2">
              <div className="main-banner position-relative">
                <img
                  src="images/main-banner.jpg"
                  className="img-fluid rounded-3 img-main"
                  alt="main-banner"
                />

                <div className="main-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROPS.</h4>
                  <h5>IPad S13+ Pro</h5>
                  <p>From $999.000 or $40.00/mo</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="small-banner position-relative mb-2">
                  <img
                    src="images/catbanner-01.jpg"
                    className="img-fluid rounded-3 img-main"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sake</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>
                      From $999.00 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative mb-2">
                  <img
                    src="images/catbanner-02.jpg"
                    className="img-fluid rounded-3 img-main"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4 className="small-banner-textnote">NEW ARRIVAL</h4>
                    <h5 className="small-banner-textname">But IPad Air</h5>
                    <p className="small-banner-textdes">
                      From $999.00 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3 img-main"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>But IPad Air</h5>
                    <p>
                      From $999.00 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-04.jpg"
                    className="img-fluid rounded-3 img-main"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>But IPad Air</h5>
                    <p>
                      From $999.00 <br /> or $41.62/mo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-10">
                  <img src="images/service.png" alt="services" />
                  <div className="d-md-block d-none">
                    <h6>Fee Shipping</h6>
                    <p className="p-0 mb-0">From all orders over $100</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="services" />
                  <div className="d-md-block d-none">
                    <h6>Daily Surprise Offers</h6>
                    <p className="p-0 mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="services" />
                  <div className="d-md-block d-none">
                    <h6>Support 24/7</h6>
                    <p className="p-0 mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-04.png" alt="services" />
                  <div className="d-md-block d-none">
                    <h6>Affordable Prices</h6>
                    <p className="p-0 mb-0">Get Factory direct price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="services" />
                  <div className="d-md-block d-none">
                    <h6>Secure Payments</h6>
                    <p className="p-0 mb-0">100% Protected Payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 wrap-categories">
              <div className="categories d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Cameras</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Smart TV</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Smart Watches</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/homeapp.jpg" alt="camera" />
                </div>

                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Smart TV</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Cameras</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>

                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/homeapp.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center gap-30">
                  <div>
                    <h6>Smart Watches</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* test */}
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl ">
          <div className="bg-white categories-test">
            <Slider {...settings}>
              <div className="categories-part">
                <div className="d-flex align-items-center justify-content-between px-3 categories-item">
                  <div>
                    <h6>Cameras</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center justify-content-between px-3 ">
                  <div>
                    <h6>Cameras</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
              </div>
              <div className="categories-part">
                <div className="d-flex align-items-center justify-content-between px-3 categories-item">
                  <div>
                    <h6>Cameras</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/homeapp.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center justify-content-between px-3 ">
                  <div>
                    <h6>Cameras</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
              </div>

              <div className="categories-part">
                <div className="d-flex align-items-center justify-content-between px-3 categories-item">
                  <div>
                    <h6>Cameras</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center justify-content-between px-3">
                  <div>
                    <h6>Cameras</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
              </div>
              <div className="categories-part">
                <div className="d-flex align-items-center justify-content-between px-3 categories-item">
                  <div>
                    <h6>Cameras</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/homeapp.jpg" alt="camera" />
                </div>
                <div className="d-flex align-items-center justify-content-between px-3 ">
                  <div>
                    <h6>Cameras</h6>
                    <p className="mb-0">10 Items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>

      {/* ----- */}
      <section className="featured-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center mb-4">
              <h3 className="section-heading mb-0">Featured Collection</h3>
              <div className="" style={{ textAlign: "right" }}>
                <button className="btn-pre" onClick={previous}>
                  <span class="material-symbols-outlined fw-bold fs-5 ">
                    arrow_back_ios
                  </span>
                </button>

                <button className="btn-next" onClick={next}>
                  <span class="material-symbols-outlined fw-bold fs-5">
                    arrow_forward_ios
                  </span>
                </button>
              </div>
            </div>

            <Slider ref={sliderRef} {...settingProductCards}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </Slider>
          </div>
        </div>
      </section>

      <section className="popular-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center mb-4">
              <h3 className="section-heading mb-0">Our Popular Products</h3>
              <div className="" style={{ textAlign: "right" }}>
                <button className="btn-pre" onClick={previousPopular}>
                  <span class="material-symbols-outlined fw-bold fs-5 ">
                    arrow_back_ios
                  </span>
                </button>

                <button className="btn-next" onClick={nextPopular}>
                  <span class="material-symbols-outlined fw-bold fs-5">
                    arrow_forward_ios
                  </span>
                </button>
              </div>
            </div>

            <div className="col-12">
              <div className="row">
                <div className="col-lg-3 d-flex flex-lg-column gap-30 mb-2 option-popular">
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <img
                        src="https://demo-digitic.myshopify.com/cdn/shop/files/cat-icon-03.png?v=1655700532"
                        alt="logo"
                      />
                    </div>
                    <p className="mb-0 fw-medium">Smart Watch</p>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <img
                        src="https://demo-digitic.myshopify.com/cdn/shop/files/cat-icon-01.png?v=1655699946"
                        alt="logo"
                      />
                    </div>
                    <p className="mb-0 fw-medium">Speaker</p>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <img
                        src="https://demo-digitic.myshopify.com/cdn/shop/files/cat-icon-02.png?v=1655700520"
                        alt="logo"
                      />
                    </div>
                    <p className="mb-0 fw-medium">Laptops</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 col-5 img-discount">
                  <img
                    src="https://demo-digitic.myshopify.com/cdn/shop/files/cat-product-banner.jpg?v=1655367105"
                    alt="img"
                  />
                </div>
                <div className="col-lg-6 col-md-8 col-sm-6 col-7">
                  <Slider ref={sliderRefPopular} {...settingPopular}>
                    <div className="">
                      <ProductCard />
                    </div>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center mb-4">
              <h3 className="section-heading mb-0">Our Latest News</h3>
              <div className="" style={{ textAlign: "right" }}>
                <button className="btn-pre" onClick={previousNews}>
                  <span class="material-symbols-outlined fw-bold fs-5 ">
                    arrow_back_ios
                  </span>
                </button>

                <button className="btn-next" onClick={nextNews}>
                  <span class="material-symbols-outlined fw-bold fs-5">
                    arrow_forward_ios
                  </span>
                </button>
              </div>
            </div>
            <Slider ref={sliderRefNews} {...settingProductCards}>
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
