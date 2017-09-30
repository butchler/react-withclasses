# react-withclasses

A React wrapper around JSS that provides a JSON syntax similar to Aphrodite, and provides a
`@variants` helper for defining variants of a set of base styles.

### Usage

Basic usage:

```
function MyThing({ isActive, classes }) {
  return (
    <div className={classes.thing}>
      This is a thing.
    </div>
  );
}

export default withClasses({
  container: {
    border: '1px solid #888',

    // Supports pseudo selectors and media queries
    ':hover': {
      borderColor: 'black',
    },

    '@media (min-width: 400px)': {
      padding: '1em',
    },
  },
})(MyThing);
```

Variants:

```
function MyActivatableThing({ isActive, toggleActive, classes }) {
  return (
    <button
      className={classes.thing(isActive ? 'active' : 'inactive')}
      onClick={toggleActive}
    >
      Toggle thing
    </div>
  );
}

export default withClasses({
  thing: {
    padding: '1em',

    '@variants': {
      active: {
        backgroundColor: 'yellow',
      },
      inactive: {
        backgroundColor: '#ccc',
      },
    },
  },
})(MyActivatableThing);
```

Dynamic values:

```
function MyDynamicThing({ width, height, classes }) {
  return (
    <div className={classes.thing}>
      {width}px x {height}px
    </div>
  );
}

export default withClasses({
  thing: {
    backgroundColor: '#ccc',

    // Component props are passed to each CSS property's function to compute their style value.
    width: ({ width }) => `${width}px`,
    height: ({ height }) => `${height}px`,
  },
})(MyDynamicThing);
```

### Why not use inline styles?

* No vender prefixing
* Less efficient in general
* Does not support all CSS features (pseudo selectors, media queries, etc.)

### Why not use Aphrodite?

* Injects styles asynchronously, making it difficult or impossible to compute a element's styles
  dynamically, which can be useful for things like component-level media queries and dynamic text
  trimming, etc.
* If you turn off the asynchronous behavior by just pre-injecting all styles on execution, then you
  can get non-deterministic behavior when combining classnames, because you don't know the order
  that the CSS will be injected due to the way Aphrodite reuses styles.
* Does not support truly dynamic style values (values based on runtime data such as component props).

### One alternative to Aphrodite: JSS

* Injects styles synchronously.
* Only reuses styles on the component level, so the order of CSS is deterministic for a single
  component.
* Supports dynamic style values.

### Why not just use `react-jss`?

* JSS's default JSON syntax is slightly different from Aphrodite's. `react-withclasses` uses a
  syntax similar to Aphrodite, so we don't need to change how our styles are written.
* JSS, The Good Parts: JSS's JSON syntax is much more flexible, allowing things like descendent
  selectors, which I think should be avoided whenever possible because they can easily lead to
  non-deterministic behavior when you have nesting of arbitrary components (e.g. any component that
  uses `children`). `react-withclasses` uses a stricter format that forces you to write easier to
  reason about CSS.
* Validation: `react-withclasses` does some validation of the stylesheets you give it as soon as
  `withClasses` is called, and I would like to add more validation (e.g. maybe checking CSS property
  names to catch typos early). This way you will found out immediately if you make a mistake in the
  CSS.
* Variants: It is very common to have a base set of styles, with several sets of extra styles on
  top, with the different variants chosen at runtime. This is easy to implement in JSS using
  separate classes and combining with something like the `classnames` module, but I wanted to build
  a higher level abstraction for this, because:
  1. Simply combining the classnames may not always be the best option (e.g. it might be better to use an
     approach similar to `Aphrodite` or `Styletron` in some cases). A higher level abstraction gives
     us the flexibility to change the implementation details later.
  2. Explicitly defining the variants instead of creating distinct classes may allow us to do extra
     validation to avoid common mistakes (for example, it could warn you if you try to override one
     of the CSS properties in the base styles with a variant, rather than using a default variant,
     which is usually easier to read/reason about).
  3. It also keeps all of the styles for a single element in one place, which I think makes styles
     easier to read/debug.
* Less direct external dependencies: if we find some issues with JSS like we did with Aphrodite, we
  can change the implementation of `react-withclasses` to use something else without having to
  rewrite any of our code.
