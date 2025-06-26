import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

// Type definitions for User Agent Data API
interface NavigatorUABrandVersion {
  brand: string;
  version: string;
}

interface NavigatorUAData {
  brands: NavigatorUABrandVersion[];
  mobile: boolean;
  platform: string;
  getHighEntropyValues?: (hints: string[]) => Promise<Record<string, unknown>>;
}

interface NavigatorWithUserAgentData extends Navigator {
  userAgentData: NavigatorUAData;
}

export default function Home() {
  const [userAgent, setUserAgent] = useState<string>("");
  const [userAgentData, setUserAgentData] = useState<NavigatorUAData | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    
    // Get userAgent
    if (typeof window !== "undefined") {
      setUserAgent(navigator.userAgent);
      
      // Get userAgentData (if available)
      if ('userAgentData' in navigator) {
        setUserAgentData((navigator as NavigatorWithUserAgentData).userAgentData);
      }
    }
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      <Head>
        <title>User Agent Checker</title>
        <meta name="description" content="Display userAgent and userAgentData information" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1 className={styles.title}>User Agent Checker</h1>
          
          <div className={styles.section}>
            <h2>User Agent</h2>
            <div className={styles.content}>
              <pre className={styles.code}>{userAgent}</pre>
            </div>
          </div>

          <div className={styles.section}>
            <h2>User Agent Data</h2>
            <div className={styles.content}>
              {userAgentData ? (
                <pre className={styles.code}>
                  {JSON.stringify(userAgentData, null, 2)}
                </pre>
              ) : (
                <p className={styles.notSupported}>
                  User Agent Data is not supported in this browser
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
