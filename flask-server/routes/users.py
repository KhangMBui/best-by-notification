from flask import Blueprint, request, jsonify
from models.user import User
from db_setup import db

users_bp = Blueprint('users', __name__)

# Route for user signup
@users_bp.route('/signup', methods=['POST'])
def signup():
  data = request.get_json()
  email = data.get('email')
  
  if not email:
    return jsonify({'error': 'Email is required'}), 400
  
  # Check if user already exists
  if User.query.filter_by(email=email).first():
    return jsonify({'error': 'Email already in use'}), 400
  
  # Create new user
  new_user = User(email=email)
  db.session.add(new_user)
  db.session.commit()
  return jsonify({'message': f'User with email {email} created successfully'}), 201