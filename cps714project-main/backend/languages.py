import googletrans as GT
from flask_sqlalchemy import SQLAlchemy
from db__init import db
from models import LanguageCodeName, PhraseCodeName, Phrases


# uses googletrans==3.1.0a0
# print(GT.LANGUAGES)
# result = GT.translator.translate('MikÃ¤ on nimesi', src='fi', dest='fr')

class Language:
    # def __init__(self, myLanguage):
    #     self.myLanguage = myLanguage

    def list_available_languages(self):
        res = LanguageCodeName.query.with_entities(LanguageCodeName.language_name)
        return [model[0] for model in res]

    def list_available_phrases(self, language, user_id=None):
        my_phrases = {"english": [],
                      "translated": []
                      }
        my_language_code = LanguageCodeName.query.filter_by(language_name=language).all()[0].language_code
        for row in Phrases.query.filter_by(language_code=my_language_code).all():
            phrase_in_english = PhraseCodeName.query.filter_by(phrase_code=row.phrase_code).all()[0].eng_phrase
            phrase_translated = row.phrase_translated
            my_phrases["english"].append(phrase_in_english)
            my_phrases["translated"].append(phrase_translated)

        return my_phrases

    def add_new_language(self, language):
        newLanguage = LanguageCodeName(language_name=language.lower())
        newLanguage.save()
        translate_to = list(GT.LANGUAGES.keys())[list(GT.LANGUAGES.values()).index(language)]
        language_code = LanguageCodeName.query.filter_by(language_name=language).all()[0].language_code

        translator = GT.Translator()
        for row in PhraseCodeName.query.all():
            translated = (translator.translate(row.eng_phrase, dest=translate_to)).text
            user_id = Phrases.query.filter_by(phrase_code=row.phrase_code).all()[0].user_id
            newPhrase = Phrases(phrase_code=row.phrase_code, language_code=language_code, phrase_translated=translated,
                                user_id=user_id)
            newPhrase.save()

    def add_new_phrase(self, phrase, user_id=None):
        newPhraseCode = PhraseCodeName(eng_phrase=phrase)
        db.session.add(newPhraseCode)
        my_phrase_code = PhraseCodeName.query.filter_by(eng_phrase=phrase).all()[0].phrase_code
        translator = GT.Translator()
        for row in LanguageCodeName.query.all():
            if (row.language_name != "english"):
                translate_to = list(GT.LANGUAGES.keys())[list(GT.LANGUAGES.values()).index(row.language_name)]
                translated = (translator.translate(phrase, dest=translate_to)).text
                newPhrase = Phrases(phrase_code=my_phrase_code, language_code=row.language_code, user_id=user_id,
                                    phrase_translated=translated)
                db.session.add(newPhrase)
        db.session.commit()
        pass

    def print_available_languages(self):
        print(GT.LANGUAGES.values())