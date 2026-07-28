import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";

const baseUrl = "https://kevinadiwiguna.dev";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [blogs, projects] = await Promise.all([
        prisma.blogs.findMany({
            where: {
                published: true,
            },
            select: {
                slug: true,
                updatedAt: true,
            },
        }),
        prisma.project.findMany({
            select: {
                slug: true,
                updatedAt: true,
            },
        }),
    ]);

    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: project.updatedAt,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
