import * as React from "react"
import { motion, AnimatePresence } from "framer-motion";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, isDark }) => {
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto py-10 space-y-12">
      <AnimatePresence initial={false}>
        {messages.map((message, index) => (
          <motion.div
            key={message.id || index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <MessageItem message={message} isDark={isDark} />
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={scrollRef} className="h-24" />
    </div>
  );
};

export default MessageList;
