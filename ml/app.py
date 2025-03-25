from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load vectorizers from the provided .pkl files
with open('tfidf_vectorizer.pkl', 'rb') as f:
    tfidf_vectorizer = pickle.load(f)

with open('count_vectorizer.pkl', 'rb') as f:
    count_vectorizer = pickle.load(f)

# Load machine learning models from the provided .pkl files
with open('xgboost_model.pkl', 'rb') as f:
    xgboost_model = pickle.load(f)

with open('naive_bayes_model.pkl', 'rb') as f:
    naive_bayes_model = pickle.load(f)

with open('svm_model.pkl', 'rb') as f:
    svm_model = pickle.load(f)

with open('logistic_regression_model.pkl', 'rb') as f:
    logistic_regression_model = pickle.load(f)

# Add a home route to check if the service is running
@app.route('/', methods=['GET'])
def home():
    return "ML Microservice is running!"

# Mapping for model selection.
# Updated:
# - xgboost, svm, and logistic_regression models use the TF-IDF vectorizer.
# - naive_bayes model uses the Count vectorizer.
models = {
    "xgboost": {
         "vectorizer": tfidf_vectorizer,
         "model": xgboost_model
    },
    "svm": {
         "vectorizer": tfidf_vectorizer,
         "model": svm_model
    },
    "logistic_regression": {
         "vectorizer": tfidf_vectorizer,
         "model": logistic_regression_model
    },
    "naive_bayes": {
         "vectorizer": count_vectorizer,
         "model": naive_bayes_model
    }
}


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text')
    model_name = data.get('model')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    if model_name not in models:
        return jsonify({
            'error': 'Invalid model name. Choose one of: xgboost, svm, naive_bayes, logistic_regression'
        }), 400
    
    vectorizer = models[model_name]['vectorizer']
    model = models[model_name]['model']
    
    try:
        # Transform the input text (expects a list of strings)
        features = vectorizer.transform([text])
        prediction = model.predict(features)
        
        # If the model has a predict_proba method, include probabilities
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(features).tolist()
        else:
            proba = None
        
        return jsonify({
            'model': model_name,
            'prediction': prediction.tolist(),
            'probabilities': proba
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run on port 5001 to avoid conflict with Node.js backend
    app.run(host='0.0.0.0', port=5001, debug=True)
