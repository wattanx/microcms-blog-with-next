import { config } from '@site.config';
import { IBlog, MicroCmsResponse } from '@types';
import axios from 'axios';

export const getBlogsByQuery = async (query: string): Promise<MicroCmsResponse<IBlog>> => {
  const res = await axios.get<MicroCmsResponse<IBlog>>(
    `${config.baseUrl}/api/search?q=${encodeURIComponent(query)}`,
  );
  return res.data;
};
