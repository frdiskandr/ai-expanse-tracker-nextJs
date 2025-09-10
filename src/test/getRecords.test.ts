
import GetRecords from '../app/Action/getRecords';
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

describe('GetRecords', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error if the user is not authenticated', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    const result = await GetRecords();

    expect(result).toEqual({ error: 'User not found!' });
    expect(db.record.findMany).not.toHaveBeenCalled();
  });

  it('should return an empty array if no records are found', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue([]);

    const result = await GetRecords();

    expect(result).toEqual({ records: [] });
    expect(db.record.findMany).toHaveBeenCalledWith({
      where: { userId: 'user_123' },
      orderBy: { date: 'desc' },
      take: 10,
    });
  });

  it('should return the records if found', async () => {
    const mockRecords = [
      { id: '1', text: 'Lunch', amount: 20, date: new Date() },
      { id: '2', text: 'Dinner', amount: 40, date: new Date() },
    ];
    (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue(mockRecords);

    const result = await GetRecords();

    expect(result).toEqual({ records: mockRecords });
  });

  it('should return a database error if findMany fails', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (db.record.findMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const result = await GetRecords();

    expect(result).toEqual({ error: 'Databases error' });
  });
});
