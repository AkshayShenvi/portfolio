import { Component } from "react";
import type { CSSProperties } from "react";

type Line = {
  text: string;
  color: string;
  plain: boolean;
  hasHref: boolean;
  href?: string;
  isPrompt: boolean;
  onClick?: () => void;
  download?: boolean;
};

type ThemeName = "blurple" | "green" | "amber";

type Props = {
  promptUser?: string;
  bootAnimation?: boolean;
  autoplay?: boolean;
  scanlines?: boolean;
};

type State = {
  lines: Line[];
  input: string;
  booted: boolean;
  autoplay: boolean;
  matrix: boolean;
  theme: ThemeName;
  history: string[];
  histIdx: number | null;
};

const THEME_KEYS = [
  "--color-accent",
  "--color-accent-300",
  "--color-text",
  "--color-neutral-400",
  "--color-neutral-500",
];

const THEMES: Record<ThemeName, Record<string, string> | null> = {
  blurple: null,
  green: {
    "--color-accent": "#33ff88",
    "--color-accent-300": "#8affc0",
    "--color-text": "#c6ffd9",
    "--color-neutral-400": "#5fbf86",
    "--color-neutral-500": "#3f8f66",
  },
  amber: {
    "--color-accent": "#ffb000",
    "--color-accent-300": "#ffd48a",
    "--color-text": "#ffdca8",
    "--color-neutral-400": "#bb8a4a",
    "--color-neutral-500": "#8a6636",
  },
};

export default class Terminal extends Component<Props, State> {
  state: State = {
    lines: [],
    input: "",
    booted: false,
    autoplay: false,
    matrix: false,
    theme: "blurple",
    history: [],
    histIdx: null,
  };

  private alive = true;
  private root: HTMLDivElement | null = null;
  private screen: HTMLDivElement | null = null;
  private input: HTMLInputElement | null = null;
  private matrixCanvas: HTMLCanvasElement | null = null;
  private mtx: ReturnType<typeof setInterval> | null = null;
  private mtxResize: (() => void) | null = null;
  private exitKey: ((e: KeyboardEvent) => void) | null = null;

  private readonly CT = "var(--color-text)";
  private readonly CM = "var(--color-neutral-400)";
  private readonly CD = "var(--color-neutral-500)";
  private readonly CA = "var(--color-accent-300)";

  // ---- helpers ----
  private L(text?: string, color?: string): Line {
    return {
      text: text ?? "",
      color: color || this.CT,
      plain: true,
      hasHref: false,
      isPrompt: false,
    };
  }
  private LINK(text: string, href: string): Line {
    return { text, href, color: this.CA, plain: false, hasHref: true, isPrompt: false };
  }
  private BLANK(): Line {
    return this.L(" ", this.CT);
  }

  private safeSetState(update: Partial<State> | ((s: State) => Partial<State>), cb?: () => void) {
    if (!this.alive) return;
    this.setState(update as State, cb);
  }

