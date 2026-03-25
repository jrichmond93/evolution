import React from "react";
import { Card } from "react-bootstrap";
import SEO from "../components/SEO";

const resources = [
  {
    section: "AI-Powered Websites",
    items: [
      {
        name: "Grok",
        url: "https://grok.com/",
        desc: "An AI assistant built by xAI, offering witty, insightful responses to queries across topics, accessible via web, apps, and integrated experiences for everyday curiosity and problem-solving."
      },
      {
        name: "Alternate History AI",
        url: "https://althistai.com/",
        desc: "Interactive AI-powered platform for exploring alternate historical timelines, analyzing real events, simulating outcomes by changing key decisions, and visualizing cause and effect."
      },
      {
        name: "AI Stock Tickers",
        url: "https://aistocktickers.com/",
        desc: "Stock analysis, trading, and AI-powered insights, featuring current market data, interactive charts, personalized investment tools, and comprehensive research."
      },
      {
        name: "Finster Chat",
        url: "https://www.finsterchat.com/",
        desc: "AI financial assistant providing 24/7 personalized guidance on wealth management, investment strategies, debt management, and retirement planning."
      },
      {
        name: "ChatGPT",
        url: "https://chat.openai.com/",
        desc: "OpenAI's conversational AI model for generating human-like text, brainstorming ideas, coding assistance, and answering complex questions."
      },
      {
        name: "Google Gemini",
        url: "https://gemini.google.com/",
        desc: "Google's multimodal AI for creative tasks, productivity boosts, and information synthesis, integrating text, images, and code."
      },
      {
        name: "Microsoft Copilot",
        url: "https://copilot.microsoft.com/",
        desc: "AI companion embedded in Microsoft tools, helping with email drafting, data analysis, image generation, and workflow automation."
      },
      {
        name: "Synthesia",
        url: "https://www.synthesia.io/",
        desc: "AI video generation platform that creates professional videos from text scripts using realistic avatars."
      },
      {
        name: "Perplexity AI",
        url: "https://www.perplexity.ai/",
        desc: "AI-driven search engine delivering concise, accurate answers with cited sources, combining web search with natural language processing."
      },
      {
        name: "Runway",
        url: "https://runwayml.com/",
        desc: "A suite of AI tools for video editing, generation, and effects, enabling creators to produce cinematic content, remove backgrounds, or animate scenes effortlessly."
      },
      {
        name: "AI Sure Tech",
        url: "https://aisuretech.com/",
        desc: "AI-Powered Website Network. Discover AI-driven tools, education, and insights for your growth."
      },
      {
        name: "Learn AI Stock Tickers",
        url: "https://learn.aistocktickers.com/",
        desc: "Master Stock Market Investing with AI. Transform your investment journey with comprehensive educational resources powered by cutting-edge AI analysis."
      },
      {
        name: "AI Evolution Explorer",
        url: "https://www.aievolutionexplorer.com/",
        desc: "Discover the evolutionary history of animals, explore fascinating facts, and learn about the diversity of life on Earth."
      },
      {
        name: "AI Wisdom Council",
        url: "https://www.aiwisdomcouncil.com/",
        desc: "Choose an advisor and begin asking your questions — each member of the Wisdom Council offers a unique perspective."
      },
      {
        name: "Feather Guess",
        url: "https://featherguess.com/",
        desc: "Test your bird knowledge. Guess the feather!"
      },
      {
        name: "Create A Dish",
        url: "https://www.createadish.com/",
        desc: "Your ultimate culinary companion, designed to help home cooks and food enthusiasts discover and create delicious recipes tailored to their preferences."
      },
      {
        name: "AltHistAI Explore",
        url: "https://althistai.aisuretech.com/",
        desc: "Explore the Paths Not Taken. Discover how history could have unfolded differently with AI-powered interactive simulations."
      },
      {
        name: "Balanced Debate",
        url: "https://www.balanceddebate.com/",
        desc: "Explores diverse perspectives through structured debate, presenting balanced arguments on a wide range of topics using advanced AI technology."
      },
      {
        name: "AI Trendified",
        url: "https://www.aitrendified.com/",
        desc: "Today's Trending Digest. Explore the most talked-about topics with matching TED talks and AI insights."
      },
      {
        name: "Kitty Vids",
        url: "https://www.kitty-vids.com/",
        desc: "Your ultimate destination for adorable cat videos and comprehensive cat care guides."
      },
      {
        name: "Puppy Vids",
        url: "https://www.puppy-vids.com/",
        desc: "Your ultimate destination for adorable dog videos and comprehensive dog care guides."
      },
      {
        name: "AI Stock Tickers Blog",
        url: "https://blog.aistocktickers.com/",
        desc: "AI-Powered Market Intelligence & Insights. Discover cutting-edge analysis on AI-driven stock trading, algorithmic strategies, and financial technology innovations."
      },
      {
        name: "A Stoic Says",
        url: "https://astoicsays.com/",
        desc: "Today's headlines paired with timeless Stoic wisdom. Daily opinion pieces accompanied with Stoic reflections inspired by Marcus Aurelius and Epictetus."
      },
      {
        name: "Cryptiment",
        url: "https://cryptiment.com/",
        desc: "Advanced cryptocurrency sentiment analysis powered by real-time data from social media, news sources, and on-chain metrics."
      },
      {
        name: "Idea To Market AI",
        url: "https://www.ideatomarketai.com/",
        desc: "Professional-grade market research tools to validate business ideas, understand markets, and make informed decisions with confidence."
      },
      {
        name: "Opposing Point",
        url: "https://opposingpoint.com/",
        desc: "Escape the Echo Chamber and Challenge Your Ideas with AI Precision. AI modes challenge your thinking, expose logical fallacies, and prepare you for real-world opposition."
      },
      {
        name: "Ideo Bridge",
        url: "https://ideobridge.com/",
        desc: "Bridge ideological divides through respectful dialogue. Curates daily opinions from diverse perspectives and generates thoughtful counter-responses."
      },
      {
        name: "AI Mortgage Calc",
        url: "https://aimortgagecalc.com/",
        desc: "Calculate your mortgage payments with precision. Get detailed amortization schedules, payment breakdowns, and AI-powered explanations."
      },
      {
        name: "Policy Clown",
        url: "https://policyclown.com/",
        desc: "Daily satirical political predictions powered by artificial intelligence, combining breaking news with documented political stances for entertainment."
      }
    ]
  },
  {
    section: "Evolution and Nature Resources",
    items: [
      {
        name: "National Center for Science Education",
        url: "https://ncse.ngo/",
        desc: "Information and resources on teaching biological evolution, including legislation, school board activities, and debunking intelligent design arguments."
      },
      {
        name: "Understanding Evolution",
        url: "https://evolution.berkeley.edu/",
        desc: "Comprehensive educational resource from UC Berkeley, offering interactive modules, teaching tools, and materials on evolution topics."
      },
      {
        name: "UC Berkeley Museum of Paleontology",
        url: "https://ucmp.berkeley.edu/exhibit/exhibits.html",
        desc: "Online source of information on evolution, geology, and phylogeny, with exhibits and resources."
      },
      {
        name: "PBS Evolution",
        url: "https://www.pbs.org/wgbh/evolution/",
        desc: "Educational resource complementing the PBS series, with interactive features, articles, and materials on adaptation, natural selection, and human evolution."
      },
      {
        name: "DNA Interactive",
        url: "https://www.dnaftb.org/",
        desc: "Resources focused on human evolution and DNA, including a section on human origins."
      },
      {
        name: "HHMI BioInteractive",
        url: "https://www.biointeractive.org/",
        desc: "Animations and resources on the evolution of the Y chromosome and other biology topics."
      }
    ]
  },
  {
    section: "AI Resources",
    items: [
      {
        name: "aiEDU: The AI Education Project",
        url: "https://www.aiedu.org/",
        desc: "Curriculum with low-tech lessons and high-interest projects to help students explore AI concepts."
      },
      {
        name: "Code.org",
        url: "https://code.org/",
        desc: "Free coding resources and lessons, including AI-related activities for K–12 students."
      },
      {
        name: "Machine Learning for Kids",
        url: "https://machinelearningforkids.co.uk/",
        desc: "Introductory tool to machine learning and AI that doesn’t require coding, suitable for grades 3–12."
      },
      {
        name: "Teachable Machine",
        url: "https://teachablemachine.withgoogle.com/",
        desc: "Family-focused, classroom-friendly tool for learning AI and machine learning concepts."
      },
      {
        name: "MIT Scratch",
        url: "https://scratch.mit.edu/",
        desc: "Block-based programming platform for kids, with creative projects and AI extensions."
      }
    ]
  },
  {
    section: "More Websites by AI Sure Tech",
    items: [
      {
        name: "Headline Lingo",
        url: "https://headlinelingo.com/",
        desc: "Master Spanish, French, German, and more by reading today's top news stories. Get instant AI-powered translations, detailed grammar explanations, and save vocabulary to your personal library. Free language learning through real-world content."
      },
      {
        name: "Task Breezer",
        url: "https://taskbreezer.com/",
        desc: "Task Breezer is a modern, intuitive Kanban board application designed to help you manage your tasks with ease and efficiency. We believe task management should be simple, fast, and accessible to everyone. Task Breezer combines powerful features with a clean interface to help you stay organized and productive without overwhelming complexity."
      },
      {
        name: "Daily Earth View",
        url: "https://dailyearthview.com",
        desc: "Discover breathtaking daily Earth views from space, captured by NASA's EPIC camera on the DSCOVR spacecraft. Dive into interactive images showcasing our planet's dynamic weather patterns, cloud formations, rotating landscapes, and natural phenomena in high-resolution detail. Ideal for space enthusiasts, educators, and anyone captivated by the iconic blue marble Earth - explore the ultimate Earth from space archive at DailyEarthView.com."
      },
      {
        name: "Daily Calm AI",
        url: "https://dailycalmai.com",
        desc: "Daily Calm AI helps you calm down fast, build a simple self care routine, and generate personalized affirmations without clutter. Explore practical self care ideas, stress relief techniques (including breathing exercises and grounding scripts), and daily affirmations you can repeat in minutes."
      },
      {
        name: "Goals To Systems",
        url: "https://goalstosystems.com",
        desc: "AI-powered tool for transforming ambitious goals into sustainable systems. Turns your objective into repeatable processes that build momentum over time. Where personal development becomes accessible, fun, and effective - no lectures, just practical support."
      },
      {
        name: "Dice Odysseys",
        url: "https://diceodysseys.com/",
        desc: "Dice Odyssey is an immersive web-based dice game that blends ancient Odyssey myths with sci-fi strategy, where players race across a shrinking galaxy to claim cosmic MacGuffins using clever dice allocations for movement, claims, and sabotage. Choose from diverse AI opponents like the heroic Odys or enchanting Circe, or challenge friends in seamless multiplayer sessions - perfect for quick solo distractions or epic group battles. Built for board game enthusiasts, it is free to play with easy hotseat options and upcoming real-time online features, turning nostalgic classics into portable galactic adventures."
      },
      {
        name: "Dog Weave",
        url: "https://www.dogweave.com/",
        desc: "Dog Weave is an interactive simulator where you can combine different breeds of dog, predict trait blends, and explore multi-generation outcomes. More than just an image creation tool, Dog Weave is an AI dog genetics simulator. Continue breeding from each hybrid to map evolving family trees over generations."
      }
    ]
  }
];

