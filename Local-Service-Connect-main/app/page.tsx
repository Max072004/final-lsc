"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HoverEffect } from "@/components/HoverEffect"
import { FlipWords } from "@/components/FlipWords"
import AnimatedButton from "@/components/AnimatedButton"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LandingPage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  const user = localStorage.getItem("user");
  const storedUser = user ? JSON.parse(user) : null;
  console.log("stored user ",storedUser);
  const services = [
    {
      title: "Plumbing",
      description: "Expert plumbing services for all your household needs.",
      link: "/services/plumbing",
    },
    {
      title: "Electrical",
      description: "Professional electrical work to keep your home powered and safe.",
      link: "/services/electrical",
    },
    {
      title: "Cleaning",
      description: "Thorough cleaning services to maintain a spotless home.",
      link: "/services/cleaning",
    },
    {
      title: "Carpentry",
      description: "Skilled carpentry for repairs, renovations, and custom projects.",
      link: "/services/carpentry",
    },
    {
      title: "Painting",
      description: "Transform your space with our professional painting services.",
      link: "/services/painting",
    },
    {
      title: "Gardening",
      description: "Keep your outdoor areas beautiful with our gardening expertise.",
      link: "/services/gardening",
    },
  ]
  const handlelogout =async() => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/users/logout",{withCredentials:true});
      if(response.data.success){
        localStorage.removeItem("user");
        toast.success("Logout done");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  }
  const flipWords = [
    "Connecting You to Trusted Local Experts!",
    "Quick, Reliable, and Hassle-Free Home Services!",
    "Find. Hire. Get It Done!",
    "Your One-Stop Solution for Home Services!",
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-indigo-200 text-gray-800">
      <ToastContainer />
      <header className="bg-gradient-to-r from-purple-400 to-indigo-500 shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                L
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              LOCAL SERVICE <span className="text-purple-200">CONNECT</span>
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-purple-200 transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-white hover:text-purple-200 transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-purple-200 transition-colors duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Contact
            </button>
          </nav>
          <div className="hidden md:block">
            {storedUser ?(<Button onClick={handlelogout} className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Logout</span>
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors duration-300"></div>
            </Button>) :(<AnimatedButton className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors duration-300"></div>
            </AnimatedButton>)}
          </div>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-400 to-indigo-500 py-4">
          <nav className="flex flex-col items-center space-y-4">
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-purple-200 transition-colors duration-300"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-white hover:text-purple-200 transition-colors duration-300"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-purple-200 transition-colors duration-300"
            >
              Contact
            </button>
            <AnimatedButton className="group animate-rainbow text-white hover:text-purple-200">
              <span>Login</span>
            </AnimatedButton>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        <motion.section
          className="bg-gradient-to-br from-purple-200 to-indigo-300 py-20 relative overflow-hidden"
          style={{
            backgroundPositionY: `${scrollY * 0.5}px`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl text-indigo-900"
              >
                <FlipWords
                  words={flipWords}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
                />
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-5 max-w-xl mx-auto text-xl text-indigo-700"
              >
                Connect with skilled local professionals for all your home service needs.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 flex justify-center"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                  onClick={() => scrollToSection("services")}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-indigo-300 opacity-50"></div>
        </motion.section>

        <section id="services" className="py-16 bg-gradient-to-br from-purple-100 to-indigo-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-extrabold text-center mb-8 text-indigo-900"
            >
              Our Services
            </motion.h2>
            <HoverEffect items={services} />
          </div>
        </section>

        <section id="how-it-works" className="bg-gradient-to-br from-purple-300 to-indigo-400 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-extrabold text-center mb-12 text-white relative"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-200">
                How It Works
              </span>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-purple-200 to-indigo-200"
              ></motion.div>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Book a Service", description: "Choose the service you need and select a convenient time." },
                { title: "Get Matched", description: "We'll connect you with a skilled local professional." },
                {
                  title: "Job Done",
                  description: "Your service provider arrives and completes the job to your satisfaction.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300 border-t-4 border-purple-500"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="flex items-center justify-center mb-4"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                      {index + 1}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2 text-center">{step.title}</h3>
                  <p className="text-indigo-700 text-center">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 bg-gradient-to-br from-purple-100 to-indigo-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-extrabold text-center mb-8 text-indigo-900"
            >
              Contact Us
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow-xl p-6 md:p-8"
            >
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-indigo-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-indigo-900"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-indigo-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-indigo-900"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-indigo-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 bg-purple-50 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-indigo-900"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-purple-400 to-indigo-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white mb-4 md:mb-0">&copy; 2025 LOCAL SERVICE CONNECT. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-white hover:text-purple-200 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white hover:text-purple-200 transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

