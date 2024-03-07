import sys
import vcon
import os
import whisper
from io import BytesIO
import jose.utils
import jose.jws
import jose.jwe


class GetVcon:
    def __init__(self,recordingName) -> None:
        self.caller = "+18881234567"
        self.called = "1234"
        self.recordingName = recordingName
        self.model = whisper.load_model("base")
        self.vcon_ = {}
    
    def read_audio(self):
        with open(self.recordingName, 'rb') as file_handle:
            self.recording_bytes = file_handle.read()
        self.encoded_bytes = jose.utils.base64url_encode(self.recording_bytes).decode('utf-8')

    
    def transcribe_audio(self):
        decoded_body = jose.utils.base64url_decode(bytes(self.encoded_bytes, 'utf-8'))
        tmp_file = open("./vidCon/_temp_file", 'wb')
        tmp_file.write(decoded_body)
        tmp_file.close()
        result = self.model.transcribe("./vidCon/_temp_file", fp16=False, verbose=True)
        os.remove("./vidCon/_temp_file")
        self.vcon_['transcribed'] = result
        
    
        
        
        
        
        
        

        
        
        

