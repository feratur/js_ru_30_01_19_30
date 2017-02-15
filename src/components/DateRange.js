import React, { Component } from 'react'
import {connect} from 'react-redux'
import DayPicker, { DateUtils } from 'react-day-picker'
import {filterByDate} from '../AC'

import 'react-day-picker/lib/style.css';

class DateRange extends Component {

    handleDayClick = (e, day) => {
        const fromTo = {
            from: this.props.from,
            to: this.props.to
        }
        const dateRange = DateUtils.addDayToRange(day, fromTo)
        this.props.filterByDate(dateRange)
    }

    render() {
        const { from, to } = this.props;
        const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`

        return (
            <div className="date-range">
                <DayPicker
                    selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        );
    }

}

export default connect(state => ({
    from: (state.dateRange ? state.dateRange.from : null),
    to: (state.dateRange ? state.dateRange.to : null)
}), {filterByDate})(DateRange)