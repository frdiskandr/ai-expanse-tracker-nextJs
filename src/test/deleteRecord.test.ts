
import deleteRecord from '../app/Action/deleterecords';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// Mock dependencies
jest.mock('@/lib/db', () => ({
  db: {
    record: {
      delete: jest.fn(),
    },
  },
}));

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('deleteRecord', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error if the user is not authenticated', async () => {
    (auth as jest.Mock).mockResolvedValue({ userId: null });

    const result = await deleteRecord('some-record-id');

    expect(result).toEqual({ error: 'User not found' });
    expect(db.record.delete).not.toHaveBeenCalled();
  });

  it('should return a database error if deletion fails', async () => {
    const userId = 'user_123';
    const recordId = 'record_to_delete';
    (auth as jest.Mock).mockResolvedValue({ userId });
    (db.record.delete as jest.Mock).mockRejectedValue(new Error('DB error'));

    const result = await deleteRecord(recordId);

    expect(db.record.delete).toHaveBeenCalledWith({
      where: {
        id: recordId,
        userId,
      },
    });
    expect(result).toEqual({ error: 'Databases error' });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it('should delete the record successfully', async () => {
    const userId = 'user_123';
    const recordId = 'record_to_delete';
    (auth as jest.Mock).mockResolvedValue({ userId });
    (db.record.delete as jest.Mock).mockResolvedValue({}); // Simulate successful deletion

    const result = await deleteRecord(recordId);

    expect(db.record.delete).toHaveBeenCalledWith({
      where: {
        id: recordId,
        userId,
      },
    });
    expect(revalidatePath).toHaveBeenCalledWith('/');
    expect(result).toEqual({ message: 'Record deleted' });
  });
});
