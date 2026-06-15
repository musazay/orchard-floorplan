/* ============================================================================
 * Orchard House - Floor Plan Demo
 * ----------------------------------------------------------------------------
 * EDIT HERE: all rooms live in the FLOORS object below. To change the plan you
 * only touch data - never the rendering code further down.
 *
 * Each room:
 *   id     - unique string
 *   name   - label shown on the plan (use "" to draw a blank context box)
 *   dims   - optional size string shown under the name (e.g. "20x24")
 *   x, y   - top-left corner of the box, in FEET, measured from the plan's
 *            top-left. x grows to the RIGHT, y grows DOWN. (This matches the
 *            sketch exactly: north points DOWN, so page-bottom = north/road,
 *            page-right = west/garage side, page-left = east.)
 *   w, d   - width (left-right) and depth (top-down) in feet
 *   click  - any room with images is clickable automatically. Set click:true only to
 *            make a room clickable BEFORE it has images (shows a placeholder); leave it
 *            off/false for context-only spaces (halls, baths, stairs, etc.).
 *   images - array of image filenames in images/ (e.g. ["kitchen-1.png",
 *            "kitchen-2.png"]). One image shows on its own; multiple images get
 *            a slider in the popup. Empty/omitted = a "coming soon" placeholder.
 *            (A single `img: "file.png"` string is still accepted.)
 *   desc   - optional one-line description shown in the popup
 *   kind   - "room" (default) | "context" | "stairs" | "ghost"
 * ==========================================================================*/

