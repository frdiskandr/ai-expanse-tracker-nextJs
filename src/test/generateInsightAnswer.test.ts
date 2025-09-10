
import { generateInsightAnswer } from '../app/Action/generateInsightAnswer';
import { CheckUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import { generateAIAnswer } from '@/lib/ai';

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

describe('generateInsightAnswer', () => {
  const question = 'What is my biggest expense?';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error message if user is not authenticated', async () => {
    (CheckUser as jest.Mock).mockResolvedValue(null);

    const result = await generateInsightAnswer(question);

    expect(result).toBe("I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.");
    expect(db.record.findMany).not.toHaveBeenCalled();
    expect(generateAIAnswer).not.toHaveBeenCalled();
  });

  it('should call the AI with no expenses if the user has no records', async () => {
    (CheckUser as jest.Mock).mockResolvedValue({ clerkUserId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue([]);
    (generateAIAnswer as jest.Mock).mockResolvedValue('You have no expenses.');

    const result = await generateInsightAnswer(question);

    expect(db.record.findMany).toHaveBeenCalled();
    expect(generateAIAnswer).toHaveBeenCalledWith(question, []);
    expect(result).toBe('You have no expenses.');
  });

  it('should call the AI with formatted expenses and return its answer', async () => {
    const mockExpenses = [
      { id: '1', amount: 100, category: 'Shopping', text: 'New shoes', createdAt: new Date() },
      { id: '2', amount: 50, category: 'Food', text: 'Groceries', createdAt: new Date() },
    ];
    const formattedExpenses = mockExpenses.map(e => ({
        id: e.id,
        amount: e.amount,
        category: e.category,
        description: e.text,
        date: e.createdAt.toISOString(),
    }));
    const aiResponse = 'Your biggest expense was on Shopping.';

    (CheckUser as jest.Mock).mockResolvedValue({ clerkUserId: 'user_123' });
    (db.record.findMany as jest.Mock).mockResolvedValue(mockExpenses);
    (generateAIAnswer as jest.Mock).mockResolvedValue(aiResponse);

    const result = await generateInsightAnswer(question);

    expect(db.record.findMany).toHaveBeenCalled();
    expect(generateAIAnswer).toHaveBeenCalledWith(question, formattedExpenses);
    expect(result).toBe(aiResponse);
  });

  it('should return an error message if the database call fails', async () => {
    (CheckUser as jest.Mock).mockResolvedValue({ clerkUserId: 'user_123' });
    (db.record.findMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const result = await generateInsightAnswer(question);

    expect(result).toBe("I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.");
    expect(generateAIAnswer).not.toHaveBeenCalled();
  });
});
