type Child = Node | string | number | boolean | null | undefined;
type ReactiveChild = Child | (() => Child);
type Props = Record<string, any> | null | undefined;


type EffectFn = () => void | (() => void);
let activeEffect: EffectFn | null = null;
const batchQueue = new Set<() => void>();
let isBatching = false;

export const batch = (fn: () => void): void => {
  isBatching = true;
  try {
    fn();
  } finally {
    isBatching = false;
    batchQueue.forEach(f => f());
    batchQueue.clear();
  }
};

type StoreKey = object;
const storeToEffects = new Map<StoreKey, Set<EffectFn>>();
const effectToStores = new Map<EffectFn, Set<StoreKey>>();

export interface Store<T> {
  get(): T;
  set(value: T): void;
}

export const createStore = <T>(initialValue: T): Store<T> => {
  const key = {} as StoreKey;
  return {
    get() {
      if (activeEffect) {
        if (!storeToEffects.has(key)) storeToEffects.set(key, new Set());
        storeToEffects.get(key)!.add(activeEffect);
        if (!effectToStores.has(activeEffect)) effectToStores.set(activeEffect, new Set());
        effectToStores.get(activeEffect)!.add(key);
      }
      return initialValue;
    },
    set(value: T) {
      if (Object.is(initialValue, value)) return;
      initialValue = value;
      const effects = storeToEffects.get(key);
      if (!effects) return;
      const notify = () => effects.forEach(fn => fn());
      if (isBatching) {
        batchQueue.add(notify);
      } else {
        notify();
      }
    },
  };
};



const toNode = (child: Child): Node | null => {
  if (child == null) return null;
  if (typeof child === 'string' || typeof child === 'number') {
    return document.createTextNode(String(child));
  }
  if (child instanceof Node) return child;
  return null;
};

const flattenChildren = (children: ReactiveChild[]): Child[] =>
  children.map(child => (typeof child === 'function' ? child() : child));


const h = (tag: string | ((props: any) => Node), props: Props, ...children: ReactiveChild[]): Node => {
  if (typeof tag === 'function') {
    return tag({ ...props, children });
  }

  const el = document.createElement(tag);

  if (props && typeof props === 'object') {
    for (const [key, value] of Object.entries(props)) {
      if (key.startsWith('on') && typeof value === 'function') {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      }
      else if (key === 'style' && typeof value === 'string') {
      (el as HTMLElement).style.cssText = value;}
      else if (key in el) {
        (el as any)[key] = value;
      } else {
        el.setAttribute(key, String(value));
      }
    }
  }

  
  const renderChildren = () => {
    const resolved = flattenChildren(children);
     const nodes = resolved.map(toNode).filter((node): node is Node => node !== null);
    el.replaceChildren(...nodes);
  };

  
  activeEffect = renderChildren;
  try {
    renderChildren();
  } finally {
    activeEffect = null;
  }

  
  children.forEach((child, i) => {
    if (typeof child === 'function') {
      
      const updateChild = () => {
        const resolved = flattenChildren(children);
        const node = toNode(resolved[i]);
        if (node) {
          const parent = el.childNodes[i] ? el.childNodes[i].parentElement : el;
          if (parent === el && el.childNodes[i]) {
            el.replaceChild(node, el.childNodes[i]);
          }
        }
      };

      activeEffect = updateChild;
      try {
        
        child();
      } finally {
        activeEffect = null;
      }
    }
  });

  return el;
};



type ElementProps<E extends HTMLElement> = Partial<Omit<E, 'style'>> &
  { style?: string } &
  Record<string, any>;

function createTag<T extends HTMLElement>(tagName: string) {
  return (props?: ElementProps<T>, ...children: ReactiveChild[]): T => {
    return h(tagName, props, ...children) as T;
  };
}

export const div = createTag<HTMLDivElement>('div');
export const span = createTag<HTMLSpanElement>('span');
export const button = createTag<HTMLButtonElement>('button');
export const input = createTag<HTMLInputElement>('input');
export const h1 = createTag<HTMLHeadingElement>('h1');
export const ul = createTag<HTMLUListElement>('ul');
export const li = createTag<HTMLLIElement>('li');
export const section = createTag<HTMLElement>('section');
export const p = createTag<HTMLParagraphElement>('p');


export const fragment = (...children: ReactiveChild[]): DocumentFragment => {
  const frag = document.createDocumentFragment();

  const render = () => {
    const resolved = flattenChildren(children);
     const nodes = resolved.map(toNode).filter((node): node is Node => node !== null);
      frag.replaceChildren(...nodes);
  };

  activeEffect = render;
  try {
    render();
  } finally {
    activeEffect = null;
  }

  return frag;
};


export const render = {
  createStore,
  batch,
  fragment,
  div,
  span,
  button,
  input,
  h1,
  ul,
  li,
  p,
  section,
  
  h,
};