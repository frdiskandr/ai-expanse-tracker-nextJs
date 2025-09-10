
import getUserRecords from '../app/Action/getUserRecords';
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

describe('getUserRecords', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error if the user is not authenticated', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    const result = await getUserRecords();

    expect(result).toEqual({ error: 'User not found' });
    expect(db.record.findMany).not.toHaveBeenCalled();
  });

  it('should return 0 for record and daysWithRecords if no records are found', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getUserRecords();

    expect(result).toEqual({ record: 0, daysWithRecords: 0 });
    expect(db.record.findMany).toHaveBeenCalledWith({ where: { userId: 'user_123' } });
  });

  it('should correctly calculate the total record amount and days with records', async () => {
    const mockRecords = [
      { amount: 100 },
      { amount: 50 },
      { amount: 0 }, // This one should not count towards daysWithRecords
      { amount: 75 },
    ];
    (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue(mockRecords);

    const result = await getUserRecords();

    expect(result).toEqual({ record: 225, daysWithRecords: 3 });
  });

  it('should return a database error if findMany fails', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (db.record.findMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const result = await getUserRecords();

    expect(result).toEqual({ error: 'Database error' });
  });
});
