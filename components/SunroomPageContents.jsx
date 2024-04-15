import PageHead from 'components/PageHead';
import PageWrapper from 'components/PageWrapper';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { createClient } from '@supabase/supabase-js'
import weatherIcons from './weatherIcons.json';
import 'chart.js/auto'
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import ButtonGroup from './ButtonGroup';
import { useRef } from 'react';

const supabase = createClient(
  'https://aglflphmczffkcsoarls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbGZscGhtY3pmZmtjc29hcmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5OTkzNTksImV4cCI6MjAyNzU3NTM1OX0.TyU_R-MkKn9qXn56eRaT3Y8YqVzoCgYNHH9BAy9ZRSw'
);

const fetchSunroomData = async () => {
  const lastWeekDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  lastWeekDate.setHours(0, 0, 0, 0);

  const { data, error } = await supabase.from('sunroom')
    .select('created_at, temperature, humidity')
    .gt('created_at', lastWeekDate.toISOString())
    .order('created_at', { ascending: true })
  if (error) throw error;
  return data;
};

const fetchWeatherData = async () => {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

const isDayTime = (dateStr) => {
  const date = new Date(dateStr);
  const hour = date.getHours();
  return hour >= 5 && hour < 18;
}

const COLORS = {
  humidity: 'teal',
  temp: 'darkorchid',
};

const DISPLAY_MODES = {
  temp: 'Temperature',
  humidity: 'Humidity',
}

const CHART_OPTIONS = {
  responsive: true,
  animation: false,
  plugins: {
    legend: null,
    tooltip: {
      callbacks: {
        label: (ctx) => {
          if (ctx.dataset.label === 'Outside temperature') {
            return `${ctx.dataset.label}: ${ctx.formattedValue} (${ctx.raw.weatherInfo.description})`
          }
        }
      }
    }
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day'
      }
    },
    temp: {
      type: 'linear',
      position: 'left',
      ticks: {
        color: COLORS.temp
      },
      display: 'auto'
    },
    humidity: {
      type: 'linear',
      position: 'left',
      grid: { drawOnChartArea: false },
      ticks: {
        color: COLORS.humidity
      },
      display: 'auto'
    }
  }
};

// May improve performance
const imageMemo = (() => {
  const cache = new Map();
  return (url) => {
    if (cache.has(url)) return cache.get(url);
    const img = new Image(20, 20);
    img.src = url;
    cache.set(url, img);
    return img;
  }
})();

const createChartData = (weatherResponse, sunroomResponse) => {
  const { hourly } = weatherResponse;
  const { time, temperature_2m, relative_humidity_2m, weather_code } = hourly;
  const getWeatherDataWithTimestamp = (data) => time.map((timestamp, idx) => ({
    y: data[idx],
    x: timestamp, // todo convert to num
    weatherInfo: weatherIcons[weather_code[idx]][isDayTime(timestamp) ? 'day' : 'night']
  }));

  return {
    datasets: [{
      label: 'Outside temperature',
      data: getWeatherDataWithTimestamp(temperature_2m),
      borderColor: '#ccc',
      pointStyle: (context) => {
        return imageMemo(context.raw.weatherInfo.image);
      },
      yAxisID: 'temp'
    }, {
      label: 'Outside humidity',
      data: getWeatherDataWithTimestamp(relative_humidity_2m),
      borderColor: '#ccc',
      pointStyle: false,
      yAxisID: 'humidity',
      hidden: true // Hide on initial load
    }, {
      label: 'Sunroom temperature',
      data: sunroomResponse.map((data) => ({ x: data.created_at, y: data.temperature })),
      borderColor: COLORS.temp,
      yAxisID: 'temp'
    }, {
      label: 'Sunroom humidity',
      data: sunroomResponse.map((data) => ({ x: data.created_at, y: data.humidity })),
      borderColor: COLORS.humidity,
      yAxisID: 'humidity',
      hidden: true // Hide on initial load
    }]
  };
}

const url = 'https://api.open-meteo.com/v1/forecast?latitude=40.7721&longitude=-73.9301&hourly=temperature_2m,relative_humidity_2m,weather_code&timezone=America%2FNew_York&past_days=7&forecast_days=1';

const SunroomPageContents = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODES.temp); // "Temperature" | "Humidity" | "All"

  useEffect(() => {
    const performDataFetching = async () => {
      const [sunroomData, weatherData] = await Promise.all([
        fetchSunroomData(),
        fetchWeatherData()
      ]);
      setData(createChartData(weatherData, sunroomData))

      // Force update the chart to get the custom image points to render
      setTimeout(() => {
        chartRef.current.update();
      }, 500)
    }

    performDataFetching();
  }, [])

  const changeDisplayMode = (newDisplayMode) => {
    const temps = chartRef.current.data.datasets.filter((d) => d.yAxisID === 'temp');
    const humidities = chartRef.current.data.datasets.filter((d) => d.yAxisID === 'humidity');

    if (newDisplayMode === DISPLAY_MODES.temp) {
      temps.forEach((t) => t.hidden = false);
      humidities.forEach((t) => t.hidden = true);
    } else if (newDisplayMode === DISPLAY_MODES.humidity) {
      temps.forEach((t) => t.hidden = true);
      humidities.forEach((t) => t.hidden = false);
    } else {
      temps.forEach((t) => t.hidden = false);
      humidities.forEach((t) => t.hidden = false);
    }

    chartRef.current.update();
    setDisplayMode(newDisplayMode);
  }

  return (
    <PageWrapper>
      <PageHead title="Sunroom Temp Dashboard" description="Sunroom Temp Dashboard" />

      <div className="px-5 py-5 bg-white">
        {data && (
          <>
            <Line
              ref={chartRef}
              data={data}
              options={CHART_OPTIONS}
            />
            <ButtonGroup
              initialValue={displayMode}
              onChange={changeDisplayMode}
              options={Object.values(DISPLAY_MODES)}
            />
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default SunroomPageContents;