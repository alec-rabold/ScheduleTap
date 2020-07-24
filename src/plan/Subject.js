import React from 'react'
import PropTypes from 'prop-types';

export default class Subject extends React.Component {

    render() {
        const { classes, subject } = this.props;
        return (
            <div className="">
                <h3 className={"title"}>{subject.subj_abbr}</h3>
                <p className={"subtitle-1"}>{subject.subj_name}</p>
            </div>
        )
    }
}

Subject.propTypes = {
    subject: PropTypes.object.isRequired,
};
