
import GetBestWorstExpense from '../app/Action/getBestWorstExpense';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

// Mock dependencies
jest.mock('@/lib/db', () => ({
  db: {
    record: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

describe('GetBestWorstExpense', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error if the user is not authenticated', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    const result = await GetBestWorstExpense();

    expect(result).toEqual({ error: 'User not found!' });
    expect(db.record.findMany).not.toHaveBeenCalled();
  });

  it('should return 0 for best and worst expense if no records are found', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue([]);

    const result = await GetBestWorstExpense();

    expect(result).toEqual({ bestExpense: 0, worstExpense: 0 });
    expect(db.record.findMany).toHaveBeenCalled();
  });

  it('should correctly calculate the best and worst expense from records', async () => {
    const mockRecords = [
      { amount: 100 },
      { amount: 25 },
      { amount: 300 },
      { amount: 50 },
    ];
    (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue(mockRecords);

    const result = await GetBestWorstExpense();

    expect(result).toEqual({ bestExpense: 300, worstExpense: 25 });
  });

  it('should handle a single expense record', async () => {
    const mockRecords = [{ amount: 150 }];
    (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue(mockRecords);

    const result = await GetBestWorstExpense();

    expect(result).toEqual({ bestExpense: 150, worstExpense: 150 });
  });

  it('should return a database error if findMany fails', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (db.record.findMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const result = await GetBestWorstExpense();

    expect(result).toEqual({ error: 'Databases error' });
  });
});
