import { config } from '@site.config';
import { IDraftResponse } from '@types';
import axios from 'axios';

export const getDraftBlog = async (id: string, draftKey: string): Promise<IDraftResponse> => {
  const res = await axios.get<IDraftResponse>(
    `${config.baseUrl}/api/draft?id=${id}&draftKey=${draftKey}`,
  );
  return res.data;
};
