import React from 'react';
import PropTypes from 'prop-types';
import ProductPrice from './ProductPrice';
import { Link } from 'react-router-dom';

const ProductListItem = ({product}) => {
    return (
        <div className="product-list-item">
            <Link to={`products/${product.slug}`}> 
                <img src={product.image} alt={product.title} />
            
                <p><ProductPrice product={product} /></p>
            
                <h3 className="product-list-item-title">{product.title}</h3>
            </Link>
        </div>
    );
}

export default ProductListItem;

ProductListItem.propTypes = {
    product: PropTypes.object.isRequired
};