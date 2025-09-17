from flask import Flask, render_template, request
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import pickle
import re

# Paths (same as before)
model_a_path = r"C:\Users\prave\OneDrive\Documents\streamlit\review_rating_app\models\Model_A.h5"
model_b_path = r"C:\Users\prave\OneDrive\Documents\streamlit\review_rating_app\models\Model_B.h5"
tk = r"C:\Users\prave\OneDrive\Documents\streamlit\review_rating_app\models\tokenizer.pkl"
tk2 = r"C:\Users\prave\OneDrive\Documents\streamlit\review_rating_app\models\tokenizer2.pkl"
le = r"C:\Users\prave\OneDrive\Documents\streamlit\review_rating_app\models\label_encoder.pkl"
le2 = r"C:\Users\prave\OneDrive\Documents\streamlit\review_rating_app\models\label_encoder2.pkl"

app = Flask(__name__)

MAX_LEN = 150

# --- Helpers ---
def display_stars(rating, max_stars=5):
    try:
        r = int(rating)
        r = max(0, min(r, max_stars))
        return "⭐" * r + "☆" * (max_stars - r)
    except Exception:
        return "☆" * max_stars

def softmax_to_percentages(probs):
    probs = np.asarray(probs, dtype=float)
    return [round(float(p) * 100.0, 2) for p in probs]

def is_invalid_input(text: str) -> str:
    """Return error message if invalid, else None."""
    if not text.strip():
        return "❌ Please enter some text."
    if re.fullmatch(r"[0-9\s]+", text):
        return "❌ Input cannot be only numbers."
    if re.fullmatch(r"[^a-zA-Z0-9]+", text):
        return "❌ Input cannot be only special characters."
    if len(text.strip()) < 3:
        return "❌ Input too short to analyze."
    return None

def model_predict(text, model, tokenizer, label_encoder):
    seq = tokenizer.texts_to_sequences([text])
    seq = pad_sequences(seq, maxlen=MAX_LEN, padding="post", truncating="post")

    probs = model.predict(seq, verbose=0)[0]
    pred_idx = int(np.argmax(probs))
    decoded_label = label_encoder.inverse_transform([pred_idx])[0]

    all_indices = np.arange(len(probs))
    decoded_all = label_encoder.inverse_transform(all_indices)
    percentages = softmax_to_percentages(probs)
    class_probabilities = list(zip(decoded_all, percentages))

    return decoded_label, display_stars(decoded_label), class_probabilities

# --- Load artifacts ---
model_a = tf.keras.models.load_model(model_a_path)
model_b = tf.keras.models.load_model(model_b_path)

with open(tk, "rb") as f:
    tokenizer_a = pickle.load(f)
with open(tk2, "rb") as f:
    tokenizer_b = pickle.load(f)

with open(le, "rb") as f:
    label_enc_a = pickle.load(f)
with open(le2, "rb") as f:
    label_enc_b = pickle.load(f)

@app.route("/", methods=["GET", "POST"])
def index():
    review_text = ""
    result_a = None
    result_b = None
    error_message = None

    if request.method == "POST":
        review_text = request.form.get("review", "")
        error_message = is_invalid_input(review_text)

        if not error_message:
            pred_a, stars_a, class_probs_a = model_predict(
                review_text, model_a, tokenizer_a, label_enc_a
            )
            pred_b, stars_b, class_probs_b = model_predict(
                review_text, model_b, tokenizer_b, label_enc_b
            )

            result_a = {
                "title": "🟥 Model A (Imbalanced)",
                "pred": pred_a,
                "stars": stars_a,
                "probs": class_probs_a,
            }
            result_b = {
                "title": "🟩 Model B (Balanced)",
                "pred": pred_b,
                "stars": stars_b,
                "probs": class_probs_b,
            }

    return render_template(
        "index.html",
        review_text=review_text,
        result_a=result_a,
        result_b=result_b,
        error_message=error_message,
    )

if __name__ == "__main__":
    app.run(debug=False)
