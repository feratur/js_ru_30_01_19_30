import React, { Component, PropTypes } from 'react'
import CommentsPaginator from '../components/CommentsPaginator'

class CommentRoot extends Component {
    static propTypes = {

    };

    static contextTypes = {
        locale: PropTypes.Object
    }

    render() {
        return (
            <div>
                <h1>{this.context.locale.commentsPagination}</h1>
                {this.props.children}
                <CommentsPaginator />
            </div>
        )
    }
}

export default CommentRoot