  // ---- portfolio content ----
  get DATA() {
    return {
      name: "Akshay Shenvi",
      handle: "akshay",
      role: "Software Engineer",
      tagline:
        "Backend & identity engineer — I build authentication systems and self-hosted tools.",
      location: "",
      email: "akshayshenvi@gmail.com",
      about: [
        "I'm a software engineer focused on backend systems, authentication,",
        "and developer-facing platforms. I like building reusable standards",
        "that make other teams faster, and self-hosted tools I actually use.",
        "Currently a Software Engineer 3 at Expedia Group.",
      ],
      skills: [
        ["Languages", "Java · Kotlin · Python · TypeScript · JavaScript"],
        ["Frameworks", "Spring Boot · Dropwizard · React · Redux · Meteor.js · Express.js"],
        ["Auth & Identity", "OIDC · Social Login · token validation & provisioning · password hashing"],
        ["Data & Infra", "Cassandra · MySQL · MongoDB · Kafka · Docker · Kubernetes · AWS (EC2)"],
        ["Testing & Ops", "JMeter · BlazeMeter · Locust · Rollbar · PagerDuty · ETL pipelines"],
        ["AI", "Claude Code · GitHub Copilot · Claude Skills · Claude Marketplace · Hooks"],
      ],
      experience: [
        {
          role: "Software Engineer 3",
          org: "Expedia Group",
          when: "May 2022 — Present",
          summary:
            "Design identity and authentication systems that securely log in millions of travelers across Expedia, Hotels.com, and Vrbo.",
          bullets: [
            "Designed and own the common-auth library adopted by internal service teams to manage authentication tokens, configuring token validators, token provisioning, and access to token claims, establishing a reusable standard across the organization.",
            "Led the design and implementation of Unified Partner Login for Vrbo, streamlining partner authentication across the platform.",
            "Drove integration of Vrbo into the One Identity / One Key initiative, merging Expedia, Hotels.com, and Vrbo identity and loyalty systems; owned user migration and session upgrades across US and Rest-of-World points of sale.",
            "Upgraded the Dropwizard framework across services and migrated them to Kubernetes, modernizing the deployment platform and improving scalability and operability.",
            "Decommissioned a legacy encryption service by migrating dependent services to a new password-hashing service, migrated services off legacy Kafka onto the standardized Expedia Group platform, and built load-testing frameworks (JMeter, BlazeMeter, Locust) to validate performance at scale.",
            "Drove AI adoption across the team. Built custom agent skills, made repositories AI-ready, and led internal AI workshops to upskill engineers and accelerate developer productivity.",
            "Sustain production reliability through on-call rotation. Resolved customer support tickets and reported bugs, including stabilization work following the One Identity migration.",
          ],
          tech: "Java · Kotlin · Spring Boot · Dropwizard · OIDC · Social Login · Cassandra · MySQL · Kafka · Docker · Kubernetes · Python",
        },
        {
          role: "Software Engineer",
          org: "AM RE Syndicate Inc.",
          when: "Nov 2020 — May 2022",
          summary:
            "Built insurance review tooling, ETL pipelines, and observability for a reinsurance platform.",
          bullets: [
            "Built an Insurance Statement Review System that improved review accuracy, minimized human error, and tracked business growth.",
            "Optimized query performance to improve filtering functionality by 75%.",
            "Set up and integrated Docker, Rollbar, and PagerDuty across development, staging, and production environments.",
            "Built a cron-scheduled ETL pipeline to ingest data into analytics and finance tooling.",
          ],
          tech: "React · Meteor.js · Express.js · MongoDB · Redux · TypeScript · Docker",
        },
        {
          role: "Machine Learning Research Intern",
          org: "Digital Reasoning",
          when: "Jun 2020 — Sep 2020",
          summary:
            "Researched end-to-end mixed-language speech transcription and NLP recommendation models.",
          bullets: [
            "Researched and built an end-to-end mixed-language speech transcription model on SEAME Mandarin audio (DeepSpeech 2), with audio-segmentation pipelines for experiments; also modeled a Ghazal recommendation system using N-gram modeling and data visualization.",
          ],
          tech: "PyTorch · Python · Pandas · NumPy · NLTK · BiGRU/LSTM · AWS EC2",
        },
      ],
      resume: "Akshay_Shenvi_Resume.pdf",
      resumeHref: import.meta.env.BASE_URL + "Akshay_Shenvi_Resume.pdf",
      projects: [
        {
          name: "OpenFinStack",
          desc: "Open-source, self-hosted personal & household finance management app.",
          href: "https://github.com/AkshayShenvi",
        },
        {
          name: "OpenFodder",
          desc: "Open-source, self-hosted calorie & nutrition tracking app.",
          href: "https://github.com/AkshayShenvi",
        },
      ],
      education: [
        {
          deg: "Master of Science in Computer Science",
          org: "The University of Texas at Arlington",
          when: "2018 — 2020",
        },
        {
          deg: "Bachelor of Engineering in Computer Science",
          org: "Thakur College of Engineering and Technology",
          when: "2012 — 2016",
        },
      ],
      social: [
        ["GitHub", "github.com/AkshayShenvi", "https://github.com/AkshayShenvi"],
        ["LinkedIn", "linkedin.com/in/akshay-shenvi", "https://www.linkedin.com/in/akshay-shenvi/"],
        ["Website", "akshayshenvi.github.io/portfolio", "https://akshayshenvi.github.io/portfolio"],
        ["Email", "akshayshenvi@gmail.com", "mailto:akshayshenvi@gmail.com"],
      ],
    };
  }

