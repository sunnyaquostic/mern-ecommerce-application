import React, { useState } from 'react'
import '../componentStyles/Rating.css'

function Rating({
    value,
    onRatingChange, 
    disabled
}) {
    const [hoveredRating, setHoveredRating] = useState(0)
    const [selectedRating, setSelectedRating] = useState(value || 0)

    const handleMouseEnter = (rating) => {
        if (!disabled) {
            setHoveredRating(rating)
        }
    }

    const handleMouseLeave = () => {
        if (!disabled) {
            setHoveredRating(0)
        }
    }

    const handleClick = (rating) => {
        if (!disabled) {
            setSelectedRating(rating)
            if (onRatingChange) {
                onRatingChange(rating)
            }
        }
    }

    const generateStars = () => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= (hoveredRating || selectedRating)
            stars.push(
                <span 
                    className={`star ${isFilled  ? 'filled' : 'empty'}`} 
                    key={i}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={()=> handleMouseLeave}
                    onClick={() => handleClick(i)}
                    style={{pointerEvents:disabled? 'none' : 'auto'}}
                >
                    &#9733;
                </span>
            )
        }

        return stars
    }

  return (
        <div>
            <div className="rating">{generateStars()}</div>
        </div>
    )
}

export default Rating