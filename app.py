from flask import Flask, request, jsonify, Response
from flask_cors import CORS  # Import CORS
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://zovertise.vercel.app"])

# Brevo API Key
BREVO_API_KEY = os.getenv("BREVO_API_KEY")
TEMPLATE_ID = 1  # Set in your .env file

@app.route("/", methods=["GET"])
def index():
    return Response('backend is running')

@app.route("/send-email", methods=["POST"])
def send_email():
    try:
        data = request.json  # Get form data from frontend

        email_payload = {
            "to": [{"email": data["email"], "name": data["name"]}],
            "templateId": int(TEMPLATE_ID)  # Using Brevo template
        }

        response = requests.post(
            "https://api.brevo.com/v3/smtp/email",
            headers={
                "Content-Type": "application/json",
                "accept": "application/json",
                "api-key": BREVO_API_KEY
            },
            json=email_payload
        )

        if response.status_code == 201:
            return jsonify({"message": "Email sent successfully!"}), 201
        else:
            return jsonify({"error": response.json()}), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
