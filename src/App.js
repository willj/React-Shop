import Shop from './components/Shop/Shop';
import './App.css';
import { connect } from 'react-redux';
import { loadProducts } from './actions/productActions';

function mapStateToProps(state){
    return {
        products: state.products,
        loadingError: state.loadingError
    };
}

const mapDispatchToProps = {
    loadProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);