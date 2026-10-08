# Angular Gemini Integration

Simple Angular chat UI that connects to the Gemini API from the frontend for testing.

> Important: this project currently uses the Gemini API key in browser code for testing only. Do not use this approach for production. In production, call Gemini from a backend so the API key stays private.

## Requirements

- Node.js
- npm
- Angular CLI, or use the local CLI through `npm run`
- Gemini API key from Google AI Studio

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
NG_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

The `NG_APP_` prefix is required because this project uses `@ngx-env/builder`, which only exposes frontend environment variables with that prefix by default.

3. Start the Angular development server:

```bash
npm.cmd start
```



```bash
npm start

4. Open the app:

```text
http://localhost:4200
```

5. Type a message in the chat input and click `Send`.

## Important Files

- `src/app/components/ai-chat/ai-chat.component.html` - chat UI template
- `src/app/components/ai-chat/ai-chat.component.ts` - chat message state and send handler
- `src/app/components/ai-chat/ai-chat.component.css` - chat UI styling
- `src/app/components/services/gemini.service.ts` - Gemini API call logic
- `src/env.d.ts` - TypeScript typings for `import.meta.env`
- `.env` - local API key file, ignored by git

## Gemini Model

The model is configured in:

```text
src/app/components/services/gemini.service.ts
```

Current model:

```ts
gemini-3.5-flash-lite
```

If that model gives errors, try a different available Gemini model, for example:

```ts
gemini-2.0-flash
gemini-2.0-flash-lite
```

