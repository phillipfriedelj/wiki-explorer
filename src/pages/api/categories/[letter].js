 
export default async function handler(req, res) {
  const { letter } = req.query 
  res.status(200).json({ message: 'Hello from SLGGG' + letter })
  // try {
  //     const result = await someAsyncOperation()
  //     res.status(200).json({ result })
  // } catch (err) {
  //     res.status(500).json({ error: 'failed to load data' })
  // }
  }