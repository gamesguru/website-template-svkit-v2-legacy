# SvelteKit Legacy Template

This project is a SvelteKit template configured for legacy browser support (IE11) using `@vitejs/plugin-legacy`.

## Setup

1.  Install dependencies:
    ```bash
    npm install
    # or
    pnpm install
    ```

## Developing

Start the development server:

```bash
npm run dev
```

*Note: The development server uses Vite's modern ESM serving and does NOT emulate legacy browsers. To test legacy support, you must build and preview.*

## Building (Legacy Support)

To generate the production build, which includes both modern chunks and legacy chunks (transpiled for IE11):

```bash
npm run build
```

This command will:
1.  Build the server-side code.
2.  Build the client-side code (Modern).
3.  Generate potential legacy chunks and polyfills via `@vitejs/plugin-legacy`.

You will see output indicating `legacy` chunks are being generated.

## Serving / Previewing

To serve the built application (production mode) and verify legacy loading:

```bash
npm run preview
```

Open the exposed URL (e.g., `http://localhost:4173`) in your legacy browser (e.g., IE11 virtual machine) to verify it loads correctly.
