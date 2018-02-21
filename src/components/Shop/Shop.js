import React from 'react';
import PropTypes from 'prop-types';
import ShopLayout from './ShopLayout';
import Axios from 'axios';

class Shop extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            hasError: false
        };
    }
    
    componentDidMount(){
        Axios.get(process.env.PUBLIC_URL + "/products.json")
        .then(response => {
            this.props.productsLoaded(response.data.products);
            this.props.setCurrency(response.data.currency);
        }).catch(err => {
            this.setState({ hasError: true });
        });
    }

    render(){
        if (this.state.hasError) return <h1>an error occured</h1>;
        if (this.props.products.length === 0) return <span>Loading...</span>;

        return <ShopLayout />;
    }
}

export default Shop;

Shop.propTypes = {
    products: PropTypes.array.isRequired,
    productsLoaded: PropTypes.func.isRequired,
    setCurrency: PropTypes.func.isRequired
};