import {combineReducers} from 'redux'
import counterReducer from './counter'
import articles from './articles'
import selectReducer from './filterSelect'
import filterByDate from './filterByDate'

export default combineReducers({
    count: counterReducer,
    selectedArticles: selectReducer,
    dateRange: filterByDate,
    articles
})