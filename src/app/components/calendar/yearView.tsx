'use client';

import React, { FC } from 'react';
import {eachYearOfInterval, format, isSameYear, parseISO} from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import {IEventWithMyLove} from "@/app/components/calendar/utils";
import Image from "next/image";

interface Props {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  events: IEventWithMyLove[];
  className?: string;
}

const YearView: FC<Props> = ({ currentDate, setCurrentDate, className, events }) => {
  const start = currentDate;
  const end = new Date(currentDate.getFullYear() + 9, 0, 1);
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
        {years.map((year) => {
          const eventsInSameYear = events.filter((e) => isSameYear(parseISO(e.date), year));
          return <button
            key={year.toISOString()}
            onClick={() => setCurrentDate(year)}
            className={
              'aspect-square rounded-2xl bg-blend-color-burn bg-emerald-200 text-yellow-700 font-bold flex items-center justify-center text-xl shadow-md relative'
            }
          >
            {eventsInSameYear.length === 0 &&
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-1 text-sm text-white">
                    <span className="font-semibold">{format(year, 'yyyy')}</span>
                </div>
            }
            {eventsInSameYear.length === 1 && (<>
              <Image
                fill
                src={eventsInSameYear[0].image}
                alt={eventsInSameYear[0].title}
                className="absolute inset-0 object-cover w-full h-full brightness-75 group-hover:brightness-90 transition"
              />
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-1 text-sm text-white">
                <span className="font-semibold">{format(year, 'yyyy')}</span>
              </div>
            </>
            )}

            {eventsInSameYear.length > 1 && (
              <div className="grid grid-cols-2 gap-4 ">
                {eventsInSameYear.map((event, imgIndex) => (
                  <div key={imgIndex}>
                    <Image
                      className="h-auto max-w-full rounded-lg"
                      src={event.image}
                      alt=""
                      width={190}
                      height={100}
                    />
                    {/*  add text in center*/}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-semibold text-[36px]">{format(year, 'yyyy')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </button>
        }
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default YearView;
