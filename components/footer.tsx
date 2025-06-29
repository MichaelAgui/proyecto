import Link from "next/link"
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Palette } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold">INSKPIRE</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Estudio de tatuajes premium donde transformamos tus ideas en obras de arte únicas. Nuestros artistas
              especializados crean tatuajes que reflejan tu personalidad y estilo.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/portafolios" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Portafolios
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="/quienes-somos" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/agendamiento" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Agendamiento
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                <span className="text-gray-400">Facatativa- Calle 23-5 </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-purple-500" />
                <span className="text-gray-400">+57 3138241861</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-purple-500" />
                <span className="text-gray-400">infoinskipre@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Inskpire. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
