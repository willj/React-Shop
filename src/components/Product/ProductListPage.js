import { connect } from 'react-redux';
import ProductList from './ProductList';

function mapStateToProps(state){
    return {
        products: state.products
    };
}

function mapDispatchToProps(dispatch){
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);