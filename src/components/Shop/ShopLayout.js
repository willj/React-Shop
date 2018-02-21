import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductListPage from '../Product/ProductListPage';
import Header from '../Header/Header';
import ProductPage from '../Product/ProductPage';
import CheckoutPage from '../Checkout/CheckoutPage';

const ShopLayout = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App">
                <Header />

                <main>
                    <Switch>
                        <Route exact path="/">
                            <ProductListPage />
                        </Route>

                        <Route path="/products/:slug" render={({match}) => 
                            <ProductPage slug={match.params.slug} />} />

                        <Route path="/checkout">
                            <CheckoutPage />
                        </Route>

                        <Route path="/:category" render={({match}) => 
                            <ProductListPage category={match.params.category} /> } />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default ShopLayout;