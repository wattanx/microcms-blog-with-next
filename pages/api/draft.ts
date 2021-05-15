import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../site.config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const draftKey = req.query.draftKey;

  if (!id || !draftKey) {
    res.status(400).json({ error: `missing queryparamaeter` });
  }

  return axios
    .get(`https://${config.serviceId}.microcms.io/api/v1/blog?${id}?draftKey=${draftKey}&depth=2`, {
      headers: { 'X-API-KEY': config.apiKey },
    })
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