const Resources: React.FC = () => (
  <>
    <SEO 
      title="Resources - Evolution, Nature & AI Learning - Evolution Explorer"
      description="Curated educational resources on evolution, natural history, artificial intelligence, and AI-powered learning tools. Explore museums, documentaries, and interactive websites."
      keywords="resources, educational links, museums, documentaries, AI tools, learning resources, evolution resources, nature education"
      canonicalUrl="https://aievolutionexplorer.com/resources"
    />
    <main className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div className="row w-100 justify-content-center" style={{ maxWidth: 900 }}>
      <div className="col-12">
        <Card className="shadow border-0 mb-4">
          <Card.Body>
            <h1 className="h3 fw-bold mb-3 text-success">Recommended Resources</h1>
            <p className="mb-4">Explore these trusted resources to learn more about evolution, nature, and artificial intelligence. These links are curated for students, educators, and curious minds of all ages.</p>
            {resources.map(section => (
              <div key={section.section} className="mb-4">
                <h2 className="h5 fw-semibold mb-3">{section.section}</h2>
                <ul className="list-unstyled">
                  {section.items.map(item => (
                    <li key={item.url} className="mb-3">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="fw-semibold text-primary" style={{ fontSize: '1.08rem' }}>{item.name}</a>
                      <div className="text-muted small ms-2">{item.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  </main>
  </>
);

export default Resources;
