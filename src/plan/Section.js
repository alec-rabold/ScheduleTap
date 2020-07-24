import React from 'react';
import PropTypes from 'prop-types';

export default class Section extends React.Component {

    render() {
        const { section } = this.props;
        console.log('section:')
        console.log(section)
        return (
            <div className="">
                <h3 className={"title"}>{section.course_name}</h3>
                <p className={"subtitle-1"}>{section.course_title}</p>
                <span className={"details"}>
                    {section.course_id}
                    <ul>
                        {section.meeting_times.map(meeting => (
                            <React.Fragment>
                            <li>{meeting.instructors}</li>
                            <li>{meeting.days}  {meeting.time}</li>
                            <li>{meeting.type} / {meeting.schedule_type}</li>
                            <li>{meeting.location}</li>
                            <li>{meeting.date_range}</li>
                            </React.Fragment>
                        ))}
                    </ul>
                    {section.section}
                </span>
            </div>
        )
    }
}

Section.propTypes = {
    section: PropTypes.object.isRequired,
};
