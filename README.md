# Community Information Collection (CIC) App

## Description

The **Community Information Collection (CIC) App** is a mobile application designed to assist community financial education and coaching Community Interest Company (CIC) in collecting demographic information from participants attending their sessions. The app allows users to submit data through customized forms, streamlining the process of obtaining essential information without the need for sensitive data collection.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technology](#technologies-used)
- [Issues](#issues)
- [Contributing](#contributing)
- [License](#license)

# Installation

To run the CIC App locally on your development machine, follow these steps:

Clone the repository
`git clone https://github.com/your-username/cic-app.git`

Navigate to the project directory
`cd cic-app`

Install dependencies
`npm install`

```
"dependencies": {
    "@react-native-async-storage/async-storage": "^1.22.3",
    "@react-navigation/native": "^6.1.14",
    "@react-navigation/stack": "^6.3.25",
    "expo": "~50.0.8",
    "expo-status-bar": "~1.11.1",
    "react": "18.2.0",
    "react-native": "0.73.4",
    "react-native-gesture-handler": "~2.14.0"
  },
```

## Start the application and scan QR code with device
`npx expo start`

# Usage

The CIC App is designed for workshop organizers at the CIC to easily collect demographic data from participants. Users can create and manage custom forms for different workshops, ensuring flexibility based on funder requirements. The app minimizes the collection of unnecessary personal data and focuses on key demographics, including gender, pronouns, age, ethnicity, disability, employment status, postcode, household size, and information about household members.

# Features

- **Custom Forms:** Create and manage bespoke forms for different workshops.
- **Flexible Demographics:** Collect a variety of demographics based on specific workshop requirements.
- **Data Security:** Minimize the collection of sensitive personal data to prioritize user privacy.
- **Efficient Reporting:** Download group demographic data into spreadsheets for easy reporting.

# Technologies Used

- React Native
- Expo

# Issues

- Exporting user input to a spreadsheet.
- Custom question entry.

# Contributing

We welcome contributions to enhance the CIC App. To contribute, follow these steps:

- Fork the project.
- Create a new branch (git checkout -b feature/your-feature).
- Commit your changes (git commit -am 'Add some feature').
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.

# License

This project is licensed under the MIT License.