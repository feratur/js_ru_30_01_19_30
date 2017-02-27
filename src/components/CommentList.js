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

        const {comments} = this.props

        if (!comments.isLoaded)
            return <Loader/>

        const {article} = this.props
        const {id} = article

        if (!comments.entities.length) return (<div>
            <h3>No comments yet</h3>
            <NewCommentForm articleId={id}/>
        </div>)

        const commentItems = article.comments.map(id =>
            <li key={id}><Comment comment={comments.entities.find(x => x.id === id)} /></li>)

        return <div>
            <ul>{commentItems}</ul>
            <NewCommentForm articleId={id} />
        </div>
    }

    toggleOpen = ev => {
        ev.preventDefault()
        if (!this.props.comments)
            this.props.loadComments(this.props.article.id)
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default connect((state, props) => {
    const {id} = props.article
    return {
        comments: state.comments[id]
    }
}, {loadComments})(CommentList)