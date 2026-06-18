export default function Home() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <h1 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>aasdso.top</h1>
        <p style={{ fontSize: 18, color: '#6b7280', maxWidth: 480, margin: '0 auto' }}>
          文档与在线工具集合，简洁实用
        </p>
      </div>

      {/* 文档 */}
      <div style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>📄 文档</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <a href="/docs/api" style={cardStyle}>
            <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8, color: '#111827' }}>API 文档</h3>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>接口说明与使用指南</p>
          </a>
          <a href="/docs/guide" style={cardStyle}>
            <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8, color: '#111827' }}>使用指南</h3>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>快速上手教程</p>
          </a>
        </div>
      </div>

      {/* 工具 */}
      <div style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>🔧 工具</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <a href="/tools/json" style={cardStyle}>
            <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8, color: '#111827' }}>JSON 格式化</h3>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>美化、校验、压缩 JSON</p>
          </a>
          <a href="/tools/base64" style={cardStyle}>
            <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8, color: '#111827' }}>Base64 编解码</h3>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>文本 Base64 编码与解码</p>
          </a>
          <a href="/tools/hash" style={cardStyle}>
            <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8, color: '#111827' }}>Hash 生成器</h3>
            <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>MD5 / SHA 哈希值计算</p>
          </a>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  display: 'block',
  padding: '24px',
  borderRadius: 12,
  border: '1px solid #e5e7eb',
  backgroundColor: '#fff',
  textDecoration: 'none',
  transition: 'border-color 0.15s',
} as React.CSSProperties;
