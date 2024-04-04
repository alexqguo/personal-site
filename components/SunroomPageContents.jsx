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
  outsideHumidity: 'teal',
  outsideTemperature: 'purple',
};

const DISPLAY_MODES = {
  temp: 'Temperature',
  humidity: 'Humidity',
  all: 'All'
}

const CHART_OPTIONS = {
  responsive: true,
  animation: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    x: {
      type: 'time'
    },
    temp: {
      type: 'linear',
      position: 'left',
      ticks: {
        color: COLORS.outsideTemperature
      }
    },
    humidity: {
      type: 'linear',
      position: 'left',
      grid: { drawOnChartArea: false },
      ticks: {
        color: COLORS.outsideHumidity
      }
    }
  }
};

const createChartData = (weatherResponse, sunroomResponse) => {
  const { hourly } = weatherResponse;
  const { time, temperature_2m, relative_humidity_2m, weather_code } = hourly;
  const getWeatherDataWithTimestamp = (data) => time.map((timestamp, idx) => ({
    y: data[idx],
    x: timestamp, // todo convert to num
  }));

  return {
    datasets: [{
      label: 'Outside temperature',
      data: getWeatherDataWithTimestamp(temperature_2m),
      borderColor: COLORS.outsideTemperature,
      pointStyle: (context) => {
        const weatherCodeForDatapoint = weather_code[context.dataIndex];
        const timestampForDatapoint = time[context.dataIndex];
        const timeOfDayKey = isDayTime(timestampForDatapoint) ? 'day' : 'night';
        const weatherCodeImgUrl = weatherIcons[weatherCodeForDatapoint][timeOfDayKey].image;
        const img = new Image(35, 35);
        img.src = weatherCodeImgUrl;
        return img;
      },
      yAxisID: 'temp'
    }, {
      label: 'Outside humidity',
      data: getWeatherDataWithTimestamp(relative_humidity_2m),
      borderColor: COLORS.outsideHumidity,
      yAxisID: 'humidity',
      hidden: true // Hide on initial load
    }, {
      label: 'Sunroom temperature',
      data: sunroomResponse.map((data) => ({ x: data.created_at, y: data.temperature })),
      borderColor: 'purple',
      yAxisID: 'temp'
    }, {
      label: 'Sunroom humidity',
      data: sunroomResponse.map((data) => ({ x: data.created_at, y: data.humidity })),
      borderColor: 'orange',
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

      <div className="py-20 px-20">
        <div className="bg-white">
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
      </div>
    </PageWrapper>
  );
};

export default SunroomPageContents;