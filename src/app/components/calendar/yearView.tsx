'use client';

import { FC } from 'react';
import { startOfDecade, endOfDecade, eachYearOfInterval, format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  className?: string;
}

const YearView: FC<Props> = ({ currentDate, setCurrentDate, className }) => {
  const start = startOfDecade(currentDate);
  const end = endOfDecade(currentDate);
  const years = eachYearOfInterval({ start, end });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={format(currentDate, 'yyyy') + '-years'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`grid text-center ${className}`}
      >
        {years.map((year) => (
          <button
            key={year.toISOString()}
            onClick={() => setCurrentDate(year)}
            className={
              'aspect-square rounded-2xl bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-bold flex items-center justify-center text-xl shadow-md'
            }
          >
            {format(year, 'yyyy')}
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default YearView;
