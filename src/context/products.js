// products context
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts } from '../utils/helpers';

export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/store-apis`)
      .then(response => {
        const featured = featuredProducts(response.data);
        setProducts(response.data);
        setFeatured(featured);
        setLoading(false);
      })
      .catch((error) => { console.log(error) })
    return () => { }
  }, [])
  return (
    <ProductContext.Provider
      value={{ loading, products, featured }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider;
