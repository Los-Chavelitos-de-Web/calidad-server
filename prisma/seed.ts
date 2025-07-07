import { PrismaClient } from '@prisma/client';
import { products } from './products';
const prisma = new PrismaClient();

async function main() {
  // Crear usuarios
  // await prisma.user.create({
  //   data: {
  //     name: '',
  //     email: '',
  //     password: '',
  //     role: 'ADMIN',
  //   },
  // });

  // await prisma.user.create({
  //   data: {
  //     name: '',
  //     email: '',
  //     password: '',
  //   },
  // });

  // Crear productos
  await prisma.product.createMany({
    data: products
  });

  // Seeds para User
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        email: 'pancito@canela.de',
        password: 'lacontraseñamasdificildelmundo',
        isActive: true,
      },
      {
        id: 2,
        email: 'okarun@anime.net',
        password: 'lacontraseñamasdificildelmundo',
        isActive: false,
      },
      {
        id: 3,
        email: 'oshi@no.ko',
        password: 'lacontraseñamasdificildelmundo',
        isActive: true,
      }
    ],
  });

  // Seeds para Profile
  await prisma.profile.createMany({
    data: [
      {
        user_id: 1,
        dni: '12345678',
        name: 'Pancito de canela',
      },
      {
        user_id: 2,
        dni: '87654321',
        name: 'Okarun',
      },
      {
        user_id: 3,
        dni: '11223344',
        name: 'Oshi no ko',
      },
    ],
  });

  // Seeds para Sale
  await prisma.sale.createMany({
    data: [
      {
        id: 'S001',
        userId: 1,
        total: 120.5,
        status: 'PENDIENTE',
      },
      {
        id: 'S002',
        userId: 1,
        total: 350.75,
        status: 'CONFIRMADA',
      },
      {
        id: 'S003',
        userId: 1,
        total: 89.99,
        status: 'CANCELADA',
      },
    ],
  });

  await prisma.saleItem.createMany({
    data: [
      {
        saleId: 'S001',
        producto: 'Monitor LED 24"',
        cantidad: '1',
        precio_base: '120.5',
        codigo_producto: 'PRD001',
        codigo_sunat: 'ELEC001',
        codigo_unidad: 'NIU',
        tipo_igv_codigo: '10',
      },
      {
        saleId: 'S002',
        producto: 'Laptop Gamer XYZ',
        cantidad: '1',
        precio_base: '350.75',
        codigo_producto: 'PRD002',
        codigo_sunat: 'ELEC002',
        codigo_unidad: 'NIU',
        tipo_igv_codigo: '10',
      },
      {
        saleId: 'S003',
        producto: 'Teclado Mecánico',
        cantidad: '2',
        precio_base: '44.995',
        codigo_producto: 'PRD003',
        codigo_sunat: 'ELEC003',
        codigo_unidad: 'NIU',
        tipo_igv_codigo: '10',
      },
    ],
  });

  // Seeds para Reserva
  await prisma.reserva.createMany({
    data: [
      {
        userId: 1,
        total: 200,
        status: 'PENDIENTE',
        notes: 'Cliente recogerá el producto en tienda.',
      },
      {
        userId: 1,
        total: 600.5,
        status: 'CONFIRMADA',
        notes: 'Entrega a domicilio programada.',
      },
      {
        userId: 1,
        total: 150.25,
        status: 'CANCELADA',
        notes: 'El cliente canceló por falta de stock.',
      },
    ],
  });

  await prisma.reservaItem.createMany({
    data: [
      {
        reservaId: 1,
        producto: 'Mouse Inalámbrico',
        cantidad: 2,
        precio_base: 100,
        codigo_producto: 'PRD004',
      },
      {
        reservaId: 2,
        producto: 'Impresora Multifunción',
        cantidad: 1,
        precio_base: 600.5,
        codigo_producto: 'PRD005',
      },
      {
        reservaId: 3,
        producto: 'Router WiFi 6',
        cantidad: 1,
        precio_base: 150.25,
        codigo_producto: 'PRD006',
      },
    ],
  });

  console.log('🌱 Seeds cargados correctamente con todos los productos.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
