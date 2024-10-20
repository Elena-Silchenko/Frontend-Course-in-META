import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const currentTime = new Date();
    const nextYear = currentTime.getFullYear() + 1;
    const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
    const difference = newYear - currentTime;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  function declensionOfDays(number) {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return "дней";
    } else if (lastDigit === 1) {
      return "день";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return "дня";
    } else {
      return "дней";
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <h1>Дима, пора решать, что мы будем делать на Новый Год  😁😜</h1>
      <h2>До Нового Года осталось:</h2>
      <div className="timer">
        {timeLeft.days !== undefined ? (
          <>
            <span>{timeLeft.days} {declensionOfDays(timeLeft.days)}, </span>
            <span>{timeLeft.hours} часов : </span>
            <span>{timeLeft.minutes} минут : </span>
            <span>{timeLeft.seconds} секунд</span>
          </>
        ) : (
          <span>С Новым Годом!</span>
        )}
      </div>
      <a href="https://www.booking.com" className="button">
        Принять решение
      </a>
    </div>
  );
}

export default App;