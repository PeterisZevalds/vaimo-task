import React, { Component } from 'react';
import Image from '../Image/Image.component';
import './Button.style.scss';

class Button extends Component {
    render() {
        const { title, css_class, icon } = this.props;

        return (
            <button className={ css_class }><Image url={icon}/>{ title }</button>
        );
    }
}

export default Button;