"use client"

import Grid from "@/components/Grid";
import { useEffect, useState } from "react";

export default function Home() {
  const [gridData, setGridData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/grids");
      const data = await response.json();
      setGridData(data);
    }
    fetchData();
  }, []);
  return (
    <div>
      {gridData.map((grid, idx) => <Grid key={idx} gridData={grid} />)}
    </div>
  );
}
