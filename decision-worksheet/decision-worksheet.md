---
name: artifact-worksheet
description: "Publish a decision doc as an artifact with an answer field under each open question, and iterate on it instead of arguing in the chat"
metadata:
  node_type: memory
  type: feedback
---

When a discussion has spread across many open questions at once, stop
answering in the chat and **publish a decision document as an artifact, with a
text field under every unsettled line**. The user answers in the browser,
exports the compiled digest, pastes or downloads it, and the next pass folds
the user's rulings back into the same artifact. Same URL every time.

**Why:** a conversation that covers too many subjects and questions at once
becomes unmanageable, and restructuring the prose does not fix it, because
the sprawl is structural: a chat is ordered by arrival, a decision set needs
to be ordered by subject. The artifact converts one into the other, and it
survives the session.

**How to apply:**
- **Group by subject, never by order of arrival**, and give every line a status
  chip. Four earn their place: *acté* (closed, no field), *à trancher* (the
  user's call, carrying Claude's recommendation), *ouvert* (nobody has an
  answer), *contradiction* (two documents disagree). A counter at the top and
  a progress bar make the remaining load legible at a glance.
- **A settled line loses its field and gains the ruling in its body.** A line
  that needs more shows the user's answer, then Claude's, then a fresh field.
  That is what keeps the document a record and not a questionnaire.
- **Say plainly that nothing typed reaches Claude**, since the page runs in the
  user's browser and there is no channel back. Persist answers in
  `localStorage`, bump the storage key each pass so integrated answers do not
  reappear, and give a compile block with both a select-all textarea and a
  real file save through the `downloads` capability, which the user can then
  have Claude read off disk.
- **Hide the progress bar and the compile block once nothing is pending**, and
  swap in a closing panel naming where each decision now lives.
- **Add an `@media print` block** so the shared page exports to PDF by itself:
  force the light palette (a reader in dark mode would otherwise print light
  text on dark), `print-color-adjust: exact` or the browsers drop every fill,
  and `break-inside: avoid` on the cards so none is split across pages.
- **Before exporting the final state to PDF**, ask whether the user wants to
  keep the conversation for every decision block or only export the final
  decision of each block.

The durable output is not the page: rulings go to the authoritative file,
and the artifact is the surface that produced them.
