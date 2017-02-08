import React from 'react'
import Article from './Article'
import accordion from '../decorators/accordion'

function ArticleList(props) {
    const {articles, selectItem, selectedItem} = props
    const articleElements = articles.map((article) => <li key={article.id}>
        <Article
            article={article}
            isOpen={article.id === selectedItem}
            toggleOpen={selectItem(article.id)}/>
    </li>)
    return (
        <ul>
            {articleElements}
        </ul>
    )
}

ArticleList.defaultProps = {
    articles: []
}

export default accordion(ArticleList)