import React from 'react';
import PropTypes from 'prop-types';
import CartIcon from './CartIcon';
import CategoryMenu from './CategoryMenu';

const Header = ({cartItems, products}) => {
    return (
        <header>
            Shop header

            <CartIcon cartItems={cartItems} />

            <CategoryMenu products={products} />
        </header>
    );
}

export default Header;

Header.propTypes = {
    cartItems: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired
}