const FLOORS = {
  main: {
    label: "Main Floor",
    width: 60,
    height: 44,
    // viewBox leaves room on the right for the off-plan garage and margins on
    // the top/left for the perimeter dimension strings.
    viewBox: "-8 -7 100 55",
    // perimeter dimension strings (feet)
    perimeter: [
      { dir: "h", a: 0, b: 60, at: -3.5, label: "60'" },  // width across the top
      { dir: "v", a: 0, b: 44, at: -3.5, label: "44'" },  // depth down the side
    ],
    // wall segments to erase, to show passages/doorways (x1,y1 -> x2,y2)
    openings: [
      // left hallway opens to the kitchen (top) and family room (bottom);
      // only the pantry wall and the wall across from it remain
      { x1: 16, y1: 24, x2: 20, y2: 24 },
      { x1: 16, y1: 30.5, x2: 20, y2: 30.5 },
      // right hallway opens into the laundry / utility (no wall between them)
      { x1: 40, y1: 36, x2: 44, y2: 36 },
      // hallway pocket is continuous with the main hallway
      { x1: 44, y1: 12, x2: 44, y2: 16 },
      // doorways from the hallway pocket into the flex room and the bedroom
      { x1: 45, y1: 12, x2: 48, y2: 12 },
      { x1: 45, y1: 16, x2: 48, y2: 16 },
    ],
    note:
      "<strong>Orientation matches your sketch.</strong> North points <strong>down</strong>: " +
      "the bottom (foyer) faces the road / front entry. Page-right = west " +
      "(garage side), page-left = east, top = south/orchard.",
    rooms: [
      // --- WEST column on the page is drawn on the LEFT (page-left = east) ---
      { id: "kitchen", name: "Kitchen & Dining", dims: "20x24", x: 0, y: 0, w: 20, d: 24, click: true, images: ["kitchen-dining.png"], desc: "Open to the great room." },
      { id: "pantry", name: "Pantry", dims: "16x6.5", x: 0, y: 24, w: 16, d: 6.5, click: true, images: ["pantry-butler.png"], kind: "context", desc: "Butler's pantry." },
      { id: "hall1", name: "", x: 16, y: 24, w: 4, d: 6.5, click: false, img: null, kind: "context" },
      { id: "family", name: "Family Room", dims: "20x13.5", x: 0, y: 30.5, w: 20, d: 13.5, click: true, images: ["family-room.png"] },

      // --- CENTER column ---
      // Foyer is drawn FIRST (the large space); powder + stairs sit on top of it.
      { id: "great", name: "Great Room", dims: "20x24", x: 20, y: 0, w: 20, d: 24, click: true, images: ["great-room-fireplace.png", "great-room-kitchen.png"], desc: "Central gathering space." },
      { id: "foyer", name: "Foyer", x: 20, y: 24, w: 20, d: 20, click: true, images: ["foyer-front.png", "foyer-back.png"], desc: "Front entry (faces the road / north).", labelX: 30, labelY: 40 },
      { id: "powder", name: "Powder", dims: "6x5", x: 20, y: 24, w: 7, d: 6, click: false, img: null, kind: "context" },
      { id: "stairs", name: "", x: 33.2, y: 26.5, w: 6.8, d: 9.35, click: false, img: null, kind: "stairs", landing: true, platform: true, arrowUp: true, arrowDown: true },

      // --- EAST column on the page is drawn on the RIGHT (page-right = west) ---
      // A 4-ft hallway runs the full depth (right of great room + stairs) into
      // the laundry; the second straight stair is in it, left of the flex room.
      { id: "stairs2", name: "", x: 40, y: 0, w: 4, d: 12, click: false, img: null, kind: "stairs", arrowUp: true, arrowNearBottom: true },
      { id: "hall2", name: "", x: 40, y: 12, w: 4, d: 24, click: false, img: null, kind: "context" },
      { id: "flex", name: "Flex Room", dims: "20x12", x: 44, y: 0, w: 16, d: 12, click: true, img: null },
      // hallway pocket between flex + bedroom; closet shrinks to make room for it
      { id: "hall3", name: "", x: 44, y: 12, w: 6, d: 4, click: false, img: null, kind: "context" },
      { id: "closet", name: "Closet", x: 50, y: 12, w: 10, d: 4, click: false, img: null, kind: "context" },
      { id: "bedroom", name: "Bedroom", dims: "16x10", x: 44, y: 16, w: 16, d: 10, click: true, img: null },
      { id: "bath", name: "Full Bath", dims: "10x10", x: 44, y: 26, w: 10, d: 10, click: false, img: null, kind: "context" },
      { id: "mech", name: "Mech.", dims: "6x10", x: 54, y: 26, w: 6, d: 10, click: false, img: null, kind: "context", desc: "Mechanical room." },
      { id: "laundry", name: "Laundry / Utility", dims: "20x8.5", x: 40, y: 36, w: 20, d: 8, click: true, images: ["laundry-utility-mud.png", "laundry-hallway.png"], kind: "context", desc: "Garage door to house is here." },

      // --- Off-plan garage (west side); flush with the north (front) face ---
      { id: "garage", name: "Garage (3-car)", dims: "35 x 25", x: 60, y: 9, w: 25, d: 35, click: false, img: null, kind: "ghost" },
    ],
  },

  second: {
    label: "Second Floor",
    pending: true,
    note: "Second-floor sketch not added yet.",
    rooms: [],
  },
};

const SVG_NS = "http://www.w3.org/2000/svg";

/* ----- DOM refs ----- */
const planWrap = document.getElementById("planWrap");
const roomListEl = document.getElementById("roomList");
const orientationEl = document.getElementById("orientation");
const floorToggleEl = document.getElementById("floorToggle");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

let currentFloorKey = "main";
let currentItem = null; // the room/gallery currently shown in the modal

/* ----- helpers ----- */
function el(name, attrs = {}, parent = null) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (parent) parent.appendChild(node);
  return node;
}

// Pick a label font size that fits inside the room box.
function fitFont(name, w, d) {
  const byHeight = d * 0.42;
  const byWidth = (w * 1.7) / Math.max(name.length, 6);
  return Math.max(0.85, Math.min(1.6, byHeight, byWidth));
}

// A room is clickable if it has any images, or is explicitly flagged click:true
// (for rooms we want clickable before their images exist - shows a placeholder).
function isClickable(room) {
  return !!room.click || getImages(room).length > 0;
}

// Step (tread) hatch lines across a region.
function drawSteps(g, x, y, w, h, n) {
  for (let i = 1; i < n; i++) {
    const yy = y + (h / n) * i;
    el("line", { x1: x, y1: yy, x2: x + w, y2: yy, class: "stair-hatch" }, g);
  }
}

