import os
import requests

api_key = "dbf285c0b717d664cf1e7cff4f3f6f3d05a4bb7e5795c4df2bc1aaa1c3b90266"
url = "https://api.together.xyz/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}


def sendMsg(message):
    with open('data.txt', 'r') as f:
        tuning = f.read()
    
    data = {
        "model": "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        "messages": [{"role": "system", "content": tuning}, {"role": "user", "content": message}]
    }
    response = requests.post(url, headers=headers, json=data)

    return response.json()['choices'][0]['message']['content']
