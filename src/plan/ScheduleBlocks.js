import React from 'react';
import PropTypes from 'prop-types';
import ScheduleBlock from './ScheduleBlock'
import { getColor } from '../util/util';

export default class ScheduleBlocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    render() {
        const { sections, startHour } = this.props;
        const { isLoaded } = this.state;

        console.log('startHour: ' + startHour);

        // sections[]:
        // ==================
        // for each section
        //  --> for each meeting_time
        //  ----> for each day
        //  ------> create a <ScheduleBlock />
        let scheduleBlocks = [];
        sections.forEach((section, sectionNum) => {
            section.meeting_times.forEach(meeting => {
                let days = meeting.days.split('');
                days.forEach((day, index) => {
                    scheduleBlocks.push(
                        <ScheduleBlock 
                            key={section.course_id + day + index}
                            day={day} 
                            timeblock={meeting.time} 
                            section={section} 
                            offsets={{
                                startHour: startHour,
                            }}
                            color={getColor(sectionNum)}
                        />
                    )
                })
            })
        });

        return (
            <React.Fragment>
                {scheduleBlocks}
            </React.Fragment>
        )
    }
}

ScheduleBlocks.propTypes = {
    sections: PropTypes.array.isRequired,
    startHour: PropTypes.number.isRequired,
};
