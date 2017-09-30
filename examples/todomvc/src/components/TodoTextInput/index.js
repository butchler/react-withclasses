import React, { Component } from 'react'
import { withClasses } from 'react-withclasses';

class TodoTextInput extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
    }

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleBlur(e) {
    const text = e.target.value.trim()
    if (!this.props.newTodo) {
      this.props.onSave(text)
    }
  }

  render() {
    const { newTodo, classes } = this.props;

    return (
      <input className={classes.input(newTodo ? 'newTodo' : 'editing')}
        type="text"
        autoFocus="true"
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit} />
    )
  }
}

export default withClasses({
  input: {
    position: 'relative',
    margin: 0,
    width: '100%',
    fontSize: '24px',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    lineHeight: '1.4em',
    outline: 'none',
    color: 'inherit',
    boxSizing: 'border-box',
    fontSmoothing: 'antialiased',

    '@variants': {
      newTodo: {
        padding: '16px 16px 16px 60px',
        border: 'none',
        background: 'rgba(0, 0, 0, 0.003)',
        boxShadow: 'inset 0 -2px 1px rgba(0, 0, 0, 0.03)',
      },
      editing: {
        padding: '6px',
        border: '1px solid #999',
        boxShadow: 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  },
})(TodoTextInput);
