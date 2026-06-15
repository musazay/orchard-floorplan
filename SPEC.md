# Floor Plan Demo - Spec

Date: 2026-06-13
Status: v1 scope locked (requirements only; not yet built)
Owner: Bilal

## Purpose

A small, self-hosted interactive web page to demo the Orchard House floor plan to
family members. The page shows a simplified 2D plan of the house in the center. Each
room is a clickable shape; clicking a room opens a larger image of that room (render or
photo) in a popup. Goal: let family "walk" the plan and see what each space looks like
without flipping through PDFs.

Audience: non-technical family members. Must be dead simple to open and use.

## v1 Decisions (locked)

| Decision        | Choice                                                              |
| --------------- | ------------------------------------------------------------------- |
| Base plan       | Hand-built **SVG** traced from Bilal's hand **sketch** of the *new* design (Bilal's revision of Alex's first draft, in prep for the next Alex meeting). Geometry from the sketch; room sizes from `layout-input.md`. Approximate, not pixel-accurate. |
| Hotspots        | **One image per room**, with **clickable marked per-room** in `layout-input.md` (major rooms clickable by default, but Bilal tags each). Rooms with no image yet show a labeled placeholder. |
| Floors          | **Both floors** (main + second), switchable via a toggle.           |
| Delivery        | **Folder with assets**: `index.html` + `images/` + `app.js` + `styles.css`. Shareable by zipping the folder or running a local server. |

## Source Material

This demo uses **Bilal's new design**, not Alex's first draft.

- **Geometry:** Bilal's hand sketch per floor (traced into the SVG). See `layout-input.md`.
- **Room inventory + sizes + clickable flags + image filenames:** `layout-input.md` (the
  single fill-in source of truth for the build).
- **Images:** newly generated renders Bilal is creating, copied into
  `floorplan-demo/images/`. (NOT Alex's `EXT.*/INT.*` renders.)

Reference only (Alex's first iteration, for context - do not treat as current truth):
`correspondence/architectural/houseplans_first_draft/` (`floorplan_generation_prompts.md`,
`EXT.*`, `INT.*`, and the 6.5.26 architectural PDF).

Orientation: **North is up** = road / driveway / front entry. South and west face the
orchard. East is the secondary side.

## Room List (REFERENCE ONLY - Alex's first draft)

> The actual v1 room list comes from `layout-input.md` (Bilal's new design). The list
> below is kept only as a starting reference for Bilal's revision. Do not build from it.

### Main floor (~3,500-4,000 sq ft)

Overall body ~68 ft (E-W) x 46 ft (N-S), with a 3-car garage projecting off the WEST side.

North / center (public zone):
- Front Entry foyer (~8x12), with Coat Closet + Powder Room flanking
- Formal Family Room (NE corner, ~15x18)
- Kitchen + eat-in Dining (~16x24, east side)
- Great Room (center, ~18x20, normal height)
- Pantry (~6x8, flush to east wall)
- Optional covered patio off kitchen/great room

West (service):
- 3-Car Garage (projecting west, ~30x25, doors face west)
- Mudroom (~12x12)
- Utility / Laundry (~12x14)

South (private bedroom wing, west -> east):
- Master Suite (SW corner, ~16x16 + 5-piece bath + walk-in closet, ~380 sq ft)
- Bedroom (middle, ~13x14)
- Brother's Flex / Living (SE corner, ~15x16, NO exterior door)

### Second floor (~1,200-1,400 sq ft, over main body only, not garage)

- Stair arrival (center; no open balcony over great room)
- Two Bedrooms (~14x16 each) over the brother wing (S/SE)
- Shared Bathroom (~8x12) between the two bedrooms
- Flex / Office (~14x18) over the formal family room (north)
- Attic / Storage (unfinished; shown lightly/hatched)

## Image Mapping (v1)

Driven entirely by `layout-input.md`: each room row names its own image file (or is left
blank = "image coming soon" placeholder). Bilal is generating these images. Any room can
be reassigned by editing its row.

The room->image mapping must live in ONE obvious place in code (a JS object/JSON) so it
can be regenerated from `layout-input.md` and edited without touching layout logic.

Optional exterior gallery: any images listed in the "Exterior images" table of
`layout-input.md`, shown as thumbnails independent of room clicks.

## Functional Requirements

1. **Central 2D plan.** SVG of the current floor, rooms as labeled, filled polygons.
   Rooms have visible names and are sized in rough proportion to real dimensions.
2. **Hover affordance.** Hovering a room highlights it (color/outline change) and shows
   the room name (tooltip or always-on label). Cursor = pointer on clickable rooms.
3. **Click to open image.** Clicking a room opens a modal/lightbox with the room's image,
   the room name as a caption, and a short optional description.
4. **Modal behavior.** Close via an X button, clicking the backdrop, or pressing Esc.
   Optional prev/next to step through rooms.
5. **Placeholder rooms.** Rooms with no image still open the modal showing a clean
   "Image coming soon" placeholder + the room name. Never a broken image.
6. **Floor toggle.** A clear control (tabs or buttons: "Main Floor" / "Second Floor")
   swaps the SVG and hotspot set. North-up orientation preserved on both.
7. **North arrow + legend.** A north arrow and a one-line orientation note
   (road/entry = north; orchard = south/west).
8. **Exterior gallery.** Small thumbnail row of the exterior renders; clicking opens the
   same modal.
9. **Responsive enough.** Usable on a laptop and a tablet; plan scales to viewport.
   Phone support is nice-to-have, not required for v1.

## Non-Functional Requirements

- **Zero build step.** Plain HTML/CSS/JS (vanilla). No framework, no npm, no bundler.
- **Runs by double-clicking `index.html`** OR via `python3 -m http.server`. Document both.
  (If base64 embedding is not used, local file:// must still load images via relative paths.)
- **Self-contained folder.** All assets under `floorplan-demo/`; copies of the render
  JPGs live in `floorplan-demo/images/` (do not hot-link into correspondence/).
- **Editable by a non-expert.** Room list, labels, and image map in clearly commented,
  obvious locations.
- **Lightweight.** Compress/resize render copies if needed so the page loads fast.

## Proposed File Layout

```text
floorplan-demo/
  SPEC.md            <- this file
  README.md          <- how to open/run + how to edit rooms & images
  index.html         <- page shell, floor toggle, modal markup
  styles.css         <- layout + room hover/active + modal styles
  app.js             <- floor data, room->image map, render + modal logic
  data/
    floors.js        <- (optional) room geometry + labels per floor, separated from logic
  images/
    ext-1.jpg ... ext-4.jpg
    int-5.jpg ... int-7.jpg
    placeholder.svg  <- "image coming soon"
```

(Keep it to index.html + styles.css + app.js if simpler; `data/` split is optional.)

## Out of Scope for v1 (backlog)

- Pixel-accurate plan traced from Alex's real CAD/PDF.
- Camera-viewpoint markers with view-direction cones (vs. one-image-per-room).
- Multiple images per room / per-room photo galleries.
- 3D walkthrough or panorama (360) views.
- Annotations, measurements, or dimension callouts on the plan.
- Hosting online / sharing via URL (v1 is local only).
- Mobile-first phone layout.
- Editing UI for placing hotspots in-browser.

## Open Questions

- Which interior render actually corresponds to which room? (Confirm with Alex / from the
  PDF before finalizing the image map; v1 uses best-guess placeholders.)
- Do we want short written descriptions per room in the modal, or image-only for v1?
- Should the second-floor attic/storage be clickable or just shown as context?
