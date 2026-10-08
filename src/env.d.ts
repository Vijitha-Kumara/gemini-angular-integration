declare interface Env {
  readonly NODE_ENV: string;
  readonly NG_APP_GEMINI_API_KEY: string;
  readonly NG_APP_FEATURE_FLAG: string;
}

interface ImportMeta {
  readonly env: Env;
}
