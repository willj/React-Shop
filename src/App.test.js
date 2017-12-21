import React from 'react';
import { shallow } from 'enzyme';

// Mock remote calls
jest.mock('axios');
import Axios from 'axios';

import App from './App';

const dummyProducts = [
    { slug: "product-1" },
    { slug: "product-2" },
    { slug: "product-3" }
];

describe('<App />', () => { 

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

    it('calls componentDidMount and sets product state with an ajax call', () => {
        
        const wrapper = shallow(<App />);

        // because we're doing this
        // Axios.get() is called again (so don't count calls)
        // and it's CalledLastWith no args, so you can't check that either

        return Axios.get().then(() => {
            expect(Axios.get).toHaveBeenCalledWith("/products.json");
            expect(wrapper.state().products).toHaveLength(3);
            expect(wrapper.state().currency).toBe("£");
        });

    });

    it('Shows an error screen if products.json cannot be loaded', () => {
        Axios.get = jest.fn((url, config) => {
            return new Promise((resolve, reject) => {
                reject();
            });
        });

        const wrapper = shallow(<App />);

        // even though you only want the catch(), you need a then() for this to work
        return Axios.get().then(() => {}).catch(() => {
            expect(Axios.get).toHaveBeenCalledWith("/products.json");
            expect(wrapper.state().products).toHaveLength(0);
            expect(wrapper.state().hasError).toBe(true);
            expect(wrapper.update().contains("an error occured")).toBe(true);
        });

    });

});