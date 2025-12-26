import axios from "axios";
import { useEffect, useState } from "react";

interface MsgData {
  id: number;
  text: string;
}

function App() {
  const [data, setData] = useState<MsgData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MsgData[]>("/api/msg");
        setData(response.data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
   
  return (
    <>
       <h1>this is unit testing...</h1>
       <h1>hello welcome</h1>
      {data.map((msg) => (
        <div key={msg.id}>
          {msg.text}
        </div>
      ))}
    </>
  );
}

export default App;
