

import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import Badge from "../components/ui/Badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/Dialog"
import Label from "../components/ui/Label"
import { Search, Plus, Minus, AlertTriangle, Package, TrendingDown, TrendingUp, Edit } from "lucide-react"

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Coffee",
      sku: "COF001",
      category: "Beverages",
      currentStock: 45,
      reorderPoint: 20,
      maxStock: 100,
      unitCost: 2.5,
      sellPrice: 4.99,
      supplier: "Coffee Beans Co.",
      lastRestocked: "2024-01-05",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Club Sandwich",
      sku: "FOD001",
      category: "Food",
      currentStock: 8,
      reorderPoint: 15,
      maxStock: 50,
      unitCost: 4.5,
      sellPrice: 8.99,
      supplier: "Fresh Foods Ltd.",
      lastRestocked: "2024-01-06",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Chocolate Pastry",
      sku: "FOD002",
      category: "Food",
      currentStock: 0,
      reorderPoint: 10,
      maxStock: 30,
      unitCost: 1.75,
      sellPrice: 3.49,
      supplier: "Bakery Supply",
      lastRestocked: "2024-01-03",
      status: "Out of Stock",
    },
    {
      id: 4,
      name: "Green Tea",
      sku: "BEV002",
      category: "Beverages",
      currentStock: 35,
      reorderPoint: 15,
      maxStock: 60,
      unitCost: 2.0,
      sellPrice: 3.99,
      supplier: "Tea Masters",
      lastRestocked: "2024-01-04",
      status: "In Stock",
    },
  ])

  const categories = ["All", "Beverages", "Food"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const lowStockProducts = products.filter((p) => p.currentStock <= p.reorderPoint && p.currentStock > 0)
  const outOfStockProducts = products.filter((p) => p.currentStock === 0)

  const handleStockAdjustment = (productId, adjustment, reason) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const newStock = Math.max(0, product.currentStock + adjustment)
          let status = "In Stock"
          if (newStock === 0) status = "Out of Stock"
          else if (newStock <= product.reorderPoint) status = "Low Stock"

          return { ...product, currentStock: newStock, status }
        }
        return product
      }),
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-50 text-green-500"
      case "Low Stock":
        return "bg-orange-50 text-orange-500"
      case "Out of Stock":
        return "bg-red-50 text-red-500"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-500">Track and manage your product inventory</p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Inventory Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-primary-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Low Stock Items</p>
                      <p className="text-2xl font-bold text-orange-500">{lowStockProducts.length}</p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
                      <p className="text-2xl font-bold text-red-500">{outOfStockProducts.length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Value</p>
                      <p className="text-2xl font-bold text-green-500">
                        ${products.reduce((sum, p) => sum + p.currentStock * p.unitCost, 0).toFixed(2)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
              <Card className="bg-orange-50 border-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Inventory Alerts</h3>
                      {outOfStockProducts.length > 0 && (
                        <p className="text-sm text-gray-500 mb-1">
                          <span className="font-medium text-red-500">{outOfStockProducts.length} items</span> are out of
                          stock
                        </p>
                      )}
                      {lowStockProducts.length > 0 && (
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-orange-500">{lowStockProducts.length} items</span> are
                          running low
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Filters */}
            <Card className="bg-white border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      placeholder="Search by name or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-orange-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Table */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Product Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Product</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">SKU</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Stock</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Unit Cost</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Value</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100">
                          <td className="py-4 px-2">
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-sm text-gray-500">{product.sku}</td>
                          <td className="py-4 px-2">
                            <div>
                              <p className="font-medium text-gray-900">{product.currentStock}</p>
                              <p className="text-xs text-gray-500">Reorder at {product.reorderPoint}</p>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                          </td>
                          <td className="py-4 px-2 text-sm text-gray-500">${product.unitCost}</td>
                          <td className="py-4 px-2 font-medium text-gray-900">
                            ${(product.currentStock * product.unitCost).toFixed(2)}
                          </td>
                          <td className="py-4 px-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="border-gray-300 bg-transparent">
                                  <Edit className="w-3 h-3 mr-1" />
                                  Adjust
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Adjust Stock - {product.name}</DialogTitle>
                                </DialogHeader>
                                <StockAdjustmentForm product={product} onAdjust={handleStockAdjustment} />
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

const StockAdjustmentForm = ({ product, onAdjust }) => {
  const [adjustment, setAdjustment] = useState(0)
  const [reason, setReason] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdjust(product.id, adjustment, reason)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-sm text-gray-600">Current Stock</Label>
        <p className="text-lg font-semibold text-gray-900">{product.currentStock} units</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="adjustment" className="text-sm text-gray-600">
          Stock Adjustment
        </Label>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setAdjustment(Math.max(adjustment - 1, -product.currentStock))}
            className="border-gray-300"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            id="adjustment"
            type="number"
            value={adjustment}
            onChange={(e) => setAdjustment(Number.parseInt(e.target.value) || 0)}
            className="text-center border-gray-300 w-20"
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setAdjustment(adjustment + 1)}
            className="border-gray-300"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500">New stock will be: {product.currentStock + adjustment} units</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason" className="text-sm text-gray-600">
          Reason for Adjustment
        </Label>
        <Input
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g., Damaged goods, Restock, Inventory count"
          className="border-gray-300"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        disabled={adjustment === 0 || !reason.trim()}
      >
        Apply Adjustment
      </Button>
    </form>
  )
}

export default InventoryPage
