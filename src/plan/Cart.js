import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CartItemCourse from './CartItemCourse'
import CartItemSection from './CartItemSection'
import { FaQuestionCircle } from 'react-icons/fa';
import { Tooltip } from '@material-ui/core';
  
export default class Cart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sections, courses, handleRemoveCartItem, handleSelectedSection, handleSelectedCourse } = this.props;
        return (
            <Grid item xs={3} id="cart">
                <h2 className={"title pl-15 pt-15"}>Cart:</h2> 
                <div className="box">
                    <div className="scroll-container">
                        <ul className="list scrollable">
                            {(courses && (courses.length > 0)) &&
                                <div className="flex-row">
                                    <h3 className="cart-label">Courses</h3>
                                    <Tooltip title='Click "generate schedules" to automatically create a schedule from your selected Courses and Sections.' placement="right">
                                        <button className="icon-tooltip">
                                            <FaQuestionCircle />
                                        </button>
                                    </Tooltip>   
                                </div>
                            }
                            {courses.map(course => (
                                <CartItemCourse key={course.course_name} course={course} handleRemoveCartItem={handleRemoveCartItem} handleSelectedCourse={handleSelectedCourse} />
                            ))}
                            {(sections && (sections.length > 0)) &&
                                <div className="flex-row">
                                    <h3 className="cart-label">Sections</h3>
                                    <Tooltip title='Manually add and remove course sections to your schedule, or click "generate schedules" to automatically create a schedule with your chosen Courses and Sections' placement="right">
                                        <button className="icon-tooltip">
                                            <FaQuestionCircle />
                                        </button>
                                    </Tooltip>   
                                </div>
                            }
                            {sections.map(section => (
                                <CartItemSection key={section.course_id} section={section} handleRemoveCartItem={handleRemoveCartItem} handleSelectedSection={handleSelectedSection} />
                            ))}
                        </ul>
                    </div>
                </div>
            </Grid>
                
        )
    }
}

Cart.propTypes = {
    sections: PropTypes.array.isRequired,
};


