import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { term, page, amount } = req.query;

  async function getSearchResultsCount() {
    const searchResultsCount = await prisma.categories.count({
      where: {
        title: {
          contains: term.toLowerCase(), // Using startsWith for LIKE 'vene%'
        },
      },
    });
    console.log("SRC ::: ", searchResultsCount);
    return searchResultsCount;
  }

  async function searchCategoriesByTitle() {
    const categories = await prisma.categories.findMany({
      skip: (parseInt(page) - 1) * parseInt(amount),
      take: parseInt(amount),
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
  }

  try {
    if (term && page && amount) {
      const matchingCategories = await searchCategoriesByTitle();
      res.status(200).json(matchingCategories);
    } else if (term) {
      console.log("COUNT");
      const searchResultsCount = await getSearchResultsCount();
      res.status(200).json(searchResultsCount);
    } else {
      res.status(400).json({ error: "malformed request" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
