import type { NextPage } from "next";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const About: NextPage = () => {
  const { data, error } = useSWR("/api/hello", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main>
      <h1>{data.name}</h1>
    </main>
  );
};

export default About;