// Vertical direction arrow: line from fromY to toY with an arrowhead at toY.
// toY < fromY points up the page (= south here, since north is down).
function arrowV(g, cx, fromY, toY) {
  el("line", { x1: cx, y1: fromY, x2: cx, y2: toY, class: "stair-arrow" }, g);
  const dir = toY < fromY ? -1 : 1;
  const by = toY - dir * 1.4; // base of the arrowhead sits behind the tip
  el("path", { d: `M ${cx} ${toY} L ${cx - 0.8} ${by} L ${cx + 0.8} ${by} Z`, class: "stair-arrow-head" }, g);
}

// Render a stair: straight run, or a switchback with a mid landing + two arrows.
function drawStairs(g, room) {
  const { x, y, w, d } = room;
  if (room.landing) {
    // switchback: two runs SIDE BY SIDE with a vertical well between them,
    // joined by a platform across the north (front-door / bottom) end.
    const ph = room.platform ? Math.min(2, d * 0.22) : 0; // platform depth at north end
    const runH = d - ph;
    const runW = w * 0.42;
    const lw = w - runW * 2;            // central well width
    const lx = x + runW;                // well left edge
    const leftCx = x + runW / 2;
    const rightCx = lx + lw + runW / 2;
    drawSteps(g, x, y, runW, runH, 5);
    drawSteps(g, lx + lw, y, runW, runH, 5);
    el("rect", { x: lx, y: y + 0.2, width: lw, height: runH - 0.2, class: "stair-landing" }, g);
    if (ph) el("rect", { x: x + 0.2, y: y + runH, width: w - 0.4, height: ph - 0.2, class: "stair-landing" }, g);
    if (room.arrowDown) arrowV(g, leftCx, y + 0.7, y + runH - 0.7);  // left run: same side, points down
    if (room.arrowUp) arrowV(g, rightCx, y + runH - 0.7, y + 0.7);   // right run: same side, points up
  } else {
    drawSteps(g, x, y, w, d, 5);
    const cx = x + w / 2;
    // arrowNearBottom keeps a short arrow at the low (hallway) end of the run
    if (room.arrowUp) arrowV(g, cx, y + d - 0.7, room.arrowNearBottom ? y + d - 3.4 : y + 0.7);
    if (room.arrowDown) arrowV(g, cx, y + 0.7, room.arrowNearBottom ? y + 3.4 : y + d - 0.7);
  }
}

// Architectural dimension string with end ticks + label. dm = {dir,a,b,at,label}
// dir "h": horizontal run from x=a to x=b along y=at. dir "v": vertical run.
function drawDim(svg, dm) {
  const t = 0.9; // tick half-length
  if (dm.dir === "h") {
    const y = dm.at;
    el("line", { x1: dm.a, y1: y, x2: dm.b, y2: y, class: "dim-line" }, svg);
    el("line", { x1: dm.a, y1: y - t, x2: dm.a, y2: y + t, class: "dim-line" }, svg);
    el("line", { x1: dm.b, y1: y - t, x2: dm.b, y2: y + t, class: "dim-line" }, svg);
    const tx = (dm.a + dm.b) / 2;
    el("text", { x: tx, y: y - 1, class: "dim-label" }, svg).textContent = dm.label;
  } else {
    const x = dm.at;
    el("line", { x1: x, y1: dm.a, x2: x, y2: dm.b, class: "dim-line" }, svg);
    el("line", { x1: x - t, y1: dm.a, x2: x + t, y2: dm.a, class: "dim-line" }, svg);
    el("line", { x1: x - t, y1: dm.b, x2: x + t, y2: dm.b, class: "dim-line" }, svg);
    const ty = (dm.a + dm.b) / 2;
    el("text", { x: x - 1, y: ty, class: "dim-label", transform: `rotate(-90, ${x - 1}, ${ty})` }, svg).textContent = dm.label;
  }
}

