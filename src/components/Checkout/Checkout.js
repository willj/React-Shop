import React from 'react';
import PropTypes from 'prop-types';
import CheckoutItem from './CheckoutItem';
import { FindProduct } from '../Product/ProductHelpers';

class Checkout extends React.Component{

    calculateTotal(){
        let total = Object.values(this.props.cartItems).reduce((accumulator, cartItem) => {
            return accumulator + (cartItem.count * cartItem.variant.price);
        }, 0);

        return total.toFixed(2);
    }

    render(){
        return (
            <div>            
                <div>
                    {
                        Object.values(this.props.cartItems).map((cartItem, index) => {
                            return <CheckoutItem cartItem={cartItem} key={index} 
                                        product={FindProduct(this.props.products, cartItem.slug)} 
                                        currency={this.props.currency} 
                                        removeFromCart={this.props.removeFromCart}
                                        updateCartQuantity={this.props.updateCartQuantity} />;
                        })
                    }
                </div>

                <p>
                    Checkoot total: 
                    <span className="checkout-total">
                        {this.props.currency}{this.calculateTotal()}
                    </span>
                </p>
            </div>
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