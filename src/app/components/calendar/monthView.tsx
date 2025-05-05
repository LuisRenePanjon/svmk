'use client';

import React, {FC} from 'react';
import {format, startOfYear, endOfYear, eachMonthOfInterval, isSameMonth, parseISO} from 'date-fns';
import {motion, AnimatePresence} from 'framer-motion';
import {IEventWithMyLove} from "@/app/components/calendar/utils";
import Image from "next/image";

interface Props {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  events: IEventWithMyLove[];
  className?: string;
}

const MonthView: FC<Props> = ({currentDate, setCurrentDate, className, events}) => {
  const start = startOfYear(currentDate);
  const end = endOfYear(currentDate);
  const months = eachMonthOfInterval({start, end});

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={format(currentDate, 'yyyy') + '-months'}
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: -20}}
        transition={{duration: 0.3}}
        className={`grid text-center ${className} overflow-y-auto `}
      >
        {months.map((month) => {

            const eventInSameMonth = events.filter((e) => isSameMonth(parseISO(e.date), month));
            return <button
              key={month.toISOString()}
              onClick={() => setCurrentDate(month)}
              className={
                'bg-rose-200 aspect-square rounded-3xl relative overflow-y-auto group transition-all shadow-sm'
              }
            >
              {eventInSameMonth.length === 0 &&
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-1 text-sm text-white">
                <span className="font-semibold">{format(month, 'MMM')}</span>
              </div>
              }
              {eventInSameMonth.length === 1 && (<>
                <Image
                  fill
                  src={eventInSameMonth[0].image}
                  alt={eventInSameMonth[0].title}
                  className="absolute inset-0 object-cover w-full h-full brightness-75 group-hover:brightness-90 transition"
                />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full px-1 text-sm text-white">
                    <span className="font-semibold">{format(month, 'MMM')}</span>
                  </div>
              </>

              )}
              {eventInSameMonth.length > 1 && (
                <div className="grid grid-cols-2 gap-2 ">
                  {eventInSameMonth.map((event, imgIndex) => (
                    <div key={imgIndex}>
                      <Image
                        className="h-auto max-w-full rounded-lg"
                        src={event.image}
                        alt=""
                        width={150}
                        height={100}
                      />
                    {/*  add text in center*/}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-semibold">{format(month, 'MMM')}</span>
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

export default MonthView;
