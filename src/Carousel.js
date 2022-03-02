// src/Carousel.js
import React from 'react';
import PropTypes from 'prop-types';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';

let incrementAndWrapTo = (length) => (index) => (index + 1) % length;
let decrementAndWrapTo = (length) => (index) => (index + length - 1) % length;

class Carousel extends React.PureComponent {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
  };

  state = {
    slideIndex: 0,
  };

  handlePrevClick = () => {
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({
      slideIndex: decrementAndWrapTo(slides.length)(slideIndex),
    }));
  };

  handleNextClick = () => {
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({
      slideIndex: incrementAndWrapTo(slides.length)(slideIndex),
    }));
  };

  render() {
    const { slides, ...rest } = this.props;
    const { slideIndex } = this.state;

    return (
      <div {...rest}>
        <CarouselSlide {...slides[slideIndex]} />
        <CarouselButton data-action="prev" onClick={this.handlePrevClick}>
          Prev
        </CarouselButton>
        <CarouselButton data-action="next" onClick={this.handleNextClick}>
          Next
        </CarouselButton>
      </div>
    );
  }
}

export default Carousel;
