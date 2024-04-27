import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const { letter, pageFrom, pageTo } = req.query;
  const prisma = new PrismaClient();
  const entriesPerPage = 100;

  async function getCategoryCount() {
    const categoryCount = await prisma.categories.aggregate({
      _count: {
        title: true,
      },
    });
    return categoryCount;
  }

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

  async function fetchCategoriesByLetter() {
    const skip = pageFrom - 1;
    const take = (pageTo - pageFrom + 1) * entriesPerPage;
    const categories = await prisma.categories.findMany({
      skip: skip,
      take: take,
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
    if (letter && pageFrom && pageTo) {
      const categories = await fetchCategoriesByLetter();
      res.status(200).json(categories);
    } else if (letter && !pageFrom && !pageTo) {
      res.status(400).json("Bad request");
    } else {
      const categoryCount = await getCategoryCount();
      res.status(200).json(categoryCount);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
