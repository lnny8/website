import ProjectPage from "@/lib/pages/projectPage"
import React from "react"

export default function Page() {
  return <ProjectPage title={"Bubble Shooter"} date="2025" imageUrl={"/labels/bubble-shooter.png"} projectUrl={"/files/bubbleShooter.exe"} text2="Download" description={"A fun and engaging bubble shooter game."} stack={["Python", "Pygame", "Figma", "SoundLAB", "PyInstaller"]} />
}
