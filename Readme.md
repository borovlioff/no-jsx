```markdown
# no-jsx

A minimal, reactive UI library.  
Write declarative, reactive user interfaces using pure JavaScript (or TypeScript) functions.

- ✅ Zero dependencies  
- ✅ Works directly in the browser (`<script type="module">`)  
- ✅ Fine-grained reactivity with automatic dependency tracking  
- ✅ Full TypeScript support with precise DOM element types  
- ✅ No build step required for end users  

Inspired by Preact, Solid, and native DOM simplicity.

---

## 📦 Install

```bash
npm install no-jsx
```

---

## 🚀 Quick Example

```ts
import { div, button, fragment, createStore } from 'no-jsx';

const count = createStore(0);

const Counter = () => 
  div(
    { style: 'margin: 10px; padding: 8px; border: 1px solid #ccc;' },
    `Count: ${count.get()}`,
    button(
      { 
        onclick: () => count.set(count.get() + 1),
        disabled: count.get() > 5 
      },
      'Increment'
    )
  );

const App = () =>
  fragment(
    div({}, 'Reactive App'),
    () => Counter() // ← reactive child (re-runs when `count` changes)
  );

document.body.appendChild(App());
```

> 🔁 The `Counter` re-renders automatically when `count` updates — no manual event wiring.

---

## 🧠 Core Concepts

### `createStore(initialValue)`
Creates a reactive store. Call `.get()` inside a render context to subscribe; `.set()` to update.

### Functional Components
Components are just functions that return DOM nodes:
```ts
const Greeting = ({ name }: { name: string }) =>
  h1({}, `Hello, ${name}!`);
```

### Reactive Children
Pass a **function** as a child to make it reactive:
```ts
div({}, () => `Time: ${Date.now()}`) // updates on every store change
```
But to react only to specific stores, use `.get()` inside:
```ts
div({}, () => `Count: ${count.get()}`) // updates only when `count` changes
```

### Built-in Tags
All standard HTML tags with precise TypeScript types:
- `div`, `span`, `button`, `input`, `h1`, `ul`, `li`, `p`, `section`, etc.
- Full autocomplete and type checking (e.g., `button` knows about `disabled`).

### `fragment(...children)`
Groups multiple nodes without a wrapper (like `<>...</>` in JSX).

### `batch(() => { ... })`
Groups multiple `.set()` calls into a single re-render.

---
