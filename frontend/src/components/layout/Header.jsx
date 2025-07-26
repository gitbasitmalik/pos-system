import { Bell, Search, User } from "lucide-react"
import Input from "../ui/Input"
import Button from "../ui/Button"

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {/* <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search products, customers..."
              className="pl-10 border-gray-300 focus:border-orange-500"
            />
          </div> */}
        </div>

      </div>
    </header>
  )
}

export default Header
