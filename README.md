# Orchard House - Floor Plan Demo

An interactive 2D floor plan to demo the house to family. Click a room to open an
image of that space. Built as plain HTML/CSS/JS - no build step.

## How to open it

**Easiest:** double-click `index.html` (opens in your browser via `file://`).

**Or run a tiny local server** (better if images ever don't load over `file://`):

```sh
cd floorplan-demo
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How to share it

Zip the whole `floorplan-demo/` folder and send it. They unzip and double-click
`index.html`. Everything is self-contained (no internet needed).

## How to edit the plan

Everything lives in **`app.js`**, in the `FLOORS` object at the top. Each room has a
position (`x, y` in feet from the top-left), a size (`w, d`), a `click` flag, and an
`img` filename. The rendering code never needs to change - just the data.

- **Make a room clickable / not:** set `click: true` or `false`.
- **Add image(s) to a room:** drop the file(s) in `images/` and list them on the
  room: `images: ["kitchen-1.png", "kitchen-2.png"]`. One image shows on its own;
  multiple images get a slider (chevrons + dots) in the popup. Empty/omitted shows a
  "coming soon" placeholder.
- **Exterior renders:** the sidebar "Exterior" button opens the `EXTERIOR` gallery
  (edit its `images` list near the top of the modal section in `app.js`).

## Notes panel

Each room popup has a **Notes** panel to the right of the image. Type a note in the box
and click **Save note** (or Cmd/Ctrl+Enter) - it's added as a bullet to the list above.
Hover a bullet to delete it.

Notes storage is automatic:
- **Deployed with Firebase configured** (`firebase-config.js` filled in) -> notes are
  **shared**: everyone on the URL sees and edits the same notes, synced live.
- **Not configured / opened locally** -> notes fall back to **on-device** storage
  (`localStorage`) so the page still works.

See `DEPLOY.md` to set up Firebase + GitHub Pages and get a shareable link.
- **Change a label or size:** edit `name`, `dims`, `x`, `y`, `w`, `d`.

`layout-input.md` is the human-readable source the room data was built from - update it
when the design changes, then mirror changes into `app.js` (or ask Claude to).

## Orientation

The plan is drawn to match the hand sketch (`floor_one.png`): **north points down**, so
the bottom (foyer) faces the road / front entry, page-right is west (garage side),
page-left is east, top is south / orchard.

## Files

```text
index.html        page shell + modal
styles.css        styling
app.js            FLOORS data + all logic  <- edit rooms here
layout-input.md   room list / dimensions source
images/           room + exterior images (you add these)
sketches/         hand sketches
floor_one.png     main floor sketch
SPEC.md           requirements
```

## Status

- Main floor: built from `floor_one.png`. All rooms show placeholders (no images yet).
- Second floor: pending a sketch.
