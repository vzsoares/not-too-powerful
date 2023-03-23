// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_BASE: string;
  readonly VITE_DISCORD_ADD_BOT_TO_SERVER: string;
  readonly VITE_DISCORD_GET_USER_CODE: string;
}
