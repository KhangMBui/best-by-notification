from datetime import datetime
from db_setup import db
from models.product import Product
from flask import Blueprint, request, jsonify

# Create a Blueprint for products
products_bp = Blueprint('products', __name__)

# Make a route to add a product:
@products_bp.route('/add_product', methods=['POST'])
def add_product():
  data = request.get_json()
  name = data['name']
  # Parse into the date and time object with specific syntax
  expiration_date = datetime.strptime(data['expiration_date'], '%Y-%m-%d')
  # Create a new product with the given data and add it to the database
  new_product = Product(name = name, expiration_date = expiration_date)
  db.session.add(new_product)
  db.session.commit()
  return jsonify({'message': 'Product added successfully'}), 200

# Route to fetch all products
@products_bp.route('/get_products', methods=['GET'])
def get_products():
  products = Product.query.all()
  return jsonify([{
    'id': product.id,
    'name': product.name, 
    'expiration date': product.expiration_date.strftime('%Y-%m-%d')} for product in products
  ]), 200

# Route to fetch a product by name
@products_bp.route('/get_product/<string:name>', methods=['GET'])
def get_product_by_name(name):
  product = Product.query.filter_by(name = name).first()
  if product:
    return jsonify({
      'id': product.id,
      'name': product.name,
      'expiration date': product.expiration_date.strftime('%Y-%m-%d')
    }), 200
  else: 
    return jsonify({'message': f'Product {name} not found'}), 404
  
# Route to fetch a product by id
@products_bp.route('/get_product/<int:id>', methods=['GET'])
def get_product_by_id(id):
  # Fetch the product by its id
  product = Product.query.get(id)
  
  # Check if the product exists
  if product:
    return jsonify({
      'id': product.id,
      'name': product.name,
      'expiration date': product.expiration_date.strftime('%Y-%m-%d')
    }), 200
  else: 
    return jsonify({'message': f'Product with id {id} not found'}), 404

# Route to delete a product by id
@products_bp.route('/delete_product/<int:id>', methods=['DELETE'])
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