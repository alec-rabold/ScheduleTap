import React from 'react';
import PropTypes from 'prop-types';
import { parseStartEndFromTimeblock } from '../util/util'

export default class ScheduleBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    render() {
        const days = ["M", "T", "W", "R", "F", "S", "U"];
        const { day, section, timeblock, offsets, color } = this.props;
        const { isLoaded } = this.state;

        // {start: 1000, end: 1150}
        let time = parseStartEndFromTimeblock(timeblock);

        let startHour = parseInt(time.start);
        let endHour = parseInt(time.end);

        let rowStart = Math.round((((startHour - (offsets.startHour * 100))/100) * 12) + 2);
        let rowEnd = Math.round((((endHour - (offsets.startHour * 100))/100) * 12) + 2 + 4);
        const gridBlock = {
            gridRowStart: rowStart,
            gridRowEnd: rowEnd,
            gridColumn: days.indexOf(day) + 2,
        }

        return (
            <div key={section.course_id + day + timeblock} style={gridBlock} className={"block " + color}>
                <div className={"inner-block"}>
                    <span>{section.course_name}</span>
                </div>
            </div>
        )
    }
}

ScheduleBlock.propTypes = {
    day: PropTypes.string.isRequired,
    section: PropTypes.object.isRequired,
    offsets: PropTypes.shape({
        startHour: PropTypes.number.isRequired,
    }),
    timeblock: PropTypes.string.isRequired
};
