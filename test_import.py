import sys
print(sys.path)
try:
    from supabase import create_client, Client
    print("Success")
except Exception as e:
    print("Error:", e)
