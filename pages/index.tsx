import { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import axios from "axios";

export default function Home() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleNext = (data: any) => {
    setUserData({ ...userData, ...data });
    setStep(2);
  };
  const handleSubmitData = async (data: any) => {
    setLoading(true);
    setUserData({ ...userData, ...data });

    try {
      const response = await axios.post("https://assessment.org", userData);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[600px] min-h-[600px] border-2 rounded-lg border-black text-center m-10 mt-10">
      <h1 className="text-3xl font-bold m-2 mt-4">Divercity Interest Form</h1>
      <p className="text-sm mb-5">We look forward to hearing from you</p>
      {step === 1 ? (
        <Step1 handleNext={handleNext} />
      ) : (
        <Step2 handleSubmitData={handleSubmitData} />
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white font-bold text-lg">Submitting...</div>
        </div>
      )}
    </div>
  );
}
