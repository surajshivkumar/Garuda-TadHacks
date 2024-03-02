# TadHack 2024 - Data Minimization

![Tadhack logo](./src/static/images/Logo.png)

# Goals 🚀

- <b>Best Redaction</b>: Take the series of vCons we give you, and remove all the personal identifiable information (PII). Extra points for delivering it in the form of a conserver link.
- <b>Best Detection</b>: Take the series of vCons we give you, and list all the personal identifiable information. Extra points for delivering it in the form of a conserver link.

### Install all the requirements

```bash
pip install -r requirements.txt
```

### Core Idea🔋:

- Given the body of text we have to
  - Identify personal information which can be in the form of
    - Names
    - Address
    - Emails
    - Phone numbers
  - Redact the information found
    - For the identified information we have replace it with a `[REDACTED]` tag.
    - The audio thus created would be either
      - Beeped out
      - Silenced
      - Cut out with a small delay

### Proposed solution

The problem discussed is a well solved problem in the are of Natural Language Processing (NLP) known as [Named Entity Recognition](https://en.wikipedia.org/wiki/Named-entity_recognition) - NER, for short.

We now approach this by finding a model that is fine tuned to perform NER on human conversations specifically and use that for the identification.

Once identified, we replace the entities with the `[REDACTED]` tag.

### Example :

User prompt

> Hello I am Dana! I want to order a medium pizza. I live on 42nd street you can reach out to me at +1812-987-000 when you are outside. Please send the receipt to dana.white@yahoo.com. Have a nice day!

Redacted output

> Hello I am `[Redacted]`! I want to order a medium pizza. I live on `[Redacted]` you can reach out to me at `[Redacted]` when you are outside. Please send the receipt to `[Redacted]`. Have a nice day!

Apart from some of these obvious entitites there are some other parts that are also PIA.
In this [interesting talk](https://blog.tadsummit.com/2024/02/14/pieter-luitjens/) we find that even information such as :

- Gender ♀️
- Favourite sports team ⚽
- Voice 🔊
- City 🏢
- Religion 🛐
  Is PI. So it is a non-trivial problem to solve for.

### Demo🤖

We create a simple demo application in which we upload a conversation in the form of a .wav or .mp3 file and return a .vcon file that is redacted.

#### How to run the application

```bash
python app.py #launch the flask server
```
