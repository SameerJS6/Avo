# Avo - Full Stack Todo App

Avo is a full-stack Todo application built using Firebase, Framer Motion, etc. It provides a user-friendly interface for creating, organizing, and tracking your to-do items, whether you're using it for personal or professional tasks.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Mockups](#mockups)
- [Build Process](#build-process)
- [Built With](#built-with)
- [Challenges Faced](#challenges-faced)
- [Acknowledgments](#acknowledgments)

## Demo

![](/mockups/Avo.mp4)
<video src="/mockups/Avo.mp4" width="640" height="480" controls></video>
- You can try out a live demo of Avo [here](https://avo-todo.netlify.app/).

## Features

- **Complete Task Control**: Perform essential CRUD operations with ease—create, read, update, and delete tasks effortlessly.
- **Security First**: Robust user authentication, authorization, and Google login using Firebase Authentication ensure your data is secure.
- **Real-Time** Sync: Enjoy seamless data persistence as tasks are saved and synchronized in real-time.
- **Drag and Drop**: Reorganize your tasks effortlessly with drag-and-drop functionality.
- **Effortless Filtering**: Sort your todos with a breeze—active todos, completed todos, or view them all at once.
- **Protected Access**: Your personal Todo Dashboard is accessible only to logged-in users.
- **Smooth Loading**: Experience smooth data retrieval with Skeleton Loading while fetching todos from Firebase.
- **Responsive Design**: Whether you're on a desktop or mobile device, Avo adapts and provides a seamless experience.

## Mockups
![](/mockups/mobile.jpg)
![](/mockups/desktop.jpg)
![](/mockups/mobile2.jpg)
## Build Process

So, here's how this project unfolded:

### Inception 🌱

I kicked off this project as a way to dip my toes into Firebase for the first time. It all started with a simple thought: `"Let's test Firebase authentication."` However, my initial attempt at authentication had its `quirks`, but no worries—it was just a test run.

### Transition to noteSync 📝

Once I had authentication up and running for [noteSync](https://github.com/SameerJS6/NoteSync/), then I realized I was going to use Firestore Database for noteSync, so why not give that a test run as well? The thought crossed my mind: `"Hey, why not build a to-do app?"` It was something I'd never done before.

### Birth of Avo 🥑

With that spark of inspiration, I embarked on creating a Full Stack To-Do Application, which I affectionately named `"Avo"`. At first, I thought it would be a `piece of cake`, but as history would have it, my projects often prove to be more challenging than anticipated.

### Authentication Smooth Sailing 🚤

Thankfully, since I had already tackled authentication in [noteSync](https://github.com/SameerJS6/NoteSync/), setting up authentication for Avo was a breeze. It took me just 15-20 minutes to get a basic login and signup system in place. But why stop there? I added error handling, toast messages for updates, and fine-tuned the user interface for a polished authentication experience.

### Crafting the UI 🎨

Next on my list was creating a user-friendly interface for adding to-dos and the overall app layout. When I introduced the "Create To-Do" modal, I also ventured into the realm of Firestore for the first time. The structure for the to-do database was straightforward, as I was a newcomer to this. I established a collection called "Todos," with each document representing an individual to-do item. This setup paved the way for me to dive into the challenging world of CRUD (Create, Read, Update, Delete) functionality.

### The Journey of CRUD ✨

CRUD, you say? Well, it wasn't a walk in the park. Reading data from Firestore had its quirks at first, but I eventually got the hang of it. I retrieved the data, stored it using `useState`, and seamlessly displayed those to-dos on the screen.

Creating to-dos took some time to grasp, but I conquered it. Deleting, surprisingly, turned out to be a breeze. However, the ultimate boss battle awaited: `"Edit"` functionality.

### Conquering the Edit Challenge 💪

Implementing the `"Edit"` functionality proved to be one of the most formidable tasks I've undertaken. Hours turned into days as I delved into Firebase documents, scoured Google searches, consulted ChatGPT, and binge-watched countless YouTube tutorials. But guess what? I emerged victorious, armed with newfound knowledge to tackle the challenge head-on.

### The Security Dilemma 🔐

Just when I thought the `hard part was over`, I made an alarming discovery. Despite my earlier assumptions, data security was a bit shaky. `If I created three to-dos with account A, someone logged in with account B could see, delete, create, and edit all those to-dos`. This was a glaring issue that demanded a solution.

### Firestore Rules and Database Restructuring 📜

Firestore rules became my new `nemesis`. I had to rewrite the rules and perform a complete overhaul of the database structure, changing how I stored data. It took me about 1-1.5 days to realize that my Firestore rules were correct; it was the data structure that needed a revamp.

With the guidance of Firebase documentation on rules, I restructured the database from a single "Todos" collection with documents to a structure that included user-specific collections. This alteration finally ensured that each user could only interact with their own to-dos.

### Polishing It Off ✨

With the correct structure in place, I shifted my focus to refining the finer details. I added various functionalities and UI components, including filtering options, a navigation bar, a landing page, and a mobile sidebar.

### Adding Some Motion 🕺

As I wrapped things up, I decided to sprinkle some animation magic using Framer Motion. It was my first time experimenting with it, but thanks to an excellent tutorial by [Sam Selikoff](https://www.youtube.com/@samselikoff), it was a breeze.

### The Surprise Element: Drag and Drop 🎉

While admiring my creation, `imposter` syndrome crept in. I felt like my project needed something extra. And what could be fancier than implementing Drag and Drop functionality?

### A Handy Library Discovery 📚

Realizing that building it from scratch was a daunting task, I scoured the web for a suitable React DnD (Drag and Drop) library. I stumbled upon the [DndKit React Library](https://dndkit.com/), which proved to be a handy choice. With a plethora of tutorials available, it only took me 2-3 hours to implement this feature.

### Conclusion 🏁

And there you have it! What began as a humble project to test authentication ultimately transformed into Avo—a fully functional Full Stack To-Do Application. The journey took about 4-5 days, but it was worth every moment.

## Built With

Avo is built using the following technologies:

- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
- [Dnd Kit](https://dndkit.com/)
- [React](https://react.dev/)

## Challenges Faced

The journey of crafting Avo - the Full Stack Todo App - was filled with twists and turns, each presenting a unique challenge. These hurdles pushed my problem-solving skills to the limit, and here's how I conquered them:

### Authentication 🛡️

Setting up a solid authentication system was the first mountain to climb. It was all about ensuring that only the right folks could access the app. Think of it as the digital gatekeeper: user registration and login were my trusty tools.

### Firestore Rules 🔒

Configuring Firestore rules was like putting up invisible force fields around the data. I needed to make sure that users could only interact with what they were supposed to. This meant defining the rules of engagement for reading, writing, updating, and deleting data in Firestore.

### Firestore Database Structure 🗄️

Organizing data is like tidying up your digital closet. I had to figure out the perfect layout for storing everything efficiently. Think of it as creating folders on your computer to keep everything neat and tidy.

### Filtering 🧹

Implementing the "All," "Active," and "Completed" filters was like adding magical sorting hats to your todos. These filters allowed users to easily categorize and view their tasks, making their todo experience as smooth as butter.

### Implementing Edit Functionality 🖊️

Enabling users to tweak their todos without causing chaos was quite the puzzle. This task involved building edit forms, creating validation checks, and ensuring that everything worked seamlessly during the editing dance.

### User-Authenticated Data 🙌

Guarding the sanctity of user-created data was crucial. I wanted to make sure that each user had exclusive control over their todos. Imagine it as having your own secret vault where you're the only one with the key.

### Drag and Drop 🚀

The pièce de résistance was adding the slick drag-and-drop feature. It's like having a superpower that lets you rearrange your todos effortlessly. Just grab and move stuff around, and voilà! It's all about making your todo journey a breeze.

These challenges, while demanding, were also incredibly rewarding. They shaped Avo into the user-friendly and feature-rich Full Stack Todo App it is today. 🚀

## Acknowledgments

I want to give a big shoutout to these amazing folks who made a real difference during this project:

- [**Sam Selikoff:**](<(https://www.youtube.com/@samselikoff)>) Big thanks to Sam for his awesome Framer Motion animation tutorial. It seriously brought some magic to this app!

- [**Pedro Tech:**](https://www.youtube.com/@PedroTechnologies) Huge props to Pedro Tech for his super-helpful Firebase authentication resources. They made our authentication rock-solid.

These guys are the real MVPs, and I can't thank them enough for sharing their knowledge with the developer community. 🚀
