"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Settings, Bell, Search, Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";
import { ProfileSettingsDialog } from "@/components/ProfileSettingsDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function UsersPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/v1/users/getalluser",
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();

                if (Array.isArray(data?.users)) {
                    const customers = data.users.filter(
                        (user) => user.role === "customer",
                    );
                    setUsers(customers);
                } else {
                    console.error("API response.users is not an array:", data);
                    setError("Invalid API response");
                    setUsers([]);
                }
            } catch (error) {
                setError(error.message);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const Sidebar = () => (
        <div className="w-64 bg-white shadow-md h-full">
            <div className="p-4 flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
                <h2 className="text-xl font-bold text-indigo-800">
                    Admin Panel
                </h2>
            </div>
            <nav className="mt-6">
                {[
                    { name: "Overview", href: "/admin/dashboard" },
                    { name: "Workers", href: "/admin/workers" },
                    { name: "Users", href: "/admin/users" },
                ].map((item) => (
                    <Link key={item.name} href={item.href}>
                        <Button
                            variant={item.name === "Users" ? "default" : "ghost"}
                            className="w-full justify-start rounded-none py-2 px-4"
                        >
                            {item.name}
                        </Button>
                    </Link>
                ))}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start rounded-none py-2 px-4"
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
        <div className="flex h-screen bg-gradient-to-b from-gray-100 to-gray-50">
            <div className="hidden md:block">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="md:hidden mr-2"
                                    >
                                        <Menu />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0">
                                    <Sidebar />
                                </SheetContent>
                            </Sheet>
                            <h1 className="text-2xl font-semibold text-indigo-900">
                                Users
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative hidden sm:block">
                                <Input
                                    type="search"
                                    placeholder="Search users..."
                                    className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                            <Button variant="ghost" size="icon">
                                <Bell size={20} />
                            </Button>
                            <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                                <CardTitle>Customer List</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                {loading ? (
                                    <p>Loading users...</p>
                                ) : error ? (
                                    <p>Error: {error}</p>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-b-2 border-gray-200">
                                                <TableHead className="font-bold text-gray-700">
                                                    Profile Pic
                                                </TableHead>
                                                <TableHead className="font-bold text-gray-700">
                                                    Name
                                                </TableHead>
                                                <TableHead className="font-bold text-gray-700">
                                                    Email
                                                </TableHead>
                                                <TableHead className="font-bold text-gray-700">
                                                    Created At
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {users.map((user) => (
                                                <TableRow
                                                    key={user._id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <TableCell>
                                                        <Image
                                                            src={
                                                                user.profilePic?.url || "/placeholder.png"
                                                            }
                                                            alt={user.name}
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {user.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(user.createdAt).toLocaleString()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}