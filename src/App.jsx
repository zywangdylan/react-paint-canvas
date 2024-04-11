import React, { useRef, useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const scaleFactor = 2; // Adjust for high DPI displays
    canvas.width = 800 * scaleFactor;
    canvas.height = 600 * scaleFactor;
    canvas.style.width = '800px';
    canvas.style.height = '600px';

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, [color, lineWidth]);

  const startDrawing = ({nativeEvent}) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({nativeEvent}) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div class="container">
      <div class="input-display">
        <p class="input-header">Color Picker</p>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div class="input-display">
        <p class="input-header">Line Thickness Slider</p>
        <input type="range" min="1" max="10" value={lineWidth} onChange={(e) => setLineWidth(e.target.value)} />
      </div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <button class="clear-button" onClick={clearCanvas}>Clear</button>
    </div>
  );
}

export default App
