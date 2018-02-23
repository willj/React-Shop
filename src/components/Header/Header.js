import React from 'react';
import PropTypes from 'prop-types';
import CartIcon from './CartIcon';
import CategoryMenu from './CategoryMenu';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';

const Header = ({cartItems, products}) => {
    return (
        <header className="app-header">
            <h1 className="app-title">Chocolate Shop</h1>

            <nav className="app-header-menu">
                <Link to='/'>Products</Link> 
                <Link to='/checkout'>Checkout</Link>            
            </nav>
            
            <CartIcon cartItems={cartItems} />

            <CategoryMenu products={products} />
        </header>
    );
}

Header.propTypes = {
    cartItems: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired
}

function mapStateToProps(state){
    return {
        cartItems: state.cartItems,
        products: state.products
    };
}

function mapDispatchToProps(dispatch){
    return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

/* withRouter passes router props in, and ensures it's updated for each URL change without this the activeLinkClass does not work */