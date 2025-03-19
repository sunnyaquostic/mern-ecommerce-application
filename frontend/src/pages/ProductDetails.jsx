import React, { useState } from 'react'
import '../pageStyles/ProductDetails.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Rating from '../components/Rating'

function ProductDetails() {
    const [userRating, setUserRating] = useState(0)
    const handleRatingChange = (newRating) => {
        setUserRating(newRating)
    }

  return (
    <>
        <PageTitle title='Product Name - Details' />
        <Navbar />
        <div className="product-details-container">
            <div className="product-detail-container">
                <div className="product-image-container">
                    <img src="" alt="Product Title" className='product-detail-image' />
                </div>

                <div className="product-info">
                    <h2>Product Name</h2>
                    <p className="product-description">Product Description</p>
                    <p className="product-price">Price : 100</p>

                    <div className="product-rating">
                        <Rating value={3} disabled={true}/>
                        <span className="productCadSpan">(1 Review)</span>
                    </div>

                    <div className="stock-status">
                        <span className="in-stock">
                            In Stock (8 available)
                        </span>
                    </div>

                    <div className="quantity-controls">
                        <span className="quantity-label">Quantity :</span>
                        <button className="quantity-button">-</button>
                        <input type="text" value={1} readOnly className='quantity-value' />
                        <button className="quantity-button">+</button>
                    </div>

                    <button className="add-to-cart-btn">
                        Add to Cart
                    </button>

                    <form className="review-form">
                        <h3>Write a Review</h3>
                        <Rating value={0} disabled={false} onRatingChange={handleRatingChange}/>
                        <textarea placeholder='Write your review here' className="review-input"></textarea>
                        <button className="submit-review-btn">Submit Review</button>
                    </form>
                </div>
            </div>

            <div className="reviews-container">
                <h3>Customer Review</h3>
                <div className="reviews-section">
                    <div className="review-item">
                        <div className="review-header">
                            <Rating value={1} disabled={true} />
                        </div>
                        <div className="review-comment">Review Comment</div>
                        <p className="review-name">By Sunday</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default ProductDetails