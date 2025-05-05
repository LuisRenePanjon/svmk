'use client'

import {useRouter} from 'next/navigation'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  parseISO
} from 'date-fns'
import {AnimatePresence, motion} from 'framer-motion'
import Image from 'next/image'
import {IEventWithMyLove} from "@/app/components/calendar/utils";

interface Props {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  events: IEventWithMyLove[];
}

export default function DayView({currentDate, events}: Props) {
  const router = useRouter()

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart, {weekStartsOn: 1})
  const calendarEnd = endOfWeek(monthEnd, {weekStartsOn: 1})
  const days = eachDayOfInterval({start: calendarStart, end: calendarEnd})

  return (<>
      <div className="grid grid-cols-7 mb-2 text-center text-rose-400 font-medium text-sm">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={format(currentDate, 'yyyy-MM')}
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -20}}
          transition={{duration: 0.3}}
          className="grid grid-cols-7 gap-1 text-center"
        >
          {days.map((day) => {
            const event = events.find((e) => isSameDay(parseISO(e.date), day));
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <button
                key={day.toISOString()}
                onClick={() => event && router.push(`/${event.slug}`)}
                className={`aspect-square rounded-3xl relative overflow-hidden group transition-all shadow-sm ${!isCurrentMonth ? 'text-gray-300' : event ? 'text-white' : 'text-gray-500'}`}
              >
                {event && (
                  <Image
                    fill
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 object-cover w-full h-full brightness-75 group-hover:brightness-90 transition"
                  />
                )}

                {!event && (
                  <div className="absolute inset-0 bg-sky-50 group-hover:bg-gray-200 transition"/>
                )}

                <div className="relative z-10 flex flex-col items-center justify-center h-full px-1 text-sm">
                  <span className="font-semibold">{format(day, 'd')}</span>
                </div>
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
