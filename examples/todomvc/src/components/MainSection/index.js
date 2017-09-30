import React, { Component } from 'react'
import TodoItem from '../TodoItem'
import Footer from '../Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filters'
import { withClasses } from 'react-withclasses';
import shared from './../../shared/style'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

class MainSection extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { filter: SHOW_ALL }

    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed)
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted()
    }
  }

  handleShow(filter) {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    const { todos, actions, classes } = this.props
    if (todos.length > 0) {
      return <input
        className={classes.toggleAll}
        type="checkbox"
        checked={completedCount === todos.length}
        onChange={actions.completeAll} />
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow} />
      )
    }
  }

  render() {
    const { todos, actions, classes } = this.props
    const { filter } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) => {
      return todo.completed ? count + 1 : count
    }, 0)

    return (
      <section className={classes.main}>
        {this.renderToggleAll(completedCount)}
        <ul className={classes.list}>
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}

export default withClasses({
  main: {
    position: 'relative',
    zIndex: 2,
    borderTop: '1px solid #e6e6e6',
  },

  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },

  toggleAll: {
    ...shared.formEl,

    position: 'absolute',
    top: '-55px',
    left: '-12px',
    width: '60px',
    height: '34px',
    textAlign: 'center',
    border: 'none', /* Mobile Safari */

    ':before': {
      content: '"❯"',
      fontSize: '22px',
      color: '#e6e6e6',
      padding: '10px 27px 10px 27px',
    },

    ':checked:before': {
      color: '#737373',
    },

    /*
      Hack to remove background from Mobile Safari.
      Can't use it globally since it destroys checkboxes in Firefox
    */
    '@media screen and (-webkit-min-device-pixel-ratio:0)': {
      transform: 'rotate(90deg)',
      appearance: 'none',
      '-webkit-appearance': 'none',
    },
  },
})(MainSection)
