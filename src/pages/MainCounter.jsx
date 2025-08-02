import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DropdownMenu from '../components/DropdownMenu'

const FLAVORS = [
  { key: 'normal', name: 'ED', color: 'redbull-normal', bgColor: 'bg-redbull-normal' },
  { key: 'sugarfree', name: 'SF', color: 'redbull-sugarfree', bgColor: 'bg-redbull-sugarfree' },
  { key: 'watermelon', name: 'RED', color: 'redbull-watermelon', bgColor: 'bg-redbull-watermelon' },
  { key: 'tropical', name: 'YELLOW', color: 'redbull-tropical', bgColor: 'bg-redbull-tropical' },
  { key: 'curuba', name: 'GREEN', color: 'redbull-curuba', bgColor: 'bg-redbull-curuba' },
]

function MainCounter({ stockData, salesData, qrCode, onSalesUpdate, onQrCodeUpdate, onNewSales, onEndSales }) {
  const navigate = useNavigate()
  const [showQrCodeModal, setShowQrCodeModal] = useState(false)

  const handleSalesUpdate = (flavor, paymentType, increment) => {
    const newSalesData = { ...salesData }
    const currentValue = newSalesData[flavor][paymentType]
    const newValue = Math.max(0, currentValue + increment)
    
    // Check if we have enough stock
    const totalSold = newSalesData[flavor].cash + newSalesData[flavor].gpay
    if (paymentType === 'cash') {
      const newTotalSold = newSalesData[flavor].gpay + newValue
      if (newTotalSold > stockData[flavor]) return
    } else {
      const newTotalSold = newSalesData[flavor].cash + newValue
      if (newTotalSold > stockData[flavor]) return
    }
    
    newSalesData[flavor][paymentType] = newValue
    onSalesUpdate(newSalesData)
  }

  const handleQrCodeChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onQrCodeUpdate(e.target.result)
        setShowQrCodeModal(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const getRemainingStock = (flavor) => {
    const sold = salesData[flavor].cash + salesData[flavor].gpay
    return Math.max(0, stockData[flavor] - sold)
  }

  const menuItems = [
    {
      label: 'Change QR Code',
      icon: '📱',
      action: () => setShowQrCodeModal(true)
    },
    {
      label: 'New Sales',
      icon: '🔄',
      action: () => {
        if (window.confirm('Start new sales session? This will take you to the stock setup page.')) {
          onNewSales()
          navigate('/')
        }
      }
    },
    {
      label: 'End Sales',
      icon: '📊',
      action: () => navigate('/summary')
    }
  ]

  return (
    <div className="min-h-screen bg-apple-gray p-4">
      <div className="max-w-md mx-auto">
        {/* Header with QR Code and Menu */}
        <div className="apple-card p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-apple-dark">Sales Tracker</h1>
            <DropdownMenu items={menuItems} />
          </div>
          
          {/* QR Code Display */}
          {qrCode && (
            <div className="text-center">
              <img 
                src={qrCode} 
                alt="UPI QR Code" 
                className="w-64 h-64 mx-auto rounded-xl shadow-apple"
              />
              <p className="text-lg font-medium text-gray-700 mt-3">Pay with UPI</p>
            </div>
          )}
        </div>

        {/* Sales Counters */}
        <div className="apple-card p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <h3 className="font-semibold text-apple-dark">Cash</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-apple-dark">GPay</h3>
            </div>
          </div>

          <div className="space-y-3">
            {FLAVORS.map((flavor) => {
              const remaining = getRemainingStock(flavor.key)
              return (
                <div 
                  key={flavor.key} 
                  className={`flavor-card ${flavor.bgColor} bg-opacity-25 border-2 border-${flavor.color} border-opacity-40`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${flavor.bgColor}`}></div>
                      <span className="font-medium text-apple-dark">{flavor.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {remaining} left
                    </span>
                  </div>
                  
                                     <div className="grid grid-cols-2 gap-6">
                     {/* Cash Counter */}
                     <div className="flex items-center justify-center space-x-3">
                       <button
                         onClick={() => handleSalesUpdate(flavor.key, 'cash', -1)}
                         className="counter-button"
                         disabled={salesData[flavor.key].cash === 0}
                       >
                         <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                         </svg>
                       </button>
                       <span className="w-16 text-center font-bold text-xl">
                         {salesData[flavor.key].cash}
                       </span>
                       <button
                         onClick={() => handleSalesUpdate(flavor.key, 'cash', 1)}
                         className="counter-button"
                         disabled={remaining === 0}
                       >
                         <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                         </svg>
                       </button>
                     </div>

                     {/* GPay Counter */}
                     <div className="flex items-center justify-center space-x-3">
                       <button
                         onClick={() => handleSalesUpdate(flavor.key, 'gpay', -1)}
                         className="counter-button"
                         disabled={salesData[flavor.key].gpay === 0}
                       >
                         <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                         </svg>
                       </button>
                       <span className="w-16 text-center font-bold text-xl">
                         {salesData[flavor.key].gpay}
                       </span>
                       <button
                         onClick={() => handleSalesUpdate(flavor.key, 'gpay', 1)}
                         className="counter-button"
                         disabled={remaining === 0}
                       >
                         <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                         </svg>
                       </button>
                     </div>
                   </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="apple-card p-4 mt-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Total Cash</p>
              <p className="text-xl font-bold text-apple-dark">
                {Object.values(salesData).reduce((sum, flavor) => sum + flavor.cash, 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total GPay</p>
              <p className="text-xl font-bold text-apple-dark">
                {Object.values(salesData).reduce((sum, flavor) => sum + flavor.gpay, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Change Modal */}
      {showQrCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="apple-card p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Change QR Code</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQrCodeChange}
                  className="hidden"
                  id="qr-code-change-input"
                />
                <label
                  htmlFor="qr-code-change-input"
                  className="apple-button-secondary cursor-pointer inline-block"
                >
                  Choose New Image
                </label>
              </div>
              <button
                onClick={() => setShowQrCodeModal(false)}
                className="apple-button-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default MainCounter 