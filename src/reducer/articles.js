import {DELETE_ARTICLE, LOAD_ALL_ARTICLES, FAIL, SUCCESS, START, ADD_COMMENT_TO_ARTICLE} from '../constants'
import {arrayToMap} from '../utils'

const defaultState = {
    isLoading: false,
    entities: arrayToMap([])
}


export default (state = defaultState, action) => {
    const {type, payload} = action

    switch (type) {
        case DELETE_ARTICLE:
            //todo fix me
            return state.filter(article => article.id !== payload.id)

        case LOAD_ALL_ARTICLES + START:
            return {...state, isLoading: true}

        case LOAD_ALL_ARTICLES + SUCCESS:
            return {
                ...state,
                entities: arrayToMap(action.response),
                isLoading: false
            }

        case ADD_COMMENT_TO_ARTICLE:
            const {articleId, commentId} = payload
            const {entities} = state
            const targetEntity = entities[articleId]
            const newEntity = {...targetEntity, comments: targetEntity.comments.concat([commentId])}
            const newEntities = {...entities, [articleId]: newEntity}

            return {...state, entities: newEntities}
    }

    return state
}