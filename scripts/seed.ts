import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import mongoose from "mongoose";
import Event from "../database/event.model";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

interface DraftEvent {
  title: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
}

const CONFERENCES: DraftEvent[] = [
  {
    title: "GitHub Universe 2026",
    description: "The premier event for developers building the future of software. Join thousands of developers, engineers, and tech leaders for three days of innovation, collaboration, and hands-on learning.",
    overview: "GitHub Universe brings together the global developer community for keynotes, breakout sessions, and workshops covering AI-assisted development, open source, security, and platform engineering. Featuring product launches, deep dives into Copilot, and community celebrations.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    venue: "Moscone Center",
    location: "San Francisco, CA",
    date: "2026-10-08",
    time: "09:00",
    mode: "Hybrid",
    audience: "Developers, Engineers, Tech Leaders",
    agenda: [
      "Keynote: The Future of AI-Assisted Development",
      "Workshop: Advanced GitHub Copilot Patterns",
      "Breakout: Secure Supply Chain Management",
      "Community Fireside Chat",
      "Networking Reception"
    ],
    organizer: "GitHub",
    tags: ["AI", "Open Source", "Developer Experience", "Security", "Platform Engineering"]
  },
  {
    title: "React Conf 2026",
    description: "The official conference about React, React Native, and the ecosystem. Connect with core maintainers, explore the latest features, and level up your frontend skills.",
    overview: "React Conf is back with deep dives into React Server Components, new compiler optimizations, and the future of UI development. Expect technical talks from the core team, community spotlights, and hands-on workshops.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80",
    venue: "Henderson Beach Resort",
    location: "Destin, Florida",
    date: "2026-05-19",
    time: "10:00",
    mode: "In-Person",
    audience: "React Developers, Frontend Engineers",
    agenda: [
      "State of React 2026",
      "Deep Dive: React Server Components",
      "Workshop: Performance Optimization",
      "Lightning Talks from the Community",
      "Core Team AMA"
    ],
    organizer: "React Core Team",
    tags: ["React", "Frontend", "JavaScript", "UI", "Web Development"]
  },
  {
    title: "Google I/O 2026",
    description: "Google's annual developer conference showcasing the latest in Android, AI, Web, and Cloud technologies. Discover what's next from Google.",
    overview: "Google I/O returns with major announcements across Gemini AI, Android, Chrome, Firebase, and Google Cloud. Experience technical sessions, code labs, and sandbox demonstrations.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    venue: "Shoreline Amphitheatre",
    location: "Mountain View, CA",
    date: "2026-05-20",
    time: "10:00",
    mode: "Hybrid",
    audience: "Android Developers, Web Developers, AI Engineers",
    agenda: [
      "Opening Keynote: AI Everywhere",
      "Android Platform Updates",
      "Firebase Product Suite Deep Dive",
      "Codelabs: Build with Gemini",
      "Developer Sandbox"
    ],
    organizer: "Google",
    tags: ["Android", "AI", "Cloud", "Mobile", "Web"]
  },
  {
    title: "Apple WWDC 2026",
    description: "Apple's Worldwide Developers Conference. Discover the latest innovations in iOS, macOS, visionOS, and all Apple platforms.",
    overview: "WWDC brings together developers from around the world for a week of technology briefings, design sessions, and hands-on labs with Apple engineers. The place to learn what's next across the Apple ecosystem.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    venue: "Apple Park",
    location: "Cupertino, CA",
    date: "2026-06-08",
    time: "10:00",
    mode: "Online",
    audience: "Apple Platform Developers, Designers",
    agenda: [
      "Platforms State of the Union",
      "Design for visionOS",
      "What's New in Swift",
      "Metal Performance Workshop",
      "Apple Engineer 1-on-1 Labs"
    ],
    organizer: "Apple",
    tags: ["iOS", "macOS", "Swift", "visionOS", "Design"]
  },
  {
    title: "KubeCon + CloudNativeCon 2026",
    description: "The flagship conference for cloud-native computing. Join the community to learn about Kubernetes, observability, service mesh, and platform engineering.",
    overview: "KubeCon brings together adopters and technologists from leading open source and cloud-native communities. Featuring keynotes, technical sessions, and contributor summits across the CNCF landscape.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
    venue: "Los Angeles Convention Center",
    location: "Los Angeles, CA",
    date: "2026-07-21",
    time: "09:00",
    mode: "In-Person",
    audience: "DevOps Engineers, Platform Teams, SREs",
    agenda: [
      "Keynote: The State of Cloud Native",
      "Deep Dive: Kubernetes Scheduling",
      "Workshop: Observability with OpenTelemetry",
      "Service Mesh Shootout",
      "Contributor Summit"
    ],
    organizer: "CNCF",
    tags: ["Kubernetes", "Cloud Native", "DevOps", "Observability", "Open Source"]
  },
  {
    title: "AWS re:Invent 2026",
    description: "The largest cloud computing conference in the world. Learn about AWS innovations, best practices, and connect with the global cloud community.",
    overview: "AWS re:Invent features thousands of technical sessions, certification opportunities, and hands-on builders' workshops. From serverless to AI/ML to edge computing, every AWS service is covered in depth.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=80",
    venue: "The Venetian Expo",
    location: "Las Vegas, NV",
    date: "2026-11-30",
    time: "08:00",
    mode: "In-Person",
    audience: "Cloud Architects, Developers, IT Leaders",
    agenda: [
      "CEO Keynote: Infrastructure Innovation",
      "Builder Sessions: Serverless Patterns",
      "Workshop: AI/ML on AWS",
      "Security Jam",
      "re:Play Party"
    ],
    organizer: "Amazon Web Services",
    tags: ["AWS", "Cloud", "Serverless", "AI/ML", "Infrastructure"]
  },
  {
    title: "Microsoft Build 2026",
    description: "Microsoft's annual developer conference. Explore the latest in Azure, .NET, AI, and developer tools for building intelligent applications.",
    overview: "Microsoft Build showcases the future of development with Azure AI, Copilot stack, .NET innovations, and cross-platform development. Hands-on sessions and deep technical dives across the Microsoft ecosystem.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
    venue: "Microsoft Campus & Online",
    location: "Redmond, WA",
    date: "2026-05-25",
    time: "09:00",
    mode: "Hybrid",
    audience: ".NET Developers, Azure Engineers, AI Developers",
    agenda: [
      "Keynote: AI Copilot Ecosystem",
      ".NET 10 Platform Updates",
      "Azure Cognitive Services Deep Dive",
      "Workshop: Building Copilot Extensions",
      "Visual Studio & GitHub Codespaces"
    ],
    organizer: "Microsoft",
    tags: ["Azure", ".NET", "AI", "Dev Tools", "Cloud"]
  },
  {
    title: "Node.js Interactive 2026",
    description: "The premier conference for Node.js developers and the JavaScript ecosystem. Learn, share, and connect with the community driving server-side JavaScript forward.",
    overview: "Node.js Interactive covers the full spectrum of server-side JavaScript — from runtime internals and performance to ecosystem tooling, observability, and production best practices. A must-attend for Node.js practitioners.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    venue: "Austin Convention Center",
    location: "Austin, TX",
    date: "2026-09-15",
    time: "09:30",
    mode: "In-Person",
    audience: "Node.js Developers, Backend Engineers",
    agenda: [
      "State of Node.js 2026",
      "Performance Tuning in Production",
      "Workshop: Building CLI Tools",
      "Ecosystem Security Panel",
      "Contributor Open House"
    ],
    organizer: "OpenJS Foundation",
    tags: ["Node.js", "JavaScript", "Backend", "Performance", "Open Source"]
  },
  {
    title: "Figma Config 2026",
    description: "The annual conference for product design and development teams. Discover new features, design systems strategies, and the future of collaborative design.",
    overview: "Config brings together designers, developers, and product builders for keynotes, workshops, and panels covering design systems, AI in design, prototyping, and developer handoff.",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&q=80",
    venue: "Moscone Center West",
    location: "San Francisco, CA",
    date: "2026-06-10",
    time: "10:00",
    mode: "In-Person",
    audience: "Designers, Design Engineers, Product Managers",
    agenda: [
      "Keynote: Designing with AI",
      "Workshop: Design Systems at Scale",
      "Prototyping Advanced Interactions",
      "Developer Handoff Best Practices",
      "Community Design Critique"
    ],
    organizer: "Figma",
    tags: ["Design", "Design Systems", "Prototyping", "Collaboration", "AI"]
  },
  {
    title: "DevOps World 2026",
    description: "The leading conference for DevOps practitioners, platform engineers, and SREs. Explore automation, CI/CD, platform engineering, and incident management.",
    overview: "DevOps World delivers actionable strategies for accelerating software delivery. Topics include GitOps, platform engineering, incident response, FinOps, and developer experience transformation.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
    venue: "McCormick Place",
    location: "Chicago, IL",
    date: "2026-08-12",
    time: "09:00",
    mode: "Hybrid",
    audience: "DevOps Engineers, SREs, Platform Engineers",
    agenda: [
      "Keynote: Platform Engineering Maturity",
      "GitOps in Production Workshop",
      "Incident Response Simulation",
      "FinOps for Engineering Leaders",
      "Community Awards Ceremony"
    ],
    organizer: "CloudBees",
    tags: ["DevOps", "CI/CD", "Platform Engineering", "SRE", "Automation"]
  },
  {
    title: "PyCon US 2026",
    description: "The largest annual gathering for the Python programming language community. Education, collaboration, and the future of Python.",
    overview: "PyCon US brings together Python enthusiasts of all skill levels for tutorials, talks, sprints, and hallway track conversations. Covering web development, data science, ML/AI, and Python internals.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    venue: "David L. Lawrence Convention Center",
    location: "Pittsburgh, PA",
    date: "2026-05-13",
    time: "08:30",
    mode: "In-Person",
    audience: "Python Developers, Data Scientists, Educators",
    agenda: [
      "Python Language Summit",
      "Data Science with Python Workshop",
      "Web Development with FastAPI",
      "CPython Internals Talk",
      "Community Sprints"
    ],
    organizer: "Python Software Foundation",
    tags: ["Python", "Data Science", "Web", "ML/AI", "Open Source"]
  },
  {
    title: "RustConf 2026",
    description: "The annual conference for the Rust programming language community. Learn about systems programming, safety, and the growing Rust ecosystem.",
    overview: "RustConf gathers the Rust community for two days of talks, workshops, and networking. From embedded systems to web assembly to CLI tooling, explore what makes Rust the most loved language.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=80",
    venue: "Oregon Convention Center",
    location: "Portland, OR",
    date: "2026-09-02",
    time: "09:00",
    mode: "In-Person",
    audience: "Systems Programmers, Rust Developers",
    agenda: [
      "Keynote: Rust in Production",
      "Async Rust Deep Dive",
      "Embedded Systems with Rust",
      "Building CLI Tools Workshop",
      "Rust Foundation Update"
    ],
    organizer: "Rust Foundation",
    tags: ["Rust", "Systems", "WebAssembly", "CLI", "Performance"]
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected successfully.");

    console.log("Clearing existing events...");
    await Event.deleteMany({});

    console.log(`Seeding ${CONFERENCES.length} conferences...`);
    const created = await Event.create(CONFERENCES);

    console.log(`\n✔ ${created.length} conferences inserted:`);
    created.forEach((e) => {
      const d = new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      console.log(`  • ${e.title} — ${d} @ ${e.location}`);
    });

    await mongoose.disconnect();
    console.log("\nSeed complete. Disconnected.");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