  get COMMANDS(): [string, string][] {
    return [
      ["about", "Who I am and what I do"],
      ["skills", "Languages, frameworks, and tools"],
      ["experience", "Where I've worked"],
      ["projects", "Things I've built"],
      ["education", "Academic background"],
      ["contact", "How to reach me"],
      ["resume", "Open my resume"],
      ["social", "Links & profiles"],
      ["whoami", "The short version"],
      ["neofetch", "Profile banner + system info"],
      ["theme", "Cycle accent theme (blurple/green/amber)"],
      ["all", "Print every section at once"],
      ["ls", "List available sections"],
      ["clear", "Clear the screen"],
      ["help", "Show this list"],
    ];
  }

  // ---- theme ----
  private applyTheme(name: ThemeName) {
    const root = this.root;
    if (!root) return;
    THEME_KEYS.forEach((k) => root.style.removeProperty(k));
    const set = THEMES[name];
    if (set) Object.entries(set).forEach(([k, v]) => root.style.setProperty(k, v));
  }
  private cycleTheme(explicit?: string): ThemeName {
    const order: ThemeName[] = ["blurple", "green", "amber"];
    const next = (order as string[]).includes(explicit || "")
      ? (explicit as ThemeName)
      : order[(order.indexOf(this.state.theme) + 1) % order.length];
    this.safeSetState({ theme: next }, () => this.applyTheme(next));
    return next;
  }

