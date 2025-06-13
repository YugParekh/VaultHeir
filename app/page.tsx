import Link from "next/link"
import { ArrowRight, Lock, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6" />
            <span className="text-xl font-bold">VaultHeir</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium">
              How It Works
            </Link>
            <Link href="#security" className="text-sm font-medium">
              Security
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                  Secure Your Legacy, Protect Your Family's Future
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  VaultHeir provides a secure digital vault for all your financial assets, ensuring your loved ones can
                  access critical information when they need it most.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative lg:pl-10">
                <div className="relative bg-background border rounded-xl shadow-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 border-b pb-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Bank Accounts</h3>
                        <p className="text-sm text-muted-foreground">4 accounts securely stored</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 border-b pb-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Insurance Policies</h3>
                        <p className="text-sm text-muted-foreground">2 policies documented</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Nominated Heirs</h3>
                        <p className="text-sm text-muted-foreground">3 family members added</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Key Features</h2>
              <p className="text-muted-foreground md:text-lg mt-2">Everything you need to secure your digital legacy</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <div className="bg-primary/10 p-2 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Military-Grade Encryption</h3>
                <p className="text-muted-foreground">
                  AES-256 encryption ensures your data remains secure and private at all times.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <div className="bg-primary/10 p-2 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Legacy Access System</h3>
                <p className="text-muted-foreground">
                  Define who can access your information and under what conditions.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg border shadow-sm">
                <div className="bg-primary/10 p-2 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Death Verification</h3>
                <p className="text-muted-foreground">
                  Multiple verification methods ensure only authorized access after death.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
              <p className="text-muted-foreground md:text-lg mt-2">Simple steps to secure your legacy</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="bg-background border h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Create Your Vault</h3>
                <p className="text-muted-foreground">
                  Sign up and set up your secure digital vault with multi-factor authentication.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-background border h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Add Your Assets</h3>
                <p className="text-muted-foreground">
                  Document all your financial accounts, properties, and important documents.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-background border h-12 w-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Designate Heirs</h3>
                <p className="text-muted-foreground">
                  Set up access rules for your nominees and define when they can access your information.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Security First Approach</h2>
                <p className="text-muted-foreground">
                  We've built VaultHeir with security as our top priority. Your data is encrypted using AES-256
                  encryption, and we employ a zero-trust architecture to ensure maximum protection.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>End-to-end encryption for all data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Multi-factor authentication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Biometric verification options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Regular security audits</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-background border rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Our Security Promise</h3>
                  <p className="text-muted-foreground mb-4">
                    We never have access to your unencrypted data. Your information is only accessible to you and the
                    heirs you designate, under the conditions you specify.
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium">Security Certifications:</p>
                    <div className="flex gap-4 mt-2">
                      <div className="bg-muted p-2 rounded">ISO 27001</div>
                      <div className="bg-muted p-2 rounded">GDPR Compliant</div>
                      <div className="bg-muted p-2 rounded">SOC 2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Ready to Secure Your Legacy?</h2>
            <p className="md:text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust VaultHeir to protect their digital legacy and ensure their loved ones
              are taken care of.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Create Your Vault Today
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row md:h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <span className="font-semibold">VaultHeir</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 VaultHeir. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
