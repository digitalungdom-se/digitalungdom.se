const EmergencyActions = {
  login: {
    username: 'douglas',
    password: 'kelvin'
  },
  register: {
    "name": "Douglas Bengtsson",
    "username": "Nautman",
    "email": "doug.beng-2019@vrg.se",
    "birthdate": "2000-01-18",
    "gender": "0",
    "password": "kelvin123",
    "agreementVersion": "0"
  },
  check_username: {
    "username": "Nautman"
  },
  check_email: {
    "email": "doug.beng-2019@vrg.se"
  },
  agora_publish_post: {
    "body": "Hello\n😗😘",
    "type": "post",
    "group": "user",
    "badges": [],
    "title": "Hello, world!",
    "tags": [ "programming_humor", "hacking", "stockholm" ]
  },
  agora_publish_link: {
    "body": "https://digitalungdom.se",
    "type": "link",
    "group": "user",
    "badges": [],
    "title": "Hello, digitalungdom!",
    "tags": [ "programming_humor", "hacking", "stockholm" ]
  },
  agora_publish_question: {
    "body": "Hello?\n😗😘",
    "type": "question",
    "group": "user",
    "badges": [],
    "title": "Hello, world???",
    "tags": [ "help", "hacking", "stockholm" ]
  },
  agora_publish_comment: {
    "body": "#Don't think that's true\n",
    "type": "comment",
    "group": "user",
    "badges": [],
    "replyTo": "<objectid>",
  },
  anti_agorize: {
    "postId": "<objectid>"
  },
  meta_agorize: {
    "postId": "<objectid>",
    "body": "EDIT: Obligatory didn't expect this to be so popular.\nEDIT 2: Wow guys, 3 upvotes, really? You guys rock!",
  },
  get_agoragrams: {
    "dateAfter": "00",
    "dateBefore": "5e5adfc6",
    "sort": "new"
  },
}

export default EmergencyActions