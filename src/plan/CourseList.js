import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Course from './Course'
import { shallowItemsArrIncludes } from '../util/util'
  
export default class CourseList extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			filtered: []
		};
    }
    
    componentDidMount() {
        this.setState({
            filtered: this.props.courses
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.courses
        });
    }

    handleSearch = (event) => {
        console.log('handling search')
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (event.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.props.courses;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(course => {
                // search items to lowercase
                const lc1 = course.course_name.toLowerCase();
                const lc2 = course.course_title.toLowerCase();
                let searchItems = [lc1, lc2];
                // change search term to lowercase
                const filter = event.target.value.toLowerCase();
                
                let matchFound = false;
                searchItems.forEach(function(searchItem) {
                    if(searchItem.includes(filter)) {
                        matchFound = true;
                    }
                });

                return matchFound
            });
            // return currentList;
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.props.courses;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }

    render() {
        const { chosenCourses, handleCurrentCourse, handleChosenCourse, handleRemoveCartItem } = this.props;

        return (
            <React.Fragment>
                <form className={"pl-25"} noValidate autoComplete="off">
                    <TextField className={"search"} id="standard-basic" label="Search" onChange={this.handleSearch}/>
                </form>
                <div className={"scroll-container"}>
                    <ul className={"list scrollable"}>
                        {this.state.filtered
                            .sort((a,b) => a.course_name.localeCompare(b.course_name))
                            .map(course => (
                        <li key={course.course_id}  className={"selector-row"} onClick={() => handleCurrentCourse(course)}>
                            <div className="row-item">
                                <Course course={course} handleChosenCourse={handleChosenCourse} handleRemoveCartItem={handleRemoveCartItem} chosen={shallowItemsArrIncludes(chosenCourses, course)} />
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
    handleCurrentCourse: PropTypes.func.isRequired,
};
