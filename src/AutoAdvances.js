// src/AutoAdvances.js
import React from 'react';
import PropTypes from 'prop-types';

export default (Component, propName, upperBoundPropName) =>
  class ComponentWithAutoAdvance extends React.PureComponent {
    static displayName = `AutoAdvances(${Component.displayName ||
      Component.name})`;

    static propTypes = {
      [propName]: PropTypes.number.isRequired,
      [`${propName}Increment`]: PropTypes.func.isRequired,
      [upperBoundPropName]: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
      ]).isRequired,
      autoAdvanceDelay: PropTypes.number.isRequired,
    };

    static defaultProps = {
      autoAdvanceDelay: 10e3,
    };

    componentDidMount() {
      this.startTimer();
    }

    componentDidUpdate(prevProps) {
      let changeOccurred =
        prevProps[propName] !== this.props[propName] ||
        prevProps[upperBoundPropName] !== this.props[upperBoundPropName];

      if (changeOccurred) this.startTimer();
    }

    componentWillUnmount() {
      clearTimeout(this._timer);
    }

    startTimer() {
      clearTimeout(this._timer);
      if (!this.props.autoAdvanceDelay) return;
      let increment = this.props[`${propName}Increment`];

      let upperBound = this.props[upperBoundPropName];
      if (upperBound && typeof upperBound != 'number')
        upperBound = upperBound.length;

      this._timer = setTimeout(() => {
        increment(upperBound);
      }, this.props.autoAdvanceDelay);
    }

    render() {
      const { autoAdvanceDelay: _autoAdvanceDelay, ...rest } = this.props;
      return <Component {...rest} />;
    }
  };