/* ----- render the floor toggle ----- */
function renderToggle() {
  floorToggleEl.innerHTML = "";
  for (const [key, floor] of Object.entries(FLOORS)) {
    const btn = document.createElement("button");
    btn.textContent = floor.label;
    btn.className = key === currentFloorKey ? "active" : "";
    btn.addEventListener("click", () => {
      currentFloorKey = key;
      renderAll();
    });
    floorToggleEl.appendChild(btn);
  }
}

/* ----- render the SVG plan ----- */
function renderPlan(floor) {
  planWrap.innerHTML = "";

  if (floor.pending) {
    const div = document.createElement("div");
    div.className = "plan-pending";
    div.innerHTML = "<p>" + floor.note + "</p><p>Add a sketch + room list and it will appear here.</p>";
    planWrap.appendChild(div);
    return;
  }

  const svg = el("svg", { viewBox: floor.viewBox, "aria-label": floor.label + " plan" });

  floor.rooms.forEach((room) => {
    const kind = room.kind || "room";
    const g = el("g", {}, svg);

    const rect = el("rect", {
      x: room.x, y: room.y, width: room.w, height: room.d,
      rx: 0.4, class: "svg-room kind-" + kind + (isClickable(room) ? " clickable" : ""),
    }, g);
    rect.dataset.id = room.id;

    if (isClickable(room)) {
      rect.addEventListener("click", () => openRoom(room.id));
      rect.addEventListener("mouseenter", () => highlightRoom(room.id, true));
      rect.addEventListener("mouseleave", () => highlightRoom(room.id, false));
    }

    // stairs (steps + direction arrows)
    if (kind === "stairs") drawStairs(g, room);

    // label
    if (room.name) {
      const fs = fitFont(room.name, room.w, room.d);
      const cx = room.labelX != null ? room.labelX : room.x + room.w / 2;
      const cy = room.labelY != null ? room.labelY : room.y + room.d / 2;
      const text = el("text", {
        x: cx, y: cy,
        class: "svg-label" + (kind !== "room" ? " context" : ""),
        "font-size": fs,
      }, g);
      const nameSpan = el("tspan", { x: cx, dy: room.dims ? "-0.1em" : "0.35em" }, text);
      nameSpan.textContent = room.name;
      if (room.dims) {
        const dimSpan = el("tspan", { x: cx, dy: "1.2em", class: "dim", "font-size": fs * 0.72 }, text);
        dimSpan.textContent = room.dims;
      }
    }
  });

  // erase wall segments to reveal passages / doorways (painted in the hallway fill)
  (floor.openings || []).forEach((op) => {
    el("line", { x1: op.x1, y1: op.y1, x2: op.x2, y2: op.y2, class: "wall-opening" }, svg);
  });

  // front-entry marker at the foyer (bottom center = north/road)
  el("path", { d: "M 28 44 L 30 42.5 L 32 44", class: "entry-mark" }, svg);

  // perimeter dimension strings
  (floor.perimeter || []).forEach((dm) => drawDim(svg, dm));

  planWrap.appendChild(svg);
}

/* ----- render the sidebar room list ----- */
function renderRoomList(floor) {
  roomListEl.innerHTML = "";
  orientationEl.innerHTML = floor.note || "";

  floor.rooms
    .filter((r) => isClickable(r) && r.name)
    .forEach((room) => {
      const imgs = getImages(room);
      const li = document.createElement("li");
      li.className = imgs.length ? "" : "no-image";
      const left = document.createElement("span");
      left.textContent = room.name;
      const right = document.createElement("span");
      right.className = "meta";
      if (room.dims) {
        const d = document.createElement("span");
        d.className = "dim";
        d.textContent = room.dims;
        right.appendChild(d);
      }
      const badge = document.createElement("span");
      badge.className = "tag" + (imgs.length ? " has" : "");
      badge.textContent = imgs.length ? imgs.length + (imgs.length > 1 ? " photos" : " photo") : "no image";
      right.appendChild(badge);
      li.appendChild(left);
      li.appendChild(right);
      li.addEventListener("click", () => openRoom(room.id));
      li.addEventListener("mouseenter", () => highlightRoom(room.id, true));
      li.addEventListener("mouseleave", () => highlightRoom(room.id, false));
      roomListEl.appendChild(li);
    });
}

