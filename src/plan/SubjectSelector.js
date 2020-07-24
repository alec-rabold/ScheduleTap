import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import SubjectList from './SubjectList'
import LoadingIcon from '../shared/LoadingIcon';
  
export default class SubjectSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            subjects: [],
        };
    }

    async fetchSubjects() {
        var params = '?' +
            `college=${this.props.college}&` +
            `term=${this.props.term}`
        console.log('params: ' + params)
        let data = await fetch("https://api.collegeplanner.io/v1/subjects" + params)
        .then(res => res.json())
        .then(
            (result) => {
                return {
                    isLoaded: true,
                    subjects: result,
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
        let storageItem = "local_state_subjects";
        var state = sessionStorage.getItem(storageItem)
            ? JSON.parse(sessionStorage.getItem(storageItem)) 
            : await this.fetchSubjects();
        this.setState(state);
    }

    componentWillUnmount() {
        // Remember state for the next mount
        if(!this.state.error) {
            let storageItem = "local_state_subjects";
            sessionStorage.setItem(storageItem, JSON.stringify(this.state));
        }
    }

    render() {
        const { handleChosenSubject } = this.props;
        const { subjects, isLoaded } = this.state;
        
        return (
            <Grid item xs={3}>
                <h2 className={"title pl-15 pt-15"}>Subjects:</h2> 
                <div className="box">
                    {isLoaded 
                        ? <SubjectList subjects={subjects} handleChosenSubject={handleChosenSubject} />
                        : <LoadingIcon />
                    }
                </div>
            </Grid>
                
        )
    }
}

SubjectSelector.propTypes = {
    college: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    handleChosenSubject: PropTypes.func.isRequired,
};
