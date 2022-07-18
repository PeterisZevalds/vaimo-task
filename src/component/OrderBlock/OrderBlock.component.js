/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import Button from '../shared/Button/Button.component';
import IconEnvelope from '../../assets/icon-envelope.png';
import InfoIcon from '../../assets/icon-info.png';
import './OrderBlock.style.scss';
import Image from '../shared/Image/Image.component';

class OrderBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowLeadTimeInfo: false,
            isShowShippingTimeInfo: false
        }
    }

    calculateAddedOptionPrice(optionData) {
        var optionTotalPrice = 0;

        if (optionData) {
            // eslint-disable-next-line array-callback-return
            optionData.map(({optionPrice, count}) => {
                optionTotalPrice += (optionPrice * count)
            });
        }

        return optionTotalPrice;
    }

    renderShipTo(shippingMethod, addedOptions) {
        const { country,
                title,
                cost: {
                    value,
                    currency: {
                        symbol
        }}} = shippingMethod;

        const totalPrice = value + this.calculateAddedOptionPrice(addedOptions);

        return (
            <div className='shipping-block'>
                <div className='shipping-information'>
                    <span>{'Ship to '}</span>
                    <span className='shipping-country'>{ country }</span>
                    <span className='shipping-method'>{' by ' + title}</span>
                </div>
                <div className='shipping-price'>
                    <span className='product-price'>{ symbol + ' ' + totalPrice.toFixed(2) }</span>
                </div>
            </div>
        );
    }

    renderLeadTime(lead_time) {
        const { value, info } = lead_time;
        const valueArr = value.split(' ');

        return (
            <div className='lead-time-block'>
                <span>{'Lead Time '}</span>
                <span className='lead-number'>{ valueArr[0] + ' ' }</span>
                <span>{ valueArr[1] }</span>
                <span
                    className='icon'
                    onMouseEnter={() =>{this.setState({isShowLeadTimeInfo: true})}}
                    onMouseLeave={() =>{this.setState({isShowLeadTimeInfo: false})}}
                >
                    <Image
                        url={InfoIcon}
                    />
                </span>
                { this.renderLeadTimeInfo(info) }
            </div>
        );
    }

    renderLeadTimeInfo(info) {
        const { isShowLeadTimeInfo } = this.state;

        if (isShowLeadTimeInfo) {
            return (
                <p className='information-popup'>{ info }</p>
            );
        }
    }

    renderShippingTime(method) {
        const { shipping_time: { value, info }} = method;
        const valueArr = value.split(' ');

        return (
            <div className='shipping-time-block'>
                <span>{'Shipping Time '}</span>
                <span className='shipping-time-number'>{ valueArr[0] + ' ' }</span>
                <span>{ valueArr[1] }</span>
                <span
                    className='icon'
                    onMouseEnter={() =>{this.setState({isShowShippingTimeInfo: true})}}
                    onMouseLeave={() =>{this.setState({isShowShippingTimeInfo: false})}}
                >
                    <Image
                        url={InfoIcon}
                    />
                </span>
                { this.renderShippingTimeInfo(info) }
            </div>
        );
    }

    renderShippingTimeInfo(info) {
        const { isShowShippingTimeInfo } = this.state;

        if (isShowShippingTimeInfo) {
            return (
                <p className='information-popup'>{ info }</p>
            );
        }
    }

    renderAddedOptions(addedOptions) {
        if (addedOptions) {
            return (
                <div className='added-options'>
                    { addedOptions.map(({optionLabel, optionPrice, count, symbol}) => {
                        if (count > 0) {
                            return (
                                <div className='added-option' key={ optionLabel }>
                                    <span className='option-label'>{ optionLabel }</span>
                                    <div>
                                        <span className='option-count'>{ 'x' + count }</span>
                                        <span className='option-price'>{ symbol + ' ' + (optionPrice*count).toFixed(2)}</span>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            );
        }
    }

    render() {
        const { shippingData,
                addedOptions,
                shippingData: {
                    method, lead_time
        }} = this.props;

        if (!shippingData) {
            return;
        }

        return (
            <div className='product-order-block'>
                { this.renderAddedOptions(addedOptions) }
                { this.renderShipTo(method, addedOptions) }
                { this.renderLeadTime(lead_time) }
                { this.renderShippingTime(method) }
                <div className='button-wrapper'>
                    <Button
                        css_class='button filled'
                        title='Login to Purchase'
                    />
                    <Button
                        icon={ IconEnvelope }
                        css_class='button empty'
                        title='Contact the Supplier'
                    />
                </div>
            </div>
        );
    }
}

export default OrderBlock;