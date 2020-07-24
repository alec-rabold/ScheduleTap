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
            chosenSubject: null,
            chosenCourse: null,
            chosenSections: [],
            selectedSections: []
        };
        this.resetSelectorFor = this.resetSelectorFor.bind(this);
		this.handleChosenCourse = this.handleChosenCourse.bind(this);
		this.handleChosenSubject = this.handleChosenSubject.bind(this);
        this.handleChosenSection = this.handleChosenSection.bind(this);
        this.handleRemoveCartItem = this.handleRemoveCartItem.bind(this);
        this.handleSelectedSection = this.handleSelectedSection.bind(this);
    }

    handleRemoveCartItem(event, section) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
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
    }

    resetSelectorFor(selector) {
        switch(selector) {
            case "subject": 
                this.setState(state => ({
                    chosenSubject: null
                }));
                break;
            case "course":  
                this.setState(state => ({
                    chosenCourse: null
                }));  
                break;
        }
    }

    handleChosenSubject(subject) {
        console.log('subject clicked: ' + subject);
        this.setState(state => ({
            chosenSubject: subject
        }));  
    }
    
    handleChosenCourse(course) {
        console.log('course clicked: ' + course);
        this.setState(state => ({
            chosenCourse: course
        }));  
    }

    handleChosenSection(section) {
        console.log('section clicked: ' + section);
        let alreadySelected = false;
        let list = this.state.chosenSections;
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
        const { chosenSubject, chosenCourse, chosenSections, selectedSections } = this.state;
        // Temporary testinng
        // let college = "GeorgiaTech"
        let college = "Montevallo"
        let term = "202080"
        /// Temporary testing
        return (
            <Grid container spacing={4}>
                {chosenSubject == null
                        // <Subject key={chosenSubject.subj_abbr} subject={chosenSubject}/>
                    ? <SubjectSelector college={college} term={term} handleChosenSubject={this.handleChosenSubject} />
                    : chosenCourse == null 
                        ? <CourseSelector college={college} term={term} subject={chosenSubject} handleChosenCourse={this.handleChosenCourse} resetSelectorFor={this.resetSelectorFor} />
                        : <SectionSelector college={college} term={term} subject={chosenSubject} course={chosenCourse} handleChosenSection={this.handleChosenSection} resetSelectorFor={this.resetSelectorFor} />
                }
                <Cart sections={chosenSections} handleRemoveCartItem={this.handleRemoveCartItem} handleSelectedSection={this.handleSelectedSection} />
                <Schedule sections={selectedSections} />
            </Grid>
        )
    }
}
