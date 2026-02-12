import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Akshay Shenvi</h1>
          <p className="text-xl text-muted-foreground mb-4">
            Software Engineer 2 at Expedia Group
          </p>
          <nav className="flex gap-4">
            <a href="#about" className="text-primary hover:underline">
              About
            </a>
            <a href="#experience" className="text-primary hover:underline">
              Experience
            </a>
            <a href="#contact" className="text-primary hover:underline">
              Contact
            </a>
          </nav>
        </header>

        <section id="about" className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">About Me</h2>
          <p className="text-muted-foreground leading-relaxed">
            A meticulous, detail oriented Full Stack Software Engineer,
            excellent at juggling multiple tasks & working under pressure. A
            result oriented creative thinker with the ability to learn new
            technologies & concepts quickly. I am looking to work with an
            organization where I can learn & grow professionally, to seek mutual
            benefit, in the fields of Artificial Intelligence, Data Science &
            Analytics & end-to-end Software Development.
          </p>
        </section>

        <section id="experience" className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Experience</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Software Engineer 2 @ Expedia Group</CardTitle>
                <p className="text-sm text-muted-foreground">
                  May 2022 - Present | Austin, TX
                </p>
              </CardHeader>
              <CardContent>
                <p>
                  Software Engineer 2 at Expedia Group, building scalable,
                  high-performance Identity travel technology that helps
                  millions of travelers log in to Expedia and find their perfect
                  trip. I work across the full development lifecycle—from
                  architecture and coding to deployment and
                  optimization—focusing on reliability, clean design, and
                  measurable impact. Passionate about solving complex problems,
                  collaborating across teams, and continually improving user
                  experiences through thoughtful engineering.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Software Engineer @ AM RE Syndicate Inc</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Nov 2020 - May 2022 | Dallas, TX
                </p>
              </CardHeader>
              <CardContent>
                <p>Worked as a Software Engineer at AM RE Syndicate Inc.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Full Stack Engineer @ The University of Texas at Arlington
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Sept 2020 - Nov 2020
                </p>
              </CardHeader>
              <CardContent>
                <p>
                  Creating an open-source framework to Annotate hand signs in
                  video streaming data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Machine Learning Intern @ Digital Reasoning
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  June 2020 - Sept 2020 | Franklin, TN
                </p>
              </CardHeader>
              <CardContent>
                <p>
                  Researching and Developing an End-to-End(E2E) multi-language
                  text transcription model on SEAME Audio data using NLP and
                  Machine Learning concepts. Modeled data by cutting out chunks
                  of audio transcripts and use it to experiment
                  sequence-to-sequence model. Data collection and modeling for
                  poems recommendation system. Performed N-gram modeling, data
                  analysis & visualization for a single author.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="contact">
          <h2 className="text-3xl font-semibold mb-4">Contact</h2>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> akshay@example.com
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/akshay-shenvi/"
                className="text-primary hover:underline"
              >
                https://www.linkedin.com/in/akshay-shenvi/
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
