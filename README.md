# Peonies

Peonies is a small interactive romantic gift page. Visitors tap a rose in the bouquet to reveal a song, the artist, and a personal note explaining why the song was chosen.

## Development

```bash
yarn install
yarn dev
```

Create a production build with:

```bash
yarn build
```

The project is a Vite app written in TypeScript. Song metadata lives in `src/songs.ts`; the visual bouquet and interactions are created in `src/main.ts`.

## Customizing

To personalize the page, update the song titles, artists, notes, and flower tones in `src/songs.ts`. The corresponding audio assets belong in `audio/` using the filenames configured there.
