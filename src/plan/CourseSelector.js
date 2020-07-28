import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CourseList from './CourseList'
import Subject from './Subject'
import BackButton from '../shared/BackButton'
import LoadingIcon from '../shared/LoadingIcon'
import Breadcrumbs from '../shared/Breadcrumbs'

export default class CourseSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            courses: []
        };
        this.state = sessionStorage.getItem("local_state_courses") 
            ? JSON.parse(sessionStorage.getItem("local_state_courses")) 
            : this.fetchCourses();
    }

    async fetchCourses() {
        var params = '?' +
        `college=${this.props.college}&` +
        `term=${this.props.term}&` +
        `subject=${this.props.subject.subj_abbr}`
        console.log(params)
        let data = await fetch("https://api.collegeplanner.io/v1/courses" + params)
        .then(res => res.json())
        .then(
            (result) => {
                return {
                    isLoaded: true,
                    courses: result
                }
            },
            (error) => {
                return {
                    isLoaded: true,
                    error
                }
            }
        )
        return data;
    }

    async componentDidMount() {
        let course = `${this.props.subject.subj_abbr}`;
        let storageItem = "local_state_courses_" + course;
        var state = sessionStorage.getItem(storageItem) 
            ? JSON.parse(sessionStorage.getItem(storageItem)) 
            : await this.fetchCourses();
        console.log('courses state:');
        console.log(state);
        this.setState(state);
    }

    componentWillUnmount() {
        // Remember state for the next mount
        if(!this.state.error) {
            let course = `${this.props.subject.subj_abbr}`;
            let storageItem = "local_state_courses_" + course;
            sessionStorage.setItem(storageItem, JSON.stringify(this.state));
        }
      }

    render() {
        const { subject, chosenCourses, handleCurrentCourse, handleChosenCourse, handleRemoveCartItem, resetSelectorFor } = this.props;
        const { courses, isLoaded } = this.state;

        return (
            <Grid item xs={3}>
                <h2 className={"title pl-15 pt-15"}>Courses:</h2> 
                <div className="box">
                    <BackButton onClick={() => resetSelectorFor("subject")} />
                    <Breadcrumbs trail={[subject.subj_abbr]} />
                    {isLoaded
                        ? <CourseList courses={courses} chosenCourses={chosenCourses} handleCurrentCourse={handleCurrentCourse} handleChosenCourse={handleChosenCourse} handleRemoveCartItem={handleRemoveCartItem} />
                        : <LoadingIcon />
                    }
                </div>    
            </Grid>
        )
    }
}

CourseSelector.propTypes = {
    college: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    subject: PropTypes.object.isRequired,
};
