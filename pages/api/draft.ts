import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../site.config';
import { IBlog } from '@/types';
import { convertToToc, convertToHtml } from '@scripts';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const draftKey = req.query.draftKey;

  if (!id || !draftKey) {
    res.status(400).json({ error: `missing queryparamaeter` });
  }

  return axios
    .get<IBlog>(
      `https://${config.serviceId}.microcms.io/api/v1/blog/${id}?draftKey=${draftKey}&depth=2`,
      {
        headers: { 'X-MICROCMS-API-KEY': config.apiKey },
      },
    )
    .then(({ data }) => {
      const toc = convertToToc(data.body);
      const body = convertToHtml(data.body);
      res.status(200).json({ blog: data, toc: toc, body: body });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
