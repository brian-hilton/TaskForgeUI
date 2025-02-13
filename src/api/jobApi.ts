import apiClient from './apiClient';

export interface Job {
    id: number;
    name: string;
    status: string;
    location: string;
    userId: number | null;
    createdDate: string;
    updatedDate: string;
    dueDate: string | null;
}

export const getJob = async (jobId: number): Promise<Job> => {
    const response = await apiClient.get(`jobs?jobId=${jobId}`);
    return response.data;
};

export const getUserJobs = async (userId: number): Promise<Job[]> => {
    const response = await apiClient.get(`user/jobs?userId=${userId}`);
    return response.data
}

