import { type NextRequest, NextResponse } from "next/server"

// Mock storage para simular base de datos
const mockAppointments: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      clientName,
      clientEmail,
      clientPhone,
      artistId,
      appointmentDate,
      appointmentTime,
      tattooDescription,
      estimatedDuration,
      notes,
    } = body

    // Validar campos requeridos
    if (!clientName || !clientEmail || !clientPhone || !appointmentDate || !appointmentTime || !tattooDescription) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Simular inserción en base de datos
    const newAppointment = {
      id: mockAppointments.length + 1,
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      artist_id: artistId ? Number.parseInt(artistId) : null,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      tattoo_description: tattooDescription,
      estimated_duration: estimatedDuration ? Number.parseInt(estimatedDuration) : null,
      notes: notes || null,
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mockAppointments.push(newAppointment)

    return NextResponse.json(
      {
        message: "Cita agendada exitosamente",
        appointmentId: newAppointment.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error al agendar cita:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json(mockAppointments)
  } catch (error) {
    console.error("Error al obtener citas:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
