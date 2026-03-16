export * from "./createStore";

export type ExtractState<T> = T extends (reducer: infer S, init: any) => any
  ? S
  : never;
