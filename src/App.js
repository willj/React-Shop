import Shop from './components/Shop/Shop';
import './App.css';
import { connect } from 'react-redux';
import { productsLoaded, setCurrency } from './actions/actionCreators';

function mapStateToProps(state){
    return {
        products: state.products
    };
}

function mapDispatchToProps(dispatch){
    return {
        productsLoaded: products => dispatch(productsLoaded(products)),
        setCurrency: currency => dispatch(setCurrency(currency))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);