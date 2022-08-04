import React, { useEffect } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DogType } from "../@types/dogType";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const DOGS_API_KEY = "28347967-ef74-4077-90e0-29aebed2bf97";

type StatusType = {
  status: "error" | "loading" | "success";
};

function PaginationExample() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);

  const { status, data, error, isFetching, isPreviousData } = useQuery<
    StatusType,
    Error,
    DogType[]
  >(["dogs", page], () => fetchDogs(page), {
    keepPreviousData: true,
    staleTime: 5000,
  });

  async function fetchDogs(page = 0) {
    const { data, headers } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?limit=9&page=${page}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "x-api-key": DOGS_API_KEY,
        },
      }
    );

    const total = headers["pagination-count"];
    if (9 * page <= Number(total)) {
      setHasMore(true);
    } else setHasMore(false);
    return data;
  }

  // useEffect(() => {
  //   if (hasMore) {
  //     queryClient.prefetchQuery(["dogs", page + 1], () => fetchDogs(page + 1));
  //   }
  // }, [data, page, queryClient]);

  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((breed) => (
            <img
              key={breed.id}
              src={breed.image.url}
              alt={breed.name}
              height={100}
            />
          ))}
        </div>
      )}
      <div>Current Page: {page}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          setPage((old) => (hasMore ? old + 1 : old));
        }}
        disabled={isPreviousData || !hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{" "}
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default PaginationExample;
