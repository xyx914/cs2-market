"use client";

import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch {
      setError("无效的 JSON");
      setOutput("");
    }
  };

  const minify = () => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch {
      setError("无效的 JSON");
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">JSON 格式化</h1>

      <div className="space-y-2">
        <textarea
          className="w-full h-40 p-4 font-mono text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 resize-y"
          placeholder="粘贴 JSON..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={format} className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium">
            格式化
          </button>
          <button onClick={minify} className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm">
            压缩
          </button>
          {output && (
            <button onClick={copy} className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm">
              复制
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {output && (
        <div className="space-y-2">
          <p className="text-sm text-zinc-500">结果：</p>
          <pre className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-mono overflow-auto max-h-80 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
