import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';

const ProductList = ({products, addToCart, category}) => {
    const productList = products.filter((product) => {
        return (category === undefined || product.categories.includes(category));
    }).map( (product,  index) => 
        <ProductListItem product={product} key={index} /> );

    return <React.Fragment>{productList}</React.Fragment>;
};

export default ProductList;

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired,
    category: PropTypes.string
}