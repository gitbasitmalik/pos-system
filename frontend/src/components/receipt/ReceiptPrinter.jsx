import { useRef } from "react"
import Button from "../ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog"
import ReceiptTemplate from "./ReceiptTemplate"
import { Printer, Download } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const ReceiptPrinter = ({ isOpen, onClose, receiptData }) => {
  const receiptRef = useRef(null)

  const handlePrint = async () => {
    if (receiptRef.current) {
      const element = receiptRef.current
      const canvas = await html2canvas(element)
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      })
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)
      // Open the PDF in a new window for printing
      const pdfBlob = pdf.output("bloburl")
      const printWindow = window.open(pdfBlob, "_blank")
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.focus()
          printWindow.print()
        }
      }
    }
  }

  const handleDownload = async () => {
    if (receiptRef.current) {
      const element = receiptRef.current
      const canvas = await html2canvas(element)
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      })
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)
      pdf.save(`receipt-${receiptData.receiptNumber}.pdf`)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Receipt Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <ReceiptTemplate ref={receiptRef} data={receiptData} />

          <div className="flex gap-2">
            <Button onClick={handlePrint} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
              <Printer className="w-4 h-4 mr-2" />
              Print Receipt
            </Button>
            <Button onClick={handleDownload} variant="outline" className="flex-1 border-gray-300 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReceiptPrinter
