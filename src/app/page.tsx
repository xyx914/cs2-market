export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">aasdso.top</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
          文档与在线工具集合，简洁实用
        </p>
      </section>

      {/* 文档 */}
      <section id="docs" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">📄 文档</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="/docs/api"
            className="block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <h3 className="font-medium text-lg">API 文档</h3>
            <p className="text-sm text-zinc-500 mt-1">接口说明与使用指南</p>
          </a>
          <a
            href="/docs/guide"
            className="block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <h3 className="font-medium text-lg">使用指南</h3>
            <p className="text-sm text-zinc-500 mt-1">快速上手教程</p>
          </a>
        </div>
      </section>

      {/* 工具 */}
      <section id="tools" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">🔧 工具</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/tools/json"
            className="block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <h3 className="font-medium text-lg">JSON 格式化</h3>
            <p className="text-sm text-zinc-500 mt-1">美化、校验、压缩 JSON</p>
          </a>
          <a
            href="/tools/base64"
            className="block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <h3 className="font-medium text-lg">Base64 编解码</h3>
            <p className="text-sm text-zinc-500 mt-1">文本 Base64 编码与解码</p>
          </a>
          <a
            href="/tools/hash"
            className="block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <h3 className="font-medium text-lg">Hash 生成器</h3>
            <p className="text-sm text-zinc-500 mt-1">MD5 / SHA 哈希值计算</p>
          </a>
        </div>
      </section>
    </div>
  );
}
