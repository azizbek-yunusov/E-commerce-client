var SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
export const recognition = new SpeechRecognition();

export const startReco = () => {
  recognition.start();
};
export const stopReco = () => {
  recognition.stop();
};
