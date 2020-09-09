import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { BounceInUp, SlideInRight } from "../../../utils/animations";
import api from "../../../utils/api";
import { Spinner } from "../../Layout/Spinner/Spinner";

class Dish extends PureComponent {
  state = {
    food: null,
  };

  componentDidMount() {
    const { dish } = this.props.match.params;

    const fetch = async () => {
      let res = await api.get(`/foods/${dish}`);

      const food = res.data.data;
      this.setState({ food });
    };
    fetch();
  }

  render() {
    let content = (
      <AreaHolder>
        <Spinner />
      </AreaHolder>
    );

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

                    <button className="add-to-cart">
                      <ion-icon name="cart-outline"></ion-icon>
                      <h3 className="center top heading__teritiary heading__teritiary--underlined">
                        Add To Cart
                      </h3>
                    </button>
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
                    <div className="form__group">
                      <textarea
                        type="text"
                        id="review"
                        className="form__input"
                        placeholder="Write Your Review!"
                        minLength="6"
                        maxLength="250"
                        required
                      />
                      <label htmlFor="review" className="form__label">
                        Write Your Review!
                      </label>
                    </div>
                    <div className="form__group">
                      <button className="form__submit">Submit</button>
                    </div>
                  </form>
                </div>
              ) : null}
              <div className="reviews__container">
                <figure className="review">
                  <blockquote className="review__text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae dignissimos,
                    ea dolorem nobis reprehenderit delectus velit sequi.
                  </blockquote>
                  <figcaption className="review__user">
                    <img
                      src="/images/user/profile.svg"
                      alt="User 1"
                      className="review__photo"
                    ></img>
                    <div className="review__user-box">
                      <p className="review__user-name">Aaron Stoneheart</p>
                      <p className="review__user-date">feb 23rd, 2019</p>
                    </div>
                    <div className="rating review__rating">
                      <div className="content">4.2</div>
                      <ion-icon name="star-sharp"></ion-icon>
                    </div>
                  </figcaption>
                </figure>

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
});

export default connect(mapStateToProps)(Dish);
