from db_setup import db

class User(db.Model):
  user_id = db.Column(db.Integer, primary_key = True)
  email = db.Column(db.String(100), unique=True, nullable=False) # User's email
  products = db.relationship('Product', backref='user', lazy=True) # Relationship with Product
  
  def __init__(self, email):
    self.email = email
  