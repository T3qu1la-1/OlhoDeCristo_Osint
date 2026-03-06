import os
import jwt
import bcrypt
import json
from pathlib import Path
from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'olhos-de-deus-secret-key-change-in-production')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

security = HTTPBearer()

# 👑 Carregar credenciais de admin do JSON
ADMIN_CREDENTIALS_FILE = Path(__file__).parent / 'admin_credentials.json'

def load_admin_credentials():
    """Carrega credenciais de admin do JSON"""
    try:
        with open(ADMIN_CREDENTIALS_FILE, 'r') as f:
            data = json.load(f)
            admin = data.get('admin', {})
            # Se não tiver hash, gerar
            if 'PLACEHOLDER' in admin.get('password_hash', ''):
                # Senha: Celo0506
                admin['password_hash'] = hash_password('Celo0506')
                # Salvar de volta
                data['admin'] = admin
                with open(ADMIN_CREDENTIALS_FILE, 'w') as fw:
                    json.dump(data, fw, indent=2)
            return admin
    except Exception as e:
        print(f"Erro ao carregar admin credentials: {e}")
        return None

ADMIN_CREDENTIALS = load_admin_credentials()

def hash_password(password: str) -> str:
    """Hash password with bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> dict:
    """Decode JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    """Get current authenticated user from token"""
    token = credentials.credentials
    payload = decode_access_token(token)
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    return {
        "id": user_id,
        "email": payload.get("email"),
        "role": payload.get("role", "user")
    }

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Security(security)):
    """Get current user and verify if admin"""
    user = await get_current_user(credentials)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado. Apenas administradores.")
    return user

def check_admin_credentials(email: str, password: str) -> bool:
    """Verifica se as credenciais são do admin"""
    if not ADMIN_CREDENTIALS:
        return False
    
    if email == ADMIN_CREDENTIALS.get('email'):
        return verify_password(password, ADMIN_CREDENTIALS.get('password_hash'))
    
    return False
