export default function DebugEnvPage() {
  return (
    <pre className="p-4 text-sm text-white bg-black">
      API_URL: {process.env.NEXT_PUBLIC_HYGRAPH_API_URL || 'undefined'}
      {'\n'}
      TOKEN: {process.env.HYGRAPH_API_TOKEN ? '✅ Loaded' : '❌ Missing'}
    </pre>
  );
}
