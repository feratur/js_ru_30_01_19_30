import {mapToArr} from '../utils'
import {ADD_COMMENT} from '../constants'

export default store => next => action => {
    switch (action.type){
        case ADD_COMMENT:
            const maxId = mapToArr(store.getState().comments)
                .map(x => x.id)
                .reduce((prev, current) => prev < current ? current : prev, 0)

            action.payload.id = maxId + 1
            break
    }

    next(action)
}