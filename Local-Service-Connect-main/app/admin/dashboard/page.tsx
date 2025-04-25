"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ArrowRight,
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  Settings,
  Bell,
  Search,
  Menu,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ProfileSettingsDialog } from "@/components/ProfileSettingsDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //code to regirect to login page if user is not admin
  console.log("object");
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== "admin") {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  const Sidebar = () => (
    <div className="w-64 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl h-full">
      <div className="p-4 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg shadow-lg animate-pulse"></div>
        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        {[
          { name: "Overview", href: "/admin/dashboard" },
          { name: "Workers", href: "/admin/workers" },
          { name: "Users", href: "/admin/users" },
        ].map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none py-2 px-4 text-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 hover:text-white hover:translate-x-1"
            >
              {item.name}
            </Button>
          </Link>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none py-2 px-4 text-gray-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 hover:text-white hover:translate-x-1"
            >
              <Settings className="mr-2 h-4 w-4" />
              Profile Settings
            </Button>
          </DialogTrigger>
          <ProfileSettingsDialog />
        </Dialog>
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-lg backdrop-blur-lg bg-opacity-80">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden mr-2 hover:rotate-180 transition-transform duration-300"
                  >
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full border-2 border-indigo-100 focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"
                  size={18}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hover:rotate-12 transition-transform duration-300"
              >
                <Bell size={20} />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Quick stats */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Total Users",
                  icon: Users,
                  value: "1,234",
                  change: "+10%",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  title: "Active Workers",
                  icon: Briefcase,
                  value: "567",
                  change: "+5%",
                  color: "from-green-500 to-green-600",
                },
                {
                  title: "Total Revenue",
                  icon: DollarSign,
                  value: "$45,231.89",
                  change: "+20%",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  title: "Completed Jobs",
                  icon: Calendar,
                  value: "789",
                  change: "+12%",
                  color: "from-pink-500 to-pink-600",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-10`}
                  ></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {item.title}
                    </CardTitle>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {item.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Revenue chart */}
            <Card className="mb-8 overflow-hidden transform hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    total: {
                      label: "Total",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="min-h-[300px]"
                >
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <ChartTooltip
                        cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                        content={
                          <ChartTooltipContent className="bg-white p-2 shadow-lg rounded-lg border border-gray-200" />
                        }
                      />
                      <Bar
                        dataKey="total"
                        fill="url(#colorGradient)"
                        radius={[4, 4, 0, 0]}
                        className="transition-all duration-300 hover:brightness-110"
                      />
                      <defs>
                        <linearGradient
                          id="colorGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#4F46E5"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor="#4F46E5"
                            stopOpacity={0.3}
                          />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent activities */}
            <Card className="transform hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  You have 3 new activities today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        activity: "New user registration",
                        status: "Completed",
                        date: "2023-06-15",
                      },
                      {
                        activity: "Service booking: Plumbing",
                        status: "In Progress",
                        date: "2023-06-14",
                      },
                      {
                        activity: "Worker application: Electrician",
                        status: "Pending Review",
                        date: "2023-06-13",
                      },
                    ].map((item, index) => (
                      <TableRow
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <TableCell className="font-medium">
                          {item.activity}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 ${
                              item.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : item.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:scale-105 transition-transform duration-200"
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Quick actions */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Quick Actions
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Add New Service", icon: ArrowRight },
                  { title: "Review Worker Applications", icon: ArrowRight },
                  { title: "Generate Monthly Report", icon: ArrowRight },
                ].map((action, index) => (
                  <Button
                    key={index}
                    className="w-full justify-between bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white transform hover:scale-105 transition-all duration-300"
                  >
                    {action.title}
                    <action.icon className="ml-2 h-4 w-4 animate-bounce" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
