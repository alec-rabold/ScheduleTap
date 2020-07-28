import React from 'react';
import Grid from '@material-ui/core/Grid';
import SubjectSelector from './SubjectSelector'
import CourseSelector from './CourseSelector'
import SectionSelector from './SectionSelector'
import Cart from './Cart'
import Schedule from './Schedule'
import $ from 'jquery';

export default class Plan extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            currentSubject: null,
            currentCourse: null,
            chosenCourses: [],
            selectedCourses: [],
            chosenSections: [],
            selectedSections: []
        };
        this.resetSelectorFor = this.resetSelectorFor.bind(this);
		this.handleCurrentCourse = this.handleCurrentCourse.bind(this);
		this.handleCurrentSubject = this.handleCurrentSubject.bind(this);
		this.handleChosenCourse = this.handleChosenCourse.bind(this);
		this.handleSelectedCourse = this.handleSelectedCourse.bind(this);
        this.handleChosenSection = this.handleChosenSection.bind(this);
        this.handleSelectedSection = this.handleSelectedSection.bind(this);
        this.handleRemoveCartItem = this.handleRemoveCartItem.bind(this);
    }

    handleRemoveCartItem(event, itemType, item) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        switch(itemType) {
            case "SECTION":
                let section = item;
                this.handleSelectedSection(section, "REMOVE");
                this.state.chosenSections.forEach((sec, index) => {
                    if(sec.course_id == section.course_id) {
                        this.setState(state => ({
                            chosenSections: [...state.chosenSections.slice(0, index), ...state.chosenSections.slice(index + 1)]
                        }));  
                    }
                })
                console.log('chosenSections: ');
                console.log(this.state.chosenSections);
                console.log('selectedSections: ');
                console.log(this.state.selectedSections);
                break;
            case "COURSE":
                let course = item;
                this.handleSelectedCourse(course, "REMOVE");
                this.state.chosenCourses.forEach((crs, index) => {
                    if(crs.course_name == course.course_name) {
                        this.setState(state => ({
                            chosenCourses: [...state.chosenCourses.slice(0, index), ...state.chosenCourses.slice(index + 1)]
                        }));  
                    }
                })
                console.log('chosenCourses: ');
                console.log(this.state.chosenCourses);
                console.log('selectedCourses: ');
                console.log(this.state.selectedCourses);
                break;

        }
    }

    resetSelectorFor(selector) {
        switch(selector) {
            case "subject": 
                this.setState(state => ({
                    currentSubject: null
                }));
                break;
            case "course":  
                this.setState(state => ({
                    currentCourse: null
                }));  
                break;
        }
    }

    handleCurrentSubject(subject) {
        console.log('subject clicked: ' + subject);
        this.setState(state => ({
            currentSubject: subject
        }));  
    }

    handleChosenCourse(event, course) {
        console.log('course chosen: ' + course);
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    
        let alreadySelected = false;
        this.state.chosenCourses.forEach((crs) => {
            if(crs.course_name == course.course_name) {
                alreadySelected = true;
                this.highlightCartItem(course.course_name.replace(/ /g,"_"));
                return;
            }
        })
        if (!alreadySelected) {
            var newList = this.state.chosenCourses.concat(course);
            this.setState(state => ({
                chosenCourses: newList
            }));  
            this.handleSelectedCourse(course, "ADD");
        }
    }

    handleSelectedCourse(course, action) {
        console.log('course, action: ' + action);
        switch(action) {
            case "ADD": 
                var newList = this.state.selectedCourses.concat(course);
                console.log('newList:');
                console.log(newList);
                this.setState(state => ({
                    selectedCourses: newList
                }));
                break;
            case "REMOVE":
                this.state.selectedCourses.forEach((crs, index) => {
                    if(crs.course_name == course.course_name) {
                        console.log('found');
                        this.setState(state => ({
                            selectedCourses: [...state.selectedCourses.slice(0, index), ...state.selectedCourses.slice(index + 1)]
                        }));  
                        return;
                    } else {
                        console.log('not found');
                        console.log('selected: ' + course.course_name);
                        console.log('seached: ' + crs.course_name);
                    }
                });
                break;
        }
    }
    
    handleCurrentCourse(course) {
        console.log('course clicked: ' + course);
        this.setState(state => ({
            currentCourse: course
        }));  
    }

    handleChosenSection(section) {
        console.log('section clicked: ' + section);
        let alreadySelected = false;
        this.state.chosenSections.forEach((sec) => {
            if(sec.course_id == section.course_id) {
                alreadySelected = true;
                this.highlightCartItem(section.course_id);
                return;
            }
        })
        if (!alreadySelected) {
            var newList = this.state.chosenSections.concat(section);
            this.setState(state => ({
                chosenSections: newList
            }));  
            this.handleSelectedSection(section, "ADD");
        }
    }

    handleSelectedSection(section, action) {
        console.log('section, action: ' + action);
        switch(action) {
            case "ADD": 
                var newList = this.state.selectedSections.concat(section);
                console.log('newList:');
                console.log(newList);
                this.setState(state => ({
                    selectedSections: newList
                }));
                break;
            case "REMOVE":
                this.state.selectedSections.forEach((sec, index) => {
                    if(sec.course_id == section.course_id) {
                        console.log('found');
                        this.setState(state => ({
                            selectedSections: [...state.selectedSections.slice(0, index), ...state.selectedSections.slice(index + 1)]
                        }));  
                        return;
                    } else {
                        console.log('not found');
                        console.log('selected: ' + section.course_id);
                        console.log('seached: ' + sec.course_id);
                    }
                });
                break;
        }
    }

    highlightCartItem(id) {
        let $elem = $('#cart').find("li#" + id);
        $elem.addClass('highlighted');
        setTimeout(function () {
            $elem.removeClass('highlighted');
        }, 1200);
    }

    render() {
        const { currentSubject, currentCourse, chosenCourses, selectedCourses, chosenSections, selectedSections } = this.state;
        // Temporary testinng
        // let college = "GeorgiaTech"
        let college = "Montevallo"
        let term = "202080"
        /// Temporary testing
        return (
            <Grid container spacing={4}>
                {currentSubject == null
                    ? <SubjectSelector college={college} term={term} handleCurrentSubject={this.handleCurrentSubject} handleChosenSubject={this.handleChosenSubject} />
                    : currentCourse == null 
                        ? <CourseSelector college={college} term={term} subject={currentSubject} chosenCourses={chosenCourses} handleCurrentCourse={this.handleCurrentCourse} handleChosenCourse={this.handleChosenCourse} handleRemoveCartItem={this.handleRemoveCartItem} resetSelectorFor={this.resetSelectorFor} />
                        : <SectionSelector college={college} term={term} subject={currentSubject} course={currentCourse} chosenSections={chosenSections} handleChosenSection={this.handleChosenSection} handleRemoveCartItem={this.handleRemoveCartItem} resetSelectorFor={this.resetSelectorFor} />
                }
                <Cart sections={chosenSections} courses={chosenCourses} handleRemoveCartItem={this.handleRemoveCartItem} handleSelectedCourse={this.handleSelectedCourse} handleSelectedSection={this.handleSelectedSection} />
                <Schedule sections={selectedSections} />
            </Grid>
        )
    }
}
