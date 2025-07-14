print("🧪 Starting MySQL connection test...")

import mysql.connector

try:
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",         # default for XAMPP is no password
        database="test_db"   # replace with your real DB name
    )
    print("✅ Connected to MySQL successfully!")
    conn.close()
except mysql.connector.Error as err:
    print("❌ Failed to connect to MySQL:", err)

input("✅ Press Enter to exit...")
