from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, timedelta
from db_setup import db
from models.product import Product
import threading

app = Flask(__name__)
CORS(app) # Allows cross-origin requests from React frontend

# Config SQLite database

# Tells Flask-SQLAlchemy to use an SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
# Set this to False to improve performance and avoid seeing unnecessary warnings.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Set up the database
db.init_app(app)

# Initialize the database
with app.app_context():
    db.create_all()

# Make a route to add a product:
@app.route('/add_product', methods=['POST'])
def add_product():
  data = request.get_json()
  name = data['name']
  # Parse into the date and time object with specific syntax
  expiration_date = datetime.strptime(data['expiration_date'], '%Y-%m-%d')
  # Create a new product with the given data and add it to the database
  new_product = Product(name = name, expiration_date = expiration_date)
  db.session.add(new_product)
  db.session.commit()
  return jsonify({'message': 'Product added successfully'})

# Route to fetch all products
@app.route('/get_products', methods=['GET'])
def get_products():
  products = Product.query.all()
  return jsonify([{
    'id': product.id,
    'name': product.name, 
    'expiration date': product.expiration_date.strftime('%Y-%m-%d')} for product in products
  ])

# Route to fetch a product by name
@app.route('/get_products/<string:name>', methods=['GET'])
def get_product_by_name(name):
  product = Product.query.filter_by(name = name).first()
  if product:
    return jsonify({
      'id': product.id,
      'name': product.name,
      'expiration date': product.expiration_date.strftime('%Y-%m-%d')
    })
  else: 
    return jsonify({'message': f'Product {name} not found'}), 404
  
# Route to fetch a product by id
@app.route('/get_products/<int:id>', methods=['GET'])
def get_product_by_id(id):
  # Fetch the product by its id
  product = Product.query.get(id)
  
  # Check if the product exists
  if product:
    return jsonify({
      'id': product.id,
      'name': product.name,
      'expiration date': product.expiration_date.strftime('%Y-%m-%d')
    })
  else: 
    return jsonify({'message': f'Product with id {id} not found'}), 404

# Route to delete a product by id
@app.route('/delete_product/<int:id>', methods=['DELETE'])
def delete_product_by_id(id):
  # Fetch the product by its id
  product = Product.query.get(id)
  
  # Check if the product exists
  if product:
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': f'Product {product.name} with id {id} has been deleted successfully.'}), 200
  else:
    return jsonify({'message': f'Product with id {id} not found.'}), 404

# Background task to check for expiring products
def check_expiring_products():
  with app.app_context(): # Ensure we are inside an application context
    products = Product.query.all()
    today = datetime.today().date()
    for product in products:
      dayLeft = (product.expiration_date - today).days
      if dayLeft <= 0:
        print(f"Notification: {product.name} is expired. It belong in the street!!!")
      elif dayLeft <= 2:
        print(f"Notification: {product.name} is expiring in {dayLeft} days. You better cook with it soon!")
    threading.Timer(86400, check_expiring_products).start()
    
# Start the expiration checking thread:
check_expiring_products()  

# Members API route
@app.route("/members")

def members():
  return {"members": ["Hello from the backend 1", "Hello from the backend 2", "Hello from the backend 3"]}



if __name__ == "__main__":
  app.run(debug=True)