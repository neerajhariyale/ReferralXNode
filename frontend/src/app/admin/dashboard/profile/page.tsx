
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, User, Shield, Camera } from "lucide-react";

export default function AdminProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [adminData, setAdminData] = useState({
        name: "Admin User",
        email: "admin@referralxnode.com",
        role: "Super Admin",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        joinDate: "January 2024",
        avatar: "https://github.com/shadcn.png"
    });

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setIsEditing(false);
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">My Profile</h1>
                <p className="text-slate-500 mt-1">Manage your account settings and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="md:col-span-1 h-fit border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="relative mb-4 group cursor-pointer">
                            <Avatar className="h-32 w-32 border-4 border-slate-100 dark:border-slate-800">
                                <AvatarImage src={adminData.avatar} />
                                <AvatarFallback className="text-4xl">AD</AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">{adminData.name}</h2>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100">
                                <Shield className="h-3 w-3 mr-1" />
                                {adminData.role}
                            </Badge>
                        </div>
                        <p className="text-xs text-slate-500 mt-4">Member since {adminData.joinDate}</p>
                    </CardContent>
                </Card>

                {/* Details Form */}
                <Card className="md:col-span-2 border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Update your personal details here.</CardDescription>
                            </div>
                            {!isEditing && (
                                <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <User className="h-4 w-4" /> Full Name
                                </label>
                                <Input
                                    value={adminData.name}
                                    disabled={!isEditing}
                                    onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                                    className="bg-slate-50 dark:bg-slate-900"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <Mail className="h-4 w-4" /> Email Address
                                </label>
                                <Input
                                    value={adminData.email}
                                    disabled={!isEditing} // Email usually read-only or requires verify
                                    className="bg-slate-50 dark:bg-slate-900"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <Phone className="h-4 w-4" /> Phone Number
                                </label>
                                <Input
                                    value={adminData.phone}
                                    disabled={!isEditing}
                                    onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
                                    className="bg-slate-50 dark:bg-slate-900"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <MapPin className="h-4 w-4" /> Location
                                </label>
                                <Input
                                    value={adminData.location}
                                    disabled={!isEditing}
                                    onChange={(e) => setAdminData({ ...adminData, location: e.target.value })}
                                    className="bg-slate-50 dark:bg-slate-900"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <h3 className="font-semibold text-sm mb-4">Security</h3>
                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                <div>
                                    <p className="font-medium text-sm">Password</p>
                                    <p className="text-xs text-slate-500">Last changed 3 months ago</p>
                                </div>
                                <Button variant="outline" size="sm" disabled={!isEditing}>Change</Button>
                            </div>
                        </div>

                    </CardContent>

                    {isEditing && (
                        <CardFooter className="flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/50 py-4">
                            <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
    );
}
