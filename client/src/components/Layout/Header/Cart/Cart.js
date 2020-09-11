import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Backdrop } from "../../../Backdrop/Backdrop";

import { incrementCart, decrementCart } from "../../../../store/actions/cart";

const Cart = ({ isActive, handleClose, cart, incrementCart, decrementCart }) => {
  let cartContent = (
    <>
      <section style={{ right: isActive ? "0" : "-20vw" }} className="section-cart">
        <div className="cart-header">
          <div className="details">
            <h4 className="heading__4 heading__4--underlined">My Cart</h4>
            <p>No Item in my cart</p>
          </div>
          <div onClick={handleClose} className="close">
            <ion-icon name="close-outline"></ion-icon>
          </div>
        </div>
        <div className="line"></div>
        <div id="cart-container">
          <div className="empty">
            <ion-icon name="basket-outline"></ion-icon>
            <h3 className="heading__teritiary heading__teritiary--underlined">
              Looks like You Have an Empty cart
            </h3>
            <p>Add some delicious food available on our menu to checkout.</p>
          </div>
        </div>
      </section>

      {isActive && <Backdrop handle={handleClose} />}
    </>
  );

  if (cart && cart.length !== 0) {
    cartContent = (
      <>
        <section style={{ right: isActive ? "0" : "-20vw" }} className="section-cart">
          <div className="cart-header">
            <div className="details">
              <h4 className="heading__4 heading__4--underlined">My Cart</h4>
              <p>{cart.length > 1 ? `${cart.length} Items` : `${cart.length} Item`} in my cart</p>
            </div>
            <div onClick={handleClose} className="close">
              <ion-icon name="close-outline"></ion-icon>
            </div>
          </div>
          <div className="line"></div>
          <div id="cart-container">
            {cart.map((dish) => (
              <div key={dish.slug} className="dish">
                <figure className="dish__image">
                  <img src={`/images/dish/${dish.category}/${dish.image}`} alt={dish.name} />
                  <figcaption className="dish__name">
                    <Link to={`/menu/${dish.slug}`}>{dish.name}</Link>
                  </figcaption>
                </figure>
                <div className="dish__features">
                  <div className="dish__feature">
                    <ion-icon name="logo-usd"></ion-icon>
                    <p className="price">{(dish.price * dish.quantity).toFixed(2)}</p>
                  </div>
                  <div className="dish__feature">
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
                <div className="plus-minus-cart">
                  <button onClick={() => incrementCart(dish)} className="increment">
                    <ion-icon name="add-outline"></ion-icon>
                  </button>
                  <h3 className="heading__teritiary heading__teritiary--underlined">
                    {dish.quantity}
                  </h3>
                  <button onClick={() => decrementCart(dish)} className="decrement">
                    <ion-icon name="remove-outline"></ion-icon>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="add-to-cart proceed">
            <ion-icon name="newspaper-outline"></ion-icon>
            <h3 className="center top heading__teritiary heading__teritiary--underlined">
              Proceed to checkout
            </h3>
          </button>
        </section>

        {isActive && <Backdrop handle={handleClose} />}
      </>
    );
  }

  return cartContent;
};

export default connect(null, { incrementCart, decrementCart })(Cart);
