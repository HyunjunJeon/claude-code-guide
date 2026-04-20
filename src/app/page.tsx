import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redirecting — Claude Code Guide",
};

export default function RootRedirect() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=ko/" />
        <link rel="canonical" href="ko/" />
      </head>
      <body />
    </html>
  );
}
