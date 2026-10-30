# Fonts

Every font here must allow **commercial web use**. This site advertises a
business, so personal-use licences do not apply. Keep the licence file beside
the font, named `<font>-LICENSE.txt`, so the terms are never in doubt.

| Font | Role | Licence |
|---|---|---|
| Gilda Display | Titles | SIL Open Font License 1.1. Commercial use, self-hosting and conversion allowed. See `gilda-display-LICENSE.txt`. |
| Switzer Variable | Body and UI | ITF Free Font License. Commercial use and self-hosting both allowed. See `switzer-LICENSE.txt`. |

**Gilda Display is a stand-in for Orange Avenue.** Orange Avenue was the
design choice, but the free file is a personal-use demo, and anything in
this folder ships with the build. Gilda Display was the closest free match
in contrast, weight and spacing, picked from twelve candidates. To switch
back, buy the licence at https://circlefont.com/product/orange-avenue/ and
add the licensed file here. Only the `@font-face` in `fonts.css` and
`--font-hero` in `tokens.css` change.

The WOFF2 is the Latin subset from Fontsource. It covers English. If copy
ever needs accents beyond basic Latin, fetch the latin-ext file too.

**Switzer may not be subsetted or format converted.** The licence forbids
both without written consent, so the WOFF2 here is exactly as Fontshare
ships it. Do not run it through a font tool. Switzer Italic is available in
the same download if something ever needs it.

Rejected, recorded so nobody tries again:

| Font | Why not |
|---|---|
| Wagon (Dirtyline Studio) | Personal use only. No commercial use. A paid licence exists at dirtylinestudio.com. |
| Dirtyline 36daysoftype 2022 | Licence was fine. Replaced by Orange Avenue on design grounds. In git history if wanted back. |
| Orange Avenue DEMO | Personal use only. Parked until licensed, see above. In git history. |
