# What's new

Slash Voice's own notes, one Markdown file per version, built into the app:

```text
src/content/whats-new/0.2.0.md      English
src/content/whats-new/0.2.0.ar.md   Arabic (any language code works the same way)
```

Home shows the note of the installed version (or the newest older one) as a
short list, and the window after an update shows the newest note the user has
not seen. A language without its own file gets the English note.

Write a few list items in plain words about what changed for the user. Nothing
here is fetched from the internet.

(`src/content/release-notes/` was Handy's folder for its notes; it stays empty.)
