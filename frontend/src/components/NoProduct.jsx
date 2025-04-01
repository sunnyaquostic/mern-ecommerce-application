import React from 'react'
import '../componentStyles/NoProducts.css'

function NoProduct({keyword}) {
  return (
    <div className="no-products-content">
        <div className="no-products-icon">&#9747;</div>
        <h3 className="no-products-title">No Products Found</h3>
        <p className="no-products-message">
            {
                keyword 
                ? `We couldn't find any products matching "${keyword}". Try using different keywords or browse our complete catalog`
                : 'No products are available. Please check back later'
            }
        </p>
    </div>
  )
}

export default NoProduct