  // ---- matrix ----
  private initMatrix() {
    const cv = this.matrixCanvas;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      cv.width = cv.clientWidth;
      cv.height = cv.clientHeight;
    };
    resize();
    const glyphs =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789$#%&<>{}[]/*+".split("");
    const fs = 16;
    const drops = Array(Math.ceil(cv.width / fs))
      .fill(0)
      .map(() => Math.random() * -40);
    const accent =
      getComputedStyle(this.root as Element).getPropertyValue("--color-accent").trim() || "#33ff88";
    this.mtxResize = resize;
    window.addEventListener("resize", resize);
    this.exitKey = (e: KeyboardEvent) => {
      e.preventDefault();
      this.safeSetState({ matrix: false });
    };
    setTimeout(() => this.exitKey && window.addEventListener("keydown", this.exitKey), 80);
    this.mtx = setInterval(() => {
      ctx.fillStyle = "rgba(10,12,20,0.14)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = fs + "px 'JetBrains Mono', monospace";
      for (let i = 0; i < drops.length; i++) {
        const ch = glyphs[(Math.random() * glyphs.length) | 0];
        const y = drops[i] * fs;
        ctx.fillStyle = Math.random() > 0.9 ? "#e9ffe9" : accent;
        ctx.fillText(ch, i * fs, y);
        if (y > cv.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 55);
  }
  private stopMatrix() {
    if (this.mtx) {
      clearInterval(this.mtx);
      this.mtx = null;
    }
    if (this.mtxResize) {
      window.removeEventListener("resize", this.mtxResize);
      this.mtxResize = null;
    }
    if (this.exitKey) {
      window.removeEventListener("keydown", this.exitKey);
      this.exitKey = null;
    }
  }
  private startMatrix() {
    this.safeSetState({ matrix: true });
  }

  private copyEmail() {
    const em = this.DATA.email;
    try {
      navigator.clipboard.writeText(em);
    } catch (_) {
      /* clipboard unavailable */
    }
    this.safeSetState((s) => ({ lines: [...s.lines, this.L("copied " + em + " to clipboard ✓", this.CM)] }));
  }

  private neofetch(): Line[] {
    const d = this.DATA;
    const A = this.CA,
      T = this.CT;
    const logo = [
      "    _     _  __ ____   _   _     _    __   __",
      "   / \\   | |/ // ___| | | | |   / \\   \\ \\ / /",
      "  / _ \\  | ' / \\___ \\ | |_| |  / _ \\   \\ V / ",
      " / ___ \\ | . \\  ___) ||  _  | / ___ \\   | |  ",
      "/_/   \\_\\|_|\\_\\|____/ |_| |_|/_/   \\_\\  |_|  ",
    ];
    const header = this.promptString();
    const info = [
      header,
      "-".repeat(header.length),
      "Role     " + d.role,
      "Company  Expedia Group",
      "Stack    Java · Kotlin · Python · TS",
      "Focus    Auth & Identity",
      "Shell    nocturne-term 2.4.1",
      "Explore  help · all · theme · matrix",
    ];
    const n = Math.max(logo.length, info.length);
    const rows: Line[] = [];
    for (let i = 0; i < n; i++) {
      const left = (logo[i] || "").padEnd(48);
      rows.push(this.L(left + (info[i] || ""), i < logo.length ? A : T));
    }
    return rows;
  }

  // ---- command output ----
  private out(cmd: string): Line[] | "__clear__" {
    const raw = cmd.trim();
    const parts = raw.split(/\s+/);
    const base = (parts[0] || "").toLowerCase();
    const args = parts.slice(1);
    const flags = args.map((a) => a.toLowerCase());
    const d = this.DATA;
    const A = this.CA,
      T = this.CT,
      M = this.CM;
    if (!base) return [];
    switch (base) {
      case "help": {
        const rows = this.COMMANDS.map(([k, v]) => this.L("  " + k.padEnd(12) + v, T));
        return [
          this.L("Available commands", A),
          this.BLANK(),
          ...rows,
          this.BLANK(),
          this.L("Tip: ↑/↓ for history, Tab to autocomplete, Ctrl+L to clear.", M),
          this.L("Try: experience --v · theme · matrix", M),
        ];
      }
      case "about":
        return [this.L("about", A), this.BLANK(), ...d.about.map((l) => this.L(l, T))];
      case "whoami":
        return [this.L(d.name + " · " + d.role + (d.location ? " · " + d.location : ""), T)];
      case "skills": {
        const rows = d.skills.map(([g, v]) => this.L("  " + (g + ":").padEnd(18) + v, T));
        return [this.L("skills", A), this.BLANK(), ...rows];
      }
      case "experience": {
        const verbose = flags.some((f) => f === "-v" || f === "--v" || f === "--verbose");
        const rows: Line[] = [this.L("experience" + (verbose ? "  (verbose)" : ""), A), this.BLANK()];
        d.experience.forEach((e, i) => {
          rows.push(this.L(e.org + "  —  " + e.role, T));
          rows.push(this.L("  " + e.when, M));
          if (verbose) {
            e.bullets.forEach((b) => rows.push(this.L("    • " + b, this.CM)));
            if (e.tech) rows.push(this.L("      ↳ " + e.tech, this.CD));
          } else {
            rows.push(this.L("  " + e.summary, this.CM));
          }
          if (i < d.experience.length - 1) rows.push(this.BLANK());
        });
        if (!verbose) {
          rows.push(this.BLANK());
          rows.push(this.L("Run 'experience --v' for full bullets & tech stack.", M));
        }
        return rows;
      }
      case "projects": {
        const rows: Line[] = [this.L("projects", A), this.BLANK()];
        d.projects.forEach((p) => {
          rows.push(this.L("  " + p.name, T));
          rows.push(this.L("    " + p.desc, M));
          rows.push(this.LINK("    " + p.href, p.href));
          rows.push(this.BLANK());
        });
        return rows;
      }
      case "education": {
        const rows: Line[] = [this.L("education", A), this.BLANK()];
        d.education.forEach((e) => {
          rows.push(this.L("  " + e.deg, T));
          rows.push(this.L("  " + e.org + "  ·  " + e.when, M));
          rows.push(this.BLANK());
        });
        return rows;
      }
      case "resume":
        return [
          this.L("resume", A),
          this.BLANK(),
          this.L("Download my resume (PDF):", T),
          { ...this.LINK("  ↓ " + d.resume, d.resumeHref), download: true },
        ];
      case "contact":
        return [
          this.L("contact", A),
          this.BLANK(),
          this.LINK("  " + d.email, "mailto:" + d.email),
          { ...this.L("  [ copy email ]", A), onClick: () => this.copyEmail() },
          this.BLANK(),
          this.L("Or use 'social' for all my links.", M),
        ];
      case "neofetch":
        return this.neofetch();
      case "theme": {
        const t = this.cycleTheme(flags[0]);
        return [this.L("theme set to " + t + "  —  run 'theme' again to cycle", A)];
      }
      case "matrix":
      case "cmatrix":
        this.startMatrix();
        return [this.L("entering the matrix… (press any key or click to exit)", M)];
      case "pwd":
        return [this.L("/home/" + d.handle + "/portfolio", T)];
      case "date":
        return [this.L(new Date().toString(), T)];
      case "echo":
        return [this.L(args.join(" "), T)];
      case "sudo":
        return [this.L("Permission granted — you already own this shell.", M)];
      case "rm":
        return [this.L("rm: nice try. This portfolio is immutable.", M)];
      case "exit":
      case "quit":
        return [this.L("There's no exit — but you can 'clear' the screen.", M)];
      case "social": {
        const rows: Line[] = [this.L("social", A), this.BLANK()];
        d.social.forEach(([label, text, href]) =>
          rows.push(this.LINK("  " + (label + ":").padEnd(11) + text, href)),
        );
        return rows;
      }
      case "all": {
        const secs = ["about", "skills", "experience", "projects", "education", "contact", "social"];
        const rows: Line[] = [];
        secs.forEach((s, i) => {
          const r = this.out(s);
          if (r !== "__clear__") rows.push(...r);
          if (i < secs.length - 1) rows.push(this.BLANK());
        });
        return rows;
      }
      case "ls":
        return [this.L("about  skills  experience  projects  education  contact  social", this.CA)];
      case "clear":
        return "__clear__";
      default:
        return [
          this.L("command not found: " + cmd, M),
          this.L("Type 'help' to see what's available.", this.CD),
        ];
    }
  }

  private submit() {
    const raw = this.state.input;
    const echo: Line = { text: raw, color: this.CT, plain: true, hasHref: false, isPrompt: true };
    const result = this.out(raw);
    const hist = raw.trim() ? [...this.state.history, raw] : this.state.history;
    if (result === "__clear__") {
      this.safeSetState({ lines: [], input: "", history: hist, histIdx: null });
      return;
    }
    this.safeSetState((s) => ({
      lines: [...s.lines, echo, ...result],
      input: "",
      history: hist,
      histIdx: null,
    }));
  }

  private autocomplete() {
    const cur = this.state.input.trim().toLowerCase();
    if (!cur) return;
    const names = this.COMMANDS.map((c) => c[0]);
    const hits = names.filter((n) => n.startsWith(cur));
    if (hits.length === 1) this.safeSetState({ input: hits[0] });
    else if (hits.length > 1)
      this.safeSetState((s) => ({
        lines: [
          ...s.lines,
          { text: s.input, color: this.CT, plain: true, hasHref: false, isPrompt: true },
          this.L(hits.join("   "), this.CM),
        ],
      }));
  }

  // ---- boot / autoplay ----
  private static readonly SESSIONS = [
    "it-works-on-my-machine",
    "prod-on-a-friday",
    "sudo-hire-me",
    "404-sleep-not-found",
    "rm-rf-regrets",
    "off-by-one",
    "null-pointer",
    "cache-invalidation",
    "yak-shaving",
    "merge-conflict",
    "todo-fix-later",
    "heisenbug",
    "works-in-theory",
    "token-expired",
    "infinite-coffee-loop",
    "add-it-to-the-backlog",
  ];

  private runBoot() {
    const session = Terminal.SESSIONS[(Math.random() * Terminal.SESSIONS.length) | 0];
    const seq = [
      this.L("Portfolio Terminal v2.4.1  (session " + session + ")", this.CD),
      this.L("Initializing environment ......... ok", this.CM),
      this.L("Loading profile: " + this.DATA.handle + " ......... ok", this.CM),
      this.L("Mounting /about /skills /experience /projects ......... ok", this.CM),
      this.L("Establishing secure session ......... ok", this.CM),
    ];
    let i = 0;
    const step = () => {
      if (!this.alive) return;
      const ln = seq[i];
      this.safeSetState((s) => ({ lines: [...s.lines, ln] }));
      i++;
      if (i < seq.length) setTimeout(step, 150);
      else setTimeout(() => this.afterBoot(), 300);
    };
    setTimeout(step, 200);
  }

  private afterBoot() {
    if (!this.alive) return;
    this.safeSetState((s) => ({ lines: [...s.lines, ...this.welcome()], booted: true }), () => {
      if (!(this.props.autoplay ?? true)) this.input?.focus();
    });
    if (this.props.autoplay ?? true) setTimeout(() => this.runAutoplay(), 500);
  }

  private welcome(): Line[] {
    return [this.BLANK(), this.L("Type 'help' to get started.", this.CM), this.BLANK()];
  }

  private runAutoplay() {
    const script = ["all"];
    this.safeSetState({ autoplay: true });
    let ci = 0;
    const typeCmd = () => {
      if (!this.alive) return;
      if (ci >= script.length) {
        this.safeSetState({ autoplay: false, input: "" });
        setTimeout(() => this.input && this.input.focus(), 20);
        return;
      }
      const cmd = script[ci];
      let pos = 0;
      const typeChar = () => {
        if (!this.alive) return;
        pos++;
        this.safeSetState({ input: cmd.slice(0, pos) });
        if (pos < cmd.length) setTimeout(typeChar, 55 + Math.random() * 55);
        else
          setTimeout(() => {
            this.submit();
            ci++;
            setTimeout(typeCmd, 650);
          }, 380);
      };
      setTimeout(typeChar, 350);
    };
    typeCmd();
  }

  // ---- lifecycle ----
  componentDidMount() {
    this.alive = true;
    setTimeout(() => this.input && this.input.focus(), 50);
    this.applyTheme(this.state.theme);
    if (this.props.bootAnimation ?? true) this.runBoot();
    else this.afterBoot();
  }

  componentWillUnmount() {
    this.alive = false;
    this.stopMatrix();
  }

  componentDidUpdate() {
    if (this.state.matrix && !this.mtx) this.initMatrix();
    if (!this.state.matrix && this.mtx) this.stopMatrix();
    if (this.screen && !this.state.matrix) this.screen.scrollTop = this.screen.scrollHeight;
  }

  // ---- input handlers ----
  private onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!this.state.booted || this.state.autoplay || this.state.matrix) return;
    const k = e.key;
    if (k === "Enter") {
      e.preventDefault();
      this.submit();
    } else if (k === "Tab") {
      e.preventDefault();
      this.autocomplete();
    } else if (k === "ArrowUp") {
      e.preventDefault();
      const h = this.state.history;
      if (!h.length) return;
      const idx = this.state.histIdx === null ? h.length - 1 : Math.max(0, this.state.histIdx - 1);
      this.safeSetState({ histIdx: idx, input: h[idx] });
    } else if (k === "ArrowDown") {
      e.preventDefault();
      const h = this.state.history;
      if (this.state.histIdx === null) return;
      const idx = this.state.histIdx + 1;
      if (idx >= h.length) this.safeSetState({ histIdx: null, input: "" });
      else this.safeSetState({ histIdx: idx, input: h[idx] });
    } else if ((e.ctrlKey || e.metaKey) && k.toLowerCase() === "l") {
      e.preventDefault();
      this.safeSetState({ lines: [] });
    }
  };

