import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { letter, count, direction, id } = req.query;

  async function fetchCategoriesByLetterWithId() {
    console.log(
      "COUNT -- ",
      count,
      "  LETTER -- ",
      letter,
      " - ID: ",
      id,
      " --DIRECTION: ",
      direction
    );
    // const filter =
    //   direction === "up"
    //     ? { id: { gt: parseInt(id) } }
    //     : { id: { lt: parseInt(id) } };
    const categories = await prisma.categories.findMany({
      where: {
        AND: [
          { first_letter: { equals: letter } },
          filter,
          // { id: { gt: parseInt(id) } }, // Filter by ID greater than the specified ID
        ],
      },
      include: {
        categories_articles: {
          include: {
            articles: true,
          },
        },
      },
      // cursor: {
      //   id: parseInt(id), // Start from the specified ID, parsed to integer
      // },
      take: parseInt(count), // Limit the number of entries returned
      orderBy: {
        id: direction === "up" ? "asc" : "desc", // Order by ID based on the direction
      },
    });
    return categories;
  }

  try {
    const categories = await fetchCategoriesByLetterWithId();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
