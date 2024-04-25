import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { letter } = req.query;

  async function fetchCategoriesByLetter() {
    const categories = await prisma.categories.findMany({
      skip: 0,
      take: 500,
      where: {
        first_letter: {
          equals: letter,
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
  }

  try {
    const categories = await fetchCategoriesByLetter();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
