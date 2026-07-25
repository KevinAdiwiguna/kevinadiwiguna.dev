import { prisma } from "@/lib/db/prisma"

export const get2ProjectData = async () => {
    const res = await prisma.project.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            isFeatured: true,
        },
        take: 2,
        select: {
            id: true,
            title: true,
            slug: true,
            shortDescription: true,
            githubUrl: true,
            liveUrl: true,
            isFeatured: true,
            updatedAt: true,
            technologies: {
                select: {
                    name: true,
                },
            },
        }
    })

    return res
}

export const getAllProjectData = async () => {
    const res = await prisma.project.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            title: true,
            slug: true,
            shortDescription: true,
            githubUrl: true,
            liveUrl: true,
            isFeatured: true,
            updatedAt: true,
            technologies: {
                select: {
                    name: true,
                },
            },
        }
    })

    return res
}

export const getProjectDataById = async (id: string) => {
    const res = await prisma.project.findUnique({
        where: {
            id: id,
        },
    })

    return res
}
