import React from 'react';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';
import './ProductList.css';

const ProductList = ({products, addToCart, category}) => {
    const productList = products.filter((product) => {
        return (category === undefined || product.categories.includes(category));
    }).map( (product,  index) => 
        <ProductListItem product={product} key={index} /> );

    return (
        <section className="product-list">
            {productList}
        </section>
    );
};

export default ProductList;

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired,
    category: PropTypes.string
}