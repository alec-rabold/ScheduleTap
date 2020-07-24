import React from 'react'
import PropTypes from 'prop-types';
import { RiArrowDropRightLine } from 'react-icons/ri';


export default class Breadcrumbs extends React.Component {
    render() {
        const { onClick, trail } = this.props;
        
        console.log('breadcrumbs:');
        console.log(trail);
        return (
            <div className="breadcrumb">
                {trail.map(item =>
                <React.Fragment>
                    <span className={"grey-text"}>{item}</span>
                    <RiArrowDropRightLine className={"fa icon pr-5"}/>
                </React.Fragment>
                )}
            </div>
        )
    }
}

Breadcrumbs.propTypes = {
    trail: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
};
