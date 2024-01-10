import brain from "../assets/images/brain.svg";
import vocabulary from "../assets/images/vocabulary.svg";
import writing from "../assets/images/writing.svg";

const levels = [
  {
    level: "beginner",
  },
  {
    level: "intermediate",
  },
  {
    level: "advanced",
  },
];

const languages = [
  {
    name: "English",
  },
];
const benefits = [
  {
    image: writing,
    title: "Enhanced Writing Skills through Listening",
    subtitle: "Enhancing Your ability to express ideas coherently in writing.", 
  },
  {
    image: vocabulary,
    title: "Vocabulary Building through Listening and Writing",
    subtitle:
      "Boosting the number of words in your vocabulary and allowing for more complex expressions in written communication.",
  },
  {
    image: brain,
    title: "Memorizing Sentences for Real-World Application",
    subtitle: "Fostering effective written communication in everyday life.",
  },
];

const sidebarLinks = [
  {
    name: "general",
    link: "/settings",
  },
  {
    name: "edit profile",
    link: "profile",
  },
  {
    name: "practice",
    link: "practice",
  },
  {
    name: "level",
    link: "level",
  },
  {
    name: "password",
    link: "password",
  },
];

export { levels, languages, benefits, sidebarLinks };
