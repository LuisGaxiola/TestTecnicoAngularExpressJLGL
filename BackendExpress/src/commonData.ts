export const categorias = ['Facturación', 'Soporte técnico', 'Ventas', 'Información general'] as const

export type Contacto = {
  id: number
  nombreCompleto: string
  nombreEmpresa: string
  correoElectronico: string
  telefono: string
  categoria: string
  mensaje: string
  visto: boolean
  fechaCreacion: string
}

export type GetContactosOutput = Contacto[]

export type PostContactosOutput = {
  success: boolean
}

export type DeleteContactosOutput = {
  success: boolean
}

export type DeleteContactoOutput = {
  success: boolean
}

export type PutContactoOutput = {
  success: boolean
}