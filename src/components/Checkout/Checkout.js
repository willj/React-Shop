import React from 'react';
import PropTypes from 'prop-types';
import CheckoutItem from './CheckoutItem';
import { FindProduct } from '../Product/ProductHelpers';
import './Checkout.css';

class Checkout extends React.Component{

    calculateTotal(){
        let total = Object.values(this.props.cartItems).reduce((accumulator, cartItem) => {
            return accumulator + (cartItem.count * cartItem.variant.price);
        }, 0);

        return total.toFixed(2);
    }

    render(){
        return (
            <section className="checkout">            
                <h2>Checkout</h2>
                {
                    Object.values(this.props.cartItems).map((cartItem, index) => {
                        return <CheckoutItem cartItem={cartItem} key={index} 
                                    product={FindProduct(this.props.products, cartItem.slug)} 
                                    currency={this.props.currency} 
                                    removeFromCart={this.props.removeFromCart}
                                    updateCartQuantity={this.props.updateCartQuantity} />;
                    })
                }

                <p className="checkout-total-wrapper">
                    Checkout total: <span className="checkout-total">{this.props.currency}{this.calculateTotal()}</span>
                </p>
            </section>
        );
    }
}

export default Checkout;

Checkout.propTypes = {
    products: PropTypes.array.isRequired,
    cartItems: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired, 
    removeFromCart: PropTypes.func.isRequired,
    updateCartQuantity: PropTypes.func.isRequired
}