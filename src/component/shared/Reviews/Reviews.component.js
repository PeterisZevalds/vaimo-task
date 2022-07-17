import React, { Component } from 'react';
import './Reviews.style.scss';

class Reviews extends Component {

    renderStarRating() {
        return (
            <div className='Stars' aria-label="Rating of this product is 2.3 out of 5."/>
        );
    }

    renderRating(rating) {
        return (
            <span className='rating'>{ rating }</span>
        );
    }

    renderReviewCount(reviewCount) {
        return (
            <span className='review-count'>{ reviewCount + ' Reviews' }</span>
        );
    }

    renderTotalBuyers(totalBuyers) {
        return (
            <span className='total-buyers'>{ totalBuyers + ' buyers' }</span>
        );
    }

    render() {
        const { reviewData: { rating, count, total_buyers }} = this.props;

        const root = document.documentElement;
        root?.style.setProperty(
            "--rating", rating
        );

        return (
            <div className='product-rating'>
                { this.renderStarRating() }
                { this.renderRating(rating) }
                { this.renderReviewCount(count) }
                { this.renderTotalBuyers(total_buyers) }
            </div>
        );
    }
}

export default Reviews;