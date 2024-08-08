const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { blockId } = req.query;

  const collectionId = '66b4a702d51cc6ed5d1b3141';
  const apiKey = 'd7e0a7b70f6a002144d87a9d862da9f17363dfc983ec86c2f656b5508120f9c4';

  const url = `https://api.webflow.com/collections/${66b4a702d51cc6ed5d1b3141}/items?live=true`;

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'accept-version': '1.0.0'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const block = data.items.find(item => item.slug === blockId);

    if (block) {
      res.status(200).json({
        heading: block.heading,
        description: block.description,
        cta: block.cta,
        image: block.image
      });
    } else {
      res.status(404).json({ message: 'Block not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
