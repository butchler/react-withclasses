import React, { Component } from 'react'
import TodoTextInput from '../TodoTextInput'
import { withClasses } from 'react-withclasses';

class Header extends Component {
  constructor() {
    super();

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text) {
    if (text.length) {
      this.props.addTodo(text)
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <header>
        <h1 className={classes.h1}>Todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?" />
      </header>
    )
  }
}

export default withClasses({
  h1: {
    position: 'absolute',
    top: '-155px',
    width: '100%',
    fontSize: '100px',
    fontWeight: '100',
    textAlign: 'center',
    textRendering: 'optimizeLegibility',
    color: 'rgba(175, 47, 47, 0.15)',
  },
})(Header)
