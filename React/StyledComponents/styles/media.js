import { css } from 'styled-components';

const sizes = {
    desktop: 992,
    tablet: 768,
    phone: 576,
};

const media = {};

media.down = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
    @media only screen and (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
    return acc;
}, {});

media.up = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
    @media only screen and (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
    return acc;
}, {});

export default media;