export interface Village {
  name: string;
  count?: number;
  status: 'held' | 'upcoming';
}

export interface MissionField {
  name: string;
  villages: Village[];
}

export interface Region {
  id: number;
  name: string;
  fields: MissionField[];
}

export const VBS_DATA: Region[] = [
  {
    id: 1,
    name: "மத்தேயு பிராந்தியம் (Matthew Region)",
    fields: [
      {
        name: "சிவகாசி (Sivakasi)",
        villages: [
          { name: "ஜீவக்கல் உண்டு உறைவிடப் பள்ளி", status: 'held' },
          { name: "CSI பள்ளி - வடக்கு சாட்சியாபுரம்", status: 'held' },
          { name: "கங்காகுளம் வடக்கு", status: 'held' },
          { name: "கங்காகுளம் தெற்கு", status: 'held' },
          { name: "கண்ணகி காலனி", status: 'held' },
          { name: "ஆடிட்டர்காம்பவுண்ட்", status: 'held' },
          { name: "எம் ஜி ஆர்நகர்", status: 'held' }
        ]
      },
      {
        name: "பண்டுதன்பட்டி (Panduthanpatti)",
        villages: [
          { name: "ஆலத்தூர்", status: 'held' },
          { name: "பாப்பநாயக்கன் பட்டி", status: 'held' },
          { name: "அப்பநாயக்கன் பட்டி", status: 'held' },
          { name: "கோப்பநாயக்கன் பட்டி", status: 'held' },
          { name: "மாலையூரணிப்பட்டி", status: 'held' },
          { name: "அப்ப நாயக்கன் பட்டி", status: 'held' },
          { name: "பாப்பநாயக்கன்பட்டி", status: 'held' }
        ]
      },
      {
        name: "புல்லகவுண்டன்பட்டி (Pullagoundanpatti)",
        villages: [
          { name: "கொம்மங்கியாபுரம்", status: 'held' },
          { name: "பனையடிப்பட்டி", status: 'held' },
          { name: "மார்க்கநாதர்புரம்", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "யாக்கோபு பிராந்தியம் (James Region)",
    fields: [
      {
        name: "அழகப்பபுரம் (Alagappapuram)",
        villages: [
          { name: "அழகப்பபுரம் வடக்கு தெரு", status: 'held' },
          { name: "சைதம்மாள்புரம்", status: 'held' },
          { name: "முத்துராஜபுரம் CSI Church", status: 'held' },
          { name: "நேசமணி நகர் (செம்பாடு)", status: 'held' },
          { name: "திருமலாபுரம் மேற்கு", status: 'held' }
        ]
      },
      {
        name: "பெருமளஞ்சி (Perumalanchi)",
        villages: [
          { name: "கீக்குளம்", status: 'held' },
          { name: "காந்திஜி காலனி", status: 'held' },
          { name: "கோட்டையடி", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "ததேயு பிராந்தியம் (Thaddeus Region)",
    fields: [
      {
        name: "முத்தாண்டியாபுரம் (Muthandiyapuram)",
        villages: [
          { name: "கிருஷ்ணாபுரம்", status: 'held' },
          { name: "முத்தாண்டியாபுரம் மேற்கு தெரு", status: 'held' },
          { name: "மேலப்புதூர்", status: 'held' },
          { name: "நார்ணாபுரம்", status: 'held' },
          { name: "ஏழாயிரம் பண்ணை தெற்கு", status: 'held' },
          { name: "இராவுத்தன்பட்டி", status: 'held' },
          { name: "நல்லமுத்தன்பட்டி", status: 'held' }
        ]
      },
      {
        name: "ஏழாயிரம் பண்ணை (Ezhavayiram Pannai)",
        villages: [
          { name: "அப்பணம்பட்டி", status: 'held' },
          { name: "சிவசங்குபட்டி", status: 'held' },
          { name: "அப்பணம்பட்டி", status: 'held' },
          { name: "E. மேட்டூர்", status: 'held' },
          { name: "கேப்டன் நகர்", status: 'held' },
          { name: "சிவசங்குபட்டி", status: 'held' },
          { name: "இராவுத்தன்பட்டி", status: 'held' },
          { name: "நல்லமுத்தன்பட்டி", status: 'held' },
          { name: "செல்லையாபுரம் கிழக்கு", status: 'held' },
          { name: "MGR நகர் - 7000 பண்ணை", status: 'held' },
          { name: "அச்சங்குளம் (தொடக்கம்)", status: 'held' },
          { name: "செந்திலாபுரம்", status: 'held' },
          { name: "எலுமிச்சங்காய்பட்டி", status: 'held' },
          { name: "பழைய ஏழாயிரம் பண்ணை", status: 'held' },
          { name: "தேவர் நகர்", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "மத்தியா பிராந்தியம் (Matthias Region)",
    fields: [
      {
        name: "கன்னித்தேவன்பட்டி (Kannithevanpatti)",
        villages: [
          { name: "கீழராஜகுலராமன்", status: 'held' },
          { name: "கீழராஜகுலராமன்", status: 'held' },
          { name: "கோபாலபுரம்", status: 'held' },
          { name: "கம்மாபட்டி", status: 'held' }
        ]
      },
      {
        name: "பழைய செந்நெல்குளம் (Pazhaya Chennelkulam)",
        villages: [
          { name: "A. இராமலிங்காபுரம்", status: 'held' },
          { name: "வடக்கு அச்சம்பட்டித்தானம்", status: 'held' },
          { name: "மொட்டமலை", status: 'held' },
          { name: "நரியங்குளம்", status: 'held' },
          { name: "கன்னார்பட்டி", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "பர்தலமேயு பிராந்தியம் (Bartholomew Region)",
    fields: [
      {
        name: "தோப்புப்பட்டி (Thoppupatti)",
        villages: [
          { name: "பேசச்க்கம்பட்டி", status: 'held' },
          { name: "பழையகோட்டை", status: 'held' },
          { name: "பேசச்க்கம்பட்டி (களம்)", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "பிலிப்பு பிராந்தியம் (Philip Region)",
    fields: [
      {
        name: "அனுப்பன்குளம் (Anuppankulam)",
        villages: [
          { name: "மேட்டமலை CSI பள்ளி", status: 'held' },
          { name: "மேட்டமலை வடக்கு", status: 'held' },
          { name: "சின்னக்காமன்பட்டி", status: 'held' }
        ]
      },
      {
        name: "திரளி (Thirali)",
        villages: [
          { name: "ஆலம்பட்டி பள்ளி", status: 'held' },
          { name: "இந்திரா காலனி", status: 'held' },
          { name: "மீனாட்சிபுரம்", status: 'held' },
          { name: "கிழவனேரி", status: 'held' },
          { name: "பச்சக்கோப்பன்பட்டி", status: 'held' },
          { name: "நடுவக்கோட்டை", status: 'held' },
          { name: "S. வலையபட்டி", status: 'held' },
          { name: "வாழ்நாயக்கன்பட்டி", status: 'held' },
          { name: "ஆலம்பட்டி", status: 'held' },
          { name: "திரளி சபை", status: 'held' }
        ]
      },
      {
        name: "சாத்தூர் (Sattur)",
        villages: [
          { name: "பந்துவார்ப்பட்டி", status: 'held' },
          { name: "சூரங்குடி", status: 'held' },
          { name: "நடுசூரங்குடி", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "தோமா பிராந்தியம் (Thomas Region)",
    fields: [
      {
        name: "புல்லலக்கோட்டை (Pullalakottai)",
        villages: [
          { name: "புல்லலக்கோட்டை பள்ளிக்கூடம்", status: 'held' }
        ]
      },
      {
        name: "முக்கூட்டுமலை (Mukkootumalai)",
        villages: [
          { name: "முக்கூட்டு மலை மாதவர் தெரு", status: 'held' },
          { name: "மந்திதோப்பு", status: 'held' }
        ]
      },
      {
        name: "பழைய அப்பனேரி (Palaya Appaneri)",
        villages: [
          { name: "மூப்பன்பட்டி", status: 'held' },
          { name: "மூப்பன்பட்டி காலனி", status: 'held' },
          { name: "ஆவல் நத்தம்", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 8,
    name: "பவுல் பிராந்தியம் (Paul Region)",
    fields: [
      {
        name: "திருபுளியன்குடி (Thirupuliyangudi)",
        villages: [
          { name: "பேரின்பபுறம்", status: 'held' },
          { name: "திருபுளியன்குடி மேலூர்", status: 'held' },
          { name: "திருபுளியன்குடி", status: 'held' }
        ]
      },
      {
        name: "பேரூர் (Peroor)",
        villages: [
          { name: "கிருபையின் ஆலயம் பேரூர்", status: 'held' },
          { name: "சுந்தரலிங்க நகர்", status: 'held' },
          { name: "அண்ணாநகர்", status: 'held' },
          { name: "பேரூர்", status: 'held' },
          { name: "பண்ணை விளைபுதூர்", status: 'held' },
          { name: "ராஜமணிநகர்", status: 'held' },
          { name: "பண்டாரவிளை டியூஷன் மையம்", status: 'held' },
          { name: "நடுநிலைப்பள்ளி பண்டாரவிளை", status: 'held' },
          { name: "ஆறுமுகமங்கலம்", status: 'held' },
          { name: "அண்ணாநகர் (கொட்டாரக்குறிச்சி)", status: 'held' },
          { name: "அம்மான் தோப்பு", status: 'held' },
          { name: "பட்டாண்டிவிளை", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 9,
    name: "யோவான் பிராந்தியம் (John Region)",
    fields: [
      {
        name: "புதுக்கோட்டை (Pudukkottai)",
        villages: [
          { name: "சில்வர்புரம் TNDTA நடுநிலைப்பள்ளி", status: 'held' },
          { name: "S. சுப்பிரமணியபுரம் TNDTA தொடக்கப்பள்ளி", status: 'held' },
          { name: "இராமநாச்சியாபுரம் TNDTA தொடக்கப்பள்ளி", status: 'held' },
          { name: "குலையன்கரிசல் தொடக்கப்பள்ளி", status: 'held' },
          { name: "தூத்துக்குடி விக்டோரியா தொடக்கப்பள்ளி", status: 'held' },
          { name: "அத்திமரப்பட்டி தொடக்கப்பள்ளி", status: 'held' },
          { name: "கிருபா பள்ளி, தூத்துக்குடி", status: 'held' },
          { name: "மீனாட்சிப்பட்டி", status: 'held' },
          { name: "மீனாட்சிப்பட்டி கிழக்கு", status: 'held' },
          { name: "வாகைக்குளம்", status: 'held' },
          { name: "இந்திரா நகர், புதுக்கோட்டை", status: 'held' }
        ]
      },
      {
        name: "ஆண்டாள் நகர் (Andal Nagar)",
        villages: [
          { name: "திம்மராஜபுரம் காலனி", status: 'held' },
          { name: "ராஜாராமன் காலனி", status: 'held' },
          { name: "சமத்துவபுரம்", status: 'held' },
          { name: "பேரூரணி", status: 'held' },
          { name: "நடுச்ச காரைக்குடி", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 10,
    name: "பேதுரு பிராந்தியம் (Peter Region)",
    fields: [
      {
        name: "சின்னக்காளண்பட்டி (Chinnak Kalampatti)",
        villages: [
          { name: "குறிஞ்சாக் குளம்", status: 'held' }
        ]
      },
      {
        name: "திருவேங்கடம் (Thiruvengaiyam)",
        villages: [
          { name: "குறிஞ்சாக்குளம்", status: 'held' },
          { name: "சின்னக்காளான்பட்டி", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 11,
    name: "அந்திரேயா பிராந்தியம் (Andrew Region)",
    fields: [
      {
        name: "பெரியநாயகபுரம் (Periyanayagapuram)",
        villages: [
          { name: "பெரியநாயகபுரம் வடக்கு தெரு", status: 'held' },
          { name: "பொன்னகரம்", status: 'held' },
          { name: "அய்யா அடைப்பு", status: 'held' }
        ]
      },
      {
        name: "தூத்துக்குடி ஊரகம் (Tuticorin Rural)",
        villages: [
          { name: "MGR Nagar", status: 'held' },
          { name: "மணி நகர்", status: 'held' },
          { name: "வகுத்தான்குப்பம்", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 12,
    name: "சீமோன் பிராந்தியம் (Simon Region)",
    fields: [
      {
        name: "அத்தியூத்து (Athiyoothu)",
        villages: [
          { name: "அழகியபாண்டியபுரம்", status: 'held' },
          { name: "அத்தியூத்து", status: 'held' },
          { name: "ஆண்டிபட்டி", status: 'held' },
          { name: "பரும்பு", status: 'held' }
        ]
      }
    ]
  }
];
