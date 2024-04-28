import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const { letter, pageFrom, pageTo } = req.query;
  const prisma = new PrismaClient();
  const entriesPerPage = 100;

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
    if (letter && pageFrom && pageTo) {
      console.log("FETCH FROM ", pageFrom, " TO ", pageTo);
      const categories = await fetchCategoriesByLetter();
      res.status(200).json(categories);
    } else if (letter && !pageFrom && !pageTo) {
      const categoryCount = await getCategoryCountByLetter();
      console.log("CATEGORY COUNT -- ", categoryCount, " FOR ", letter);
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
