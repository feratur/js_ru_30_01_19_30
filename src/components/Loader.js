import React, { PropTypes, Component } from 'react'

class Loader extends Component {
    static propTypes = {}

    static contextTypes = {
        locale: PropTypes.Object
    }

    render() {
        return (
            <h2>{this.context.locale.loading}</h2>
        )
    }
}

export default Loader