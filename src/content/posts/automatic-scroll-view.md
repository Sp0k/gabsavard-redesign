---
title: "Automatic Scroll View"
date: 2024-06-08
description: "My quick and easy trick to follow the cursor's position in a TextInput component in React Native"
author: "Gab 'Sp0k' Savard"
tags: ["javascript", "react-native", "tutorial", "mobile app"]
image:
  url: "https://mobilecoderz.com/blog/wp-content/uploads/2022/04/React-Native-Featured-Image-2.png"
  alt: "An image showing a computer, a phone and the logos of Apple, Android and React Native"
---

This past May, I got certified for **React Native** development with my dad through Shift Key Labs. For certification, we had to develop a note taking app (which you can find [here](https://github.com/Sp0k/ShiftNotes)) and I got stuck on keeping the cursor in view of the user as they are typing in the app. As any beginner would, I search online, but the only solutions I could find online were making me modify the core react code, which I was not comfortable with. I was about to give up when I discovered that the cursor can return an x and y value and it can be used with the `scrollTo()` function. Here is how I ended fixing my issue.

## Prerequisites

You don't need to add anything to your project for this to work. But this will use the _TextInput_ and _ScrollView_ components and the _useState_ hook.

## Getting it done

We start by setting up a basic code to add the automatic scroll to:

```javascript
import { TextInput } from "react-native";

const AutoScrollTextInput = ({ defaultValue }) => {
  return (
    <TextInput
      placeholder="Message"
      placeholderTextColor={"grey"}
      multiline
      numberOfLine={4}
      defaultValue={defaultValue}
    />
  );
};

export default AutoScrollTextInput;
```

Above is a pretty basic and simple setup for a _TextInput_ component that accepts multiple lines of input. Goes without saying that this will only work on a multiline input.

Now that we have the _TextInput_ component set up, we can add our state and get the code position.

First, import the _useState()_ hook and the _ScrollView_ component:

```javascript
import { TextInput, ScrollView } from "react-native";
import { useState } from "react";
```

And create a state to keep track of the position of the cursor. The position of the cursor will be given to us through an object looking like this: `{ end: 0, start: 0 }`. We need to initially set the state to a similar object which will be updated every time the cursor moves.

```javascript
const AutoScrollTextInput = ({ defaultValue }) => {
  const [cursorPosition, setCursorPosition] = useState({ end: 0, start: 0 });

  return (
    <ScrollView>
      <TextInput
      // ...
      />
    </ScrollView>
  );
};
```

Now that we have our state keeping track of the cursor's position, we need to make sure it keeps track of which line the cursor is on so it can move the view accordingly. **React Native** offers a great way of doing that, _TextInput_ has a prop called _onSelectionChange_ which can accept a function which will be called every time the cursor's position is updated (whether it's x or y coordinates). This is how we will keep the position up to date:

```javascript
//...
<TextInput
  placeholder="Message"
  placeholderTextColor={"grey"}
  multiline
  numberOfLine={4}
  defaultValue={defaultValue}
  onSelectionChange={(event) => setCursorPosition(event.nativeEvent.selection)}
/>
```

I will not pretend to know exactly what `event.nativeEvent.selection` means, all I know and understand is that is returns the coordinates of the cursor. If **end** and **start** are the same, then the cursor is at one position and the user is in normal insert mode. However, if they are different, it means that the user is currently selecting/highlighting a part of the text. In our case though, we only care about the value of **end**.

Now that we always have the current position of the cursor, we'll take care of the _ScrollView_ to make sure that the view scrolls to the cursor's position. This also happens to be the last step.

Here's what we need to add to the _ScrollView_, I will explain each part after:

```javascript
 <ScrollView
  ref={(ref) => {
   this.scrollView = ref;
  }}
  onContentSizeChange={(x, y) =>
   this.scrollView.scrollTo({
    y: cursorPosition.end + 50,
    animated: true,
   })
  }
 >
  // ...
```

We added two props to our _ScrollView_, let's see what they do! First, the _ref_ prop creates a reference to the current view. That reference will be used right under to know which view to scroll. Second, we add the _onContentSizeChange_ prop. This prop accepts a function that will be called everytime the size of the view changes. This means that every time a new line is added, meaning every time the view becomes taller, the function inside _onContentSizeChange_ will be called. In our case, the function calls the _scrollTo_ hook inside of the view referenced above and by setting the y position to the _end_ value stored inside of the `cursorPosition` state and adding 50 to it. The value should be tweaked to match better your app's design.

And you're done! This is all the code needed to get an automatic scrolling view in **React Native**! In case you wanted to double your code, here is a complete version of the code we just wrote:

```javascript
import { TextInput, ScrollView } from "react-native";
import { useState } from "react";

const AutoScrollTextInput = ({ defaultValue }) => {
  const [cursorPosition, setCursorPosition] = useState({ end: 0, start: 0 });

  return (
    <ScrollView
      ref={(ref) => {
        this.scrollView = ref;
      }}
      onContentSizeChange={(x, y) =>
        this.scrollView.scrollTo({
          y: cursorPosition.end + 50,
          animated: true,
        })
      }
    >
      <TextInput
        placeholder="Message"
        placeholderTextColor={"grey"}
        multiline
        numberOfLine={4}
        defaultValue={defaultValue}
        onSelectionChange={(event) =>
          setCursorPosition(event.nativeEvent.selection)
        }
      />
    </ScrollView>
  );
};

export default AutoScrollTextInput;
```

## Final thoughts

As I mentioned at the beginning of the article, I found this way of automatically scrolling and haven't seen it anywhere else online. I don't think I am the first one to find it, but I seem to be the first one to share it. I find my way easier to do, especially for beginners, but I do know that more efficient ways of coding it. This is also my first tutorial, so feel free to send me a message if there is any errors in the code or explanation or if there is better ways to do it.
