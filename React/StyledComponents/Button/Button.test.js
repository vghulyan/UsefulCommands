import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
    let wrapper;

    const createButton = (props, content) => {
        wrapper = shallow(<Button {...props}>{content}</Button>);
    };

    describe('structure', () => {
        it('should be displayed', () => {
            createButton();
            expect(wrapper).toExist();
        });

        it('should render a StyledButton', () => {
            createButton({}, 'Test');
            expect(wrapper.find('StyledButton').prop('type')).toBe('button');
        });

        it('should inherit other attributes', () => {
            createButton({ 'data-test': 'yes' }, 'Test');
            expect(wrapper.find('StyledButton').prop('data-test')).toBe('yes');
        });

        it('should render a StyledButton with a right arrow icon', () => {
            createButton({ arrow: true });
            expect(wrapper.exists('ArrowIcon')).toBe(true);
        });
    });
});