
import { SuggestCategory } from '../app/Action/SuggestCategory';
import { categorizeExpense } from '@/lib/ai';

// Mock the AI dependency
jest.mock('@/lib/ai');

describe('SuggestCategory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return "Other" for short descriptions', async () => {
    const result = await SuggestCategory('a');
    expect(result).toEqual({
      category: 'Other',
      error: 'Description too short for AI analysis',
    });
    expect(categorizeExpense).not.toHaveBeenCalled();
  });

  it('should return a suggested category for a valid description', async () => {
    const description = 'Weekly groceries shopping';
    const expectedCategory = 'Groceries';
    (categorizeExpense as jest.Mock).mockResolvedValue(expectedCategory);

    const result = await SuggestCategory(description);

    expect(result).toEqual({ category: expectedCategory });
    expect(categorizeExpense).toHaveBeenCalledWith(description);
  });

  it('should return "Other" and an error message if the AI call fails', async () => {
    const description = 'A valid long description for testing failure';
    (categorizeExpense as jest.Mock).mockRejectedValue(new Error('AI Error'));

    const result = await SuggestCategory(description);

    expect(result).toEqual({
      category: 'Other',
      error: 'Unable to suggest category at this time',
    });
    expect(categorizeExpense).toHaveBeenCalledWith(description);
  });

  it('should handle empty or whitespace-only descriptions', async () => {
    const result1 = await SuggestCategory('');
    const result2 = await SuggestCategory('  ');

    expect(result1).toEqual({
      category: 'Other',
      error: 'Description too short for AI analysis',
    });
    expect(result2).toEqual({
        category: 'Other',
        error: 'Description too short for AI analysis',
      });
    expect(categorizeExpense).not.toHaveBeenCalled();
  });
});
