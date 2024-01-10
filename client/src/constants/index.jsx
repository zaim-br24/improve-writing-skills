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
    title: "Writing and Listening",
    subtitle: "Enhancing Your ability to express ideas coherently in writing.",
  },
  {
    image: vocabulary,
    title: "Vocabulary Building",
    subtitle: "Improve your vocabulary for better written expression.",
  },
  {
    image: brain,
    title: "Memorizing Sentences",
    subtitle:
      "Memorize sentences for practical application in real-life situations.",
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