function highlightRoom(id, on) {
  const rect = planWrap.querySelector('rect[data-id="' + id + '"]');
  if (rect) rect.classList.toggle("hot", on);
}

/* ----- modal ----- */
// Exterior renders - opened from the sidebar, not tied to a room hotspot.
const EXTERIOR = {
  id: "exterior",
  name: "Exterior",
  desc: "Front and back exterior renders.",
  images: ["front-exterior.png", "back-exterior.png"],
};

let currentImage = 0; // index within the current item's images

function getImages(item) {
  if (Array.isArray(item.images)) return item.images;
  if (item.img) return [item.img];
  return [];
}

// Open a single room or gallery. The modal only navigates BETWEEN IMAGES of this
// item - there is no stepping between rooms.
function openRoom(id) {
  const room = FLOORS[currentFloorKey].rooms.find((r) => r.id === id);
  if (room) openGallery(room);
}

function openGallery(item) {
  currentItem = item;
  currentImage = 0;
  loadNotes();
  showCurrent();
  modal.hidden = false;
}

/* ----- per-room notes: shared via Firebase if configured, else this browser ----- */
const notesArea = document.getElementById("notesArea");
const notesStatus = document.getElementById("notesStatus");
const notesList = document.getElementById("notesList");
const notesSave = document.getElementById("notesSave");

// Use Firestore when a real config is present; otherwise fall back to localStorage.
let db = null;
try {
  const cfg = window.FIREBASE_CONFIG;
  if (cfg && cfg.apiKey && !/REPLACE/.test(cfg.apiKey) && window.firebase) {
    if (!firebase.apps.length) firebase.initializeApp(cfg);
    db = firebase.firestore();
  }
} catch (e) { console.error("Firebase init failed:", e); db = null; }

let currentComments = []; // [{ id, text }]
let notesRoomId = null;
let notesUnsub = null;

function notesKey(id) { return "orchard-notes:" + id; }
function normalizeNote(n) { return typeof n === "string" ? { id: "x" + Math.random().toString(36).slice(2), text: n } : n; }
function readLocal(id) {
  try { const r = localStorage.getItem(notesKey(id)); const p = r ? JSON.parse(r) : []; return Array.isArray(p) ? p.map(normalizeNote) : []; }
  catch (e) { return []; }
}
function writeLocal(id, arr) { try { localStorage.setItem(notesKey(id), JSON.stringify(arr)); } catch (e) {} }

function setComments(arr) { currentComments = arr; renderNotesList(); }

function notesRef() { return db.collection("rooms").doc(notesRoomId).collection("notes"); }

function loadNotes() {
  if (notesUnsub) { notesUnsub(); notesUnsub = null; }
  notesRoomId = currentItem ? (currentItem.id || currentItem.name) : null;
  notesArea.value = "";
  notesStatus.textContent = db ? "Shared - everyone with the link sees these" : "Saved on this device";
  if (!notesRoomId) { setComments([]); return; }
  if (db) {
    notesUnsub = notesRef().orderBy("createdAt").onSnapshot(
      (snap) => { const arr = []; snap.forEach((d) => arr.push({ id: d.id, text: d.data().text })); setComments(arr); },
      (err) => { notesStatus.textContent = "Notes sync error (see console)"; console.error(err); }
    );
  } else {
    setComments(readLocal(notesRoomId));
  }
}

function renderNotesList() {
  notesList.innerHTML = "";
  if (!currentComments.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No notes yet.";
    notesList.appendChild(li);
    return;
  }
  currentComments.forEach((note) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "note-text";
    span.textContent = note.text;
    const del = document.createElement("button");
    del.className = "note-del";
    del.innerHTML = "&times;";
    del.title = "Delete note";
    del.addEventListener("click", () => deleteComment(note.id));
    li.append(span, del);
    notesList.appendChild(li);
  });
}

