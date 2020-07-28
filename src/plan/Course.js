import React from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

export default class Course extends React.Component {

    render() {
        const { chosen, course, handleChosenCourse, handleRemoveCartItem } = this.props;
        return (
            <div className="item">
                <div className="details">
                    <h3 className={"title"}>{course.course_name}</h3>
                    <p className={"subtitle-1"}>{course.course_title}</p>
                </div>
                {chosen    
                    ? <FaMinusCircle className="icon icon-selector icon-red" size={20} onClick={(e) => handleRemoveCartItem(e, "COURSE", course)} />
                    : <FaPlusCircle className="icon icon-selector icon-green" size={20} onClick={(e) => handleChosenCourse(e, course)} />
                }
            </div>

        )
    }
}

Course.propTypes = {
    course: PropTypes.object.isRequired,
};
