
from flask import Flask, request, jsonify
from flask_cors import CORS
import telegram
import mysql.connector
import json
import logging
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# --- SETUP CONFIGURATION ---
TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '7777633457:AAGmiSgNJgWXk7OVp3hLkER_BvUCsbNZ6EI')
DB_CONFIG = {
    "host": os.getenv('DB_HOST', 'localhost'),
    "user": os.getenv('DB_USER', 'root'),
    "password": os.getenv('DB_PASSWORD', ''),
    "database": os.getenv('DB_NAME', 'test_db')
}

# --- LOGGING SETUP ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- INITIALIZE BOT AND DB ---
bot = telegram.Bot(token=TOKEN)
app = Flask(__name__)
CORS(app)  # Enable CORS for website integration

def get_db_connection():
    try:
        db = mysql.connector.connect(**DB_CONFIG)
        return db
    except mysql.connector.Error as err:
        logger.error(f"Database connection error: {err}")
        return None

def init_database():
    db = get_db_connection()
    if db:
        cursor = db.cursor()
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS website_visitors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ip_address VARCHAR(45),
                user_agent TEXT,
                page_url TEXT,
                referrer TEXT,
                screen_resolution VARCHAR(20),
                browser_language VARCHAR(10),
                country VARCHAR(100),
                city VARCHAR(100),
                device_type VARCHAR(50),
                visit_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS telegram_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                chat_id BIGINT UNIQUE,
                username VARCHAR(255),
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                is_subscribed BOOLEAN DEFAULT TRUE,
                joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255),
                subject VARCHAR(255),
                message TEXT,
                source VARCHAR(50) DEFAULT 'website',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS crypto_wallets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                address VARCHAR(255) UNIQUE,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        db.commit()
        cursor.close()
        db.close()
        logger.info("Database initialized successfully")
    else:
        logger.error("Failed to initialize database")
init_database()

# --- TELEGRAM USER MANAGEMENT ---
def register_telegram_user(chat_id, username, first_name, last_name):
    db = get_db_connection()
    if db:
        cursor = db.cursor()
        try:
            cursor.execute("""
                INSERT INTO telegram_users (chat_id, username, first_name, last_name)
                VALUES (%s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                last_active = CURRENT_TIMESTAMP,
                username = VALUES(username),
                first_name = VALUES(first_name),
                last_name = VALUES(last_name)
            """, (chat_id, username, first_name, last_name))
            db.commit()
        except mysql.connector.Error as err:
            logger.error(f"Error registering user: {err}")
        finally:
            cursor.close()
            db.close()

