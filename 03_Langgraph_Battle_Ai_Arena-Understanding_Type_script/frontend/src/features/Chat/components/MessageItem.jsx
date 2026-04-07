import * as React from "react"
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, User, Terminal, Award, Zap } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardContent } from "../../../shared/ui/Card";
import { cn } from "../../../shared/lib/utils";

const MessageItem = ({ message, isDark }) => {
  const { user, solution1, solution2, judge, isPending } = message;

  return (
    <div className="flex flex-col gap-8 pb-16 w-full max-w-6xl mx-auto px-4 md:px-6 transition-all duration-700">
      {/* Professional System Inquiry */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-5 px-8 py-7 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-subtle)] shadow-sm"
      >
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/10">
          <User size={20} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-50 font-display mb-1">System Inquiry</p>
          <h2 className="text-xl font-bold text-[var(--text-primary)] leading-tight tracking-tight font-display">{user}</h2>
        </div>
      </motion.div>

      {/* Solutions Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <SolutionCard label="Model A" content={solution1} isLoading={isPending} isDark={isDark} />
        <SolutionCard label="Model B" content={solution2} isLoading={isPending} isDark={isDark} />
      </div>

      {/* Evaluation Section */}
      <AnimatePresence>
        {!isPending && judge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <JudgeVerdict judge={judge} isDark={isDark} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SolutionCard = ({ label, content, isLoading, isDark }) => {
  const isModelA = label === "Model A";
  const accentColor = isModelA ? "var(--model-a-main)" : "var(--model-b-main)";

  return (
    <Card 
      className={cn(
        "flex flex-col border border-[var(--border-subtle)] bg-[var(--bg-primary)] transition-all duration-700 rounded-[2rem] shadow-xl overflow-hidden group",
        isLoading && "animate-pulse"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between py-5 px-8 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--bg-primary)] rounded-lg border border-[var(--border-subtle)] shadow-sm transition-transform group-hover:scale-110">
              <Terminal size={14} style={{ color: accentColor }} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] opacity-70 font-display">{label} Logic Response</span>
          </div>
          {!isLoading && (
            <div className="flex items-center gap-3">
              <Zap size={12} className="text-amber-500 fill-amber-500/20" />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            </div>
          )}
        </div>
        
        <div className="flex-1 p-8 md:p-10">
          {isLoading ? (
            <div className="space-y-4 py-4 px-2">
              <div className="h-4 bg-[var(--bg-secondary)] rounded-full w-3/4 animate-pulse opacity-50" />
              <div className="h-4 bg-[var(--bg-secondary)] rounded-full w-full animate-pulse opacity-50" />
              <div className="h-4 bg-[var(--bg-secondary)] rounded-full w-5/6 animate-pulse opacity-50" />
            </div>
          ) : (
            <div className={cn("prose prose-slate max-w-none transition-all duration-700 font-sans", isDark ? "prose-invert" : "")}>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="my-8 rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-subtle)] bg-[#0f172a]">
                        <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-white/5">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-display">{match[1]} implementation</span>
                          <div className="flex gap-1.5 opacity-50">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </div>
                        </div>
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          className="custom-scrollbar"
                          customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            fontSize: '0.85rem',
                            lineHeight: '1.7',
                            background: 'transparent',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-indigo-50/50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-bold font-sans" {...props}>
                        {children}
                      </code>
                    );
                  },
                  p: ({ children }) => <p className="text-[var(--text-primary)] leading-relaxed mb-6 last:mb-0 text-lg font-medium font-sans">{children}</p>,
                  strong: ({ children }) => (
                    <span 
                      className="px-2 py-0.5 rounded-lg font-black bg-[var(--bg-secondary)] border-b-2" 
                      style={{ 
                        color: accentColor,
                        borderBottomColor: `${accentColor}40`,
                        fontFamily: 'Inter'
                      }}
                    >
                      {children}
                    </span>
                  )
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const JudgeVerdict = ({ judge, isDark }) => {
  const winnerIsA = judge.score1 > judge.score2;
  const accentColor = winnerIsA ? "var(--model-a-main)" : "var(--model-b-main)";

  return (
    <Card className="bg-[var(--bg-primary)] rounded-[1.5rem] border border-[var(--border-subtle)] shadow-xl overflow-hidden p-8 md:p-10 relative transition-all duration-700">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center border border-[var(--border-subtle)] shadow-lg">
              <Gavel size={24} className="text-amber-500" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tighter uppercase text-[var(--text-primary)] font-display">The Judgment</h3>
              <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[var(--text-secondary)] opacity-60 font-display">Neural Performance Scorecard</p>
            </div>
          </div>
          
          <div className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl flex items-center gap-4 transition-all duration-700 shadow-sm border-b-amber-500/50 border-b-2">
            <Award size={20} className="text-amber-500" />
            <span className="text-lg font-black tracking-tighter text-[var(--text-primary)] font-display uppercase">
              {winnerIsA ? "MODEL A" : "MODEL B"} WINS
            </span>
          </div>
        </div>

        <div className="relative p-10 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-subtle)] shadow-inner text-center">
          <p className="text-xl md:text-2xl font-bold text-[var(--text-primary)] leading-tight italic font-sans opacity-95">
            "{judge.verdict}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InsightBox label="Model A Efficiency" content={judge.reasoning1} color="var(--model-a-main)" />
          <InsightBox label="Model B Efficiency" content={judge.reasoning2} color="var(--model-b-main)" />
        </div>
      </div>
    </Card>
  );
};

const InsightBox = ({ label, content, color }) => (
  <div className="p-6 bg-[var(--bg-secondary)]/50 rounded-2xl border border-[var(--border-subtle)] hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-1.5 h-1.5 rounded-full shadow-lg" style={{ backgroundColor: color }} />
      <span className="text-[9px] font-black uppercase tracking-wider text-[var(--text-secondary)] font-display opacity-70">{label}</span>
    </div>
    <p className="text-base font-bold text-[var(--text-primary)] leading-snug font-sans">
      {content}
    </p>
  </div>
);

export default MessageItem;
