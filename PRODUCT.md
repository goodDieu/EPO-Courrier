# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Administrative staff of the École Polytechnique de Ouagadougou (EPO), Burkina Faso, working at their office desk on a computer. Most are not comfortable with digital tools: they need readable text, explicit labels, large click targets and plain French wording.

Roles represented in the mockup, in the order they handle an incoming letter:

- Chef du Service Courrier (SCC): receives, registers, scans and dispatches mail.
- Secrétaire particulière du SG (SP-SG): receives, sorts (importance/urgency) and introduces files to the Secretary General.
- Secrétaire Général (SG): examines, assigns (imputation) and follows administrative acts.
- Secrétaire particulière du DG (SP-DG): introduces files to the Director General and records the decisions (post-visa check).
- Directeur Général (DG): validates, signs or rejects documents.
- Agent de liaison: delivery rounds, hand-over of letters to recipients, signed discharges.

Other roles (administrator, chargé d'études…) exist in the final product but are out of scope for this mockup.

## Product Purpose

Track incoming mail, outgoing mail and administrative acts (certificates, leave decisions, mission orders…) across the full internal circuit SCC → SP-SG → SG → SP-DG → DG → SG → SCC → Liaison, so that every file can be located, its deadline followed and its history traced.

The current deliverable is a clickable mockup with fictitious data, used to present the solution to the client (EPO administration). Success: the client understands each actor's daily work and trusts the tool at first sight.

## Positioning

Built for one institution only (not a public SaaS): it mirrors the EPO's own circuit, roles and vocabulary (imputation, coche post-visa, décharge, fiche d'accompagnement) instead of a generic document-management model.

## Operating Context

- Daily office work, repeated actions on lists of letters and files; each role sees only its own part of the circuit.
- Demo context: a 15.6" laptop (≈1366–1536 px effective width), probably projected on a large screen.
- The demo runs fully offline: every font, icon and image is bundled in the project.

## Capabilities and Constraints

- React 19 + Vite + Tailwind CSS 3, Font Awesome 6 and Inter bundled locally.
- Business logic in the mockup must not be changed during design work; logic problems are reported, not fixed.
- Data is fictitious and stored in `src/data/`.
- Platform name shown in the UI: "Gestion des courriers" (never "EPO Courrier").
- The demo login page has a "profil de démonstration" dropdown that pre-fills credentials; it is temporary and must stay removable.

## Brand Commitments

- EPO identity: logo `src/assets/logo-epo.jpeg` (green, red and yellow), motto "L'excellence au service de la Nation", reference site https://epo.bf/fr.
- EPO green is the single action colour across the product (decided 2026-10-14).
- No "AI-looking" design: no decorative gradients, glow, glassmorphism, emoji, gimmicky cards or marketing copy.
- Campus photo `src/assets/campus-epo.jpeg` is the image for authentication screens.

## Evidence on Hand

- Logo, campus photo, fictitious data sets for each role in `src/data/`.
- No real user data, testimonials or metrics: none may be invented as real.

## Product Principles

1. Each screen starts with what the person has to do now.
2. Plain words over jargon: no internal rule codes (RG-xx) or technical terms in the interface.
3. One action colour, one way of doing each thing, the same on every screen.
4. Readable from the back of a meeting room.

## Accessibility & Inclusion

Users with low digital literacy: minimum 12 px text (14 px body), WCAG AA contrast, visible keyboard focus, text labels next to icons, confirmations after every action.
