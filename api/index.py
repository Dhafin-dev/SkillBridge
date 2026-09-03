import sys
import os

# Tambahkan direktori fastapi-service ke sys.path
BASE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "fastapi-service")
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from main import app

class VercelPathNormalizerMiddleware:
    def __init__(self, asgi_app):
        self.asgi_app = asgi_app

    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            raw_path = scope.get("path", "")
            for prefix in ["/api/index.py", "/api/index", "/api"]:
                if raw_path.startswith(prefix):
                    clean_path = raw_path[len(prefix):]
                    if not clean_path.startswith("/"):
                        clean_path = "/" + clean_path
                    scope["path"] = clean_path
                    break
        await self.asgi_app(scope, receive, send)

app.add_middleware(VercelPathNormalizerMiddleware)
