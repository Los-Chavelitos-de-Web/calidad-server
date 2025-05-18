import { ClienteType, ItemsType } from "../../src/types/facturas";

export const factura = async (cliente: ClienteType, items: ItemsType[]) => {

  const total_gravada = items.reduce((acc, item) => acc + parseInt(item.precio_base) * parseInt(item.cantidad), 0);
  const total_igv = total_gravada * 0.18; // 18% IGV

  const venta = {
    serie: new Date().getFullYear(),
    numero: "12345",
    fecha_emision: new Date().toISOString().split('T')[0],
    hora_emision: new Date().toISOString().split('T')[1].split('.')[0].replace(' ', ''),
    fecha_vencimiento: "",
    moneda_id: "2",
    forma_pago_id: "1",
    total_gravada: total_gravada.toFixed(2),
    total_igv: total_igv.toFixed(2),
    total_exonerada: "",
    total_inafecta: "",
    tipo_documento_codigo: "01",
    nota: "Gracias por su compra",
  };


  const res = await fetch('https://facturaciondirecta.com/API_SUNAT/post.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cliente,
      items,
      venta,
      empresa: {
        "ruc": "20526058578",
        "razon_social": "Comercial Rafael Norte S.A.C.",
        "nombre_comercial": "FACTURACION INTEGRAL",
        "domicilio_fiscal": "Av. Sanchez Cerro Mz P Lt 05",
        "ubigeo": "",
        "urbanizacion": "Urb. Santa Ana, Piura, Perú",
        "distrito": "PIURA",
        "provincia": "PIURA",
        "departamento": "PIURA",
        "modo": "0",
        "usu_secundario_produccion_user": "MODDATOS",
        "usu_secundario_produccion_password": "MODDATOS"
      }
    }),
  }
  );

  return await res.json();
}
