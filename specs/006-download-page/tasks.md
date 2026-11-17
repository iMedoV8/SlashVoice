# Tasks: A download page to share

- [x] T001 Write `tests-look/site.test.ts` and see it fail
- [x] T002 Build `site/`: English page, Arabic page, stylesheet, fonts, paper tile, icon, headers (makes T001 pass)
- [x] T003 Add the typefaces' notices to `CREDITS.md`
- [x] T004 Check in a browser at 1440 and 390, English and Arabic; fix what it shows
- [x] T005 Local gate
- [x] T006 Deploy on Vercel (2026-11-17, project `slash-voice`, from the local `site/` folder with the Vercel CLI 65.8.0). Not as planned: the first deployment of a new project goes to production, so the page was public at once at `https://slash-voice.vercel.app`, before the founder's approval
- [ ] T007 The founder approves the live page. To update it after a change, run `npx vercel@65.8.0 deploy --prod` in `site/`; it is not linked to the repository
