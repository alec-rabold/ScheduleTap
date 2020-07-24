import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import SectionList from './SectionList'
import LoadingIcon from '../shared/LoadingIcon';
import BackButton from '../shared/BackButton'
import Breadcrumbs from '../shared/Breadcrumbs'
  
export default class SectionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            sections: [],
        };
    }

    async fetchSections() {
         // TODO: clean up params
         var params = '?' +
         `college=${this.props.college}&` +
         `term=${this.props.term}&` +
         `subject=${this.props.subject.subj_abbr}&` +
         `number=${this.props.course.course_number}`
        console.log(params)
        let data = await fetch("https://api.collegeplanner.io/v1/sections" + params)
        .then(res => res.json())
        .then(
            (result) => {
                return {
                    isLoaded: true,
                    sections: result
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
        let course = `${this.props.subject.subj_abbr}${this.props.course.course_number}`;
        let storageItem = "local_state_sections_" + course;
        var state = sessionStorage.getItem(storageItem)
            ? JSON.parse(sessionStorage.getItem(storageItem)) 
            : await this.fetchSections();
        this.setState(state);
    }

    componentWillUnmount() {
        // Remember state for the next mount
        if(!this.state.error) {
            let course = `${this.props.subject.subj_abbr}${this.props.course.course_number}`;
            let storageItem = "local_state_sections_" + course;
            sessionStorage.setItem(storageItem, JSON.stringify(this.state));
        }
    }


    render() {
        const { course, handleChosenSection, resetSelectorFor } = this.props;
        const { sections, isLoaded } = this.state;

        let trail = course.course_name.split(' ');
        return (
            <Grid item xs={3}>
                <h2 className={"title pl-15 pt-15"}>Sections:</h2> 
                <div className="box">
                    <BackButton onClick={() => resetSelectorFor("course")} />
                    <Breadcrumbs trail={trail} />
                    {isLoaded 
                        ? <SectionList sections={sections} handleChosenSection={handleChosenSection} />
                        : <LoadingIcon />
                    }
                </div>          
            </Grid>
        )
    }
}

SectionSelector.propTypes = {
    college: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    subject: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
};
