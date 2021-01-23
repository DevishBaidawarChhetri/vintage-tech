import React from 'react';
import Product from './Product';

const ProductList = ({ title, products }) => {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="products-center">
        {
          products.map((item) => {
            // console.table(item);
            return <Product key={item.id} {...item} />
          })
        }
      </div>
    </section>
  )
}

export default ProductList
