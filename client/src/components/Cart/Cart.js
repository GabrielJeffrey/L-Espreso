import React from "react";

const Cart = ({ isActive, handleClose }) => {
  return (
    <section style={{ right: isActive ? "0" : "-20vw" }} className="section-cart">
      <div className="cart-header">
        <div className="details">
          <h4 className="heading__4 heading__4--underlined">My Cart</h4>
          <p>2 Items in my cart</p>
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
  );
};

export default Cart;
