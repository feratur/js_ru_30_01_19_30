import {mapToArr} from '../utils'
import {ADD_COMMENT} from '../constants'

export default store => next => action => {
    switch (action.type){
	//через мидлвары будут проходить все экшины, суть в том, что делать их нужно максимально реюзабильными. Не завязывайся на один экшин
        case ADD_COMMENT:
            const maxId = mapToArr(store.getState().comments)
                .map(x => x.id)
                //можно заменить на Math.max, но еще лучше просто рендомный генерить, а то гарантии уникальности слабые
                .reduce((prev, current) => prev < current ? current : prev, 0)

            action.payload.id = maxId + 1
            break
    }

    next(action)
}
