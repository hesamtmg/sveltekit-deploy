# IPG — Internet Payment Gateway (demo)

A front-end-only SvelteKit demo of a card-add payment flow: a live animated
card preview, a validated card form, and an animated success screen. There is
no backend — submission is simulated client-side and the result is passed to
the success page via `sessionStorage`.

## Developing

```sh
npm install
npm run dev -- --open
```

## Building

The app is fully static (prerendered with `@sveltejs/adapter-static`):

```sh
npm run build
npm run preview
```

## Deploying with Docker

The `Dockerfile` builds the static site with Node and serves it with nginx.

```sh
docker build -t ipg .
docker run --rm -p 8080:80 ipg
```

Then open http://localhost:8080.
