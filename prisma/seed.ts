import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Crear usuarios
    const admin = await prisma.user.create({
        data: {
            name: "Admin Relojería",
            email: "admin@relojeria.com",
            password: "admin123", // En producción, ¡nunca sin encriptar!
            role: "ADMIN",
        },
    });

    const cliente = await prisma.user.create({
        data: {
            name: "Juan Pérez",
            email: "juan@cliente.com",
            password: "cliente123",
        },
    });

    // Crear productos
    const productos = await prisma.product.createMany({
        data: [
            {
                name: "Reloj Casio Clásico",
                description: "Modelo digital resistente al agua.",
                brand: "Casio",
                price: 59.99,
                stock: 20,
            },
            {
                name: "Rolex Submariner",
                description: "Reloj de lujo automático.",
                brand: "Rolex",
                price: 12500.00,
                stock: 2,
            },
            {
                name: "Seiko Diver",
                description: "Reloj para buceo con movimiento automático.",
                brand: "Seiko",
                price: 450.00,
                stock: 10,
            },
        ],
    });

    console.log("Seeds creados con éxito.");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());