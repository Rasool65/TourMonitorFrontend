import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAxios } from './useAxios';
import { useToast } from './useToast';

const useHttpRequest = () => {
  const { get, post, remove, put } = useAxios();
  const toast = useToast();

  const getRequest = <T extends object>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await get<T>(url, {
          validateStatus: (status: number): boolean => {
            if (status == 500) return false;
            return true;
          },
          ...config,
        });
        if (res.status >= 200 && res.status <= 204) resolve(res);
        else {
          toast.showError(res.data.message);
          reject(res);
        }
      } catch (error: any) {
        toast.showError(error.message);
        reject(error);
      }
    });
  };

  const postRequest = <T extends object>(url: string, body: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await post<T>(url, body, {
          validateStatus: (status: number): boolean => {
            if (status == 500) return false;
            return true;
          },
          ...config,
        });
        if (res.status >= 200 && res.status <= 204) resolve(res);
        else {
          toast.showError(res.data.message);
          reject(res);
        }
      } catch (error: any) {
        toast.showError(error.message);
        reject(error);
      }
    });
  };

  const deleteRequest = <T extends object>(url: string, body?: any): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await remove<T>(url, {
          validateStatus: (status: number): boolean => {
            if (status == 500) return false;
            return true;
          },
          data: body,
        });
        if (res.status >= 200 && res.status <= 204) resolve(res);
        else {
          toast.showError(res.data.message);
          reject(res);
        }
      } catch (error: any) {
        toast.showError(error.message);
        reject(error);
      }
    });
  };

  const updateRequest = <T extends object>(url: string, body?: any): Promise<AxiosResponse<T>> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse = await put<T>(url, body, {
          validateStatus: (status: number): boolean => {
            if (status == 500) return false;
            return true;
          },
        });
        if (res.status >= 200 && res.status <= 204) resolve(res);
        else {
          toast.showError(res.data.message);
          reject(res);
        }
      } catch (error: any) {
        toast.showError(error.message);
        reject(error);
      }
    });
  };

  return {
    getRequest,
    postRequest,
    deleteRequest,
    updateRequest,
  };
};

export default useHttpRequest;
