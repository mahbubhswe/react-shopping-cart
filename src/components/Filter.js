import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filterSection">{'Products:' + this.props.count}</div>
        <div className="filterSection">
          Order{''}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option value="">All</option>
            <option value="lowest">Lowest</option>
            <option value="heighest">Heighest</option>
          </select>
        </div>

        <div className="filterSection">
          Sort{''}
          <select value={this.props.size} onChange={this.props.filterProducts}>
            <option value="">All</option>
            <option value="M">M</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="X">X</option>
          </select>
        </div>
      </div>
    );
  }
}
