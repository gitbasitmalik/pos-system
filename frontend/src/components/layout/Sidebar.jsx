import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart3, LogOut, Store } from "lucide-react"
import Button from "../ui/Button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Package },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Reports", href: "/reports", icon: BarChart3 },

]

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen">
      <div className="flex items-center space-x-2 p-6 border-b border-gray-200">
        <Store className="w-8 h-8 text-orange-500" />
        <span className="text-xl font-bold text-gray-900">POS</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-500 border border-primary-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link to="/login">
          <Button variant="ghost" className="w-full justify-start text-gray-500 hover:text-gray-900 hover:bg-gray-50">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
