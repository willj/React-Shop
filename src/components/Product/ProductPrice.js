import React from 'react';
import PropTypes from 'prop-types';

const ProductPrice = ({product}) => {
    const lowestPrice = product.variants.reduce((prev, current) => { 
        return (parseFloat(current.price) < prev) ? parseFloat(current.price) : prev; 
    }, Number.MAX_VALUE);

    return (
        <React.Fragment>
            {(product.variants.length > 1) ? "From " : ""}
            {product.currency}{lowestPrice}
        </React.Fragment>
    );
};

export default ProductPrice;

ProductPrice.propTypes = {
    product: PropTypes.object.isRequired
}