// src/HasIndex.js
import React from 'react';
import PropTypes from 'prop-types';

const decrementAndWrapTo = (uBound) => (index) =>
  uBound ? (index - 1 + uBound) % uBound : index - 1;

const incrementAndWrapTo = (uBound) => (index) =>
  uBound ? (index + 1) % uBound : index + 1;

const capitalize = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

export default (Component, indexPropName) => {
  const defaultIndexPropName = `default${capitalize(indexPropName)}`;

  return class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName || Component.name})`;

    static propTypes = {
      [indexPropName]: PropTypes.number,
      [defaultIndexPropName]: PropTypes.number,
      onIndexChange: PropTypes.func,
    };

    static defaultProps = {
      [defaultIndexPropName]: 0,
    };

    static getDerivedStateFromProps(props, state) {
      const index = props[indexPropName] || state.index;
      return index !== state.index ? { index: index } : null;
    }

    constructor(props) {
      super(props);
      this.state = {
        index: props[defaultIndexPropName],
      };
    }

    handleIncrement = (upperBound) => {
      const { onIndexChange } = this.props;
      this.setState(({ index }) => {
        const newIndex = incrementAndWrapTo(upperBound)(index);
        if (onIndexChange) onIndexChange({ target: { value: newIndex } });
        return { index: newIndex };
      });
    };

    handleDecrement = (upperBound) => {
      const { onIndexChange } = this.props;
      this.setState(({ index }) => {
        const newIndex = decrementAndWrapTo(upperBound)(index);
        if (onIndexChange) onIndexChange({ target: { value: newIndex } });
        return { index: newIndex };
      });
    };

    render() {
      const { [defaultIndexPropName]: _defaultIndexProp, ...rest } = this.props;
      const { index } = this.state;

      const indexProps = {
        [indexPropName]: index,
        [`${indexPropName}Decrement`]: this.handleDecrement,
        [`${indexPropName}Increment`]: this.handleIncrement,
      };

      return <Component {...indexProps} {...rest} />;
    }
  };
};
