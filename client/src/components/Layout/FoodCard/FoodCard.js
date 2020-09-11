import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { addCart, removeCart } from "../../../store/actions/cart";

const FoodCard = ({ dish, cart, addCart, removeCart, isAuth }) => {
  const history = useHistory();
  const [food, setFood] = useState({
    name: dish.name,
    image: dish.image,
    slug: dish.slug,
    veg: dish.veg,
    category: dish.category,
    containsEgg: dish.containsEgg,
    ratingsAverage: dish.ratingsAverage,
    price: dish.price,
    quantity: 1,
  });

  for (const key in dish) {
    for (const cartKey in cart) {
      if (cart[cartKey] === dish[key]) {
        setFood({
          name: cart.name,
          image: cart.image,
          slug: cart.slug,
          veg: cart.veg,
          category: cart.category,
          containsEgg: cart.containsEgg,
          ratingsAverage: cart.ratingsAverage,
          price: cart.price,
          quantity: 1,
        });
      }
    }
  }

  const addToCart = () => {
    addCart(food);
  };

  const removeFromCart = () => {
    removeCart(food);
  };

  let content = (
    <button
      onClick={isAuth ? () => addToCart() : () => history.push("/sign")}
      className="add-to-cart"
    >
      <ion-icon name="cart-outline"></ion-icon>
      <h3 className="center top heading__teritiary heading__teritiary--underlined">Add To Cart</h3>
    </button>
  );

  const check = cart.filter((e) => e.name === food.name);

  if (check.length > 0) {
    content = (
      <button
        onClick={removeFromCart }
        className="remove-from-cart"
      >
        <h3 className="center top heading__teritiary heading__teritiary--underlined">
          Remove from cart
        </h3>
      </button>
    );
  }

  return (
    <div className="menu__foods--card">
      <figure className="food__card--image">
        <img src={`/images/dish/${dish.category}/${dish.image}`} alt={dish.name} />
        <figcaption>
          <Link to={`/menu/${dish.slug}`}>View More</Link>
        </figcaption>
      </figure>
      <div className="food__card--name">
        <h3 className="center  heading__teritiary heading__teritiary--underlined">{dish.name}</h3>
      </div>

      <div className="food__card--features">
        <div className="food__feature">
          <ion-icon name="logo-usd"></ion-icon>
          <p className="price">{dish.price.toFixed(2)}</p>
        </div>
        <div className="food__feature">
          <ion-icon
            style={{
              color: dish.veg ? "green" : "red",
              border: `1px solid ${dish.veg ? "green" : "red"}`,
            }}
            name="radio-button-on-outline"
          ></ion-icon>
          <p className="type">{dish.veg ? "Veg" : "Non veg"}</p>
        </div>
      </div>

      {content}

      {dish.customisable ? <p className="customisable">Customisable</p> : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addCart, removeCart })(FoodCard);
