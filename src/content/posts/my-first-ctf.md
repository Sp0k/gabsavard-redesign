---
title: "My First Capture The Flag"
date: 2024-07-11
description: "I recently got the chance to participate in my first CTF hosted by ShiftKey Labs!"
author: "Gab 'Sp0k' Savard"
tags: ["cybersecurity", "event", "hackathon", "school", "dalhousie"]
image:
  url: "/pictures/posts/my-first-ctf/htb_cover_1.png"
  alt: "Logos of HTB and ShiftKey Labs"
---

On the 29th of June of this year, I got to participate in my first **HTB Capture The Flag** event.
I was joined by my sister and a few friends for the day. It was the first time any of us
actually participated in such an event and none of us had ever actually done any cybersecurity work
before. That being said, we still manage to end up 5th overall!

## The event

The event was a lot of fun. It started at around 10 am after a small presentation of what HTB was
and what to expect in challenges. I was also very happy to participate in an event that was
encouraging the use of Linux operating systems, since we don't see a lot of those at Dalhousie.

The CTF was comprised of 10 challenges, all of various difficulty. Each of them would award some
points to the team once completed, starting from 1000 and going down with each new team finishing.
The challenges were also divided in three categories: web, reverse engineering (R.E.) and misc.

We managed to finish 2/3 of the R.E. challenges and 2/3 of the misc challenges, but
none of the web challenges.

## The challenges

The challenges were a lot of fun to try. I especially enjoyed the R.E. challenges as those were the
ones I found myself understanding best. I solved both of the reverse engineering challenges we
managed to do, but could not figure out the last one.

My favourite challenge to solve made use of the _UPX_ tool, a packing and unpacking tool I had
never seen before but that was very easy to learn. I also liked this challenge because I was able
to do it without too much research.

My first instinct with the challenge was to open the file provided, which ended up being a binary
file. But inside the file was hiding this:

![Binary file's code](/pictures/posts/my-first-ctf/ctf_1.png)

I looked up the name UPX online and learned how to use the tool through a YouTube video. All I
needed to do now was to unpack the file. Which I was able to do by using the following command in
my terminal:

```bash
upx -d unpacking  # unpacking is the name of the file
```

Now, when I reopened the file in Neovim, I had access to the original code. And in this code,
was hiding a comment which contained the flag we were looking for!

![Unpacked code showing the flag](/pictures/posts/my-first-ctf/ctf_2.png)

This happened to be our first flag, so after a few hours of not being able to solve anything, it
felt really good to finally get a flag!

## Final thoughts

This event did create a small interest in cybersecurity for me. I would not see myself work in this
field, but it is clearly an interesting field to tinker with and learn about. I especially found
a small interest in reverse engineering. And even though we did not win anything and didn't make it
to the podium, we still ended up 5th overall, which to me is more than enough since I walked in to
the event expecting to be much lower on the leaderboard. The most important thing to me is that I
got to spend a day doing something new with some friends and got to learn new skills along the way!
