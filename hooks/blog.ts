import { prisma } from "@/lib/db/prisma"

export const get2BlogsData = async () => {
    const res = await prisma.blogs.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            published: true,
        },
        take: 2,
        select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            readTime: true,
            views: true,
            updatedAt: true,
            tags: {
                select: {
                    name: true,
                },
            },
            categories: {
                select: {
                    name: true,
                },
            },
        }
    })

    return res
}

export const getAllBlogsData = async () => {
    const res = await prisma.blogs.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            readTime: true,
            views: true,
            updatedAt: true,
            tags: {
                select: {
                    name: true,
                },
            },
            categories: {
                select: {
                    name: true,
                },
            },
        }
    })

    return res
}

export const getBlogDataById = async (id: string) => {
    const res = await prisma.blogs.findUnique({
        where: {
            id: id,
        },
    })

    return res
}
