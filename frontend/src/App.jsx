import { useState } from "react";
import CampaignForm from "./components/CampaignForm";
import CampaignOutput from "./components/CampaignOutput";
import { Toaster } from "react-hot-toast";

function App() {

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D7F7FD] via-[#B7EDF7] to-[#9FE4F2] py-10">
          <Toaster
              position="top-right"
              reverseOrder={false}
          />

          <CampaignForm
              setCampaign={setCampaign}
              loading={loading}
              setLoading={setLoading}
          />

          <CampaignOutput campaign={campaign}/>

      </div>
  );
}

export default App;