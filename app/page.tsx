import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Zap, Shield, Coins, Brain, Globe, ChevronRight } from "lucide-react"
import { ScrollProgress } from "@/components/scroll-progress"
import { MagneticButton } from "@/components/magnetic-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />

      <div className="mesh-gradient fixed inset-0 -z-10" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary glow-cyan float-animation"></div>
            <span className="text-xl font-semibold">Digital Pioneers</span>
          </div>
          <MagneticButton className="liquid-fill hover-glow-cyan">
            Join the Collective
            <ArrowRight className="ml-2 h-4 w-4" />
          </MagneticButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 glow-lime float-animation">
            Web3 Marketing Revolution
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shimmer">Marketing Belongs to the Makers.</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The Digital Pioneers Collective is a community-owned marketing hub where creators, brands, and fans build
            together. We use AI and Web3 to share ownership, profits, and success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton size="lg" className="text-lg px-8 py-6 liquid-fill glow-pulse">
              Join the Collective
              <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
            <MagneticButton variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent border-draw">
              Read the Whitepaper
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8">The Old Map is Broken</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            For too long, the digital world has run on a broken model. Creators burn out on unpredictable algorithms.
            Brands spend fortunes shouting into the void. Fans give their passion and get ads in return. Value flows up
            to a handful of platforms, leaving the people who create the culture with little to say and even less to
            own.
          </p>
          <div className="text-2xl font-semibold text-primary text-shimmer">We're drawing a new map.</div>
        </div>
      </section>

      {/* What is DPC Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What is the Digital Pioneers Collective?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We are a tokenized community that funds, creates, and launches marketing campaigns for the next generation
              of culture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-glow-cyan card-lift">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Decentralized Agency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A marketing agency owned and operated by the community, not shareholders.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-glow-lime card-lift">
              <CardHeader>
                <Zap className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>Creative Incubator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Where breakthrough ideas get the funding and support they need to thrive.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-glow-cyan card-lift">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fan Club</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A community where passion translates to ownership and shared success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How It Works: The Flywheel of Value</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our model is designed to be a self-reinforcing loop where participation creates value, and value is shared
              back with the participants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative hover-glow-cyan card-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="glow-lime">
                    Step 1
                  </Badge>
                  <Coins className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Join the Collective</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Acquire $DPC tokens by contributing skills, participating in the community, or purchasing directly.
                </p>
              </CardContent>
            </Card>

            <Card className="relative hover-glow-lime card-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="glow-lime">
                    Step 2
                  </Badge>
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Co-Create & Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use quadratic voting to decide which campaign briefs get the green light and community funding.
                </p>
              </CardContent>
            </Card>

            <Card className="relative hover-glow-cyan card-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="glow-lime">
                    Step 3
                  </Badge>
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Launch & Execute</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our network collaborates to bring campaigns to life with transparent, on-chain treasury management.
                </p>
              </CardContent>
            </Card>

            <Card className="relative hover-glow-lime card-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="glow-lime">
                    Step 4
                  </Badge>
                  <Globe className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Share the Success</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Smart contracts automatically distribute revenues back to participants and the community treasury.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Brain className="h-16 w-16 text-primary mx-auto mb-6 glow-cyan float-animation" />
            <h2 className="text-4xl font-bold mb-6">Our AI Assistant: Your Transparent Co-Pilot</h2>
            <p className="text-lg text-muted-foreground">
              Our governance is supercharged by a custom-trained AI assistant. But this isn't a black box making secret
              decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover-glow-cyan card-lift">
              <CardHeader>
                <CardTitle>It Drafts, You Decide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The AI helps draft proposals and summarize feedback, but has no power to act alone.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-glow-lime card-lift">
              <CardHeader>
                <CardTitle>Radical Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every prompt and output is recorded on the blockchain for anyone to verify.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-glow-cyan card-lift">
              <CardHeader>
                <CardTitle>Human Oversight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every AI proposal requires human review and community vote before enactment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Creators Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Own Your Audience. Fund Your Vision.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop building your empire on rented land. The Collective gives you the tools and the community to build
                a direct, meaningful relationship with your fans.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Co-Ownership</h3>
                    <p className="text-muted-foreground">
                      Turn your fans into true partners with token-gated access and NFT badges.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Coins className="h-6 w-6 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Community Funding</h3>
                    <p className="text-muted-foreground">
                      Get your projects funded directly by the people who believe in them most.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Zap className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Transparent Revenue</h3>
                    <p className="text-muted-foreground">
                      Smart contracts ensure instant, fair payments and sustainable creative careers.
                    </p>
                  </div>
                </div>
              </div>

              <MagneticButton className="mt-8 liquid-fill hover-glow-cyan">
                Launch with Us
                <ChevronRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </div>

            <div className="relative">
              <Card className="glow-lime card-lift">
                <CardHeader>
                  <CardTitle>For Creators & Artists</CardTitle>
                  <CardDescription>Build your sustainable creative empire</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Community Size</span>
                      <Badge variant="secondary">10,000+ Pioneers</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Avg. Funding</span>
                      <Badge variant="secondary">$50K - $500K</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Revenue Share</span>
                      <Badge variant="secondary">Up to 80%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* For Brands Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Card className="glow-cyan card-lift">
                <CardHeader>
                  <CardTitle>For Brands & Businesses</CardTitle>
                  <CardDescription>Market with culture, not just ads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Campaign ROI</span>
                      <Badge variant="secondary">3x - 10x</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Engagement Rate</span>
                      <Badge variant="secondary">25% - 60%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Transparency</span>
                      <Badge variant="secondary">100% On-Chain</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">Market with Culture, Not Just Ads.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tired of campaigns that feel transactional and temporary? Tap into a community that genuinely wants to
                build with you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Authentic Engagement</h3>
                    <p className="text-muted-foreground">
                      Co-create campaigns with a built-in audience of passionate advocates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-secondary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Verifiable ROI</h3>
                    <p className="text-muted-foreground">
                      All campaign funds and revenue flows are published on-chain.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Badge className="mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">On-Chain Reputation</h3>
                    <p className="text-muted-foreground">
                      Work with marketers whose track records are verified on the blockchain.
                    </p>
                  </div>
                </div>
              </div>

              <MagneticButton className="mt-8 liquid-fill hover-glow-lime">
                Start a Campaign
                <ChevronRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-12">Our Manifesto: The Pioneer's Code</h2>
          <p className="text-lg text-muted-foreground mb-12">These are the principles that guide our journey.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="text-left hover-glow-cyan card-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 text-primary mr-3" />
                  Ownership is Power
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe the people who create value should own a piece of it. Your data, your content, and your
                  community belong to you.
                </p>
              </CardContent>
            </Card>

            <Card className="text-left hover-glow-lime card-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-6 w-6 text-secondary mr-3" />
                  Transparency Builds Trust
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We operate in the open. Our governance, treasury, and AI actions are verifiable on-chain by anyone, at
                  any time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-left hover-glow-cyan card-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  Fairness is Non-Negotiable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We use quadratic voting to ensure every voice is heard and good ideas, not deep pockets, determine our
                  direction.
                </p>
              </CardContent>
            </Card>

            <Card className="text-left hover-glow-lime card-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-6 w-6 text-secondary mr-3" />
                  Community is Everything
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We are a collective of builders, dreamers, and pioneers. We succeed together, or not at all.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-shimmer">Join the Frontier</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            The digital world is vast, and the old maps won't lead us where we need to go. It's time to explore, to
            build, and to own the future together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <MagneticButton size="lg" className="text-lg px-8 py-6 liquid-fill glow-pulse">
              Enter the Discord
              <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
            <MagneticButton variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent border-draw">
              Read the Whitepaper
            </MagneticButton>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Follow us on X
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Join Discord
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Read Whitepaper
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary glow-cyan"></div>
                <span className="text-xl font-semibold">Digital Pioneers</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Building the future of community-owned marketing through AI and Web3.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Discord
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Twitter
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Telegram
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Whitepaper
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Digital Pioneers Collective. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
