import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// import * as Sentry from "@sentry/react";
// Sentry.init({
//   dsn: "https://d00780d432ac4ccf882f60dd02062e14@o205439.ingest.sentry.io/1323670",
//   integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.replayIntegration({
//       maskAllText: false,
//       blockAllMedia: false,
//     }),
//   ],
//   tracesSampleRate: 1.0,
//   tracePropagationTargets: ["localhost", /^https:\/\/yoursite\.com/],
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
// });

createRoot(document.getElementById("root")!).render(<App />);
