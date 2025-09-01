'use client'
import AddExpanseRecord from '@/app/_Action/addExpenseRecord';
import React, { useRef, useState } from 'react';

type AlertMessage = 'success' | 'error' | null;
function AddNewRecord() {
    const formRef = useRef<HTMLFormElement>(null);
    const [amount, setAmount] = useState(0);
    const [alertMessage, setAlertMessage] = useState<string | null>(null)
    const [alertType, setAlertType] = useState<AlertMessage>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [isCategorizingAI, setCategorizingAI] = useState(false);

    const clientAction = async (formdata: FormData) => {

    }

    const handleSugestCategory = async () => {
        setCategorizingAI(!isCategorizingAI);
        console.log(isCategorizingAI)

        setTimeout(() => {
            setCategorizingAI(false)
            console.log(isCategorizingAI)
        }, 2000)
    }

    return (
        <div className='bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-700/50 hover:shadow-2xl text-black'>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:h-10 sm:w-10 bg-gradient-to-br from-blue-800 via-yellow-200 to-blue-600 rounded-xl border border-gray-100/50 flex items-center justify-center shadow-lg hover:shadow-2xl">
                    <span className='text-white text-sm sm:text-lg'>💳</span>
                </div>
                <div>
                    <h3 className='text-lg sm:text-xl font-bold text-gray-100 leading-tight'>
                        Add New Expense
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your spending with AI assistence
                    </p>
                </div>
            </div>
            <form ref={formRef} className='space-y-6 sm:space-y-8'
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(formRef.current)
                    clientAction(formData)
                }}
            >
                {/* expanse description and date */}
                <div className='space-y-1.5'>
                    {/* expanse description */}
                    <label htmlFor="text" className="flex items-center gap-2 text-xs font-semibold text-gray-300 tracking-wide">
                        <span className='w-1.5 h-1.5 bg-blue-400 rounded-full'>
                        </span>
                        Expanse Description
                    </label>
                    <div className="relative">
                        <input type="text" name="text" id="text" value={description} onChange={(e) => setDescription(e.target.value)}
                            className='w-full pl-3 pr-12 sm:pr-14 py-2.5 bg-gray-800/70 border-2 border-gray-600/80 rounded-xl focus:bg-gray-700/90 focus:border-blue-800 text-gray-100 text-sm shadow-sm hover:shadow-md transition-all duration-200'
                            placeholder='Coffe, grocaries, gas...'
                        />
                        <button type='button' onClick={handleSugestCategory} disabled={isCategorizingAI || !description.trim()}
                            className='absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 bg-white hover:bg-blue-400 disabled:bg-gray-400/30 text-white rounded-lg text-xs font-medium flex items-center justify-center shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200'
                        >
                            {isCategorizingAI ? (
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-ping"></div>
                            ) : (
                                <div className="text-xs">✨</div>
                            )}
                        </button>
                    </div>
                    {isCategorizingAI && (
                        <div className="flex items-center gap-2 text-blue-400">
                            <div className="w-1.5 h-1.5 bg-blue-800 rounded-full animate-pulse"></div>
                            Ai is analyzing your description...
                        </div>
                    )}
                </div>
                {/* expanse date */}
                <div className="space-y-1.5">
                    <label htmlFor="date" className="flex items-center gap-2 text-xs font-semibold text-gray-300 tracking-wide">
                        <span className='w-1.5 h-1.5 bg-blue-400 rounded-full'></span>
                        Expense Date
                    </label>
                    <input type="date" name="date" id="date"
                        className='w-full px-3 py-2.5 bg-gray-800/70 border-2 border-gray-600/80 rounded-xl focus:ring-blue-500/30 focus:bg-gray-700/90 focus:border-blue-400 text-gray-100 text-sm shadow-sm hover:shadow-md transition-all duration-200'
                        required
                        onFocus={(e) => e.target.showPicker()}
                    />
                </div>

                {/* category selection and amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 sm:p-4 bg-gradient-to-r from-blue-500/50 to-blue-800/10 rounded-xl border border-blue-100/50">
                    <div className="space-y-1.5">
                        <label htmlFor="category" className='flex items-center gap-2 text-xs font-semibold text-gray-300 tracking-wide'>
                            <span className='w-1.5 h-1.5 bg-blue-400 rounded-full'></span>
                            Category

                            <span className='text-xs text-gray-500 ml-2 font normal hidden sm:inline'>
                                Use the ✨ button above for AI suggestions
                            </span>
                        </label>
                        <select name="category" id="category" value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='w-full px-3 py-2.5 bg-gray-800/70 border-2 border-gray-600/80 rounded-xl focus:ring-2 focus:border-blue-400 text-gray-100 text-sm cursor-pointer shadow-sm hover:shadow-md transition-all duration-200'
                        >
                            <option
                                value=''
                                disabled
                                className='text-gray-400 dark:text-gray-500'
                            >
                                Select category...
                            </option>
                            <option value='Food' className='text-gray-900 dark:text-gray-100'>
                                🍔 Food & Dining
                            </option>
                            <option
                                value='Transportation'
                                className='text-gray-900 dark:text-gray-100'
                            >
                                🚗 Transportation
                            </option>
                            <option
                                value='Shopping'
                                className='text-gray-900 dark:text-gray-100'
                            >
                                🛒 Shopping
                            </option>
                            <option
                                value='Entertainment'
                                className='text-gray-900 dark:text-gray-100'
                            >
                                🎬 Entertainment
                            </option>
                            <option
                                value='Bills'
                                className='text-gray-900 dark:text-gray-100'
                            >
                                💡 Bills & Utilities
                            </option>
                            <option
                                value='Healthcare'
                                className='text-gray-900 dark:text-gray-100'
                            >
                                🏥 Healthcare
                            </option>
                            <option
                                value='Other'
                                className='text-gray-900 dark:text-gray-100'
                            >
                                📦 Other
                            </option>
                        </select>
                    </div>
                    {/* amount */}
                    <div className='space-y-1.5'>
                        <label
                            htmlFor='amount'
                            className='flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wide'
                        >
                            <span className='w-1.5 h-1.5 bg-blue-400 rounded-full'></span>
                            Amount
                            <span className='text-xs text-gray-400 dark:text-gray-500 ml-2 font-normal hidden sm:inline'>
                                Enter amount between Rp.0 and Rp.....
                            </span>
                        </label>
                        <div className='relative'>
                            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium text-sm'>
                                Rp.
                            </span>
                            <input
                                type='number'
                                name='amount'
                                id='amount'
                                min='0'
                                max='1000000000'
                                step='0.01'
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value) || null)}
                                className='w-full pl-9 pr-3 py-2.5 bg-white/70 dark:bg-gray-800/70 border-2 border-gray-200/80 dark:border-gray-600/80 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:bg-white dark:focus:bg-gray-700/90 focus:border-emerald-400 dark:focus:border-emerald-400 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200'
                                placeholder='0.00'
                                required
                            />
                        </div>
                    </div>
                </div>
                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full relative overflow-hidden bg-gradient-to-r from-blue-600  to-blue-400 hover:from-blue-700 hover:via-white-600 hover:to-blue-600 text-white px-4 py-3 sm:px-5 sm:py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl group transition-all duration-300 border-2 border-transparent hover:border-white/20 text-sm sm:text-base'
                    disabled={isLoading}
                >
                    <div className='relative flex items-center justify-center gap-2'>
                        {isLoading ? (
                            <>
                                <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <span className='text-lg'>💫</span>
                                <span>Add Expense</span>
                            </>
                        )}
                    </div>
                </button>
            </form>

            {/* Alert Message */}
            {alertMessage && (
                <div
                    className={`mt-4 p-3 rounded-xl border-l-4 backdrop-blur-sm ${alertType === 'success'
                            ? 'bg-blue-50/80 dark:bg-blue-900/20 border-l-blue-500 text-blue-800 dark:text-blue-200'
                            : 'bg-red-50/80 dark:bg-red-900/20 border-l-red-500 text-red-800 dark:text-red-200'
                        }`}
                >
                    <div className='flex items-center gap-2'>
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${alertType === 'success'
                                    ? 'bg-blue-100 dark:bg-blue-800'
                                    : 'bg-red-100 dark:bg-red-800'
                                }`}
                        >
                            <span className='text-sm'>
                                {alertType === 'success' ? '✅' : '⚠️'}
                            </span>
                        </div>
                        <p className='font-medium text-sm'>{alertMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddNewRecord;