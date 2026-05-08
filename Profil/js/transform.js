export const ANIMAL_EMOJI = { Rabbit: '🐰', Fox: '🦊', Sloth: '🦥', Tortoise: '🐢' };

const SELF_ANIMAL_EMOJI = {
  'harimau': '🐯', 'tiger': '🐯',
  'singa': '🦁',  'lion': '🦁',
  'kuda': '🐴',   'horse': '🐴',
  'gajah': '🐘',  'elephant': '🐘',
  'udang': '🦐',  'prawn': '🦐', 'shrimp': '🦐',
  'ikan jenahak': '🐟', 'ikan': '🐟', 'fish': '🐟', 'jenahak': '🐟',
  'monyet': '🐒', 'monkey': '🐒', 'beruk': '🐒',
  'rabbit': '🐰', 'arnab': '🐰',
  'fox': '🦊',    'musang': '🦊',
  'sloth': '🦥',
  'tortoise': '🐢', 'kura-kura': '🐢', 'kura': '🐢',
  'kucing': '🐱', 'cat': '🐱',
  'anjing': '🐶', 'dog': '🐶',
  'burung': '🦅', 'bird': '🦅', 'helang': '🦅', 'eagle': '🦅',
  'ular': '🐍',   'snake': '🐍',
  'buaya': '🐊',  'crocodile': '🐊',
  'lembu': '🐄',  'cow': '🐄',
  'kambing': '🐐','goat': '🐐',
  'ayam': '🐔',   'chicken': '🐔',
  'itik': '🦆',   'duck': '🦆',
  'beruang': '🐻','bear': '🐻',
  'serigala': '🐺','wolf': '🐺',
  'rusa': '🦌',   'deer': '🦌',
  'tikus': '🐭',  'rat': '🐭', 'mouse': '🐭',
  'tupai': '🐿️',  'squirrel': '🐿️',
  'panda': '🐼',
  'badak': '🦏',  'rhino': '🦏',
  'zirafah': '🦒','giraffe': '🦒',
  'jerung': '🦈', 'shark': '🦈',
  'paus': '🐳',   'whale': '🐳',
  'sotong': '🦑', 'squid': '🦑',
  'ketam': '🦀',  'crab': '🦀',
  'lebah': '🐝',  'bee': '🐝',
  'rama-rama': '🦋', 'butterfly': '🦋',
};

export function emojiFor(name) {
  if (!name) return '🐾';
  const k = String(name).trim().toLowerCase();
  if (SELF_ANIMAL_EMOJI[k]) return SELF_ANIMAL_EMOJI[k];
  for (const key in SELF_ANIMAL_EMOJI) {
    if (k.includes(key)) return SELF_ANIMAL_EMOJI[key];
  }
  return '🐾';
}

