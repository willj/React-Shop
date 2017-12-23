import { FindProduct } from './ProductHelpers';

describe('FindProduct', () => {

    const dummyProducts = [
        { slug: "product-1" },
        { slug: "product-2" },
        { slug: "product-3" }
    ];

    it('finds and returns the correct product based on slug', () => {
         let p2 = FindProduct(dummyProducts, 'product-2');

         expect(p2).toBe(dummyProducts[1]);
    });

    it('returns undefined when no match found', () => {
        let nope = FindProduct(dummyProducts, 'cheese');

        expect(nope).toBe(undefined);
    });

    it('returns undefined when passed an empty array', () => {
        let nope = FindProduct([], 'cheese');

        expect(nope).toBe(undefined);
    });

});