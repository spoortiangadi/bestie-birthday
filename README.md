# Bestie Birthday Website (React + Vite)

## Run it on your computer
1. Install Node.js (version 18 or newer) from https://nodejs.org
2. Open a terminal in this folder and run:
   ```
   npm install
   npm run dev
   ```
3. Open the link it prints (usually http://localhost:5173).

## Make it yours
- **All text** (name, age, letter, reasons, timeline, final message) is in `src/config.js`.
- **Photos:** copy your images into `public/photos/` (for example `1.jpg`, `2.jpg`),
  then in `src/config.js` set `src: "/photos/1.jpg"` and write a caption.
- Colours and fonts are at the top of `src/App.css`.

## Put it online and get a link to send her
**Netlify (easiest):**
1. Run `npm run build` (this creates a `dist` folder).
2. Go to https://app.netlify.com/drop and drag the `dist` folder onto the page.
3. You get a link like `https://something.netlify.app` to send her.

**Vercel:** push this folder to GitHub, import it at https://vercel.com/new and click Deploy.

## Files
```
index.html          page shell and fonts
src/main.jsx        starts React
src/App.jsx         all the sections (cake, letter, photos, reasons, timeline, finale)
src/App.css         styles
src/config.js       YOUR CONTENT, edit this
src/confetti.js     confetti animation
public/photos/      put your images here
```
