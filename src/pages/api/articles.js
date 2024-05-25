import prisma from "../../lib/prisma";

export default async function handler(req, res) {
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
