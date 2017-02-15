import {FILTER_SELECT} from '../constants'

export default (selectedArticles = [], action) => {
    const {type, payload} = action

    switch (type) {
        case FILTER_SELECT:
            return payload ? payload : []
    }

    return selectedArticles
}