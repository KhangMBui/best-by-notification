from db_setup import db
from flask_login import UserMixin

class User(db.Model):
  __tablename__ = 'user'
  
  user_id = db.Column(db.Integer, primary_key = True)
  email = db.Column(db.String(150), unique=True, nullable=False) # User's email
  password_hash = db.Column(db.String(256), nullable=False)  # Store hashed password
  products = db.relationship('Product', backref='user', lazy=True) # Relationship with Product
  
  def set_password(self, password):
    """Hashes and sets the password."""
    from server import bcrypt  # Import here to avoid circular dependency
    self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
  
  def check_password(self, password):
    """Checks if the password matches the stored hash."""
    from server import bcrypt  # Import here to avoid circular dependency
    return bcrypt.check_password_hash(self.password_hash, password)
  
  def __init__(self, email, password):
    self.email = email
    self.set_password(password)
  