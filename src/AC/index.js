import {INCREMENT, DELETE_ARTICLE, CHANGE_DATE_RANGE, CHANGE_SELECTION, LOAD_ALL_ARTICLES, START, SUCCESS, FAIL, ADD_COMMENT, ADD_COMMENT_TO_ARTICLE} from '../constants'
import $ from 'jquery'


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

export function changeDateRange(dateRange) {
    return {
        type: CHANGE_DATE_RANGE,
        payload: { dateRange }
    }
}

export function changeSelection(selected) {
    return {
        type: CHANGE_SELECTION,
        payload: { selected }
    }
}

export function loadAllArticles() {
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

export function addComment(article, comment) {
    return (dispatch) => {
        dispatch({
            type: ADD_COMMENT,
            payload: comment
        })

        dispatch({
            type: ADD_COMMENT_TO_ARTICLE,
            payload: {
                articleId: article.id,
                commentId: comment.id
            }
        })
    }
}

export function loadAllArticlesThunk() {
    return (dispatch) => {
        dispatch({
            type: LOAD_ALL_ARTICLES + START
        })

        setTimeout(() => {
            $.get('/api/article')
                .done(response => dispatch({
                    type: LOAD_ALL_ARTICLES + SUCCESS,
                    response
                }))
                .fail(error => dispatch({
                    type: LOAD_ALL_ARTICLES + FAIL,
                    error
                }))
        }, 1000)
    }
}