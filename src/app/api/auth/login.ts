import { axiosInterceptor } from '@/app/axios/interceptor';

export const authAPI = {
  login: async () => {
    try {
      const { data } = await axiosInterceptor.get(
        'search/users?q=richard&per_page=3'
      );

      return data;
    } catch (e: any) {
      throw new Error(e);
    }
  },
};
