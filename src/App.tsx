import "./App.css";
import { Timeline, TimelineItem } from "./components/ui/timeline";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowDown,
  GraduationCap,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────

const skills = [
  {
    category: "Languages",
    items: ["Java", "Python", "Kolin", "JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Backend Frameworks",
    items: ["Spring Boot", "FastAPI", "Node.js", "ReactJs"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Redis", "MongoDB", "MySql", "Kafka"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
  {
    category: "Tools",
    items: ["Git", "Datadog", "Splunk", "Grafana", "Jenkins", "Github Actions"],
  },
];

const experiences = [
  {
    date: "May 2022 - Present",
    title: "Software Engineer 2",
    company: "Expedia Group",
    location: "Austin, TX",
    current: true,
    description:
      "Building scalable, high-performance Identity services that help millions of travelers and partners securely log in across Expedia brands. Work across the full development lifecycle — from architecture and coding to deployment and optimization — focusing on reliability, clean design, and measurable impact.",
    tech: [
      "Java",
      "Kotlin",
      "Spring Boot",
      "Dropwizard",
      "AWS",
      "Kafka",
      "MySQL",
      "MongoDb",
      "Cassandra",
      "Kubernetes",
    ],
  },
  {
    date: "Nov 2020 - May 2022",
    title: "Software Engineer",
    company: "AM RE Syndicate Inc",
    location: "Dallas, TX",
    current: false,
    description:
      "Developed and maintained reinsurance software platforms, building APIs and data pipelines for policy management and claims processing.",
    tech: [
      "ReactJs",
      "NodeJs",
      "MeteorJs",
      "Python",
      "Docker",
      "REST APIs",
      "MongoDb",
    ],
  },
  {
    date: "Sept 2020 - Nov 2020",
    title: "Full Stack Engineer",
    company: "The University of Texas at Arlington",
    location: "Arlington, TX",
    current: false,
    description:
      "Created an open-source framework to annotate hand signs in video streaming data, combining computer vision with web technologies.",
    tech: ["Python", "React", "OpenCV", "TensorFlow"],
  },
  {
    date: "June 2020 - Sept 2020",
    title: "Machine Learning Intern",
    company: "Digital Reasoning",
    location: "Franklin, TN",
    current: false,
    description:
      "Researched and developed an end-to-end multi-language text transcription model on SEAME audio data using NLP and deep learning.",
    tech: ["Python", "PyTorch", "NLP", "Docker", "Kubernetes"],
  },
  {
    date: "July 2017 - May 2018",
    title: "Full Stack Software Developer",
    company: "Navdurga Pediatric & Family Dental Centre",
    location: "Mumbai, In",
    current: false,
    description:
      "Built a Full-stack Dental web application for scheduling appointments, managing patient diagnosis and treatments and billing and payments.",
    tech: ["ReactJs", "NodeJs", "MongoDb", "Docker", "Github Actions"],
  },
  {
    date: "July 2016 - June 2017",
    title: "Full Stack Software Developer",
    company: "Navdurga Fracture and Accident Centre",
    location: "Mumbai, In",
    current: false,
    description:
      "Built a fully scalable jira-style web application to manage patient appointments, diagnosis, treatments & billing",
    tech: [
      "ReactJs",
      "Kotlin",
      "Python",
      "Springboot",
      "FastAPI",
      "MySQL",
      "Docker",
      "Github Actions",
    ],
  },
];

const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "The University of Texas at Arlington",
    location: "Arlington, TX",
    date: "2018 - 2020",
    focus: ["Artificial Intelligence", "Databases"],
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    school: "Thakur College of Engineering and Technology",
    location: "Mumbai, India",
    date: "2012 - 2016",
    focus: ["Computer Science Engineering"],
  },
];

const projects = [
  {
    name: "Distributed Task Scheduler",
    description:
      "A fault-tolerant distributed task scheduling system with support for cron expressions, retries, and dead-letter queues. Built with event-driven architecture.",
    tech: ["Go", "Redis", "gRPC", "Docker"],
    github: "#",
  },
  {
    name: "API Gateway & Rate Limiter",
    description:
      "Custom API gateway with token bucket rate limiting, request routing, circuit breaker patterns, and real-time analytics dashboard.",
    tech: ["Java", "Spring Boot", "Redis", "Grafana"],
    github: "#",
  },
  {
    name: "Real-Time Data Pipeline",
    description:
      "Stream processing pipeline for ingesting, transforming, and routing high-throughput event data with exactly-once delivery guarantees.",
    tech: ["Python", "Kafka", "PostgreSQL", "AWS"],
    github: "#",
  },
];

// ── Section Header ────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-mono font-semibold tracking-tight">
        <span className="text-primary">$ </span>
        {title}
      </h2>
      <Separator className="mt-4 bg-border/50" />
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center px-6">
        <div className="max-w-3xl mx-auto w-full">
          <p className="font-mono text-primary mb-4 text-sm">Hi, my name is</p>
          <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tight mb-4">
            Akshay Shenvi
          </h1>
          <div className="flex items-center gap-1 mb-6">
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-mono">
              Senior Backend Engineer
            </h2>
            <span className="inline-block w-3 h-7 bg-primary animate-blink"></span>
          </div>
          <p className="text-muted-foreground max-w-xl leading-relaxed mb-8">
            I build reliable, scalable backend systems — distributed services,
            APIs, and cloud infrastructure that power products used by millions.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button asChild>
              <a href="#experience">View Experience</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/akshayshenvi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/akshay-shenvi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:akshayshenvi@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="about" />
          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm a backend engineer with 5+ years of experience designing and
            building distributed systems, RESTful APIs, and cloud-native
            microservices. I enjoy solving complex problems at scale — from
            optimizing database queries to architecting event-driven pipelines.
            I also have a strong background in AI/ML, with hands-on experience
            in NLP, deep learning, and building end-to-end machine learning
            pipelines.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Currently at{" "}
            <span className="text-foreground font-medium">Expedia Group</span>,
            I work on Identity services that power authentication for millions
            of travelers across multiple brands. I care deeply about
            reliability, clean code, and building systems that are easy to
            operate and reason about.
          </p>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((group) => (
              <Card
                key={group.category}
                className="bg-card border-border/50 p-5 hover:border-primary/30 transition-colors"
              >
                <h3 className="font-mono text-sm text-primary mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="font-mono text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────────── */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="experience" />
          <Timeline>
            {experiences.map((exp) => (
              <TimelineItem key={exp.date} date={exp.date}>
                <Card className="bg-card border-border/50 p-5 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company} | {exp.location}
                      </p>
                    </div>
                    {exp.current && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────────────── */}
      <section id="education" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="education" />
          <div className="space-y-6">
            {education.map((edu) => (
              <Card
                key={edu.date}
                className="bg-card border-border/50 p-5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <GraduationCap className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.school} | {edu.location}
                    </p>
                    <p className="text-sm font-mono text-muted-foreground mt-1">
                      {edu.date}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {edu.focus.map((f) => (
                        <Badge
                          key={f}
                          variant="outline"
                          className="font-mono text-xs text-muted-foreground"
                        >
                          {f}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card
                key={project.name}
                className="bg-card border-border/50 p-5 hover:border-primary/30 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    {project.name}
                  </h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="contact" />
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm always open to interesting conversations and opportunities.
              Feel free to reach out.
            </p>
            <div className="space-y-3 font-mono text-sm">
              <a
                href="mailto:akshay@example.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>
                  <span className="text-primary">$ </span>contact --email
                  akshayshenvi@gmail.com
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/akshay-shenvi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>
                  <span className="text-primary">$ </span>open --linkedin
                  akshay-shenvi
                </span>
              </a>
              <a
                href="https://github.com/akshayshenvi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>
                  <span className="text-primary">$ </span>open --github
                  akshayshenvi
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Built with React + TypeScript + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
