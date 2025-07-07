

import { forwardRef } from "react"

const ReceiptTemplate = forwardRef(({ data }, ref) => {
  return (
    <div ref={ref} className="receipt-template">
      <style jsx>{`
        @media print {
          .receipt-template {
            width: 80mm;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.2;
            color: black;
            background: white;
            margin: 0;
            padding: 10px;
          }
          
          .no-print {
            display: none !important;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          @page {
            size: 80mm auto;
            margin: 0;
          }
        }
        
        .receipt-template {
          width: 300px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.4;
          color: black;
          background: white;
          padding: 20px;
          border: 1px solid #ddd;
          margin: 0 auto;
        }
      `}</style>

      <div className="text-center mb-4">
        <div className="font-bold text-lg mb-2">{data.businessInfo.name}</div>
        <div>{data.businessInfo.address}</div>
        <div>{data.businessInfo.phone}</div>
        <div>{data.businessInfo.email}</div>
      </div>

      <div className="border-t border-b border-dashed border-black py-2 mb-4">
        <div className="flex justify-between">
          <span>Receipt #:</span>
          <span>{data.receiptNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span>{data.date}</span>
        </div>
        <div className="flex justify-between">
          <span>Time:</span>
          <span>{data.time}</span>
        </div>
        <div className="flex justify-between">
          <span>Cashier:</span>
          <span>{data.cashier}</span>
        </div>
      </div>

      <div className="mb-4">
        {data.items.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>
                {item.quantity} x ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-black pt-2">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${data.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax:</span>
          <span>${data.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-dashed border-black pt-2">
          <span>Total:</span>
          <span>${data.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-dashed border-black mt-4 pt-4 text-center">
        <div className="mb-2">Payment Method: {data.paymentMethod}</div>
        <div className="mb-4">Thank you for your business!</div>
        <div>Please come again</div>
      </div>
    </div>
  )
})

ReceiptTemplate.displayName = "ReceiptTemplate"

export default ReceiptTemplate
