import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CartIcon.css';

const CartIcon = ({cartItems}) => {
    let itemCount = Object.values(cartItems).reduce((accumulator, currentValue) => {
        return accumulator + currentValue.count;
    }, 0);

    return (
        <div className="cart-icon">
            <Link to='/checkout' className="cart-icon-link">
                {(itemCount > 0) && <span className="cart-item-count">{itemCount}</span>}
            </Link>
        </div>
    );
};

export default CartIcon;

CartIcon.propTypes = {
    cartItems: PropTypes.object.isRequired
}
