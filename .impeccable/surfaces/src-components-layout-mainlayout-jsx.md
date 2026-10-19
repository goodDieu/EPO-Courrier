---
version: 1
slug: "src-components-layout-mainlayout-jsx"
primary_target: "src/components/layout/MainLayout.jsx"
related_targets: ["src/components/layout/Sidebar.jsx","src/components/layout/Topbar.jsx"]
---

# App shell (all authenticated screens)

Scope: the frame shared by every role (menu, top bar, content ground, footer). Visitor mode: Operate.
Audience: EPO administrative staff, low digital literacy; demo on a 15.6" laptop, projected.
Task: know where you are, reach your queue in one click, see who is logged in.
Constraints: offline, EPO green only action colour, no AI look, business logic untouched.
Direction pinned by the user from their own references (dark menu with a strongly marked active item, logo at the top of the menu).

## Direction contract

THESIS: The frame is the EPO itself: a deep fir-green column carrying the logo and the role's queues, against a calm green-grey working ground. Refuses the all-white SaaS shell where menu, header and cards melt together.
OWN-WORLD: Fir green #0b3d24 menu, white active item with green text, pale sage text for inactive items; ground #eef2ef, white work surfaces with 1px #dde4df lines; EPO red/yellow only as state colours; Inter throughout.
STORY: The user sees their name and role, their queues with counts, and where they sit in the mail circuit; they click the queue that needs them.
FIRST VIEWPORT: Left 256px green column: logo tile + "Gestion des courriers", queue links with counts, logout at the bottom. Right: 64px white top bar (search, circuit position, notifications, account), then the page on the sage ground.
FORM: Side rail + top bar (standard); signature move: the circuit position strip in the top bar highlighting the current role. seed: none (direction pinned by user).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
