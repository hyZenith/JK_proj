import React, { Component } from "react";
import "./MyFavoritesOutlet.scss";
import ProductCard from "../../components/ProductCard";

export default class MyFavoritesOutlet extends Component {
    state = {
        products: this.generateFakeProducts(12) // TODO: Replace with API data
    };

    // TODO: Replace this with real API call
    generateFakeProducts(count) {
        const products = [];
        for (let i = 1; i <= count; i++) {
            products.push({
                id: i,
                name: `Product ${i}`,
                slug: `product-${i}`,
                category: {
                    slug: `cat-${i}`,
                    category: {
                        slug: `main-cat-${i}`
                    }
                },
                price: (Math.random() * 100 + 50).toFixed(2),
                reducedPrice: Math.random() > 0.5 ? (Math.random() * 50 + 20).toFixed(2) : null,
                featuredImage: {
                    url: `https://picsum.photos/300/300?random=${i}`
                }
            });
        }
        return products;
    }

    render() {
        const { products } = this.state;

        return (
            <div className="supplier-product-listing">
                <div className="head">
                    <h1>My favorites products</h1>
                </div>
                {products.length === 0 && <p>No products found.</p>}

                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        );
    }
}
