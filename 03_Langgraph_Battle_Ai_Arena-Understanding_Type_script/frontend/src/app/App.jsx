import * as React from "react"
import ChatArena from "../features/Chat/pages/ChatArena";
import "./App.css";
import { cn } from "../shared/lib/utils";

function App() {
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen transition-colors duration-500">
      <ChatArena isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
    </div>
  );
}

export default App;
