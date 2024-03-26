interface ServiceResponse<T> {
    data: T | null;
    error?: string;
    success: boolean;
}

export default ServiceResponse;