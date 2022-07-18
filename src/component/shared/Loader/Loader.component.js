import React, { Component } from 'react';
import './Loader.style.scss';

class Loader extends Component {
    render() {
        return (
            <div className='loader-wrapper'>
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }
}

export default Loader;