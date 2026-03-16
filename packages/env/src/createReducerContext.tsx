// src/createReducerContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

// --- 环境探测逻辑 ---
const getSafeEnv = (key: string): string | undefined => {
  try {
    // 适配 Vite
    if (typeof import.meta !== "undefined" && import.meta.env) {
      return import.meta.env[key];
    }
    // 适配 Webpack / Next.js
    if (typeof process !== "undefined" && process.env) {
      return process.env[key];
    }
  } catch (e) {
    /* ignore */
  }
  return undefined;
};

const getAutoConfig = (key: string) => {
  const prefixes = ["VITE_", "NEXT_PUBLIC_", "REACT_APP_", ""];
  for (const prefix of prefixes) {
    const val = getSafeEnv(`${prefix}${key}`);
    if (val) return val;
  }
  return undefined;
};

// --- 类型定义 ---
interface Config {
  apiKey?: string;
  baseUrl?: string;
}

interface ReducerContextProps<S, A> {
  state: S;
  dispatch: Dispatch<A>;
  config: Config;
}

// --- 核心工厂函数 ---
export function createReducerContext<S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S
) {
  const Context = createContext<ReducerContextProps<S, A> | undefined>(
    undefined
  );

  const Provider = ({
    children,
    config: manualConfig,
  }: {
    children: ReactNode;
    config?: Config;
  }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // 自动合并配置
    const config = {
      apiKey: manualConfig?.apiKey || getAutoConfig("ALISA_API_KEY"),
      baseUrl: manualConfig?.baseUrl || getAutoConfig("ALISA_BASE_URL") || "/",
    };

    return (
      <Context.Provider value={{ state, dispatch, config }}>
        {children}
      </Context.Provider>
    );
  };

  const useStore = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(`useStore 必须在对应的 Provider 中使用`);
    }
    return context;
  };

  return [Provider, useStore] as const;
}
