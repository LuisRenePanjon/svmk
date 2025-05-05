'use client';

import { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
} from 'date-fns';
import FraseSlider from '@/app/components/phrasesSlider';
import {EventsWithMyLove} from "@/app/components/calendar/utils";
import MonthView from "@/app/components/calendar/monthView";
import YearView from "@/app/components/calendar/yearView";
import DayView from "@/app/components/calendar/dayView";



const DotsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>('day');

  const handlePrev = () => {
    if (viewMode === 'day') setCurrentDate(subMonths(currentDate, 1));
    else if (viewMode === 'month') setCurrentDate(new Date(currentDate.getFullYear() - 1, 0));
    else if (viewMode === 'year') setCurrentDate(new Date(currentDate.getFullYear() - 10, 0));
  };

  const handleNext = () => {
    if (viewMode === 'day') setCurrentDate(addMonths(currentDate, 1));
    else if (viewMode === 'month') setCurrentDate(new Date(currentDate.getFullYear() + 1, 0));
    else if (viewMode === 'year') setCurrentDate(new Date(currentDate.getFullYear() + 10, 0));
  };

  const renderTitle = () => {
    if (viewMode === 'day') return format(currentDate, 'MMMM yyyy');
    if (viewMode === 'month') return format(currentDate, 'yyyy');
    if (viewMode === 'year') return `${Math.floor(currentDate.getFullYear() / 10) * 10} – ${Math.floor(currentDate.getFullYear() / 10) * 10 + 9}`;
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-3xl bg-white shadow-xl border border-pink-100">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="text-xl text-pink-500">←</button>
        <h2 onClick={() => setViewMode(viewMode === 'day' ? 'month' : viewMode === 'month' ? 'year' : 'day')} className="text-xl font-bold text-rose-500 cursor-pointer">
          {renderTitle()}
        </h2>
        <button onClick={handleNext} className="text-xl text-pink-500">→</button>
      </div>

      {viewMode === 'day' && (
        <DayView currentDate={currentDate} setCurrentDate={setCurrentDate} events={EventsWithMyLove}/>
      )}

      {viewMode === 'month' && (
        <MonthView
          currentDate={currentDate}
          setCurrentDate={(month) => {
            setCurrentDate(month);
            setViewMode('day');
          }}
          events={EventsWithMyLove}
          className="grid-cols-2 gap-2"  // Pasa las clases aquí
        />
      )}

      {viewMode === 'year' && (
        <YearView
          currentDate={currentDate}
          setCurrentDate={(year) => {
            setCurrentDate(year);
            setViewMode('month');
          }}
          className="grid-cols-1 gap-1"  // Pasa las clases aquí
        />
      )}

      <div className="mt-6">
        <FraseSlider />
      </div>
    </div>
  );
};

export default DotsCalendar;
