
import { getAIInsights } from '../app/Action/getAllInsights';
import { CheckUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import { GenerateExpanseInsights } from '@/lib/ai';

// Mock dependencies
jest.mock('@/lib/checkUser');
jest.mock('@/lib/db', () => ({
  db: {
    record: {
      findMany: jest.fn(),
    },
  },
}));
jest.mock('@/lib/ai');

describe('getAIInsights', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if user is not authenticated', async () => {
    (CheckUser as jest.Mock).mockResolvedValue(null);

    // We expect the function to return a default error insight, not throw
    const insights = await getAIInsights();
    expect(insights).toEqual([
      {
        id: 'error-1',
        type: 'warning',
        title: 'Insights Temporarily Unavailable',
        message: "We're having trouble analyzing your expenses right now. Please try again in a few minutes.",
        action: 'Retry analysis',
        confidence: 0.5,
      },
    ]);
  });

  it('should return welcome insights if user has no expenses', async () => {
    (CheckUser as jest.Mock).mockResolvedValue({ clerkUserId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue([]);

    const insights = await getAIInsights();

    expect(insights).toHaveLength(2);
    expect(insights[0].id).toBe('welcome-1');
    expect(insights[1].id).toBe('welcome-2');
    expect(GenerateExpanseInsights).not.toHaveBeenCalled();
  });

  it('should call AI generation if user has expenses', async () => {
    const mockExpenses = [
      { id: '1', amount: 50, category: 'Food', text: 'Dinner', createdAt: new Date() },
    ];
    const mockInsights = [{ id: 'ai-insight-1', title: 'Your spending is great!', message: '...' }];

    (CheckUser as jest.Mock).mockResolvedValue({ clerkUserId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue(mockExpenses);
    (GenerateExpanseInsights as jest.Mock).mockResolvedValue(mockInsights);

    const insights = await getAIInsights();

    expect(db.record.findMany).toHaveBeenCalled();
    expect(GenerateExpanseInsights).toHaveBeenCalled();
    expect(insights).toEqual(mockInsights);
  });

  it('should return error insights if database call fails', async () => {
    (CheckUser as jest.Mock).mockResolvedValue({ clerkUserId: 'user_123' });
    (db.record.findMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const insights = await getAIInsights();

    expect(insights).toEqual([
      {
        id: 'error-1',
        type: 'warning',
        title: 'Insights Temporarily Unavailable',
        message: "We're having trouble analyzing your expenses right now. Please try again in a few minutes.",
        action: 'Retry analysis',
        confidence: 0.5,
      },
    ]);
  });
});
