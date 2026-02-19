// Dados dos Google Dorks - Versão completa do OSINT-dork-tool
export const dorksData = [
  {
    type: "sec",
    category: "Attack Surface Mapping",
    icon: "🗺️",
    color: "#00ff41",
    items: [
      { label: "Exposed login endpoints", dork: "inurl:login OR inurl:signin OR inurl:auth" },
      { label: "Admin areas", dork: "inurl:admin OR inurl:dashboard" },
      { label: "Public staging environments", dork: "inurl:staging OR inurl:preprod OR inurl:uat" },
      { label: "Status pages", dork: "intitle:\"status page\" OR inurl:status" },
      { label: "Subdomain references", dork: "intext:\"api.\" OR intext:\"dev.\"" },
      { label: "Sitemap intelligence", dork: "inurl:sitemap.xml OR inurl:sitemap_index.xml" }
    ]
  },
  {
    type: "sec",
    category: "Exposed Documents",
    icon: "📄",
    color: "#ff0066",
    items: [
      { label: "PDF documents", dork: "filetype:pdf" },
      { label: "Spreadsheets", dork: "filetype:xls OR filetype:xlsx OR filetype:csv" },
      { label: "Word documents", dork: "filetype:doc OR filetype:docx" },
      { label: "Presentations", dork: "filetype:ppt OR filetype:pptx" },
      { label: "Text notes", dork: "filetype:txt OR filetype:md" },
      { label: "Open directories", dork: "intitle:\"index of\"" }
    ]
  },
  {
    type: "sec",
    category: "Cloud Storage Exposure",
    icon: "☁️",
    color: "#0099ff",
    items: [
      { label: "Amazon S3 references", dork: "inurl:s3.amazonaws.com" },
      { label: "Azure Blob references", dork: "inurl:blob.core.windows.net" },
      { label: "Google Cloud storage refs", dork: "inurl:storage.googleapis.com" },
      { label: "Cloudfront buckets", dork: "inurl:cloudfront.net intext:bucket" },
      { label: "Public object listings", dork: "intitle:\"index of\" intext:\"bucket\"" }
    ]
  },
  {
    type: "sec",
    category: "Source Code Exposure",
    icon: "💻",
    color: "#ffcc00",
    items: [
      { label: "Git metadata", dork: "inurl:.git/config" },
      { label: "Gitignore files", dork: "filename:.gitignore" },
      { label: "Composer files", dork: "filename:composer.json" },
      { label: "Package lock files", dork: "filename:package-lock.json OR filename:yarn.lock" },
      { label: "Docker compose files", dork: "filename:docker-compose.yml" }
    ]
  },
  {
    type: "sec",
    category: "Secrets & Tokens",
    icon: "🔑",
    color: "#ff6b35",
    items: [
      { label: "API key references", dork: "intext:\"api_key\" OR intext:\"client_secret\"" },
      { label: "Bearer tokens", dork: "intext:\"Bearer eyJ\"" },
      { label: "Access token leaks", dork: "intext:\"access_token\"" },
      { label: "Private key blocks", dork: "intext:\"BEGIN PRIVATE KEY\"" },
      { label: "AWS key patterns", dork: "intext:\"AKIA\" OR intext:\"aws_secret_access_key\"" }
    ]
  },
  {
    type: "sec",
    category: "Server Config Leaks",
    icon: "🖥️",
    color: "#00d4ff",
    items: [
      { label: "Environment files", dork: "filename:.env" },
      { label: "INI and conf files", dork: "filetype:ini OR filetype:conf OR filetype:cnf" },
      { label: "Nginx config snippets", dork: "filetype:conf intext:server_name" },
      { label: "Apache virtual host files", dork: "filetype:conf intext:VirtualHost" }
    ]
  },
  {
    type: "media",
    category: "General Web File Finder",
    icon: "📁",
    color: "#00ff41",
    items: [
      { label: "Open file indexes", dork: "intitle:\"index of\"" },
      { label: "PDF files", dork: "filetype:pdf" },
      { label: "Documents (DOC)", dork: "filetype:doc OR filetype:docx" },
      { label: "Spreadsheets", dork: "filetype:xls OR filetype:xlsx" }
    ]
  },
  {
    type: "media",
    category: "Movies & TV Series",
    icon: "🎬",
    color: "#e91e63",
    items: [
      { label: "HD Movies & Series (720p/1080p)", dork: "intitle:\"index of\" (mkv|mp4) (1080p|720p) -html -htm" },
      { label: "Recent releases (2024-2026)", dork: "intitle:\"index of\" mp4 (2024|2025|2026) -html" },
      { label: "4K Ultra HD content", dork: "intitle:\"index of\" (mkv|mp4) (2160p|4K|UHD) -html" }
    ]
  },
  {
    type: "media",
    category: "Academic Research",
    icon: "🎓",
    color: "#ff0066",
    items: [
      { label: "Scholarly PDFs", dork: "filetype:pdf (abstract OR references)" },
      { label: "Thesis documents", dork: "filetype:pdf (thesis OR dissertation)" },
      { label: "Lecture notes", dork: "filetype:pdf \"lecture notes\"" }
    ]
  }
];
