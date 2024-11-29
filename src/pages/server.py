from flask import Flask, request, jsonify
import openai
import os

# Dynamically resolve the path of the key file
script_dir = os.path.dirname(os.path.abspath(__file__))  # Get the directory of the current script
key_path = os.path.join(script_dir, 'key.txt')  # Combine it with the file name

# Read the API key
try:
    with open(key_path, 'r') as f:
        API_KEY = f.read().strip()  # Strip any extra whitespace
except FileNotFoundError:
    raise FileNotFoundError(f"Could not find 'key.txt' at {key_path}")

os.environ['OPENAI_API_KEY'] = API_KEY
openai.api_key = os.getenv("OPENAI_API_KEY")
print(API_KEY)

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_message():
    data = request.get_json()
    message = data.get('message', '')

    # Logic to process the message
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": message}
            ]
        )
        res = completion['choices'][0]['message']['content']
        response_message = f"Клим говорит: ответ на сообщение {res}"
    except Exception as e:
        response_message = f"Error: {str(e)}"

    return jsonify({'response': response_message})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