# --- WEBSITE VISITOR TRACKING ---
@app.route('/track-visitor', methods=['POST'])
def track_visitor():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Get visitor information
        ip_address = request.remote_addr
        user_agent = request.headers.get('User-Agent', '')
        
        db = get_db_connection()
        if db:
            cursor = db.cursor()
            cursor.execute("""
                INSERT INTO website_visitors 
                (ip_address, user_agent, page_url, referrer, screen_resolution, 
                 browser_language, country, city, device_type)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                ip_address,
                user_agent,
                data.get('page_url', ''),
                data.get('referrer', ''),
                data.get('screen_resolution', ''),
                data.get('browser_language', ''),
                data.get('country', ''),
                data.get('city', ''),
                data.get('device_type', '')
            ))
            db.commit()
            cursor.close()
            db.close()
            
            logger.info(f"Visitor tracked: {ip_address} - {data.get('page_url', '')}")
            return jsonify({'status': 'success', 'message': 'Visitor tracked successfully'})
        else:
            return jsonify({'error': 'Database connection failed'}), 500
    except Exception as e:
        logger.error(f"Error tracking visitor: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# --- CONTACT FORM HANDLER ---
@app.route('/contact', methods=['POST'])
def handle_contact():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        db = get_db_connection()
        if db:
            cursor = db.cursor()
            cursor.execute("""
                INSERT INTO contact_messages (name, email, subject, message, source)
                VALUES (%s, %s, %s, %s, %s)
            """, (
                data.get('name', ''),
                data.get('email', ''),
                data.get('subject', ''),
                data.get('message', ''),
                data.get('source', 'website')
            ))
            db.commit()
            cursor.close()
            db.close()
            
            logger.info(f"Contact message received from: {data.get('email', '')}")
            return jsonify({'status': 'success', 'message': 'Contact message saved'})
        else:
            return jsonify({'error': 'Database connection failed'}), 500
    except Exception as e:
        logger.error(f"Error handling contact: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# --- FLASK WEBHOOK ROUTE ---
@app.route(f"/{TOKEN}", methods=["POST"])
def webhook():
    try:
        update = telegram.Update.de_json(request.get_json(force=True), bot)
        
        if update.message:
            chat_id = update.message.chat.id
            msg = update.message.text
            user = update.message.from_user
            
            # Register/update user
            register_telegram_user(
                chat_id, 
                user.username, 
                user.first_name, 
                user.last_name
            )
            
            # Handle commands
            if msg.startswith('/start'):
                send_welcome(chat_id)
            elif msg.startswith('/help'):
                send_help(chat_id)
            elif msg.startswith('/fetch'):
                handle_fetch_command(chat_id, msg)
            elif msg.startswith('/add'):
                handle_add_command(chat_id, msg)
            elif msg.startswith('/stats'):
                handle_stats_command(chat_id)
            elif msg.startswith('/visitors'):
                handle_visitors_command(chat_id, msg)
            elif msg.startswith('/contacts'):
                handle_contacts_command(chat_id)
            elif msg.startswith('/broadcast'):
                handle_broadcast_command(chat_id, msg, user)
            else:
                send_unknown_command(chat_id)
                
        return "OK", 200
    except Exception as e:
        logger.error(f"Webhook error: {e}")
        return "Error", 500
# --- BOT COMMAND HANDLERS ---
def send_welcome(chat_id):
    welcome_text = """🤖 Welcome to D&V Technologies Bot!

📋 Available Commands:
/start - Show this welcome message
/help - Get detailed help
/fetch - View all wallet addresses
/add <address> - Add a new wallet address
/stats - View website statistics
/visitors - View recent visitors
/contacts - View contact messages
/broadcast <message> - Send message to all users (admin only)

🌐 Connected to D&V Technologies website
💼 Managing crypto wallets and visitor data"""
    bot.send_message(chat_id=chat_id, text=welcome_text)

def send_help(chat_id):
    help_text = """📖 Bot Help Guide:

🔹 /start - Shows welcome message
🔹 /help - Shows this help message
🔹 /fetch - Displays all stored wallet addresses
🔹 /add <address> - Adds a new crypto wallet address
   Example: /add 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
🔹 /stats - Shows website visitor statistics
🔹 /visitors [count] - Shows recent visitors (default: 10)
🔹 /contacts - Shows recent contact form submissions
🔹 /broadcast <message> - Sends message to all subscribers

❓ Need more help? Contact support through our website!"""
    bot.send_message(chat_id=chat_id, text=help_text)

def send_unknown_command(chat_id):
    bot.send_message(
        chat_id=chat_id,
        text="❓ Unknown command. Type /help to see available commands."
    )

def handle_fetch_command(chat_id, msg):
    db = get_db_connection()
    if db:
        cursor = db.cursor()
        try:
            cursor.execute("SELECT address, created_at FROM crypto_wallets ORDER BY created_at DESC")
            results = cursor.fetchall()
            if results:
                message = "💼 **Crypto Wallet Addresses:**\n\n"
                for i, (address, created_at) in enumerate(results[:10], 1):
                    formatted_date = created_at.strftime("%Y-%m-%d %H:%M") if created_at else "N/A"
                    message += f"{i}. `{address}`\n   📅 Added: {formatted_date}\n\n"
                if len(results) > 10:
                    message += f"... and {len(results) - 10} more addresses\n"
                message += f"\n📊 Total addresses: {len(results)}"
                bot.send_message(chat_id=chat_id, text=message, parse_mode='Markdown')
            else:
                bot.send_message(chat_id=chat_id, text="📭 No wallet addresses found in database.")
        except Exception as e:
            logger.error(f"Error fetching wallets: {e}")
            bot.send_message(chat_id=chat_id, text="❌ Error accessing database.")
        finally:
            cursor.close()
            db.close()
    else:
        bot.send_message(chat_id=chat_id, text="❌ Database connection error.")
    if db:
        cursor = db.cursor()
        try:
            _, wallet_address = msg.split()
            cursor.execute("INSERT INTO crypto_wallets (address) VALUES (%s)", (wallet_address,))
            db.commit()
            bot.send_message(chat_id=chat_id, text=f"✅ Added wallet address '{wallet_address}' to the database.")
        except mysql.connector.Error as err:
            bot.send_message(chat_id=chat_id, text=f"❌ Error adding wallet address: {err}")
        except ValueError:
            bot.send_message(chat_id=chat_id, text="⚠️ Please use the format '/add <wallet_address>'")
        finally:
            cursor.close()
            db.close()

# --- DEFAULT ROUTE ---
@app.route("/")
def index():
    return "Bot is running!"

# --- MAIN ---
if __name__ == "__main__":
    app.run(port=5000)
