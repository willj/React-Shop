import React from 'react';
import PropTypes from 'prop-types';

class Shop extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            cartItems: {}
        }

        this.addToCart = this.addToCart.bind(this);
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

    render(){
        return (
            <div>
                <h1>shop</h1>

                {this.props.products.map(
                    (p, i) => <li key={i}>{p.title}</li>)}

            </div>
        );
    }
}

export default Shop;

Shop.propTypes = {
    products: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired
};