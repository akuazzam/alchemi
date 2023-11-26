// pages/chat/[courseId].jsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ChatComponent from "../../src/app/components/courses/page"; 
import Layout from "../../src/app/components/courses/layout";
import CircularProgress from "@mui/material/CircularProgress";

const ChatPage = () => {
  const [courseId, setCourseId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      // Now you can safely use router.query.courseId
      const { courseId: queryCourseId } = router.query;
      setCourseId(queryCourseId);
    }
  }, [router.isReady]);

  // Render the loading spinner if the router isn't ready or courseId isn't set
  if (!router.isReady || !courseId) {
    return <CircularProgress />;
  }

  // Once the router is ready and courseId is set, render the chat within the layout
  return (
    <Layout>
      <ChatComponent courseId={courseId} />
    </Layout>
  );
};

export default ChatPage;
