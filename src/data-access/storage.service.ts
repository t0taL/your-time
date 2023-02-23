export class StorageService {
  constructor(private readonly storage: Storage) {
  }
  public getByKey<T>(key: string): T | null {
    const item: string | null = this.storage.getItem(key);

    if (item === null) {
      return null;
    }

    return JSON.parse(item);
  }

  public setByKey<T>(key: string, data: T): void {
    this.storage.setItem(key, JSON.stringify(data));
  }
}