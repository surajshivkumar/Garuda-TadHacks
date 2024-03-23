import json
import random
from datetime import datetime


fileformats = {".mp3": "audio", ".wav": "audio", ".docx": "document", ".txt": "SMS"}


class InitiateVcon:
    def __init__(
        self,
        vconPath="./vidCon/vcon.json",
        topic="Technical Support Call",
        deviceUsed="Smartphone",
        networkType="VoIP",
        role="customer",
        identifier="customer123@email.com",
        displayName="Alice Johnson",
        location="London, UK",
        timestamp="2024-03-15T10:00:05Z",
        speaker="agent456@support.com",
        contentType="audio",
        content="Hello, this is Bob from Tech Support",
        timestamp_analysis=None,
        speaker_analysis="agent456@support.com",
        text="Hello, this is Bob from Tech Support",
        certificate=[],
        signature="digital-signature-value",
        algorithm="SHA-256",
    ):
        self.json_data = self.read_json_file(vconPath)
        self.set_default_id()
        self.createConvId(".mp3")
        self.set_meta_data(topic, deviceUsed, networkType)
        self.set_participants_data(role, identifier, displayName, location)
        self.set_dialog_data(timestamp, speaker, contentType, content)
        timestamp_analysis = self.get_time_stamp()
        self.set_analysis_date(timestamp_analysis, speaker_analysis, text)
        self.set_certificate(certificate)
        self.set_tamperprotection(signature, algorithm)

        print(self.json_data["analysis"])

    def set_default_id(self):
        self.json_data["vConVersion"] = "1.0"

    def get_time_stamp(self):
        current_datetime = datetime.now()
        date_part = current_datetime.strftime("%Y%m%d")
        hour_part = current_datetime.strftime("%H%M%S")
        random_code = f"{date_part}-{hour_part}"
        print(random_code)
        return random_code

    def set_certificate(self, certificate):
        self.json_data["certifications"] = certificate

    def set_tamperprotection(self, signature, algorithm):
        self.json_data["tamperProtection"]["signature"] = signature
        self.json_data["tamperProtection"]["algorithms"] = algorithm

    def set_certificate(self, certificate):
        self.json_data["certifications"] = certificate

    def set_tamperprotection(self, signature, algorithm):
        self.json_data["tamperProtection"]["signature"] = signature
        self.json_data["tamperProtection"]["algorithms"] = algorithm

    def set_analysis_date(self, timestamp_analysis, speaker_analysis, text):
        self.json_data["analysis"]["transcriptions"][0][
            "timestamp"
        ] = timestamp_analysis
        self.json_data["analysis"]["transcriptions"][0]["speaker"] = speaker_analysis
        self.json_data["analysis"]["transcriptions"][0]["text"] = text

    def set_meta_data(self, topic, network, device):
        self.json_data["metaData"]["topic"] = topic
        self.json_data["metaData"]["deviceUsed"] = network
        self.json_data["metaData"]["networkType"] = device

    def set_participants_data(self, role, identifier, displayName, location):
        self.json_data["participants"][0]["role"] = role
        self.json_data["participants"][0]["identifier"] = identifier
        self.json_data["participants"][0]["displayName"] = displayName
        self.json_data["participants"][0]["location"] = location

    def set_dialog_data(self, timestamp, speaker, contentType, content):
        self.json_data["dialog"][0]["timestamp"] = timestamp
        self.json_data["dialog"][0]["speaker"] = speaker
        self.json_data["dialog"][0]["contentType"] = contentType
        self.json_data["dialog"][0]["content"] = content

    def read_json_file(self, file_path):
        with open(file_path, "r") as file:
            data = json.load(file)
            return data

    def createUniqueID(self):
        current_datetime = datetime.now()
        date_part = current_datetime.strftime("%Y%m%d")
        hour_part = current_datetime.strftime("%H%M%S")
        random_number = random.randint(100000, 999999)
        random_code = f"conv-{date_part}-{hour_part}-{random_number}"
        return random_code

    def createConvId(self, file_format):
        unique_id = self.createUniqueID()
        self.json_data["conversationID"] = fileformats.get(file_format) + unique_id
