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
import QtyRockers from '../../component/shared/QtyRockers/QtyRockers.component';
import Loader from '../../component/shared/Loader/Loader.component';

class ProductPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true,
            isMobile: false,
            isTablet: false,
            addedOptions: []
        }

        this.updateAddedOption = this.updateAddedOption.bind(this);
    }

    componentDidMount() {
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

        this.handleScreenResize();

        window.addEventListener('resize', () => {
            this.handleScreenResize();
        }, false);
    }

    // Update state with added options and count from another component.
    updateAddedOption(data) {
        const { addedOptions } = this.state;

        const i = addedOptions.findIndex(_data => _data.optionLabel === data.optionLabel);

        if (i > -1) {
            addedOptions[i] = data;
            this.setState({
                addedOptions: addedOptions,
            })
        } else {
            addedOptions.push(data);
            this.setState({
                addedOptions: addedOptions,
            })
        }
    }

    handleScreenResize() {
        if (window.innerWidth <= 768) {
            this.setState({
                isMobile: true
            });
        } else {
            this.setState({
                isMobile: false
            });
        }

        if (window.innerWidth > 768 && window.innerWidth < 1320) {
            this.setState({
                isTablet: true
            });
        } else {
            this.setState({
                isTablet: false
            });
        }
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

    renderOption(options, symbol) {
        // Create array from options and get all lowest/highest values
        const optionsArray = Object.values(options);
        const lowestCurrentPrice = Math.min(...optionsArray.map(o => o.price.value));
        const highestCurrentPrice = Math.max(...optionsArray.map(o => o.price.value));
        const lowestOldPrice = Math.min(...optionsArray.map(o => o.old_price.value));
        const highestOldPrice = Math.max(...optionsArray.map(o => o.old_price.value));

        return (
            <div className='options'>
                <div className='current-prices'>
                    <span className='min-max-current'>{symbol + ' ' + lowestCurrentPrice + ' - ' + symbol + ' ' + highestCurrentPrice}</span>
                    <span className='option'>{' / Option'}</span>
                    <span className='line'>{' | '}</span>
                    <span className='min-options'>{'2 Options'}</span>
                    <span className='min-to-order'>{' (Min.Order)'}</span>
                </div>
                <div className='old-prices'>
                    <span className='min-max-old-prices'>{symbol + ' ' + lowestOldPrice + ' - ' + symbol + ' ' + highestOldPrice}</span>
                </div>
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
                <div className='alibaba'>
                    <span className='logistics'>{'Alibaba.com Logistics'}</span>
                    <span>{'Inspection Solutions'}</span>
                </div>
            </div>
        );
    }

    renderDiscountBlock(discount) {
        const { amount, end_date } = discount;

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
                options,
                shipping: { props },
                shipping: {
                    method: {
                        cost: {
                            currency: {
                                symbol
                            }
                        }
                    }
                }
            } = productData;

        const { isMobile, isTablet } = this.state;

        return (
            <div className='product-details'>
                { this.renderTopBanner(props) }
                { this.renderProductName(name, tags) }
                <Reviews reviewData={ reviews }/>
                { this.renderOption( options, symbol ) }
                { this.renderStoreBanner() }
                { this.renderDiscountBlock(discount) }
                <QtyRockers
                    options={ options }
                    minValue={ 0 }
                    maxValue={ 5 }
                    stepIncrement= { 1 }
                    isMobile= { isMobile }
                    isTablet = { isTablet }
                    updateAddedOption = { this.updateAddedOption }
                />
                { this.renderTradeAssuranceBlock() }
            </div>
        );
    }

    render() {
        const { isLoading, isMobile, isTablet, addedOptions } = this.state;

        if (isLoading) {
            return (
                <Loader />
            );
        }

        const { data: {
            product, product: { gallery, shipping }
        }} = this.state;

        return (
            <div className={`product-detail-page ${( !isMobile && !isTablet ) ? "desktop" : ""} ${isTablet ? "tablet" : ""}`}>
                <div className='product-image'>
                    <Image
                        url={ gallery[0].main }
                    />
                </div>
                <div className='product-detail'>
                    { this.renderProductDetails(product) }
                    <OrderBlock
                        shippingData={ shipping }
                        addedOptions= { addedOptions }
                    />
                </div>
            </div>
        );
    }
}

export default ProductPageComponent;