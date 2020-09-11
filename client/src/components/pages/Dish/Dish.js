import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { BounceInUp, SlideInRight } from "../../../utils/animations";
import api from "../../../utils/api";
import { Spinner } from "../../Layout/Spinner/Spinner";

import { addCart, removeCart } from "../../../store/actions/cart";
import { setAlert } from "../../../store/actions/alert";

class Dish extends PureComponent {
  state = {
    food: null,
    review: "",
    rating: null,
    reviewExist: false,
    isActive: false,
  };

  componentDidMount() {
    const { dish } = this.props.match.params;

    const fetch = async () => {
      let res = await api.get(`/foods/${dish}`);

      const food = res.data.data;

      const checkExist = food.reviews.filter((review) => review.user.name === this.props.user.name);

      if (checkExist.length !== 0 && this.state.review !== checkExist.review) {
        this.setState({
          food,
          review: checkExist[0].review,
          reviewExist: true,
          reviewId: checkExist[0].id,
          rating: checkExist[0].rating,
        });
      } else {
        this.setState({ food, reviewExist: false });
      }
    };
    fetch();
  }

  handleOnChange = (e) => {
    e.persist();
    this.setState((prevState) => ({
      review: e.target.value,
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ isActive: !prevState.isActive }));

    try {
      if (this.state.rating < 1) {
        this.props.setAlert("Please set an appropriate rating", "danger");
      }
      const body = { review: this.state.review, rating: this.state.rating };
      const res = await api.post(`/foods/${this.state.food.id}/reviews`, body);
      if (res.data.status === "success") {
        this.props.setAlert("Review created", "success", 8000);

        this.props.history.push(`/menu`);
        setTimeout(() => {
          this.props.history.push(`/menu/${this.state.food.slug}`);
        }, 10);
      } else {
        this.props.setAlert("Review Could not be created", "danger", 8000);
      }
    } catch (error) {
      this.props.setAlert(error.response.data.message, "danger", 8000);
    }
  };

