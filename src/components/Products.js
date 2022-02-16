import React, { Component } from 'react';

export default class Products extends Component {
  render() {
    return (
      <div className="products">
        {this.props.products.map((product) => (
          <div key={product._id} className="product">
            <div>
              <a href={'#' + product._id}>
                <img
                  src={product.img}
                  alt={product.title}
                  height="280px"
                  width="250px"
                ></img>
                <div className="title">{product.title}</div>
              </a>
            </div>
            <div className="cartButtom">
              <div className="price">{'$ ' + product.price}</div>
              <button onClick={()=>this.props.addToCart(product)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
