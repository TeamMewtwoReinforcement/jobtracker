import React, { useEffect, useState } from "react";
import '../styles.css';

interface StatusCounts {
  Interested: number;
  Applied: number;
  Interviewing: number;
  Offer: number;
  Rejected: number;
}

const TotalByStatus = () => {
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    Interested: 0,
    Applied: 0,
    Interviewing: 0,
    Offer: 0,
    Rejected: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("tbd");
        // if (!response.ok) {
        //   throw new Error("failed to fetch");
        // }
        let user_id = "cd6fc064-2539-4ab6-b70a-47bbd729cac9";
        const statuses = ["Interested", "Applied", "Interviewing", "Offer", "Rejected"];
        const fetchStatusCount = async (arr: Array<string>) => {
          for (let i = 0; i < arr.length; i++) {
            const response =  await fetch(`/metrics/statusCount?status=${arr[i]}&user_id=${user_id}`);
            const parsedResponse = await response.json();
            // @ts-ignore
            console.log(parsedResponse);
            if (response.ok) {
              const responseNum = JSON.stringify(parsedResponse); 
              console.log(`Response String: ${responseNum}`);
              setStatusCounts({
                ...statusCounts, 
                [arr[i]] : responseNum,
              })
            }
          }
        };
        fetchStatusCount(statuses);
        console.dir(`Status Counts: ${statusCounts}`); 
      } catch (error) {
        console.error("error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='dataCard flex flex-col justify-center items-center bg-gray-50 rounded-lg shadow-md p-5'>
      <h2 className="text-center text-lg font-semibold mb-4">
        Total Applications by Status
        </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-600">
        {Object.entries(statusCounts).map(([status, count]) => (
          <li key={status}>
            <strong>{status}:</strong> {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalByStatus;
