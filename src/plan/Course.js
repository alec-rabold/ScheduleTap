import React from 'react';
import PropTypes from 'prop-types';

export default class Course extends React.Component {

    render() {
        const { classes, course } = this.props;
        return (
            <div className="">
                <h3 className={"title"}>{course.course_name}</h3>
                <p className={"subtitle-1"}>{course.course_title}</p>
            </div>
        )
    }
}

Course.propTypes = {
    course: PropTypes.object.isRequired,
};
