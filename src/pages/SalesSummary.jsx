import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const FLAVORS = [
  { key: 'normal', name: 'ED', color: 'redbull-normal', bgColor: 'bg-redbull-normal' },
  { key: 'sugarfree', name: 'SF', color: 'redbull-sugarfree', bgColor: 'bg-redbull-sugarfree' },
  { key: 'watermelon', name: 'RED', color: 'redbull-watermelon', bgColor: 'bg-redbull-watermelon' },
  { key: 'tropical', name: 'YELLOW', color: 'redbull-tropical', bgColor: 'bg-redbull-tropical' },
  { key: 'curuba', name: 'GREEN', color: 'redbull-curuba', bgColor: 'bg-redbull-curuba' },
]

function SalesSummary({ stockData, salesData, qrCode }) {
  const navigate = useNavigate()
  const summaryRef = useRef(null)

  const getRemainingStock = (flavor) => {
    const sold = salesData[flavor].cash + salesData[flavor].gpay
    return Math.max(0, stockData[flavor] - sold)
  }

  const getTotalSold = (flavor) => {
    return salesData[flavor].cash + salesData[flavor].gpay
  }

  const getTotalCash = () => {
    return Object.values(salesData).reduce((sum, flavor) => sum + flavor.cash, 0)
  }

  const getTotalGPay = () => {
    return Object.values(salesData).reduce((sum, flavor) => sum + flavor.gpay, 0)
  }

  const getTotalSales = () => {
    return getTotalCash() + getTotalGPay()
  }

  const downloadPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const margin = 15
    let yPosition = 20

    // Header
    pdf.setFontSize(20)
    pdf.setFont('helvetica', 'bold')
    pdf.text('RED BULL SALES RECEIPT', pageWidth / 2, yPosition, { align: 'center' })
    
    yPosition += 10
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition)
    yPosition += 5
    pdf.text(`Time: ${new Date().toLocaleTimeString()}`, margin, yPosition)
    
    yPosition += 12
    
    // Divider line
    pdf.setDrawColor(0)
    pdf.setLineWidth(0.3)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 8

    // Flavor breakdown
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('SALES BREAKDOWN', margin, yPosition)
    yPosition += 8

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')

    FLAVORS.forEach((flavor) => {
      const sold = getTotalSold(flavor.key)
      const remaining = getRemainingStock(flavor.key)
      const cashSold = salesData[flavor.key].cash
      const gpaySold = salesData[flavor.key].gpay
      
      if (yPosition > 270) {
        pdf.addPage()
        yPosition = 20
      }
      
      pdf.setFont('helvetica', 'bold')
      pdf.text(`${flavor.name}:`, margin, yPosition)
      yPosition += 5
      
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Starting: ${stockData[flavor.key]} | Sold: ${sold} (Cash: ${cashSold}, GPay: ${gpaySold}) | Remaining: ${remaining}`, margin + 3, yPosition)
      yPosition += 8
    })

    // Divider line
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 8

    // Totals
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('TOTALS', margin, yPosition)
    yPosition += 8
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Total Sales: ${getTotalSales()} | Cash: ${getTotalCash()} | GPay: ${getTotalGPay()} | Remaining: ${Object.keys(stockData).reduce((sum, flavor) => sum + getRemainingStock(flavor), 0)}`, margin, yPosition)

    pdf.save('redbull-sales-receipt.pdf')
  }

  const shareLink = () => {
    let shareText = 'RED BULL SALES SUMMARY\n\n'
    
    FLAVORS.forEach((flavor) => {
      const sold = getTotalSold(flavor.key)
      const remaining = getRemainingStock(flavor.key)
      const cashSold = salesData[flavor.key].cash
      const gpaySold = salesData[flavor.key].gpay
      
      shareText += `${flavor.name}:\n`
      shareText += `Starting: ${stockData[flavor.key]}\n`
      shareText += `Sold: ${sold} (Cash: ${cashSold}, GPay: ${gpaySold})\n`
      shareText += `Remaining: ${remaining}\n\n`
    })
    
    shareText += `TOTAL SALES: ${getTotalSales()}\n`
    shareText += `CASH: ${getTotalCash()}\n`
    shareText += `GPAY: ${getTotalGPay()}\n`
    shareText += `REMAINING: ${Object.keys(stockData).reduce((sum, flavor) => sum + getRemainingStock(flavor), 0)}`
    
    if (navigator.share) {
      navigator.share({
        title: 'Red Bull Sales Summary',
        text: shareText
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Sales summary copied to clipboard!')
      })
    }
  }

  return (
    <div className="min-h-screen bg-apple-gray p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-apple-dark mb-2">
            Sales Summary
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Summary Content */}
        <div ref={summaryRef} className="space-y-6">
          {/* Overview Stats */}
          <div className="apple-card p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-apple-dark">{getTotalSales()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Cash Sales</p>
                <p className="text-2xl font-bold text-green-600">{getTotalCash()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">GPay Sales</p>
                <p className="text-2xl font-bold text-blue-600">{getTotalGPay()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Object.keys(stockData).reduce((sum, flavor) => sum + getRemainingStock(flavor), 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="apple-card p-6">
            <h2 className="text-xl font-semibold mb-4">Flavor Breakdown</h2>
            <div className="space-y-4">
              {FLAVORS.map((flavor) => {
                const sold = getTotalSold(flavor.key)
                const remaining = getRemainingStock(flavor.key)
                const cashSold = salesData[flavor.key].cash
                const gpaySold = salesData[flavor.key].gpay
                
                return (
                                     <div 
                     key={flavor.key}
                     className={`p-4 rounded-xl ${flavor.bgColor} bg-opacity-25 border-2 border-${flavor.color} border-opacity-40`}
                   >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full ${flavor.bgColor}`}></div>
                        <span className="font-semibold text-apple-dark">{flavor.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Sold: {sold}</p>
                        <p className="text-sm text-gray-600">Left: {remaining}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-600">Starting</p>
                        <p className="font-bold text-apple-dark">{stockData[flavor.key]}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Cash</p>
                        <p className="font-bold text-green-600">{cashSold}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">GPay</p>
                        <p className="font-bold text-blue-600">{gpaySold}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Payment Method Breakdown */}
          <div className="apple-card p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-green-800 mb-2">Cash Payments</h3>
                <p className="text-3xl font-bold text-green-600">{getTotalCash()}</p>
                <p className="text-sm text-green-600">
                  {((getTotalCash() / getTotalSales()) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-blue-800 mb-2">GPay Payments</h3>
                <p className="text-3xl font-bold text-blue-600">{getTotalGPay()}</p>
                <p className="text-sm text-blue-600">
                  {((getTotalGPay() / getTotalSales()) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={downloadPDF}
            className="apple-button flex-1 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download PDF</span>
          </button>
          
          <button
            onClick={shareLink}
            className="apple-button-secondary flex-1 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share</span>
          </button>
          
          <button
            onClick={() => navigate('/counter')}
            className="apple-button-secondary flex-1"
          >
            Back to Counter
          </button>
        </div>
      </div>
    </div>
  )
}

export default SalesSummary 