import React, { useState } from 'react'

const FLAVORS = [
  { key: 'normal', name: 'ED', color: 'redbull-normal', bgColor: 'bg-redbull-normal' },
  { key: 'sugarfree', name: 'SF', color: 'redbull-sugarfree', bgColor: 'bg-redbull-sugarfree' },
  { key: 'watermelon', name: 'RED', color: 'redbull-watermelon', bgColor: 'bg-redbull-watermelon' },
  { key: 'tropical', name: 'YELLOW', color: 'redbull-tropical', bgColor: 'bg-redbull-tropical' },
  { key: 'curuba', name: 'GREEN', color: 'redbull-curuba', bgColor: 'bg-redbull-curuba' },
]

function StockEntry({ onSubmit, initialStock, initialQrCode }) {
  const [stock, setStock] = useState({
    normal: initialStock?.normal || '',
    sugarfree: initialStock?.sugarfree || '',
    watermelon: initialStock?.watermelon || '',
    tropical: initialStock?.tropical || '',
    curuba: initialStock?.curuba || ''
  })
  const [qrCode, setQrCode] = useState(initialQrCode || '')
  const [errors, setErrors] = useState({})

  const handleStockChange = (flavor, value) => {
    const numValue = value === '' ? '' : parseInt(value) || 0
    setStock(prev => ({
      ...prev,
      [flavor]: numValue
    }))
    
    // Clear error for this field
    if (errors[flavor]) {
      setErrors(prev => ({
        ...prev,
        [flavor]: null
      }))
    }
  }

  const handleQrCodeChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setQrCode(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Check if all stock values are filled
    Object.keys(stock).forEach(flavor => {
      if (stock[flavor] === '' || stock[flavor] < 0) {
        newErrors[flavor] = 'Please enter a valid quantity'
      }
    })
    
    // Check if QR code is uploaded
    if (!qrCode) {
      newErrors.qrCode = 'Please upload a QR code image'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(stock, qrCode)
    }
  }

  return (
    <div className="min-h-screen bg-apple-gray p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-apple-dark mb-2">
            Red Bull Stock Setup
          </h1>
          <p className="text-gray-600">
            Enter initial stock quantities for each flavor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stock Inputs */}
          <div className="apple-card p-6">
            <h2 className="text-xl font-semibold mb-4">Initial Stock</h2>
            <div className="space-y-4">
              {FLAVORS.map((flavor) => (
                <div key={flavor.key} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${flavor.bgColor}`}></div>
                  <label className="flex-1 font-medium text-apple-dark">
                    {flavor.name}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stock[flavor.key]}
                    onChange={(e) => handleStockChange(flavor.key, e.target.value)}
                    className={`w-20 px-3 py-2 border rounded-lg text-center font-medium ${
                      errors[flavor.key] 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 focus:border-redbull-normal focus:ring-2 focus:ring-redbull-normal/20'
                    }`}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
            {Object.keys(errors).some(key => key !== 'qrCode' && errors[key]) && (
              <p className="text-red-500 text-sm mt-2">
                Please fill in all stock quantities
              </p>
            )}
          </div>

          {/* QR Code Upload */}
          <div className="apple-card p-6">
            <h2 className="text-xl font-semibold mb-4">UPI QR Code</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {qrCode ? (
                  <div className="space-y-4">
                    <img 
                      src={qrCode} 
                      alt="QR Code" 
                      className="w-32 h-32 mx-auto rounded-lg shadow-apple"
                    />
                    <button
                      type="button"
                      onClick={() => setQrCode('')}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove QR Code
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-400 mb-2">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-2">Upload your UPI QR code</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQrCodeChange}
                      className="hidden"
                      id="qr-code-input"
                    />
                    <label
                      htmlFor="qr-code-input"
                      className="apple-button-secondary cursor-pointer inline-block"
                    >
                      Choose Image
                    </label>
                  </div>
                )}
              </div>
              {errors.qrCode && (
                <p className="text-red-500 text-sm">{errors.qrCode}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="apple-button w-full"
          >
            Start Sales Tracking
          </button>
        </form>
      </div>
    </div>
  )
}

export default StockEntry 