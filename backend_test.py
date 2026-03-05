#!/usr/bin/env python3
"""
OLHOS DE DEUS - Backend Testing Suite
Complete testing of all backend endpoints including authentication, scans, and tools.
"""

import asyncio
import aiohttp
import json
import io
import base64
from PIL import Image
import time
from typing import Dict, Optional

# Configuration
BACKEND_URL = "https://automated-site.preview.emergentagent.com/api"

class OlhosDeDeusBackendTester:
    """Complete backend tester for Olhos De Deus"""
    
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = None
        self.auth_token = None
        self.user_id = None
        self.test_results = []
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_test(self, test_name: str, success: bool, details: str):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {test_name}: {details}")
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details
        })
    
    async def make_request(self, method: str, endpoint: str, 
                          data: Optional[Dict] = None,
                          files: Optional[Dict] = None,
                          headers: Optional[Dict] = None) -> Dict:
        """Make HTTP request to backend"""
        try:
            url = f"{self.base_url}{endpoint}"
            request_headers = headers or {}
            
            # Add auth token if available
            if self.auth_token:
                request_headers["Authorization"] = f"Bearer {self.auth_token}"
            
            # Handle file uploads
            if files:
                # For file uploads, use FormData
                form_data = aiohttp.FormData()
                if data:
                    for key, value in data.items():
                        form_data.add_field(key, str(value))
                for key, file_data in files.items():
                    form_data.add_field(key, file_data['content'], 
                                      filename=file_data['filename'],
                                      content_type=file_data['content_type'])
                response_data = form_data
            else:
                # For JSON requests
                if data:
                    request_headers["Content-Type"] = "application/json"
                    response_data = json.dumps(data)
                else:
                    response_data = None
            
            async with self.session.request(
                method, url, 
                data=response_data,
                headers=request_headers
            ) as response:
                try:
                    response_json = await response.json()
                except:
                    response_json = {"text": await response.text()}
                
                return {
                    "status": response.status,
                    "data": response_json,
                    "headers": dict(response.headers)
                }
        except Exception as e:
            return {
                "status": 0,
                "data": {"error": str(e)},
                "headers": {}
            }
    
    # ===================== AUTHENTICATION TESTS =====================
    
    async def test_user_registration(self):
        """Test user registration endpoint"""
        test_user = {
            "email": "carlos.santos@teste.com",
            "username": "carlos_santos", 
            "password": "SenhaSegura123!"
        }
        
        response = await self.make_request("POST", "/auth/register", data=test_user)
        
        if response["status"] == 200:
            data = response["data"]
            if "access_token" in data and "user" in data:
                # Store token for subsequent tests
                self.auth_token = data["access_token"]
                self.user_id = data["user"]["id"]
                self.log_test("User Registration", True, 
                            f"✅ User registered successfully. Token: {self.auth_token[:20]}...")
            else:
                self.log_test("User Registration", False, 
                            f"Missing fields in response: {data}")
        else:
            self.log_test("User Registration", False, 
                        f"Status {response['status']}: {response['data']}")
    
    async def test_user_login(self):
        """Test user login with existing credentials"""
        login_data = {
            "email": "carlos.santos@teste.com",
            "password": "SenhaSegura123!"
        }
        
        response = await self.make_request("POST", "/auth/login", data=login_data)
        
        if response["status"] == 200:
            data = response["data"]
            if "access_token" in data and "user" in data:
                # Update token
                self.auth_token = data["access_token"]
                self.user_id = data["user"]["id"]
                self.log_test("User Login", True, 
                            f"✅ Login successful. User ID: {self.user_id}")
            else:
                self.log_test("User Login", False, 
                            f"Missing fields in response: {data}")
        else:
            self.log_test("User Login", False, 
                        f"Status {response['status']}: {response['data']}")
    
    async def test_get_current_user(self):
        """Test get current user info with JWT token"""
        if not self.auth_token:
            self.log_test("Get Current User", False, "No auth token available")
            return
        
        response = await self.make_request("GET", "/auth/me")
        
        if response["status"] == 200:
            data = response["data"]
            if "id" in data and "email" in data:
                self.log_test("Get Current User", True, 
                            f"✅ User info retrieved. Email: {data['email']}")
            else:
                self.log_test("Get Current User", False, 
                            f"Missing user fields: {data}")
        else:
            self.log_test("Get Current User", False, 
                        f"Status {response['status']}: {response['data']}")
    
    async def test_logout(self):
        """Test user logout"""
        if not self.auth_token:
            self.log_test("User Logout", False, "No auth token available")
            return
        
        response = await self.make_request("POST", "/auth/logout")
        
        if response["status"] == 200:
            data = response["data"]
            if "message" in data:
                self.log_test("User Logout", True, 
                            f"✅ Logout successful: {data['message']}")
            else:
                self.log_test("User Logout", False, 
                            f"Unexpected response: {data}")
        else:
            self.log_test("User Logout", False, 
                        f"Status {response['status']}: {response['data']}")
    
    # ===================== SCAN ENDPOINTS TESTS =====================
    
    async def test_create_scan_authenticated(self):
        """Test creating a scan with JWT authentication"""
        if not self.auth_token:
            self.log_test("Create Scan (Authenticated)", False, "No auth token available")
            return
        
        scan_data = {
            "name": "Teste de Segurança - Site de E-commerce",
            "target": "https://httpbin.org",
            "scanType": "web"
        }
        
        response = await self.make_request("POST", "/scans", data=scan_data)
        
        if response["status"] == 200:
            data = response["data"]
            if "id" in data and "user_id" in data and data["user_id"] == self.user_id:
                self.scan_id = data["id"]
                self.log_test("Create Scan (Authenticated)", True, 
                            f"✅ Scan created with user_id: {data['user_id']}, scan_id: {data['id']}")
            else:
                self.log_test("Create Scan (Authenticated)", False, 
                            f"Missing user_id or incorrect user association: {data}")
        else:
            self.log_test("Create Scan (Authenticated)", False, 
                        f"Status {response['status']}: {response['data']}")
    
    async def test_get_user_scans(self):
        """Test getting scans for authenticated user only"""
        if not self.auth_token:
            self.log_test("Get User Scans", False, "No auth token available")
            return
        
        response = await self.make_request("GET", "/scans")
        
        if response["status"] == 200:
            scans = response["data"]
            if isinstance(scans, list):
                # Check that all scans belong to current user
                user_scans_only = all(scan.get("user_id") == self.user_id for scan in scans)
                if user_scans_only:
                    self.log_test("Get User Scans", True, 
                                f"✅ Retrieved {len(scans)} scans, all belong to user {self.user_id}")
                else:
                    self.log_test("Get User Scans", False, 
                                f"Some scans don't belong to current user: {scans}")
            else:
                self.log_test("Get User Scans", False, 
                            f"Expected list, got: {type(scans)}")
        else:
            self.log_test("Get User Scans", False, 
                        f"Status {response['status']}: {response['data']}")
    
    async def test_get_scan_by_id(self):
        """Test getting specific scan by ID (user-specific)"""
        if not hasattr(self, 'scan_id') or not self.auth_token:
            self.log_test("Get Scan By ID", False, "No scan_id or auth token available")
            return
        
        response = await self.make_request("GET", f"/scans/{self.scan_id}")
        
        if response["status"] == 200:
            scan = response["data"]
            if scan.get("user_id") == self.user_id and scan.get("id") == self.scan_id:
                self.log_test("Get Scan By ID", True, 
                            f"✅ Retrieved scan {self.scan_id} for user {self.user_id}")
            else:
                self.log_test("Get Scan By ID", False, 
                            f"Scan data inconsistent: {scan}")
        else:
            self.log_test("Get Scan By ID", False, 
                        f"Status {response['status']}: {response['data']}")
    
    async def test_get_scan_vulnerabilities(self):
        """Test getting vulnerabilities for user's scan"""
        if not hasattr(self, 'scan_id') or not self.auth_token:
            self.log_test("Get Scan Vulnerabilities", False, "No scan_id or auth token available")
            return
        
        response = await self.make_request("GET", f"/scans/{self.scan_id}/vulnerabilities")
        
        if response["status"] == 200:
            vulns = response["data"]
            if isinstance(vulns, list):
                # All vulnerabilities should belong to this scan
                scan_vulns_only = all(vuln.get("scan_id") == self.scan_id for vuln in vulns)
                if scan_vulns_only:
                    self.log_test("Get Scan Vulnerabilities", True, 
                                f"✅ Retrieved {len(vulns)} vulnerabilities for scan {self.scan_id}")
                else:
                    self.log_test("Get Scan Vulnerabilities", False, 
                                f"Some vulnerabilities don't belong to this scan: {vulns}")
            else:
                self.log_test("Get Scan Vulnerabilities", False, 
                            f"Expected list, got: {type(vulns)}")
        else:
            self.log_test("Get Scan Vulnerabilities", False, 
                        f"Status {response['status']}: {response['data']}")
    
    async def test_get_user_stats(self):
        """Test getting user-specific statistics"""
        if not self.auth_token:
            self.log_test("Get User Stats", False, "No auth token available")
            return
        
        response = await self.make_request("GET", "/stats")
        
        if response["status"] == 200:
            stats = response["data"]
            required_fields = ["totalScans", "totalVulnerabilities", "criticalVulnerabilities", "highVulnerabilities"]
            if all(field in stats for field in required_fields):
                self.log_test("Get User Stats", True, 
                            f"✅ Stats retrieved: {stats['totalScans']} scans, {stats['totalVulnerabilities']} vulns")
            else:
                self.log_test("Get User Stats", False, 
                            f"Missing required fields in stats: {stats}")
        else:
            self.log_test("Get User Stats", False, 
                        f"Status {response['status']}: {response['data']}")
    
    # ===================== TOOLS TESTS =====================
    
    async def test_exif_extraction(self):
        """Test EXIF data extraction from image"""
        # Create a test image with some EXIF data
        img = Image.new('RGB', (100, 100), color='red')
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='JPEG')
        img_bytes.seek(0)
        
        files = {
            "file": {
                "content": img_bytes.getvalue(),
                "filename": "test_image.jpg",
                "content_type": "image/jpeg"
            }
        }
        
        response = await self.make_request("POST", "/tools/extract-exif", files=files)
        
        if response["status"] == 200:
            data = response["data"]
            expected_fields = ["camera", "date", "gps", "settings", "resolution", "size", "format"]
            if all(field in data for field in expected_fields):
                self.log_test("EXIF Extraction", True, 
                            f"✅ EXIF extracted: {data['resolution']}, {data['format']}, {data['size']}")
            else:
                self.log_test("EXIF Extraction", False, 
                            f"Missing EXIF fields: {data}")
        else:
            self.log_test("EXIF Extraction", False, 
                        f"Status {response['status']}: {response['data']}")
    
    async def test_website_cloning(self):
        """Test website HTML cloning"""
        clone_data = {
            "url": "https://httpbin.org/html"
        }
        
        response = await self.make_request("POST", "/tools/clone-website", data=clone_data)
        
        if response["status"] == 200:
            data = response["data"]
            if "html" in data and "status" in data and "size" in data:
                if data["status"] == 200 and len(data["html"]) > 100:
                    self.log_test("Website Cloning", True, 
                                f"✅ Website cloned: {data['size']} bytes, status {data['status']}")
                else:
                    self.log_test("Website Cloning", False, 
                                f"Invalid response or empty content: {data}")
            else:
                self.log_test("Website Cloning", False, 
                            f"Missing required fields: {data}")
        else:
            self.log_test("Website Cloning", False, 
                        f"Status {response['status']}: {response['data']}")
    
    async def test_face_analysis(self):
        """Test face analysis endpoint"""
        # Create a test image
        img = Image.new('RGB', (200, 200), color='blue')
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        files = {
            "file": {
                "content": img_bytes.getvalue(),
                "filename": "test_face.png",
                "content_type": "image/png"
            }
        }
        
        response = await self.make_request("POST", "/tools/analyze-face", files=files)
        
        if response["status"] == 200:
            data = response["data"]
            expected_fields = ["faces", "width", "height", "format"]
            if all(field in data for field in expected_fields):
                self.log_test("Face Analysis", True, 
                            f"✅ Face analysis: {data['faces']} faces, {data['width']}x{data['height']} {data['format']}")
            else:
                self.log_test("Face Analysis", False, 
                            f"Missing face analysis fields: {data}")
        else:
            self.log_test("Face Analysis", False, 
                        f"Status {response['status']}: {response['data']}")
    
    async def test_reverse_image_search(self):
        """Test the new automated reverse image search endpoint"""
        search_data = {
            "imageUrl": "https://httpbin.org/image/jpeg"
        }
        
        response = await self.make_request("POST", "/tools/reverse-image-search", data=search_data)
        
        if response["status"] == 200:
            data = response["data"]
            expected_fields = ["imageUrl", "engines", "totalEngines", "successfulSearches"]
            if all(field in data for field in expected_fields):
                engines = data["engines"]
                if len(engines) == 4:  # Should have 4 search engines
                    engine_names = [e["engine"] for e in engines]
                    expected_engines = ["Google Images", "Yandex Images", "Bing Images", "TinEye"]
                    if all(eng in engine_names for eng in expected_engines):
                        successful = sum(1 for e in engines if e.get("available", False))
                        self.log_test("Reverse Image Search", True, 
                                    f"✅ Search across {len(engines)} engines, {successful} successful")
                    else:
                        self.log_test("Reverse Image Search", False, 
                                    f"Missing expected engines: {engine_names}")
                else:
                    self.log_test("Reverse Image Search", False, 
                                f"Expected 4 engines, got {len(engines)}")
            else:
                self.log_test("Reverse Image Search", False, 
                            f"Missing required fields: {data}")
        else:
            self.log_test("Reverse Image Search", False, 
                        f"Status {response['status']}: {response['data']}")
    
    # ===================== AUTHORIZATION TESTS =====================
    
    async def test_scan_privacy_protection(self):
        """Test that users can only access their own scans"""
        # First, create a second user to test privacy
        second_user = {
            "email": "maria.silva@teste.com",
            "username": "maria_silva",
            "password": "OutraSenha456!"
        }
        
        # Register second user
        response = await self.make_request("POST", "/auth/register", data=second_user)
        if response["status"] != 200:
            self.log_test("Scan Privacy Protection", False, "Failed to create second user")
            return
        
        second_token = response["data"]["access_token"]
        second_user_id = response["data"]["user"]["id"]
        
        # Create scan with second user
        original_token = self.auth_token
        self.auth_token = second_token
        
        scan_data = {
            "name": "Scan do Segundo Usuário",
            "target": "https://httpbin.org/get", 
            "scanType": "web"
        }
        
        response = await self.make_request("POST", "/scans", data=scan_data)
        if response["status"] != 200:
            self.log_test("Scan Privacy Protection", False, "Failed to create scan with second user")
            return
        
        second_user_scan_id = response["data"]["id"]
        
        # Now try to access second user's scan with first user's token
        self.auth_token = original_token
        
        response = await self.make_request("GET", f"/scans/{second_user_scan_id}")
        
        if response["status"] == 404:
            self.log_test("Scan Privacy Protection", True, 
                        "✅ User cannot access other user's scans (404)")
        elif response["status"] == 403:
            self.log_test("Scan Privacy Protection", True, 
                        "✅ User cannot access other user's scans (403)")
        else:
            self.log_test("Scan Privacy Protection", False, 
                        f"Security breach: User accessed other's scan. Status: {response['status']}")
    
    async def test_unauthenticated_access(self):
        """Test that protected endpoints require authentication"""
        # Temporarily remove token
        original_token = self.auth_token
        self.auth_token = None
        
        endpoints_to_test = [
            ("GET", "/scans", "Get Scans"),
            ("POST", "/scans", "Create Scan"),
            ("GET", "/auth/me", "Get Current User"),
            ("GET", "/stats", "Get Stats")
        ]
        
        unauthenticated_results = []
        
        for method, endpoint, name in endpoints_to_test:
            data = {"name": "test", "target": "https://test.com", "scanType": "web"} if method == "POST" else None
            response = await self.make_request(method, endpoint, data=data)
            
            if response["status"] in [401, 403]:
                unauthenticated_results.append(f"✅ {name}: Protected (HTTP {response['status']})")
            else:
                unauthenticated_results.append(f"❌ {name}: NOT PROTECTED (HTTP {response['status']})")
        
        # Restore token
        self.auth_token = original_token
        
        protected_count = sum(1 for result in unauthenticated_results if "✅" in result)
        total_endpoints = len(endpoints_to_test)
        
        if protected_count == total_endpoints:
            self.log_test("Unauthenticated Access Protection", True, 
                        f"✅ All {total_endpoints} protected endpoints require authentication")
        else:
            self.log_test("Unauthenticated Access Protection", False, 
                        f"❌ {total_endpoints - protected_count} endpoints are not protected: {unauthenticated_results}")
    
    # ===================== PERFORMANCE TESTS =====================
    
    async def test_scanner_performance(self):
        """Test that scanner performance improvements are working"""
        if not self.auth_token:
            self.log_test("Scanner Performance", False, "No auth token available")
            return
        
        scan_data = {
            "name": "Performance Test Scan",
            "target": "https://httpbin.org/delay/1",
            "scanType": "web"
        }
        
        start_time = time.time()
        response = await self.make_request("POST", "/scans", data=scan_data)
        
        if response["status"] == 200:
            scan_creation_time = time.time() - start_time
            
            # The scan should be created quickly (< 2 seconds)
            if scan_creation_time < 2.0:
                self.log_test("Scanner Performance", True, 
                            f"✅ Scan created in {scan_creation_time:.2f}s (optimized performance)")
            else:
                self.log_test("Scanner Performance", False, 
                            f"Slow scan creation: {scan_creation_time:.2f}s")
        else:
            self.log_test("Scanner Performance", False, 
                        f"Failed to create performance test scan: {response['status']}")
    
    # ===================== MAIN TEST RUNNER =====================
    
    async def run_all_tests(self):
        """Run all backend tests in sequence"""
        print("=" * 60)
        print("🛡️  OLHOS DE DEUS - BACKEND COMPREHENSIVE TEST SUITE")
        print("=" * 60)
        print(f"Backend URL: {self.base_url}")
        print()
        
        # Authentication Tests
        print("🔐 AUTHENTICATION TESTS")
        await self.test_user_registration()
        await self.test_user_login()
        await self.test_get_current_user()
        await self.test_logout()
        
        # Re-login for subsequent tests
        await self.test_user_login()
        
        print("\n📊 SCANS & USER PRIVACY TESTS")
        await self.test_create_scan_authenticated()
        await self.test_get_user_scans()
        await self.test_get_scan_by_id()
        await self.test_get_scan_vulnerabilities()
        await self.test_get_user_stats()
        
        print("\n🔒 AUTHORIZATION & SECURITY TESTS")
        await self.test_scan_privacy_protection()
        await self.test_unauthenticated_access()
        
        print("\n🔧 TOOLS ENDPOINTS TESTS")
        await self.test_exif_extraction()
        await self.test_website_cloning()
        await self.test_face_analysis()
        await self.test_reverse_image_search()
        
        print("\n⚡ PERFORMANCE TESTS")
        await self.test_scanner_performance()
        
        # Summary
        print("\n" + "=" * 60)
        print("📋 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for test in self.test_results if test["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n🚨 FAILED TESTS:")
            for test in self.test_results:
                if not test["success"]:
                    print(f"❌ {test['test']}: {test['details']}")
        
        return passed_tests, failed_tests


async def main():
    """Main test runner"""
    async with OlhosDeDeusBackendTester() as tester:
        passed, failed = await tester.run_all_tests()
        
        if failed == 0:
            print("\n🎉 ALL TESTS PASSED! Backend is fully functional.")
        else:
            print(f"\n⚠️  {failed} test(s) failed. Please review and fix issues.")
        
        return failed == 0


if __name__ == "__main__":
    success = asyncio.run(main())
    exit(0 if success else 1)