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

## 🚀 Quick Example 1

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

</head>

<body>
</body>
<script type="module">
  import { div, span, createStore, button, h1, ul ,li, input} from 'https://unpkg.com/@borovlioff/no-jsx@1.0.0/dist/render.js';



export const todosStore = createStore([
  { id: 1, text: 'Learn reactive rendering', completed: false },
  { id: 2, text: 'Build store', completed: true },
]);

export const addTodo = (text) => {
  const current = todosStore.get();
  const newTodo = { id: Date.now(), text, completed: false };
  todosStore.set([...current, newTodo]);
};

export const toggleTodo = (id) => {
  const current = todosStore.get();
  todosStore.set(
    current.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

export const removeTodo = (id) => {
  todosStore.set(todosStore.get().filter(t => t.id !== id));
};

export const TodoItem = ({ todo }) => {
  return li(
    { className: 'todo-item' },
    input({
      type: 'checkbox',
      checked: todo.completed,
      onchange: () => toggleTodo(todo.id),
    }),
    span(
      {
        style: `text-decoration: ${todo.completed ? 'line-through' : 'none'}; color: ${todo.completed ? '#ff0000ff' : 'inherit'}`,
      },
      todo.text
    ),
    button(
      {
        onclick: () => removeTodo(todo.id),
      },
      'Delete'
    )
  );
};


export const TodoList = () => {
  const todos = todosStore.get();
  return ul(
    { className: 'todo-list' },
    ...todos.map(todo => TodoItem({ todo }))
  );
};

const TodoApp = () => {
  const inputEl = input({
    type: 'text',
    placeholder: 'New todo...',
  });

  function handleAddTodo() {
    const text = (inputEl).value.trim();
    if (text) {
      addTodo(text);
      (inputEl).value = '';
    }
  }

  return div(
    { className: 'app' },
    h1({}, 'Todo App'),
    inputEl,
    button({onclick: handleAddTodo, className: 'add-todo' }, 'Add Todo'),
    () => TodoList()
  );
};

document.body.appendChild(TodoApp());
</script>

</html>
```
## 🚀 Quick Example 1 
Using typescript

```ts
 import { createStore} from "@borovlioff/no-jsx"

 export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export const todosStore = createStore<Todo[]>([
  { id: 1, text: 'Learn reactive rendering', completed: false },
  { id: 2, text: 'Build store', completed: true },
]);
```


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
