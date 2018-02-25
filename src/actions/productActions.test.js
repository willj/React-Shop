// Mock remote calls
jest.mock('axios');
import Axios from 'axios';
import * as productActions from './productActions';

const dummyProducts = [
    { slug: "product-1" },
    { slug: "product-2" },
    { slug: "product-3" }
];

describe('productActions', () => {
    
    describe('loadProducts', () => {

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

        it('loads products and dispatches productsLoaded and setCurrency actions', () => {
            
            const dispatch = jest.fn();
            const thunk = productActions.loadProducts();
            const loadAction = thunk(dispatch);

            const expectedProductLoadedAction = productActions.productsLoaded(dummyProducts);
            const expectedSetCurrencyAction = productActions.setCurrency("£");

            // Axios.get() is called again (so don't count calls)
            // and it's CalledLastWith no args, so you can't check that either

            return Axios.get().then(() => {
                expect(Axios.get).toHaveBeenCalledWith("/products.json");

                expect(dispatch).toHaveBeenCalledWith(expectedProductLoadedAction);
                expect(dispatch).toHaveBeenCalledWith(expectedSetCurrencyAction);
            });
        });

        it('dispatches PRODUCT_LOADING_ERROR when products cannot be loaded', () => {

            Axios.get = jest.fn((url, config) => {
                return new Promise((resolve, reject) => {
                    reject();
                });
            });

            const dispatch = jest.fn();
            const thunk = productActions.loadProducts();
            const loadAction = thunk(dispatch);

            // even though you only want the catch(), you need a then() for this to work
            return Axios.get().then(() => {}).catch(() => {
                expect(Axios.get).toHaveBeenCalledWith("/products.json");
                
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenCalledWith(productActions.loadingError());
            });

        });

    });

});