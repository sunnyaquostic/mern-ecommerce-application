import React from 'react'

function CartItem() {
  return (
    <div className="cart-item">
        <div className="item-info">
        <img src="" alt="Product Image" className='item-image' />
        <div className="item-details">
            <h3 className="item-name">Laptop</h3>
            <p className="item-price"><strong>Price: </strong>200/-</p>
            <p className="item-quantity"><strong>Quantity: </strong> 2</p>
        </div>
        </div>

        <div className="quantity-controls">
        <button className="quantity-button decrease-btn">-</button>
        <input type="number" value={1} className='quantity-input' readOnly />
        <button className="quantity-button increase-btn"> +</button>
        </div>

        <div className="item-total">
        <span className="item-total-price">200.00/-</span>
        </div>

        <div className="item-actions">
        <button className="update-item-btn">Update</button>
        <button className="remove-item-btn">Remove</button>
        </div>
    </div>
  )
}

export default CartItem