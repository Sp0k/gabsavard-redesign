# gabsavard.com Redesign

This is the code for my personal [website](https://gabsavard.com). I am using this opportunity to continue learning the **Astrojs** framework as well as the **React** and **Tailwind**. My goal is to not only design and build a complete website containing a projects, a blog and a contact form. I will take inspiration from my other _Astrojs_ project for some of my components. Eventually, this website will be deployed through **Netlify**.

## Table of Contents

- [Features](#features)
- [Project Structure](#project_structure)
- [License](#license)

## Features

I know websites usually don't have a feature part, especially when they use frameworks like Astro that are more about being static. But I am using this section more as a checklist for what I want to do with my website:

- [ ] Home Page
  - [ ] Replace the hero image
  - [x] Salutation module
  - [x] Resume
  - [x] Landing
  - [x] Latest posts
  - [x] RSS Button
- [ ] Projects
  - [ ] Projects index page
    - [ ] Filter the projects by tags
    - [ ] Automatically updates with new projects
  - [ ] Project Page Layout
- [ ] Blog
  - [ ] Blog index page
    - [ ] Filter the blog articles by tags
    - [ ] Automatically updates with new articles
  - [ ] Blog article Layout
- [x] Contact Page
  - [x] Email form
  - [x] Socials list
- [x] About Page
- [ ] RSS Setup

## Project Structure

Here's an overview of the project structure:

```
Astro-website/
├── astro.config.mjs
├── LICENSE
├── node_modules/
│   └── (Too many modules to list here)
├── package.json
├── package-lock.json
├── public/
│   ├── favicon.ico
│   └── hero.png
├── README.md
├── src/
│   ├── components/
│   │   ├── HeroImage.jsx
│   │   ├── LatestPost.jsx
│   │   ├── Navigation.jsx
│   │   ├── ScrollView.jsx
│   │   └── SideBar.jsx
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── env.d.ts
├── tailwind.config.mjs
└── tsconfig.json
```

- public/: Static assets like images and icons.
- src/components/: Reusable components used throughout the site.
- src/layouts/: Layout components to structure different pages.
- src/pages/: Page components for different routes.
- src/styles/: Global style used when tailwind cannot be used.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

