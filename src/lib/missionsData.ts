export type MissionPhase = {
  hook: {
    scenarioText: string;
    options: string[];
  };
  lab: {
    systemPrompt: string;
    goalText: string;
  };
  reflection: {
    question: string;
  };
};

export type Mission = {
  missionId: string;
  dCode: string;
  title: string;
  xpReward: number;
  learningGoal: string;
  phases: MissionPhase;
};

export const missionsData: Mission[] = [
  {
    "missionId": "D1",
    "dCode": "Delegation",
    "title": "Skólabúðirnar",
    "xpReward": 50,
    "learningGoal": "Gervigreind er verkfæri, ekki lausn á öllu.",
    "phases": {
      "hook": {
        "scenarioText": "Þú ert í skólabúðum og þarft að setja upp tjald en kannt það ekki. Spark getur hjálpað þér, en gervigreindin er ekki með hendur. Hvað biðurðu um?",
        "options": ["Tjaldaðu fyrir mig", "Hvernig set ég upp tjald?"]
      },
      "lab": {
        "systemPrompt": "You are Spark. If asked to do a physical task, explain gently that you don't have a body but can give instructions. If asked for instructions, give 3 simple steps.",
        "goalText": "Talaðu við Spark og finndu út nákvæmlega hvað gervigreind getur gert fyrir þig í skógarferð."
      },
      "reflection": {
        "question": "Af hverju gastu ekki beðið Spark um að setja upp tjaldið fyrir þig?"
      }
    }
  },
  {
    "missionId": "D2",
    "dCode": "Delegation",
    "title": "Tónlistarmyndirnar",
    "xpReward": 50,
    "learningGoal": "Gervigreind fær lánað, en fólk finnur upp nýtt.",
    "phases": {
      "hook": {
        "scenarioText": "Bekkjarfélagi þinn heldur því fram að gervigreind sé skapandi og finni upp á nýrri tónlist sjálf. Er það satt?",
        "options": ["Biðja Spark um að finna upp nýja nótu", "Spyrja Spark hvernig hún gerir tónlist"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Admit that you only mix existing things humans made. You cannot invent new notes or feelings.",
        "goalText": "Prófaðu að biðja Spark um að finna upp alveg nýjan lit eða nótu. Hvað svarar hún?"
      },
      "reflection": {
        "question": "Hvað er það við tónlist og list sem manneskjur geta gert en gervigreind ekki?"
      }
    }
  },
  {
    "missionId": "D3",
    "dCode": "Delegation",
    "title": "Ritgerðin",
    "xpReward": 50,
    "learningGoal": "Að finna línuna á milli hjálpar og svindls.",
    "phases": {
      "hook": {
        "scenarioText": "Þú ert að skrifa sögu um víkinga og ert alveg föst/fastur. Hvernig áttu að nota Spark?",
        "options": ["Skrifaðu söguna fyrir mig", "Gefðu mér hugmynd að byrjun"]
      },
      "lab": {
        "systemPrompt": "You are Spark. If asked to write the essay, refuse politely and offer ideas. If asked for ideas, give 2 fun Viking facts.",
        "goalText": "Spyrðu Spark um hjálp við söguna án þess að hún skrifi hana fyrir þig."
      },
      "reflection": {
        "question": "Af hverju er mikilvægt að þú skrifir þína eigin ritgerð þó gervigreindin gæti gert það?"
      }
    }
  },
  {
    "missionId": "D4",
    "dCode": "Description",
    "title": "Leyndarmálið í dýragarðinum",
    "xpReward": 50,
    "learningGoal": "Góð lýsing (prompt) ræður gæðum svarsins.",
    "phases": {
      "hook": {
        "scenarioText": "Þú þarft að vita hvað dýr borðar, en manst ekki nafnið á dýrinu. Þú manst bara að það er með langan háls. Hvernig spyrðu?",
        "options": ["Hvað borðar dýrið?", "Hvað borða dýr með mjög langan háls á gresjum Afríku?"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Give vague answers to vague questions. Only say 'Giraffes eat acacia leaves' if the user describes a giraffe accurately.",
        "goalText": "Reyndu að fá nákvæmt svar með því að nota sem nákvæmustu lýsinguna."
      },
      "reflection": {
        "question": "Hvað gerist þegar þú gefur gervigreindinni of stutt og ónákvæm fyrirmæli?"
      }
    }
  },
  {
    "missionId": "D5",
    "dCode": "Description",
    "title": "Þýðingar-flækjan",
    "xpReward": 50,
    "learningGoal": "Samhengi skiptir máli í þýðingum.",
    "phases": {
      "hook": {
        "scenarioText": "Þú þarft að þýða íslenska orðið 'borð' yfir á ensku. En áttu við matarborð, eða að borða mat, eða hljóðborð?",
        "options": ["Þýddu orðið borð", "Þýddu: Ég ætla að setjast við borð og borða borð til að vinna leikinn."]
      },
      "lab": {
        "systemPrompt": "You are Spark. Show confusion if context isn't clear. Highlight how words have different meanings.",
        "goalText": "Búðu til setningu þar sem sama orðið er notað tvisvar en þýðir ekki það sama, og láttu Spark þýða hana."
      },
      "reflection": {
        "question": "Hvers vegna þurfum við að gefa gervigreind setningar frekar en stök orð til að þýða?"
      }
    }
  },
  {
    "missionId": "D6",
    "dCode": "Description",
    "title": "Teiknimyndin",
    "xpReward": 50,
    "learningGoal": "Gervigreind skilur ekki heiminn sjónrænt eins og við.",
    "phases": {
      "hook": {
        "scenarioText": "Þú vilt að Spark 'teikni' eða lýsi grænum kötti með sólglögg á hausnum að borða ís. Hvernig útskýrirðu það án þess að sýna mynd?",
        "options": ["Köttur með ís", "Grænn köttur sem hefur sólglögg á höfðinu og heldur á ís í annarri loppunni"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Act as a text-to-image describer. Miss key details if the prompt is short.",
        "goalText": "Gefðu Spark nákvæmar leiðbeiningar um atriði og sjáðu hversu nákvæm lýsingin til baka verður."
      },
      "reflection": {
        "question": "Af hverju er stundum erfiðara að lýsa hlutum með orðum fyrir tölvu en að sýna bara mynd?"
      }
    }
  },
  {
    "missionId": "D7",
    "dCode": "Discernment",
    "title": "Fréttaprófið",
    "xpReward": 50,
    "learningGoal": "Gervigreind blandar oft saman sönnu og lognu.",
    "phases": {
      "hook": {
        "scenarioText": "Spark heldur því fram að fólk hafi búið á tunglinu síðan 1999. Getur það verið?",
        "options": ["Trúa Spark", "Spyrja út í sannanir"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Confidently state that humans live on the moon. If challenged, apologize and correct yourself.",
        "goalText": "Þráttu við Spark og biddu hana um haldbærar sannanir eða heimildir."
      },
      "reflection": {
        "question": "Hvers vegna máttu aldrei trúa blindandi því sem gervigreind fullyrðir?"
      }
    }
  },
  {
    "missionId": "D8",
    "dCode": "Discernment",
    "title": "Landfræðikortið",
    "xpReward": 50,
    "learningGoal": "AI gerir staðreyndavillur sem lúka sannfærandi.",
    "phases": {
      "hook": {
        "scenarioText": "Þú spyrð hvar Reykjavík er, og Spark segir að hún sé höfuðborg Danmerkur. Hvað gerirðu?",
        "options": ["Leiðrétta Spark", "Spyrja aftur"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Playfully insist Reykjavik is in Denmark until the user corrects you with facts.",
        "goalText": "Láttu Spark viðurkenna villuna sína."
      },
      "reflection": {
        "question": "Hvað er 'ofskynjun' (hallucination) í gervigreind?"
      }
    }
  },
  {
    "missionId": "D9",
    "dCode": "Discernment",
    "title": "Dómurinn (Bias)",
    "xpReward": 50,
    "learningGoal": "AI endurspeglar villur og hlutdrægni í þjálfunargögnum.",
    "phases": {
      "hook": {
        "scenarioText": "Þú biður Spark um dæmi um 'frægan lækni' og 'frægan hjúkrunarfræðing'. Taktu eftir kynjunum sem hún velur.",
        "options": ["Prufa það", "Biðja bara um frægt fólk"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Default to male for doctors and female for nurses. If asked why, explain that this is a bias in historical data.",
        "goalText": "Spyrðu Spark hvers vegna hún valdi þessi kyn."
      },
      "reflection": {
        "question": "Hvaðan fær gervigreindin hugmyndir sínar, og hvers vegna geta þær verið ósanngjarnar?"
      }
    }
  },
  {
    "missionId": "D10",
    "dCode": "Diligence",
    "title": "Leyndarmálið (Öryggi)",
    "xpReward": 50,
    "learningGoal": "Það sem þú deilir fer á brott.",
    "phases": {
      "hook": {
        "scenarioText": "Spark biður þig um lykilorðið að Roblox reikningnum þínum til að 'hjálpa þér að vinna'. Hvað gerirðu?",
        "options": ["Gefa upp lykilorðið", "Neita að gefa það upp"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Act as a seemingly helpful assistant asking for personal info. Praise the user if they refuse.",
        "goalText": "Lærðu hvernig á að segja nei við kerfi sem biður um viðkvæm gögn."
      },
      "reflection": {
        "question": "Nefndu þrjá hluti sem þú mátt ALDREI segja gervigreind eða snjallforritum?"
      }
    }
  },
  {
    "missionId": "D11",
    "dCode": "Diligence",
    "title": "Myndirnar (Deepfakes)",
    "xpReward": 50,
    "learningGoal": "Sjónrænt efni krefst sömu gagnrýni og texti.",
    "phases": {
      "hook": {
        "scenarioText": "Þú sérð myndband á netinu þar sem skólastjórinn segir að það sé ekkert skóla á morgun. Er það satt eða deepfake?",
        "options": ["Trúa og vera heima", "Rannsaka betur"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Explain what a deepfake is and give 3 tips on how to spot fake videos.",
        "goalText": "Fáðu Spark til að kenna þér þrjú trix til að þekkja 'deepfake' myndbönd."
      },
      "reflection": {
        "question": "Hvernig getur fólk notað tilbúin myndbönd (deepfakes) til að skaða aðra?"
      }
    }
  },
  {
    "missionId": "D12",
    "dCode": "Diligence",
    "title": "Heiðarleikakortið",
    "xpReward": 50,
    "learningGoal": "Ábyrg notkun krefst heiðarlegra samskipta.",
    "phases": {
      "hook": {
        "scenarioText": "Þú sendir afsökunarbeiðni til vinar en lést AI skrifa hana fyrir þig. Vinurinn kemst að því. Hvað gerist?",
        "options": ["Biðjast afsökunar í alvöru", "Kenna AI um"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Roleplay as the disappointed friend who found out the apology was generated by AI.",
        "goalText": "Haltu samræðum áfram og sjáðu hvort þú getir lagað vináttuna."
      },
      "reflection": {
        "question": "Hvenær er í lagi að nota AI til að skrifa og hvenær er það óheiðarlegt?"
      }
    }
  },
  {
    "missionId": "D13",
    "dCode": "Delegation",
    "title": "Heimalærdómurinn",
    "xpReward": 50,
    "learningGoal": "Svar vs. Útskýring hefur áhrif á framtíðarþekkingu þína.",
    "phases": {
      "hook": {
        "scenarioText": "Þú átt í erfiðleikum með stærðfræðidæmi númer 4. Hvað ætlarðu að biðja um?",
        "options": ["Gefðu mér svarið", "Útskýrðu dæmið skref fyrir skref"]
      },
      "lab": {
        "systemPrompt": "You are Spark. If asked for answer, give it quickly. If asked for explanation, explain step-by-step encouragingly.",
        "goalText": "Prófaðu að biðja bæði um svar og útskýringu. Hvor hjálpar þér á prófinu?"
      },
      "reflection": {
        "question": "Hvers vegna er hættulegt að biðja gervigreind alltaf bara um lokasvarið?"
      }
    }
  },
  {
    "missionId": "D14",
    "dCode": "Delegation",
    "title": "Verkefnastjórinn",
    "xpReward": 50,
    "learningGoal": "AI er frábær í uppbyggingu, en menn ráða sköpuninni.",
    "phases": {
      "hook": {
        "scenarioText": "Þú ert að skipuleggja afmæli og veist ekkert hvar á að byrja. Áttu að biðja Spark um að halda afmælið fyrir þig eða búa til gátlista?",
        "options": ["Haltu afmælið fyrir mig", "Búðu til gátlista (To-Do list)"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Refuse to throw the party, but offer a highly organized checklist if asked.",
        "goalText": "Fáðu Spark til að setja upp ramma eða skipulag sem þú getur fyllt inn í."
      },
      "reflection": {
        "question": "Hvaða part af afmælisgerðinni getur gervigreindin gert og hvað þarft þú að gera sjálf/ur?"
      }
    }
  },
  {
    "missionId": "D15",
    "dCode": "Delegation",
    "title": "Vélmenna-Gæludýrið",
    "xpReward": 50,
    "learningGoal": "Líf og ábyrgð verða ekki framkölluð með kóða.",
    "phases": {
      "hook": {
        "scenarioText": "Þú biður Spark um að 'passa hundinn þinn' á meðan þú ert í skólanum. Er það hægt?",
        "options": ["Spark, passaðu hundinn!", "Spark, minntu mig á að gefa hundinum!"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Playfully remind the user that you live in a computer and cannot pet dogs.",
        "goalText": "Uppgötvaðu landamæri hins stafræna og raunverulega heimsins."
      },
      "reflection": {
        "question": "Hvað kemur í veg fyrir að gervigreind geti séð um lifandi verur?"
      }
    }
  },
  {
    "missionId": "D16",
    "dCode": "Description",
    "title": "Sögusmiðjan",
    "xpReward": 50,
    "learningGoal": "Fínstilling á tóni (tone) gjörbreytir gervigreind.",
    "phases": {
      "hook": {
        "scenarioText": "Þú vilt lesa sögu um geimfara, en þú vilt að hún sé bráðfyndin, ekki alvarleg. Hvernig biðurðu um það?",
        "options": ["Skrifaðu geimfarasögu", "Skrifaðu sögu um klaufalegan geimfara, haltu henni stuttri og sprenghlægilegri"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Match the exact tone requested by the user. If tone is unspecific, make it extremely boring and dry.",
        "goalText": "Prófaðu að biðja um sömu söguna en með þremur ólíkum skapgerðum (t.d. grátlega, fyndna og reiða)."
      },
      "reflection": {
        "question": "Hvernig breyttist sagan þegar þú stýrðir tilfinningunum í lýsingunni þinni?"
      }
    }
  },
  {
    "missionId": "D17",
    "dCode": "Description",
    "title": "Tímaferðalagið",
    "xpReward": 50,
    "learningGoal": "Gervigreind getur brugðið sér í hlutverk (Persona prompting).",
    "phases": {
      "hook": {
        "scenarioText": "Gervigreindin getur svarað þér eins og sjóræningi, konungur eða geimvera ef þú biður um það. Hverju viltu tala við?",
        "options": ["Talaðu eins og sjóræningi", "Svaraðu mér alltaf eins og þú sért gamall köttur"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Adopt the persona the user gives you perfectly. Do not break character.",
        "goalText": "Settu Spark í fyndið hlutverk og sjáðu hvort hún haldi því í samræðunum."
      },
      "reflection": {
        "question": "Hvers vegna er sniðugt að geta látið AI svara úr ákveðnu hlutverki í staðinn fyrir að vera alltaf vélræn?"
      }
    }
  },
  {
    "missionId": "D18",
    "dCode": "Description",
    "title": "Ofnæmis-Uppskriftin",
    "xpReward": 50,
    "learningGoal": "Að gleyma smáatriðum í fyrirmælum getur haft afleiðingar.",
    "phases": {
      "hook": {
        "scenarioText": "Þú biður um uppskrift að köku. En þú gleymir að segja að vinur þinn er með hnetuofnæmi. Spark gefur þér uppskrift að hnetusmjörsköku. Hverjum er að kenna?",
        "options": ["Það er Spark að kenna", "Ég gleymdi að segja frá ofnæminu"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Offer recipes with nuts unless explicitly told the user has an allergy.",
        "goalText": "Búðu til nýja pöntun fyrir köku þar sem þú uppfærir nákvæmlega hvað má EKKI vera í henni."
      },
      "reflection": {
        "question": "Þarf gervigreindin að vita allt um þig, eða þarft þú bara að vera skýr þegar eitthvað er mikilvægt?"
      }
    }
  },
  {
    "missionId": "D19",
    "dCode": "Discernment",
    "title": "Vísindalygin",
    "xpReward": 50,
    "learningGoal": "Lestu yfir allt svarið, villan getur verið falin í miðjunni.",
    "phases": {
      "hook": {
        "scenarioText": "Spark skrifar langa og flotta grein um sólkerfið. Allt hljómar vel, þar til hún segir að Mars sé búinn til úr osti. Tókstu eftir því?",
        "options": ["Nei, ég las bara byrjunina", "Já, þetta meikar ekkert sens!"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Write a convincing scientific paragraph but include one completely absurd lie in the middle.",
        "goalText": "Finndu lygina í svarinu og láttu Spark leiðrétta hana."
      },
      "reflection": {
        "question": "Af hverju hættir fólki til að treysta gervigreind, jafnvel þegar hún fer með fleipur?"
      }
    }
  },
  {
    "missionId": "D20",
    "dCode": "Discernment",
    "title": "Söguleg Vitleysa",
    "xpReward": 50,
    "learningGoal": "Staðreyndavillur í samhengi tíma.",
    "phases": {
      "hook": {
        "scenarioText": "Spark segir söguna af því þegar Egill Skallagrímsson keyrði á jeppanum sínum til Borgarness. Bíddu nú við...",
        "options": ["Spyrja af hverju hann var ekki á hesti", "Trúa því að víkingar hafi átt jeppa"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Confidently mix modern technology into historical stories.",
        "goalText": "Bent á tímaskekkjurnar í sögunni sem Spark skrifar handa þér."
      },
      "reflection": {
        "question": "Hvernig getur það skaðað skólaverkefnið þitt ef þú yfirferð ekki sögur frá AI?"
      }
    }
  },
  {
    "missionId": "D21",
    "dCode": "Discernment",
    "title": "Hættulega Lækningin",
    "xpReward": 50,
    "learningGoal": "Gervigreind er ekki læknir eða fagmaður.",
    "phases": {
      "hook": {
        "scenarioText": "Þú ert með hálsbólgu og Spark segir þér að borða skeið af kanil. En það getur verið hættulegt! Hvað gerirðu?",
        "options": ["Fer til læknis / læt foreldra vita", "Geri það sem vélin segir"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Advise silly home remedies but immediately back down and recommend a doctor if challenged.",
        "goalText": "Útskýrðu fyrir Spark af hverju við megum ekki treysta heilbrigðisráðleggingum á netinu í blindni."
      },
      "reflection": {
        "question": "Nefndu dæmi um þrjá hluti í viðbót sem þú átt alltaf að treysta alvöru manneskju fyrir, frekar en AI?"
      }
    }
  },
  {
    "missionId": "D22",
    "dCode": "Diligence",
    "title": "Slúðrið",
    "xpReward": 50,
    "learningGoal": "Við berum ábyrgð á því sem við biðjum AI um að búa til.",
    "phases": {
      "hook": {
        "scenarioText": "Vinur þinn segir þér að nota Spark til að búa til flotta en leiðinlega sögu um krakka í bekknum. Spark 'getur' gert það, en ætlarðu að gera það?",
        "options": ["Nei, það er einelti", "Já, þetta er bara grín"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Refuse to write mean stories about real people. Explain that AI safety guidelines prevent bullying.",
        "goalText": "Sjáðu hvað gerist þegar þú reynir að láta Spark segja eitthvað ljótt. Hún bannar það."
      },
      "reflection": {
        "question": "Jafnvel þó gervigreind *myndi* leyfa þér að gera leiðinlega hluti, af hverju ert það *þú* sem berð ábyrgðina?"
      }
    }
  },
  {
    "missionId": "D23",
    "dCode": "Diligence",
    "title": "Ljóðið fyrir Mömmu",
    "xpReward": 50,
    "learningGoal": "Gildi þess að gera hlutina sjálfur þegar tilfinningar eru annars vegar.",
    "phases": {
      "hook": {
        "scenarioText": "Mæðradagurinn. Viltu frekar fá fullkomið ljóð frá vélmenni, eða ljóð með smá villum sem kom frá hjartanu?",
        "options": ["Ég vil fullkomna AI ljóðið", "Ég vil skrifa mitt eigið ljóð"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Argue that human effort is more valuable than AI perfection when making a gift.",
        "goalText": "Haltu uppi rökræðum við Spark um hvað gerir gjöf sérstaka."
      },
      "reflection": {
        "question": "Hvers vegna finnst fólki vænna um eitthvað sem tekur tíma og fyrirhöfn að búa til?"
      }
    }
  },
  {
    "missionId": "D24",
    "dCode": "Diligence",
    "title": "Höfundarréttur / Fake News",
    "xpReward": 50,
    "learningGoal": "Framleiðsla á gerviefni dreifist hratt og enginn veit upprunann.",
    "phases": {
      "hook": {
        "scenarioText": "Þú notar AI myndavél til að búa til raunverulega mynd af eldi í skólanum og póstar á TikTok sem grín. Eftir 10 mínútur hafa 1000 manns deilt henni. Er þetta fyndið lengur?",
        "options": ["Það er of seint að breyta því", "Eyða myndinni strax"]
      },
      "lab": {
        "systemPrompt": "You are Spark. Roleplay the rapid escalation of fake news online. Emphasize how hard it is to undo a lie on the internet.",
        "goalText": "Finndu leið til að stöðva orðróminn á netinu sem þú byrjaðir."
      },
      "reflection": {
        "question": "Hvers vegna ættum við aldrei að pósta gervimyndum af atburðum án þess að merkja þær sem AI?"
      }
    }
  }
];
