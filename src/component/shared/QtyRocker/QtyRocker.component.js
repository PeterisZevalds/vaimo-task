import React, { Component } from 'react';
import './QtyRocker.style.scss';

class QtyRocker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionCount: 0,
            decrementActive: false,
            incrementActive: true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { optionCount } = this.state;
        const { minValue, maxValue, updateAddedOption, optionData } = this.props;

        if (prevState.optionCount !== optionCount) {
            if (optionCount <= minValue) {
                this.setState({
                    decrementActive: false,
                    optionCount: minValue
                })
            } else {
                this.setState({
                    decrementActive: true
                })
            }

            if (optionCount >= maxValue) {
                this.setState({
                    incrementActive: false,
                    optionCount: maxValue
                })
            } else {
                this.setState({
                    incrementActive: true
                })
            }

            const optionPriceData = {
                'optionLabel': optionData.label,
                'optionPrice': optionData.price.value,
                'count': this.state.optionCount
            }

            updateAddedOption(optionPriceData);
        }
    }

    incrementOption() {
        const { stepIncrement, maxValue } = this.props;
        const { optionCount } = this.state;

        if (optionCount < maxValue) {
            this.setState({
                optionCount: this.state.optionCount + stepIncrement,
            })
        }
    }

    decrementOption() {
        const { stepIncrement, minValue } = this.props;
        const { optionCount } = this.state;

        if (optionCount > minValue) {
            this.setState({
                optionCount: this.state.optionCount - stepIncrement,
            })
        }
    }

    handleInputChange= event => {
        const { minValue, maxValue } = this.props;
        if (event.target.value) {
            const value = event.target.value;

            if (value >= minValue) {
                this.setState({
                    optionCount: value
                })
            }

            if (value >= maxValue) {
                this.setState({
                    optionCount: maxValue
                })
            }
        } else {
            this.setState({
                optionCount: minValue
            })
        }
    }

    render() {
        const { minValue, maxValue } = this.props;
        const { optionCount, decrementActive, incrementActive } = this.state;

        return (
            <div className='qty-rocker'>
                <button className='rocker-button decrement' disabled={ !decrementActive } onClick={() => this.decrementOption()}>{'-'}</button>
                <input className='input' type="number" id="quantity" name="quantity" min={ minValue } max={ maxValue } value={ optionCount } onChange= { this.handleInputChange }></input>
                <button className='rocker-button increment' disabled={ !incrementActive } onClick={() => this.incrementOption()}>{'+'}</button>
            </div>
        );
    }
}

export default QtyRocker;