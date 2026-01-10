import ProjectPage from "@/lib/pages/projectPage"
import React from "react"

export default function page() {
  return (
    <ProjectPage
      title="Flowline Logical Simulator"
      imageUrl="/labels/flowline.png"
      stack={["React", "React Flow", "Logical Simulation", "School Project"]}
      projectUrl="https://flowline.app"
      description="Flowline was originally made to replace an outdated program we used in school for logical circuit simulation. Built with React and React Flow, Flowline offers an intuitive interface for designing and simulating logical circuits. This project showcases my ability to create interactive web applications that solve real-world problems, enhancing both usability and functionality compared to traditional tools."
      text2="Start Building"
    />
  )
}
