type Child = Node | string | number | boolean | null | undefined;
type ReactiveChild = Child | (() => Child);
type Props = Record<string, any> | null | undefined;
export declare const batch: (fn: () => void) => void;
export interface Store<T> {
    get(): T;
    set(value: T): void;
}
export declare const createStore: <T>(initialValue: T) => Store<T>;
type ElementProps<E extends HTMLElement> = Partial<Omit<E, 'style'>> & {
    style?: string;
} & Record<string, any>;
export declare const div: (props?: ElementProps<HTMLDivElement> | undefined, ...children: ReactiveChild[]) => HTMLDivElement;
export declare const span: (props?: ElementProps<HTMLSpanElement> | undefined, ...children: ReactiveChild[]) => HTMLSpanElement;
export declare const button: (props?: ElementProps<HTMLButtonElement> | undefined, ...children: ReactiveChild[]) => HTMLButtonElement;
export declare const input: (props?: ElementProps<HTMLInputElement> | undefined, ...children: ReactiveChild[]) => HTMLInputElement;
export declare const h1: (props?: ElementProps<HTMLHeadingElement> | undefined, ...children: ReactiveChild[]) => HTMLHeadingElement;
export declare const ul: (props?: ElementProps<HTMLUListElement> | undefined, ...children: ReactiveChild[]) => HTMLUListElement;
export declare const li: (props?: ElementProps<HTMLLIElement> | undefined, ...children: ReactiveChild[]) => HTMLLIElement;
export declare const section: (props?: ElementProps<HTMLElement> | undefined, ...children: ReactiveChild[]) => HTMLElement;
export declare const p: (props?: ElementProps<HTMLParagraphElement> | undefined, ...children: ReactiveChild[]) => HTMLParagraphElement;
export declare const fragment: (...children: ReactiveChild[]) => DocumentFragment;
export declare const render: {
    createStore: <T>(initialValue: T) => Store<T>;
    batch: (fn: () => void) => void;
    fragment: (...children: ReactiveChild[]) => DocumentFragment;
    div: (props?: ElementProps<HTMLDivElement> | undefined, ...children: ReactiveChild[]) => HTMLDivElement;
    span: (props?: ElementProps<HTMLSpanElement> | undefined, ...children: ReactiveChild[]) => HTMLSpanElement;
    button: (props?: ElementProps<HTMLButtonElement> | undefined, ...children: ReactiveChild[]) => HTMLButtonElement;
    input: (props?: ElementProps<HTMLInputElement> | undefined, ...children: ReactiveChild[]) => HTMLInputElement;
    h1: (props?: ElementProps<HTMLHeadingElement> | undefined, ...children: ReactiveChild[]) => HTMLHeadingElement;
    ul: (props?: ElementProps<HTMLUListElement> | undefined, ...children: ReactiveChild[]) => HTMLUListElement;
    li: (props?: ElementProps<HTMLLIElement> | undefined, ...children: ReactiveChild[]) => HTMLLIElement;
    p: (props?: ElementProps<HTMLParagraphElement> | undefined, ...children: ReactiveChild[]) => HTMLParagraphElement;
    section: (props?: ElementProps<HTMLElement> | undefined, ...children: ReactiveChild[]) => HTMLElement;
    h: (tag: string | ((props: any) => Node), props: Props, ...children: ReactiveChild[]) => Node;
};
export {};
