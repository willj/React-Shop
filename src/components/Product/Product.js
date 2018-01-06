import React from 'react';
import PropTypes from 'prop-types';
import './Product.css';

class Product extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectedVariant: props.product.variants[0]
        }

        this.setVariant = this.setVariant.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    setVariant(e){
        let variant = this.props.product.variants.find(v => v.id === e.target.value);
        this.setState({ selectedVariant: variant });
    }

    addToCart(){
        this.props.addToCart({ 
            slug: this.props.product.slug, 
            variant: this.state.selectedVariant
        });
    }

    render(){
        let {product} = this.props;
        let variantImage = this.state.selectedVariant.image || product.image;

        return (
            <div className="product">
                <div className="product-image">
                    <img src={variantImage} alt={product.title} />
                </div>

                <div className="product-info">
                    <h1>{product.title}</h1>

                    <p className="display-price">{product.currency}{this.state.selectedVariant.price}</p>

                    <select className="variant-select" onChange={this.setVariant}>
                        { product.variants.map((variant, index) => {
                            return <option key={index} value={variant.id}>{variant.name}</option>
                        })}
                    </select>

                    <button className="buy-button" onClick={this.addToCart}>Add to cart</button>

                    <p>{product.desc}</p>
                </div>
            </div>
        );
    }
}

export default Product;

Product.propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
};