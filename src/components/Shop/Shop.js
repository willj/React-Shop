import React from 'react';
import PropTypes from 'prop-types';
import ShopLayout from './ShopLayout';

class Shop extends React.Component{

    componentDidMount(){
        this.props.loadProducts(process.env.PUBLIC_URL + "/products.json");
    }

    render(){
        if (this.props.loadingError) return <h1>an error occured</h1>;
        if (this.props.products.length === 0) return <span>Loading...</span>;

        return <ShopLayout />;
    }
}

export default Shop;

Shop.propTypes = {
    products: PropTypes.array.isRequired,
    loadProducts: PropTypes.func.isRequired,
    loadingError: PropTypes.bool.isRequired
};