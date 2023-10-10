from flask import Flask, Blueprint, request, jsonify
import openai
import os

openai.api_key = os.environ.get('OPEN_AI_API_KEY')
openai_routes = Blueprint('openai', __name__)

@openai_routes.route('/')
def index():
    return 'ok'

@openai_routes.route('/generate_question', methods=['POST'])
def generate_question():
    # Get the user's question topic and level from the request
    user_question_topic = request.json.get('question_topic')
    user_question_level = request.json.get('question_level')

    # Define a specific prompt based on the user's topic and level
    prompt = f"Generate an {user_question_level} {user_question_topic} question"

    # Create a new conversation with a system message and the user's question topic and level
    conversation = [
        {"role": "system", "content": """
           You're an AI tailored for advanced topics, suitable for AP classes, IB Diploma courses, and GCC (General Certificate of Education) levels.
           Your expertise is focused on mathematics, physics, and chemistry. Ask any questions you have within these specialized subjects
        """},
        {"role": "user", "content": f"Generate an {user_question_level} {user_question_topic} question."}
    ]

    # Create a chat completion with the conversation and the specific prompt, limiting tokens
    chat = openai.ChatCompletion.create(
        model="gpt-4", messages=conversation, prompt=prompt, max_tokens=100, min_tokens=50
    )  # Adjust max_tokens and min_tokens as needed

    # Extract the generated question
    assistant_message = chat.choices[0].message
    generated_question = assistant_message.get('content', '')

    return jsonify({'question': generated_question})
@openai_routes.route('/answer_question', methods=['POST'])

def generate_explanation(user_response, correct_answer):
    # Define a prompt for generating explanations and tips
    prompt = f"Explain why the following answer is incorrect:\n\nUser Response: {user_response}\nCorrect Answer: {correct_answer}\n\nProvide a tip to help the user improve their answer:\n"

    # Create a chat completion with the prompt to generate the explanation and tip
    chat = openai.ChatCompletion.create(
        model="gpt-4", messages=[{"role": "system", "content": "Generate an explanation and tip."}, {"role": "user", "content": prompt}],
        max_tokens=100, min_tokens=10  # Adjust max_tokens and min_tokens as needed
    )

    # Extract the generated explanation and tip
    assistant_message = chat.choices[0].message
    generated_explanation_tip = assistant_message.get('content', '')

    return generated_explanation_tip

def grade_response(user_response, correct_answer):
    # Compare the user's response to the correct answer
    user_response = user_response.strip().lower()
    correct_answer = correct_answer.strip().lower()

    if user_response == correct_answer:
        explanation = "Your answer is correct. Well done!"
        result = 'Correct'
        tip = ""
    else:
        explanation = f"Your answer is incorrect. Let me explain why:\n\n"
        
        tip = generate_explanation(user_response, correct_answer)
        explanation += tip
        result = 'Incorrect'

    return result, explanation
    
def answer_question():
    # Get the user's question from the request
    user_question = request.json.get('user_question')
    prompt = f"Answer the following question: {user_question}"
    chat = openai.ChatCompletion.create(
        model="gpt-4", messages=[{"role": "user", "content": prompt}], max_tokens=100
    ) 
    # Extract the generated answer
    assistant_message = chat.choices[0].message
    generated_answer = assistant_message.get('content', '')

    return jsonify({'answer': generated_answer})
if __name__ == "__main__":
    app = Flask(__name__)
    app.register_blueprint(openai_routes, url_prefix='/openai')
    app.run(debug=True)
