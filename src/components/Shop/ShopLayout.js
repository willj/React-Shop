import React from 'react';
import PropTypes from 'prop-types';
import ProductList from '../Product/ProductList';
import Header from '../Header/Header';

const ShopLayout = ({products, cartItems, addToCart}) => {
    return (
        <div className="App">
            <Header cartItems={cartItems} />

            <main>
                <h1>Shop</h1>

                <ProductList products={products} addToCart={addToCart} />

            </main>

            <footer>footer</footer>
        </div>
    );
};

export default ShopLayout;

ShopLayout.propTypes = {
    products: PropTypes.array.isRequired,
    cartItems: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
};