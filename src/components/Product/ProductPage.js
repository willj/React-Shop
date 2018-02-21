import PropTypes from 'prop-types';
import Product from './Product';
import { FindProduct } from './ProductHelpers';
import { addToCart } from '../../actions/actionCreators';
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps){
    return {
        product: FindProduct(state.products, ownProps.slug)
    };
}

function mapDispatchToProps(dispatch){
    return {
        addToCart: (slug, variant) => {
            dispatch(addToCart(slug, variant));
        }
    }
}

const ProductPage = connect(mapStateToProps, mapDispatchToProps)(Product);

ProductPage.propTypes = {
    slug: PropTypes.string.isRequired
};

export default  ProductPage;