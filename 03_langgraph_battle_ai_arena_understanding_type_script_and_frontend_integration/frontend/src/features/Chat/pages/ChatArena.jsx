import * as React from "react"
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../hooks/useChat";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import { Sparkles, Trophy, Sun, Moon } from "lucide-react";
import { Button } from "../../../shared/ui/Button";
import { h1 } from "framer-motion/client";

const ChatArena = ({ isDark, toggleTheme }) => {
  const { messages, isLoading, error, sendMessage } = useChat();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-indigo-100 selection:dark:bg-indigo-900/30 transition-all duration-500">
      {/* Premium Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 bg-[var(--bg-primary)]/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Sparkles size={16} />
            </div>
            <span className="text-xl font-black tracking-tight text-[var(--text-primary)]">AI ARENA</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
              <Trophy size={14} className="text-amber-500" />
              <span>Ranked Battle Suite</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-10 h-10 border border-slate-200/50 dark:border-slate-800/50"
            >
              {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full pb-40">
        {error && (
          <div className="max-w-2xl mx-auto mt-10 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 font-bold animate-in">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {messages.length === 0 ? (
          <EmptyState onStart={(prompt) => sendMessage({ prompt })} isLoading={isLoading} />
        ) : (
          <MessageList messages={messages} isDark={isDark} />
        )}
      </main>

      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
};

const EmptyState = ({ onStart, isLoading }) => {
  const suggestions = [
    "Write a TypeScript utility for type-safe forms",
    "Explain quantum entanglement with bread metaphors",
    "Design a minimalist landing page hero section",
    "Compare Python and Go for high-concurrency APIs"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 text-[10px] font-black uppercase tracking-tighter text-indigo-600 dark:text-indigo-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Next Generation AI Battleground
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[var(--text-primary)] leading-[1.1]">
          Challenge the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Titans.</span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--text-secondary)] font-medium max-w-lg mx-auto leading-relaxed">
          The arena is ready. Pit the world's most powerful models against each other and witness the definitive verdict.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onStart(s)}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-secondary)] text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ChatArena;
