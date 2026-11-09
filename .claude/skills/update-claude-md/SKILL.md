---
name: update-claude-md
description: >
  Updates CLAUDE.md after implementing a feature, fixing a bug, or making any meaningful change to the project.
  Use this skill whenever a feature is complete, a new route or component is added, the stack changes,
  a new package is created, environment variables are added, or the user says something like "done", "finished",
  "commit this", "let's wrap up", "update the docs", or "update CLAUDE.md".
  Also trigger proactively at the end of any implementation session without being asked.
---

# Update CLAUDE.md

After implementing a feature or making a meaningful change, CLAUDE.md must stay in sync with reality.
Out-of-date docs are worse than no docs — they mislead future work.

## What to update

Read the current `CLAUDE.md`, then compare it with what actually changed. Update only what's relevant to the change.

**Always check and update these sections if affected:**

1. **Реализованные фичи** — move items from «В очереди» to «Реализованные фичи», or add new items
2. **В очереди** — add newly discovered TODOs, remove completed ones
3. **Роуты** (web/admin tables) — add/remove/rename routes
4. **packages/ui — компоненты** — list new components added to `@globbing/ui`
5. **packages/types — домены** — list new types or modified interfaces
6. **Переменные окружения** — add any new env vars with comments
7. **Архитектурные решения** — document non-obvious patterns, workarounds, or constraints discovered

**Do not update** things that didn't change. Don't add noise.

## How to do it

1. Read `CLAUDE.md`
2. Check what actually changed: read the modified files, new routes, new components
3. Make minimal, precise edits — add, remove, or update only the affected lines
4. Keep the same structure and style as the existing file
5. Use past-tense checkboxes for completed items: `- [x] Feature name`
6. Keep descriptions short — one line per item is usually enough

## Style rules

- Russian language throughout (matches the existing file)
- No trailing comments about "added in this session" or "updated by Claude" — just the facts
- Checkbox items in «Реализованные фичи»: `- [x] Short description`
- Checkbox items in «В очереди»: `- [ ] Short description`
- Route tables: `| /path | Название страницы | Auth |`
- Don't add a timestamp or changelog — git history is the changelog

## Example

If you added a new `/invoices/:id` route to apps/web and a new `InvoiceDetailPage` component:

```markdown
<!-- In apps/web роуты table, add: -->
| `/invoices/:id` | Карточка счёта | Protected |

<!-- In Реализованные фичи, add: -->
- [x] Страница карточки счёта (apps/web)
```

That's it — no more, no less.
