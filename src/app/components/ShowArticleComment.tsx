"use client";

import Image from "next/image";
import qs from "query-string";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "@prisma/client";

interface Props {
  id: string;
  fetch: boolean;
  setCheck: Dispatch<SetStateAction<boolean>>;
}

interface commentProps {
  text: string;
  User: User;
}

export default function ShowArticleComment({ id, fetch, setCheck }: Props) {
  const [comment, setComment] = useState<commentProps[]>([]);
  const [load, setLoad] = useState(false);

  const articleDetail = async () => {
    setLoad(true);
    try {
      const url = qs.stringifyUrl({
        url: "/api/articleDetails",
        query: { id },
      });
      const res = await axios.get(url);
      setComment(res.data.data);
    } catch (error) {
      console.log(error, "{fetch comment in client side}");
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    articleDetail();
    setCheck(false)
  }, [fetch]);

  return (
    <>
      {comment.length === 0 && (<div className="h-[250px] flex justify-center items-center text-green-500 font-semibold text-2xl">No comment</div>)}
      {comment &&
        comment.map((item: commentProps, index: number) => {
          return (
            <div key={index} className="flex flex-col m-8">
              <div className="flex items-center gap-x-3">
                <Image
                  src={
                    item?.User?.imageUrl ? item.User.imageUrl :
                      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                  }
                  className="w-7 h-7 rounded-full"
                  alt="Avatar of user"
                  width={100}
                  height={100}
                />
                <h3 className="text-sm font-medium">{item.User.userName}</h3>
              </div>

              <p className="ml-10 text-secondary-foreground text-sm tracking-wide">
                {item.text}
              </p>
              <div className="flex gap-2 items-center">
              </div>
            </div>
          )
        }
        )}
    </>
  );
}
