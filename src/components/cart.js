import React, { Component } from 'react';
import Fade from '../../../node_modules/react-reveal/Fade';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      showCheckOut: false,
      name: '',
      address: '',
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };

    this.props.createOrder(order);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        <div>
          {cartItems.length === 0 ? (
            <h3>Cart is empty.</h3>
          ) : (
            <h3>You have {cartItems.length} item in cart.</h3>
          )}
        </div>
        <Fade top cascade>
          <div className="cart">
            {cartItems.map((product) => (
              <div key={product._id}>
                <img
                  src={product.img}
                  alt={product.title}
                  height="80px"
                  height="80px"
                ></img>
                <div>
                  {product.price} x {product.count} ={' '}
                  {product.price * product.count}
                  <button
                    className="btn"
                    onClick={() => this.props.removeFromCart(product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Fade>
        {cartItems.length !== 0 && (
          <div>
            {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
            <button
              className="btn"
              onClick={() => {
                this.setState({ showCheckOut: true });
              }}
            >
              Make order
            </button>
          </div>
        )}
        {this.state.showCheckOut && (
          <Fade right cascade>
            <div>
              <form onSubmit={this.createOrder}>
                <div>
                  Name:
                  <input
                    type="text"
                    required
                    onChange={this.handleInput}
                  ></input>
                </div>
                <div>
                  Address:
                  <input
                    type="text"
                    required
                    onChange={this.handleInput}
                  ></input>
                </div>
                <button
                  className="btn"
                  type="submit"
                  onClick={this.createOrder}
                >
                  Create order
                </button>
              </form>
            </div>
          </Fade>
        )}
      </div>
    );
  }
}
