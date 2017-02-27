import {ADD_COMMENT, LOAD_COMMENTS, START, SUCCESS} from '../constants'
import {arrayToMap} from '../utils'
import {Map, Record} from 'immutable'

//давай комменты хранить в такой же структуре, как и статьи. Иначе быстро запутаешься
//я советую тут хранить просто список всех комментов, а не разбивать их по статьям
const defaultState = new Map({})
const CommentModel = Record({
    isLoading: false,
    comments: null
})

export default (state = defaultState, action) => {
    const {type, payload, randomId, response} = action

    switch (type) {
        case LOAD_COMMENTS + START:
            return state.set(payload.id, new CommentModel({isLoading: true}))
        case LOAD_COMMENTS + SUCCESS:
            return state
                .setIn([payload.id, 'comments'], arrayToMap(response))
                .setIn([payload.id, 'isLoading'], false)
        case ADD_COMMENT:
            return state.setIn([payload.articleId, 'comments', randomId], {...payload.comment, id: randomId})
    }

    return state
}
