import React from "react";

export const Card = ({
  cardPrefix,
  cardCategory,
  cardNumber,
  modifications,
  cardPrice,
  cardHeadingFirst,
  cardHeadingSecond,
}) => {
  return (
    <div className={`card card-${cardNumber}`}>
      <figure className="card__bg">
        <img
          src={`/images/weekly/${cardPrefix}__card-${cardCategory}-${cardNumber}.jpg`}
          alt={`A Delicious ${cardCategory}`}
        />
      </figure>
      <div className={`card__content ${modifications ? modifications : ""}`}>
        {cardHeadingFirst && (
          <h3
            className={`heading__teritiary heading__teritiary--card ${
              modifications ? modifications : ""
            }`}
          >
            {cardHeadingFirst}
          </h3>
        )}
        {cardHeadingSecond && (
          <h4 className={`heading__teritiary ${modifications ? modifications : ""}`}>
            {cardHeadingSecond}
          </h4>
        )}
      </div>
      {cardPrice && <div className="card__price">${cardPrice}</div>}
    </div>
  );
};
