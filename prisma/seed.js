"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // const alice = await prisma.user.upsert({
        //     where: { email: 'alice@prisma.io' },
        //     update: {},
        //     create: {
        //         email: 'alice@prisma.io',
        //         name: 'Alice',
        //         posts: {
        //             create: {
        //                 title: 'Check out Prisma with Next.js',
        //                 content: 'https://www.prisma.io/nextjs',
        //                 published: true,
        //             },
        //         },
        //     },
        // })
        // const bob = await prisma.user.upsert({
        //     where: { email: 'bob@prisma.io' },
        //     update: {},
        //     create: {
        //         email: 'bob@prisma.io',
        //         name: 'Bob',
        //         posts: {
        //             create: [
        //                 {
        //                     title: 'Follow Prisma on Twitter',
        //                     content: 'https://twitter.com/prisma',
        //                     published: true,
        //                 },
        //                 {
        //                     title: 'Follow Nexus on Twitter',
        //                     content: 'https://twitter.com/nexusgql',
        //                     published: true,
        //                 },
        //             ],
        //         },
        //     },
        // })
        // console.log({ alice, bob })
        console.log('Start seeding');
        yield prisma.staff.createMany({
            data: [
                {
                    vk_id: 206186509,
                    name: 'Чуйков Максим',
                    role: client_1.Role.administrator
                }
            ]
        });
        yield prisma.variant.createMany({
            data: [
                {
                    name: 'Футбол',
                    capacity: 10,
                    hall: client_1.Hall.sport_hall,
                    entire_hall: true
                },
                {
                    name: 'Футбол',
                    capacity: 10,
                    hall: client_1.Hall.sport_hall,
                    entire_hall: false
                },
                {
                    name: 'Баскетбол',
                    capacity: 10,
                    hall: client_1.Hall.sport_hall,
                    entire_hall: true
                },
                {
                    name: 'Баскетбол',
                    capacity: 10,
                    hall: client_1.Hall.sport_hall,
                    entire_hall: false
                },
                {
                    name: 'Тренажерный зал',
                    capacity: 10,
                    hall: client_1.Hall.sport_hall,
                    entire_hall: false
                }
            ]
        });
        console.log('Stop seeding successfully!');
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
