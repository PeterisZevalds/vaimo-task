import React, { Component } from 'react';
import './Image.style.scss';

class Image extends Component {
    render() {
        const { url } = this.props;

        if (!url) {
            return;
        }

        return (
            <img className='image' src={ url } alt='' />
        );
    }
}

export default Image;