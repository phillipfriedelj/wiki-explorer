import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { letter } = req.query;

  async function fetchCategoryCountByLetter() {
    const categoryCount = await prisma.categories.count({
      where: {
        first_letter: {
          equals: letter,
        },
      },
    });
    return categoryCount;
  }

  try {
    const count = await fetchCategoryCountByLetter();
    res.status(200).json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
