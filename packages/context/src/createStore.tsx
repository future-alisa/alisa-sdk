import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

interface ReducerContextProps<S, A> {
  state: S;
  dispatch: Dispatch<A>;
}

export function createReducerContext<S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S
) {
  // 1. 创建 Context，初始值为 undefined
  const Context = createContext<ReducerContextProps<S, A> | undefined>(
    undefined
  );

  // 2. 封装 Provider
  const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  };

  // 3. 封装 Hook
  const useStore = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(`useStore 必须在对应的 Provider 中使用`);
    }
    return context;
  };

  return [Provider, useStore] as const;
}
