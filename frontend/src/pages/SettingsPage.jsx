

import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import  Button  from "@/components/ui/button"
import  Input  from "@/components/ui/input"
import  Label  from "@/components/ui/label"
import  Switch  from "@/components/ui/switch"
import { User, Store, Bell, Shield, CreditCard, Printer } from "lucide-react"
import  {useState}  from "react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  })

  const [businessInfo, setBusinessInfo] = useState({
    name: "Nustly Coffee Shop",
    address: "123 Main Street, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "info@nustly.com",
    taxId: "12-3456789",
  })

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6 max-w-4xl">
            <div>
              <h1 className="text-2xl font-bold text-[#101828]">Settings</h1>
              <p className="text-[#475467]">Manage your account and business preferences</p>
            </div>

            {/* Business Information */}
            <Card className="bg-white border-[#eaecf0]">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <Store className="w-5 h-5 text-[#f6b100] mr-2" />
                <CardTitle className="text-lg font-semibold text-[#101828]">Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm text-[#344054]">
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      value={businessInfo.name}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                      className="border-[#d0d5dd]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone" className="text-sm text-[#344054]">
                      Phone Number
                    </Label>
                    <Input
                      id="businessPhone"
                      value={businessInfo.phone}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                      className="border-[#d0d5dd]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessAddress" className="text-sm text-[#344054]">
                    Address
                  </Label>
                  <Input
                    id="businessAddress"
                    value={businessInfo.address}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                    className="border-[#d0d5dd]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail" className="text-sm text-[#344054]">
                      Email
                    </Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={businessInfo.email}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                      className="border-[#d0d5dd]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId" className="text-sm text-[#344054]">
                      Tax ID
                    </Label>
                    <Input
                      id="taxId"
                      value={businessInfo.taxId}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, taxId: e.target.value })}
                      className="border-[#d0d5dd]"
                    />
                  </div>
                </div>
                <Button className="bg-[#f6b100] hover:bg-[#ffbb11] text-white">Save Changes</Button>
              </CardContent>
            </Card>

            {/* User Account */}
            <Card className="bg-white border-[#eaecf0]">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <User className="w-5 h-5 text-[#f6b100] mr-2" />
                <CardTitle className="text-lg font-semibold text-[#101828]">User Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm text-[#344054]">
                      First Name
                    </Label>
                    <Input id="firstName" defaultValue="John" className="border-[#d0d5dd]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm text-[#344054]">
                      Last Name
                    </Label>
                    <Input id="lastName" defaultValue="Doe" className="border-[#d0d5dd]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail" className="text-sm text-[#344054]">
                    Email Address
                  </Label>
                  <Input id="userEmail" type="email" defaultValue="john@example.com" className="border-[#d0d5dd]" />
                </div>
                <Button variant="outline" className="border-[#d0d5dd] bg-transparent">
                  Change Password
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-white border-[#eaecf0]">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <Bell className="w-5 h-5 text-[#f6b100] mr-2" />
                <CardTitle className="text-lg font-semibold text-[#101828]">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#101828]">Email Notifications</p>
                    <p className="text-sm text-[#475467]">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#101828]">Push Notifications</p>
                    <p className="text-sm text-[#475467]">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#101828]">SMS Notifications</p>
                    <p className="text-sm text-[#475467]">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment & Hardware */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border-[#eaecf0]">
                <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                  <CreditCard className="w-5 h-5 text-[#f6b100] mr-2" />
                  <CardTitle className="text-lg font-semibold text-[#101828]">Payment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#344054]">Tax Rate (%)</Label>
                    <Input defaultValue="8.25" className="border-[#d0d5dd]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#344054]">Currency</Label>
                    <Input defaultValue="USD" className="border-[#d0d5dd]" />
                  </div>
                  <Button variant="outline" className="w-full border-[#d0d5dd] bg-transparent">
                    Configure Payment Methods
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#eaecf0]">
                <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                  <Printer className="w-5 h-5 text-[#f6b100] mr-2" />
                  <CardTitle className="text-lg font-semibold text-[#101828]">Hardware</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#344054]">Receipt Printer</Label>
                    <Input placeholder="Not connected" className="border-[#d0d5dd]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#344054]">Cash Drawer</Label>
                    <Input placeholder="Not connected" className="border-[#d0d5dd]" />
                  </div>
                  <Button variant="outline" className="w-full border-[#d0d5dd] bg-transparent">
                    Setup Hardware
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Security */}
            <Card className="bg-white border-[#eaecf0]">
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <Shield className="w-5 h-5 text-[#f6b100] mr-2" />
                <CardTitle className="text-lg font-semibold text-[#101828]">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#101828]">Two-Factor Authentication</p>
                    <p className="text-sm text-[#475467]">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline" className="border-[#d0d5dd] bg-transparent">
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#101828]">Login Sessions</p>
                    <p className="text-sm text-[#475467]">Manage your active login sessions</p>
                  </div>
                  <Button variant="outline" className="border-[#d0d5dd] bg-transparent">
                    View Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
