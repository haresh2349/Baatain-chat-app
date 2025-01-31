class ApiError extends Error {
  success: boolean;
  message: string = "";
  data: any;
  errors: Array<{ field?: String; message: String }>;

  constructor(
    message: string = "Internal server error!",
    errors: Array<{ field?: String; message: String }> = [],
    stack: string = ""
  ) {
    super(message);

    Object.defineProperties(this, {
      message: {
        value: message,
        enumerable: true,
        writable: true,
      },
    });
    // this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ApiResponse<T = any> {
  message: string;
  data: T;
  constructor(message: string, data: T) {
    this.message = message || "Success";
    this.data = data;
  }
}

class Pagination {
  page: number;
  limit: number;

  constructor(page: number = 1, limit: number = 15) {
    this.page = page;
    this.limit = limit;
  }

  getSkip(): number {
    return (this.page - 1) * this.limit;
  }

  getPaginationMetaData(totalCount: number) {
    const totalPages = Math.ceil(totalCount / this.limit);
    return {
      totalCount,
      totalPages,
      currentPage: this.page,
    };
  }
}

export { ApiError, ApiResponse, Pagination };
