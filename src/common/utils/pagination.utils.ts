export function paginate(page: number, limit: number) {
  const take = limit;
  const skip = (page - 1) * limit;

  return { skip: Number(skip), take: Number(take) };
}

export function paginationResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}