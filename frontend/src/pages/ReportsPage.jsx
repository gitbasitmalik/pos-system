import { useState, useEffect } from 'react';
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import  Button  from "@/components/ui/button"
import { Download, DollarSign, ShoppingCart, Package, Users } from "lucide-react"
import api from "../api/axios"

const iconMap = {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
};

function getUniqueCustomers(sales) {
  const set = new Set();
  sales.forEach(s => {
    if (s.customer) set.add(s.customer._id || s.customer);
  });
  return set.size;
}

function aggregateSalesOverview(sales) {
  // Group by day for the last 7 days
  const map = {};
  sales.forEach(sale => {
    const date = sale.date || (sale.createdAt ? sale.createdAt.slice(0,10) : '');
    if (!date) return;
    if (!map[date]) map[date] = { period: date, sales: 0, orders: 0, customers: new Set() };
    map[date].sales += sale.total || 0;
    map[date].orders += 1;
    if (sale.customer) map[date].customers.add(sale.customer._id || sale.customer);
  });
  // Convert to array, sort by date desc, and limit to 7
  return Object.values(map)
    .map(d => ({ ...d, customers: d.customers.size }))
    .sort((a, b) => b.period.localeCompare(a.period))
    .slice(0, 7)
    .reverse();
}

function getTopProducts(sales) {
  const productMap = {};
  sales.forEach(sale => {
    (sale.items || []).forEach(item => {
      if (!productMap[item.name]) productMap[item.name] = { name: item.name, sales: 0, revenue: 0 };
      productMap[item.name].sales += item.quantity;
      productMap[item.name].revenue += item.total;
    });
  });
  return Object.values(productMap)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);
}

function exportToCSV({ quickStats, salesOverview, topProducts }) {
  let csv = '';
  csv += 'Quick Stats\n';
  quickStats.forEach(stat => {
    csv += `${stat.title},${stat.value}\n`;
  });
  csv += '\nSales Overview\n';
  csv += 'Period,Orders,Customers,Sales\n';
  salesOverview.forEach(row => {
    csv += `${row.period},${row.orders},${row.customers},${row.sales}\n`;
  });
  csv += '\nTop Products\n';
  csv += 'Name,Sales,Revenue\n';
  topProducts.forEach(p => {
    csv += `${p.name},${p.sales},${p.revenue}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `report-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const [quickStats, setQuickStats] = useState([]);
  const [salesOverview, setSalesOverview] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [productsRes, salesRes] = await Promise.all([
        api.get('/products'),
        api.get('/sales'),
      ]);
      const products = productsRes.data;
      const sales = salesRes.data;
      // Quick stats
      const totalSales = sales.reduce((sum, s) => sum + (s.total || 0), 0);
      const totalOrders = sales.length;
      const totalProducts = products.length;
      const uniqueCustomers = getUniqueCustomers(sales);
      setQuickStats([
        { title: "Total Sales", value: `$${totalSales.toLocaleString()}`, change: '', trend: 'up', icon: 'DollarSign' },
        { title: "Orders", value: totalOrders, change: '', trend: 'up', icon: 'ShoppingCart' },
        { title: "Products", value: totalProducts, change: '', trend: 'up', icon: 'Package' },
        { title: "Customers", value: uniqueCustomers, change: '', trend: 'up', icon: 'Users' },
      ]);
      // Sales overview
      setSalesOverview(aggregateSalesOverview(sales));
      // Top products
      setTopProducts(getTopProducts(sales));
      setLoading(false);
    }
    fetchData();
  }, []);

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
              <Button className="bg-[#f6b100] hover:bg-[#ffbb11] text-white" onClick={() => exportToCSV({ quickStats, salesOverview, topProducts })}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat) => {
                const Icon = iconMap[stat.icon] || DollarSign;
                return (
                  <Card key={stat.title} className="bg-white border-[#eaecf0]">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[#475467] mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold text-[#101828]">{stat.value}</p>
                          <p className={`text-sm ${stat.trend === "up" ? "text-[#17b26a]" : "text-red-500"}`}>{stat.change}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#eff8ff] rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#175cd3]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Overview */}
              <Card className="bg-white border-[#eaecf0]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#101828]">Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesOverview.map((data, index) => (
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
