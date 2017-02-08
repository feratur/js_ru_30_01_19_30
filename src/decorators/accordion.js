//HOC - Higher Order Component === decorator
import React from 'react'

export default (Component) => class WrappedComponent extends React.Component {
    state = {
        selectedItem: null
    }

    selectItem = selection => (ev) => {
        ev && ev.preventDefault && ev.preventDefault()

        if (selection === this.state.selectedItem) {
            this.setState({
                selectedItem: null
            })
        } else {
            this.setState({
                selectedItem: selection
            })
        }
    }

    render() {
        return <Component {...this.props} {...this.state} selectItem={this.selectItem} selectedItem={this.state.selectedItem} />
    }
}