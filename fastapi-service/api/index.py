import sys
import os

# Tambahkan direktori root fastapi-service ke sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app
