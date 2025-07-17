export const gameContent = {
  level1: {
    title: "The Forest of Tales",
    character: "Ollie the Owl",
    story: "Ollie the Owl loves stories but forgets how they go! Help him put the story in the right order.",
    puzzle: {
      prompt: "The bunny was hungry.",
      parts: ["The bunny ate the carrot.", "The bunny found a carrot.", "He searched for food."],
      correctOrder: ["The bunny was hungry.", "He searched for food.", "The bunny found a carrot.", "The bunny ate the carrot."]
    }
  },
  level2: {
    title: "The Word Swamp",
    character: "Wiggle the Word Worm",
    story: "Wiggle the Word Worm has mixed up all the words! Help Leo unscramble them.",
    words: ["APPLE", "LION", "SUNNY", "SMILE"]
  },
  level3: {
    title: "The Cave of Echoes",
    character: "Mina the Mouse",
    story: "Mina the Mouse only repeats part of each word. Fill in the missing letters!",
    words: [
      { word: "TIGER", gap: "T_GER" },
      { word: "WATER", gap: "WA_ER" },
      { word: "HOUSE", gap: "HOU_E" }
    ]
  },
  level4: {
    title: "The Rhyme River",
    character: "Raffy the Raccoon",
    story: "Help Raffy find words that rhyme to build a musical bridge!",
    pairs: [
      { word: "CAT", rhyme: "HAT" },
      { word: "DOG", rhyme: "LOG" },
      { word: "BUG", rhyme: "RUG" },
      { word: "PEN", rhyme: "HEN" }
    ]
  },
  level5: {
    title: "The Castle of Clarity",
    character: "Queen Clarity",
    story: "To open the Golden Book, build clear sentences for Queen Clarity!",
    sentences: [
      ["THE", "SUN", "IS", "SHINING"],
      ["LEO", "IS", "A", "LION"],
      ["READING", "IS", "FUN"]
    ]
  }
};