# Built screens against the stills

Captures in `evidence/` come from the screens preview with sample data (the counter's numbers are made up for the picture: 214 dictations, 12,000 spoken words, 480 from files, 95 minutes of speech). Stills: `design/stills/own-look-c-09-home-*`, `own-look-c-10-appearance-*`.

## Home

| Still                                          | Built                                                               | Why                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- |
| "since 18 November"                            | The date in the app language's own order ("November 18" in English) | The system's date format, not a fixed one                   |
| Arabic time saved "3:40", label "ساعة وفّرتها" | "3 س 25 د", label "وفّرتها"                                         | Pencil could not lay out Arabic beside digits; the app can  |
| "اختر نموذجًا للعربية"                         | "اختر نموذجًا يسمع العربية"                                         | One sentence that works with any list of languages          |
| What's new 0.2.1, three lines                  | 0.2.0, four lines, from `src/content/whats-new/`                    | The real notes for the next version                         |
| "Add the names you use" open                   | Ticked in the capture                                               | The sample settings have words; it ticks from what was done |
| Numbers 25 px                                  | 24 px                                                               | "3 h 25 min" fits its column at the window's narrowest      |

## Appearance

| Still                         | Built                                                         | Why                                                 |
| ----------------------------- | ------------------------------------------------------------- | --------------------------------------------------- |
| System chosen                 | Whatever the setting is (Dark or Light in the captures)       | The cards show the real setting                     |
| Window pictures drawn by hand | Drawn from the real light and dark colours                    | They change if the palette does                     |
| Arabic not drawn              | "شارة التسجيل" and "موضع الشارة"; cards and arrow keys mirror | New words, proposed here for the founder to approve |

Not compared: Windows (no Windows build of this branch yet).
