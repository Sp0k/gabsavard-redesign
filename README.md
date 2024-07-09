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
- [x] Projects
  - [x] Projects index page
    - [x] Automatically updates with new projects
  - [x] Project Page Layout
- [x] Blog
  - [x] Blog index page
    - [x] Filter the blog articles by tags
    - [x] Automatically updates with new articles
  - [x] Blog article Layout
- [x] Contact Page
  - [x] Email form
  - [x] Socials list
- [x] About Page
- [x] RSS Setup
- [x] Make website responsive
  - [x] Home page
  - [x] Contact page
  - [x] Projects page
    - [x] project layouts
  - [x] Blog Page
    - [x] Blog article layouts
  - [x] About

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
│   ├── gs.svg
│   ├── gab_savard_resume.pdf
│   ├── hero.png
│   ├── pictures/
│   │     └── posts/
│   │          └── folders of images for each article
│   └── rss/
│       └── pretty-feed-v3.xsl
├── README.md
├── src/
│   ├── components/
│   │   ├── BlogCard.jsx
│   │   ├── BlogList.jsx
│   │   ├── ContactForm.jsx
│   │   ├── HeroImage.jsx
│   │   ├── LatestPost.jsx
│   │   ├── Navigation.jsx
│   │   ├── Salutations.jsx
│   │   ├── ScrollView.jsx
│   │   ├── SideBar.jsx
│   │   ├── SkillsTable.jsx
│   │   ├── SocialButton.astro
│   │   └── TagButton.jsx
│   ├── content/
│   │   ├── config.ts
│   │   └── posts/
│   │       └── (All blog posts)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── about.astro
│   │   ├── blog.astro
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   └── rss.xml.js
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
- src/contents/: The collections of content stored on the website.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
