

import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import  Button  from "@/components/ui/button";
import  Input  from "@/components/ui/input";
import  Badge  from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Mail, Phone, User } from "lucide-react";

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      totalOrders: 15,
      totalSpent: 234.5,
      lastOrder: "2 days ago",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 987-6543",
      totalOrders: 8,
      totalSpent: 156.75,
      lastOrder: "1 week ago",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 456-7890",
      totalOrders: 23,
      totalSpent: 445.25,
      lastOrder: "Yesterday",
      status: "VIP",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 321-0987",
      totalOrders: 3,
      totalSpent: 67.8,
      lastOrder: "3 weeks ago",
      status: "Active",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      phone: "+1 (555) 654-3210",
      totalOrders: 31,
      totalSpent: 678.9,
      lastOrder: "Today",
      status: "VIP",
    },
    {
      id: 6,
      name: "Lisa Garcia",
      email: "lisa@example.com",
      phone: "+1 (555) 789-0123",
      totalOrders: 12,
      totalSpent: 298.45,
      lastOrder: "5 days ago",
      status: "Active",
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#101828]">Customers</h1>
                <p className="text-[#475467]">Manage your customer database</p>
              </div>
              <Button className="bg-[#f6b100] hover:bg-[#ffbb11] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </div>

            {/* Search */}
            <Card className="bg-white border-[#eaecf0]">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#475467] w-4 h-4" />
                  <Input
                    placeholder="Search customers by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-[#d0d5dd] focus:border-[#f6b100]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="bg-white border-[#eaecf0] hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#eff8ff] rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-[#175cd3]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#101828]">{customer.name}</h3>
                          <Badge
                            variant={customer.status === "VIP" ? "default" : "secondary"}
                            className={customer.status === "VIP" ? "bg-[#f6b100] text-white" : ""}
                          >
                            {customer.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-[#475467]">
                        <Mail className="w-4 h-4" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-[#475467]">
                        <Phone className="w-4 h-4" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-[#f9fafb] rounded-lg">
                      <div>
                        <p className="text-xs text-[#475467]">Total Orders</p>
                        <p className="font-semibold text-[#101828]">{customer.totalOrders}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#475467]">Total Spent</p>
                        <p className="font-semibold text-[#f6b100]">${customer.totalSpent}</p>
                      </div>
                    </div>

                    <p className="text-sm text-[#475467] mb-4">Last order: {customer.lastOrder}</p>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 border-[#d0d5dd] bg-transparent">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCustomers.length === 0 && (
              <Card className="bg-white border-[#eaecf0]">
                <CardContent className="p-8 text-center">
                  <p className="text-[#475467]">No customers found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
