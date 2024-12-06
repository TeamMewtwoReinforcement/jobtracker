import React, { useEffect, useState } from "react";
import '../styles.css';

interface StatusCounts {
  Interested: number;
  Applied: number;
  Interviewing: number;
  Offer: number;
}

const TotalByStatus = () => {
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    Interested: 17,
    Applied: 15,
    Interviewing: 13,
    Offer: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("tbd");
        if (!response.ok) {
          throw new Error("failed to fetch");
        }
        const data: StatusCounts = await response.json();
        setStatusCounts(data);
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
