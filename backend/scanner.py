"""
Scanner de Vulnerabilidades - Sistema Completo
Adaptado do pentester TypeScript para Python
"""
import asyncio
import aiohttp
import urllib.parse
from typing import Optional, Dict, Any, List
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class VulnerabilityScanner:
    """Scanner de vulnerabilidades completo"""
    
    def __init__(self, websocket_manager=None):
        self.websocket_manager = websocket_manager
        self.session: Optional[aiohttp.ClientSession] = None
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=10),
            connector=aiohttp.TCPConnector(ssl=False)
        )
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def make_request(self, url: str, method: str = "GET", headers: Dict = None, data: Any = None) -> Dict:
        """Faz requisição HTTP e retorna resposta"""
        try:
            async with self.session.request(
                method=method,
                url=url,
                headers=headers or {},
                data=data,
                allow_redirects=False
            ) as response:
                body = await response.text()
                return {
                    "status_code": response.status,
                    "headers": dict(response.headers),
                    "body": body[:5000]  # Limitar tamanho
                }
        except Exception as e:
            logger.error(f"Request error: {e}")
            return {"status_code": 0, "headers": {}, "body": ""}
    
    async def test_sql_injection(self, target: str, scan_id: str) -> Optional[Dict]:
        """Teste avançado de SQL Injection"""
        payloads = [
            "'", "' OR '1'='1", "' OR 1=1--", "admin'--",
            "' UNION SELECT NULL,NULL,NULL--",
            "' AND 1=1--", "' AND 1=2--",
            "'; WAITFOR DELAY '00:00:05'--",
            "' OR SLEEP(5)--"
        ]
        
        for payload in payloads:
            test_url = f"{target}?id={urllib.parse.quote(payload)}"
            response = await self.make_request(test_url)
            body_lower = response["body"].lower()
            
            if any(kw in body_lower for kw in ['sql', 'mysql', 'syntax error', 'database', 'mariadb', 'postgresql']):
                return {
                    "scan_id": scan_id,
                    "severity": "critical",
                    "title": "SQL Injection Vulnerability",
                    "description": "Application vulnerable to SQL injection attacks",
                    "category": "Injection",
                    "endpoint": test_url,
                    "payload": payload,
                    "evidence": f"SQL error detected. Status: {response['status_code']}. Body: {response['body'][:300]}",
                    "recommendation": "Use parameterized queries/prepared statements. Never concatenate user input into SQL.",
                    "cve": "CWE-89"
                }
        return None
    
    async def test_xss(self, target: str, scan_id: str) -> Optional[Dict]:
        """Teste avançado de XSS"""
        payloads = [
            "<script>alert('XSS')</script>",
            "<img src=x onerror=alert('XSS')>",
            "<svg onload=alert('XSS')>",
            "<<SCRIPT>alert('XSS');//<</SCRIPT>",
            "javascript:alert(document.domain)"
        ]
        
        for payload in payloads:
            test_url = f"{target}?q={urllib.parse.quote(payload)}"
            response = await self.make_request(test_url)
            
            if payload in response["body"] or urllib.parse.unquote(payload) in response["body"]:
                return {
                    "scan_id": scan_id,
                    "severity": "high",
                    "title": "XSS Vulnerability (Reflected)",
                    "description": "Application reflects user input without sanitization",
                    "category": "XSS",
                    "endpoint": test_url,
                    "payload": payload,
                    "evidence": f"Payload reflected. Status: {response['status_code']}",
                    "recommendation": "Implement CSP headers, HTML encoding, input validation",
                    "cve": "CWE-79"
                }
        return None
    
    async def test_security_headers(self, target: str, scan_id: str) -> Optional[Dict]:
        """Verifica headers de segurança"""
        response = await self.make_request(target)
        headers = {k.lower(): v for k, v in response["headers"].items()}
        
        missing = []
        if 'x-frame-options' not in headers: missing.append('X-Frame-Options')
        if 'x-content-type-options' not in headers: missing.append('X-Content-Type-Options')
        if 'content-security-policy' not in headers: missing.append('Content-Security-Policy')
        if 'strict-transport-security' not in headers: missing.append('Strict-Transport-Security')
        
        if missing:
            return {
                "scan_id": scan_id,
                "severity": "medium" if len(missing) >= 3 else "low",
                "title": "Missing Security Headers",
                "description": f"Application missing {len(missing)} important security headers",
                "category": "Headers",
                "endpoint": target,
                "payload": f"GET {target}",
                "evidence": f"Missing: {', '.join(missing)}",
                "recommendation": f"Add headers: {', '.join(missing)}",
                "cve": "CWE-1021"
            }
        return None
    
    async def test_ssl(self, target: str, scan_id: str) -> Optional[Dict]:
        """Verifica configuração SSL/TLS"""
        if not target.startswith('https://'):
            return {
                "scan_id": scan_id,
                "severity": "high",
                "title": "HTTPS/SSL Not Detected",
                "description": "Application not using HTTPS, exposing data to interception",
                "category": "SSL/TLS",
                "endpoint": target,
                "payload": f"Protocol check: {target}",
                "evidence": f"URL uses insecure HTTP: {target}",
                "recommendation": "Implement HTTPS with valid SSL certificate",
                "cve": "CWE-319"
            }
        return None
    
    async def test_cors(self, target: str, scan_id: str) -> Optional[Dict]:
        """Verifica configuração CORS"""
        response = await self.make_request(
            target,
            headers={'Origin': 'https://evil.com'}
        )
        
        headers = {k.lower(): v for k, v in response["headers"].items()}
        cors_header = headers.get('access-control-allow-origin')
        cred_header = headers.get('access-control-allow-credentials')
        
        if cors_header in ['*', 'https://evil.com'] or (cors_header and cred_header == 'true'):
            return {
                "scan_id": scan_id,
                "severity": "high",
                "title": "CORS Misconfiguration",
                "description": "CORS allows any origin or reflects malicious origin with credentials",
                "category": "Configuration",
                "endpoint": target,
                "payload": "Origin: https://evil.com",
                "evidence": f"CORS: {cors_header}, Credentials: {cred_header}",
                "recommendation": "Configure specific origin whitelist. Don't use wildcard (*) with credentials",
                "cve": "CWE-942"
            }
        return None
    
    async def scan_target(self, scan_id: str, target: str, scan_type: str, 
                         status_callback=None) -> List[Dict]:
        """Executa scan completo no alvo"""
        vulnerabilities = []
        
        # Lista de testes baseado no tipo de scan
        tests = [
            ("SQL Injection", self.test_sql_injection),
            ("XSS Detection", self.test_xss),
            ("Security Headers", self.test_security_headers),
            ("SSL/TLS", self.test_ssl),
            ("CORS", self.test_cors),
        ]
        
        async with self:
            total_tests = len(tests)
            for idx, (test_name, test_func) in enumerate(tests):
                try:
                    if status_callback:
                        await status_callback({
                            "progress": int((idx / total_tests) * 100),
                            "currentTask": f"Testing: {test_name}"
                        })
                    
                    result = await test_func(target, scan_id)
                    if result:
                        vulnerabilities.append(result)
                    
                    await asyncio.sleep(0.5)  # Rate limiting
                    
                except Exception as e:
                    logger.error(f"Test {test_name} failed: {e}")
                    continue
            
            if status_callback:
                await status_callback({
                    "progress": 100,
                    "currentTask": "Scan completed",
                    "status": "completed"
                })
        
        return vulnerabilities
