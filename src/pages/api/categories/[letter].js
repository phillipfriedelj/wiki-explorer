import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { letter } = req.query;

  async function fetchCategoriesByLetter() {
    const categories = await prisma.categories.findMany({
      skip: 0,
      take: 1,
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
    console.log("CATS: ", categories);
    res.status(200).json(categories);
    //await prisma.$disconnect()
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
    //await prisma.$disconnect()
  }
}
