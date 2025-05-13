const factura = async () => {
  const res = await fetch('https://facturaciondirecta.com/API_SUNAT/post.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ruc: '20512345678',
      tipo: '03',
      serie: 'F001',
      correlativo: '00000001',
      fecha_emision: '2023-10-01',
      cliente_tipo_doc: '1',
      cliente_num_doc: '12345678',
      cliente_nombre: 'Juan Perez',
      total_gravado: 100,
      total_igv: 18,
      total_a_pagar: 118,
    }),
  }
  );
}
