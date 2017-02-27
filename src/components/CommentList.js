import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm'
import {connect} from 'react-redux'
import {loadComments} from '../AC'
import Loader from './Loader'
import {commentSelectorFactory} from '../selectors'

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
        //ок, но как я говорил на уроке, лучше делать в декларативном стиле - в componentWillReceiveProps, чем в императивном - как реакцию на клик
        if (!this.props.isLoading && !this.props.comments)
            this.props.loadComments(this.props.article.id)
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default connect(() => {
    const commentSelector = commentSelectorFactory()
    return (state, props) => {
        const comments = commentSelector(state, props)

        return {
            isLoading: comments ? comments.isLoading : false,
            comments: comments ? comments.comments : null
        }
    }
}, {loadComments})(CommentList)
