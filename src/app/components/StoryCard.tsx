"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { marked } from "marked";
import StoryLoader from "./StoryLoader";
import FloatDock from "./Float-Dock";
import BlogCard from "./BlogCard";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Follow, StoryVote, User } from "@prisma/client";
import StorySearch from "./storySearch";

interface ArrayItem {
  StoryVote: StoryVote[];
  User: User;
  content: string;
  createdAt: string;
  createdBy: string;
  follow: Follow;
  id: string;
}

const StoryCard = () => {
  const { user } = useKindeBrowserClient();

  const [res, setRes] = useState([]);
  const [load, setLoad] = useState(false);

  const resData = async () => {
    setLoad(true);
    try {
      const result = await axios.get("/api/story");
      const newData = result.data.data.map((item: any) => ({
        ...item,
        content: marked(item.content),
      }));
      setRes(newData);
    } catch (error) {
      console.error("Error fetching story data:", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    resData();
  }, []);

  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-8">
      {load ? (
        <StoryLoader />
      ) : (
        <div className="flex flex-col-reverse  bg-black lg:flex-row gap-4">
          {/* Blog List Section */}
          <div className="flex-1 space-y-6 ">
            {res &&
              res.map((item: ArrayItem) => (
                <div key={item.id} className="rounded-lg bg-black shadow-md p-4 md:w-max">
                  <BlogCard
                    id={item.id}
                    user={item.User}
                    publish={item.createdAt}
                    voteCount={item.StoryVote.reduce(
                      (acc: number, vote: { activeVote: boolean }) =>
                        vote.activeVote ? acc + 1 : acc,
                      0
                    )}
                    Follower={
                      Array.isArray(item.follow)
                        ? item.follow.reduce(
                            (acc: number, vote: { activeFollower: boolean }) =>
                              vote.activeFollower ? acc + 1 : acc,
                            0
                          )
                        : 0
                    }
                    Followed={
                      Array.isArray(item.follow)
                        ? item.follow.some(
                            (vote: { activeFollower: boolean; userId: string }) =>
                              vote.activeFollower && vote.userId === user?.id
                          )
                        : false
                    }
                  />
                  <div
                    className="prose dark:prose-invert mt-4 focus:outline-none"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                  <div className="flex justify-center items-center mt-6">
                    <FloatDock articleId={item.id} authorId={item.User.id} />
                  </div>
                  <hr className="border-gray-300 dark:border-gray-600 my-6" />
                </div>
              ))}
          </div>

          {/* Sidebar Section */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-4">
              <StorySearch data={res} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryCard;
