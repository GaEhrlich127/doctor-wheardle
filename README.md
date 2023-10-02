## Doctor Wheardle

This is my implementation of [Heardle Games](https://heardle.moe/) for the Doctor Who (2005) Official Soundtracks. I have chosen to only include Murray Gold's work on the show, just due to personal enjoyment of his compositions more than Segun Akinola.

Two modes of play exist, [Full OST](https://doctor-wheardle.vercel.app/game) and [Bangers](https://doctor-wheardle.vercel.app/bangers). The former is all of Murray Gold's officially released works, the latter is a small subsection that mirrors my personal "Doctor Who Bangers" Playlist.

## Technical Decisions

I recognize I have  a few code decisions that may not be best practice.
* Inline Styling: I recognize this is pretty bad practice, but I originally built this as an almost codejam like project in a weekend, just so I would be able to play Heardle with the OST for my favorite show. Inline styling was the fastest way to iterate through ideas, and honestly is super nice to work with on anything that needs to know the audio player times.
* mp3 files instead of an API: Most other Heardle Implementations use an API to play the songs and get the file info, but I chose to use mp3 files for a simple reason. In the USA, many of the tracks needed for this game are largely inaccessible by free API. Most of the other Heardles of this nature (small in scope focused for an incredibly narrow community) use SoundCloud, which had a very slim selection of Doctor Who's tracks accessible for me to use.
* TypeScript files without typing: This repo was actually originally intended to be a clone of Wordle that I never ended up finishing, which I had built in TypeScript. When I decided to scrap that project and reuse the repo, it was already setup for Typescript, but because of the hasty nature of my first implementation here, I decided to pretty much ignore typing. Whoops.
* The Track List is just some local JSON instead of having a database or API, which also makes it a pain to shuffle the order. For now, I just have it so that the game loops through when you run out of tracks, which should be fine as long as you don't memorize the order as you play it each day. I could also improve this by having just a list of numbers, rather than an ordered list with the full objects in it, which would make manual randomziation a bit easier at least.

## TODO:
* I need to fully overhaul the guessing system. I orginally made it store guesses as "INCORRECT, CORRECT, and SKIP" for simiplicity (and because I mistakenly thought other Heardles didn't show you your guesses when I was doing development), but I really should go in and fix this so it stores the guesses correctly and shows you your previous guesses/prevents you from guessing the same thing twice.
* As mentioned above, I can improve the way that the order of songs is stored in a few ways.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
