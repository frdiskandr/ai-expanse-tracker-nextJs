
import AddExpanseRecord from '../app/Action/addExpenseRecord';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// Mock the dependencies
jest.mock('@/lib/db', () => ({
  db: {
    record: {
      create: jest.fn(),
    },
  },
}));

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('AddExpanseRecord', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error if required fields are missing', async () => {
    const formData = new FormData();
    const result = await AddExpanseRecord(formData);
    expect(result).toEqual({ error: 'Text, amount, category, or date is missing' });
  });

  it('should return an error for invalid date format', async () => {
    const formData = new FormData();
    formData.append('text', 'Test Item');
    formData.append('amount', '123');
    formData.append('category', 'Test Category');
    formData.append('date', 'invalid-date');

    const result = await AddExpanseRecord(formData);
    expect(result).toEqual({ error: 'Invalid Date format' });
  });

  it('should return an error if the user is not authenticated', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    const formData = new FormData();
    formData.append('text', 'Dinner');
    formData.append('amount', '50');
    formData.append('category', 'Food');
    formData.append('date', '2025-09-10');

    const result = await AddExpanseRecord(formData);
    expect(result).toEqual({ error: 'User Not Found!!' });
  });

  it('should create an expense record successfully', async () => {
    const userId = 'user_2jabc123';
    (auth as jest.Mock).mockResolvedValue({ userId });

    const formData = new FormData();
    formData.append('text', 'Lunch');
    formData.append('amount', '25');
    formData.append('category', 'Food');
    formData.append('date', '2025-09-10');

    const mockCreatedRecord = {
      id: '1',
      text: 'Lunch',
      amount: 25,
      category: 'Food',
      date: new Date('2025-09-10T12:00:00.000Z'),
      userId,
    };

    (db.record.create as jest.Mock).mockResolvedValue(mockCreatedRecord);

    const result = await AddExpanseRecord(formData);

    expect(db.record.create).toHaveBeenCalledWith({
      data: {
        text: 'Lunch',
        amount: 25,
        category: 'Food',
        date: '2025-09-10T12:00:00.000Z',
        userId,
      },
    });

    expect(revalidatePath).toHaveBeenCalledWith('/');

    expect(result.data).toEqual({
        text: mockCreatedRecord.text,
        amount: mockCreatedRecord.amount,
        category: mockCreatedRecord.category,
        date: mockCreatedRecord.date.toString(),
    });
    expect(result.error).toBeUndefined();
  });

  it('should handle database errors', async () => {
    const userId = 'user_2jabc123';
    (auth as jest.Mock).mockResolvedValue({ userId });

    const formData = new FormData();
    formData.append('text', 'Error Case');
    formData.append('amount', '100');
    formData.append('category', 'Error');
    formData.append('date', '2025-09-11');

    (db.record.create as jest.Mock).mockRejectedValue(new Error('DB error'));

    const result = await AddExpanseRecord(formData);

    expect(result).toEqual({ error: 'An unexpected error occured while adding teh expense record' });
  });
});
