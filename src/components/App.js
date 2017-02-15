import React, { PropTypes, Component } from 'react'
import ArticleList from './ArticleList'
import Chart from './Chart'
import Select from 'react-select'
import DateRange from './DateRange'
import 'react-select/dist/react-select.css'
import Counter from './Counter'
import {connect} from 'react-redux'
import {filterSelected} from '../AC'
import { DateUtils } from 'react-day-picker'

class App extends Component {
    state = {
        user: ''
    }

    render() {
        const {articles} = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))
        return (
            <div>
                <Counter/>
                User: <input type="text" value={this.state.user} onChange={this.handleUserChange}/>
                <Select options = {options} onChange={this.handleSelectChange} value={this.props.selectedArticles} multi/>
                <DateRange />
                <ArticleList articles={this.getFilteredArticles()}/>
                <Chart articles={articles}/>
            </div>
        )
    }

    handleSelectChange = selection => {
        this.props.filterSelected(selection)
    }

    handleUserChange = (ev) => {
        if (ev.target.value.length < 10) {
            this.setState({
                user: ev.target.value
            })
        }
    }

    //ок, но еще лучше делать фильтрацию в коннекте
    getFilteredArticles = () => {
        const {articles} = this.props
        const {selectedArticles} = this.props
        const {dateRange} = this.props

        const articlesAfterSelectFilter = (selectedArticles && selectedArticles.length > 0)
            ? articles.filter(article => selectedArticles.some(selected => selected.value === article.id))
            : articles;

        return dateRange
            ? articlesAfterSelectFilter.filter(article => DateUtils.isDayInRange(new Date(article.date), dateRange))
            : articlesAfterSelectFilter
    }
}

App.propTypes = {
    articles: PropTypes.array.isRequired
}

export default connect(state => ({
    articles: state.articles,
    selectedArticles: state.selectedArticles,
    dateRange: state.dateRange
}), {filterSelected})(App)
