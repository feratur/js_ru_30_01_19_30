import {ADD_COMMENT, LOAD_COMMENTS, START, SUCCESS} from '../constants'
import {normalizedComments as defaultComments} from '../fixtures'
import {arrayToMap} from '../utils'

//const defaultState = arrayToMap(defaultComments)
const defaultState = {}


export default (state = defaultState, action) => {
    const {type, payload, randomId, response} = action

    switch (type) {
        case LOAD_COMMENTS + START:
            return {...state, [payload.id]: {isLoaded: false}}
        case LOAD_COMMENTS + SUCCESS:
            return {...state, [payload.id]: {isLoaded: true, entities: response}}
        case ADD_COMMENT:
            return state.set(randomId, {...payload.comment, id: randomId})
    }

    return state
}