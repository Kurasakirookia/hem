# Naming Conventions

One convention per kind of thing, applied everywhere. Consistency is what
makes the codebase greppable and refactorable.

## Frontend files

| Kind | Convention | Example |
|---|---|---|
| Component / page file | `PascalCase.tsx` | `EventTile.tsx` |
| Hook file | `useThing.ts` | `useScrollProgress.ts` |
| Util / lib file | `camelCase.ts` | `formatEventDate.ts` |
| Content file | `camelCase.ts` | `pastEvents.ts` |
| Type file | `camelCase.ts` | `event.ts` |
| CSS file | `kebab-case.css` | `tokens.css` |
| Static asset | `kebab-case.ext` | `hero-illustration.svg` |
| Unit test | `thing.test.ts` | `formatEventDate.test.ts` |
| E2E spec | `feature.spec.ts` | `contact-form.spec.ts` |

`.test.ts` vs `.spec.ts` is not cosmetic. It is how Vitest and Playwright
tell their suites apart. See [`testing.md`](testing.md).

## Frontend code

- Components and types: `PascalCase`. **No `I` prefix** on interfaces.
- Functions and variables: `camelCase`, descriptive over short.
- Booleans: `is` / `has` / `should` / `can` prefix, as in `isOpen`, `hasImage`,
  `shouldReduceMotion`.
- Constants: `UPPER_SNAKE_CASE`.
- Hooks: `use` prefix.
- Event handlers: `handleX` for the implementation, `onX` for the prop.
  `<Button onClick={handleSubmit} />`.
- **Exports:** `pages/` use `export default` (router convention). Everything
  else uses named exports, for better autoimport and safer renames.
- Test selectors: `data-testid="kebab-case"`. Never select on a class name.
  classes change with every restyle, testids do not.

## Design tokens

`--{category}-{name}[-{variant}]`, all lowercase kebab:

```
--color-text-muted    --font-display     --space-section
--text-3xl            --radius-md        --duration-reveal
```

Categories are fixed:

```
color   font   text   tracking   leading   space
width   gutter radius duration   ease      shadow   z
```

Adding a **new category** is a design-system decision, not a drive-by edit.
Adding a token *within* an existing category is routine. See
[`design-system.md`](design-system.md).

## Backend

- Modules, functions, variables: `snake_case`.
- Classes and SQLAlchemy models: `PascalCase`, **singular**, as in `Event`, not
  `Events`.
- Table names: `snake_case` **plural**, as in `events`.
- Pydantic schemas: `ThingCreate`, `ThingUpdate`, `ThingRead`.
- Env vars: `UPPER_SNAKE_CASE`, every one mirrored in `.env.example`.

## Routes and URLs

- Lowercase, kebab-case, plural for collections: `/events`, `/services`.
- API routes are namespaced under `/api` so the Vite dev proxy works.
- Dynamic segments use the resource's slug, not its id: `/events/:slug`.
