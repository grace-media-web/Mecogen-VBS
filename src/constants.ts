/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
          { name: "CSI பள்ளி – வடக்கு சாட்சியாபுரம்", status: 'held' },
          { name: "கங்காகுளம் வடக்கு", status: 'held' },
          { name: "கங்காகுளம் தெற்கு", status: 'held' }
        ]
      },
      {
        name: "பண்டுேன்பட்டி (Panduthenpatti)",
        villages: [
          { name: "ஆலத்தூர்", status: 'held' },
          { name: "அப்ப நாயக்கன் பட்டி", status: 'upcoming' },
          { name: "பாப்பநாயக்கன்பட்டி", status: 'upcoming' }
        ]
      },
      {
        name: "புல்லகவுண்ைன்பட்டி (Pullagoundanpatti)",
        villages: [
          { name: "தகாம்மங்கியாபுரம்", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "யாக்தகாபு பிராந்தியம் (James Region)",
    fields: [
      {
        name: "அழகப்பபுரம் (Alagappapuram)",
        villages: [
          { name: "அழகப்பபுரம் வடக்கு தெரு", status: 'held' },
          { name: "றசெம்மாள்புரம்", status: 'held' }
        ]
      },
      {
        name: "பபருமளஞ்சி (Perumalanchi)",
        villages: [
          { name: "கீக்குளம்", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "ேதேயு பிராந்தியம் (Thaddeus Region)",
    fields: [
      {
        name: "முத்ோண்டியாபுரம் (Muthandiyapuram)",
        villages: [
          { name: "கிருஷ்ணாபுரம்", status: 'held' },
          { name: "முத்ொண்டியாபுரம் மமற்கு தெரு", status: 'held' },
          { name: "மமலப்புதூர்", status: 'held' },
          { name: "நார்ணாபுரம்", status: 'held' }
        ]
      },
      {
        name: "ஏழாயிரம் பண்டை (Ezhavayiram Pannai)",
        villages: [
          { name: "அப்பணம்பட்டி", status: 'held' },
          { name: "சிவசங்குபட்டி", status: 'held' },
          { name: "தசல்றலயாபுரம் கிழக்கு", status: 'held' },
          { name: "MGR நகர் – 7000 பண்றண", status: 'held' },
          { name: "அச்சங்குளம்", status: 'held' }
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
          { name: "கீழராஜகுலராமன்", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "பர்ேலதமயு பிராந்தியம் (Bartholomew Region)",
    fields: [
      {
        name: "தோப்புப்பட்டி (Thoppupatti)",
        villages: [
          { name: "மபச்சக்கம்பட்டி", status: 'held' },
          { name: "பறழயமகாட்றட", status: 'held' },
          { name: "மபச்சக்கம்பட்டி (களம்)", status: 'held' }
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
          { name: "மமட்டமறல CSI பள்ளி", status: 'held' }
        ]
      },
      {
        name: "திரளி (Thirali)",
        villages: [
          { name: "ஆலம்பட்டி பள்ளி", status: 'held' },
          { name: "இந்திரா காலனி", status: 'held' },
          { name: "மீனாட்சிபுரம்", status: 'held' },
          { name: "கிழவமனரி", status: 'held' },
          { name: "பச்சக்மகாப்பன்பட்டி", status: 'held' },
          { name: "நடுவக்மகாட்றட", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 9,
    name: "தயாவான் பிராந்தியம் (John Region)",
    fields: [
      {
        name: "புதுக்தகாட்டை (Pudukkottai)",
        villages: [
          { name: "சில்வர்புரம் TNDTA நடுநிறலப்பள்ளி", status: 'held' },
          { name: "S. சுப்பிரமணியபுரம் TNDTA தொடக்கப்பள்ளி", status: 'held' },
          { name: "இராமநாச்சியாபுரம் TNDTA தொடக்கப்பள்ளி", status: 'held' },
          { name: "குறலயன்கரிசல் தொடக்கப்பள்ளி", status: 'held' },
          { name: "தூத்துக்குடி விக்மடாரியா தொடக்கப்பள்ளி", status: 'held' },
          { name: "அத்திமரப்பட்டி தொடக்கப்பள்ளி", status: 'held' },
          { name: "கிருபா பள்ளி, தூத்துக்குடி", status: 'held' }
        ]
      }
    ]
  },
  {
    id: 10,
    name: "தபதுரு பிராந்தியம் (Peter Region)",
    fields: [
      {
        name: "சின்னக் காளண்பட்டி (Chinnak Kalampatti)",
        villages: [
          { name: "குறிஞ்சாக் குளம்", status: 'held' }
        ]
      },
      {
        name: "திருதவங்கைம் (Thiruvengaiyam)",
        villages: []
      },
      {
        name: "கலிங்கப்பட்டி (Kalingapatti)",
        villages: []
      }
    ]
  },
  {
    id: 11,
    name: "அந்திதரயா பிராந்தியம் (Andrew Region)",
    fields: [
      {
        name: "பபரியநாயகபுரம் (Periyanayagapuram)",
        villages: []
      },
      {
        name: "தூத்துக்குடி ரூரல் (Tuticorin Rural)",
        villages: []
      }
    ]
  }
];
