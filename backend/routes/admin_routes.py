"""
👑 ROTAS DE ADMINISTRADOR
Acesso apenas para admins
"""

from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from auth import get_current_admin
import os
import psutil
from datetime import datetime

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# MongoDB connection
client = AsyncIOMotorClient(os.getenv('MONGO_URL', 'mongodb://localhost:27017'))
db = client[os.getenv('DB_NAME', 'olhos_de_deus')]

@router.get("/users")
async def get_all_users(current_admin: dict = Depends(get_current_admin)):
    """Listar todos os usuários cadastrados (apenas admin)"""
    
    # Buscar usuários normais
    users = await db.users.find({}, {"_id": 0, "hashed_password": 0}).to_list(1000)
    
    # Buscar usuários do Telegram
    telegram_users = await db.telegram_users.find({}, {"_id": 0, "password": 0}).to_list(1000)
    
    return {
        "total": len(users) + len(telegram_users),
        "regular_users": len(users),
        "telegram_users": len(telegram_users),
        "users": users,
        "telegram_users": telegram_users
    }

@router.get("/stats")
async def get_system_stats(current_admin: dict = Depends(get_current_admin)):
    """Estatísticas do sistema (CPU, RAM, Storage) - apenas admin"""
    
    # CPU
    cpu_percent = psutil.cpu_percent(interval=1)
    cpu_count = psutil.cpu_count()
    
    # RAM
    memory = psutil.virtual_memory()
    memory_total_gb = memory.total / (1024 ** 3)
    memory_used_gb = memory.used / (1024 ** 3)
    memory_percent = memory.percent
    
    # Storage (disco)
    disk = psutil.disk_usage('/')
    disk_total_gb = disk.total / (1024 ** 3)
    disk_used_gb = disk.used / (1024 ** 3)
    disk_percent = disk.percent
    
    # Estatísticas do banco
    total_users = await db.users.count_documents({})
    total_telegram_users = await db.telegram_users.count_documents({})
    total_scans = await db.scans.count_documents({})
    total_vulnerabilities = await db.vulnerabilities.count_documents({})
    
    return {
        "system": {
            "cpu": {
                "usage_percent": round(cpu_percent, 2),
                "cores": cpu_count
            },
            "memory": {
                "total_gb": round(memory_total_gb, 2),
                "used_gb": round(memory_used_gb, 2),
                "percent": round(memory_percent, 2)
            },
            "storage": {
                "total_gb": round(disk_total_gb, 2),
                "used_gb": round(disk_used_gb, 2),
                "percent": round(disk_percent, 2)
            }
        },
        "database": {
            "users": total_users,
            "telegram_users": total_telegram_users,
            "scans": total_scans,
            "vulnerabilities": total_vulnerabilities
        },
        "timestamp": datetime.utcnow().isoformat()
    }

@router.delete("/users/{user_id}")
async def delete_user(user_id: str, current_admin: dict = Depends(get_current_admin)):
    """Deletar usuário (apenas admin)"""
    
    # Tentar deletar de users
    result = await db.users.delete_one({"id": user_id})
    
    if result.deleted_count == 0:
        # Tentar deletar de telegram_users
        result = await db.telegram_users.delete_one({"id": user_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    return {"message": "Usuário deletado com sucesso", "user_id": user_id}

@router.get("/scans/all")
async def get_all_scans(current_admin: dict = Depends(get_current_admin)):
    """Listar todos os scans do sistema (apenas admin)"""
    scans = await db.scans.find({}, {"_id": 0}).sort("createdAt", -1).to_list(100)
    return {
        "total": len(scans),
        "scans": scans
    }
