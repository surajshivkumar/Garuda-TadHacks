from flask import Flask, request,jsonify,render_template
from flask_cors import CORS
import os
from vidCon.videoCon import GetVcon

from werkzeug.utils import secure_filename



app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST','GET'])
def upload_file():
    global file
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify('File successfully uploaded', 200)
    

@app.route('/vcon', methods=['GET'])
def showVcon():
    file = os.listdir('./uploads')[0]
    v = GetVcon(f'./{UPLOAD_FOLDER}/{file}')
    v.read_audio()
    v.transcribe_audio()
    # os.remove(f'./{UPLOAD_FOLDER}/{file}')
    return jsonify({'transcribed':v.vcon_['transcribed']['text']})


@app.route('/analyze', methods=['GET'])
def Analyze():
    return render_template('analyze.html')


    
if __name__ == '__main__':
    app.run(debug=True)
