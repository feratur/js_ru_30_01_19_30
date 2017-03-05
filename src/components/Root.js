import React, { Component, PropTypes } from 'react'
import {Provider} from 'react-redux'
import store from '../store'
import Menu, {MenuItem} from './Menu'

class Root extends Component {
    static propTypes = {

    };

    state = {
        user: '',
        lang: 'en'
    }

    locale = {
        en: {
            mainMenuTitle: 'Main menu',
            selectArticle: 'Select Article',
            increment: 'Increment',
            deleteArticle: 'Delete me',
            showComments: 'show comments',
            hideComments: 'hide comments',
            username: 'Username',
            noComments: 'No comments yet',
            user: 'user',
            comment: 'comment',
            loading: 'Loading...',
            commentsPagination: 'Comments pagination'
        },
        ru: {
            mainMenuTitle: 'Главное меню',
            selectArticle: 'Выберите статью',
            increment: 'Увеличить счетчик',
            deleteArticle: 'Удалить',
            showComments: 'показать комментарии',
            hideComments: 'скрыть комментарии',
            username: 'Пользователь',
            noComments: 'Нет комментариев',
            user: 'имя',
            comment: 'комментарий',
            loading: 'Загрузка...',
            commentsPagination: 'Комментарии постранично'
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
                <div key={this.state.lang}>
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
        this.setState({
            lang: newLang
        })
    }
}

export default Root