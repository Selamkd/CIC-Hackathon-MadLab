const questions = {
  demographicQuestions: {
    name: 'Demographic Survay',
    questionList: [
      { id: 1, text: 'What is your age?', type: 'text' },
      { id: 2, text: 'What is your gender identity?', type: 'text' },
      {
        id: 3,
        text: 'What is your ethnicity or race?',
        type: 'droplist',
        options: ['Red', 'Green', 'Blue'],
      },
      { id: 4, text: 'Where are you located?', type: 'text' },
      {
        id: 5,
        text: 'What is your highest level of education completed?',
        type: 'text',
      },
      {
        id: 6,
        text: 'What is your approximate household income?',
        type: 'text',
      },
      {
        id: 7,
        text: 'What is the highest level of education and approximate income of your parents or guardians?',
        type: 'text',
      },
      { id: 8, text: 'Are you currently employed?', type: 'text' },
      {
        id: 9,
        text: 'What is the primary language spoken at home?',
        type: 'text',
      },
      {
        id: 10,
        text: 'Do you have any accessibility needs we should be aware of?',
        type: 'text',
      },
      { id: 11, text: 'What are your interests or hobbies?', type: 'text' },
      {
        id: 12,
        text: 'Have you attended similar workshops or events before?',
        type: 'text',
      },
      {
        id: 13,
        text: 'How did you find out about our workshops?',
        type: 'text',
      },
    ],
  },

  generalSurveyQuestions: {
    name: 'General Survay',
    questionList: [
      {
        id: 14,
        text: 'How satisfied are you with the registration process?',
        type: 'scale',
        options: ['Not Satisfied', 'Neutral', 'Satisfied'],
      },
      {
        id: 15,
        text: 'What topics would you like to see covered in future workshops?',
        type: 'text',
      },
      {
        id: 16,
        text: 'On a scale of 1 to 10, how likely are you to attend our future events?',
        type: 'scale',
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      },
      {
        id: 17,
        text: 'Do you find our workshop materials easy to understand?',
        type: 'yesno',
      },
      {
        id: 18,
        text: 'What is the primary reason you attended this workshop?',
        type: 'text',
      },
      {
        id: 19,
        text: 'How did you hear about our organization?',
        type: 'text',
      },
      {
        id: 20,
        text: 'Rate the overall quality of the event on a scale of 1 to 5.',
        type: 'scale',
        options: ['1', '2', '3', '4', '5'],
      },
      {
        id: 21,
        text: 'What suggestions do you have for improving our events?',
        type: 'text',
      },
      {
        id: 22,
        text: 'Did the event meet your expectations? Why or why not?',
        type: 'text',
      },
      {
        id: 23,
        text: 'How likely are you to recommend our events to a friend or colleague?',
        type: 'scale',
        options: ['Not Likely', 'Neutral', 'Very Likely'],
      },
      {
        id: 24,
        text: 'Would you be interested in participating as a speaker or presenter in future events?',
        type: 'yesno',
      },
      {
        id: 25,
        text: 'What platform or channels do you prefer for receiving event updates?',
        type: 'text',
      },
      // Add more general survey questions as needed
    ],
  },
};

export { questions };
