"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ServiceSidebar } from "@/components/ServiceSidebar"
import { ExpandableServiceDetails } from "@/components/ExpandableServiceDetails"
import { Menu } from "lucide-react"

const services = {
  plumbing: {
    title: "Plumbing",
    src: "/plumbing1.jpg",
    description:
      "Expert plumbing services for all your household needs. Our skilled professionals are equipped to handle everything from minor repairs to major installations.",
    workers: [
      {
        name: "John Doe",
        experience: "10 years",
        rating: 4.8,
        bio: "Master plumber with extensive experience in residential and commercial plumbing. Specializes in complex installations and repairs.",
        availability: ["Monday to Friday, 9 AM - 5 PM", "Saturday, 10 AM - 2 PM"],
        specialties: ["Pipe installation", "Leak detection", "Water heater repair"],
      },
      {
        name: "Sarah Wilson",
        experience: "7 years",
        rating: 4.5,
        bio: "Specialized in modern plumbing solutions and eco-friendly installations. Expert in water conservation systems.",
        availability: ["Tuesday to Saturday, 8 AM - 4 PM"],
        specialties: ["Green plumbing", "Bathroom renovation", "Water conservation"],
      },
      {
        name: "Mike Chen",
        experience: "3 years",
        rating: 4.2,
        bio: "Skilled in emergency repairs and quick problem resolution. Available for urgent calls.",
        availability: ["Monday to Friday, 10 AM - 6 PM", "On-call weekends"],
        specialties: ["Emergency repairs", "Drain cleaning", "Fixture installation"],
      },
      {
        name: "Emma Rodriguez",
        experience: "5 years",
        rating: 4.9,
        bio: "Expert in commercial plumbing systems and large-scale projects. Specializes in system design.",
        availability: ["Monday to Friday, 7 AM - 3 PM"],
        specialties: ["Commercial plumbing", "System design", "Maintenance"],
      },
      {
        name: "David Kumar",
        experience: "2 years",
        rating: 3.8,
        bio: "Specializing in residential plumbing and maintenance. Focused on customer service.",
        availability: ["Wednesday to Sunday, 9 AM - 5 PM"],
        specialties: ["Residential repairs", "Maintenance", "Small installations"],
      },
      {
        name: "Lisa Zhang",
        experience: "8 years",
        rating: 4.7,
        bio: "Master plumber with expertise in sustainable solutions and water efficiency.",
        availability: ["Monday to Friday, 8 AM - 4 PM"],
        specialties: ["Sustainable plumbing", "Solar water heating", "Water recycling"],
      },
      {
        name: "James Anderson",
        experience: "1 year",
        rating: 3.5,
        bio: "Fresh perspective with modern technical training. Eager to learn and assist.",
        availability: ["Flexible schedule", "Weekend availability"],
        specialties: ["Basic repairs", "Maintenance", "Fixture replacement"],
      },
      {
        name: "Maria Garcia",
        experience: "6 years",
        rating: 4.4,
        bio: "Specialized in kitchen and bathroom renovations. Expert in fixture installations.",
        availability: ["Tuesday to Saturday, 9 AM - 5 PM"],
        specialties: ["Kitchen plumbing", "Bathroom remodeling", "Fixture upgrades"],
      },
      {
        name: "Tom Wilson",
        experience: "4 years",
        rating: 4.0,
        bio: "Focused on residential and small commercial projects. Detail-oriented approach.",
        availability: ["Monday to Friday, 8 AM - 4 PM", "Saturday by appointment"],
        specialties: ["General repairs", "Installation", "Maintenance"],
      },
      {
        name: "Alex Thompson",
        experience: "9 years",
        rating: 4.6,
        bio: "Expert in complex plumbing systems and custom solutions. Problem-solving specialist.",
        availability: ["Monday to Friday, 7 AM - 3 PM"],
        specialties: ["Custom installations", "System design", "Troubleshooting"],
      },
      {
        name: "Rachel Kim",
        experience: "2 years",
        rating: 3.9,
        bio: "Specializing in modern fixture installations and repairs. Tech-savvy approach.",
        availability: ["Wednesday to Sunday, 10 AM - 6 PM"],
        specialties: ["Modern fixtures", "Basic repairs", "Maintenance"],
      },
      {
        name: "Carlos Martinez",
        experience: "5 years",
        rating: 4.3,
        bio: "Expert in water system optimization and efficiency. Focused on preventive maintenance.",
        availability: ["Monday to Friday, 9 AM - 5 PM"],
        specialties: ["Water systems", "Efficiency upgrades", "Maintenance"],
      },
    ],
  },
  cleaning: {
    title: "Cleaning",
    src: "/cleaning1.jpg",
    description:
      "Professional cleaning services to keep your space spotless. Our team uses eco-friendly products and advanced techniques to ensure a thorough clean.",
    workers: [
      {
        name: "Emily Brown",
        experience: "5 years",
        rating: 4.7,
        bio: "Experienced in residential and commercial cleaning with a focus on eco-friendly methods.",
        availability: ["Monday to Friday, 9 AM - 5 PM"],
        specialties: ["Deep cleaning", "Eco-friendly cleaning", "Office cleaning"],
      },
      {
        name: "David Wilson",
        experience: "7 years",
        rating: 4.5,
        bio: "Specialized in commercial space cleaning and organization.",
        availability: ["Tuesday to Saturday, 10 AM - 6 PM"],
        specialties: ["Commercial cleaning", "Floor maintenance", "Window cleaning"],
      },
      {
        name: "Lucy Martinez",
        experience: "3 years",
        rating: 4.2,
        bio: "Expert in residential cleaning and organizing solutions.",
        availability: ["Monday to Friday, 8 AM - 4 PM"],
        specialties: ["Home organization", "Regular maintenance", "Deep cleaning"],
      },
      {
        name: "James Chen",
        experience: "10 years",
        rating: 4.9,
        bio: "Master cleaner with expertise in all types of surfaces and materials.",
        availability: ["Flexible schedule", "Weekend availability"],
        specialties: ["Carpet cleaning", "Upholstery cleaning", "Stain removal"],
      },
      {
        name: "Sophie Turner",
        experience: "2 years",
        rating: 3.8,
        bio: "Specialized in residential cleaning and basic maintenance.",
        availability: ["Wednesday to Sunday, 9 AM - 5 PM"],
        specialties: ["Basic cleaning", "Dusting", "Vacuuming"],
      },
      {
        name: "Marcus Johnson",
        experience: "8 years",
        rating: 4.6,
        bio: "Expert in commercial cleaning and sanitization.",
        availability: ["Monday to Friday, 6 AM - 2 PM"],
        specialties: ["Sanitization", "Commercial spaces", "Medical facilities"],
      },
      {
        name: "Anna Lee",
        experience: "1 year",
        rating: 3.5,
        bio: "Focused on residential cleaning and organization.",
        availability: ["Part-time availability", "Weekends"],
        specialties: ["Basic cleaning", "Organization", "Light maintenance"],
      },
      {
        name: "Robert Smith",
        experience: "6 years",
        rating: 4.4,
        bio: "Specialized in post-construction and renovation cleaning.",
        availability: ["Monday to Friday, 7 AM - 3 PM"],
        specialties: ["Post-construction", "Heavy duty cleaning", "Debris removal"],
      },
      {
        name: "Maria Garcia",
        experience: "4 years",
        rating: 4.0,
        bio: "Expert in residential and small office cleaning.",
        availability: ["Tuesday to Saturday, 8 AM - 4 PM"],
        specialties: ["Home cleaning", "Office cleaning", "Organization"],
      },
      {
        name: "Tom Anderson",
        experience: "9 years",
        rating: 4.8,
        bio: "Specialized in carpet and upholstery cleaning.",
        availability: ["Monday to Friday, 9 AM - 5 PM"],
        specialties: ["Carpet cleaning", "Upholstery", "Stain removal"],
      },
    ],
  },
  electrical: {
    title: "Electrical",
    src: "/electrical1.jpg",
    description:
      "Skilled electricians for all your electrical requirements. From simple repairs to complex installations, our team ensures safety and efficiency in every job.",
    workers: [
      {
        name: "Robert Taylor",
        experience: "10 years",
        rating: 4.9,
        bio: "Master electrician with extensive commercial and residential experience.",
        availability: ["Monday to Friday, 8 AM - 5 PM"],
        specialties: ["Wiring", "Panel upgrades", "Lighting installation"],
      },
      {
        name: "Lisa Anderson",
        experience: "6 years",
        rating: 4.5,
        bio: "Specialized in smart home installations and automation.",
        availability: ["Tuesday to Saturday, 9 AM - 6 PM"],
        specialties: ["Smart home", "Automation", "Security systems"],
      },
      {
        name: "Michael Chang",
        experience: "3 years",
        rating: 3.8,
        bio: "Focused on residential electrical repairs and maintenance.",
        availability: ["Monday to Friday, 7 AM - 3 PM"],
        specialties: ["Basic repairs", "Maintenance", "Troubleshooting"],
      },
      {
        name: "Sarah Johnson",
        experience: "8 years",
        rating: 4.7,
        bio: "Expert in commercial electrical systems and lighting.",
        availability: ["Monday to Friday, 8 AM - 4 PM"],
        specialties: ["Commercial systems", "LED lighting", "Energy efficiency"],
      },
      {
        name: "David Lee",
        experience: "2 years",
        rating: 3.5,
        bio: "Specialized in basic electrical repairs and installations.",
        availability: ["Wednesday to Sunday, 10 AM - 6 PM"],
        specialties: ["Basic installations", "Repairs", "Maintenance"],
      },
      {
        name: "Emma Wilson",
        experience: "7 years",
        rating: 4.6,
        bio: "Expert in renewable energy systems and installations.",
        availability: ["Monday to Friday, 9 AM - 5 PM"],
        specialties: ["Solar systems", "Battery storage", "Green energy"],
      },
      {
        name: "Chris Martinez",
        experience: "4 years",
        rating: 4.2,
        bio: "Specialized in residential and small commercial work.",
        availability: ["Tuesday to Saturday, 8 AM - 4 PM"],
        specialties: ["Residential", "Small commercial", "Maintenance"],
      },
      {
        name: "Jessica Brown",
        experience: "9 years",
        rating: 4.8,
        bio: "Master electrician focusing on industrial installations.",
        availability: ["Monday to Friday, 7 AM - 3 PM"],
        specialties: ["Industrial", "High voltage", "System design"],
      },
      {
        name: "Kevin Park",
        experience: "1 year",
        rating: 3.6,
        bio: "Entry-level electrician with modern training.",
        availability: ["Flexible schedule"],
        specialties: ["Basic repairs", "Assistance", "Maintenance"],
      },
      {
        name: "Amanda Chen",
        experience: "5 years",
        rating: 4.4,
        bio: "Specialized in home theater and entertainment systems.",
        availability: ["Tuesday to Saturday, 9 AM - 5 PM"],
        specialties: ["Home theater", "Entertainment", "Smart systems"],
      },
    ],
  },
  painting: {
    title: "Painting",
    src: "/painting1.jpg",
    description:
      "Transform your space with our professional painting services. Our expert painters use high-quality materials to deliver stunning results for both interior and exterior projects.",
    workers: [
      {
        name: "Mark Thompson",
        experience: "8 years",
        rating: 4.7,
        bio: "Expert in interior and exterior painting with attention to detail.",
        availability: ["Monday to Friday, 8 AM - 4 PM"],
        specialties: ["Interior", "Exterior", "Color consultation"],
      },
      {
        name: "Anna White",
        experience: "5 years",
        rating: 4.4,
        bio: "Specialized in decorative and faux finish painting.",
        availability: ["Tuesday to Saturday, 9 AM - 5 PM"],
        specialties: ["Faux finishes", "Decorative", "Murals"],
      },
      {
        name: "Carlos Rodriguez",
        experience: "10 years",
        rating: 4.9,
        bio: "Master painter with expertise in commercial projects.",
        availability: ["Monday to Friday, 7 AM - 3 PM"],
        specialties: ["Commercial", "Industrial", "Large scale"],
      },
      {
        name: "Sophie Martin",
        experience: "3 years",
        rating: 3.9,
        bio: "Focused on residential interior painting.",
        availability: ["Wednesday to Sunday, 9 AM - 5 PM"],
        specialties: ["Interior", "Residential", "Color matching"],
      },
      {
        name: "John Kim",
        experience: "6 years",
        rating: 4.5,
        bio: "Specialized in exterior and weatherproofing.",
        availability: ["Monday to Friday, 8 AM - 4 PM"],
        specialties: ["Exterior", "Weatherproofing", "Restoration"],
      },
      {
        name: "Linda Garcia",
        experience: "2 years",
        rating: 3.7,
        bio: "Entry-level painter with creative background.",
        availability: ["Flexible schedule"],
        specialties: ["Basic painting", "Color theory", "Preparation"],
      },
      {
        name: "Paul Anderson",
        experience: "9 years",
        rating: 4.8,
        bio: "Expert in historic restoration and preservation.",
        availability: ["Monday to Friday, 7 AM - 3 PM"],
        specialties: ["Historic", "Restoration", "Period techniques"],
      },
      {
        name: "Rachel Lee",
        experience: "4 years",
        rating: 4.2,
        bio: "Specialized in cabinet and furniture painting.",
        availability: ["Tuesday to Saturday, 8 AM - 4 PM"],
        specialties: ["Cabinets", "Furniture", "Fine finishing"],
      },
      {
        name: "Mike Wilson",
        experience: "7 years",
        rating: 4.6,
        bio: "Expert in spray painting and industrial coatings.",
        availability: ["Monday to Friday, 6 AM - 2 PM"],
        specialties: ["Spray painting", "Industrial", "Coatings"],
      },
      {
        name: "Sarah Chen",
        experience: "1 year",
        rating: 3.5,
        bio: "New painter with formal art education.",
        availability: ["Part-time", "Weekends"],
        specialties: ["Basic painting", "Color theory", "Design"],
      },
    ],
  },
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const service = services[params.slug as keyof typeof services]

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  
  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <ServiceSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="transition-all duration-300 ease-in-out">
        <header className="sticky top-0 z-40 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 p-6 flex justify-between items-center shadow-lg border-b border-white/30 transition-all duration-300 hover:shadow-xl">
          {isMobile ? (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:text-purple-200 focus:outline-none transition-colors duration-300"
            >
              <Menu size={24} />
            </button>
          ) : (
            <Link href="/services" className="text-white hover:text-purple-200 transition-colors duration-300">
              <Button variant="ghost" className="text-lg font-semibold">
                ← All Services
              </Button>
            </Link>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h1>
          <div className="w-[100px]" />
        </header>
        <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 border border-purple-200">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-900">Service Details</h2>
            <ExpandableServiceDetails service={service} />
            <div className="mt-8 text-center">
              <Link href="/services" className="inline-block">
                <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md px-8 py-6 text-lg font-semibold rounded-xl hover:scale-105 hover:shadow-lg">
                  ← Back to Services
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}