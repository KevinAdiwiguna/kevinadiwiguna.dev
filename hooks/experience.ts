import { prisma } from "@/lib/db/prisma"

export const getAllExperienceData = async () => {
    const res = await prisma.experience.findMany({
        orderBy: {
            startDate: "desc",
        }
    })

    return res
}
