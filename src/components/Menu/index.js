import React, { Component, PropTypes } from 'react'
import MenuItem from './MenuItem'
export {MenuItem}

class Menu extends Component {
    static propTypes = {

    };

    static contextTypes = {
        locale: PropTypes.Object
    }

    render() {
        return (
            <div>
                <h2>{this.context.locale.mainMenuTitle}:</h2>
                {this.props.children}
            </div>
        )
    }
}

export default Menu