import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm'
import Loader from './Loader'
import {loadArticleComments} from '../AC'
import {connect} from 'react-redux'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired
    }

    static contextTypes = {
        router: PropTypes.object,
        store: PropTypes.object,
        user: PropTypes.string,
        locale: PropTypes.Object
    }

    state = {
        isOpen: false
    }

    componentWillUpdate({article, loadArticleComments}, {isOpen}) {
        if (isOpen && !this.state.isOpen && !article.commentsLoaded && !article.commentsLoading) {
            loadArticleComments(article.id)
        }
    }

    render() {
        const {locale} = this.context
        const actionText = this.state.isOpen ? locale.hideComments : locale.showComments

        return (
            <div>
                <a href="#" onClick={this.toggleOpen}>{actionText}</a>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        if (!this.state.isOpen) return null

        const {commentsLoaded, comments = [], id} = this.props.article

        if (!commentsLoaded) {
            return <Loader />
        }

        if (!comments.length) return (<div>
            <h3>{this.context.locale.noComments}</h3>
            <NewCommentForm articleId={id}/>
        </div>)

        const commentItems = comments.map(id => <li key={id}><Comment id={id} /></li>)
        return <div>
            {this.context.locale.username}: {this.context.user}
            <ul>{commentItems}</ul>
            <NewCommentForm articleId={id} />
        </div>
    }

    toggleOpen = ev => {
        ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default connect(null, {loadArticleComments}, null, {pure: false})(CommentList)