import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

const ProductList = ({products, addToCart}) => {
    const productList = products.map( (product,  index) => 
        <Product product={product} addToCart={addToCart} key={index} /> );

    return <React.Fragment>{productList}</React.Fragment>;
};

export default ProductList;

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired
}