import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { FaPhoneAlt, FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import ChallanForm from './components/ChallanForm'
import Receipt from './components/Receipt'
import BarcodeListener from "./components/BarcodeListener";
import './index.css'
import Test from './components/test'
import Footer from './components/footer'
const base = import.meta.env.BASE_URL || '/'

const sliderImages = [
  `${base}images/slide1-img.png`,
  `${base}images/slide-2-img.png`,
  `${base}images/slide-3-img.png`,
  `${base}images/slide-4-img.png`,
]

function TopInfoBar() {
  return (

    <div className="w-full bg-[#dff3e6] text-slate-800 text-sm">

      <div className="mx-auto max-w-7xl px-[10px] py-[10px] flex items-center justify-between gap-4 max-[768px]:flex max-[768px]:flex-col max-[768px]:items-start max-[768px]:[align-items:self-start] max-[768px]:gap-[10px] max-[768px]:p-[10px]">

        <div className="flex flex-wrap items-center gap-[20px]">

          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-black h-3.5 w-3.5 mr-[10px]" />
            <span className="whitespace-nowrap">For Any Query: 0800-77000</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-black h-4 w-4 mr-[10px]" />
            <span className="whitespace-nowrap">Email: info@estamps.gos.pk</span>
          </div>
        </div>

        <a href="#login" className="text-slate-800 hover:underline" style={{ color: '#000000', textDecoration: 'none' }}>Member Login</a>
      </div>
    </div>

  )
}

function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div
        className="relative w-full h-[310px] overflow-hidden"
        style={{ position: 'relative', width: '100%', height: 310, overflow: 'hidden' }}
      >
        {/* Logo top-left inside slider */}
        <div className="absolute top-4 left-4 z-20 bg-white/80 rounded px-3 py-2 shadow">
          <img
            src={`${base}images/stamping-logo.png`}
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Slides */}
        <div className="absolute inset-0" style={{ position: 'absolute', inset: 0 }}>
          {sliderImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Slide ${idx + 1}`}
              loading={idx === 0 ? 'eager' : 'lazy'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${current === idx ? 'opacity-100' : 'opacity-0'
                }`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 700ms',
                opacity: current === idx ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Dots below slider */}

      <div
        className="flex items-center justify-center gap-[10px]"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        {sliderImages.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrent(idx)}
            className="block rounded-full"
            style={{
              width: 18,
              height: 18,
              padding: 0,
              border: 'none',
              outline: 'none',
              backgroundColor: current === idx ? '#2E7D32' : '#4FC375',
              transition: 'background-color 250ms',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

    </>
  )
}

function GridItem({ title, description, imgSrc, imgFallback, link }) {
  const content = (
    <div className="flex items-start gap-[12px] p-2">
      <img
        src={imgSrc}
        onError={(e) => {
          if (imgFallback && e.currentTarget.src !== imgFallback) {
            e.currentTarget.src = imgFallback
          }
        }}
        alt={title}
        className="w-[150px] h-[150px] object-contain flex-shrink-0"
      />
      <div className="w-[60%] mt-[5px]">
        <div className="text-slate-900 font-semibold text-[16px] leading-snug">{title}</div>
        <p className="mt-[5px] text-[12px] leading-5 text-slate-700">{description}</p>
      </div>
    </div>
  )

  if (link) {
    return (
      <Link to={link} className="block hover:shadow-lg transition-shadow duration-200 rounded-lg">
        {content}
      </Link>
    )
  }

  return content
}

function ServicesGrid() {
  const items = [
    {
      title: 'Challan Form No. 32-A',
      description: 'Generate new Challan Form 32-A to pay Stamp Duty.',
      img: `${base}images/card-1.png`,
      link: '/challan-form'
    },
    {
      title: 'Digital Scanning Fee, Copying Fee and Duplicate Fee',
      description:
        'Generate and Pay Digital Scanning Fee, Copying Fee and Duplicate Fee Challan Form 32-A.',
      img: `${base}images/card-2.png`,
    },
    {
      title: 'Mutation Fee and Certified True Copy Fee',
      description: 'Generate and Pay Mutation Fee and Certified True Copy Fee Challan Form 32-A.',
      img: `${base}images/card-3.png`,
    },
    {
      title: 'Registration Fee',
      description: 'Generate and Pay Registration Fee Challan Form 32-A.',
      img: `${base}images/card-4.png`,
    },
    {
      title: 'Verify or Print Challan 32-A',
      description: 'Verify or Print existing Challan Form 32-A.',
      img: `${base}images/card-5.png`,
    },
    {
      title: 'Pay Stamp Duty Deficiency or Penalty/Fine/Surcharge',
      description: 'Pay stamp duty Deficiency or Penalty/Fine/Surcharge on e-Stamps.',
      img: `${base}images/card-6.png`,
    },
    {
      title: 'Calculate Valuation Rate',
      description: 'Calculate Valuation Rate of Your Land.',
      img: `${base}images/card-7.png`,
    },
    {
      title: 'Verification Through Web',
      description: 'Verify your e-Stamps.',
      img: `${base}images/card-8.png`,
    },
    {
      title: 'Challan Form No. 32-A (Adhesive Stamps)',
      description: 'Generate new Challan Form 32-A to buy Adhesive Stamps.',
      img: `${base}images/card-9.png`,
      fallback: `${base}images/card-9`,
    },
  ]

  const rows = [items.slice(0, 3), items.slice(3, 6), items.slice(6, 9)]

  return (


    <div className="mx-auto max-w-[90%] px-4 my-[40px] py-10">


      {rows.map((row, idx) => (
        <div key={idx} className={`flex break-all flex-wrap gap-[15px] ${idx < rows.length - 1 ? 'mb-[15px]' : ''}`}>
          {row.map((item) => (
            <div
              key={item.title}
              className="basis-[30%] max-[1200px]:basis-full shrink-0"
            >
              <GridItem
                title={item.title}
                description={item.description}
                imgSrc={item.img}
                imgFallback={item.fallback}
                link={item.link}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function Partners() {
  const logos = [
    `${base}images/partner-logo-1.png`,
    `${base}images/partner-logo-2.png`,
    `${base}images/partner-logo-3.png`,
  ]
  return (
    <div className="w-full bg-[rgb(209,211,212)] py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-2xl font-semibold text-slate-800 mb-8">Partners</h2>
        <div className="flex mb-[20px] flex-wrap items-center justify-center gap-[100px] max-[768px]:gap-[50px]">
          {logos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Partner ${i + 1}`}
              className="h-14 w-auto object-contain mb-8"
            />
          ))}
        </div>
      </div>
    </div>
  )
}



function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopInfoBar />
      <HeroSlider />
      <ServicesGrid />
      <Partners />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challan-form" element={<ChallanForm />} />
        <Route path="/receipt/:documentId" element={<Receipt />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  )
}

export default App
