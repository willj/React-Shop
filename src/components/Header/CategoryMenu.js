import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CategoryMenu.css';

const CategoryMenu = ({products}) => {
    let categories = products.reduce((prev, current) => {
        current.categories.forEach((cat) => {
            if (!prev.includes(cat)) prev.push(cat);
        });
        return prev;
    }, []);

    return (
        <nav className="category-menu">
            <Link to="/">All</Link>
            { categories.map((cat, index) => 
                <Link to={`/${cat}`} key={index}>{cat}</Link>) }
        </nav>
    );
};

export default CategoryMenu;

CategoryMenu.propTypes = {
    products: PropTypes.array.isRequired
};