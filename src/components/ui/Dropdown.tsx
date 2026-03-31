import { useState, useContext } from 'react';
import iconDropdown from '../../assets/icons/icon-dropdown.svg';
import iconUnits from '../../assets/icons/icon-units.svg';
import iconCheckmark from '../../assets/icons/icon-checkmark.svg';
import { UnitsContext } from '../../context/units-context';
import type {
  TemperatureUnit,
  WindUnit,
  PrecipitationUnit,
} from '../../context/units-context';

type UnitOption = {
  label: string;
  value: string;
};

type UnitCategory = {
  category: string;
  options: UnitOption[];
};

const unitCategories: UnitCategory[] = [
  {
    category: 'Temperature',
    options: [
      { label: 'Celsius (°C)', value: 'celsius' },
      { label: 'Fahrenheit (°F)', value: 'fahrenheit' },
    ],
  },
  {
    category: 'Wind Speed',
    options: [
      { label: 'km/h', value: 'kmh' },
      { label: 'mph', value: 'mph' },
    ],
  },
  {
    category: 'Precipitation',
    options: [
      { label: 'Millimeters (mm)', value: 'mm' },
      { label: 'Inches (in)', value: 'inches' },
    ],
  },
];

type DailyOption = {
  label: string;
  value: string;
};

const dailyCategories: DailyOption[] = [
  {
    label: 'Monday',
    value: 'monday',
  },
  {
    label: 'Tuesday',
    value: 'tuesday',
  },
  {
    label: 'Wednesday',
    value: 'wednesday',
  },
  {
    label: 'Thursday',
    value: 'thursday',
  },
  {
    label: 'Friday',
    value: 'friday',
  },
  {
    label: 'Saturday',
    value: 'saturday',
  },
  {
    label: 'Sunday',
    value: 'sunday',
  },
];

export function UnitsDropdown() {
  const [open, setOpen] = useState(false);

  const units = useContext(UnitsContext);

  if (!units) return null;

  const {
    temperature,
    wind,
    setTemperature,
    setWind,
    precipitation,
    setPrecipitation,
  } = units;

  const handleSelect = (category: string, value: string) => {
    if (category === 'Temperature') {
      setTemperature(value as TemperatureUnit);
    }

    if (category === 'Wind Speed') {
      setWind(value as WindUnit);
    }

    if (category === 'Precipitation') {
      setPrecipitation(value as PrecipitationUnit);
    }
  };

  return (
    <div className='flex items-start justify-center'>
      <div className='relative'>
        <button
          onClick={() => setOpen((v) => !v)}
          className='flex items-center gap-3 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm font-medium hover:bg-neutral-700 transition-colors cursor-pointer'
        >
          <img src={iconUnits} alt='' />
          Units
          <img src={iconDropdown} alt='' />
        </button>

        {open && (
          <div className='absolute right-0 mt-2 w-56 rounded-xl bg-neutral-800 border border-neutral-700 shadow-2xl overflow-hidden z-50 animate-fade-in'>
            <div className='p-2'>
              <p className='text-left px-3 py-2 text-sm text-white'>
                Switch to Imperial
              </p>
            </div>

            <div className='border-t border-neutral-700' />

            <div className='py-2 px-2 flex flex-col gap-1'>
              {unitCategories.map((cat) => {
                return (
                  <div key={cat.category}>
                    <p className='px-3 pt-2 pb-1 text-xs text-neutral-300 font-semibold tracking-wider'>
                      {cat.category}
                    </p>

                    {cat.options.map((opt) => {
                      let isSelected = false;

                      if (cat.category === 'Temperature') {
                        isSelected = temperature === opt.value;
                      }

                      if (cat.category === 'Wind Speed') {
                        isSelected = wind === opt.value;
                      }

                      if (cat.category === 'Precipitation') {
                        isSelected = precipitation === opt.value;
                      }

                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelect(cat.category, opt.value)}
                          className='w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm text-white hover:bg-neutral-700 transition-colors cursor-pointer'
                        >
                          <span>{opt.label}</span>

                          {isSelected && (
                            <img
                              src={iconCheckmark}
                              alt=''
                              className='w-4 h-4'
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.15s ease-out;
        }
      `}</style>
    </div>
  );
}

type DailyDropdownProps = {
  selectedDay: string;
  onChangeDay: (day: string) => void;
};

export function DailyDropdown({
  selectedDay,
  onChangeDay,
}: DailyDropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className='flex items-start justify-center'>
      <div className='relative'>
        <button
          onClick={() => setOpen((v) => !v)}
          className='flex items-center gap-3 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white text-sm font-medium hover:bg-neutral-700 transition-colors cursor-pointer'
        >
          <p>{selectedDay}</p>
          <img src={iconDropdown} alt='' />
        </button>

        {open && (
          <div className='absolute right-0 mt-2 w-56 rounded-xl bg-neutral-800 border border-neutral-700 shadow-2xl overflow-hidden z-50 animate-fade-in'>
            <div className='p-2 flex flex-col gap-1'>
              {dailyCategories.map((day) => {
                return (
                  <button
                    key={day.value}
                    onClick={() => {
                      onChangeDay(day.value);
                      setOpen(false);
                    }}
                    className='px-3 py-2 text-sm text-white tracking-wider hover:bg-neutral-700 transition-colors cursor-pointer rounded-lg w-full text-left'
                  >
                    {day.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.15s ease-out;
        }
      `}</style>
    </div>
  );
}
