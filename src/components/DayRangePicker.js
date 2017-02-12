import React, { Component } from 'react';
import DayPicker from "react-day-picker";
import 'react-day-picker/lib/style.css';

class DayRangePicker extends Component {
    state = {
        selectedDay: new Date()
    }

    //handleDayClick = day => ev => {
    //    this.setState({ selectedDay: day });
    //}

    handleDayClick = (e, day, { selected, disabled }) => {
        if (disabled) {
            return;
        }
        if (selected) {
            this.setState({ selectedDay: null })
        } else {
            this.setState({ selectedDay: day });
        }
    }

    render() {
        return (
            <div>
                <DayPicker onDayClick={ this.handleDayClick } />
                <p>
                    The selected day is { this.state.selectedDay.toLocaleDateString() }
                </p>
            </div>
        )
    }
}

export default DayRangePicker