"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { iAppProps } from "../Post-Home/page"
import { ProgressSpinner } from "primereact/progressspinner";
import axios from "axios";
import { PostCard } from "./PostCard";
import { useRouter } from "next/navigation";

export function Loadmore() {
  const router = useRouter();
  const [post, setPost] = useState<iAppProps[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const [check, setCheck] = useState<string>("")
  const [length, setlength] = useState<number>(1)
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadmore = async () => {
    await delay(2000);
    const nextPage = (page + 1)
    const res = (await axios.post(`http://localhost:3000/api/get_post?page=${nextPage}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })) ?? []
    
      setPost((preData: iAppProps[]) => [...(preData?.length ? preData : []), ...res.data.data]);
      setPage(nextPage)
      setlength(res.data.data.length)
  }

  useEffect(() => {
    if (inView && length>0) {
      loadmore();
    }
    if (check === "green") {
      router.refresh();
      setCheck("red")
    }
  }, [inView, check]);

  // useEffect(() => {
  //   if (check === "green") {
  //     router.refresh();
  //     setCheck("red")
  //   }
  // }, [check])

  return (
    <>
      {post && post.map((post: iAppProps) => {
        return (
          <PostCard
            setCheck={setCheck}
            id={post.id}
            imageString={post.imageString}
            jsonContent={post.textContent}
            subName={post.subName as string}
            title={post.title}
            key={post.id}
            //  commentAmount={post.Comment.length}
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
      <div className="w-[55%] flex flex-col gap-y-5 pl-12 pt-4" ref={ref}>
        {length>0 ?  <ProgressSpinner />:""}
      </div>
    </>
  )
}