export const MBTI_DATA = {
  ISTJ: { def: 'Introverted, Sensing, Thinking, Judging',       s: ['Attention to detail', 'Organizational skills', 'Reliability'],          w: ['Reluctance to delegate tasks', 'Tendency to stick to routine', 'Difficulty adapting to change'],  i: ['Structured activities, planning, organizing', 'Practical hobbies, following traditions', 'Learning new skills, attending workshops'],    t: ['Project management, data analysis, quality control', 'Compliance tasks, auditing, administrative work', 'Following established procedures, routine tasks'] },
  ISFJ: { def: 'Introverted, Sensing, Feeling, Judging',        s: ['Loyalty', 'Compassion', 'Reliability'],                                   w: ['Difficulty saying no', 'Tendency to avoid conflict', 'Overly self-critical'],                      i: ['Helping others, volunteering', 'Nature walks, gardening, time with family', 'Cooking, baking, crafting'],                                 t: ['Support roles, customer service, team coordination', 'Caretaking, event planning, community outreach', 'Maintaining stability, routine support'] },
  INFJ: { def: 'Introverted, Intuitive, Feeling, Judging',      s: ['Insightful', 'Empathetic', 'Visionary'],                                  w: ['Perfectionistic tendencies', 'Idealistic', 'Tendency to burn out from overcommitment'],            i: ['Writing, journaling, deep conversations', 'Art appreciation, cultural events', 'Meditation, yoga, spiritual topics'],                   t: ['Counseling, coaching, creative projects', 'Strategic planning, visioning, problem-solving', 'Long-term visioning, innovation, advocacy'] },
  INTJ: { def: 'Introverted, Intuitive, Thinking, Judging',     s: ['Analytical mindset', 'Strategic thinking', 'Problem-solving skills'],     w: ['Impatience with incompetence', 'Difficulty expressing emotions', 'Tendency to overthink'],          i: ['Problem-solving challenges, strategy games', 'Researching, studying, attending seminars', 'Technology advancements, futuristic concepts'],  t: ['Strategic planning, research, innovation', 'Complex problem-solving, conceptualization, leadership', 'Strategic decision-making, conceptual analysis, R&D'] },
  ISTP: { def: 'Introverted, Sensing, Thinking, Perceiving',    s: ['Adaptable', 'Analytical', 'Hands-on problem solvers'],                    w: ['Dislike of routine', 'Impulsiveness', 'Difficulty expressing emotions'],                          i: ['Outdoor activities, extreme sports', 'DIY projects, tinkering with gadgets', 'Motorcycling, skydiving, exploring'],                     t: ['Hands-on tasks, troubleshooting, technical projects', 'Technical problem-solving, repairs', 'Practical experimentation, technical work'] },
  ISFP: { def: 'Introverted, Sensing, Feeling, Perceiving',     s: ['Artistic', 'Flexible', 'Compassionate'],                                  w: ['Difficulty with criticism', 'Avoidance of conflict', 'Tendency to be overly sensitive'],             i: ['Painting, drawing, photography', 'Music appreciation, concerts', 'Nature hikes, camping, beach outings'],                               t: ['Creative projects, artistic endeavors', 'Artistic expression, individual contributions', 'Supportive roles, creative problem-solving'] },
  INFP: { def: 'Introverted, Intuitive, Feeling, Perceiving',   s: ['Idealistic', 'Creative', 'Empathetic'],                                   w: ['Difficulty with practical matters', 'Tendency to avoid confrontation', 'Overly idealistic'],        i: ['Creative writing, advocacy', 'Visioning, individual creative work', 'Community building, individual tasks'],                            t: ['Creative projects, advocacy', 'Creative problem-solving, visioning', 'Advocacy, community building'] },
  INTP: { def: 'Introverted, Intuitive, Thinking, Perceiving',  s: ['Analytical', 'Innovative', 'Objective'],                                  w: ['Difficulty focusing on routine tasks', 'Tendency to be overly critical', 'Insensitivity to social cues'], i: ['Problem-solving challenges, puzzles', 'Scientific exploration, lectures', 'Computer programming, coding, gaming'],                   t: ['Complex problem-solving, technical analysis', 'Conceptual analysis, technical experimentation', 'Theoretical analysis, R&D'] },
  ESTP: { def: 'Extraverted, Sensing, Thinking, Perceiving',    s: ['Energetic', 'Bold', 'Resourceful'],                                       w: ['Impulsivity', 'Dislike of theory', "Insensitivity to others' feelings"],                           i: ['Competitive sports, adrenaline activities', 'Travel, exploring cultures', 'Action movies, thrill-seeking'],                             t: ['High-energy tasks, dynamic environments', 'Hands-on tasks, risk-taking', 'Quick decision-making, crisis management'] },
  ESFP: { def: 'Extraverted, Sensing, Feeling, Perceiving',     s: ['Enthusiastic', 'Sociable', 'Spontaneous'],                                w: ['Tendency to avoid conflict', 'Difficulty with long-term planning', 'Easily bored with routine'],     i: ['Dancing, theater, performing arts', 'Social events, parties, networking', 'Fashion, shopping, new experiences'],                       t: ['Social events, entertainment', 'Customer interaction, event planning', 'Dynamic environments, multitasking'] },
  ENFP: { def: 'Extraverted, Intuitive, Feeling, Perceiving',   s: ['Energetic', 'Creative', 'Enthusiastic'],                                  w: ['Difficulty with routine tasks', 'Overly idealistic', 'Tendency to be easily distracted'],            i: ['Social causes', 'Exploring new ideas', 'Creative expression'],                                                                          t: ['Entrepreneurship', 'Advocacy', 'Brainstorming sessions'] },
  ENTP: { def: 'Extraverted, Intuitive, Thinking, Perceiving',  s: ['Analytical', 'Debater', 'Innovative'],                                    w: ['Impulsiveness', 'Tendency to be argumentative', 'Difficulty with follow-through'],                   i: ['Debating', 'Problem-solving challenges', 'Innovation'],                                                                                  t: ['Consulting', 'Strategy development', 'Brainstorming sessions'] },
  ESTJ: { def: 'Extraverted, Sensing, Thinking, Judging',       s: ['Efficient', 'Organized', 'Leadership'],                                   w: ['Bossy', 'Inflexible', 'Intolerance of inefficiency'],                                               i: ['Leadership roles', 'Organizational tasks', 'Community involvement'],                                                                    t: ['Management', 'Administration', 'Project management'] },
  ESFJ: { def: 'Extraverted, Sensing, Feeling, Judging',        s: ['Supportive', 'Sociable', 'Reliable'],                                     w: ['Overly self-sacrificing', 'Avoidance of conflict', 'Tendency to be overly emotional'],               i: ['Socializing', 'Community involvement', 'Group activities'],                                                                             t: ['Teaching', 'Counseling', 'Customer service'] },
  ENFJ: { def: 'Extraverted, Intuitive, Feeling, Judging',      s: ['Charismatic', 'Empathetic', 'Visionary'],                                 w: ['Tendency to be overbearing', 'Difficulty with criticism', 'Tendency to be overly idealistic'],      i: ['Leadership roles', 'Counseling', 'Social causes'],                                                                                      t: ['Leadership', 'Counseling', 'Event planning'] },
  ENTJ: { def: 'Extraverted, Intuitive, Thinking, Judging',     s: ['Confident', 'Strategic', 'Efficient'],                                    w: ['Tendency to be overly critical', 'Intolerance of incompetence', 'Difficulty with emotions'],         i: ['Strategic planning', 'Problem-solving challenges', 'Learning new skills'],                                                              t: ['Leadership', 'Strategic planning', 'Project management'] },
};

