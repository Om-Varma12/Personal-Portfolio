import json
import string
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Load data
with open('messages.json', 'r') as f:
    data = json.load(f)

# Prepare training data
x = []
y = []

for intent in data['intents']:
    for pattern in intent['patterns']:
        cleaned = pattern.translate(str.maketrans('', '', string.punctuation)).lower()
        x.append(cleaned)
        y.append(intent['tag'])


vectorizer = TfidfVectorizer()
X_vectors = vectorizer.fit_transform(x)


X_train, X_test, y_train, y_test = train_test_split(X_vectors, y, test_size=0.2, random_state=42)


model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))


joblib.dump(model, "rf_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("Training complete and model saved.")
