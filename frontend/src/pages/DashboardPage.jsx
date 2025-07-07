

import { useNavigate } from "react-router-dom"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

const DashboardPage = () => {
  const navigate = useNavigate()

  const stats = [
    {
      title: "Today's Sales",
      value: "$2,847.50",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: "1,247",
      change: "-2.1%",
      trend: "down",
      icon: Package,
    },
    {
      title: "Customers",
      value: "892",
      change: "+15.3%",
      trend: "up",
      icon: Users,
    },
  ]

  const recentSales = [
    { id: "#001", customer: "John Doe", amount: "$45.99", time: "2 min ago" },
    { id: "#002", customer: "Jane Smith", amount: "$78.50", time: "5 min ago" },
    { id: "#003", customer: "Mike Johnson", amount: "$123.75", time: "8 min ago" },
    { id: "#004", customer: "Sarah Wilson", amount: "$67.25", time: "12 min ago" },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">Welcome back! Here's what's happening with your store today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.title} className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <div className="flex items-center mt-2">
                            {stat.trend === "up" ? (
                              <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Recent Sales</CardTitle>
                  <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium text-gray-900">{sale.customer}</p>
                          <p className="text-sm text-gray-500">Order {sale.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{sale.amount}</p>
                          <p className="text-sm text-gray-500">{sale.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      className="h-20 bg-orange-500 hover:bg-orange-600 text-white flex flex-col"
                      onClick={() => navigate("/sales")}
                    >
                      <ShoppingCart className="w-6 h-6 mb-2" />
                      New Sale
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 border-gray-300 flex flex-col bg-transparent"
                      onClick={() => navigate("/products")}
                    >
                      <Package className="w-6 h-6 mb-2" />
                      Add Product
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 border-gray-300 flex flex-col bg-transparent"
                      onClick={() => navigate("/customers")}
                    >
                      <Users className="w-6 h-6 mb-2" />
                      Add Customer
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 border-gray-300 flex flex-col bg-transparent"
                      onClick={() => navigate("/reports")}
                    >
                      <TrendingUp className="w-6 h-6 mb-2" />
                      View Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
