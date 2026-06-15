# Layout Input - fill this in for the SVG mock

This is what you hand me so I can draw the 2D plan. One section per floor.
For each floor: (1) a sketch photo, (2) overall dimensions, (3) a room table.

---

## How to make a good sketch (so the trace is accurate)

- **One floor per sketch / photo.**
- **Mark North** (write "N ^" or a north arrow at the top). North = road / front entry.
- **Write the overall size**: total width (East-West) x depth (North-South) in feet.
- **Label every space**, including closets, baths, halls, garage, porches, stairs.
- **Roughly to scale is enough** - exact proportions come from the room table below, so
  don't stress the ruler. Just keep adjacencies (what's next to what) correct.
- Photo tips: shoot straight-on (not angled), whole plan in frame, good light.
- Optional: mark main doors with a gap or arc if you want them shown (v1 can skip doors).

Drop the photos anywhere and give me the path, e.g.
`floorplan-demo/sketches/main-floor.jpg`.

---

## MAIN FLOOR

- Sketch photo path: `floor_one`
- Overall size: __60__ ft (E-W) x __44__ ft (N-S)  (note any projections, e.g. )
- Notes: __garage off west, not pictured in floor plan. garage door to house in laundry room______

Room table. **Clickable** = Y opens an image, N is context only.
**Image file** = the filename you'll put in `floorplan-demo/images/` (leave blank = placeholder for now).

Extracted from `floor_one.png` (2026-06-14). Clickable flags are DEFAULTS - flip any
Y/N and I'll update the page. Orientation note: north points DOWN in the sketch, so
page-bottom = north/road, page-right = west (garage), page-left = east.

| Room                  | Approx W x D (ft) | Clickable | Image file | Notes                                      |
| --------------------- | ----------------- | --------- | ---------- | ------------------------------------------ |
| Kitchen & Dining      | 20 x 24           | Y         |            | open to great room                         |
| Great Room            | 20 x 24           | Y         | great-room-fireplace.png, great-room-kitchen.png | 2 images (slider) |
| Foyer (images)        | see below         | Y         | foyer-front.png, foryer-back.png           | 2 images (slider); note "foryer" typo in filename |
| Pantry                | 16 x 6.5          | N         |            | windowless, off kitchen                    |
| Family Room           | 20 x 13.5         | Y         |            | lower-left                                 |
| Great Room            | 20 x 24           | Y         |            | central gathering space                    |
| Foyer                 | ~20 x 20          | Y         |            | front entry (north / road side); large open space, powder + center stair tucked inside |
| Powder Room           | 6 x 5             | N         |            | small box inside foyer                     |
| Stairs (center)       | -                 | N         |            | small box inside foyer; up to 2nd floor    |
| Right-wing hallway    | 4 wide x depth    | N         |            | runs right of great room + stairs into laundry |
| Stairs (straight)     | -                 | N         |            | 2nd flight, in the hallway left of flex    |
| Flex Room             | 20 x 12           | Y         |            | upper-right                                |
| Closet                | 10 x 4            | N         |            | shrunk right; hallway pocket to its left   |
| Hallway pocket        | 6 x 4             | N         |            | between flex + bedroom, doorways into each |
| Bedroom               | 16 x 10           | Y         |            | west side                                  |
| Full Bathroom         | 10 x 10           | N         |            |                                            |
| Mech. Room            | 6 x 10            | N         |            | mechanical room (utility -> not clickable) |
| Laundry / Utility     | 20 x 8.5          | Y         | laundry-utility-mud.png, laundry-hallway.png | 2 images (slider); garage door to house is here |
| Garage (3-car)        | 35 x 25           | N         |            | OFF WEST, ghosted; flush with north (front) face; placeholder size |

---

## SECOND FLOOR

- Sketch photo path: `________`
- Overall size: ____ ft (E-W) x ____ ft (N-S)  (sits over main body only?)
- Notes: ________

| Room              | Approx W x D (ft) | Clickable | Image file        | Notes                  |
| ----------------- | ----------------- | --------- | ----------------- | ---------------------- |
|                   |                   |           |                   |                        |
|                   |                   |           |                   |                        |
|                   |                   |           |                   |                        |

---

## Exterior images (optional gallery, not tied to a room)

| Image file        | Caption                    |
| ----------------- | -------------------------- |
| front-exterior.png | Front exterior            |
| back-exterior.png  | Back exterior             |
