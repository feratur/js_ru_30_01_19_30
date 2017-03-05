import React, { Component, PropTypes } from 'react'
import {Provider} from 'react-redux'
import store from '../store'
import Menu, {MenuItem} from './Menu'

class Root extends Component {
    static propTypes = {

    };

    state = {
        user: '',
        key: 0,
        lang: 'en'
    }

    locale = {
        en: {
            mainMenuTitle: 'Main menu',
            selectArticle: 'Select Article'
        },
        ru: {
            mainMenuTitle: 'Главное меню',
            selectArticle: 'Выберите статью'
        }
    }

    static childContextTypes = {
        user: PropTypes.string,
        locale: PropTypes.Object
    }

    getChildContext() {
        return {
            user: this.state.user,
            locale: this.locale[this.state.lang]
        }
    }

    render() {
        return (
            <Provider store={store}>
                <div key={this.state.key}>
                    <input value={this.state.user} onChange={this.handleUserChange} />
                    <a href="#" onClick={this.changeLang('ru')}>Ru</a> - <a href="#" onClick={this.changeLang('en')}>En</a>
                    <Menu key={this.state.key}>
                        <MenuItem path="/articles" />
                        <MenuItem path="/filters" />
                        <MenuItem path="/counter" />
                        <MenuItem path="/comments/1" />
                    </Menu>
                    {this.props.children}
                </div>
            </Provider>
        )
    }

    handleUserChange = ev => {
        this.setState({
            user: ev.target.value
        })
    }

    changeLang = newLang => ev => {
        const {lang} = this.state

        if (lang === newLang)
            return

        this.setState({
            lang: newLang,
            key: this.state.key + 1
        })
    }
}

export default Root