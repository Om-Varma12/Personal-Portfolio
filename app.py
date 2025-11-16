from flask import Flask, render_template, request, jsonify
from Mybot import sendMsg

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/cert')
def cert():
    return render_template('cert.html')

@app.route('/experience')
def experience():
    return render_template('experience.html')

@app.route('/gradsafe')
def gradsafe():
    return render_template('gradsafe.html')

@app.route('/eduface')
def eduface():
    return render_template('eduface.html')

@app.route('/pennywise')
def pennywise():
    return render_template('pennywise.html')

@app.route('/quirky')
def quirky():
    return render_template('quirky.html')

@app.route('/omnion')
def omnion():
    return render_template('omnion.html')

@app.route('/chaplify')
def chap():
    return render_template('chaplify.html')

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route('/adintelli')
def adintelli():
    return render_template('adintelli.html')

@app.route('/get-tag', methods=['POST'])
def getT():
    data = request.get_json()
    userMsg = data.get('message')

    result = sendMsg(userMsg)

    return jsonify({"msg": result})


@app.template_filter('datetimeformat')
def datetimeformat(value, format='%Y'):
    from datetime import datetime
    return datetime.now().strftime(format)

if __name__ == '__main__':
    app.run(debug=True)
