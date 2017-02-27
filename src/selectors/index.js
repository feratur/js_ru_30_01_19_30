import {createSelector} from 'reselect'
import {mapToArr} from '../utils'

const articlesGetter = state => state.articles.entities
const filtersGetter = state => state.filters
const idGetter = (state, props) => props.id
const commentGetter = state => state.comments
const articleIdGetter = (state, props) => props.article.id

export const filteredArticlesSelector = createSelector(articlesGetter, filtersGetter, (entities, filters) => {
    console.log('---', 1)
    const articles = mapToArr(entities)
    const {selected} = filters
    const { from, to } = filters.dateRange

    return articles.filter(article => {
        const published = Date.parse(article.date)
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
})

export const articleSelectorFactory = () => createSelector(articlesGetter, idGetter, (entities, id) => {
    console.log('---', 'article selector', id)
    return entities.get(id)
})

export const commentSelectorFactory = () => createSelector(commentGetter, articleIdGetter, (comments, id) => {
    return comments.get(id)
})