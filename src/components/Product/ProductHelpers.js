export const FindProduct = (products, slug) => 
    products.find(p => p.slug === slug);