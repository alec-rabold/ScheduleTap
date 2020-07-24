import React from 'react'
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';

export default class BackButton extends React.Component {
    render() {
        const { onClick } = this.props;
        return (
            <button onClick={onClick} className={"button back-button ml-5"}>
                <FaArrowLeft className={"fa pr-5"}/>
                <span>Back</span>
            </button>
        )
    }
}

BackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};
