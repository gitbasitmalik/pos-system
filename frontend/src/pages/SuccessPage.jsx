

import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Check } from "lucide-react"

const SuccessPage = () => {
  const navigate = useNavigate()

  const handleContinue = () => {
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardContent className="space-y-6 pt-8 pb-8">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Success!</h2>
            <p className="text-gray-500 text-center leading-relaxed">
              You have successfully changed your password. You can now access your account with your new credentials.
            </p>
          </div>
          <Button onClick={handleContinue} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Continue to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default SuccessPage
