import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Star, ThumbsUp, ShoppingBag } from 'lucide-react';

// Default data for demonstration purposes
const defaultData = {
    overall_sentiment: 0.85,
    total_reviews: 1243,
    review_reliability: 0.92,
    top_keywords: ['excellent', 'reliable', 'fast shipping', 'great quality'],
    price_history: Array.from({ length: 12 }, (_, i) => ({
        month: `2024-${String(i + 1).padStart(2, '0')}`,
        price: 100 + Math.sin(i) * 10
    })),
    price_analysis: {
        trend: 0.02,
        volatility: 0.05
    }
};

// Variants for page transitions
const pageVariants = {
    initial: {
        opacity: 0,
        scale: 0.8,
        y: 100
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.4, 0.0, 0.2, 1]
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: -100,
        transition: {
            duration: 0.5
        }
    }
};

// Variants for text animations; note that the function uses the custom prop (i)
const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: i => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.5
        }
    })
};

const WrappedReview = ({ data = defaultData }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    // Automatically advance pages every 3 seconds if autoPlay is enabled
    useEffect(() => {
        if (!autoPlay) return;

        const timer = setTimeout(() => {
            if (currentPage < 3) {
                setCurrentPage(prev => prev + 1);
            } else {
                setAutoPlay(false);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentPage, autoPlay]);

    // Define each page for the wrap
    const pages = [
        // Intro Page
        {
            component: (
                <motion.div
                    className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8"
                    variants={pageVariants}
                >
                    <motion.div
                        className="text-5xl font-bold mb-8"
                        variants={textVariants}
                        custom={0}
                    >
                        Your 2024 Review Wrapped
                    </motion.div>
                    <motion.div
                        className="text-2xl text-center"
                        variants={textVariants}
                        custom={1}
                    >
                        Let's see how this product performed...
                    </motion.div>
                </motion.div>
            )
        },

        // Sentiment Analysis Page
        {
            component: (
                <motion.div
                    className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 to-purple-600 text-white p-8"
                    variants={pageVariants}
                >
                    <motion.div
                        className="text-4xl font-bold mb-12"
                        variants={textVariants}
                        custom={0}
                    >
                        People Really Love This!
                    </motion.div>

                    <motion.div
                        className="flex items-center justify-center gap-4 mb-8"
                        variants={textVariants}
                        custom={1}
                    >
                        <ThumbsUp size={40} />
                        <span className="text-6xl font-bold">
                            {(data.overall_sentiment * 100).toFixed(0)}%
                        </span>
                    </motion.div>

                    <motion.div
                        className="text-2xl text-center"
                        variants={textVariants}
                        custom={2}
                    >
                        Positive Sentiment Score
                    </motion.div>

                    <motion.div
                        className="mt-8 flex flex-wrap justify-center gap-4"
                        variants={textVariants}
                        custom={3}
                    >
                        {data.top_keywords.map((keyword, i) => (
                            <span
                                key={keyword}
                                className="px-4 py-2 bg-white/20 rounded-full text-lg"
                            >
                                {keyword}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            )
        },

        // Price Analysis Page
        {
            component: (
                <motion.div
                    className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-8"
                    variants={pageVariants}
                >
                    <motion.div
                        className="text-4xl font-bold mb-8"
                        variants={textVariants}
                        custom={0}
                    >
                        Price Journey
                    </motion.div>

                    <motion.div
                        className="w-full max-w-2xl h-64 mb-8"
                        variants={textVariants}
                        custom={1}
                    >
                        <LineChart data={data.price_history} className="w-full">
                            <XAxis
                                dataKey="month"
                                stroke="#fff"
                                tickFormatter={(value) => value.split('-')[1]}
                            />
                            <YAxis stroke="#fff" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a1a',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#fff"
                                strokeWidth={3}
                                dot={{ fill: '#fff' }}
                            />
                        </LineChart>
                    </motion.div>

                    <motion.div
                        className="text-2xl text-center"
                        variants={textVariants}
                        custom={2}
                    >
                        {data.price_analysis.trend > 0 ? 'Prices are trending up' : 'Prices are trending down'}
                    </motion.div>
                </motion.div>
            )
        },

        // Summary Page
        {
            component: (
                <motion.div
                    className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-blue-600 text-white p-8"
                    variants={pageVariants}
                >
                    <motion.div
                        className="text-4xl font-bold mb-12"
                        variants={textVariants}
                        custom={0}
                    >
                        Your Shopping Insights
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 gap-8 mb-12"
                        variants={textVariants}
                        custom={1}
                    >
                        <div className="text-center">
                            <Star size={40} className="mx-auto mb-4" />
                            <div className="text-3xl font-bold mb-2">{data.total_reviews}</div>
                            <div className="text-xl">Total Reviews</div>
                        </div>
                        <div className="text-center">
                            <ShoppingBag size={40} className="mx-auto mb-4" />
                            <div className="text-3xl font-bold mb-2">
                                {(data.review_reliability * 100).toFixed(0)}%
                            </div>
                            <div className="text-xl">Reliability Score</div>
                        </div>
                    </motion.div>

                    <motion.button
                        className="px-8 py-3 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-white/90 transition-colors"
                        variants={textVariants}
                        custom={2}
                        onClick={() => setCurrentPage(0)}
                    >
                        Replay Your Wrapped
                    </motion.button>
                </motion.div>
            )
        }
    ];

    return (
        <div className="h-screen w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    className="h-full w-full"
                    onClick={() => {
                        setAutoPlay(false);
                        setCurrentPage((prev) => (prev + 1) % pages.length);
                    }}
                >
                    {pages[currentPage].component}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default WrappedReview;
