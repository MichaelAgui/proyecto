import { neon } from "@neondatabase/serverless"

/**
 * Provides a Neon SQL tagged-template util.
 * • In production (DATABASE_URL present) → real Neon client.
 * • In preview / local without DATABASE_URL   → no-op stub that
 *   resolves to an empty array so the UI can still render.
 */

type NeonSql = ReturnType<typeof neon> | ((...args: any[]) => Promise<any[]>)

let sql: NeonSql

if (process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL)
} else {
  console.warn(
    "[Inskpire] DATABASE_URL is not set. Using an in-memory mock; " + "data-fetching calls will return an empty array.",
  )
  sql = async () => []
}

export { sql }

/* ---------- Domain Types ---------- */
export interface Artist {
  id: number
  name: string
  email: string
  phone?: string
  bio?: string
  specialties: string[]
  image_url?: string
  instagram_handle?: string
  years_experience?: number
  created_at: Date
  updated_at: Date
}

export interface Portfolio {
  id: number
  artist_id: number
  title: string
  description?: string
  image_url: string
  category?: string
  tags: string[]
  created_at: Date
  artist?: Artist
}

export interface Appointment {
  id: number
  client_name: string
  client_email: string
  client_phone: string
  artist_id?: number
  appointment_date: string
  appointment_time: string
  tattoo_description?: string
  estimated_duration?: number
  estimated_price?: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
  created_at: Date
  updated_at: Date
  artist?: Artist
}

export interface GalleryItem {
  id: number
  title?: string
  description?: string
  image_url: string
  artist_id?: number
  category?: string
  tags: string[]
  featured: boolean
  created_at: Date
  artist?: Artist
}

export interface Testimonial {
  id: number
  client_name: string
  rating: number
  comment: string
  artist_id?: number
  featured: boolean
  created_at: Date
  artist?: Artist
}
