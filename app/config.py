import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')  # Set the SECRET_KEY environment variable in the Render dashboard
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Use the provided Render database URL directly
    # SQLALCHEMY_DATABASE_URI = "postgresql://cousect_data_base_user:e21gc1pLQUIRsNS0PRZ3UUEKshzNXFtu@dpg-cl3756gt3kic73d8altg-a.oregon-postgres.render.com/cousect_data_base"
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_ECHO = True  # or False depending on your needs
