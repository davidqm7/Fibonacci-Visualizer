import React, { useState, useEffect } from 'react';

const FibonacciVisualizer = () => {
  // State to hold the generated Fibonacci sequence
  const [sequence, setSequence] = useState([]);

  // State to track the current step of the sequence being visualized
  const [step, setStep] = useState(0);

  // State to control the speed of the animation (in milliseconds)
  const [speed, setSpeed] = useState(500);

  // State to control whether the animation is running or paused
  const [isRunning, setIsRunning] = useState(false);

  // State to handle how many Fibonacci numbers to generate
  const [fibLength, setFibLength] = useState(10);

  // Function to generate the Fibonacci sequence up to 'n' terms
  const generateFibonacci = (n) => {
    const fib = [0, 1]; // Initialize the sequence with the first two terms
    for (let i = 2; i < n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]); // Each subsequent term is the sum of the previous two
    }
    return fib; // Return the full sequence
  };

  // Effect hook to control the animation timing
  useEffect(() => {
    let timer;

    // If the animation is running and we haven't reached the end of the sequence
    if (isRunning && step < sequence.length) {
      // Set a timeout to move to the next step after 'speed' milliseconds
      timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1); // Update the current step
      }, speed);
    }

    // Cleanup function to clear the timer when the component unmounts or updates
    return () => clearTimeout(timer);
  }, [isRunning, step, speed, sequence.length]);

  // Function to start the visualization process
  const startVisualization = () => {
    setSequence(generateFibonacci(fibLength)); // Generate the Fibonacci numbers based on user input
    setIsRunning(true); // Start the animation
    setStep(0); // Reset the current step to 0
  };

  // Function to stop the visualization process
  const stopVisualization = () => {
    setIsRunning(false); // Stop the animation
    setStep(0); // Optionally reset the step to zero
  };

  return (
    <div>
      <h1>Fibonacci Sequence Visualizer</h1>

      {/* Input field to specify how many Fibonacci numbers to generate */}
      <div>
        <label htmlFor="fibLength">Number of Fibonacci numbers to generate: </label>
        <input
          type="number"
          id="fibLength"
          min="2"
          max="100"
          value={fibLength}
          onChange={(e) => setFibLength(parseInt(e.target.value))}
        />
      </div>

      {/* Display the Fibonacci sequence up to the current step */}
      <div className="sequence">
        {sequence.slice(0, step).map((num, idx) => (
          <div key={idx} className="number-box">
            {num} {/* Display each Fibonacci number */}
          </div>
        ))}
      </div>

      {/* Control buttons and speed slider */}
      <div>
        {/* Button to start the visualization */}
        <button onClick={startVisualization} disabled={isRunning}>Start</button>

        {/* Button to stop the visualization */}
        <button onClick={stopVisualization} disabled={!isRunning}>Stop</button>

        {/* Slider to control the speed of the animation */}
        <input
          type="range"
          min="100"
          max="2000"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />

        {/* Label to display the current speed */}
        <label>Speed: {speed} ms</label>
      </div>
    </div>
  );
};

export default FibonacciVisualizer;
