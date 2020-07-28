import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Section from './Section'
import { shallowItemsArrIncludes } from '../util/util'
  
export default class SectionList extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			filtered: []
		};
	}
	
	componentDidMount() {
        this.setState({
            filtered: this.props.sections
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.sections
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
            currentList = this.props.sections;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(section => {
                // change current item to lowercase
                const lc1 = section.course_name.toLowerCase();
                const lc2 = section.course_title.toLowerCase();
                const lc3 = section.course_id.toLowerCase();
                let searchItems = [lc1, lc2, lc3];
                section.meeting_times.forEach(function(meeting) {
                    searchItems.push(meeting.time.toLowerCase());
                    searchItems.push(meeting.days.toLowerCase());
                    searchItems.push(meeting.location.toLowerCase());
                    searchItems.push(meeting.instructors.toLowerCase());
                })
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
            newList = this.props.sections;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }

    render() {
        const { chosenSections, handleChosenSection, handleRemoveCartItem } = this.props;

        return (
            <React.Fragment>
                <form className={"pl-25"} noValidate autoComplete="off">
                    <TextField className={"search"} id="standard-basic" label="Search" onChange={this.handleSearch}/>
                </form>
                <div className={"scroll-container"}>
                    <ul className={"list scrollable"}>
                        {this.state.filtered.map(section => (
                        <li key={section.course_id} className={"selector-row"} onClick={() => handleChosenSection(section)}>
                            <div className="row-item">
                                <Section section={section} handleChosenSection={handleChosenSection} handleRemoveCartItem={handleRemoveCartItem} chosen={shallowItemsArrIncludes(chosenSections, section)} />
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

SectionList.propTypes = {
    sections: PropTypes.array.isRequired,
    handleChosenSection: PropTypes.func.isRequired,
};
