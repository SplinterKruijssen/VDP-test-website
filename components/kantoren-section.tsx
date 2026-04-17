"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LocationMap } from "@/components/ui/expand-map"

/* ── Office data ─────────────────────────────────── */
interface Office {
  name: string
  address: string
  postcode: string
  phone?: string
  fax?: string
  email: string
  /** Path relative to /public  */
  image: string
  /** Display name passed to LocationMap */
  location: string
  /** Coordinate string passed to LocationMap */
  coordinates: string
}

const OFFICES: Office[] = [
  {
    name: "Bussum",
    address: "Meerweg 45",
    postcode: "1405 BD Bussum",
    phone: "035-6956900",
    fax: "035-6956969",
    email: "info@vdpadvies.nl",
    image: "/brand_assets/KantoorBussum.jpg",
    location: "Bussum, Noord-Holland",
    coordinates: "52.2742° N, 5.1628° E",
  },
  {
    name: "Hilversum",
    address: "Melkpad 20a",
    postcode: "1217 KC Hilversum",
    phone: "035-6980414",
    fax: "035-6982154",
    email: "info@vdpadvies.nl",
    image: "/brand_assets/KantoorHilversum.jpg",
    location: "Hilversum, Noord-Holland",
    coordinates: "52.2292° N, 5.1806° E",
  },
  {
    name: "Amsterdam",
    address: "Keizersgracht 387D",
    postcode: "1016 EJ Amsterdam",
    email: "info@vdpadvies.nl",
    image: "/brand_assets/KantoorAmsterdam.jpg",
    location: "Amsterdam, Noord-Holland",
    coordinates: "52.3711° N, 4.8860° E",
  },
]

/* ── Office card ─────────────────────────────────── */
function KantoorCard({
  office,
  index,
  onClick,
}: {
  office: Office
  index: number
  onClick: (office: Office) => void
}) {
  return (
    <motion.div
      className="group rounded-2xl overflow-hidden bg-white cursor-pointer"
      style={{
        boxShadow:
          "0 2px 8px rgba(27,47,160,.06), 0 8px 32px rgba(27,47,160,.10)",
      }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 4px 16px rgba(27,47,160,.12), 0 16px 48px rgba(27,47,160,.16)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      // stagger entrance
      viewport={{ once: true }}
      onClick={() => onClick(office)}
    >
      {/* Photo */}
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={office.image}
          alt={`VDP Kantoor ${office.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,15,56,.55)] via-transparent to-transparent" />

        {/* "Bekijk kaart" badge that peeks in on hover */}
        <motion.div
          className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 0 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1B2FA0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-[11px] font-semibold text-[#1B2FA0]">
            Bekijk op kaart
          </span>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-serif text-[20px] font-normal tracking-tight text-gray-900 mb-1.5">
          {office.name}
        </h3>
        <p className="text-[13px] text-gray-400 leading-relaxed">
          {office.address} · {office.postcode}
        </p>

        {/* "Klik voor kaart" hint row */}
        <div className="flex items-center gap-1.5 mt-3 text-[12px] font-semibold tracking-wide text-[#1B2FA0]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Klik voor kaart
        </div>
      </div>
    </motion.div>
  )
}

/* ── Modal ───────────────────────────────────────── */
function OfficeModal({
  office,
  onClose,
}: {
  office: Office
  onClose: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Card */}
      <motion.div
        className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        {/* Photo header */}
        <div className="relative h-48">
          <img
            src={office.image}
            alt={office.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Sluiten"
          >
            <X size={15} />
          </button>

          {/* Office title */}
          <div className="absolute bottom-4 left-5">
            <p className="text-white/55 text-[10px] font-semibold tracking-[0.15em] uppercase mb-1">
              VDP Advies
            </p>
            <h2 className="text-white text-2xl font-serif font-normal tracking-tight leading-none">
              {office.name}
            </h2>
          </div>
        </div>

        {/* Body: address + LocationMap side-by-side */}
        <div className="p-5 flex gap-5 items-start">
          {/* Address details */}
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-medium text-gray-900">
              {office.address}
            </p>
            <p className="text-[14px] text-gray-500 mb-3">{office.postcode}</p>

            {office.phone && (
              <a
                href={`tel:${office.phone.replace(/-/g, "")}`}
                className="flex items-center gap-2 text-[13px] font-semibold text-[#1B2FA0] hover:text-[#2B45C8] transition-colors mb-1"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.17 3.47 2 2 0 0 1 3.14 1h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 21 16z"/>
                </svg>
                {office.phone}
              </a>
            )}

            {office.fax && (
              <p className="text-[12px] text-gray-400 mb-1">Fax: {office.fax}</p>
            )}

            <a
              href={`mailto:${office.email}`}
              className="flex items-center gap-2 text-[13px] text-[#1B2FA0] hover:text-[#2B45C8] transition-colors mt-1"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {office.email}
            </a>

            <a
              href="contact.html"
              className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-semibold text-white bg-[#1B2FA0] hover:bg-[#2B45C8] transition-colors px-4 py-2 rounded-full"
            >
              Plan een gesprek
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          {/* LocationMap widget */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <LocationMap
              location={office.location}
              coordinates={office.coordinates}
            />
            <p className="text-[10px] text-gray-400 text-right leading-tight max-w-[160px]">
              Klik op de kaart om<br />te vergroten
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Main section ────────────────────────────────── */
export function KantoorenSection() {
  const [selected, setSelected] = useState<Office | null>(null)

  return (
    <>
      <section className="py-24 px-10 bg-[#F7F8FC]" id="kantoren">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1B2FA0] mb-4">
                Onze locaties
              </p>
              <h2 className="font-serif text-[clamp(26px,2.8vw,38px)] font-normal tracking-[-0.03em] leading-tight text-gray-900">
                Kantoren die onderdeel zijn van{" "}
                <em className="italic text-[#1B2FA0]">VDP</em>
              </h2>
            </div>
            <p className="text-[14px] text-gray-400 max-w-[200px] text-right leading-relaxed hidden md:block">
              Sterke, onafhankelijke kantoren.
              <br />
              Samen groter.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFICES.map((office, i) => (
              <KantoorCard
                key={office.name}
                office={office}
                index={i}
                onClick={setSelected}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal portal */}
      <AnimatePresence>
        {selected && (
          <OfficeModal office={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
