import React from 'react';
import { shallow } from 'enzyme';
import CategoryMenu from './CategoryMenu';
import { Link, NavLink } from 'react-router-dom';

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

    it('displays a single NavLink for each category plus a Link for "all"', () => {
        const wrapper = shallow(<CategoryMenu products={dummyProducts} />);

        expect(wrapper.find(Link)).toHaveLength(1);
        expect(wrapper.find(NavLink)).toHaveLength(4);
        
        let links = [];
        // ensure the category links (excluding 'all') are unique
        wrapper.find(NavLink).forEach( link => {
            expect(links.includes(link.props().to)).toBe(false);
            links.push(link.props().to);
        });

        expect(links.length).toBe(4);
    });

});