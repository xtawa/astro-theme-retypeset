# Feature Review Checklist

This document serves as a checklist to review the display effects and functionality of various features in the blog theme.

## Homepage Features

- [ ] **Homepage Tags Display**
    - [ ] Verify that tags appear at the top of the homepage when `global.showTagsOnHome` is `true` and `pages.tags` is `false`.
    - [ ] Verify that tags are **hidden** from the homepage when `pages.tags` is `true` (even if `showTagsOnHome` is `true`).
    - [ ] Check if the tags list is scrollable horizontally with left/right buttons.
    - [ ] Ensure the "Left" button is hidden at the start and "Right" button is hidden at the end.
    - [ ] Verify that clicking a tag navigates to the correct tag page.

## Page Visibility Settings

- [ ] **Page Toggle Test**
    - [ ] Toggle `pages.posts` in `config.ts` and verify "Posts" link visibility in Navbar.
    - [ ] Toggle `pages.casual` in `config.ts` and verify "Casual" link visibility in Navbar.
    - [ ] Toggle `pages.tags` in `config.ts` and verify "Tags" link visibility in Navbar.
    - [ ] Toggle `pages.search` in `config.ts` and verify "Search" link visibility in Navbar.
    - [ ] Toggle `pages.about` in `config.ts` and verify "About" link visibility in Navbar.
    - [ ] Toggle `pages.stats` in `config.ts` and verify "Stats" link visibility in Navbar.
    - [ ] Toggle `pages.friends` in `config.ts` and verify "Friends" link visibility in Navbar.

## Friends Page

- [ ] **Friends Page Functionality**
    - [ ] Verify `/friends` route is accessible when `pages.friends` is `true`.
    - [ ] Check if friend cards are displayed correctly based on `src/friends.ts`.
    - [ ] Verify friend links work correctly.
    - [ ] Check responsive design of the friends grid.



## Language & Routing

- [ ] **Default Language (Chinese)**
    - [ ] Verify that the root URL (`/`) displays content in Chinese (`zh`).
    - [ ] Verify that navigation links on the homepage point to Chinese pages (e.g., `/posts/...`, `/about/`).
- [ ] **Secondary Language (English)**
    - [ ] Verify that accessing `/en/` displays content in English.
    - [ ] Verify that navigation links on the English homepage point to English pages (e.g., `/en/posts/...`, `/en/about/`).
- [ ] **Language Switching**
    - [ ] Verify that there is no language switcher if not implemented (or check if one exists and works).
    - [ ] Verify that manually changing the URL from `/` to `/en/` works correctly.
