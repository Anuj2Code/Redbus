"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { iAppProps } from "../Post-Home/page"
import { ProgressSpinner } from "primereact/progressspinner";
import axios from "axios";
import { PostCard } from "./PostCard";
import { useRouter } from "next/navigation";

export function Loadmore() {
  const [post, setPost] = useState<iAppProps[]>([]);
  const [page, setPage] = useState(1);
  const [pre, setPre] = useState(0);
  const { ref, inView } = useInView();
  const [length, setlength] = useState<number>(1)

  const loadmore = async () => {
    const nextPage = (page + 1)
    const res = (await axios.post(`http://localhost:3000/api/get_post?page=${nextPage}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })) ?? []

      setPost((preData: iAppProps[]) => [...(preData?.length ? preData : []), ...res.data.data]);
      setPage(nextPage);
      setlength(res.data.data.length)
  }

  useEffect(() => {
    if (inView && length > 0 && pre!=page ) {
      loadmore();
      setPre(page)
    }

  }, [inView]);


  return (
    <>
      {post && post.map((post: iAppProps,key:number) => {
        return (
          <PostCard
            key={key}
            id={post.id}
            imageString={post.imageString}
            comments={post.comments}
            jsonContent={post.textContent}
            subName={post.subName as string}
            title={post.title}
            commentAmount={post.comments.length}
            userName={post.User?.userName as string}
            voteCount={post.Vote.reduce((acc: number, vote: { voteType: string; }) => {
              if (vote.voteType === "UP") return acc + 1;
              if (vote.voteType === "DOWN") return acc - 1;

              return acc;
            }, 0)}
          />
        )
      })
      }
      <div className=" w-full flex items-center justify-center  flex-col gap-y-5 pl-8 pt-4 " ref={ref}>
        {length > 0 ? <ProgressSpinner /> : ""}
      </div>
    </>
  )
}