  handleUpdate = async (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ isActive: !prevState.isActive }));

    try {
      if (this.state.rating < 1) {
        this.props.setAlert("Please set an appropriate rating", "danger");
      }
      const body = { review: this.state.review, rating: this.state.rating };
      const res = await api.patch(`/foods/${this.state.reviewId}/reviews`, body);
      if (res.data.status === "success") {
        this.props.setAlert("Review updated", "success", 8000);

        this.props.history.push(`/menu`);
        setTimeout(() => {
          this.props.history.push(`/menu/${this.state.food.slug}`);
        }, 10);
      } else {
        this.props.setAlert("Review Could not be updated", "danger", 8000);
      }
    } catch (error) {
      this.props.setAlert(error.response.data.message, "danger", 8000);
    }
  };

  render() {
    let content = (
      <AreaHolder>
        <Spinner />
      </AreaHolder>
    );

    let cartFood;

    if (this.state.food) {
      cartFood = {
        name: this.state.food.name,
        image: this.state.food.image,
        slug: this.state.food.slug,
        veg: this.state.food.veg,
        category: this.state.food.category,
        containsEgg: this.state.food.containsEgg,
        ratingsAverage: this.state.food.ratingsAverage,
        price: this.state.food.price,
        quantity: 1,
      };
    }

    let buttonContent = (
      <button
        onClick={
          this.props.isAuth
            ? () => this.props.addCart(cartFood)
            : () => this.props.history.push("/sign")
        }
        className="add-to-cart"
      >
        <ion-icon name="cart-outline"></ion-icon>
        <h3 className="center top heading__teritiary heading__teritiary--underlined">
          Add To Cart
        </h3>
      </button>
    );

    let check = [];
    if (this.props.cart && this.state.food) {
      check = this.props.cart.filter((e) => e.name === this.state.food.name);
    }

    if (check.length > 0) {
      buttonContent = (
        <button onClick={() => this.props.removeCart(cartFood)} className="remove-from-cart">
          <h3 className="center top heading__teritiary heading__teritiary--underlined">
            Remove from cart
          </h3>
        </button>
      );
    }

    let rating = ["star", "star", "star", "star", "star"];

    if (this.state.food) {
      let food = { ...this.state.food };

      let foodName = this.state.food.name;
      let size = "-";
      if (this.state.food.name.includes("(")) {
        const newName = food.name.split("(");
        [foodName, size] = newName;
        size = size.split("");
        size.pop();
        size = size.join("");
      }
      content = (
        <main className="dish">
          <div className="dish__container">
            <section className="dish__overview">
              <div className="dish__overview--hero">
                <div className="triangle triangle-1"></div>
                <div className="triangle triangle-2"></div>
                <div className="triangle triangle-3"></div>
                <figure>
                  <img src={`/images/dish/${food.category}/${food.image}`} alt={foodName} />
                </figure>
              </div>
              <BounceInUp>
                <div className="dish__overview--bar">
                  <div className="food__rating">
                    <div className="rating">
                      <div className="content">{food.ratingsAverage}</div>
                      <ion-icon name="star-sharp"></ion-icon>
                    </div>
                    <div className="quantity">{food.ratingsQuantity} reviews</div>
                  </div>
                  <h3 className="food__name heading__teritiary heading__teritiary--underlined">
                    {foodName}
                  </h3>
                </div>
              </BounceInUp>
              <SlideInRight>
                <div className="dish__overview--description">
                  <p className="paragraph">{food.description}</p>
                  <p className="paragraph">{food.summary}</p>

                  <ul className="list">
                    <li className="list__item">
                      <ion-icon name="chevron-forward-outline"></ion-icon>Price: $
                      {food.price.toFixed(2)}
                    </li>
                    <li className="list__item">
                      <ion-icon name="chevron-forward-outline"></ion-icon>serves 3
                    </li>
                    <li className="list__item">
                      <ion-icon name="chevron-forward-outline"></ion-icon>
                      {size}
                    </li>
                    <li className="list__item">
                      <ion-icon name="chevron-forward-outline"></ion-icon>free home delivery
                    </li>
                    <li className="list__item">
                      <ion-icon name="chevron-forward-outline"></ion-icon>
                      {food.customisable ? "Customisable" : "Not Customisable"}
                    </li>
                    <li className="list__item">
                      <ion-icon name="chevron-forward-outline"></ion-icon>30 minutes delivery
                    </li>
                  </ul>

                  <div className="order">
                    <div className="notice">Only Available Between 9:00am to 4:00pm</div>

                    {buttonContent}
                  </div>
                </div>
              </SlideInRight>
            </section>

            <section className="dish__reviews">
              {this.props.user ? (
                <div className="reviews__form">
                  <div className="review__user-box">
                    <img
                      src={`/images/user/${this.props.user.avatar}`}
                      alt={`${this.props.user.name}`}
                      className="review__photo"
                    ></img>
                    <p className="review__user-name">{this.props.user.name}</p>
                  </div>
                  <form action="#">
                    <div className="user-rating">
                      {rating.map((el, i) => {
                        return this.state.rating > i++ ? (
                          <div
                            key={el + i}
                            onClick={() => this.setState({ rating: i++ })}
                            className="star"
                          >
                            <ion-icon name="star"></ion-icon>
                          </div>
                        ) : (
                          <div
                            key={el + i}
                            onClick={() => this.setState({ rating: i++ })}
                            className="star"
                          >
                            <ion-icon name="star-outline"></ion-icon>
                          </div>
                        );
                      })}
                    </div>
                    <div className="form__group">
                      <textarea
                        type="text"
                        id="review"
                        className="form__input"
                        placeholder={
                          this.state.reviewExist ? "Update Your Review!" : "Write Your Review!"
                        }
                        minLength="6"
                        maxLength="250"
                        value={this.state.review}
                        onChange={this.handleOnChange}
                        required
                      />
                      <label htmlFor="review" className="form__label">
                        {this.state.reviewExist ? "Update Your Review!" : "Write Your Review!"}
                      </label>
                    </div>
                    <div className="form__group">
                      <button
                        onClick={
                          this.state.reviewExist
                            ? (e) => this.handleUpdate(e)
                            : (e) => this.handleSubmit(e)
                        }
                        className="form__submit"
                      >
                        {this.state.isActive ? <Spinner /> : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}
              <div className="reviews__container">
                {this.state.food.reviews.map((review) => {
                  const date = new Date(review.createdAt).toUTCString().split(" ");
                  date.pop();
                  date.pop();
                  date.splice(0, 1);
                  return (
                    <figure key={review.id} className="review">
                      <blockquote className="review__text">{review.review}</blockquote>
                      <figcaption className="review__user">
                        <img
                          src={`/images/user/${review.user.avatar}`}
                          alt={review.user.name}
                          className="review__photo"
                        ></img>
                        <div className="review__user-box">
                          <p className="review__user-name">{review.user.name}</p>
                          <p className="review__user-date">{date.join(" ")}</p>
                        </div>
                        <div className="rating review__rating">
                          <div className="content">{review.rating.toFixed(1)}</div>
                          <ion-icon name="star-sharp"></ion-icon>
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}

                <figure className="review">
                  <blockquote className="review__text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae dignissimos,
                    ea dolorem nobis reprehenderit delectus velit sequi.
                  </blockquote>
                  <figcaption className="review__user">
                    <img
                      src="/images/user/programmer.svg"
                      alt="User 1"
                      className="review__photo"
                    ></img>
                    <div className="review__user-box">
                      <p className="review__user-name">Nick Smith</p>
                      <p className="review__user-date">feb 23rd, 2019</p>
                    </div>
                    <div className="rating review__rating">
                      <div className="content">4.8</div>
                      <ion-icon name="star-sharp"></ion-icon>
                    </div>
                  </figcaption>
                </figure>

                <figure className="review">
                  <blockquote className="review__text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic omnis enim rem
                    praesentium obcaecati assumenda officiis quia, aliquid blanditiis beatae unde
                    illum sunt vel maxime magnam quod labore nihil consectetur.
                  </blockquote>
                  <figcaption className="review__user">
                    <img src="/images/user/woman.svg" alt="User 1" className="review__photo"></img>
                    <div className="review__user-box">
                      <p className="review__user-name">Adele Johnson</p>
                      <p className="review__user-date">feb 23rd, 2019</p>
                    </div>
                    <div className="rating review__rating">
                      <div className="content">4</div>
                      <ion-icon name="star-sharp"></ion-icon>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </div>
        </main>
      );
    }

    return content;
  }
}

const AreaHolder = styled.div`
  height: 100vh;
  width: 100%;

  position: relative;

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ::after {
      border: 6px solid rgb(22, 30, 79);
      border-color: rgb(22, 30, 79) transparent rgb(22, 30, 79) transparent;
    }
  }
`;

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuthenticated,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { addCart, removeCart, setAlert })(Dish);
