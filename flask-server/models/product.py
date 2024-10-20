from db_setup import db

# Define Product model
class Product(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  expiration_date = db.Column(db.Date, nullable=False)