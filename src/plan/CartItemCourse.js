import React from 'react';
import PropTypes from 'prop-types';
import { FaRegSquare, FaRegCheckSquare, FaTrash, FaInfoCircle } from 'react-icons/fa';


export default class CartItemCourse extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            checked: true
        };
		this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        console.log('handling cart item click');
        await this.setState(state => ({
            checked: !state.checked
        }));  
        // TODO: this is getting into reducer territory
        console.log('clicked on course: ' + this.props.course.course_name);
        if(this.state.checked) {
            this.props.handleSelectedCourse(this.props.course, "ADD");
        } else {
            this.props.handleSelectedCourse(this.props.course, "REMOVE");
        }
    }

    render() {
        const { course, handleRemoveCartItem } = this.props;
        const { checked } = this.state;

        return (
            <li key={course.course_name} id={course.course_name.replace(/ /g,"_")} className="selector-row" onClick={this.handleClick}>
                <div className="row-item item cart">
                    {checked
                        ? <FaRegCheckSquare className={"checkbox fa pr-5"} />
                        : <FaRegSquare className={"checkbox fa pr-5"} />
                    }
                    <div className={"details"}>
                        <div className="flex-row">
                            <h3 className={"title"}>{course.course_name}</h3>
                            <p className={"subtitle-2 pl-5 flex-end"}>ANY</p>
                        </div>
                        <p className={"subtitle-1"}>{course.course_title}</p>
                    </div>
                    <FaTrash className={"item-icon fa pr-5 r-20"} size={16} onClick={(e) => handleRemoveCartItem(e, "COURSE",course)} />
                </div>
            </li>
        )
    }
}

CartItemCourse.propTypes = {
    course: PropTypes.object.isRequired,
};
