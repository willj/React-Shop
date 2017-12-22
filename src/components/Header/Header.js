import React from 'react';
import PropTypes from 'prop-types';
import CartIcon from './CartIcon';

const Header = ({cartItems}) => {
    return (
        <header>
            Shop header

            <CartIcon cartItems={cartItems} />
        </header>
    );
}

export default Header;

Header.propTypes = {
    cartItems: PropTypes.object.isRequired
}
