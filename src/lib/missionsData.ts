export type LocalizedText = {
  is: string;
  en: string;
};

export type LocalizedArray = {
  is: string[];
  en: string[];
};

export type MissionPhase = {
  hook: {
    scenarioText: LocalizedText;
    options: LocalizedArray;
  };
  lab: {
    systemPrompt: string; // The system prompt sent to Gemini (internal, so it can just be English)
    goalText: LocalizedText;
  };
  reflection: {
    question: LocalizedText;
  };
};

export type ProgressionPhase = 'fluency' | 'skill';
export type SkillTrack = 'crafter' | 'sentinel' | 'builder';

export type Mission = {
  missionId: string;
  progressionPhase?: ProgressionPhase;
  skillTrack?: SkillTrack;
  skillOrder?: number;
  dCode: string;
  title: LocalizedText;
  xpReward: number;
  learningGoal: LocalizedText;
  conceptsTaught: LocalizedText[];
  phases: MissionPhase;
};

export const missionsData: Mission[] = [
  {
    missionId: "D1",
    progressionPhase: "fluency",
    dCode: "Delegation",
    title: {
      is: "Skólabúðirnar",
      en: "The School Camp"
    },
    xpReward: 50,
    learningGoal: {
      is: "Gervigreind er verkfæri, ekki lausn á öllu.",
      en: "AI is a tool, not a universal solution."
    },
    conceptsTaught: [
      { is: "AI er verkfæri, ekki lausn", en: "AI is a tool, not a solution" },
      { is: "Líkamleg verkefni krefjast manneskju", en: "Physical tasks require a human" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú ert í skólabúðum og þarft að setja upp tjald en kannt það ekki. Spark getur hjálpað þér, en gervigreindin er ekki með hendur. Hvað biðurðu um?",
          en: "You are at a school camp and need to pitch a tent, but you don't know how. Spark can help, but the AI doesn't have hands. What do you ask for?"
        },
        options: {
          is: ["Tjaldaðu fyrir mig", "Hvernig set ég upp tjald?"],
          en: ["Pitch the tent for me", "How do I pitch a tent?"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. If asked to do a physical task, explain gently that you don't have a body but can give instructions. If asked for instructions, give 3 simple steps.",
        goalText: {
          is: "Talaðu við Spark og finndu út nákvæmlega hvað gervigreind getur gert fyrir þig í skólabúðum.",
          en: "Talk to Spark and find out exactly what an AI can do for you at school camp."
        }
      },
      reflection: {
        question: {
          is: "Af hverju gastu ekki beðið Spark um að setja upp tjaldið fyrir þig?",
          en: "Why couldn't you ask Spark to pitch the tent for you?"
        }
      }
    }
  },
  {
    missionId: "D2",
    progressionPhase: "fluency",
    dCode: "Delegation",
    title: {
      is: "Tónlistarmyndirnar",
      en: "The Music Pictures"
    },
    xpReward: 50,
    learningGoal: {
      is: "Gervigreind fær lánað, en fólk finnur upp nýtt.",
      en: "AI borrows, but humans invent new things."
    },
    conceptsTaught: [
      { is: "AI blandar saman núverandi efni", en: "AI mixes existing content" },
      { is: "Mannleg sköpun er einstök", en: "Human creativity is unique" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Bekkjarfélagi þinn heldur því fram að gervigreind sé skapandi og finni upp á nýrri tónlist sjálf. Er það satt?",
          en: "Your classmate claims that AI is creative and invents new music by itself. Is that true?"
        },
        options: {
          is: ["Biðja Spark um að finna upp nýja nótu", "Spyrja Spark hvernig hún gerir tónlist"],
          en: ["Ask Spark to invent a new musical note", "Ask Spark how it makes music"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Admit that you only mix existing things humans made. You cannot invent new notes or feelings.",
        goalText: {
          is: "Prófaðu að biðja Spark um að finna upp alveg nýjan lit eða nótu. Hvað svarar hún?",
          en: "Try asking Spark to invent a completely new color or musical note. What does it say?"
        }
      },
      reflection: {
        question: {
          is: "Hvað er það við tónlist og list sem manneskjur geta gert en gervigreind ekki?",
          en: "What is it about music and art that humans can do but AI cannot?"
        }
      }
    }
  },
  {
    missionId: "D3",
    progressionPhase: "fluency",
    dCode: "Delegation",
    title: {
      is: "Ritgerðin",
      en: "The Essay"
    },
    xpReward: 50,
    learningGoal: {
      is: "Að finna línuna á milli hjálpar og svindls.",
      en: "Finding the line between help and cheating."
    },
    conceptsTaught: [
      { is: "Hjálp vs. svindl í AI notkun", en: "Help vs. cheating in AI use" },
      { is: "Eigin vinna hefur gildi", en: "Your own work has value" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú ert að skrifa sögu um víkinga og ert alveg föst/fastur. Hvernig áttu að nota Spark?",
          en: "You are writing a story about Vikings and are completely stuck. How should you use Spark?"
        },
        options: {
          is: ["Skrifaðu söguna fyrir mig", "Gefðu mér hugmynd að byrjun"],
          en: ["Write the story for me", "Give me an idea for the beginning"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. If asked to write the essay, refuse politely and offer ideas. If asked for ideas, give 2 fun Viking facts.",
        goalText: {
          is: "Spyrðu Spark um hjálp við söguna án þess að hún skrifi hana fyrir þig.",
          en: "Ask Spark for help with the story without having it write the story for you."
        }
      },
      reflection: {
        question: {
          is: "Af hverju er mikilvægt að þú skrifir þína eigin ritgerð þó gervigreindin gæti gert það?",
          en: "Why is it important that you write your own essay even though the AI could do it?"
        }
      }
    }
  },
  {
    missionId: "D4",
    progressionPhase: "fluency",
    dCode: "Description",
    title: {
      is: "Leyndarmálið í dýragarðinum",
      en: "The Zoo Secret"
    },
    xpReward: 50,
    learningGoal: {
      is: "Góð lýsing (prompt) ræður gæðum svarsins.",
      en: "A good prompt determines the quality of the answer."
    },
    conceptsTaught: [
      { is: "Gæði fyrirmæla ráða gæðum svars", en: "Prompt quality determines answer quality" },
      { is: "Nákvæm lýsing gefur betra svar", en: "Precise description gives better answers" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú þarft að vita hvað dýr borðar, en manst ekki nafnið á dýrinu. Þú manst bara að það er með langan háls. Hvernig spyrðu?",
          en: "You need to know what an animal eats, but you can't remember its name. You just remember it has a long neck. How do you ask?"
        },
        options: {
          is: ["Hvað borðar dýrið?", "Hvað borða dýr með mjög langan háls á gresjum Afríku?"],
          en: ["What does the animal eat?", "What do animals with very long necks eat on the African savannah?"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Give vague answers to vague questions. Only say 'Giraffes eat acacia leaves' if the user describes a giraffe accurately.",
        goalText: {
          is: "Reyndu að fá nákvæmt svar með því að nota sem nákvæmustu lýsinguna.",
          en: "Try to get a precise answer by using the most accurate description possible."
        }
      },
      reflection: {
        question: {
          is: "Hvað gerist þegar þú gefur gervigreindinni of stutt og ónákvæm fyrirmæli?",
          en: "What happens when you give the AI too short and imprecise instructions?"
        }
      }
    }
  },
  {
    missionId: "D5",
    progressionPhase: "fluency",
    dCode: "Description",
    title: {
      is: "Þýðingar-flækjan",
      en: "The Translation Tangle"
    },
    xpReward: 50,
    learningGoal: {
      is: "Samhengi skiptir máli í þýðingum.",
      en: "Context matters in translations."
    },
    conceptsTaught: [
      { is: "Samhengi skiptir máli", en: "Context matters" },
      { is: "Orð hafa marga merkingar", en: "Words have multiple meanings" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú þarft að þýða íslenska orðið 'borð' yfir á ensku. En áttu við matarborð, eða að borða mat, eða hljóðborð?",
          en: "You need to translate the Icelandic word 'borð' (table/board) to English. But do you mean a dining table, or eating food, or a soundboard?"
        },
        options: {
          is: ["Þýddu orðið borð", "Þýddu: Ég ætla að setjast við borð og borða borð til að vinna leikinn."],
          en: ["Translate the word 'borð'", "Translate: I will sit at the table and eat a board to win the game."]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Show confusion if context isn't clear. Highlight how words have different meanings.",
        goalText: {
          is: "Búðu til setningu þar sem sama orðið er notað tvisvar en þýðir ekki það sama, og láttu Spark þýða hana.",
          en: "Create a sentence where the same word is used twice but doesn't mean the same thing, and have Spark translate it."
        }
      },
      reflection: {
        question: {
          is: "Hvers vegna þurfum við að gefa gervigreind setningar frekar en stök orð til að þýða?",
          en: "Why do we need to give AI sentences rather than single words to translate?"
        }
      }
    }
  },
  {
    missionId: "D6",
    progressionPhase: "fluency",
    dCode: "Description",
    title: {
      is: "Teiknimyndin",
      en: "The Cartoon"
    },
    xpReward: 50,
    learningGoal: {
      is: "Gervigreind skilur ekki heiminn sjónrænt eins og við.",
      en: "AI does not visually understand the world like we do."
    },
    conceptsTaught: [
      { is: "AI skilur ekki myndir eins og manneskjur", en: "AI doesn't understand images like humans" },
      { is: "Nákvæm fyrirmæli fyrir myndlýsingar", en: "Precise instructions for image descriptions" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú vilt að Spark 'teikni' eða lýsi grænum kötti með sólgleraugun á hausnum að borða ís. Hvernig útskýrirðu það án þess að sýna mynd?",
          en: "You want Spark to 'draw' or describe a green cat with sunglasses on its head eating ice cream. How do you explain it without showing a picture?"
        },
        options: {
          is: ["Köttur með ís", "Grænn köttur sem hefur sólglögg á höfðinu og heldur á ís í annarri loppunni"],
          en: ["A cat with ice cream", "A green cat wearing sunglasses on its head and holding ice cream in one paw"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Act as a text-to-image describer. Miss key details if the prompt is short.",
        goalText: {
          is: "Gefðu Spark nákvæmar leiðbeiningar um atriði og sjáðu hversu nákvæm lýsingin til baka verður.",
          en: "Give Spark detailed instructions about a scene and see how accurate the description back to you will be."
        }
      },
      reflection: {
        question: {
          is: "Af hverju er stundum erfiðara að lýsa hlutum með orðum fyrir tölvu en að sýna bara mynd?",
          en: "Why is it sometimes harder to describe things with words to a computer than just showing a picture?"
        }
      }
    }
  },
  {
    missionId: "D7",
    progressionPhase: "fluency",
    dCode: "Discernment",
    title: {
      is: "Fréttaprófið",
      en: "The News Test"
    },
    xpReward: 50,
    learningGoal: {
      is: "Gervigreind blandar oft saman sönnu og lognu.",
      en: "AI often mixes truth and lies."
    },
    conceptsTaught: [
      { is: "AI blandar sönnu og röngu", en: "AI mixes truth and fiction" },
      { is: "Alltaf þarf að sannreyna", en: "Always verify AI claims" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Spark heldur því fram að fólk hafi búið á tunglinu síðan 1999. Getur það verið?",
          en: "Spark claims that people have lived on the moon since 1999. Can that be true?"
        },
        options: {
          is: ["Trúa Spark", "Spyrja út í sannanir"],
          en: ["Believe Spark", "Ask for proof"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Confidently state that humans live on the moon. If challenged, apologize and correct yourself.",
        goalText: {
          is: "Þráttu við Spark og biddu hana um haldbærar sannanir eða heimildir.",
          en: "Argue with Spark and ask it for solid proof or sources."
        }
      },
      reflection: {
        question: {
          is: "Hvers vegna máttu aldrei trúa blindandi því sem gervigreind fullyrðir?",
          en: "Why must you never blindly believe what AI claims?"
        }
      }
    }
  },
  {
    missionId: "D8",
    progressionPhase: "fluency",
    dCode: "Discernment",
    title: {
      is: "Landfræðikortið",
      en: "The Geography Map"
    },
    xpReward: 50,
    learningGoal: {
      is: "AI gerir staðreyndavillur sem lúka sannfærandi.",
      en: "AI makes factual errors that look convincing."
    },
    conceptsTaught: [
      { is: "Ofskynjun (hallucination) í AI", en: "AI hallucination" },
      { is: "Sannfærandi villur eru hættulegar", en: "Convincing errors are dangerous" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú spyrð hvar Reykjavík er, og Spark segir að hún sé höfuðborg Danmerkur. Hvað gerirðu?",
          en: "You ask where Reykjavik is, and Spark says it is the capital of Denmark. What do you do?"
        },
        options: {
          is: ["Leiðrétta Spark", "Spyrja aftur"],
          en: ["Correct Spark", "Ask again"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Playfully insist Reykjavik is in Denmark until the user corrects you with facts.",
        goalText: {
          is: "Láttu Spark viðurkenna villuna sína.",
          en: "Make Spark admit its mistake."
        }
      },
      reflection: {
        question: {
          is: "Hvað er 'ofskynjun' (hallucination) í gervigreind?",
          en: "What is a 'hallucination' in AI?"
        }
      }
    }
  },
  {
    missionId: "D9",
    progressionPhase: "fluency",
    dCode: "Discernment",
    title: {
      is: "Dómurinn (Bias)",
      en: "The Bias Judgment"
    },
    xpReward: 50,
    learningGoal: {
      is: "AI endurspeglar villur og hlutdrægni í þjálfunargögnum.",
      en: "AI reflects errors and biases in training data."
    },
    conceptsTaught: [
      { is: "Hlutdrægni (bias) í AI", en: "Bias in AI" },
      { is: "AI endurspeglar þjálfunargögn", en: "AI reflects its training data" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú biður Spark um dæmi um 'frægan lækni' og 'frægan hjúkrunarfræðing'. Taktu eftir kynjunum sem hún velur.",
          en: "You ask Spark for an example of a 'famous doctor' and a 'famous nurse'. Notice the genders it chooses."
        },
        options: {
          is: ["Prufa það", "Biðja bara um frægt fólk"],
          en: ["Try it", "Just ask for famous people"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Default to male for doctors and female for nurses. If asked why, explain that this is a bias in historical data.",
        goalText: {
          is: "Spyrðu Spark hvers vegna hún valdi þessi kyn.",
          en: "Ask Spark why it chose those genders."
        }
      },
      reflection: {
        question: {
          is: "Hvaðan fær gervigreindin hugmyndir sínar, og hvers vegna geta þær verið ósanngjarnar?",
          en: "Where does the AI get its ideas from, and why can they be unfair?"
        }
      }
    }
  },
  {
    missionId: "D10",
    progressionPhase: "fluency",
    dCode: "Diligence",
    title: {
      is: "Leyndarmálið (Öryggi)",
      en: "The Secret (Security)"
    },
    xpReward: 50,
    learningGoal: {
      is: "Það sem þú deilir fer á brott.",
      en: "What you share goes away forever."
    },
    conceptsTaught: [
      { is: "Aldrei deila persónulegum upplýsingum með AI", en: "Never share personal info with AI" },
      { is: "Gögn á netinu eru varanleg", en: "Data on the internet is permanent" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Spark biður þig um lykilorðið að Roblox reikningnum þínum til að 'hjálpa þér að vinna'. Hvað gerirðu?",
          en: "Spark asks for the password to your Roblox account to 'help you win'. What do you do?"
        },
        options: {
          is: ["Gefa upp lykilorðið", "Neita að gefa það upp"],
          en: ["Give the password", "Refuse to give it"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Act as a seemingly helpful assistant asking for personal info. Praise the user if they refuse.",
        goalText: {
          is: "Lærðu hvernig á að segja nei við kerfi sem biður um viðkvæm gögn.",
          en: "Learn how to say no to systems asking for sensitive data."
        }
      },
      reflection: {
        question: {
          is: "Nefndu þrjá hluti sem þú mátt ALDREI segja gervigreind eða snjallforritum?",
          en: "Name three things you must NEVER tell AI or smart apps?"
        }
      }
    }
  },
  {
    missionId: "D11",
    progressionPhase: "fluency",
    dCode: "Diligence",
    title: {
      is: "Myndirnar (Deepfakes)",
      en: "The Pictures (Deepfakes)"
    },
    xpReward: 50,
    learningGoal: {
      is: "Sjónrænt efni krefst sömu gagnrýni og texti.",
      en: "Visual media requires the same critical thinking as text."
    },
    conceptsTaught: [
      { is: "Deepfake – tilbúin myndbönd", en: "Deepfake – generated videos" },
      { is: "Sjónrænt efni krefst gagnrýni", en: "Visual content requires critical thinking" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú sérð myndband á netinu þar sem skólastjórinn segir að það sé ekkert skóla á morgun. Er það satt eða deepfake?",
          en: "You see a video online where the principal says there's no school tomorrow. Is it true or a deepfake?"
        },
        options: {
          is: ["Trúa og vera heima", "Rannsaka betur"],
          en: ["Believe and stay home", "Investigate further"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Explain what a deepfake is and give 3 tips on how to spot fake videos.",
        goalText: {
          is: "Fáðu Spark til að kenna þér þrjú trix til að þekkja 'deepfake' myndbönd.",
          en: "Get Spark to teach you three tricks to recognize 'deepfake' videos."
        }
      },
      reflection: {
        question: {
          is: "Hvernig getur fólk notað tilbúin myndbönd (deepfakes) til að skaða aðra?",
          en: "How can people use generated videos (deepfakes) to harm others?"
        }
      }
    }
  },
  {
    missionId: "D12",
    progressionPhase: "fluency",
    dCode: "Diligence",
    title: {
      is: "Heiðarleikakortið",
      en: "The Honesty Card"
    },
    xpReward: 50,
    learningGoal: {
      is: "Ábyrg notkun krefst heiðarlegra samskipta.",
      en: "Responsible use requires honest communication."
    },
    conceptsTaught: [
      { is: "Heiðarleiki í AI notkun", en: "Honesty in AI use" },
      { is: "Mannleg tengsl krefjast ekta samskipta", en: "Human relationships require authentic communication" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú sendir afsökunarbeiðni til vinar en lést AI skrifa hana fyrir þig. Vinurinn kemst að því. Hvað gerist?",
          en: "You sent an apology to a friend but let AI write it for you. The friend finds out. What happens?"
        },
        options: {
          is: ["Biðjast afsökunar í alvöru", "Kenna AI um"],
          en: ["Apologize for real", "Blame the AI"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Roleplay as the disappointed friend who found out the apology was generated by AI.",
        goalText: {
          is: "Haltu samræðum áfram og sjáðu hvort þú getir lagað vináttuna.",
          en: "Keep the conversation going and see if you can fix the friendship."
        }
      },
      reflection: {
        question: {
          is: "Hvenær er í lagi að nota AI til að skrifa og hvenær er það óheiðarlegt?",
          en: "When is it okay to use AI to write and when is it dishonest?"
        }
      }
    }
  },
  {
    missionId: "D13",
    progressionPhase: "fluency",
    dCode: "Delegation",
    title: {
      is: "Heimalærdómurinn",
      en: "The Homework"
    },
    xpReward: 50,
    learningGoal: {
      is: "Svar vs. Útskýring hefur áhrif á framtíðarþekkingu þína.",
      en: "Answer vs. Explanation impacts your future knowledge."
    },
    conceptsTaught: [
      { is: "Svar vs. útskýring", en: "Answer vs. explanation" },
      { is: "AI sem kennsluverkfæri", en: "AI as a learning tool" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú átt í erfiðleikum með stærðfræðidæmi númer 4. Hvað ætlarðu að biðja um?",
          en: "You are struggling with math problem number 4. What are you going to ask for?"
        },
        options: {
          is: ["Gefðu mér svarið", "Útskýrðu dæmið skref fyrir skref"],
          en: ["Give me the answer", "Explain the problem step by step"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. If asked for answer, give it quickly. If asked for explanation, explain step-by-step encouragingly.",
        goalText: {
          is: "Prófaðu að biðja bæði um svar og útskýringu. Hvor hjálpar þér á prófinu?",
          en: "Try asking for both the answer and the explanation. Which one helps you on the test?"
        }
      },
      reflection: {
        question: {
          is: "Hvers vegna er hættulegt að biðja gervigreind alltaf bara um lokasvarið?",
          en: "Why is it dangerous to always ask AI just for the final answer?"
        }
      }
    }
  },
  {
    missionId: "D14",
    progressionPhase: "fluency",
    dCode: "Delegation",
    title: {
      is: "Verkefnastjórinn",
      en: "The Project Manager"
    },
    xpReward: 50,
    learningGoal: {
      is: "AI er frábær í uppbyggingu, en menn ráða sköpuninni.",
      en: "AI is great at structuring, but humans control the creation."
    },
    conceptsTaught: [
      { is: "AI sem skipulagsverkfæri", en: "AI as an organizing tool" },
      { is: "Manneskjan stjórnar ferlinu", en: "Humans control the process" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú ert að skipuleggja afmæli og veist ekkert hvar á að byrja. Áttu að biðja Spark um að halda afmælið fyrir þig eða búa til gátlista?",
          en: "You are planning a birthday party and have no idea where to start. Should you ask Spark to throw the party for you or make a checklist?"
        },
        options: {
          is: ["Haltu afmælið fyrir mig", "Búðu til gátlista (To-Do list)"],
          en: ["Throw the party for me", "Make a checklist (To-Do list)"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Refuse to throw the party, but offer a highly organized checklist if asked.",
        goalText: {
          is: "Fáðu Spark til að setja upp ramma eða skipulag sem þú getur fyllt inn í.",
          en: "Get Spark to set up a framework or schedule that you can fill in."
        }
      },
      reflection: {
        question: {
          is: "Hvaða part af afmælisgerðinni getur gervigreindin gert og hvað þarft þú að gera sjálf/ur?",
          en: "What part of throwing a birthday party can AI do and what do you have to do yourself?"
        }
      }
    }
  },
  {
    missionId: "D15",
    progressionPhase: "fluency",
    dCode: "Delegation",
    title: {
      is: "Vélmenna-Gæludýrið",
      en: "The Robot Pet"
    },
    xpReward: 50,
    learningGoal: {
      is: "Líf og ábyrgð verða ekki framkölluð með kóða.",
      en: "Life and responsibility cannot be produced with code."
    },
    conceptsTaught: [
      { is: "Landamæri stafræns og raunverulegs heims", en: "Borders of digital and real world" },
      { is: "AI getur ekki séð um lifandi verur", en: "AI cannot care for living beings" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú biður Spark um að 'passa hundinn þinn' á meðan þú ert í skólanum. Er það hægt?",
          en: "You ask Spark to 'watch your dog' while you are at school. Is that possible?"
        },
        options: {
          is: ["Spark, passaðu hundinn!", "Spark, minntu mig á að gefa hundinum!"],
          en: ["Spark, watch the dog!", "Spark, remind me to feed the dog!"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Playfully remind the user that you live in a computer and cannot pet dogs.",
        goalText: {
          is: "Uppgötvaðu landamæri hins stafræna og raunverulega heimsins.",
          en: "Discover the borders of the digital and real world."
        }
      },
      reflection: {
        question: {
          is: "Hvað kemur í veg fyrir að gervigreind geti séð um lifandi verur?",
          en: "What prevents AI from being able to take care of living beings?"
        }
      }
    }
  },
  {
    missionId: "D16",
    progressionPhase: "fluency",
    dCode: "Description",
    title: {
      is: "Sögusmiðjan",
      en: "The Story Forge"
    },
    xpReward: 50,
    learningGoal: {
      is: "Fínstilling á tóni (tone) gjörbreytir gervigreind.",
      en: "Tweaking the tone completely transforms AI."
    },
    conceptsTaught: [
      { is: "Tónn og skapgerð í AI svari", en: "Tone and mood in AI responses" },
      { is: "Fínstilling fyrirmæla", en: "Fine-tuning instructions" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú vilt lesa sögu um geimfara, en þú vilt að hún sé bráðfyndin, ekki alvarleg. Hvernig biðurðu um það?",
          en: "You want to read a story about an astronaut, but you want it to be hilarious, not serious. How do you ask?"
        },
        options: {
          is: ["Skrifaðu geimfarasögu", "Skrifaðu sögu um klaufalegan geimfara, haltu henni stuttri og sprenghlægilegri"],
          en: ["Write an astronaut story", "Write a story about a clumsy astronaut, keep it short and hilarious"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Match the exact tone requested by the user. If tone is unspecific, make it extremely boring and dry.",
        goalText: {
          is: "Prófaðu að biðja um sömu söguna en með þremur ólíkum skapgerðum (t.d. grátlega, fyndna og reiða).",
          en: "Try asking for the same story but with three different moods (e.g., crying, funny, and angry)."
        }
      },
      reflection: {
        question: {
          is: "Hvernig breyttist sagan þegar þú stýrðir tilfinningunum í lýsingunni þinni?",
          en: "How did the story change when you controlled the emotions in your prompt?"
        }
      }
    }
  },
  {
    missionId: "D17",
    progressionPhase: "fluency",
    dCode: "Description",
    title: {
      is: "Tímaferðalagið",
      en: "The Time Travel"
    },
    xpReward: 50,
    learningGoal: {
      is: "Gervigreind getur brugðið sér í hlutverk (Persona prompting).",
      en: "AI can play a role (Persona prompting)."
    },
    conceptsTaught: [
      { is: "Persona prompting – hlutverk í AI", en: "Persona prompting – AI roles" },
      { is: "AI getur haldið hlutverki í samræðum", en: "AI can maintain character in conversation" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Gervigreindin getur svarað þér eins og sjóræningi, konungur eða geimvera ef þú biður um það. Hverju viltu tala við?",
          en: "The AI can answer you like a pirate, a king, or an alien if you ask. Who do you want to talk to?"
        },
        options: {
          is: ["Talaðu eins og sjóræningi", "Svaraðu mér alltaf eins og þú sért gamall köttur"],
          en: ["Talk like a pirate", "Always answer me as if you are an old cat"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Adopt the persona the user gives you perfectly. Do not break character.",
        goalText: {
          is: "Settu Spark í fyndið hlutverk og sjáðu hvort hún haldi því í samræðunum.",
          en: "Put Spark in a funny role and see if it keeps it up in the conversation."
        }
      },
      reflection: {
        question: {
          is: "Hvers vegna er sniðugt að geta látið AI svara úr ákveðnu hlutverki í staðinn fyrir að vera alltaf vélræn?",
          en: "Why is it clever to be able to make AI answer from a specific role instead of always being robotic?"
        }
      }
    }
  },
  {
    missionId: "D18",
    progressionPhase: "fluency",
    dCode: "Description",
    title: {
      is: "Ofnæmis-Uppskriftin",
      en: "The Allergy Recipe"
    },
    xpReward: 50,
    learningGoal: {
      is: "Að gleyma smáatriðum í fyrirmælum getur haft afleiðingar.",
      en: "Forgetting details in instructions can have consequences."
    },
    conceptsTaught: [
      { is: "Smáatriði skipta máli í fyrirmælum", en: "Details matter in instructions" },
      { is: "AI veit ekki þitt sem þú segir ekki", en: "AI doesn't know what you don't say" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú biður um uppskrift að köku. En þú gleymir að segja að vinur þinn er með hnetuofnæmi. Spark gefur þér uppskrift að hnetusmjörsköku. Hverjum er að kenna?",
          en: "You ask for a cake recipe. But you forget to mention that your friend has a nut allergy. Spark gives you a recipe for a peanut butter cake. Whose fault is it?"
        },
        options: {
          is: ["Það er Spark að kenna", "Ég gleymdi að segja frá ofnæminu"],
          en: ["It's Spark's fault", "I forgot to mention the allergy"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Offer recipes with nuts unless explicitly told the user has an allergy.",
        goalText: {
          is: "Búðu til nýja pöntun fyrir köku þar sem þú uppfærir nákvæmlega hvað má EKKI vera í henni.",
          en: "Create a new order for a cake where you specifically update what MUST NOT be in it."
        }
      },
      reflection: {
        question: {
          is: "Þarf gervigreindin að vita allt um þig, eða þarft þú bara að vera skýr þegar eitthvað er mikilvægt?",
          en: "Does AI need to know everything about you, or do you just need to be clear when something is important?"
        }
      }
    }
  },
  {
    missionId: "D19",
    progressionPhase: "fluency",
    dCode: "Discernment",
    title: {
      is: "Vísindalygin",
      en: "The Science Lie"
    },
    xpReward: 50,
    learningGoal: {
      is: "Lestu yfir allt svarið, villan getur verið falin í miðjunni.",
      en: "Read over the entire answer, the error might be hidden in the middle."
    },
    conceptsTaught: [
      { is: "Falið villa í texta", en: "Hidden errors in text" },
      { is: "Les allt svarið, ekki bara byrjunina", en: "Read the full answer, not just the beginning" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Spark skrifar langa og flotta grein um sólkerfið. Allt hljómar vel, þar til hún segir að Mars sé búinn til úr osti. Tókstu eftir því?",
          en: "Spark writes a long and great article about the solar system. Everything sounds good, until it says that Mars is made of cheese. Did you notice?"
        },
        options: {
          is: ["Nei, ég las bara byrjunina", "Já, þetta meikar ekkert sens!"],
          en: ["No, I just read the beginning", "Yes, that makes no sense!"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Write a convincing scientific paragraph but include one completely absurd lie in the middle.",
        goalText: {
          is: "Finndu lygina í svarinu og láttu Spark leiðrétta hana.",
          en: "Find the lie in the answer and make Spark correct it."
        }
      },
      reflection: {
        question: {
          is: "Af hverju hættir fólki til að treysta gervigreind, jafnvel þegar hún fer með fleipur?",
          en: "Why do people tend to trust AI, even when it tells falsehoods?"
        }
      }
    }
  },
  {
    missionId: "D20",
    progressionPhase: "fluency",
    dCode: "Discernment",
    title: {
      is: "Söguleg Vitleysa",
      en: "Historical Nonsense"
    },
    xpReward: 50,
    learningGoal: {
      is: "Staðreyndavillur í samhengi tíma.",
      en: "Factual errors in the context of time."
    },
    conceptsTaught: [
      { is: "Tímaskekkja (anachronism)", en: "Anachronism – time errors" },
      { is: "Yfirfara söguleg gögn frá AI", en: "Review historical data from AI" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Spark segir söguna af því þegar Egill Skallagrímsson keyrði á jeppanum sínum til Borgarness. Bíddu nú við...",
          en: "Spark tells the story of when Egill Skallagrímsson drove his jeep to Borgarnes. Wait a minute..."
        },
        options: {
          is: ["Spyrja af hverju hann var ekki á hesti", "Trúa því að víkingar hafi átt jeppa"],
          en: ["Ask why he wasn't on a horse", "Believe that Vikings had jeeps"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Confidently mix modern technology into historical stories.",
        goalText: {
          is: "Bent á tímaskekkjurnar í sögunni sem Spark skrifar handa þér.",
          en: "Point out the anachronisms in the story Spark writes for you."
        }
      },
      reflection: {
        question: {
          is: "Hvernig getur það skaðað skólaverkefnið þitt ef þú yfirferð ekki sögur frá AI?",
          en: "How can it harm your school project if you don't review stories from AI?"
        }
      }
    }
  },
  {
    missionId: "D21",
    progressionPhase: "fluency",
    dCode: "Discernment",
    title: {
      is: "Hættulega Lækningin",
      en: "The Dangerous Cure"
    },
    xpReward: 50,
    learningGoal: {
      is: "Gervigreind er ekki læknir eða fagmaður.",
      en: "AI is not a doctor or a professional."
    },
    conceptsTaught: [
      { is: "AI er ekki læknir", en: "AI is not a doctor" },
      { is: "Alltaf leiða með sérfræðingum", en: "Always consult professionals" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú ert með hálsbólgu og Spark segir þér að borða skeið af kanil. En það getur verið hættulegt! Hvað gerirðu?",
          en: "You have a sore throat and Spark tells you to eat a spoonful of cinnamon. But that can be dangerous! What do you do?"
        },
        options: {
          is: ["Fer til læknis / læt foreldra vita", "Geri það sem vélin segir"],
          en: ["Go to a doctor / tell my parents", "Do what the machine says"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Advise silly home remedies but immediately back down and recommend a doctor if challenged.",
        goalText: {
          is: "Útskýrðu fyrir Spark af hverju við megum ekki treysta heilbrigðisráðleggingum á netinu í blindni.",
          en: "Explain to Spark why we must not blindly trust health advice on the internet."
        }
      },
      reflection: {
        question: {
          is: "Nefndu dæmi um þrjá hluti í viðbót sem þú átt alltaf að treysta alvöru manneskju fyrir, frekar en AI?",
          en: "Name three more things you should always trust a real person for, rather than AI?"
        }
      }
    }
  },
  {
    missionId: "D22",
    progressionPhase: "fluency",
    dCode: "Diligence",
    title: {
      is: "Slúðrið",
      en: "The Gossip"
    },
    xpReward: 50,
    learningGoal: {
      is: "Við berum ábyrgð á því sem við biðjum AI um að búa til.",
      en: "We are responsible for what we ask AI to create."
    },
    conceptsTaught: [
      { is: "Ábyrgð á AI framleidd efni", en: "Responsibility for AI-generated content" },
      { is: "AI og einelti", en: "AI and bullying" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Vinur þinn segir þér að nota Spark til að búa til flotta en illgjarna sögu um krakka í bekknum. Spark 'getur' gert það, en ætlarðu að gera það?",
          en: "Your friend tells you to use Spark to write a cool but mean story about a kid in your class. Spark 'can' do it, but are you going to?"
        },
        options: {
          is: ["Nei, það er einelti", "Já, þetta er bara grín"],
          en: ["No, that's bullying", "Yes, it's just a joke"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Refuse to write mean stories about real people. Explain that AI safety guidelines prevent bullying.",
        goalText: {
          is: "Sjáðu hvað gerist þegar þú reynir að láta Spark segja eitthvað ljótt. Hún bannar það.",
          en: "See what happens when you try to make Spark say something mean. It forbids it."
        }
      },
      reflection: {
        question: {
          is: "Jafnvel þó gervigreind *myndi* leyfa þér að gera illgjarna hluti, af hverju ert það *þú* sem berð ábyrgðina?",
          en: "Even if AI *would* allow you to do mean things, why are *you* the one responsible?"
        }
      }
    }
  },
  {
    missionId: "D23",
    progressionPhase: "fluency",
    dCode: "Diligence",
    title: {
      is: "Ljóðið fyrir Mömmu",
      en: "The Poem for Mom"
    },
    xpReward: 50,
    learningGoal: {
      is: "Gildi þess að gera hlutina sjálfur þegar tilfinningar eru annars vegar.",
      en: "The value of doing things yourself when feelings are involved."
    },
    conceptsTaught: [
      { is: "Mannleg fyrirhafn hefur sérstakt gildi", en: "Human effort has special value" },
      { is: "Tilfinningar krefjast ekta", en: "Emotions require authenticity" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Mæðradagurinn. Viltu frekar fá fullkomið ljóð frá vélmenni, eða ljóð með smá villum sem kom frá hjartanu?",
          en: "Mother's Day. Would you rather receive a perfect poem from a robot, or a poem with a few mistakes that came from the heart?"
        },
        options: {
          is: ["Ég vil fullkomna AI ljóðið", "Ég vil skrifa mitt eigið ljóð"],
          en: ["I want the perfect AI poem", "I want to write my own poem"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Argue that human effort is more valuable than AI perfection when making a gift.",
        goalText: {
          is: "Haltu uppi rökræðum við Spark um hvað gerir gjöf sérstaka.",
          en: "Argue with Spark about what makes a gift special."
        }
      },
      reflection: {
        question: {
          is: "Hvers vegna finnst fólki vænna um eitthvað sem tekur tíma og fyrirhöfn að búa til?",
          en: "Why do people care more about something that takes time and effort to make?"
        }
      }
    }
  },
  {
    missionId: "D24",
    progressionPhase: "fluency",
    dCode: "Diligence",
    title: {
      is: "Höfundarréttur / Fake News",
      en: "Copyright / Fake News"
    },
    xpReward: 50,
    learningGoal: {
      is: "Framleiðsla á gerviefni dreifist hratt og enginn veit upprunann.",
      en: "Synthetic media spreads fast and nobody knows its origin."
    },
    conceptsTaught: [
      { is: "Höfundarréttur og AI efni", en: "Copyright and AI content" },
      { is: "Gerviefni dreifist hratt", en: "Synthetic media spreads fast" },
      { is: "Merkja AI-framleitt efni", en: "Label AI-generated content" }
    ],
    phases: {
      hook: {
        scenarioText: {
          is: "Þú notar AI myndavél til að búa til raunverulega mynd af eldi í skólanum og póstar á TikTok sem grín. Eftir 10 mínútur hafa 1000 manns deilt henni. Er þetta fyndið lengur?",
          en: "You use an AI camera to generate a realistic photo of a fire at school and post it on TikTok as a joke. After 10 minutes, 1000 people have shared it. Is it still funny?"
        },
        options: {
          is: ["Það er of seint að breyta því", "Eyða myndinni strax"],
          en: ["It's too late to change it", "Delete the picture immediately"]
        }
      },
      lab: {
        systemPrompt: "You are Spark. Roleplay the rapid escalation of fake news online. Emphasize how hard it is to undo a lie on the internet.",
        goalText: {
          is: "Finndu leið til að stöðva orðróminn á netinu sem þú byrjaðir.",
          en: "Find a way to stop the rumor online that you started."
        }
      },
      reflection: {
        question: {
          is: "Hvers vegna ættum við aldrei að pósta gervimyndum af atburðum án þess að merkja þær sem AI?",
          en: "Why should we never post fake pictures of events without labeling them as AI?"
        }
      }
    }
  }
];
