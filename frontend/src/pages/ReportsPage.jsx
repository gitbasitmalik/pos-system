

import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import  Button  from "@/components/ui/button"
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Calendar, Download } from "lucide-react"

export default function ReportsPage() {
  const salesData = [
    { period: "Today", sales: 2847.5, orders: 156, customers: 89 },
    { period: "Yesterday", sales: 3124.75, orders: 178, customers: 102 },
    { period: "This Week", sales: 18456.25, orders: 1024, customers: 567 },
    { period: "Last Week", sales: 16789.5, orders: 945, customers: 523 },
    { period: "This Month", sales: 67234.8, orders: 3456, customers: 1890 },
    { period: "Last Month", sales: 72145.6, orders: 3789, customers: 2034 },
  ]

  const topProducts = [
    { name: "Premium Coffee", sales: 234, revenue: 1167.66 },
    { name: "Club Sandwich", sales: 189, revenue: 1699.11 },
    { name: "Caesar Salad", sales: 156, revenue: 2026.44 },
    { name: "Green Tea", sales: 145, revenue: 578.55 },
    { name: "Chocolate Pastry", sales: 134, revenue: 467.66 },
  ]

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#101828]">Reports & Analytics</h1>
                <p className="text-[#475467]">Track your business performance</p>
              </div>
              <Button className="bg-[#f6b100] hover:bg-[#ffbb11] text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-[#eaecf0]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#475467] mb-1">Today's Revenue</p>
                      <p className="text-2xl font-bold text-[#101828]">$2,847.50</p>
                      <p className="text-sm text-[#17b26a]">+12.5% from yesterday</p>
                    </div>
                    <div className="w-12 h-12 bg-[#eff8ff] rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-[#175cd3]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#eaecf0]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#475467] mb-1">Orders Today</p>
                      <p className="text-2xl font-bold text-[#101828]">156</p>
                      <p className="text-sm text-[#17b26a]">+8.2% from yesterday</p>
                    </div>
                    <div className="w-12 h-12 bg-[#ecfdf3] rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-[#17b26a]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#eaecf0]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#475467] mb-1">Avg Order Value</p>
                      <p className="text-2xl font-bold text-[#101828]">$18.25</p>
                      <p className="text-sm text-[#f04438]">-2.1% from yesterday</p>
                    </div>
                    <div className="w-12 h-12 bg-[#fff4ed] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#f6b100]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#eaecf0]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#475467] mb-1">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-[#101828]">$67,234</p>
                      <p className="text-sm text-[#f04438]">-6.8% from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-[#eff8ff] rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-[#175cd3]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Overview */}
              <Card className="bg-white border-[#eaecf0]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#101828]">Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#f9fafb] rounded-lg">
                        <div>
                          <p className="font-medium text-[#101828]">{data.period}</p>
                          <p className="text-sm text-[#475467]">
                            {data.orders} orders • {data.customers} customers
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#f6b100]">${data.sales.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card className="bg-white border-[#eaecf0]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#101828]">Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#f9fafb] rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#f6b100] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-[#101828]">{product.name}</p>
                            <p className="text-sm text-[#475467]">{product.sales} sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#f6b100]">${product.revenue.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
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
