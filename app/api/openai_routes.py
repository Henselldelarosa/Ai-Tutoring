from flask import Flask, Blueprint, render_template, request, jsonify
import openai
import os

openai.api_key = os.environ.get('OPEN_AI_API_KEY')
openai_routes = Blueprint('openai', __name__)


messages = [
    {"role": "system", "content": """
        You are an AI who produces questions for a high school or introductory college level course.
        You can only generate and answer questions on physics, chemistry and math.
    """}
]


@openai_routes.route('/')
def index():
    return 'ok'


@openai_routes.route('/generate_question', methods=['POST'])
def generate_question():
    prompt = "Generate an easy physics question"
    messages.append({"role": "system", "content": prompt})
    
    chat = openai.ChatCompletion.create(
        model="gpt-4", messages=messages
    )
    question = chat.choices[0].message.content
    messages.append({"role": "assistant", "content": question})
    return jsonify({'question': question})
