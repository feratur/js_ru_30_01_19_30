import {FILTER_BY_DATE} from '../constants'

export default (dateRange = null, action) => {
    const {type, payload} = action

    switch (type) {
        case FILTER_BY_DATE:
            return payload
    }

    return dateRange
}