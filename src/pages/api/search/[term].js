import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { term } = req.query;

  async function searchCategoriesByTitle() {
    try {
      const categories = await prisma.categories.findMany({
        take: 20,
        where: {
          title: {
            contains: term.toLowerCase(), // Using startsWith for LIKE 'vene%'
          },
        },
        include: {
          categories_articles: {
            include: {
              articles: true,
            },
          },
        },
      });
      return categories;
    } catch (error) {
      console.error("Error searching categories:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  try {
    const matchingCategories = await searchCategoriesByTitle();
    res.status(200).json(matchingCategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
