from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in.
    """
    form = LoginForm()

    # Ensure CSRF token is present in the request
    csrf_token = request.cookies.get('csrf_token')
    if not csrf_token:
        return jsonify({'errors': ['CSRF token missing']}), 401

    form['csrf_token'].data = csrf_token

    if form.validate_on_submit():
        email = form.data['email']
        password = form.data['password']

        # Find the user by email
        user = User.query.filter_by(email=email).first()

        if user and user.check_password(password):
            login_user(user)
            return jsonify(user.to_dict())
    
    return jsonify({'errors': ['Invalid email or password']}), 401

@auth_routes.route('/logout')
@login_required
def logout():
    """
    Logs a user out.
    """
    logout_user()
    return jsonify({'message': 'User logged out'})

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and sends a verification email.
    """
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Username, email, and password are required'}), 400

    # # Validate email format using a library or regex pattern
    # if not validate_email_format(email):
    #     return jsonify({'message': 'Invalid email format'}), 400

    # Check if the email is already in use
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already in use'}), 400

    # Create the user and send a verification email
    user = User(username=username, email=email, password=password)
    # user.set_password(password)

    db.session.add(user)

    try:
        db.session.commit()
        
        # # Send a verification email with a verification link
        # send_verification_email(user)

        return jsonify({'message': 'User registered successfully. Check your email for verification instructions.'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to register user', 'error': str(e)}), 500


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
