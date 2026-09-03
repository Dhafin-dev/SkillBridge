import apiClient from './apiClient';

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export const uploadService = {
  uploadPhoto: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};
