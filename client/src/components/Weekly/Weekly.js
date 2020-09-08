import React, { PureComponent } from "react";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

import { Card } from "../Layout/Card/Card";

export default class Weekly extends PureComponent {
  render() {
    const generateCardDetails = (
      prefix,
      category,
      cardNumber,
      classes,
      cardPrice,
      cardHeadings
    ) => {
      return {
        cardPrefix: prefix,
        cardCategory: category,
        cardNumber,
        modifications: classes ? classes : null,
        cardHeadingFirst: cardHeadings ? cardHeadings[0] : null,
        cardHeadingSecond: cardHeadings ? cardHeadings[1] : null,
        cardPrice: cardPrice ? cardPrice : null,
      };
    };

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
      <>
        <Slider
          previousButton={previousButton}
          nextButton={nextButton}
          autoplay={2000}
          infinite={true}
          classNames={{
            slider: "slider-wrapper--weekly",
            track: "track-weekly",
          }}
        >
          {this.props.content.map((item, index) => (
            <div key={index}>
              <div className={`weekly__${item.category}`}>
                <div className={`weekly__${item.category}--header`}>
                  <img src={item.weeklyHeader} alt={`${item.category} specials section`} />
                </div>
                <div className={`weekly__${item.category}--cards`}>
                  <Card {...generateCardDetails("weekly", item.category, 1)} />
                  <Card {...generateCardDetails("weekly", item.category, 2)} />
                  <Card {...generateCardDetails("weekly", item.category, 3)} />
                  <Card {...generateCardDetails("weekly", item.category, 4)} />
                  <Card {...generateCardDetails("weekly", item.category, 5)} />
                  <Card {...generateCardDetails("weekly", item.category, 6)} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </>
    );
  }
}
