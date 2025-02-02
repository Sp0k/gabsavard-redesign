---
title: "Using NeoVim in 2025"
date: 2025-01-28 12:00:00
description: "My experience and thoughts after using NeoVim as my main IDE for a year, updated for 2025"
author: "Gab 'Sp0k' Savard"
tags: ["review", "tutorial", "guide", "terminal"]
image:
  url: "../../../public/pictures/posts/using-neovim-in-2025/cover_image.png"
  alt: "Screenshot of Borealis (My personal NeoVim config)"
---

Late last year, I got the chance to give a workshop on _Vim_ and _NeoVim_ alongside a friend of mine for Shiftkey Labs. This made me realized that even though I had been using _NeoVim_ more or less full-time for almost a year at the time (even longer for specific class project), I had never taken the time to write my thoughts about it down anywhere. Two events finally pushed me to write this article. My first reason was my personal Linux server that I built in November [^1] and I realized I didn't want to reuse LazyVim and felt ready to build my own config, and the second reason was my two Co-ops, where I used _NeoVim_ for the first term and vim keybindings in _VS Code_ for my current one. Those two reasons really convinced me to write this article, but first, let's go back to the basics.

## What is NeoVim?

In case you haven't heard about _NeoVim_ before, you might be asking yourself what it is? NeoVim is a described by its creators as

> a Vim-based text editor engineered for extensibility and usability, to encourage new applications and contributions.

In other words, _NeoVim_ is a modern text editor that is extensible and builds upon the foundation of Vim (an older text editor). It's designed to improved Vim's performance, maintainability, and usability. It supports Lua as its primary scripting language, which allows users to create powerful and efficient plugins and configurations. _NeoVim_ ships with built-in support for asynchronous plugins, a robust plugin ecosystem, and features like tree-sitter for advanced syntax highlighting. It is highly customizable for developers like us seeking a fast, minimal, and feature-rich coding environment. It retains Vim's modal editing approach, making it a favourite for users who prioritize keyboard-driven workflows.

## Why use NeoVim?

As I explained above, _NeoVim_ is a fast but minimal coding environment, and as it ships, it is not an IDE. Which begs the question "**Why use _NeoVim_ in 2025?**" and honestly, if we're only looking at _NeoVim_ how it's shipped, there isn't actually any reason to use _NeoVim_ in 2025 in my opinion. The editor misses a lot of features that modern IDE all have off the bat. But the difference between _NeoVim_ and modern IDEs is that the former can be highly customized without too much effort and with more or less help depending on your skill level or your need.

With the correct _NeoVim_ config, it can truly become more powerful than most IDEs and much faster. I personally have not regretted switching to _NeoVim_ since I changed over. And if you don't want to spend too much time building a custom config to perfectly fit your needs, you can find configs (like LazyVim) that you can download and customize to fit your needs a little more. I myself started with LazyVim and used it until around last November when I wrote my first config. But with a little research, you will most likely find the plugins that you would like and how to easily add them to your build.

So, to summarize this section, _NeoVim_ is a good code editor to use in 2025 because of how customizable and fast it is. It's also a perfect fit for Linux users in my opinion.

## Making you own config

One of the most fun part of _NeoVim_ in my opinion is creating your own config. I personally wrote my first config in November of last year and recentky wrote a new one again this month. I find that building your own config is really fun. Not only do you get to learn languages like Lua if you don't already know it, since that's the main language used for _NeoVim_ configs, but you also get to completely customize your IDE. I personally based my latest config on <a href="https://www.youtube.com/@joseanmartinez" target="_blank">Josean Martinez</a>'s config for 2024. I followed his basic config blog post and added extra plugins that I like a lot, like Noice for example.

The beauty of an editor like _NeoVim_ is that, being an open-source tool, it has a huge community of dedicated programmers and users that create new plugins for it all the time, which can really bring the editor to a whole new level. I myself recently found out you could implement a debugger directly into your config, which combined with autocompletion, LSP and git integration, it allows _NeoVim_ to compete with other modern IDEs. I've even recently found that you can implement plugins that bring A.I. into your config. So you really get to build your perfect IDE without spending any money on it (just a lot of time).

## My Recommendations

Before you just jump into _NeoVim_ as your main IDE, I would recommend a few things. Firstly, I wouldn't necessarily just build your own config right away. As much fun as it can be, it is a lot of work, and I find that I couldn't do it properly myself on the first try and needed to try it a second time with help. I think that beginners would be better off actually starting with a premade config like <a href="https://www.lazyvim.org/" target="_blank">LazyVim</a> or <a href="https://astronvim.com/" target="_blank">Astro Nvim</a>. These premade configs come packed with a bunch of features that are all setup for you and easy to use, but they also let you customize these features or add more plugins easily.

I would also recommend checking out <a href="https://vim.rtorr.com/" target="_blank">the vim cheat sheet</a> and _vim tutor_ to familiarize yourself a bit with the vim keys and commands. Like most people will tell you, the vim keys (also used in _NeoVim_) are not intuitive, so having a reference at first will be very useful as you get used to the keybinds and comfortable.

Lastly, have fun with it. Switching to _NeoVim_ should not feel like a chore or be difficult. Don't expect to jump in and be a pro, if you take your time and nake sure to enjoy using _NeoVim_, you'll get better in no time. _NeoVim_ has a very steep learning curve in my experience, but it can be a lot of fun to use once you get into it and does make your workflow much faster. It also is very easy to use on a terminal if you were thinking of becoming a terminal user.

[^1]: An article about this project is coming soon
