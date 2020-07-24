import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ScheduleBlocks from './ScheduleBlocks'
import { convertTime24to12 } from '../util/util'

export default class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    render() {
        const { sections } = this.props;
        const { isLoaded } = this.state;

        const defaultStartTime = 1000;
        const defaultEndTime = 1600;

        let startHour= defaultStartTime/100;
        let endHour = defaultEndTime/100;

        const numCols = 6;
        const numRows = (endHour - startHour + 1) * 12;
        console.log('numRows: ' + numRows); 

        // x-axis labels for days
        let dayLabels = [];
        let days = ["Mon", "Tue", "Wed", "Thur", "Fri"];
        days.forEach((day) => {
            dayLabels.push(
            <span>{day}</span>
            )
        })
        // y-axis labels for time
        let timeLabels = [];
        for(let i = startHour; i <= endHour; i++) {
            timeLabels.push(
            <span style={{gridRow: (i - startHour) * 12 + 1}}>                    
                {convertTime24to12(i)}
            </span>
            )
        }
        // grid lines
        let gridLines = [];
        // x-axis
        for(let i = 0; i < numRows - 1; i++) {
            gridLines.push(
                <span className={"grid-line-x" + ((i % 12 == 0) ? " border-top" : "")} style={{
                    gridRow: i + 2, // offset of 2 rows
                    gridColumnEnd: numCols + 1,
                }} />
            )
        }
        // y-axis
        for(let i = 0; i < numCols; i++) {
            gridLines.push(
                <span className={"grid-line-y border-left"} style={{
                    gridColumn: i + 2, // offset of 2 rows
                    gridRowEnd: numRows,
                }} />
            )
        }
        const yStyle = {
            gridTemplateRows: `repeat(${numRows - 5}, 1fr)`,
            gridRowEnd: numRows + 1,
        }

        const gridStyle = {
            gridTemplateRows: `repeat(${numRows - 2}, 1fr)`,
        }

        return (
            <Grid item xs={6}>
                <h2 className={"title pl-15 pt-15"}>Schedule:</h2> 
                <div className="box schedule" style={gridStyle}>
                    <div className="label-x">
                        {dayLabels}
                    </div>
                    <div className="label-y" style={yStyle}>
                        {timeLabels}
                    </div>
                    {gridLines}
                    <ScheduleBlocks startHour={startHour} sections={sections} />
                </div> 
            </Grid>
        )
    }
}

Schedule.propTypes = {
    sections: PropTypes.array.isRequired,
};
