import { ClienteType, ItemsType } from "../../src/types/facturas";

export const factura = async (cliente: ClienteType, items: ItemsType[]) => {
  const res = await fetch('https://facturaciondirecta.com/API_SUNAT/post.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cliente,
      items,
      // venta,
      // empresa
    }),
  }
  );

  const data = res.json();
  console.log(data);
}
