import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CheckoutItem extends React.Component{

    constructor(props){
        super(props);

        this.addOne = this.addOne.bind(this);
        this.removeOne = this.removeOne.bind(this);
    }

    addOne(){
        this.props.updateCartQuantity(this.props.cartItem.variant.id, this.props.cartItem.count + 1);
    }

    removeOne(){
        if (this.props.cartItem.count > 1){
            this.props.updateCartQuantity(this.props.cartItem.variant.id, this.props.cartItem.count - 1);
        } else {
            this.props.removeFromCart(this.props.cartItem.variant.id);
        }
    }

    itemTotal(){
        return (this.props.cartItem.count * this.props.cartItem.variant.price).toFixed(2);
    }

    render(){
        let {product, cartItem, removeFromCart} = this.props;
        let variantImage = process.env.PUBLIC_URL + (cartItem.variant.image || product.image);

        return(
            <div className="checkout-item">
                <img src={variantImage} alt={product.title} className="checkout-item-image" />
                
                <div className="checkout-col-product">    
                    <p>
                        <Link to={"/products/" + product.slug}>{product.title} ({cartItem.variant.name})</Link>
                    </p>
                    <p>{this.props.currency}{cartItem.variant.price} </p>
                </div>

                <div className="checkout-col-quantity-total">
                    <div className="checkout-col-quantity">
                        <p>Quantity: {cartItem.count}</p>
                        <button onClick={this.addOne} className="add-one-button">+</button>
                        <button onClick={this.removeOne} className="remove-one-button">-</button>
                        <button onClick={removeFromCart.bind(this, cartItem.variant.id)} className="remove-from-cart-button">Remove</button>
                    </div>

                    <div className="checkout-col-total">
                        <p>Total: <span className="checkout-item-total">{this.props.currency}{this.itemTotal()}</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckoutItem;

CheckoutItem.propTypes = {
    cartItem: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateCartQuantity: PropTypes.func.isRequired
};