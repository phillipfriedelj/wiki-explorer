import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  async function getCategoryCount() {
    const categoryCount = await prisma.categories.aggregate({
      _count: {
        title: true,
      },
    });
    return categoryCount;
  }

  try {
    const categoryCount = await getCategoryCount();
    res.status(200).json(categoryCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
