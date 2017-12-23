import React from 'react';
import { shallow } from 'enzyme';
import CategoryMenu from './CategoryMenu';
import { Link } from 'react-router-dom';

describe('<CategoryMenu />', () => {

    const dummyProducts = [
        { 
            slug: "product-1", 
            categories: [
                "dark",
                "bars"
            ]
        },
        { 
            slug: "product-1", 
            categories: [
                "cheese"
            ]
        },
        { 
            slug: "product-1", 
            categories: [
                "milk",
                "bars"
            ]
        }
    ];

    it('displays a single link for each category plus a link for "all"', () => {
        const wrapper = shallow(<CategoryMenu products={dummyProducts} />);

        expect(wrapper.find(Link)).toHaveLength(5);
        
        let links = [];
        // ensure the links are all unique
        wrapper.find(Link).forEach( link => {
            expect(links.includes(link.props().to)).toBe(false);
            links.push(link.props().to);
        });

        expect(links.length).toBe(5);
    });

});