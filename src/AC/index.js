import {INCREMENT, DELETE_ARTICLE, FILTER_SELECT, FILTER_BY_DATE} from '../constants'

export function increment() {
    const action = {
        type: INCREMENT
    }

    return action
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function filterSelected(selected) {
    return {
        type: FILTER_SELECT,
        payload: selected
    }
}

export function filterByDate(dateRange) {
    return {
        type: FILTER_BY_DATE,
        payload: dateRange
    }
}