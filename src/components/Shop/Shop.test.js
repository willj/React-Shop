import React from 'react';
import { shallow } from 'enzyme';
import Shop from './Shop';

describe('<Shop />', () => { 

    it('calls loadProducts in componentDidMount', () => {
        
        const loadProducts = jest.fn();

        const wrapper = shallow(
            <Shop products={[]} loadProducts={loadProducts} />
        );

        expect(loadProducts).toHaveBeenCalledTimes(1);
    });

    // it('Shows an error screen if products.json cannot be loaded', () => {
    //     Axios.get = jest.fn((url, config) => {
    //         return new Promise((resolve, reject) => {
    //             reject();
    //         });
    //     });

    //     const wrapper = shallow(<Shop products={[]} 
    //         productsLoaded={() => {}} setCurrency={() => {}} />);

    //     // even though you only want the catch(), you need a then() for this to work
    //     return Axios.get().then(() => {}).catch(() => {
    //         expect(Axios.get).toHaveBeenCalledWith("/products.json");
    //         expect(wrapper.instance().props.products).toHaveLength(0);
    //         expect(wrapper.state().hasError).toBe(true);
    //         expect(wrapper.update().contains("an error occured")).toBe(true);
    //     });

    // });

    it('shows a loading message when there are no products', () =>{
        
        const wrapper = shallow(<Shop products={[]} loadProducts={() => {}} />);

        expect(wrapper.contains(<span>Loading...</span>)).toBe(true);
    });

});