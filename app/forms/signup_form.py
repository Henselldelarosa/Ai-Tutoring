from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length, ValidationError
from app.models import User

class SignUpForm(FlaskForm):
    username = StringField(
        'Username', validators=[DataRequired(), Length(min=4, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    submit = SubmitField('Sign Up')

    def validate_email(self, field):
        email = field.data
        user = User.query.filter_by(email=email).first()
        if user:
            raise ValidationError('Email address is already in use.')

    def validate_username(self, field):
        username = field.data
        user = User.query.filter_by(username=username).first()
        if user:
            raise ValidationError('Username is already in use.')
