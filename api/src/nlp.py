import spacy
from spacy.matcher import Matcher
import re
from collections import Counter
import random

nlp = spacy.load("pt_core_news_md")


def generate_questions(text, number_questions):
    matcher = Matcher(nlp.vocab)
    text = re.sub(r"\[\d+\]", "", text)
    doc = nlp(text)


    entities = Counter(
        [(ent.text, ent[0].morph, ent.label_) for ent in doc.ents]
    ).most_common(15)

    # perguntas de Explicar

    questions = []

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
                for (text2, morph2, label2), _ in entities:
                    gender2 = morph2.get("Gender")
                    number2 = morph2.get("Number")

                    feminine2 = gender2[0] == "Fem" if len(gender2) == 1 else False
                    plural2 = number2[0] == "Plur" if len(number2) == 1 else False

                    if plural2:
                        det2 = "as" if feminine2 else "os"
                    else:
                        det2 = "a" if feminine2 else "o"
                    if text != text2:
                        questions.append(f"Qual a relação entre {det} {text} e {det2} {text2}")
            else:
                questions.append(f"Explique o que foi {det} {text}?")
                for (text2, morph2, label2), _ in entities:
                    gender2 = morph2.get("Gender")
                    number2 = morph2.get("Number")

                    feminine2 = gender2[0] == "Fem" if len(gender2) == 1 else False
                    plural2 = number2[0] == "Plur" if len(number2) == 1 else False

                    if plural2:
                        det2 = "as" if feminine2 else "os"
                    else:
                        det2 = "a" if feminine2 else "o"
                    if text != text2:
                        questions.append(f"Qual a relação entre {det} {text} e {det2} {text2}")




    # Perguntas temporais

    meses = [ "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]

    pattern = [{"LOWER": {"IN" : meses}}]
    matcher.add("month", [pattern])

    pattern = [{"LOWER": {"IN" : meses}}, {"LOWER" : "de"}, {"LIKE_NUM":True}]
    matcher.add("month and year", [pattern])

    pattern = [{"LIKE_NUM":True}, {"LOWER" : "de"}, {"LOWER": {"IN" : meses}}, {"LOWER" : "de"}, {"LIKE_NUM":True}]
    matcher.add("day, month and year", [pattern])

    all_questions = []

    matches = matcher(doc)
    for match_id, start, end in matches:
        string_id = nlp.vocab.strings[match_id]
        span = doc[start:end]
        if string_id == "month and year":
            all_questions.append(f"O que ocorreu em {span.text}?")

    questions_temp = random.sample(all_questions, 15)

    for i in range(0, len(questions_temp)):
        questions.append(questions_temp[i])

    selected_questions = random.sample(questions, number_questions)

    return selected_questions


with open("../../../../referencias/textos.txt", "r") as f:
    text = f.read()
print(generate_questions(text, 3))


