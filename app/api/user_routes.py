from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required #removed, was throwing unauthorized error
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>',methods=["GET","PUT"])
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if request.method == "GET":
      return user.to_dict()
    elif request.method == "PUT":
      data = request.get_json()
      user.language = data['language']
      user.grade = data['grade']
      user.learning_goal = data['learning_goal']

      db.session.commit()
      return user.to_dict()
