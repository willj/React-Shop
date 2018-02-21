import React from 'react';
import { shallow } from 'enzyme';

// Mock remote calls
jest.mock('axios');
import Axios from 'axios';

import Shop from './Shop';

const dummyProducts = [
    { slug: "product-1" },
    { slug: "product-2" },
    { slug: "product-3" }
];

describe('<Shop />', () => { 

    // do this beforeEach so the call count resets
    beforeEach(() => {
        Axios.get = jest.fn((url, config) => {
            return new Promise((resolve, reject) => {
                resolve({
                    data: {
                        currency: "£", 
                        products: dummyProducts
                    }
                });
            });
        });
    });

    it('loads products in componentDidMount and calls productsLoaded and setCurrency on success', () => {
        
        const productsLoaded = jest.fn();
        const setCurrency = jest.fn();

        const wrapper = shallow(
            <Shop products={[]} 
                productsLoaded={productsLoaded} setCurrency={setCurrency} />
        );

        // Axios.get() is called again (so don't count calls)
        // and it's CalledLastWith no args, so you can't check that either

        return Axios.get().then(() => {
            expect(Axios.get).toHaveBeenCalledWith("/products.json");
            expect(productsLoaded).toHaveBeenCalledWith(dummyProducts);
            expect(setCurrency).toHaveBeenCalledWith("£");
        });

    });

    it('Shows an error screen if products.json cannot be loaded', () => {
        Axios.get = jest.fn((url, config) => {
            return new Promise((resolve, reject) => {
                reject();
            });
        });

        const wrapper = shallow(<Shop products={[]} 
            productsLoaded={() => {}} setCurrency={() => {}} />);

        // even though you only want the catch(), you need a then() for this to work
        return Axios.get().then(() => {}).catch(() => {
            expect(Axios.get).toHaveBeenCalledWith("/products.json");
            expect(wrapper.instance().props.products).toHaveLength(0);
            expect(wrapper.state().hasError).toBe(true);
            expect(wrapper.update().contains("an error occured")).toBe(true);
        });

    });

    it('shows a loading message when there are no products', () =>{
        Axios.get = jest.fn((url, config) => {
            return new Promise((resolve, reject) => {});
        });

        const wrapper = shallow(<Shop products={[]} 
            productsLoaded={() => {}} setCurrency={() => {}} />);

        expect(Axios.get).toHaveBeenCalledWith("/products.json");
        expect(wrapper.state().hasError).toBe(false);
        expect(wrapper.contains(<span>Loading...</span>)).toBe(true);
    });

});