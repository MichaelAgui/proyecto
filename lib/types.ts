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
