# Feature Specification: A download page to share

**Feature Branch**: `task/006-download-page`

**Feature folder**: `specs/006-download-page`

**Created**: 2026-11-16

**Status**: Clarified

**Input**: The founder, 2026-11-16: "give to me a page that I can share with my friends, for them to download it." Asked where it should live, he chose a small page of its own on Vercel, not the unreleased Slash website. Asked how to approve the design, he chose a preview link, "but I want the same style as the main slash website".

## User Scenarios & Testing _(mandatory)_

### User Story 1 - A friend downloads Slash Voice from one link (Priority: P1)

A friend opens the link on a Windows PC or a Mac. The page says what Slash Voice is, offers the installer for each system, and tells them what the system will warn about and how to get past it.

**Independent Test**: Open the page; follow each download link.

**Acceptance Scenarios**:

1. **Given** the page, **When** a download is chosen, **Then** the file comes from the published release of the app's current version.
2. **Given** the page at 390 and at 1440 pixels wide, **When** it is read, **Then** nothing is cut off and nothing scrolls sideways.
3. **Given** the Arabic page, **When** it is read, **Then** it runs right to left and system names and file names stay left to right.
4. **Given** a keyboard only, **When** the page is used, **Then** every link is reachable with a visible focus mark.

### User Story 2 - The page looks like the Slash website (Priority: P1)

The page uses the website's colours, typefaces, paper ground, logo and the one red thread, so it reads as part of the same family.

**Acceptance Scenarios**:

1. **Given** the page's stylesheet, **When** its colours are read, **Then** they are the website's token values.

### Edge Cases

- Scripts turned off: the page has none and works the same.
- Reduced motion: nothing moves.
- A new app version: the page's links must change with it; a check fails until they do.

## Requirements _(mandatory)_

### Requirements covered

| Requirement                                              | Defined in                                            | Shown to be met by                                          |
| -------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------- |
| A shareable page with download links for Mac and Windows | The founder's instruction                             | Story 1; `tests-look/site.test.ts`                          |
| The website's style                                      | The founder's answer                                  | Story 2; the token check                                    |
| English and Arabic, right to left                        | `AGENTS.md`, "Rules of this repository"               | Scenario 3                                                  |
| No tracker, no analytics, nothing loaded from elsewhere  | `RULES.md` §3                                         | The page has no script and a strict content policy; checked |
| Design approved before it is public                      | `RULES.md` §8, as varied by the founder for this page | A preview link first                                        |

**Decision recorded here:** the founder varied the Pencil-first rule for this page: he approves it on a preview link. The website's style is used at his instruction; its values and its paper tile are copied from the private website repository, which is his.

### Gaps found

- The Arabic wording is a draft and has not been reviewed.
- The page names the Slash website's style but is not part of that website. It can move there when the website launches.

## Success Criteria _(mandatory)_

- **SC-001**: Both download links and the checksum link answer for a visitor who is not signed in.
- **SC-002**: The page loads nothing from any other host and runs no script.
- **SC-003**: The founder approves the preview before the page is made public.
