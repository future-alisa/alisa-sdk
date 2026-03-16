// src/env-shims.d.ts

interface ImportMeta {
  readonly env: Record<string, string | undefined>;
}

declare namespace process {
  const env: Record<string, string | undefined>;
}
