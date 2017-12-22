import React from 'react';
import PropTypes from 'prop-types';
import ProductPrice from './ProductPrice';
import { Link } from 'react-router-dom';

const ProductListItem = ({product}) => {
    return (
        <div>
            <img src={product.image} alt={product.title} />
            <Link to={`products/${product.slug}`}>{product.title}</Link>
            <ProductPrice product={product} />
        </div>
    );
}

export default ProductListItem;

ProductListItem.propTypes = {
    product: PropTypes.object.isRequired
};