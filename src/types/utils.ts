export type PropsType<T> = T extends React.ComponentType<infer P> ? P : never;

export type SelectType = { id: string; name: string };
