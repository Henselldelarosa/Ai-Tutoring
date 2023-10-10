from flask import Blueprint, jsonify, request, current_app
from flask_login import login_required, current_user
from app.models import User, db, ActivityLog

user_routes = Blueprint('users', __name__)

@user_routes.route('/users', methods=["GET"])
@login_required
def get_users():
    """
    Retrieve a list of all users and return them as a JSON array.
    """
    if not current_user.is_admin:
        return jsonify({'message': 'Permission denied'}), 403

    users = User.query.all()
    return jsonify({'users': [user.to_dict() for user in users]})

@user_routes.route('/users/<int:id>', methods=["GET", "PUT", "DELETE"])
@login_required
def get_or_update_or_delete_user(id):
    """
    Retrieve, update, or delete a user by their ID.
    """
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if not current_user.is_admin and current_user.id != user.id:
        return jsonify({'message': 'Permission denied'}), 403

    if request.method == "GET":
        return jsonify(user.to_dict())

    if request.method == "PUT":
        data = request.get_json()

        if 'language' in data:
            user.language = data['language']
        if 'grade' in data:
            user.grade = data['grade']
        if 'learning_goal' in data:
            user.learning_goal = data['learning_goal']

        try:
            db.session.commit()
            return jsonify(user.to_dict())
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Failed to update user', 'error': str(e)}), 500

    if request.method == "DELETE":
        try:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User deleted'})
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Failed to delete user', 'error': str(e)}), 500

@user_routes.route('/users/<int:id>/profile', methods=["GET", "PUT"])
@login_required
def user_profile(id):
    """
    Retrieve or update a user's profile information by their ID.
    """
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if not current_user.is_admin and current_user.id != user.id:
        return jsonify({'message': 'Permission denied'}), 403

    if request.method == "GET":
        return jsonify(user.profile_to_dict())

    if request.method == "PUT":
        data = request.get_json()

        # Update user profile attributes
        user.profile.bio = data.get('bio', user.profile.bio)
        user.profile.avatar_url = data.get('avatar_url', user.profile.avatar_url)

        try:
            db.session.commit()
            return jsonify(user.profile_to_dict())
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Failed to update user profile', 'error': str(e)}), 500

@user_routes.route('/users/reset_password', methods=["POST"])
@login_required
def reset_password():
    """
    Reset a user's password and log the activity.
    """
    data = request.get_json()
    user_id = data.get('user_id')
    new_password = data.get('new_password')

    if not user_id or not new_password:
        return jsonify({'message': 'User ID and new password are required'}), 400

    if not current_user.is_admin and current_user.id != user_id:
        return jsonify({'message': 'Permission denied'}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Reset the user's password
    user.set_password(new_password)

    # Log the password reset activity
    activity_log = ActivityLog(
        user_id=user.id,
        activity_type='password_reset',
        description=f'Password reset by {current_user.username}',
    )
    db.session.add(activity_log)

    try:
        db.session.commit()
        return jsonify({'message': 'Password reset successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to reset password', 'error': str(e)}), 500

@user_routes.route('/users/feedback', methods=["POST"])
@login_required
def submit_feedback():
    """
    Submit user feedback.
    """
    data = request.get_json()
    feedback_text = data.get('feedback_text')

    if not feedback_text:
        return jsonify({'message': 'Feedback text is required'}), 400

    feedback = Feedback(user_id=current_user.id, feedback_text=feedback_text)
    db.session.add(feedback)

    try:
        db.session.commit()
        return jsonify({'message': 'Feedback submitted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to submit feedback', 'error': str(e)}), 500
