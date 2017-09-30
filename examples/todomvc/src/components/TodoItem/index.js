import React, { Component } from 'react'
import TodoTextInput from '../TodoTextInput'
import { withClasses } from 'react-withclasses';
import shared from './../../shared/style'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo({ id, text })
    }
    this.setState({ editing: false })
  }

  render() {
    const {todo, completeTodo, deleteTodo, classes } = this.props
    const { editing } = this.state;

    let element
    if (editing) {
      element = (
        <TodoTextInput text={todo.text}
           editing={editing}
           onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div>
          <input className={classes.toggle}
             type="checkbox"
             checked={todo.completed}
             onChange={() => completeTodo(todo.id)} />

          <label className={classes.label(todo.completed ? 'completed' : 'default')} onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>

          <button className={classes.destroy + ' destroy'} onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <li className={classes.item('editing')}>
        {element}
      </li>
    )
  }
}

export default withClasses({
  item: {
    position: 'relative',
    fontSize: '24px',

    ':last-child': {
      borderBottom: 'none',
    },

    ':hover .destroy': {
      display: 'block',
    },

    '@variants': {
      editing: {
        borderBottom: 'none',
        padding: 0,
        composes: 'normal',

        ':last-child': {
          marginBottom: '-1px',
        },
      },
      default: {
        borderBottom: '1px solid #ededed',
      },
    },
  },

  toggle: {
    ...shared.formEl,

    textAlign: 'center',
    width: '40px',
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    margin: 'auto 0',
    border: 'none', /* Mobile Safari */
    appearance: 'none',
    '-webkit-appearance': 'none',

    ':after': {
      content: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>\')',
    },

    ':checked:after': {
      content: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>\')',
    },

    '@media screen and (-webkit-min-device-pixel-ratio:0)': {
      background: 'none',
      height: '40px',
    },
  },

  label: {
    whiteSpace: 'pre-line',
    wordBreak: 'break-all',
    padding: '15px 60px 15px 15px',
    marginLeft: '45px',
    display: 'block',
    lineHeight: '1.2',
    transition: 'color 0.4s',

    '@variants': {
      completed: {
        color: '#d9d9d9',
        textDecoration: 'line-through',
      },
      default: null,
    },
  },

  destroy: {
    ...shared.button,
    ...shared.formEl,

    display: 'none',
    position: 'absolute',
    top: 0,
    right: '10px',
    bottom: 0,
    width: '40px',
    height: '40px',
    margin: 'auto 0',
    fontSize: '30px',
    color: '#cc9a9a',
    marginBottom: '11px',
    transition: 'color 0.2s ease-out',

    ':hover': {
      color: '#af5b5e',
    },

    ':after': {
      content: '"×"',
    },
  },

})(TodoItem);
