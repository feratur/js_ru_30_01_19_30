import React, { Component, PropTypes } from 'react'

class ArticleIndexPage extends Component {
    static propTypes = {

    };

    static contextTypes = {
        locale: PropTypes.Object
    }

    render() {
        return (
            <div>
                <h1>{this.context.locale.selectArticle}</h1>
            </div>
        )
    }
}

export default ArticleIndexPage