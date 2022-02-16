//feature 1
import React from 'react';
import Products from './components/Products';
import Filter from './components/Filter';
import data from './data.json';
import Cart from './components/cart';
import Fade from '../.././node_modules/react-reveal/Fade';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
      sort: '',
      size: '',
    };
  }
  filterProducts = (event) => {
    const size = event.target.value;

    if (size === '') {
      this.setState((state) => ({
        size: size,
        products: data.products,
      }));
    } else {
      this.setState((state) => ({
        size: size,
        products: data.products.filter(
          (product) => product.availableSize.indexOf(size) >= 0
        ),
      }));
    }
  };
  sortProducts = (event) => {
    const sort = event.target.value;
    if (sort === '') {
      this.setState((state) => ({
        sort: sort,
        products: data.products,
      }));
    } else {
      this.setState((state) => ({
        sort: sort,
        products: data.products
          .slice()
          .sort((a, b) =>
            sort === 'lowest'
              ? a.price > b.price
                ? 1
                : -1
              : sort === 'heighest'
              ? a.price < b.price
                ? 1
                : -1
              : a._id < b._id
              ? 1
              : -1
          ),
      }));
    }
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };
  createOrder(order) {
    alert('Saved your order' + order.name);
  }
  render() {
    return (
      <div>
        <header>
          <div className="header">
            <div className="logo">React Shopping Cart</div>
          </div>
        </header>

        <main>
          <Fade left cascade>
            <div className="content">
              <div className="main">
                <Filter
                  count={this.state.products.length}
                  sort={this.state.sort}
                  size={this.state.size}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                ></Filter>
                <Products
                  products={this.state.products}
                  addToCart={this.addToCart}
                ></Products>
              </div>

              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                ></Cart>
              </div>
            </div>
          </Fade>
        </main>

        <footer>All reserver</footer>
      </div>
    );
  }
}

export default App;
