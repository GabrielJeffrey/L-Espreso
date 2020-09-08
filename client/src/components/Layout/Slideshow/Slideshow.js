import React from "react";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

export const Slideshow = ({ content }) => {
  const previousButton = (
    <div className="slide-left">
      <ion-icon name="chevron-back-outline"></ion-icon>
    </div>
  );

  const nextButton = (
    <div className="slide-right">
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </div>
  );

  return (
    <Slider
      previousButton={previousButton}
      nextButton={nextButton}
      autoplay={2000}
      classNames={{
        slider: "slider-wrapper",
        track: "track",
        slide: "slide",
      }}
    >
      {content.map((item, index) => (
        <div key={index} style={{ background: `url('${item.image}')` }}></div>
      ))}
    </Slider>
  );
};
