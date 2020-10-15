import React, { Component } from "react";
import { connect } from "react-redux";

import { Slideshow } from "../../Layout/Slideshow/Slideshow";

import { loadMenu, loadFiltered, addFilter } from "../../../store/actions/menu";
import { Spinner } from "../../Layout/Spinner/Spinner";
import FoodCard from "../../Layout/FoodCard/FoodCard";

class Menu extends Component {
  componentDidMount() {
    document.title = `L'Espresso - Menu`;

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

  handleCartClick = () => {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
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
                  onClick={() => this.handleFilter("sort", "ratingsAverage")}
                  className={`filter ${
                    this.props.filters.sort === "ratingsAverage" && "filter-active"
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
                className="button-2 save-filters"
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
                  <FoodCard cart={this.props.cart} dish={dish} key={dish.slug} />
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
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { loadMenu, addFilter, loadFiltered })(Menu);
