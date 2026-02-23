export const projects = [
  {title: "Lonui", description: "A demo website", imageUrl: "/projects/lonui.png", link: "https://lonui.com", date: "2024", category: "Website", color: "#2d2527"},
  {title: "Flowline", description: "Logical Simulator", imageUrl: "/projects/flowline.png", link: "https://flowline.app", date: "2024", category: "Hardware", color: "#252d29"},
  {title: "QUAD·IO", description: "A cool box, more description soon...", imageUrl: "/projects/quadio.png", link: "/projects/quadio", date: "2025", category: "Hardware", color: "#28252d"},
  {title: "BlackJack in Java", description: "BlackJack written in Java", imageUrl: "/projects/blackjack.png", link: "/projects/blackjack", date: "2025", category: "Game", color: "#252a2d"},
  {title: "Blob Shader", description: "A cool shader written in Three.js", imageUrl: "/projects/blob-shader.png", link: "/projects/blob-shader", date: "2025", category: "Website", color: "#2d2a25"},
  {title: "Maze Generator", description: "Visualization of maze generation algorithms", imageUrl: "/projects/maze.png", link: "/projects/maze", date: "2025", category: "Website", color: "#252d2c"},
  {title: "Bubble Shooter", description: "A fun and engaging bubble shooter game.", imageUrl: "/projects/bubble-shooter.png", link: "/projects/bubble-shooter", date: "2025", category: "Game", color: "#262d25"},
]
export const projectCategories = ["Website", "Hardware", "Game"]

export const socials = {
  github: "https://github.com/lnny8",
  linkedin: "https://www.linkedin.com/in/lennymuffler",
  instagram: "https://www.instagram.com/lnny.8",
  email: "mailto:lenny.muffler@gmail.com"
}

export const applications = [
  {title: "Sorting Visualizer", description: "Visualize sorting algorithms", imageUrl: "/applications/sorting.png", link: "/projects/sorting-visualizer", date: "2025", color: "#2d2825"},
  {title: "Markdown Exporter", description: "Convert Markdown files to PDF or PNG", imageUrl: "/applications/markdown.png", link: "/applications/markdown", date: "2025", color: "#2a2d25"},
  {title: "Wiki Route", description: "Find the shortest path between Wikipedia articles", imageUrl: "/applications/wiki.png", link: "/applications/wiki", date: "2026", color: "#252d2c"},
]

export const tutorials = [
  {title: "Hover Button", description: "Create a stylish hover button with HTML and CSS", imageUrl: "/tutorials/hover-button.png", link: "/tutorials/hover-button-tutorial", date: "2025", color: "#7fb086"},
  // {title: "Blob Shader", description: "Learn how to create a blob shader using Three.js", imageUrl: "/tutorials/blob-shader-tutorial.png", link: "/tutorials/blob-shader-tutorial", date: "2025", color: "#b795ed"},
  // {title: "Horizontal Scroll", description: "Implement horizontal scrolling using JavaScript", imageUrl: "/tutorials/horizontal-scroll-tutorial.png", link: "/tutorials/horizontal-scroll-tutorial", date: "2025", color: "#f88"},
  // {title: "Fill Button", description: "Design a fill button animation with CSS", imageUrl: "/tutorials/fill-button-tutorial.png", link: "/tutorials/fill-button-tutorial", date: "2025", color: "#dcabff"},
  // {title: "Animated Theme Switcher", description: "Build an animated theme switcher with JavaScript and CSS", imageUrl: "/tutorials/animated-theme-switcher-tutorial.png", link: "/tutorials/animated-theme-switcher-tutorial", date: "2025", color: "#abafff"},
]

export const selectedProjects = [projects[0], projects[1], applications[2], applications[1]]

export const knowledgeAreas = ["Web Development", "3D Modeling", "Automation", "Hardware Design", "PCB", "Server", "UI/UX", "Game Development"]

export const imageSections = [
  {
    title: "Web Development",
    description: "Building modern, performant web experiences with React, Next.js, and motion design.",
    images: ["/interests/websites3.png", "/interests/websites2.png", "/interests/websites1.png"],
  },
  {
    title: "Server Infrastructure",
    description: "Managing Linux servers, databases, and automation workflows for reliable deployment.",
    images: ["/interests/server1.png", "/interests/server2.png", "/interests/server3.png"],
  },
  {
    title: "Hardware & PCB Design",
    description: "Prototyping circuits, designing PCBs, and creating physical interfaces.",
    images: ["/interests/hardware1.png", "/interests/hardware2.png", "/interests/hardware3.png"],
  },
  {
    title: "3D Modeling & Printing",
    description: "Designing, rendering, printing custom components using CAD software.",
    images: ["/interests/3d1.png", "/interests/3d2.png", "/interests/3d3.png"],
  },
  {
    title: "Creative Coding",
    description: "Mobile app development and interactive experiences through code.",
    images: ["/interests/creative1.png", "/interests/creative2.png", "/interests/creative3.png"],
  },
  {
    title: "Automation & Scripting",
    description: "Creating scripts and automations in n8n to streamline workflows and increase efficiency.",
    images: ["/interests/automation1.png", "/interests/automation2.png", "/interests/automation3.png"],
  },
]

export const about = [
  {
    title: "age",
    description: "17",
    icon: "🎂",
  },
  {
    title: "location",
    description: "Stuttgart, Germany",
    icon: "📍",
  },
  {
    title: "education",
    description: "High School Student",
    icon: "🎓",
  },
]

export const experienceCategories = [
  {
    title: "Frontend",
    description: "UI, frameworks, animation, and styling.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "Tailwind CSS", "Angular", "motion", "GSAP", "Zustand", "SEO", "Responsive Design"],
  },
  {
    title: "Backend",
    description: "APIs, servers, databases, and authentication.",
    items: ["Node.js", "Express.js", "PostgreSQL", "MySQL", "JWT Web Tokens", "2FA Authentication", "Auth0", "NPM Packages"],
  },
  {
    title: "3D & Graphics",
    description: "Real-time graphics, shaders, and 3D pipelines.",
    items: ["Three.js", "React Three Fiber", "WebGPU", "WGSL", "Blender", "Plasticity", "Figma", "3D Rigging"],
  },
  {
    title: "DevOps & Infra",
    description: "Deployment, hosting, and infrastructure tools.",
    items: ["Linux", "Docker", "Vercel", "Hetzner Cloud", "Git", "GitHub"],
  },
  {
    title: "Hardware & Embedded",
    description: "Physical computing, PCB work, and prototyping.",
    items: ["PCB Design", "KiCad", "Arduino", "Raspberry Pi", "CAD Software"],
  },
  {
    title: "Automation & Integrations",
    description: "Workflows, webhooks, and third-party integrations.",
    items: ["Automation", "n8n", "Webhooks", "Stripe API", "OpenAI API", "Replicate API", "ElevenLabs API", "Resend API"],
  },
  {
    title: "ML & Data",
    description: "Machine learning + learning projects.",
    items: ["Reinforcement Learning", "PyTorch", "PyGame"],
  },
  {
    title: "Languages",
    description: "Programming languages used across projects.",
    items: ["C++", "Java", "Python", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
]
