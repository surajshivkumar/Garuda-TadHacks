from pydub import AudioSegment
import re


class SoundScrubber:
    """
    Handles "scrubbing" of private information from sound files.
    """

    def __init__(self, audioFile):
        self.audio = AudioSegment.from_file(audioFile)

    @staticmethod
    def replace_special_characters_with_space(text):
        """Replaces special characters in text with spaces."""
        return re.sub(r"\W|_", " ", text)

    def processEntities(self, entities):
        """Processes entities to extract words to silence."""
        words_to_silence = [i["word"] for i in entities]
        return words_to_silence

    def getWordsToSilence(self, entities):
        """Generates a list of words to be silenced from the audio."""
        words_to_silence = self.processEntities(entities)
        words_to_silence = [
            self.replace_special_characters_with_space(i).split()
            for i in words_to_silence
        ]
        return words_to_silence

    def silenceAudio(self, words_to_silence, transcribed_word_timestamps):
        """Applies silence to specified segments of the audio."""
        silence_segments = []

        for ts in transcribed_word_timestamps:
            normalized_word = ts["word"].strip().lower()
            if any(
                word[0].strip().lower() in normalized_word for word in words_to_silence
            ):
                silence_segments.append((ts["start"] * 1000, ts["end"] * 1000))

        for start, end in silence_segments:
            silence = AudioSegment.silent(duration=end - start)
            self.audio = self.audio[:start] + silence + self.audio[end:]

        outspath = "./audio/redacted.mp3"
        self.audio.export(outspath, format="mp3")
        print(f"Redacted audio saved at {outspath}")
