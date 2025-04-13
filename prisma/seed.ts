import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Crear usuarios
  const admin = await prisma.user.create({
    data: {
      name: 'Admin Relojería',
      email: 'admin@relojeria.com',
      password: 'admin123',
      role: 'ADMIN',
    },
  });

  const cliente = await prisma.user.create({
    data: {
      name: 'Juan Pérez',
      email: 'juan@cliente.com',
      password: 'cliente123',
    },
  });

  // Crear productos
  const productos = await prisma.product.createMany({
    data: [
      {
        title: 'Reloj Casio Clásico',
        description: 'Modelo digital resistente al agua.',
        brand: 'Casio',
        price: 59.99,
        stock: 20,
      },
      {
        title: 'Rolex Submariner',
        description: 'Reloj de lujo automático.',
        brand: 'Rolex',
        price: 12500.0,
        stock: 2,
      },
      {
        title: 'Seiko Diver',
        description: 'Reloj para buceo con movimiento automático.',
        brand: 'Seiko',
        price: 450.0,
        stock: 10,
      },
    ],
  });

  console.log('Seeds creados con éxito.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
