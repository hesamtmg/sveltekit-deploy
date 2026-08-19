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

Pages are prerendered at build time and served by a small Node server
(`@sveltejs/adapter-node`):

```sh
npm run build
node build
```

## Deploying with Docker

The `Dockerfile` builds the app with Node and runs it with Node — no nginx or
other reverse proxy involved.

```sh
docker build -t ipg .
docker run --rm -p 3000:3000 ipg
```

Then open http://localhost:3000.
