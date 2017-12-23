import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductList from '../Product/ProductList';
import Header from '../Header/Header';
import ProductPage from '../Product/ProductPage';
import Checkout from '../Checkout/Checkout';

const ShopLayout = ({products, cartItems, currency, addToCart, removeFromCart, updateCartQuantity}) => {
    return (
        <BrowserRouter>
            <div className="App">
                <Header cartItems={cartItems} products={products} />

                <main>
                    <Switch>
                        <Route exact path="/">
                            <ProductList products={products} addToCart={addToCart} />
                        </Route>

                        <Route path="/products/:slug" render={({match}) => 
                            <ProductPage products={products} addToCart={addToCart} match={match} />} />

                        <Route path="/checkout">
                            <Checkout products={products} cartItems={cartItems} currency={currency}
                                removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} />
                        </Route>

                        <Route path="/:category" render={({match}) => 
                            <ProductList products={products} 
                                addToCart={addToCart} category={match.params.category} /> } />
                    </Switch>
                </main>

                <footer>footer</footer>
            </div>
            </BrowserRouter>
    );
};

export default ShopLayout;

ShopLayout.propTypes = {
    products: PropTypes.array.isRequired,
    cartItems: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateCartQuantity: PropTypes.func.isRequired
};