export class ItemNotFoundError extends Error {
  constructor(itemId: string) {
    super(`Item with id ${itemId} is not found`);
  }
}
