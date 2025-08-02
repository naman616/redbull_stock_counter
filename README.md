# Red Bull Sales Tracker

A clean, Apple-like web application for tracking Red Bull sales at events. Built with React, Tailwind CSS, and designed for mobile-first usage.

## Features

### 📦 Stock Entry Page (Initial Setup)
- Enter initial stock quantities for 5 Red Bull flavors:
  - ED (Dark Blue)
  - SF (Light Blue) 
  - RED (Red)
  - YELLOW (Yellow)
  - GREEN (Green)
- Upload UPI QR code image for payments
- Color-coded flavor inputs with validation

### 📲 Main Counter Page
- Display UPI QR code prominently at the top
- Two-column layout: Cash and GPay tracking
- Color-coded flavor rows with +/- counters
- Real-time remaining stock display
- Quick stats showing total sales by payment method

### ☰ Dropdown Menu
- Hamburger menu with 3 options:
  - **Change QR Code**: Upload different QR image
  - **Edit Stock**: Return to stock entry with pre-filled values
  - **End Sales**: Navigate to summary page

### 📊 Sales Summary Page
- Comprehensive sales breakdown by flavor
- Payment method analysis (Cash vs GPay)
- Starting stock vs remaining stock comparison
- PDF download functionality
- Shareable summary data

## Design Features

- **Apple-inspired Design**: Clean, minimal interface with rounded cards and soft shadows
- **Mobile-First**: Optimized for mobile devices and event usage
- **Color-Coded Flavors**: Each Red Bull flavor has its distinct color theme
- **Responsive Layout**: Works seamlessly across all device sizes
- **Local Storage**: All data persists locally, no backend required

## Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **jsPDF + html2canvas** - PDF generation
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd redbull_stock_counter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Initial Setup**: On first load, enter stock quantities for each flavor and upload your UPI QR code
2. **Sales Tracking**: Use the main counter page to track sales by flavor and payment method
3. **Menu Options**: Use the hamburger menu to change QR code, edit stock, or end sales
4. **Summary**: View detailed sales breakdown and download PDF reports

## Data Storage

All data is stored locally in the browser's localStorage:
- `redbullStock`: Initial stock quantities
- `redbullSales`: Sales tracking data
- `redbullQrCode`: QR code image data

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy directly from GitHub**:
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project
   - Deploy with one click

3. **Deploy from local**:
   ```bash
   vercel
   ```

### Deploy to GitHub Pages

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Push to GitHub** and enable GitHub Pages in repository settings

## License

This project is open source and available under the MIT License.