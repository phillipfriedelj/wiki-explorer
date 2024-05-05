import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  async function getArticleCount() {
    const articleCount = await prisma.articles.aggregate({
      _count: {
        title: true,
      },
    });
    return articleCount;
  }

  try {
    const articleCount = await getArticleCount();
    res.status(200).json(articleCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
