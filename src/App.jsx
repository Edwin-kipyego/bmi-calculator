import React, { useState } from "react";

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [progressColor, setProgressColor] = useState("bg-gray-300");
  const [showResult, setShowResult] = useState(false);

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters ** 2)).toFixed(2);
      setBmi(bmiValue);
      const { label, color } = getBMICategory(bmiValue);
      setCategory(label);
      setProgressColor(color);

      
      setShowResult(false);
      setTimeout(() => setShowResult(true), 50);
    } else {
      alert("Please enter valid height and weight");
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { label: "Underweight", color: "bg-blue-400" };
    if (bmi >= 18.5 && bmi < 24.9) return { label: "Normal weight", color: "bg-green-500" };
    if (bmi >= 25 && bmi < 29.9) return { label: "Overweight", color: "bg-yellow-500" };
    return { label: "Obese", color: "bg-red-500" };
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
          BMI Calculator
        </h2>

        
        <label className="block mb-2 font-medium">Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight in kg"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

      
        <label className="block mb-2 font-medium">Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height in cm"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        
        <button
          onClick={calculateBMI}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Calculate BMI
        </button>

        
        {bmi && (
          <div
            className={`mt-6 transform transition-all duration-500 ease-out ${
              showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="p-4 bg-green-100 rounded-lg text-center shadow-md">
              <h3 className="text-lg font-bold text-green-700">
                Your BMI: {bmi}
              </h3>
              <p className="text-gray-700">
                Category: <strong>{category}</strong>
              </p>
            </div>

            
            <div className="mt-4">
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-4 ${progressColor} transition-all duration-700 ease-out`}
                  style={{
                    width: `${Math.min((bmi / 40) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
