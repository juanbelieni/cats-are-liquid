import spacy
import re
from collections import Counter

nlp = spacy.load("pt_core_news_md")


def generate_questions(text):
    text = re.sub(r"\[\d+\]", "", text)
    doc = nlp(text)

    questions = []
    entities = Counter(
        [(ent.text, ent[0].morph, ent.label_) for ent in doc.ents]
    ).most_common(5)

    for (text, morph, label), _ in entities:
        gender = morph.get("Gender")
        number = morph.get("Number")

        feminine = gender[0] == "Fem" if len(gender) == 1 else False
        plural = number[0] == "Plur" if len(number) == 1 else False

        if plural:
            det = "as" if feminine else "os"
        else:
            det = "a" if feminine else "o"

        if label == "PER":
            if plural:
                questions.append(f"Quem foram {text}?")
            else:
                questions.append(f"Quem foi {text}?")
        # if the entity is a location, use "onde está" instead of "o que é"
        # elif label == "LOC":
        # pass
        # if plural:
        #     questions.append(f"Onde estão {det} {text}?")
        # else:
        #     questions.append(f"Onde está {det} {text}?")
        else:
            if plural:
                questions.append(f"Explique o que foram {det} {text}?")
            else:
                questions.append(f"Explique o que foi {det} {text}?")

    return questions
