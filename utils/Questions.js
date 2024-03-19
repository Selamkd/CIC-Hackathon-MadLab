const questions = {
  firstLoad: true,
  demographicQuestions: {
    name: 'Demographic Survay',
    questionList: [
      {
        id: 1,
        label: 'Age',
        text: 'What age range group do you fit into from the following?',
        type: 'option',
        options: [
          { label: 'Below 18' },
          { label: '18 – 24' },
          { label: '25 – 34' },
          { label: '35 – 44' },
          { label: '45 – 54' },
          { label: '55 – 64' },
          { label: 'Above 65' },
        ],
      },
      {
        id: 2,
        label: 'Gender Identity',
        text: 'What gender do you identify as?',
        type: 'option',
        options: [
          { label: 'Male' },
          { label: 'Female' },
          { label: 'Transgender' },
          { label: 'Non-binary' },
          { label: 'Prefer not to answer' },
          { label: 'Other' },
        ],
      },
      {
        id: 3,
        label: 'Marital Status',
        text: 'What is your marital status?',
        type: 'option',
        options: [
          { label: 'Married' },
          { label: 'Divorced' },
          { label: 'Separated' },
          { label: 'Single' },
          { label: 'Prefer not to say' },
        ],
      },
      {
        id: 4,
        label: 'Location',
        text: 'Which region in England do you live?',
        type: 'option',
        options: [
          { label: 'South West' },
          { label: 'South East' },
          { label: 'Greater London' },
          { label: 'East of England' },
          { label: 'West Midlands' },
          { label: 'East Midlands' },
          { label: 'Yorkshire and Humber' },
          { label: 'North West' },
          { label: 'North East' },
        ],
      },
      {
        id: 5,
        label: 'Ethnic Background',
        text: 'What is your ethnic background? Choose from one option that best describes your ethnic group or background.',
        type: 'option',
        options: [
          { label: 'White / Caucasian' },
          { label: 'Asian/Asian British' },
          { label: 'Black/African/Caribbean/Black British' },
          { label: 'Mixed/Multiple ethnic groups' },
          { label: 'Other ethnic group' },
        ],
      },
      {
        id: 6,
        label: 'Education Level',
        text: 'Please select the highest level of education that you have attained?',
        type: 'option',
        options: [
          { label: 'Doctorate degree' },
          { label: 'Master’s degree' },
          { label: 'Bachelor’s degree' },
          { label: 'Associate degree' },
          { label: 'Trade/technical/vocational training' },
          { label: 'High school/college graduate, diploma or equivalent' },
          { label: 'Some high school' },
          { label: 'Other' },
          { label: 'Prefer not to say' },
        ],
      },
      {
        id: 7,
        label: 'Employment Status',
        text: 'Which of the following best describes your current employment status?',
        type: 'option',
        options: [
          { label: 'Full-time employment' },
          { label: 'Self-employed' },
          { label: 'Part-time employment' },
          { label: 'Underemployed (wage is below industry average)' },
          { label: 'Full time freelancing' },
          { label: 'Unemployed (looking for work)' },
          { label: 'Unemployed (not looking for work)' },
          { label: 'Student' },
          { label: 'Inability to work' },
        ],
      },
    ],
    //[
    //   { id: 1, text: 'What is your age?', type: 'text' },
    //   { id: 2, text: 'What is your gender identity?', type: 'text' },
    //   {
    //     id: 3,
    //     text: 'What is your ethnicity or race?',
    //     type: 'droplist',
    //     options: ['Red', 'Green', 'Blue'],
    //   },
    //   { id: 4, text: 'Where are you located?', type: 'text' },
    //   {
    //     id: 5,
    //     text: 'What is your highest level of education completed?',
    //     type: 'text',
    //   },
    //   {
    //     id: 6,
    //     text: 'What is your approximate household income?',
    //     type: 'text',
    //   },
    //   {
    //     id: 7,
    //     text: 'What is the highest level of education and approximate income of your parents or guardians?',
    //     type: 'text',
    //   },
    //   { id: 8, text: 'Are you currently employed?', type: 'text' },
    //   {
    //     id: 9,
    //     text: 'What is the primary language spoken at home?',
    //     type: 'text',
    //   },
    //   {
    //     id: 10,
    //     text: 'Do you have any accessibility needs we should be aware of?',
    //     type: 'text',
    //   },
    //   { id: 11, text: 'What are your interests or hobbies?', type: 'text' },
    //   {
    //     id: 12,
    //     text: 'Have you attended similar workshops or events before?',
    //     type: 'text',
    //   },
    //   {
    //     id: 13,
    //     text: 'How did you find out about our workshops?',
    //     type: 'text',
    //   },
    // ],
  },

  generalSurveyQuestions: {
    name: 'General Survay',
    questionList: [
      {
        id: 8,
        label: 'Reg. Satisfaction',
        text: 'How satisfied are you with the registration process?',
        type: 'option',
        options: [
          { label: 'Not Satisfied' },
          { label: 'Neutral' },
          { label: 'Satisfied' },
        ],
      },
      {
        id: 9,
        label: 'Future Topics',
        text: 'What topics would you like to see covered in future workshops?',
        type: 'text',
      },
      {
        id: 10,
        label: 'Attend Likelihood',
        text: 'On a scale of 1 to 10, how likely are you to attend our future events?',
        type: 'option',
        options: [
          { label: '1' },
          { label: '2' },
          { label: '3' },
          { label: '4' },
          { label: '5' },
          { label: '6' },
          { label: '7' },
          { label: '8' },
          { label: '9' },
          { label: '10' },
        ],
      },
      {
        id: 11,
        label: 'Material Understandability',
        text: 'Do you find our workshop materials easy to understand?',
        type: 'option',
        options: [{ label: 'Yes' }, { label: 'No' }],
      },
      {
        id: 12,
        label: 'Reason Attending',
        text: 'What is the primary reason you attended this workshop?',
        type: 'text',
      },
      {
        id: 13,
        label: 'Org. Awareness',
        text: 'How did you hear about our organization?',
        type: 'text',
      },
      {
        id: 14,
        label: 'Quality Rating',
        text: 'Rate the overall quality of the event on a scale of 1 to 5.',
        type: 'option',
        options: [
          { label: '1' },
          { label: '2' },
          { label: '3' },
          { label: '4' },
          { label: '5' },
        ],
      },
      {
        id: 15,
        label: 'Improvement Suggestions',
        text: 'What suggestions do you have for improving our events?',
        type: 'text',
      },
      {
        id: 16,
        label: 'Expectations Met',
        text: 'Did the event meet your expectations? Why or why not?',
        type: 'text',
      },
      {
        id: 17,
        label: 'Recommend Likelihood',
        text: 'How likely are you to recommend our events to a friend or colleague?',
        type: 'option',
        options: [
          { label: 'Not Likely' },
          { label: 'Neutral' },
          { label: 'Very Likely' },
        ],
      },
      {
        id: 18,
        label: 'Interest Speaking',
        text: 'Would you be interested in participating as a speaker or presenter in future events?',
        type: 'option',
        options: [{ label: 'Yes' }, { label: 'No' }],
      },
      {
        id: 19,
        label: 'Preferred Channels',
        text: 'What platform or channels do you prefer for receiving event updates?',
        type: 'text',
      },
    ],
    //[
    //   {
    //     id: 14,
    //     text: 'How satisfied are you with the registration process?',
    //     type: 'scale',
    //     options: ['Not Satisfied', 'Neutral', 'Satisfied'],
    //   },
    //   {
    //     id: 15,
    //     text: 'What topics would you like to see covered in future workshops?',
    //     type: 'text',
    //   },
    //   {
    //     id: 16,
    //     text: 'On a scale of 1 to 10, how likely are you to attend our future events?',
    //     type: 'scale',
    //     options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    //   },
    //   {
    //     id: 17,
    //     text: 'Do you find our workshop materials easy to understand?',
    //     type: 'yesno',
    //   },
    //   {
    //     id: 18,
    //     text: 'What is the primary reason you attended this workshop?',
    //     type: 'text',
    //   },
    //   {
    //     id: 19,
    //     text: 'How did you hear about our organization?',
    //     type: 'text',
    //   },
    //   {
    //     id: 20,
    //     text: 'Rate the overall quality of the event on a scale of 1 to 5.',
    //     type: 'scale',
    //     options: ['1', '2', '3', '4', '5'],
    //   },
    //   {
    //     id: 21,
    //     text: 'What suggestions do you have for improving our events?',
    //     type: 'text',
    //   },
    //   {
    //     id: 22,
    //     text: 'Did the event meet your expectations? Why or why not?',
    //     type: 'text',
    //   },
    //   {
    //     id: 23,
    //     text: 'How likely are you to recommend our events to a friend or colleague?',
    //     type: 'scale',
    //     options: ['Not Likely', 'Neutral', 'Very Likely'],
    //   },
    //   {
    //     id: 24,
    //     text: 'Would you be interested in participating as a speaker or presenter in future events?',
    //     type: 'yesno',
    //   },
    //   {
    //     id: 25,
    //     text: 'What platform or channels do you prefer for receiving event updates?',
    //     type: 'text',
    //   },
    //   // Add more general survey questions as needed
    // ],
  },
};

export { questions };
