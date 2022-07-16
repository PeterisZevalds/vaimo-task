import React, { Component } from 'react';
import OrderBlock from '../../component/OrderBlock/OrderBlock.component';
import Image from '../../component/shared/Image/Image.component';
import IconTime from '../../assets/icon-time.png';
import Logo from '../../assets/logo-expo.png';
import Visa from '../../assets/icon-visa.svg';
import Shield from '../../assets/icon-shield.svg';
import Mastercard from '../../assets/icon-mastercard.svg';
import ApplePay from '../../assets/icon-apple-pay.svg';
import ChevronRight from '../../assets/icon-chevron-right.png';
import Reviews from '../../component/shared/Reviews/Reviews.component';
import './ProductPage.style.scss';

class ProductPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true
        }
    }

    componentWillMount() {
        fetch('https://fe-assignment.vaimo.net/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson,
                    isLoading: false
                })
            })
            .catch((error) => {
              console.error(error);
            });
    }

    renderTopBanner(props) {
        const { fast_dispatch, in_stock, ready_to_ship } = props;

        return (
            <div className='product-banner'>
                <div className='tag ready-to-ship' {...ready_to_ship }>{'Ready to Ship'}</div>
                <div className='tag checkmark orange' {...in_stock }>{'In Stock'}</div>
                <div className='tag checkmark orange' {...fast_dispatch }>{'Fast Dispatch'}</div>
            </div>
        );
    }

    renderProductName(name, tags) {
        return (
            <div className='product-name-wrapper'>
                <div className='product-name'>{ name }</div>
                { tags.map((tag) => <div key={ tag } className='tag gray'>{ tag }</div>) }
            </div>
        );
    }

    renderStoreBanner() {
        return (
            <div className='store-banner'>
                <span className='expo-logo'>
                    <Image
                        url={Logo}
                    />
                </span>
                <span className='free-shipping'>{'Free shipping (up to $40)'}</span>
                <span className='chevron-right'>
                    <Image
                        url={ChevronRight}
                    />
                </span>
            </div>
        );
    }

    renderOption() {
        return (
            <div className='options'>
                weird block
            </div>
        );
    }

    renderTradeAssuranceBlock() {

        return (
            <div className='trade-assurance-wrapper'>
                <div className='trade-assurance'>
                    <span>
                        <Image url={Shield} />
                    </span>
                    <span className='important'>{'Trade Assurance '}</span>
                    <span>{'protects your Alibaba.com orders '}</span>
                </div>
                <div className='payments'>
                    <span>{'Payments:'}</span>
                    <span>
                        <Image url={Visa} />
                    </span>
                    <span>
                        <Image url={Mastercard} />
                    </span>
                    <span>
                        <Image url={ApplePay} />
                    </span>
                </div>
                <div>
                    <span>{'Alibaba.com Logistics'}</span>
                    <span>{'Inspection Solutions'}</span>
                </div>
            </div>
        );
    }

    renderDiscountBlock(discount) {
        const { amount, end_date } = discount;

        // Calculate miliseconds until timer runs out
        const timeNow = Date.now();
        const endTime = new Date(end_date).getTime();
        const endTimer = endTime - timeNow;

        // calculate days/hours/minutes/seconds from endTimer miliseconds
        const days = Math.floor(endTimer/(1000*60*60*24));
        const hours = Math.floor(endTimer/(1000*60*60))%24;
        const minutes = Math.floor(endTimer/(1000*60))%60;
        const seconds = Math.floor(endTimer/1000)%60;

        if (discount) {
            return (
                <div className='discount-wrapper'>
                    <span className='discount'>{ amount + ' OFF '}</span>
                    <span className='discount-ends'>{'Discount ends in'}</span>
                    <span className='icon'>
                        <Image
                            url={ IconTime }
                        />
                    </span>
                    <span className='discount-end-timer'>{ days + 'd:' + hours + 'h:' + minutes + 'm:' + seconds + 's' }</span>
                </div>
            );
        }
    }

    renderProductDetails(productData) {
        const { name,
                tags,
                reviews,
                discount,
                shipping: { props }
            } = productData;

        return (
            <div className='product-details'>
                { this.renderTopBanner(props) }
                { this.renderProductName(name, tags) }
                <Reviews reviewData={ reviews }/>
                { this.renderOption() }
                { this.renderStoreBanner() }
                { this.renderDiscountBlock(discount) }
                <p>options with qty rockers</p>
                { this.renderTradeAssuranceBlock() }
            </div>
        );
    }

    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return (
                <h1>PRODUCT IS LOADING</h1>
            )
        }

        const { data: {
            product, product: { gallery, shipping }
        }} = this.state;
        console.log('test', this.state.data);

        return (
            <div className='product-detail-page'>
                <div className='product-image'>
                    <Image
                        url={ gallery[0].main }
                    />
                </div>
                { this.renderProductDetails(product) }
                <OrderBlock
                    shippingData={ shipping }
                />
            </div>
        );
    }
}

export default ProductPageComponent;