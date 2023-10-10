from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    language = db.Column(db.String(255))
    grade = db.Column(db.Integer)
    learning_goal = db.Column(db.String(255))
    
    # Additional fields for managing subscriptions and payment information
    subscription_start_date = db.Column(db.Date)
    subscription_end_date = db.Column(db.Date)
    credits = db.Column(db.Integer, default=0)
    # You can add more fields for payment info as needed
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'language': self.language,
            'grade': self.grade,
            'learning_goal': self.learning_goal,
            'subscription_start_date': self.subscription_start_date,
            'subscription_end_date': self.subscription_end_date,
            'credits': self.credits,
            # Include other fields as needed for payment info
        }

