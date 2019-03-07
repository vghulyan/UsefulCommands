/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sizeUnit from '../../styles/settings/sizeUnit';
import RightArrowIcon from '../../images/RightArrowIcon';
import media from '../../styles/templates/media';

const StyledButton = styled.button`
  background-color: ${({ theme, iconButton }) => (iconButton ? 'transparent' : theme.colors.primary)};
  border: none;
  box-sizing: border-box;
  color: ${({ theme, iconButton }) => (iconButton ? theme.colors.primary : theme.colors.buttonText)};
  cursor: pointer;
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
  font-family: inherit;
  font-size: 100%;
  font-weight: 300;
  line-height: normal;
  padding: ${({ iconButton }) => (iconButton ? `0 ${sizeUnit[1]} 0 ${sizeUnit[1]}` : '0.8em 1em')};
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: ${({ block }) => (block ? '100%' : 'auto')};
  zoom: 1;
  -webkit-user-drag: none;
  &:active,
  &:hover {
    background-color: ${({ theme, iconButton }) => (iconButton ? undefined : theme.colors.buttonActive)};
    color: ${({ theme, iconButton }) => (iconButton ? theme.colors.buttonActive : undefined)};
  }
  &::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  &:focus {
    outline: 0;
  }
  &[disabled] {
    background-image: none;
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.40;
    pointer-events: none;
  }
`;

StyledButton.displayName = 'StyledButton';

const ArrowIcon = styled(RightArrowIcon)`
  padding-left: ${sizeUnit[2]};
  ${media.down.tablet`
    display:none;
  `}
`;

ArrowIcon.displayName = 'ArrowIcon';

const Button = ({
                    type, children, arrow, iconButton, ...attrs
                }) => (
    <StyledButton type={type} iconButton={iconButton} {...attrs}>
        { children }
        { arrow && <ArrowIcon /> }
    </StyledButton>
);

Button.propTypes = {
    /** The content to display in the button */
    children: PropTypes.any,
    /** submit — Submits the current form data. (This is default.)
     *  reset — Resets data in the current form.
     *  button — Just a button. */
    type: PropTypes.string,
    /** Adds an arrow icon to the button */
    arrow: PropTypes.bool,
    /** Renders the button as an icon. Child element must be an SVG icon
     *  <Button iconButton>
     *    <SvgIcon />
     *  </Button>
     */
    iconButton: PropTypes.bool,
    /** Renders the button as a full width block element */
    block: PropTypes.bool,
};

Button.defaultProps = {
    children: <span />,
    type: 'button',
    arrow: false,
    iconButton: false,
    block: false,
};

export default Button;