# Design references

One reference per design, stored as a pair.

```
hero.png    the image. gitignored, because it is a binary and often not ours.
hero.md     the spec. committed, because it is small and it is the real value.
```

The spec is what survives. It records where the reference came from, so a URL
can be recaptured and a pasted image is at least accounted for. Work from the
spec, not from raw pixels.

Capture paths:

| Reference type | How |
|---|---|
| Pasted image | Save it here, then write the spec beside it |
| URL | `pnpm shot https://example.com`, then write the spec |
| Figma | Figma MCP returns real values, so prefer it when available |

Use `_template.md` as the starting point.
