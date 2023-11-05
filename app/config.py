import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')  # Set the SECRET_KEY environment variable in the Render dashboard
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Use the provided Render database URL directly
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
    SQLALCHEMY_ECHO = True  # or False depending on your needs
