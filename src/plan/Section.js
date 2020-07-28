import React from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

export default class Section extends React.Component {

    render() {
        const { section, chosen, handleChosenSection, handleRemoveCartItem } = this.props;
        console.log('section:')
        console.log(section)
        return (
            <div className="item">
                <div className={"details"}>
                    <h3 className={"title"}>{section.course_name}</h3>
                    <p className={"subtitle-1"}>{section.course_title}</p>
                </div>
                <div className={"details"}>
                    {section.course_id}
                    <ul>
                        {section.meeting_times.map((meeting, index) => (
                            <React.Fragment key={index}>
                                <li>{meeting.instructors}</li>
                                <li>{meeting.days}  {meeting.time}</li>
                                <li>{meeting.type} / {meeting.schedule_type}</li>
                                <li>{meeting.location}</li>
                                <li>{meeting.date_range}</li>
                            </React.Fragment>
                        ))}
                    </ul>
                    {section.section}
                </div>
                {chosen    
                    ? <FaMinusCircle className="icon icon-selector icon-red" size={20} onClick={(e) => handleRemoveCartItem(e, "SECTION", section)} />
                    : <FaPlusCircle className="icon icon-selector icon-green" size={20} onClick={(e) => handleChosenSection(e, section)} />
                }
            </div>
        )
    }
}

Section.propTypes = {
    section: PropTypes.object.isRequired,
};
