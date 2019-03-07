/* eslint-disable max-len */
import { bool } from 'prop-types';
import styled from 'styled-components';
import sizeUnit from '../styles/settings/sizeUnit';

const Divider = styled.hr`
  border: 0;
  margin-bottom: ${sizeUnit[4]};
  margin-top: ${sizeUnit[4]};
  border-top: 0.0625em solid ${({ theme, primary }) => (primary ? theme.colors.primary : theme.colors.border)};
`;

Divider.displayName = 'Divider';

Divider.propTypes = {
    /** When true displays the divider in the primary color for the current theme */
    primary: bool,
};

Divider.defaultProps = {
    primary: false,
};

export default Divider;