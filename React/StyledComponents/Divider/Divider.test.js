/* eslint-disable max-len */
import React from 'react';
import { shallow } from 'enzyme';
import Divider from './Divider';
import 'jest-styled-components';
import { theme } from '../styles/theme';

describe('<Divider />', () => {
    let wrapper;

    const createDivider = (props) => {
        wrapper = shallow(<Divider theme={theme} {...props} />);
    };

    describe('structure', () => {
        it('should be displayed', () => {
            createDivider();
            expect(wrapper).toExist();
        });

        it('should render an hr element', () => {
            createDivider();
            expect(wrapper.find('hr')).toHaveLength(1);
        });

        it('should inherit other attributes', () => {
            createDivider({ primary: true });
            expect(wrapper.find('hr')).toHaveStyleRule('border-top', `0.0625em solid ${theme.colors.primary}`);
        });
    });
});