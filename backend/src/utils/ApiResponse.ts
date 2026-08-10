export class ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  statusCode: number;

  constructor(success: boolean, statusCode: number, data?: T, message?: string, error?: string) {
    this.success = success;
    this.statusCode = statusCode;
    if (data) this.data = data;
    if (message) this.message = message;
    if (error) this.error = error;
  }

  static success<T>(data: T, message?: string, statusCode = 200): ApiResponse<T> {
    return new ApiResponse<T>(true, statusCode, data, message);
  }

  static error<T = null>(error: string, statusCode = 400): ApiResponse<T> {
    return new ApiResponse<T>(false, statusCode, undefined, undefined, error);
  }
}
