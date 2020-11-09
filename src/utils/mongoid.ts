export const mongoIdToDate = (id: string): Date => new Date(parseInt(id.toString().substring(0, 8), 16) * 1000);
