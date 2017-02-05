import React, {Component} from 'react'

export default class Article extends Component {
    state = {
        isOpen: false,
        commentsShown: false
    }
/*
    constructor(props) {
        super(props)
        this.state = {
            isOpen: props.defaultOpen
        }
    }
*/

    render() {
        const {article} = this.props
        console.log('---', 123)
        return (
            <div>
                <h3 onClick={this.handleClick}>{article.title}</h3>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        if (!this.state.isOpen) return null

        return (
            <section>
                <p>{this.props.article.text}</p>
                <button onClick={this.handleCommentsClick}>{this.getButtonText()}</button>
                {this.getComments()}
            </section>
        )
    }

    getButtonText() {
        return this.state.commentsShown ? 'Hide comments' : 'Show comments'
    }

    getComments() {
        if (!this.state.commentsShown) return null

        const {article} = this.props

        if (!article.comments) return null

        const comments = article.comments.map((comment) =>
            <li key={comment.id}>{comment.text}</li>
        )

        return (
            <ul>{comments}</ul>
        )
    }

    handleClick = (ev) => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleCommentsClick = (ev) => {
        this.setState({
            commentsShown: !this.state.commentsShown
        })
    }
}