import React, { Component } from 'react';
import QtyRocker from '../QtyRocker/QtyRocker.component';
import './QtyRockers.style.scss';

class QtyRockers extends Component {
    render() {
        const { options, maxValue, minValue, stepIncrement, isMobile, isTablet, updateAddedOption } = this.props;

        return (
            <div className='qty-rockers-wrapper'>
                { (!isMobile && !isTablet) ? <div className='qty-rocker-title'>{ 'Options:' }</div> : '' }
                <ul>
                    { Object.keys(options).map((key) =>
                        <li key={ key }>
                            <span className='option-name'>{options[key].label}</span>
                            <div className='price-input'>
                                <span className='option-price'>
                                    {options[key].price.currency.symbol}
                                    {' '}
                                    {options[key].price.value.toFixed(2)}
                                </span>
                                <QtyRocker
                                    minValue= { minValue }
                                    maxValue= { maxValue }
                                    stepIncrement = { stepIncrement }
                                    optionData = { options[key] }
                                    updateAddedOption = { updateAddedOption }
                                />
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default QtyRockers;