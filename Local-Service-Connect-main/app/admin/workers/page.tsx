"use client"

import { useEffect, useState } from "react"
import { Settings, Bell, Search, Menu } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { ProfileSettingsDialog } from "@/components/ProfileSettingsDialog"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WorkersPage() {
  const [workers, setWorkers] = useState([]) // Ensuring it's always an array
  const [selectedService, setSelectedService] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/worker/getall")
        if (!response.ok) throw new Error("Failed to fetch data")
        
        const data = await response.json()
        
        if (!data.success || !Array.isArray(data.worker)) throw new Error("Invalid API response format")

        setWorkers(data.worker) // Setting correct workers data
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setWorkers([]) // Ensuring no undefined errors
        setLoading(false)
      }
    }

    fetchWorkers()
  }, [])

  const filteredWorkers = selectedService === "All"
    ? workers
    : workers.filter((worker) => worker.serviceType.includes(selectedService))

  // Calculate total workers
  const totalWorkers = workers.length

  // Calculate average rating safely
  const averageRating = workers.length > 0
    ? (workers.reduce((sum, worker) => sum + (worker.rating || 0), 0) / workers.length).toFixed(1)
    : "N/A"

  const Sidebar = () => (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-4 flex items-center space-x-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
        <h2 className="text-xl font-bold text-indigo-800">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        {[{ name: "Overview", href: "/admin/dashboard" }, { name: "Workers", href: "/admin/workers" }, { name: "Users", href: "/admin/users" }].map((item) => (
          <Link key={item.name} href={item.href}>
            <Button variant={item.name === "Workers" ? "default" : "ghost"} className="w-full justify-start rounded-none py-2 px-4">
              {item.name}
            </Button>
          </Link>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start rounded-none py-2 px-4">
              <Settings className="mr-2 h-4 w-4" />
              Profile Settings
            </Button>
          </DialogTrigger>
          <ProfileSettingsDialog />
        </Dialog>
      </nav>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#F7F9FB]">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden mr-2">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <h1 className="text-2xl font-semibold text-indigo-900">Workers</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Input type="search" placeholder="Search workers..." className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F7F9FB]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Display loading or error message */}
            {loading && <p className="text-center text-gray-500">Loading workers...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
              <>
                <Card className="mb-8 border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                    <CardTitle>Worker Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <p className="text-sm text-gray-600 font-medium">Total Workers</p>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">{totalWorkers}</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <p className="text-sm text-gray-600 font-medium">Average Rating</p>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">{averageRating}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Worker List</h2>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="w-[180px] border-gray-200 shadow-sm">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Services</SelectItem>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Cleaning">Cleaning</SelectItem>
                      <SelectItem value="Painting">Painting</SelectItem>
                    </SelectContent>
                  </Select> 
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWorkers.map((worker) => (
                      <TableRow key={worker._id}>
                        <TableCell>{worker.name}</TableCell>
                        <TableCell>{worker.serviceType.join(", ")}</TableCell>
                        <TableCell>{worker.rating || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
