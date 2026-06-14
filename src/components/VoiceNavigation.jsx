import React, { useState } from 'react';

const VoiceNavigation = () => {
  const [isListening, setIsListening] = useState(false);

  const speakMessage = (message) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
  };

  const processCommand = (command) => {
    if (command.includes('home page')) {
      window.location.href = '/';
      speakMessage('Navigating to home page');
    } else if (command.includes('about page')) {
      window.location.href = '/about';
      speakMessage('Navigating to about page');
    } else if (command.includes('contact page')) {
      window.location.href = '/contact';
      speakMessage('Navigating to contact page');
    } else if (command.includes('skills page')) {
      window.location.href = '/skills';
      speakMessage('Navigating to skills page');
    } else if (command.includes('experienc page')) {
      window.location.href = '/experience';
      speakMessage('Navigating to experience page');
    } else if (command.includes('projects page')) {
      window.location.href = '/projects';
      speakMessage('Navigating to projects page');
    } else {
      speakMessage('Sorry, this page does not exist.');
    }
  };
  

  const handleMicClick = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      processCommand(transcript);
    };

    recognition.start();
  };

  return (
    <div>
      <button
        onClick={handleMicClick}
        className="mic-button"
        aria-label="Start voice recognition"
        type="button"
      >
        speak
        {isListening ? 'Listening...' : 'Start'}
      </button>
    </div>
  );
};

export default VoiceNavigation;
