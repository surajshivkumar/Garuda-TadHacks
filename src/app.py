from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
from vidCon.vcon_class import InitiateVcon
from vidCon.videoCon import GetVcon
from vidCon.NER import PrivacyFilter
from vidCon.SoundScrubber import SoundScrubber
from threading import Lock
from datetime import datetime
from werkzeug.utils import secure_filename

from vidCon.SentimentAnalyzer import SentimentAnalyzer

from numba import config

AUDIO_FILES_DIR = os.path.join(os.getcwd(), "uploads")
config.THREADING_LAYER = "workqueue"
# config.THREADING_LAYER = "tbb"


app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/")
@app.route("/home")
def home():
    return render_template("index.html")


@app.route("/upload", methods=["POST", "GET"])
def upload_file():
    global file
    print("File")
    # print(request.files["file"])
    # if "file" not in request.files:
    #     return "No file part", 400
    file = request.files["file"]
    print(file, file.filename)
    # if file.filename == "":
    #     return "No selected file", 400
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        return jsonify("File successfully uploaded", 200)


@app.route("/vcon", methods=["GET"])
def showVcon():
    pass
    # os.remove(f'./{UPLOAD_FOLDER}/{file}')
    # return jsonify({"transcribed": v.vcon_["transcribed"]["text"]})


@app.route("/analyze", methods=["GET", "POST"])
def Analyze():
    # with lock:
    vCon = InitiateVcon()
    audio_file_name = os.path.join(
        app.config["UPLOAD_FOLDER"], os.listdir("./uploads")[0]
    )
    vcon_processor = GetVcon(audio_file_name)
    vcon_processor.read_audio()
    vcon_processor.decode_audio()
    vcon_processor.writeTempFile()
    vcon_processor.transcribe_audio()

    transcribed_text = vcon_processor.vcon_["transcription"]["transcribed_text"]
    transcribed_timestamps = vcon_processor.vcon_["transcription"][
        "transcribed_word_timestamps"
    ]

    privacy_filter = PrivacyFilter()
    entities = privacy_filter.getEntities(transcribed_text)
    redacted_text = privacy_filter.redact_words(text=transcribed_text)
    sound_scrubber = SoundScrubber(audio_file_name)
    words_to_silence = sound_scrubber.getWordsToSilence(entities)
    words_to_silence = [j for i in words_to_silence for j in i]
    sound_scrubber.silenceAudio(words_to_silence, transcribed_timestamps)
    print("Processing complete. Check the output audio file for redacted content.")

    dt = datetime.now()
    sA = SentimentAnalyzer()
    sentiment = sA.analyze_sentiment(transcribed_text)[0]
    normal_form = dt.strftime("%Y-%m-%d %H:%M:%S.%f")
    
    
    vCon.json_data["analysis"]["redaction"] = redacted_text
    vCon.json_data["dialog"][0]["timestamp"] = normal_form
    vCon.json_data["dialog"][0]["content"] = vcon_processor.encoded_bytes
    vCon.set_analysis_date(
        speaker_analysis=None,
        text=transcribed_text,
        timestamp_analysis=transcribed_timestamps,
    )
    vCon.json_data["analysis"]["sentiment"][0]["sentiment"] = sentiment['label']
    vCon.json_data["analysis"]["sentiment"][0]["sentimentScore"] = sentiment['score']
    vCon.json_data["analysis"]["conversation summary"] = "A person is introducing himself, stating his name, address, and phone number."

    return jsonify(vCon.json_data)


@app.route("/uploads/<filename>")
def serve_audio(filename):
    return send_from_directory(AUDIO_FILES_DIR, filename)


if __name__ == "__main__":
    app.run(debug=True, port=5000,threaded=False)
