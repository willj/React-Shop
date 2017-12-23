import React from 'react';
import PropTypes from 'prop-types';
import CartIcon from './CartIcon';
import CategoryMenu from './CategoryMenu';
import { Link } from 'react-router-dom';

const Header = ({cartItems, products}) => {
    return (
        <header>
            Shop header

            <Link to='/checkout'>Checkout</Link>

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
