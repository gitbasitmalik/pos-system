

import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { Card, CardContent } from "@/components/ui/card"
import  Button  from "@/components/ui/button"
import  Input  from "@/components/ui/input"
import  Badge  from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import  {useState}  from "react"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const products = [
    {
      id: 1,
      name: "Premium Coffee",
      price: 4.99,
      category: "Beverages",
      stock: 50,
      status: "Active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Club Sandwich",
      price: 8.99,
      category: "Food",
      stock: 25,
      status: "Active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Chocolate Pastry",
      price: 3.49,
      category: "Food",
      stock: 30,
      status: "Active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "Green Tea",
      price: 3.99,
      category: "Beverages",
      stock: 40,
      status: "Active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 5,
      name: "Caesar Salad",
      price: 12.99,
      category: "Food",
      stock: 15,
      status: "Active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 6,
      name: "Fresh Orange Juice",
      price: 5.99,
      category: "Beverages",
      stock: 0,
      status: "Out of Stock",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 7,
      name: "Blueberry Muffin",
      price: 2.99,
      category: "Food",
      stock: 20,
      status: "Active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 8,
      name: "Iced Latte",
      price: 5.49,
      category: "Beverages",
      stock: 35,
      status: "Active",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const categories = ["All", "Beverages", "Food"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#101828]">Products</h1>
                <p className="text-[#475467]">Manage your product inventory</p>
              </div>
              <Button className="bg-[#f6b100] hover:bg-[#ffbb11] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Filters */}
            <Card className="bg-white border-[#eaecf0]">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#475467] w-4 h-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-[#d0d5dd] focus:border-[#f6b100]"
                    />
                  </div>
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={
                          selectedCategory === category ? "bg-[#f6b100] hover:bg-[#ffbb11]" : "border-[#d0d5dd]"
                        }
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="bg-white border-[#eaecf0] hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <Badge
                        variant={product.status === "Active" ? "default" : "destructive"}
                        className={product.status === "Active" ? "bg-[#ecfdf3] text-[#17b26a]" : ""}
                      >
                        {product.status}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-[#101828] mb-1">{product.name}</h3>
                    <p className="text-sm text-[#475467] mb-2">{product.category}</p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-[#f6b100]">${product.price}</span>
                      <span className="text-sm text-[#475467]">Stock: {product.stock}</span>
                    </div>

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

            {filteredProducts.length === 0 && (
              <Card className="bg-white border-[#eaecf0]">
                <CardContent className="p-8 text-center">
                  <p className="text-[#475467]">No products found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
