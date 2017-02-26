import React, { PropTypes } from 'react'
import {connect} from 'react-redux'
import {commentSelectorFactory} from '../selectors'

function Comment(props) {
    const {text, user} = props.comment
    return (
        <div>
            {text}
            {user && <b> by {user}</b>}
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.string
    }).isRequired
}

export default connect(() => {
    const commentSelector = commentSelectorFactory()
    return (state, props) => {
        return {
            comment: commentSelector(state, props)
        }
}})(Comment)