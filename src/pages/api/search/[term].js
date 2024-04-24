import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { term } = req.query;

  async function getMatchingCategories() {
    const matchingCategories = await prisma.categories.findMany({
      where: {
        title: {
          search: term,
        },
      },
    });
    return matchingCategories;
  }

  try {
    const matchingCategories = await getMatchingCategories();
    res.status(200).json(matchingCategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
