import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import StockEntry from './pages/StockEntry'
import MainCounter from './pages/MainCounter'
import SalesSummary from './pages/SalesSummary'

function App() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [stockData, setStockData] = useState(null)
  const [salesData, setSalesData] = useState(null)
  const [qrCode, setQrCode] = useState(null)

  useEffect(() => {
    // Load data from localStorage on app start
    const savedStock = localStorage.getItem('redbullStock')
    const savedSales = localStorage.getItem('redbullSales')
    const savedQrCode = localStorage.getItem('redbullQrCode')
    
    if (savedStock) {
      setStockData(JSON.parse(savedStock))
      setIsInitialized(true)
    }
    
    if (savedSales) {
      setSalesData(JSON.parse(savedSales))
    }
    
    if (savedQrCode) {
      setQrCode(savedQrCode)
    }
  }, [])

  const handleStockSubmit = (stock, qrCodeData) => {
    setStockData(stock)
    setQrCode(qrCodeData)
    setIsInitialized(true)
    
    // Initialize sales data
    const initialSales = Object.keys(stock).reduce((acc, flavor) => {
      acc[flavor] = { cash: 0, gpay: 0 }
      return acc
    }, {})
    
    setSalesData(initialSales)
    
    // Save to localStorage
    localStorage.setItem('redbullStock', JSON.stringify(stock))
    localStorage.setItem('redbullSales', JSON.stringify(initialSales))
    localStorage.setItem('redbullQrCode', qrCodeData)
  }

  const handleSalesUpdate = (newSalesData) => {
    setSalesData(newSalesData)
    localStorage.setItem('redbullSales', JSON.stringify(newSalesData))
  }

  const handleQrCodeUpdate = (newQrCode) => {
    setQrCode(newQrCode)
    localStorage.setItem('redbullQrCode', newQrCode)
  }

  const handleNewSales = () => {
    // Clear all state and localStorage
    setStockData(null)
    setSalesData(null)
    setQrCode(null)
    setIsInitialized(false)
    
    localStorage.removeItem('redbullStock')
    localStorage.removeItem('redbullSales')
    localStorage.removeItem('redbullQrCode')
  }

  const handleEndSales = () => {
    // Navigate to summary page
  }

  return (
    <div className="min-h-screen bg-apple-gray">
      <Routes>
        <Route 
          path="/" 
          element={
            isInitialized ? 
            <Navigate to="/counter" replace /> : 
            <StockEntry 
              onSubmit={handleStockSubmit} 
              initialStock={stockData}
              initialQrCode={qrCode}
            />
          } 
        />
        <Route 
          path="/counter" 
          element={
            isInitialized ? 
            <MainCounter 
              stockData={stockData}
              salesData={salesData}
              qrCode={qrCode}
              onSalesUpdate={handleSalesUpdate}
              onQrCodeUpdate={handleQrCodeUpdate}
              onNewSales={handleNewSales}
              onEndSales={handleEndSales}
            /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/summary" 
          element={
            isInitialized ? 
            <SalesSummary 
              stockData={stockData}
              salesData={salesData}
              qrCode={qrCode}
            /> : 
            <Navigate to="/" replace />
          } 
        />
      </Routes>
    </div>
  )
}

export default App 