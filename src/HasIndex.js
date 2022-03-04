// src/HasIndex.js
import React from 'react';

const decrementAndWrapTo = (uBound) => (index) =>
  uBound ? (index - 1 + uBound) % uBound : index - 1;

const incrementAndWrapTo = (uBound) => (index) =>
  uBound ? (index + 1) % uBound : index + 1;

export default (Component, indexPropName) =>
  class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName || Component.name})`;

    state = {
      index: 0,
    };

    handleIncrement = (upperBound) => {
      this.setState(({ index }) => ({
        index: incrementAndWrapTo(upperBound)(index),
      }));
    };

    handleDecrement = (upperBound) => {
      this.setState(({ index }) => ({
        index: decrementAndWrapTo(upperBound)(index),
      }));
    };

    render() {
      const { index } = this.state;

      return (
        <Component
          index={index}
          indexDecrement={this.handleDecrement}
          indexIncrement={this.handleIncrement}
        />
      );
    }
  };
