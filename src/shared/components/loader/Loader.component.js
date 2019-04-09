import React, { Component } from 'react';
import  { connect } from 'react-redux';
import './Loader.component.scss';

class Loader extends Component {
    getLoader = ()=>{
        if(this.props.loader && this.props.loader.isLoading) {
            return(
                <div className='loader-container open'>
                    <span className='message-container'>
                        {this.props.loader.message || 'Please wait...'}
                    </span>
                </div>
            )
        };
        return null;
    }
    componentWillReceiveProps(nextProps) {
        // this.setState({ denom: nextProps.denom })
        console.log('nextProps: ', nextProps);
   }
    componentWillUpdate(nextProps, nextState) {
    }
    render() {
        return(
            <div id="lazy-loading">
                { this.getLoader() }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loader: state.LoaderReducer
    }
};
export default connect(mapStateToProps)(Loader);