  private promptString(): string {
    const user = this.props.promptUser ?? "akshayshenvi";
    return user + "@portfolio-" + this.state.theme;
  }

  private focusInput = () => {
    if (this.input && !this.state.autoplay) this.input.focus();
  };

  private runSuggestion = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    this.safeSetState({ input: name }, () => this.submit());
  };

  render() {
    const promptStr = this.promptString();
    const scanlines = this.props.scanlines ?? false;
    const { lines, input, booted, matrix } = this.state;
    const showSuggest = booted && !this.state.autoplay && !input.trim();
    const suggestions = this.COMMANDS.filter((c) => c[0] !== "clear")
      .sort((a, b) => (a[0] === "all" ? -1 : b[0] === "all" ? 1 : 0))
      .map(([name]) => name);

    const promptPrefix = (
      <>
        <span style={{ color: "var(--color-accent-300)" }}>{promptStr}</span>
        <span style={{ color: "var(--color-neutral-500)" }}>:</span>
        <span style={{ color: "#8aa0cc" }}>~</span>
        <span style={{ color: "var(--color-neutral-500)" }}>$ </span>
      </>
    );

    const rootStyle: CSSProperties = {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background:
        "radial-gradient(1200px 600px at 15% -10%, color-mix(in oklab, var(--color-accent) 10%, transparent), transparent 60%), radial-gradient(900px 500px at 100% 110%, color-mix(in oklab, var(--color-accent) 7%, transparent), transparent 55%), var(--color-bg)",
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    };

    return (
      <div ref={(el) => { this.root = el; if (el) this.applyTheme(this.state.theme); }} onClick={this.focusInput} style={rootStyle}>
        <div
          ref={(el) => (this.screen = el)}
          className="term-screen"
          style={{
            position: "relative",
            flex: 1,
            overflowY: "auto",
            padding: "clamp(16px, 3vh, 32px) clamp(16px, 4vw, 60px) clamp(24px, 5vh, 48px)",
            fontSize: "clamp(13px, 1.5vw, 15px)",
            lineHeight: 1.7,
            color: "var(--color-text)",
          }}
        >
          {scanlines && (
            <div
              style={{
                pointerEvents: "none",
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
                mixBlendMode: "overlay",
                zIndex: 2,
              }}
            />
          )}

          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                animation: "term-fade 0.12s ease-out",
              }}
            >
              {line.isPrompt && promptPrefix}
              {line.hasHref ? (
                <a
                  href={line.href}
                  target={line.download ? undefined : "_blank"}
                  rel="noopener"
                  download={line.download ? "" : undefined}
                  style={{ color: "var(--color-accent-300)" }}
                >
                  {line.text}
                </a>
              ) : (
                <span
                  onClick={line.onClick}
                  style={{ color: line.color, cursor: line.onClick ? "pointer" : undefined }}
                >
                  {line.text}
                </span>
              )}
            </div>
          ))}

          {booted && (
            <div style={{ position: "relative", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {promptPrefix}
              <span style={{ color: "var(--color-text)" }}>{input}</span>
              <span
                style={{
                  display: "inline-block",
                  width: "0.55em",
                  height: "1.05em",
                  background: "var(--color-accent)",
                  verticalAlign: "text-bottom",
                  marginLeft: "1px",
                  animation: "term-blink 1.05s step-end infinite",
                }}
              />
              <input
                ref={(el) => (this.input = el)}
                value={input}
                onChange={(e) => {
                  if (!this.state.autoplay) this.safeSetState({ input: e.target.value });
                }}
                onKeyDown={this.onKey}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                aria-label="terminal input"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  opacity: 0,
                  border: 0,
                  background: "transparent",
                  font: "inherit",
                  color: "transparent",
                  caretColor: "transparent",
                  outline: "none",
                }}
              />
            </div>
          )}

          {showSuggest && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px 14px",
                marginTop: "8px",
                color: "var(--color-neutral-500)",
                fontSize: "0.88em",
              }}
            >
              <span style={{ color: "var(--color-neutral-500)" }}>try:</span>
              {suggestions.map((name) => (
                <span
                  key={name}
                  className="term-suggest"
                  onClick={(e) => this.runSuggestion(name, e)}
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>

        {matrix && (
          <div
            onClick={() => this.safeSetState({ matrix: false })}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "#0a0c14",
              cursor: "pointer",
            }}
          >
            <canvas
              ref={(el) => (this.matrixCanvas = el)}
              style={{ display: "block", width: "100%", height: "100%" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "22px",
                left: 0,
                right: 0,
                textAlign: "center",
                color: "var(--color-neutral-400)",
                fontSize: "13px",
                letterSpacing: "0.04em",
                fontFamily: "'JetBrains Mono', monospace",
                textShadow: "0 0 8px #000",
              }}
            >
              press any key or click to exit
            </div>
          </div>
        )}
      </div>
    );
  }
}
