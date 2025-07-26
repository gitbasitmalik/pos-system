import { useState, useEffect } from "react"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import Badge from "../components/ui/Badge"
import ReceiptPrinter from "../components/receipt/ReceiptPrinter"
import { Search, Plus, Minus, Trash2, CreditCard, DollarSign } from "lucide-react"
import api from "../api/axios"

const SalesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showReceipt, setShowReceipt] = useState(false)
  const [lastTransaction, setLastTransaction] = useState(null)
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  const businessInfo = {
    name: "Nustly Coffee Shop",
    address: "123 Main Street, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "info@nustly.com",
  }

  useEffect(() => {
    api.get("/products").then(res => {
      setProducts(res.data.map(p => ({
        ...p,
        id: p._id || p.id,
        name: p.name,
        price: p.price ?? p.sellPrice ?? 0,
        category: p.category || '',
        stock: p.stock ?? p.currentStock ?? 0,
        image: p.image || '',
      })))
    })
  }, [])

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const addToCart = async (product) => {
    // Decrease stock in backend
    if (product.stock <= 0) return
    await api.put(`/products/${product.id}`, { stock: product.stock - 1 })
    setProducts(products => products.map(p => p.id === product.id ? { ...p, stock: p.stock - 1 } : p))
    // Add to cart or increase quantity
    setCart(cart => {
      const existing = cart.find(item => item.id === product.id)
      if (existing) {
        return cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      } else {
        return [...cart, { ...product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (id, change) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handlePayment = async (paymentMethod) => {
    if (cart.length === 0) return;
    const now = new Date();
    const salePayload = {
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
      subtotal,
      tax,
      total,
      paymentMethod,
      cashier: "John Doe",
      businessInfo,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      receiptNumber: `R${now.getTime()}`,
    };
    const saleRes = await api.post('/sales', salePayload);
    // Set receipt data for modal
    const receiptData = {
      receiptNumber: saleRes.data._id || `R${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      subtotal,
      tax,
      total,
      paymentMethod,
      cashier: "John Doe",
      businessInfo,
    };
    setLastTransaction(receiptData);
    setShowReceipt(true);
    setCart([]);
    // Refetch products to update inventory
    const res = await api.get('/products');
    setProducts(res.data.map(p => ({
      ...p,
      id: p._id || p.id,
      name: p.name,
      price: p.price ?? p.sellPrice ?? 0,
      category: p.category || '',
      stock: p.stock ?? p.currentStock ?? 0,
      image: p.image || '',
    })));
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Products Section */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Point of Sale</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="bg-white border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-20 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-orange-500">${product.price}</span>
                        <Badge variant="secondary" className="text-xs">
                          {product.stock} left
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cart Section */}
            <div className="space-y-6">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">Current Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No items in cart</p>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg"
                          >
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                              <p className="text-orange-500 font-medium">${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Subtotal:</span>
                          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Tax (8%):</span>
                          <span className="text-gray-900">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                          <span className="text-gray-900">Total:</span>
                          <span className="text-orange-500">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => handlePayment("Card")}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay with Card
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 bg-transparent"
                          onClick={() => handlePayment("Cash")}
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          Pay with Cash
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        {lastTransaction && (
          <ReceiptPrinter isOpen={showReceipt} onClose={() => setShowReceipt(false)} receiptData={lastTransaction} />
        )}
      </div>
    </div>
  )
}

export default SalesPage
