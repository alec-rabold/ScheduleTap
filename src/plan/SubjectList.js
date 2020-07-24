import React from 'react';
import PropTypes from 'prop-types';
import Subject from './Subject'
import TextField from '@material-ui/core/TextField';
  
export default class SubjectList extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            filtered: [],
        };
        this.listRef = React.createRef();
	}
	
	componentDidMount() {
        this.setState({
            filtered: this.props.subjects
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.subjects
        });
    }

    componentWillUnmount() {
        // Capture the scroll position
        let scrollPositionItem = "scroll_position_subject_list"
        sessionStorage.setItem(scrollPositionItem, this.listRef.current.scrollTop);
    }

    componentDidUpdate() {
        // Restore scroll position
        let scrollPositionItem = "scroll_position_subject_list"
        let scrollPosition = sessionStorage.getItem(scrollPositionItem)
        if (scrollPosition !== null) {
            this.listRef.current.scrollTop = scrollPosition;
        }
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
            currentList = this.props.subjects;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            // newList = currentList.filter(subject => {
            newList = currentList.filter(subject => {
                // change current item to lowercase
                const lc1 = subject.subj_abbr.toLowerCase();
                const lc2 = subject.subj_name.toLowerCase();
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
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.props.subjects;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }

    render() {
        const { handleChosenSubject } = this.props;

        return (
            <React.Fragment>
                <form className={"pl-25"} noValidate autoComplete="off">
                    <TextField className={"search"} id="standard-basic" label="Search" onChange={this.handleSearch}/>
                </form>
                <div className={"scroll-container"}>
                    <ul ref={this.listRef} className={"list scrollable"}>
                        {this.state.filtered.map(subject => (
                        <li key={subject.subj_abbr} className={"selector-row"} onClick={() => handleChosenSubject(subject)}>
                            <div className="row-item">
                                <Subject subject={subject}/>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

SubjectList.propTypes = {
    subjects: PropTypes.array.isRequired,
    handleChosenSubject: PropTypes.func.isRequired,
};
