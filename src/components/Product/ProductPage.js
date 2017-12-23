import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import { FindProduct } from './ProductHelpers';

const ProductPage = ({match, products, addToCart}) => {
    return (products.length > 0) 
        ? <Product product={FindProduct(products, match.params.slug)} addToCart={addToCart} />
        : <span>Loading...</span>
}

export default ProductPage;

ProductPage.propTypes = {
    products: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
};