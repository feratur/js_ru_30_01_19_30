import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm'
import {connect} from 'react-redux'
import {loadComments} from '../AC'
import Loader from './Loader'

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired
    }

    state = {
        isOpen: false
    }

    render() {
        const actionText = this.state.isOpen ? 'hide' : 'show'
        return (
            <div>
                <a href="#" onClick={this.toggleOpen}>{actionText} comments</a>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        if (!this.state.isOpen) return null

        const {isLoading} = this.props
        const {comments} = this.props

        if (isLoading)
            return <Loader/>

        const {article} = this.props
        const {id} = article

        if (!comments.size) return (<div>
            <h3>No comments yet</h3>
            <NewCommentForm articleId={id}/>
        </div>)

        const commentItems = article.comments.map(commentId =>
            <li key={commentId}><Comment comment={comments.get(commentId)} /></li>)

        return <div>
            <ul>{commentItems}</ul>
            <NewCommentForm articleId={id} />
        </div>
    }

    toggleOpen = ev => {
        ev.preventDefault()
        if (!this.props.isLoading && !this.props.comments)
            this.props.loadComments(this.props.article.id)
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default connect((state, props) => {
    const {id} = props.article
    const articleComments = state.comments.get(id)

    return {
        isLoading: articleComments ? articleComments.isLoading : false,
        comments: articleComments ? articleComments.comments : null
    }
}, {loadComments})(CommentList)