import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

const FindProduct = (products, slug) => 
    products.find(p => p.slug === slug);

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