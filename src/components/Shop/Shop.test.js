import React from 'react';
import { shallow } from 'enzyme';
import Shop from './Shop';

describe('<Shop />', () => { 

    it('calls loadProducts in componentDidMount', () => {
        
        const loadProducts = jest.fn();

        const wrapper = shallow(
            <Shop products={[]} loadProducts={loadProducts} loadingError={false} />
        );

        expect(loadProducts).toHaveBeenCalledTimes(1);
    });

    it('Shows an error screen if loadingError is true', () => {

        const wrapper = shallow(<Shop products={[]} 
            loadProducts={() => {}} loadingError={false} />);

        expect(wrapper.contains(<h1>an error occured</h1>)).toBe(false);
        
        wrapper.setProps({ loadingError: true });
        expect(wrapper.contains(<h1>an error occured</h1>)).toBe(true);
    });

    it('shows a loading message when there are no products', () =>{
        
        const wrapper = shallow(<Shop products={[]} loadProducts={() => {}} loadingError={false} />);

        expect(wrapper.contains(<span>Loading...</span>)).toBe(true);
    });

});