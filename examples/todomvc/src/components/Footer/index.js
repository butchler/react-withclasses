import React, { Component } from 'react'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filters'
import { withClasses } from 'react-withclasses';
import shared from './../../shared/style'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
}

class Footer extends Component {
  renderTodoCount() {
    const { activeCount, classes } = this.props
    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <span className={classes.count}>
        <strong className={classes.strong}>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter]
    const { filter: selectedFilter, onShow, classes } = this.props

    return (
      <a className={classes.filterLink(filter === selectedFilter ? 'selected' : 'default')}
         onClick={() => onShow(filter)}>
        {title}
      </a>
    )
  }

  renderClearButton() {
    const { completedCount, onClearCompleted, classes } = this.props
    if (completedCount > 0) {
      return (
        <button className={classes.clearCompleted} onClick={onClearCompleted}>
          Clear completed
        </button>
      )
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <footer className={classes.footer}>
        {this.renderTodoCount()}
        <ul className={classes.filters}>
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li className={classes.filtersItem} key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    )
  }
}

const filterLinkHighlight = {
  borderColor: 'rgba(175, 47, 47, 0.1)',
};

const NARROW_BREAKPOINT = '@media (max-width: 430px)';

export default withClasses({
  footer: {
    color: '#777',
    padding: '10px 15px',
    height: '20px',
    textAlign: 'center',
    borderTop: '1px solid #e6e6e6',
    // Test dynamic values
    borderBottom: ({ activeCount }) => `${activeCount * 10}px solid #e6e6e6`,

    ':before': {
      content: '""',
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      height: '50px',
      overflow: 'hidden',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)',
    },

    [NARROW_BREAKPOINT]: {
      height: '50px',
    },
  },

  filters: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    position: 'absolute',
    right: 0,
    left: 0,

    [NARROW_BREAKPOINT]: {
      bottom: '10px',
    },
  },

  filtersItem: {
    display: 'inline',
  },

  filterLink: {
    color: 'inherit',
    margin: '3px',
    padding: '3px 7px',
    textDecoration: 'none',
    border: '1px solid transparent',
    borderRadius: '3px',
    cursor: 'pointer',

    ':hover': filterLinkHighlight,

    '@variants': {
      selected: filterLinkHighlight,
      default: {
        // Test variants with @media queries
        '@media (max-width: 1000px)': {
          color: 'red',
        },
      },
    },
  },

  count: {
    float: 'left',
    textAlign: 'left',
  },

  strong: {
    fontWeight: 300,
  },

  clearCompleted: {
    ...shared.button,
    ...shared.formEl,

    float: 'right',
    lineHeight: '20px',
    textDecoration: 'none',
    cursor: 'pointer',
    visibility: 'hidden',
    position: 'relative',

    ':active': {
      float: 'right',
      lineHeight: '20px',
      textDecoration: 'none',
      cursor: 'pointer',
      visibility: 'hidden',
      position: 'relative',
    },

    ':after': {
      visibility: 'visible',
      content: '"Clear completed"',
      position: 'absolute',
      right: 0,
      whiteSpace: 'nowrap',
    },

    ':hover:after': {
      textDecoration: 'underline',
    },
  },
}, {
  dynamicValues: true,
})(Footer)
