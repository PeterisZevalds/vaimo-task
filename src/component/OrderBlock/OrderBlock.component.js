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

    renderShipTo(shippingMethod) {
        const { country,
                title,
                cost: {
                    value,
                    currency: {
                        symbol
        }}} = shippingMethod;

        return (
            <div className='shipping-block'>
                <div className='shipping-information'>
                    <span>{'Ship to '}</span>
                    <span className='shipping-country'>{ country }</span>
                    <span className='shipping-method'>{' by ' + title}</span>
                </div>
                <div className='shipping-price'>
                    <span className='product-price'>{ symbol + ' ' + value.toFixed(2) }</span>
                </div>
            </div>
        );
    }

    renderLeadTime(lead_time) {
        const { value, info } = lead_time;

        return (
            <div className='lead-time-block'>
                <span>{'Lead Time ' + value}</span>
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

        return (
            <div className='shipping-time-block'>
                <span>{'Shipping Time ' + value}</span>
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

    render() {
        const { shippingData, shippingData: {
            method, lead_time
        }} = this.props;

        if (!shippingData) {
            return;
        }

        return (
            <div className='product-order-block'>
                { this.renderShipTo(method) }
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