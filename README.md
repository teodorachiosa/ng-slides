# ng-slides (WIP)

A way to make multi-lingual presentations locally, using Angular.

## Motivation

I hate working with PowerPoint and I hate copy-pasting content between similar presentations.

## Done:

- [x] Add Max width / Zoom option
- [x] Add fullscreen option (via "Present" button)
- [x] Add keyboard navigation
  - [x] `Ctrl` + `F5` for fullscreen
  - [x] `Left arrow` and `Page up`, in fullscreen mode, for slide navigation
  - [x] `Right arrow` and `Page down`, in fullscreen mode, for slide navigation
  - [x] `Home` for going to the first slide and `End` for going to the last slide, in fullscreen mode
- [x] Add markdown support
- [x] Add reusable components support (reuse groups of slides)
- [x] Add dark mode
- [x] Add slide number

## To do:

- [ ] Save presentation as PDF
- [ ] Language switcher and i18n setup
- [ ] Jump to page option
- [ ] Save settings to cookies
- [ ] Add routing (switch between slide decks)

## How to run

- fork/clone/download this project to use as a template
- run `npm install` in the "ng-slides" folder
- run `npm run start` for local development
- edit the example slide deck
- (optional) create a GitHub Pages workflow to host the slides online
