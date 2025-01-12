"use client";

import { DailyTransport } from "@daily-co/realtime-ai-daily";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useEffect, useRef, useState } from "react";
import { LLMHelper, RTVIClient } from "realtime-ai";
import { RTVIClientAudio, RTVIClientProvider } from "realtime-ai-react";

import App from "@/components/App";
import { AppProvider } from "@/components/context";
import Header from "@/components/Header";
import {
  BOT_READY_TIMEOUT,
  defaultConfig,
  defaultServices,
} from "@/rtvi.config";

export default function Home() {

  // const [showSplash, setShowSplash] = useState(true);
  const voiceClientRef = useRef<RTVIClient | null>(null);
  if (typeof window === 'undefined') return null;


  // useEffect(() => {
  //   if (!showSplash || voiceClientRef.current) {
  //     return;
  //   }

  const voiceClient = new RTVIClient({
    transport: new DailyTransport(),
    params: {
      baseUrl: "http://localhost:7860", //process.env.NEXT_PUBLIC_BASE_URL || "/api",
      requestData: {
        services: defaultServices,
        config: defaultConfig,
      },
    },
    timeout: BOT_READY_TIMEOUT,
  });

  const llmHelper = new LLMHelper({});
  voiceClient.registerHelper("llm", llmHelper);

  voiceClientRef.current = voiceClient;
  // }, [showSplash]);

  // if (showSplash) {
  //   return <Splash handleReady={() => setShowSplash(false)} />;
  // }

  return (
    <RTVIClientProvider client={voiceClientRef.current!}>
      <AppProvider>
        <TooltipProvider>
          <main>
            <Header />
            <div id="app">
              <App />
            </div>
          </main>
          <aside id="tray" />
        </TooltipProvider>
      </AppProvider>
      <RTVIClientAudio />
    </RTVIClientProvider>
  );
}
