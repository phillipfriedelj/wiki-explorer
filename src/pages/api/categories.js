import prisma from "@/util/prisma-client";

export default async function handler(req, res) {
  const { letter, page, amount } = req.query;

  async function fetchCategoriesByLetter() {
    const categories = await prisma.categories.findMany({
      skip: (parseInt(page) - 1) * parseInt(amount),
      take: parseInt(amount),
      orderBy: { title: "asc" },
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

  async function getCategoryCountByLetter() {
    const categoryCount = await prisma.categories.count({
      where: {
        first_letter: {
          equals: letter,
        },
      },
    });
    return categoryCount;
  }

  async function getCategoryCount() {
    const categoryCount = await prisma.categories.aggregate({
      _count: {
        title: true,
      },
    });
    return categoryCount;
  }

  try {
    if (letter && page && amount) {
      const categories = await fetchCategoriesByLetter();
      res.status(200).json(categories);
    } else if (letter && !page && !amount) {
      const categoryCount = await getCategoryCountByLetter();
      res.status(200).json(categoryCount);
    } else {
      const categoryCount = await getCategoryCount();
      res.status(200).json(categoryCount);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
