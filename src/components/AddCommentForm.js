import React, { Component } from 'react'

class AddCommentForm extends Component {
    state = {
        author: '',
        comment: ''
    }

    render() {
        return (
            <section>
                Author: <input type="text" value={this.state.author} onChange={this.handleAuthorChange} /><br/>
                Comment: <input type="text" value={this.state.comment} onChange={this.handleCommentChange} /><br/>
                <button onClick={this.onSubmit}>Submit</button>
            </section>
        );
    }

    handleAuthorChange = (ev) => {
        this.setState({
            author: ev.target.value
        })
    }

    handleCommentChange = (ev) => {
        this.setState({
            comment: ev.target.value
        })
    }

    onSubmit = (ev) => {
        ev && ev.preventDefault && ev.preventDefault()
        this.setState({
            author: '',
            comment: ''
        })
    }
}

export default AddCommentForm