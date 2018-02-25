import { connect } from 'react-redux';
import Checkout from './Checkout';
import { removeFromCart, updateCartQuantity } from '../../actions/cartActions';

function mapStateToProps(state){
    return {
        products: state.products,
        cartItems: state.cartItems,
        currency: state.currency
    };
}

function mapDispatchToProps(dispatch){
    return {
        removeFromCart: variantId => dispatch(removeFromCart(variantId)),
        updateCartQuantity: (variantId, quantity) => dispatch(updateCartQuantity(variantId, quantity))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);