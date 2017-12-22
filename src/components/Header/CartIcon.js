import React from 'react';
import PropTypes from 'prop-types';

const CartIcon = ({cartItems}) => {
    let itemCount = Object.values(cartItems).reduce((accumulator, currentValue) => {
        return accumulator + currentValue.count;
    }, 0);

    return (
        <div>
            Items in cart: 
            {(itemCount > 0) && <span className="cart-item-count">{itemCount}</span>}
        </div>
    );
};

export default CartIcon;

CartIcon.propTypes = {
    cartItems: PropTypes.object.isRequired
}