export const ANIMAL_DATA = {
  Rabbit: {
    def: 'Energetic · Social · Adaptive',
    s: ['Energetic and enthusiastic', 'Social and good at networking', 'Adaptive and quick to learn'],
    w: ['Impulsiveness and risk-taking', 'Difficulty with long-term planning', 'Tendency to avoid conflict'],
    i: ['Social activities, networking, new experiences', 'Outdoor events, team sports, parties', 'Travel, adventure, trying new hobbies'],
    t: ['Leadership roles, team management, networking', 'Marketing, event planning, customer interaction', 'Fast-paced, multitasking, dynamic roles'],
  },
  Fox: {
    def: 'Cunning · Strategic · Flexible',
    s: ['Cunning and resourceful', 'Strategic thinker and problem solver', 'Flexible and adaptable'],
    w: ['Tendency to be manipulative', 'Difficulty following strict rules', 'Potential for being too clever'],
    i: ['Problem-solving, strategic games, debates', 'Entrepreneurship, negotiations, psychology', 'Creative projects, exploring new tech'],
    t: ['Strategic planning, negotiation, problem-solving', 'Business development, strategy, analysis', 'Innovative projects, creative problem-solving'],
  },
  Sloth: {
    def: 'Calm · Steady · Patient',
    s: ['Calm and patient', 'Steady and reliable', 'Good at conserving energy'],
    w: ['Procrastination and slow pace', 'Resistance to change', 'Lack of urgency at times'],
    i: ['Relaxing activities, meditation, nature walks', 'Reading, gardening, watching movies', 'Cooking, arts and crafts, music'],
    t: ['Routine tasks, stability, consistency', 'Support roles, administrative tasks', 'Stability roles, long-term support'],
  },
  Tortoise: {
    def: 'Methodical · Patient · Stable',
    s: ['Methodical and detail-oriented', 'Patient and persistent', 'Stable and consistent'],
    w: ['Resistance to change', 'Difficulty with multitasking', 'Tendency to be inflexible'],
    i: ['Planning, organizing, following routines', 'DIY projects, home improvement, writing', 'Researching, learning new skills, nature'],
    t: ['Administrative tasks, project management', 'Process improvement, structured tasks', 'Long-term projects, structured environments'],
  },
};
