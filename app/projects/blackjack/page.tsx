import ProjectPage from "@/lib/pages/projectPage"
import React from "react"

export default function page() {
  return (
    <ProjectPage
      title="BlackJack"
      imageUrl="/labels/blackjack.png"
      stack={["Java", "Figma"]}
      projectUrl="/files/blackJack.jar"
      description="This is my personal take on the classic BlackJack card game — I built the core game logic in Java and designed the UI flow in Figma. I focused on creating clean, object-oriented code to model hands, rules and betting, handling edge cases like splits and insurance along the way. Working on this project taught me a lot about state management, testable design and user-focused interactions; it began as a learning exercise and grew into a playable, polished demo that reflects how I approach problem solving and UX."
      text2="Download"
    />
  )
}
