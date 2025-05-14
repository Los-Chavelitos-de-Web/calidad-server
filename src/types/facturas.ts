export type ClienteType = {
  razon_social_nombres: string,
  numero_docuemnto: string,
  codi_tipo_entidad: string,
  cliente_direccion?: string,
}

export type ItemsType = {
  producto: string,
  cantidad: string,
  precio_base: string,
  codigo_sunat: string,
  codigo_producto: string,
  codigo_unidad: string,
  tipo_igv_codigo: string,
}
