# Engineering Principles

It is a portfolio site. The best code is the code never written.

## The ladder

Before writing anything, walk this and stop at the first rung that works:

1. **Does this need to exist at all?** Speculative need → skip it.
2. **Does something here already do it?** Reuse it. **Look before you
   write.** A near-duplicate component is the most common bloat in this
   codebase.
3. **Does the platform do it?** CSS over JS. `<dialog>` over a modal library.
   `<input type="date">` over a picker. A DB constraint over app validation.
4. **Does an installed dependency do it?** Use it.
5. **Can it be one line?** One line.
6. **Only then:** the least code that works.

The ladder shortens the solution, never the reading. Understand what the
change touches first, then climb.

## Standing bans

None of these get added without an explicit decision:

| Banned | Because |
|---|---|
| A state management library | React state + router loaders are enough here |
| A component library (shadcn / MUI / full Radix) | We are *building* the design system; importing one defeats the point |
| An abstraction with one implementation | No interface for one class, no factory for one product, no wrapper for one call site |
| A config file or options object for a value that never changes | Use a constant |
| `organisms/` or `templates/` folders | `sections/` is what this site has |
| Barrel `index.ts` files | Break tree-shaking, inflate diffs |
| A new dependency for what a few lines can do | Every dependency is a permanent maintenance cost |
| framer-motion | Overlaps GSAP; two animation runtimes cause jank |

Bare `radix-ui` primitives are the one carve-out. They are allowed for accessible
dialog/dropdown **behaviour**, never for styling.

## Before adding a dependency

Answer all four, in the commit message or the PR:

1. What in the ladder failed?
2. How many lines would the hand-rolled version be?
3. What is its bundle cost?
4. Is it maintained?

If you cannot answer these, do not add it.

## Sizing

- Functions under 50 lines.
- Files under 800 lines, 200–400 typical.
- Nesting under 4 levels. Use early returns.
- More than ~5 props on a component means it is doing two jobs. Split it.

**Deletion beats addition. Boring beats clever.** Clever is what someone
decodes at 3am.

## Never simplify away

Laziness applies to structure, never to these:

- Input validation at trust boundaries
- Error handling that prevents data loss
- Security measures
- Accessibility basics: keyboard nav, focus states, reduced motion, alt text
- Anything explicitly requested

## Marking shortcuts

A deliberate simplification with a known ceiling gets a `ponytail:` comment
naming the ceiling and the upgrade path:

```ts
// ponytail: linear scan over ~40 events, index it if the list passes ~500
```

This keeps a shortcut tracked instead of rotting into "later means never".
