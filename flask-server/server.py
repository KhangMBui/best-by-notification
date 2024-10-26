from flask import Flask
from flask_mail import Mail, Message
from flask_cors import CORS
from datetime import datetime, timedelta
from db_setup import db
from models.product import Product
from routes.products import products_bp
import threading

app = Flask(__name__)
CORS(app) # Allows cross-origin requests from React frontend
mail = Mail(app) # instantiate the mail class 

# configuration of mail 
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_DEFAULT_SENDER'] = 'khangbui2023@gmail.com'
app.config['MAIL_USERNAME'] = 'khangbui2023@gmail.com'
app.config['MAIL_PASSWORD'] = 'omdt jihh bqho enfc'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app) 

# Config SQLite database

# Tells Flask-SQLAlchemy to use an SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
# Set this to False to improve performance and avoid seeing unnecessary warnings.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Set up the database
db.init_app(app)

# Register blueprints
app.register_blueprint(products_bp)

# Initialize the database
with app.app_context():
    db.create_all()

# Background task to check for expiring products
def check_expiring_products():
  with app.app_context(): # Ensure we are inside an application context
    products = Product.query.all()
    today = datetime.today().date()
    for product in products:
      dayLeft = (product.expiration_date - today).days
      if dayLeft <= 0:
        send_email_notification(product, "expired", "It belongs in the street!!!")
        print(f"Notification: {product.name} is expired.")
      elif dayLeft <= 2:
        send_email_notification(product, "expiring soon", "Please cook with it!")
        print(f"Notification: {product.name} is expiring in {dayLeft} days. You better cook with it soon!")
    threading.Timer(86400, check_expiring_products).start()

def send_email_notification(product, status, action):
  subject = f"Product {product.name} is {status}"
  body = f"Dear user,\n\nYour product {product.name} is {status}. \n{action}."
  msg = Message(subject, recipients=["khangbui2002@gmail.com"], body = body)
  mail.send(msg)
  return f'Notification email successfully sent for {product.name} ({status})'

# Start the expiration checking thread:
check_expiring_products()  

# Members API route
@app.route("/members")

def members():
  return {"members": ["Hello from the backend 1", "Hello from the backend 2", "Hello from the backend 3"]}

if __name__ == "__main__":
  app.run(debug=True)