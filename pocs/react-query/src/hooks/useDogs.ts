import { DogType } from "./../@types/dogType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DOGS_API_KEY = "28347967-ef74-4077-90e0-29aebed2bf97";

type StatusType = {
  data: DogType[];
  hasMore: boolean;
  status: number;
};

type DataType = {
  data: DogType[];
  hasMore: boolean;
};

async function fetchDogs(page: number): Promise<StatusType> {
  const { data, headers, status } = await axios.get<DogType[]>(
    `https://api.thedogapi.com/v1/breeds?limit=9&page=${page}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "x-api-key": DOGS_API_KEY,
      },
    }
  );
  let hasMore = true;
  const total = headers["pagination-count"];
  if (9 * page > Number(total)) {
    hasMore = false;
  }

  return { status, data, hasMore };
}

function useDogs(page = 0) {
  const { status, data, error, isFetching, isPreviousData } = useQuery<
    StatusType,
    Error,
    DataType
  >(["dogs", page], () => fetchDogs(page), {
    keepPreviousData: true,
    staleTime: 5000,
  });

  return { status, data, error, isFetching, isPreviousData };
}

export default useDogs;
