# Karaoke Lab – Global Music Player & CMS

A full-featured web-based music player built with Nuxt 4, combining music playback, language learning, and content management.

---

## Overview

This project is a full-stack application that integrates:

- Music playback
- Synchronized lyrics
- Language learning features
- Admin CMS for content management

---

## Features

### Music Player

- Global music player with cross-page playback
- Integrated YouTube Player API
- Persistent playback across routes

### Lyrics System

- Synchronized lyrics with custom timing logic
- Multi-language translation display
- Structured lyric data handling

### Internationalization

- Supports:
  - Chinese
  - English
  - Japanese
  - Korean
- Built with scalable i18n architecture

### Learning Features

- Text-to-Speech for words and sentences
- Example sentences via Tatoeba API
- Context-based language learning

### Interactive Features

- Lyric quiz mode
  - Listen and type lyrics
  - Improves listening accuracy

### CMS (Admin Panel)

- Admin authentication
- Full CRUD system:
  - Create songs
  - Edit lyrics and timing
  - Delete content
- Content updates reflected on frontend

---

## Tech Stack

### Frontend

- Nuxt 4
- Vue 3
- TypeScript

### State Management

- Pinia
- pinia-plugin-persistedstate

### UI / Styling

- Tailwind CSS
- Headless UI

### Backend / Database

- MongoDB

### Authentication

- @sidebase/nuxt-auth (Credentials-based)

### Internationalization

- @nuxtjs/i18n

---

## API Integrations

- YouTube Player API  
  Music playback and control

- Google Text-to-Speech API  
  Audio generation for pronunciation

- Tatoeba API  
  Example sentence retrieval

---

## Technical Highlights

- SSR architecture using Nuxt 4
- Global audio state management with Pinia
- Custom lyric synchronization system
- Integration of multiple external APIs
- Built-in CMS within a single application
- JWT-based authentication with role control
- Consistent cross-page user experience

---

## Author

Winnie Chang
# ofufu
