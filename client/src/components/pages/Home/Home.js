import React, { useState } from "react";
import { withTheme } from "../../../provider/ThemeProvider";

import { Link } from "react-router-dom";

import styled from "styled-components";

import hero from "../../../resources/images/home/hero.jpg";
import deliciousPizza from "../../../resources/images/home/why-pizza.png";
import conan from "../../../resources/images/home/conan.png";

import pizzaTextLogo from "../../../resources/images/home/pizzaTxtLogo.png";
import burgerTextLogo from "../../../resources/images/home/burgerTxtLogo.png";

import { PizzaSide } from "../../Layout/PizzaSide/PizzaSide";
import { Feature } from "../../Layout/Feature/Feature";
import Weekly from "../../Weekly/Weekly";
import Sign from "../../Sign/Sign";

import {
  HeadingSecondary,
  ZoomInLeft,
  ZoomInDown,
  ZoomInRight,
  ZoomInUp,
  SlideInRight,
  SlideInLeft,
  BounceInUp,
} from "../../../utils/animations";
import { UnderlinedPrimary } from "../../Layout/UnderlinedHeadings/UnderlinedPrimary/UnderlinedPrimary";
import { Spinner } from "../../Layout/Spinner/Spinner";
import { connect } from "react-redux";

const Home = (props) => {
  const content = [
    {
      category: "pizza",
      weeklyHeader: pizzaTextLogo,
    },
    {
      category: "burger",
      weeklyHeader: burgerTextLogo,
    },
  ];

  return (
    <>
      {props.loading ? (
        <>
          <div className="spinner__home">
            <Spinner />
          </div>
          <AreaHolder />
        </>
      ) : (
        <>
          <PizzaSide custom="home__pizza">Order</PizzaSide>
          <section className="header__home">
            <img
              src={hero}
              alt="Background of a pizza"
              style={{ transform: `translate3d(0,${props.scrollPosition / 45}%,0)` }}
            />

            <div className="slider--up" style={{ backgroundColor: "#eee" }}></div>
            <div className="fire"></div>

            <div className="header__content">
              <div className="social-media">
                <ion-icon name="logo-facebook"></ion-icon>
                <ion-icon name="logo-medium"></ion-icon>
                <ion-icon name="logo-twitter"></ion-icon>
              </div>

              <div className="headers">
                <h1 className="heading__primary heading__primary--home">
                  L'Espr<span>esso</span>
                </h1>
                <h2 className="heading__secondary heading__secondary--home">
                  T<ion-icon name="heart"></ion-icon>
                  ste<br></br> Of<br></br>
                  <span>Italy</span>
                </h2>
              </div>

              <div className="header__links">
                <Link to="/menu" className="link header__link">
                  Order Now!
                </Link>
                <a href="#features" className="link header__link">
                  View More
                </a>
              </div>
            </div>
          </section>
          <main>
            <div id="container__home">
              <section className="home__features" id="features">
                {props.scrollPosition > 200 ? (
                  <>
                    <HeadingSecondary className="heading__secondary heading__secondary--icon center heading__secondary--animated-1">
                      <ion-icon name="beer-outline"></ion-icon>Our Spe
                      <span className="--basic">cia</span>lities
                      <ion-icon name="beer-outline"></ion-icon>
                    </HeadingSecondary>
                    <ZoomInLeft>
                      <Feature initialIcon="pizza" header="Top Pizzas in world">
                        Lorem ipsum duntur accusamus fugit nulla vero harum temporibus rerum, sequi
                        unde dolor hic! Maiores, earum? Ipsum, ipsam?
                      </Feature>
                    </ZoomInLeft>
                    <ZoomInDown>
                      <Feature initialIcon="airplane-outline" header="Fastest Home Deliveries">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aliquam
                        mollitia fugiat dolores. Accusamus rem ea quisquam repellat
                      </Feature>
                    </ZoomInDown>
                    <ZoomInRight>
                      <Feature initialIcon="fast-food-outline" header="Variety of Foods">
                        Lorem ipsum iunt alias, pariatur nostrum impedit ut soluta maiores
                        voluptatem quia, explicabo possimus ipsum! Omnis odit illum eum!
                      </Feature>
                    </ZoomInRight>

                    <ZoomInLeft>
                      <Feature initialIcon="earth" header="On the globe">
                        Lorem ipsum dontur accusamus fugit nulla vero harum temporibus rerum, sequi
                        unde dolor hic! Maiores, earum? Ipsum, ipsam?
                      </Feature>
                    </ZoomInLeft>
                    <ZoomInUp>
                      <Feature initialIcon="cloud-done-outline" header="Available Online">
                        Lorem ipsum dols cupiditate beatae quasi doloribus error vero nulla eligendi
                        debitis explicabo, dolores praesentium nobis esse recusandae! Culpa!
                      </Feature>
                    </ZoomInUp>
                    <ZoomInRight>
                      <Feature initialIcon="heart-circle-outline" header="Loved by millions">
                        Lorem ipsum door sit, amet consectetur adipisicing elit. Sint quas facere,
                        blanditiis debitis nesciunt alipsum! Omnis odit illum eum!
                      </Feature>
                    </ZoomInRight>
                  </>
                ) : (
                  <AreaHolder />
                )}
              </section>

              <section
                className="home__why"
                id="why"
                style={{ backgroundPosition: `${props.scrollPosition / 45}%` }}
              >
                {props.scrollPosition > 1100 ? (
                  <>
                    <HeadingSecondary className="heading__secondary heading__secondary--icon center heading__secondary--animated-1">
                      <ion-icon name="ribbon-outline"></ion-icon>Why Ch
                      <span className="--basic">oo</span>se <span className="--basic">Us?</span>
                      <ion-icon name="ribbon-outline"></ion-icon>
                    </HeadingSecondary>
                    <div className="flex__container--why">
                      <SlideInLeft className="why__content">
                        <h3 className="heading__teritiary heading__teritiary--why">
                          We are known for our <br></br>
                          <span>delicious</span> pizzas
                        </h3>
                        <p className="why__content--paragraph">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum porro
                          officiis maxime,Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Inventore officiis, assumenda, quae rerum est at dignissimos iste non
                          perspiciatis illo pariatur unde! Soluta, dicta sint quod dignissimos quo
                          quae obcaecati? magni ex dolor, laborum perspiciatis minima, nisi
                          doloremque cumque. Aspernatur est nisi, aliquid sed suscipit voluptatem
                          eos doloremque.
                        </p>
                      </SlideInLeft>
                      <SlideInRight className="why__content--img">
                        <figure>
                          <img src={deliciousPizza} alt="Delicious Pizza" />
                        </figure>
                      </SlideInRight>
                    </div>
                  </>
                ) : (
                  <AreaHolder />
                )}
              </section>

              <section id="weekly__home">
                {props.scrollPosition > 1900 ? (
                  <>
                    <UnderlinedPrimary>Weekly Specials!</UnderlinedPrimary>
                    <BounceInUp>
                      <Weekly content={content} />
                    </BounceInUp>
                  </>
                ) : (
                  <AreaHolder />
                )}
              </section>

              {window.innerWidth > 800 ? (
                <section className="testimonial" id="testimonial">
                  <figure
                    className="testimonial__celebrity"
                    style={{ backgroundPosition: `${props.scrollPosition / 60}%` }}
                  >
                    <img
                      src={conan}
                      alt="Conan o brien"
                      style={{
                        transform: `translate3d(0,${props.scrollPosition / 150 - 16}%,0)`,
                      }}
                    />
                    <figcaption className="testimonial__celebrity--name">Conan O'Brien</figcaption>
                  </figure>

                  <div className="quote">,,</div>

                  <div
                    className="testimonial__text"
                    style={{
                      transform: `translate3d(-${props.scrollPosition / 200 - 16}%,${
                        props.scrollPosition / 150 - 16
                      }%,0)`,
                    }}
                  >
                    <h3 className="heading__teritiary">
                      <span>
                        Anyone who says that money cannot buy happiness has clearly never spent
                        their money on pizza
                      </span>
                    </h3>
                    <blockquote>
                      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas distinctio
                      dolore earum consequatur impedit corrupti, quibusdam aspernatur saepe
                      accusantium quisquam cumque sequi, incidunt nihil magni dolorem autem sapiente
                      ad velit? "
                    </blockquote>
                  </div>
                </section>
              ) : (
                <section className="testimonial" id="testimonial">
                  <figure className="testimonial__celebrity">
                    <img src={conan} alt="Conan o brien" />
                    <figcaption className="testimonial__celebrity--name">Conan O'Brien</figcaption>
                  </figure>

                  <div className="quote">,,</div>

                  <div className="testimonial__text">
                    <h3 className="heading__teritiary">
                      <span>
                        Anyone who says that money cannot buy happiness has clearly never spent
                        their money on pizza
                      </span>
                    </h3>
                    <blockquote>
                      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas distinctio
                      dolore earum consequatur impedit corrupti, quibusdam aspernatur saepe
                      accusantium quisquam cumque sequi, incidunt nihil magni dolorem autem sapiente
                      ad velit? "
                    </blockquote>
                  </div>
                </section>
              )}

              {!props.isAuth && (
                <section className="sign-up" id="sign-up">
                  {window.innerWidth > 800 ? (
                    props.scrollPosition > 3600 ? (
                      <>
                        <UnderlinedPrimary>Start Ordering now!</UnderlinedPrimary>
                        <Sign />
                      </>
                    ) : (
                      <AreaHolder />
                    )
                  ) : (
                    <>
                      <UnderlinedPrimary>Start Ordering now!</UnderlinedPrimary>
                      <Sign />
                    </>
                  )}
                </section>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
};

const AreaHolder = styled.div`
  height: 150vh;
  width: 100%;
`;

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(withTheme(Home));
