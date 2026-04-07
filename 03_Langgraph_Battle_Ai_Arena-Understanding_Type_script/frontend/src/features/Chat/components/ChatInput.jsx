import * as React from "react"
import { motion } from "framer-motion";
import { SendHorizonal, Mic, Paperclip } from "lucide-react";
import { Button } from "../../../shared/ui/Button";

const ChatInput = ({ onSend, isLoading }) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (value.trim() && !isLoading) {
      onSend(value);
      setValue("");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 md:p-10 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)] to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto relative pointer-events-auto">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center gap-3 p-2 bg-[var(--bg-secondary)] rounded-[2rem] border border-[var(--border-subtle)] shadow-xl focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-300"
        >
          <div className="flex items-center pl-4 gap-2">
            <button type="button" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <Paperclip size={20} />
            </button>
          </div>
          
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isLoading}
            placeholder="Challenge the models with a new problem..."
            className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-lg font-medium text-[var(--text-primary)] placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
          />

          <div className="flex items-center pr-2 gap-2">
            <button type="button" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors hidden sm:block">
              <Mic size={20} />
            </button>
            <Button 
              type="submit"
              size="icon"
              disabled={isLoading || !value.trim()}
              className="rounded-full w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:scale-100"
            >
              <SendHorizonal size={22} />
            </Button>
          </div>
        </form>
        <p className="mt-3 text-center text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500">
          AI Battle Arena v2.0 • Premium Battle Suite
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