function saveComment() {
  const text = notesArea.value.trim();
  if (!text || !notesRoomId) return;
  if (db) {
    notesStatus.textContent = "Saving…";
    notesRef().add({ text, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
      .then(() => { notesStatus.textContent = "Saved ✓ (shared)"; })
      .catch((e) => { notesStatus.textContent = "Couldn't save (see console)"; console.error(e); });
  } else {
    const arr = readLocal(notesRoomId);
    arr.push({ id: String(Date.now()), text });
    writeLocal(notesRoomId, arr);
    setComments(arr);
    notesStatus.textContent = "Saved ✓ (this device)";
  }
  notesArea.value = "";
  notesArea.focus();
}

function deleteComment(noteId) {
  if (!notesRoomId) return;
  if (db) {
    notesRef().doc(noteId).delete().catch((e) => console.error(e));
  } else {
    const arr = readLocal(notesRoomId).filter((n) => n.id !== noteId);
    writeLocal(notesRoomId, arr);
    setComments(arr);
  }
}

notesSave.addEventListener("click", saveComment);
notesArea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); saveComment(); }
});

function showCurrent() {
  const item = currentItem;
  if (!item) return;
  const images = getImages(item);
  if (currentImage >= images.length) currentImage = 0;
  modalBody.innerHTML = "";

  if (images.length) {
    const img = document.createElement("img");
    img.src = "images/" + images[currentImage];
    img.alt = item.name;
    modalBody.appendChild(img);
    if (images.length > 1) modalBody.appendChild(buildSlider(images.length));
  } else {
    showPlaceholder(item);
  }

  const counter = images.length > 1 ? "  (" + (currentImage + 1) + " of " + images.length + ")" : "";
  modalTitle.textContent = item.name + (item.dims ? "  -  " + item.dims : "");
  modalDesc.textContent = (item.desc || "") + counter;
}

// Image slider control (chevrons + dots) shown when an item has >1 image.
function buildSlider(n) {
  const bar = document.createElement("div");
  bar.className = "image-slider";

  const prev = document.createElement("button");
  prev.className = "img-nav";
  prev.innerHTML = "&#8249;";
  prev.setAttribute("aria-label", "Previous image");
  prev.addEventListener("click", (e) => { e.stopPropagation(); stepImage(-1); });

  const dots = document.createElement("div");
  dots.className = "dots";
  for (let i = 0; i < n; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === currentImage ? " active" : "");
    dot.addEventListener("click", (e) => { e.stopPropagation(); currentImage = i; showCurrent(); });
    dots.appendChild(dot);
  }

  const next = document.createElement("button");
  next.className = "img-nav";
  next.innerHTML = "&#8250;";
  next.setAttribute("aria-label", "Next image");
  next.addEventListener("click", (e) => { e.stopPropagation(); stepImage(1); });

  bar.append(prev, dots, next);
  return bar;
}

function stepImage(delta) {
  const images = getImages(currentItem);
  if (images.length < 2) return;
  currentImage = (currentImage + delta + images.length) % images.length;
  showCurrent();
}

function showPlaceholder(item) {
  modalBody.innerHTML =
    '<div class="modal-placeholder"><div class="ph-icon">&#128247;</div>' +
    "<p>Image coming soon</p><p><strong>" + item.name + "</strong></p></div>";
}

function closeModal() {
  modal.hidden = true;
  if (notesUnsub) { notesUnsub(); notesUnsub = null; } // stop the notes listener
}

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") { closeModal(); return; }
  if (e.target === notesArea) return; // don't hijack arrow keys while writing notes
  if (e.key === "ArrowLeft") stepImage(-1);  // navigate images only
  else if (e.key === "ArrowRight") stepImage(1);
});

// Sidebar exterior gallery button
const exteriorBtn = document.getElementById("exteriorBtn");
if (exteriorBtn) exteriorBtn.addEventListener("click", () => openGallery(EXTERIOR));

/* ----- render everything ----- */
function renderAll() {
  const floor = FLOORS[currentFloorKey];
  renderToggle();
  renderPlan(floor);
  renderRoomList(floor);
}

renderAll();
