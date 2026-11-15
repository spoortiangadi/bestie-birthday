/* =========================================================
   EDIT EVERYTHING HERE — this is all the personal content
   ========================================================= */
const CONFIG = {
  name: "Bestie",                 // her name or nickname
  age: 25,                        // set to null to hide
  from: "Your favourite person",  // your name
  heroLine: "Today the whole internet is celebrating you. Okay, mostly just me, but loudly.",

  letter: [
    "Happy birthday to my engineering friend who somehow turned into my forever bestie.",
    "We survived classes, assignments, exams and endless canteen chats together, and years later you are still right here with me. That means more than I can ever say.",
    "By your next birthday I will be married, but nothing changes between us. You will always be my priority, my secret keeper and my favourite person.",
    "Stay this sweet, keep smiling, and have the happiest birthday ever."
  ],

  // Put your images in public/photos/ and write the file name, e.g. import.meta.env.BASE_URL + "photos/1.jpg".
  // Leave src empty to show a placeholder.
  photos: [
    { src: import.meta.env.BASE_URL + "photos/together.jpeg", caption: "Twinning in white, as always" },
    { src: import.meta.env.BASE_URL + "photos/together1.jpeg", caption: "Holding hands, spilling all the gossip" },
    { src: import.meta.env.BASE_URL + "photos/together2.jpeg", caption: "Saree day, best day" },
    { src: import.meta.env.BASE_URL + "photos/together4.jpeg", caption: "Two desi girls, all dressed up" },
    { src: import.meta.env.BASE_URL + "photos/together%203.jpeg", caption: "A bestie kiss for the bestie" },
    { src: import.meta.env.BASE_URL + "photos/together%205.jpeg", caption: "Us, forever" }
  ],

  reasons: [
    { front: "Your smile", back: "One look at it and my whole day gets better." },
    { front: "Your loyalty", back: "You have defended me in rooms I wasn't even in." },
    { front: "Your style", back: "Saree or casual, you always look like the main character." },
    { front: "My secret keeper", back: "I share everything with you, and every secret stays safe with you." },
    { front: "Your heart", back: "You care about people more than anyone I know." },
    { front: "You're you", back: "No reason needed. You're simply my favourite." }
  ],

  timeline: [
    { when: "Where it started", title: "We met", text: "I had no idea I was meeting my person." },
    { when: "Soon after", title: "You became my bestie", text: "From friends to besties, and you've been my person ever since." },
    { when: "Every ride", title: "My scooty rider", text: "You ride, I sit behind you, and every trip turns into an adventure." },
    { when: "Today", title: "Your birthday", text: "Another year of you being amazing. Let's go." }
  ],

  finale: "Here's to more trips, more gossip, more bad photos and more years of us. I love you to bits."
};

export default CONFIG;
