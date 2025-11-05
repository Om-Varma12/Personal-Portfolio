import joblib
import string
import json
import random
from sklearn.feature_extraction.text import TfidfVectorizer

# Load model and vectorizer once
model = joblib.load('rf_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

# Load responses from JSON
with open('messages.json', 'r') as f:
    data = json.load(f)

def giveResponse(tag):
    for intent in data['intents']:
        if intent['tag'] == tag:
            return random.choice(intent['responses'])
    return "Hmm, I don't have a response for that."

def checkTag(user_input, threshold=0.6):
    cleaned_input = user_input.lower().translate(
        str.maketrans('', '', string.punctuation)
    )
    
    vector = vectorizer.transform([cleaned_input])
    probs = model.predict_proba(vector)[0]
    max_prob = max(probs)
    predicted_tag = model.classes_[probs.argmax()]
    
    if max_prob < threshold:
        return giveResponse("fallback")
    
    return giveResponse(predicted_tag)

# print(checkTag("who are you"))
# print(checkTag("bye"))
# print(checkTag("what's the weather today"))