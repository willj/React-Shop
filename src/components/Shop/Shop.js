import React from 'react';
import PropTypes from 'prop-types';
import ShopLayout from './ShopLayout';

class Shop extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            cartItems: {}
        }

        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.updateCartQuantity = this.updateCartQuantity.bind(this);
    }

    addToCart(product){
        this.setState((prevState, props) => {
            let cart = Object.assign({}, prevState.cartItems);
            if (product.variant.id in cart) {
                cart[product.variant.id].count += 1;
            } else {
                cart[product.variant.id] = { 
                    count: 1, 
                    slug: product.slug, 
                    variant: product.variant
                };
            }

            return { cartItems: cart };
        });
    }

    removeFromCart(variantId){
        this.setState((prevState, props) => {
            let cart = Object.assign({}, prevState.cartItems);
            delete cart[variantId];

            return { cartItems: cart };
        });
    }

    updateCartQuantity(variantId, newCount){

        if (newCount < 1) return this.removeFromCart(variantId);

        this.setState((prevState, props) => {
            let cart = Object.assign({}, prevState.cartItems);
            
            if (cart[variantId]){
                cart[variantId].count = newCount;
            }

            return { cartItems: cart };
        });
    }

    render(){
        return (
            <ShopLayout products={this.props.products} 
                cartItems={this.state.cartItems} addToCart={this.addToCart} />
        );
    }
}

export default Shop;

Shop.propTypes = {
    products: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired
};