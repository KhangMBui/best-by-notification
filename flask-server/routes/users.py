from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, LoginManager
from models.user import User
from db_setup import db

users_bp = Blueprint('users', __name__)

@users_bp.route('/signup', methods=['POST'])
def signup():
  """Route for user signup"""
  data = request.get_json()
  email = data.get('email')
  password = data.get('password')
  
  if not email or not password:
    return jsonify({'error': 'Email is required'}), 400
  
  # Check if user already exists
  if User.query.filter_by(email=email).first():
    return jsonify({'error': 'Email already in use'}), 400
  
  # Create new user
  new_user = User(email=email, password=password)
  db.session.add(new_user)
  db.session.commit()
  return jsonify({'message': f'User with email {email} created successfully'}), 201

@users_bp.route('/login', methods=['POST'])
def login():
  """Route for user login"""
  data = request.get_json()
  email = data.get('email')
  password = data.get('password')
  
  user = User.query.filter_by(email=email).first()
  if user and user.check_password(password):
    login_user(user)
    return jsonify({'message': f'Login successful'}), 200
  else:
    return jsonify({'error': 'Invalid email or password'}), 401
  
@users_bp.route('/logout', methods=['POST'])
@login_required
def logout():
  logout_user()
  return jsonify({'message': 'Logged out successfully'}), 200

@users_bp.route('/protected', methods=['GET'])
@login_required
def protected_route():
  return jsonify({'message': 'This is a protected route accessible only to authenticated users.'})
