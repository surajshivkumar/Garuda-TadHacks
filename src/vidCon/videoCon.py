import sys
import vcon
import os
import whisper
from io import BytesIO
import jose.utils
import jose.jws
import jose.jwe


class GetVcon:
    """Handles operations related to voice communications."""

    def __init__(self, recordingName) -> None:
        self.caller = "+18881234567"
        self.called = "1234"
        self.recordingName = recordingName
        self.model = whisper.load_model("base")
        self.vcon_ = {}

    def read_audio(self):
        """Reads and encodes the audio file."""
        with open(self.recordingName, "rb") as file_handle:
            self.recording_bytes = file_handle.read()
        self.encoded_bytes = jose.utils.base64url_encode(self.recording_bytes).decode(
            "utf-8"
        )

    def decode_audio(self):
        """Decodes the audio file for processing."""
        decoded_body = jose.utils.base64url_decode(bytes(self.encoded_bytes, "utf-8"))
        self.decoded_bytes = decoded_body

    def writeTempFile(self):
        """Writes the decoded audio to a temporary file."""
        tmp_file = open("./vidCon/_temp_file", "wb")
        tmp_file.write(self.decoded_bytes)
        tmp_file.close()
        self.tempFile = "./vidCon/_temp_file"

    def transcribe_audio(self):
        """Transcribes the audio file and stores the transcription."""
        self.vcon_["transcription"] = {}
        outs = self.model.transcribe(
            self.tempFile, fp16=False, word_timestamps=True, language="English"
        )
        self.vcon_["transcription"]["transcribed_text"] = outs["text"]
        self.vcon_["transcription"]["transcribed_word_timestamps"] = outs["segments"][
            0
        ]["words"]
