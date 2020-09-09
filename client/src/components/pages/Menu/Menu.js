import React, { Component } from "react";
import { connect } from "react-redux";

import { Slideshow } from "../../Layout/Slideshow/Slideshow";

import { Link } from "react-router-dom";

import { loadMenu, loadFiltered, addFilter } from "../../../store/actions/menu";
import { Spinner } from "../../Layout/Spinner/Spinner";

class Menu extends Component {
  componentDidMount() {
    this.props.loadMenu();
  }

  handleFilter = (name, value = null) => {
    if (value === "all") {
      this.props.loadMenu();
      value = null;
    }
    this.props.addFilter(name, value);

    if (name === "category") {
      setTimeout(() => {
        this.handleSaveFilters();
      }, 500);
    }
  };

  handleSaveFilters = () => {
    return this.props.loadFiltered(this.props.filters);
  };

  render() {
    const content = [
      {
        image: "/images/weekly/weekly__card-pizza-1.jpg",
      },
      {
        image: "/images/weekly/weekly__card-pizza-2.jpg",
      },
      {
        image: "/images/weekly/weekly__card-burger-1.jpg",
      },
      {
        image: "/images/weekly/weekly__card-burger-2.jpg",
      },
    ];

    return (
      <main className="menu__main">
        <Slideshow content={content} />

        <div id="menu__container">
          <section className="menu__categories">
            <h2 className="center  heading__secondary heading__secondary--underlined">
              Categories
            </h2>

            <nav className="categories">
              <ul>
                <li className="category">
                  <a
                    onClick={() => this.handleFilter("category", "pasta")}
                    className={` ${this.props.filters.category === "pasta" && "category-active"}`}
                  >
                    <ion-icon name="restaurant-outline"></ion-icon>pasta
                  </a>
                </li>
                <li className="category">
                  <a
                    onClick={() => this.handleFilter("category", "burger")}
                    className={` ${this.props.filters.category === "burger" && "category-active"}`}
                  >
                    <ion-icon name="fast-food-outline"></ion-icon>Burger
                  </a>
                </li>
                <li className="category">
                  <a
                    onClick={() => this.handleFilter("category", "pizza")}
                    className={` ${this.props.filters.category === "pizza" && "category-active"}`}
                  >
                    <ion-icon name="pizza-outline"></ion-icon>Pizza
                  </a>
                </li>
                <li className="category">
                  <a
                    onClick={() => this.handleFilter("category", "beverage")}
                    className={` ${
                      this.props.filters.category === "beverage" && "category-active"
                    }`}
                  >
                    <ion-icon name="beer-outline"></ion-icon>beverage
                  </a>
                </li>
                <li className="category">
                  <a
                    onClick={() => this.handleFilter("category", "all")}
                    className={` ${this.props.filters.category === null && "category-active"}`}
                  >
                    <ion-icon name="newspaper-outline"></ion-icon>all
                  </a>
                </li>
              </ul>
            </nav>
          </section>

          <section className="menu__filters">
            <div className="menu__filters--section">
              <h4 className="heading__4">Food Preference</h4>
              <div className="filters">
                <a
                  onClick={() => this.handleFilter("veg")}
                  className={`filter ${this.props.filters.veg && "filter-active"}`}
                >
                  <p>Veg</p>
                </a>
                <a
                  onClick={() => this.handleFilter("nonVeg")}
                  className={`filter ${this.props.filters.nonVeg && "filter-active"}`}
                >
                  <p>Non Veg</p>
                </a>
                <a
                  onClick={() => this.handleFilter("containsEgg")}
                  className={`filter ${this.props.filters.containsEgg && "filter-active"}`}
                >
                  <p>Contains Egg</p>
                </a>
              </div>
            </div>
            <div className="menu__filters--section">
              <h4 className="heading__4">Sort By</h4>
              <div className="filters">
                <button
                  onClick={() => this.handleFilter("sortBy", "ratingsAverage")}
                  className={`filter ${
                    this.props.filters.sortBy === "ratingsAverage" && "filter-active"
                  }`}
                >
                  <p>featured</p>
                </button>
                <button
                  onClick={() => this.handleFilter("sort", "price")}
                  className={`filter ${this.props.filters.sort === "price" && "filter-active"}`}
                >
                  <p>Price: Low to High</p>
                </button>
                <button
                  onClick={() => this.handleFilter("sort", "-price")}
                  className={`filter ${this.props.filters.sort === "-price" && "filter-active"}`}
                >
                  <p>Price: High to Low</p>
                </button>
                <button
                  onClick={() => this.handleFilter("sort")}
                  className={`filter ${this.props.filters.sort === null && "filter-active"}`}
                >
                  <p>None</p>
                </button>
              </div>
            </div>

            <div className="menu__filters--section">
              <h4 className="heading__4">Customisable?</h4>
              <div className="filters">
                <a
                  onClick={() => this.handleFilter("customisable")}
                  className={`filter ${this.props.filters.customisable && "filter-active"}`}
                >
                  <p>Yes!</p>
                </a>
              </div>
              <a
                href="#menu__container"
                onClick={this.handleSaveFilters}
                className="add-to-cart save-filters"
              >
                <h3 className="center top heading__teritiary heading__teritiary--underlined">
                  Save Filters
                </h3>
              </a>
            </div>
          </section>

          <section className="menu__foods">
            <div className="menu__foods--container">
              {this.props.menu ? (
                this.props.menu.map((dish) => (
                  <div key={dish.slug} className="menu__foods--card">
                    <figure className="food__card--image">
                      <img src={`/images/dish/${dish.category}/${dish.image}`} alt={dish.name} />
                      <figcaption>
                        <Link to={`/menu/${dish.slug}`}>View More</Link>
                      </figcaption>
                    </figure>
                    <div className="food__card--name">
                      <h3 className="center  heading__teritiary heading__teritiary--underlined">
                        {dish.name}
                      </h3>
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

                    <button className="add-to-cart">
                      <ion-icon name="cart-outline"></ion-icon>
                      <h3 className="center top heading__teritiary heading__teritiary--underlined">
                        Add To Cart
                      </h3>
                    </button>
                    {dish.customisable ? <p className="customisable">Customisable</p> : null}
                  </div>
                ))
              ) : (
                <Spinner />
              )}
            </div>
          </section>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu.foods,
  filters: state.menu.filter,
});

export default connect(mapStateToProps, { loadMenu, addFilter, loadFiltered })(Menu);
